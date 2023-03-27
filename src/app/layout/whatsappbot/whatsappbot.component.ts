import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { routerTransition } from "../../router.animations";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

import { Router } from "@angular/router";
import { WhatsappbotService } from "./whatsappbot.service";
import { saveAs } from "file-saver";

@Component({
  selector: "app-whatsappbot",
  templateUrl: "./whatsappbot.component.html",
  styleUrls: ["./whatsappbot.component.scss"],
  animations: [routerTransition()],
})
export class WhatsappbotComponent implements OnInit {
  hideLoading_indicator1: boolean = true;
  hideLoading_indicator2: boolean = true;
  hide_sendmessage_buuton: boolean = false;
  // contact limit to send
  contact_limit: number = 1000;

  // fetch data and download csv
  allcontacts: any = [];
  allcontacts_count: number = 0;

  // upload and read csv
  contactsFromCSV: any = [];
  contactsFromCSV_count: number = 0;

  // response
  currentMessageNumber: any = 0;
  messageSentResponseArr: any = [];

  // Modal
  modalReference: any;
  closeResult: string;

  constructor(
    private modalService: NgbModal,
    private changeDetectorRef: ChangeDetectorRef,
    public router: Router,
    private whatsappbotService: WhatsappbotService
  ) {}

  ngOnInit() {
    this.hideLoading_indicator1 = true;
    this.hideLoading_indicator2 = true;
    this.hide_sendmessage_buuton = false;
    this.currentMessageNumber = 0;
  }
  downloadAllContacts() {
    if (this.allcontacts.length > 0) {
      let data = this.allcontacts;
      const replacer = (key, value) => (value === null ? "" : value);
      const header = Object.keys(data[0]);
      let csv = data.map((row) =>
        header
          .map((fieldName) => JSON.stringify(row[fieldName], replacer))
          .join(",")
      );
      csv.unshift(header.join(","));
      let csvArray = csv.join("\r\n");

      var blob = new Blob([csvArray], { type: "text/csv;charset=utf-8;" });

      // set file name
      var currdate = new Date();
      var csvfilename =
        "contacts" +
        currdate.getDate() +
        "-" +
        (currdate.getMonth() + 1) +
        "-" +
        currdate.getFullYear() +
        ".csv";
      saveAs(blob, csvfilename);
    } else {
      alert("Nothing to download");
    }
  }

  downloadWhatsappResponse() {
    if (this.messageSentResponseArr.length > 0) {
      let data = this.messageSentResponseArr;
      const replacer = (key, value) => (value === null ? "" : value);
      const header = Object.keys(data[0]);
      let csv = data.map((row) =>
        header
          .map((fieldName) => JSON.stringify(row[fieldName], replacer))
          .join(",")
      );
      csv.unshift(header.join(","));
      let csvArray = csv.join("\r\n");

      var blob = new Blob([csvArray], { type: "text/csv;charset=utf-8;" });

      // set file name
      var currdate = new Date();
      var csvfilename =
        "result" +
        currdate.getDate() +
        "-" +
        (currdate.getMonth() + 1) +
        "-" +
        currdate.getFullYear() +
        ".csv";
      saveAs(blob, csvfilename);
    } else {
      alert("Nothing to download");
    }
  }

