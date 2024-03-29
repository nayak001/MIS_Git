import { Component, OnInit } from "@angular/core";
import { routerTransition } from "../../router.animations";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

import { Router } from "@angular/router";
import { PasscodemanagerService } from "./passcodemanager.service";
import swal from "sweetalert2";

@Component({
  selector: "app-passcodemanager",
  templateUrl: "./passcodemanager.component.html",
  styleUrls: ["./passcodemanager.component.scss"],
  animations: [routerTransition()],
})
export class PasscodemanagerComponent implements OnInit {
  modalReference: any;
  closeResult: string;

  data: any;
  filterData: any;

  search_text: any = "";
  original_passcode: any = "";
  selected_userid: any = "";
  selected_username: any = "";
  selected_usertype: string = "";
  selected_recordid: string = "";
  selected_passcode: string = "";
  selected_managertype: any = "";
  selected_passcodetype: any = "";
  expire_duration: number;
  regdt: any;
  expdt: any;
  passcodeStatus: string;

  flag: string = "";
  hideLoading_indicator: boolean = true;

  disable_save_button: boolean = false;

  constructor(
    private modalService: NgbModal,
    public router: Router,
    private passcodemanagerService: PasscodemanagerService
  ) {}

  ngOnInit() {
    this.hideLoading_indicator = false;
    this.getallPasscode();
  }

  getallPasscode() {
    this.hideLoading_indicator = false;
    this.passcodemanagerService.getallpasscode().subscribe(
      (data) => {
        console.log("--> all passcode: ", data);
        this.data = data["data"];
        this.filterData = this.data;
        this.hideLoading_indicator = true;
      },
      (error) => {},
      () => {}
    );
  }

  reset_passcode() {
    this.flag = "";
    this.search_text = "";
    this.selected_recordid = "";
    this.selected_userid = "";
    this.selected_username = "";
    this.selected_usertype = "";
    this.selected_managertype = "";
    this.selected_passcode = "";
    this.original_passcode = "";
    this.selected_passcodetype = "";
    this.passcodeStatus = "";
    this.expire_duration = null;
    this.regdt = "";
    this.expdt = "";
  }

  expire_duration_onchange(event: Event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.expire_duration = parseInt(selectedOptionValue);

    this.selected_passcodetype =
      this.expire_duration == 120 ? "4month" : "1year";

    this.regdt = new Date();
    this.expdt = new Date().setDate(
      new Date().getDate() + this.expire_duration
    );
  }

  validate_passcode() {
    //let nameregex = new RegExp("[a-zA-Z_]"); // if(!nameregex.test(this.selected_username))
    let passcoderegx = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$");

    if (
      this.selected_userid == null ||
      this.selected_userid == undefined ||
      this.selected_userid == ""
    ) {
      swal.fire("Info", "User id is not valid !!!", "warning");
      return false;
    } else if (
      this.selected_username == null ||
      this.selected_username == undefined ||
      this.selected_username == ""
    ) {
      swal.fire("Info", "User name should be valid !!!", "warning");
      return false;
    } else if (
      this.selected_managertype == null ||
      this.selected_managertype == undefined ||
      this.selected_managertype == ""
    ) {
      swal.fire("Info", "Manager type cannot be empty !!!", "warning");
      return false;
    } else if (
      this.selected_passcode == null ||
      this.selected_passcode == undefined ||
      this.selected_passcode == ""
    ) {
      swal.fire("Info", "Passcode is not valid !!!", "warning");
      return false;
    } else if (
      this.selected_passcode.length < 5 ||
      this.selected_passcode.length > 15
    ) {
      swal.fire(
        "Info",
        "Passcode must have only 5 -to- 15 charchters !!!",
        "warning"
      );
      return false;
    } else if (!passcoderegx.test(this.selected_passcode)) {
      swal.fire(
        "Info",
        "Passcode should content letters and numeric !!!",
        "warning"
      );
      return false;
    } else if (
      this.expire_duration == null ||
      this.expire_duration == undefined
    ) {
      swal.fire("Info", "Please enter passcode expire duration !!!", "warning");
      return false;
    } else {
      return true;
    }
  }