  readCSV(files: FileList) {
    let allCsvData: any;
    this.contactsFromCSV = [];
    if (files && files.length > 0) {
      let file: File = files.item(0);
      //console.log("--> files: ",files,"    file name: ",file.name,"    file size: ",file.size,"    file type: ",file.type);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        let csv: any = reader.result;
        allCsvData = csv.split("\r\n");
        console.log("leng: ", allCsvData.length);

        this.contact_limit =
          allCsvData.length < this.contact_limit
            ? allCsvData.length - 1
            : this.contact_limit;
        for (let i = 0; i <= this.contact_limit; i++) {
          // if (i == 0) {
          //   // do nothing
          // } else {
          let cont = allCsvData[i];
          if (cont && cont !== "contact") {
            console.log("@@cont", cont);

            cont = cont.replaceAll('"', "");
            // match phone number regex
            // link: https://stackoverflow.com/questions/3813195/regular-expression-for-indian-mobile-numbers
            //if (cont.match(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/))
            this.contactsFromCSV.push(cont);
          }
          //}
        }
        this.contactsFromCSV_count = this.contactsFromCSV.length;
      };
    }
  }

  getallmobilenos() {
    this.hideLoading_indicator1 = false;
    this.whatsappbotService.getallmobilenos().subscribe(
      (data) => {
        this.allcontacts = data["data"] ? data["data"] : [];
        this.allcontacts_count = this.allcontacts.length;
        this.hideLoading_indicator1 = true;
      },
      (error) => {},
      () => {}
    );
  }

  filterwhatsappnos() {
    this.hideLoading_indicator1 = false;
    var allcontactsobj = { contacts: this.allcontacts };
    this.whatsappbotService.filterwhatsappnos(allcontactsobj).subscribe(
      (data) => {
        console.log("-->whatsapp: ", data);

        // this.allwhatsappcontacts = data["data"] ? data["data"] : [];
        // this.allwhatsappcontacts_count = this.allwhatsappcontacts.length;
        this.hideLoading_indicator1 = true;
      },
      (error) => {},
      () => {}
    );
  }

  async sendtemplatedmediamessage() {
    if (this.contactsFromCSV.length > 0) {
      this.hideLoading_indicator2 = false;
      this.hide_sendmessage_buuton = true;
      let arr = [];

      // ------------ new code modification started ----------
      // if not requirfe delete this block and un comment others
      let i = 0;
      let loop = async () => {
        this.hideLoading_indicator2 = false;
        this.currentMessageNumber = i + 1;
        this.messageSentResponseArr = arr;
        await this.whatsappbotService
          .sendtemplatedmediamessage(this.contactsFromCSV[i])
          .then(function (res) {
            console.log("step: ", i, " -res: ", res);
            arr.push(res);
          });
        i++;
        if (i < this.contactsFromCSV.length) {
          setTimeout(() => {
            loop();
          }, 500); // Wait for 1 second before next iteration
        } else {
          this.hideLoading_indicator2 = true;
          this.hide_sendmessage_buuton = false;
        }
      };
      loop();
      // ------------------------------------------------------

      // ------------------- old code  started ----------------
      /*for (let i = 0; i < this.contactsFromCSV.length; i++) {
        this.hideLoading_indicator2 = false;
        setTimeout(() => {
          this.whatsappbotService
            .sendtemplatedmediamessage(this.contactsFromCSV[i])
            .then(function (res) {
              console.log("res: ", res);
              arr.push(res);
            });
        }, 5000);
      }*/
      this.hideLoading_indicator2 = true;
      this.messageSentResponseArr = arr;
      // ------------------------------------------------------
    } else {
      // show alert
      alert("No contacts found!");
    }
  }

  sendtemplatedmediamessages() {
    this.hideLoading_indicator1 = false;
    var allcontactsobj = { contacts: this.allcontacts };
    this.whatsappbotService
      .sendtemplatedmediamessages(allcontactsobj)
      .subscribe(
        (data) => {
          console.log("-->whatsapp: ", data);

          // this.allwhatsappcontacts = data["data"] ? data["data"] : [];
          // this.allwhatsappcontacts_count = this.allwhatsappcontacts.length;
          this.hideLoading_indicator1 = true;
        },
        (error) => {},
        () => {}
      );
  }

  // Modal Open
  open(modal) {
    this.changeDetectorRef.detectChanges();
    this.modalReference = this.modalService.open(modal, {
      backdrop: "static",
      keyboard: false,
    });
    this.modalReference.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        // write code after closing the modal
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