  async addupdate_passcode() {
    console.log("--> " + this.flag + " Passcode: " + this.selected_passcode);
    if (this.validate_passcode()) {
      this.passcodemanagerService
        .checkpasscodeexistance(this.selected_passcode.toUpperCase())
        .subscribe((data1) => {
          console.log("--> Passcode exitance: ", data1);
          if (data1["count"] == 0) {
            this.create_passcode();
          } else {
            swal.fire("Failed", "Passcode already exists", "warning");
          }
        });
    } else {
      console.log("--> Passcode Validation: " + this.validate_passcode());
    }
  }

  // Create Passcode
  create_passcode() {
    this.hideLoading_indicator = false;
    this.disable_save_button = true;

    let body = {
      userid: this.selected_userid,
      username: this.selected_username.toLowerCase(),
      usertype: this.selected_usertype,
      managertype: this.selected_managertype.toLowerCase(),
      passcode: this.selected_passcode.toUpperCase(),
      passcodetype: this.selected_passcodetype,
      passcodestatus: "active",
      validfordays: this.expire_duration,
      registeredon: this.regdt,
      expireon: this.expdt,
    };

    //console.log("passcode create--->>>", body);

    this.passcodemanagerService.createnewpasscode(body).subscribe(
      (data2) => {
        this.disable_save_button = false;
        this.modalReference.close();
        swal.fire("Success", "Passcode saved " + data2["status"], "success");
        this.getallPasscode();
        this.hideLoading_indicator = true;
        this.reset_passcode();
      },
      (error) => {},
      () => {}
    );
  }

  // Delete passcode
  delete_passcode_btnclick(passcodedata) {
    swal
      .fire({
        title: "Are you sure?",
        text: "Do you want to delete this passcode?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      })
      .then((result) => {
        if (result.value) {
          this.verify_delete(
            passcodedata._id,
            passcodedata.userid,
            passcodedata.passcode
          );
        }
      });
  }

  verify_delete(record_id, userid, passcode) {
    console.log("--> Verify delete: " + passcode);
    this.passcodemanagerService
      .checkpasscodeexistance(passcode.toUpperCase())
      .subscribe((data1) => {
        console.log("--> Passcode exitance: ", data1);
        if (data1["count"] == 0) {
          swal.fire("Failed", "Passcode not found", "warning");
        } else {
          this.passcodemanagerService
            .checkpasscodeusability(passcode.toUpperCase())
            .subscribe((data2) => {
              console.log("--> Passcode usability: ", data2);
              if (data2["count"] == 0) {
                this.delete_passcode(record_id, userid, passcode.toUpperCase());
              } else {
                swal.fire(
                  "Failed",
                  "Passcode: " +
                    passcode +
                    " can not be deleted, because it is used in multiple user records.",
                  "warning"
                );
              }
            });
        }
      });
  }

  delete_passcode(record_id, userid, passcode) {
    this.hideLoading_indicator = false;
    this.passcodemanagerService
      .deletepasscode(record_id, userid, passcode)
      .subscribe(
        (data) => {
          swal.fire("Success", "Passcode removed " + data["status"], "success");
          this.getallPasscode();
          this.hideLoading_indicator = true;
          this.reset_passcode();
        },
        (error) => {},
        () => {}
      );
  }

  search(term: string) {
    term = term == undefined || term == null ? "" : term;
    if (!term) {
      this.filterData = this.data;
    } else {
      this.filterData = this.data.filter((element) =>
        element.username.toLowerCase().includes(term.trim().toLowerCase())
      );
    }
  }

  open(content, param, flag) {
    this.flag = flag;
    // console.log("param--->>>", param);
    if (flag == "add") {
      this.selected_userid = param.userid;
      this.selected_username = param.username;
      this.selected_usertype = param.usertype;
      this.selected_managertype = param.managertype;
      this.selected_passcode = "";
    } else if (flag == "delete") {
      this.selected_recordid = param._id;
    } else {
      this.reset_passcode();
    }
    this.modalReference = this.modalService.open(content, param);
    this.modalReference.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
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
