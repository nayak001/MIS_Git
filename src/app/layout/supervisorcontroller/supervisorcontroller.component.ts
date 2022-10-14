import { Component, OnInit } from "@angular/core";
import { routerTransition } from "../../router.animations";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

import swal from "sweetalert2";
import { Router } from "@angular/router";
import { SupervisorcontrollerService } from "./supervisorcontroller.service";

@Component({
  selector: "app-supervisorcontroller",
  templateUrl: "./supervisorcontroller.component.html",
  styleUrls: ["./supervisorcontroller.component.scss"],
  animations: [routerTransition()],
})
export class SupervisorcontrollerComponent implements OnInit {
  public alludisecodeslist_bkp: any = [];
  public allanganwadilist: any = [];
  public supervisordata: any = [];
  _anganwadiselect: anganwadiselect;
  flag: string = "";
  no_record_selected: boolean = false;

  txt_passcode: string = "";
  txt_anganwadiname: string = "";

  selected_record: any = {};
  record_id: string = "";

  modalReference: any;
  closeResult: string;
  hideLoading_indicator: boolean = true;

  constructor(
    private modalService: NgbModal,
    public router: Router,
    private supervisorcontrollerService: SupervisorcontrollerService
  ) {}

  ngOnInit() {
    this.getcourses();
    this.getalludisecodes();

    this._anganwadiselect = new anganwadiselect();
  }

  getalludisecodes() {
    this.hideLoading_indicator = false;
    this.supervisorcontrollerService.getallsupervisordetails().subscribe(
      (data) => {
        if (
          data == undefined ||
          data == null ||
          Object.keys(data).length <= 0
        ) {
          this.allanganwadilist = [];
          this.alludisecodeslist_bkp = [];
          this.selected_record = {};
          this.record_id = "";
          this.no_record_selected = true;
        } else {
          // this.allanganwadilist = data;
          this.supervisordata = data;
          console.log("supervisordata-->", this.supervisordata);
          this.alludisecodeslist_bkp = data;
          this.selected_record = data[0];
          this.record_id = this.selected_record._id;
          this.record_onselect(this.selected_record);
          this.no_record_selected = false;
        }
        this.hideLoading_indicator = true;
      },
      (error) => {},
      () => {}
    );
  }

  record_onselect(row) {
    //this.reset();
    this.selected_record = row;
    this.record_id = row._id;
    this.txt_passcode = row.passcode;
    console.log("onselect passcode-->",this.txt_passcode)
   this.txt_anganwadiname = row.anganwadiname;
    console.log("onselect anganwadiname-->", this.txt_anganwadiname)
  }

  reset() {
    this.txt_passcode = "";
    this.txt_anganwadiname = "";
  }

  getcourses() {
    this.allanganwadilist = [
      { id: 1, anganwadiname: "Anganwadi 1", isselected: false },
      { id: 2, anganwadiname: "Anganwadi 2", isselected: false },
      { id: 3, anganwadiname: "Anganwadi 3", isselected: false },
      { id: 4, anganwadiname: "Anganwadi 4", isselected: false },
      { id: 5, anganwadiname: "Anganwadi 5", isselected: false },
      { id: 6, anganwadiname: "Anganwadi 6", isselected: false },
    ];
  }
  onchange() {
    this._anganwadiselect.anganwadiname = this.allanganwadilist
      .filter((x) => x.isselected == true)
      .map((x) => x.anganwadiname)
      .join(",")
      .toString();
    console.log("anganwadiname-->", this._anganwadiselect.anganwadiname);

    console.log("clicked", this._anganwadiselect.anganwadiname);
    //  this.getcourses()
  }
  onpasscodechange() {
    console.log("input", this.txt_passcode);
  }

  save_data() {
    if (
      this.txt_passcode == null ||
      this.txt_passcode == undefined ||
      this.txt_passcode == ""
    ) {
      swal.fire("Info", "Supervisor Passcode is not valid", "warning");
    } else if (
      this._anganwadiselect.anganwadiname == null ||
      this._anganwadiselect.anganwadiname == undefined ||
      this._anganwadiselect.anganwadiname == ""
    ) {
      swal.fire("Info", "Anganwadi Name is not valid", "warning");
    } else {
      this.hideLoading_indicator = false;
      this.supervisorcontrollerService
        .checkanganwadinameexistance(this._anganwadiselect.anganwadiname)
        .subscribe(
          (data1) => {
            if (Object.keys(data1).length > 0) {
              swal.fire("Info", "Anganwadi name already exists", "warning");
            } else {
              let body = {
                passcode: this.txt_passcode,
                anganwadiname: this._anganwadiselect.anganwadiname,
              };
              this.supervisorcontrollerService
                .savesupervisordetails(body)
                .subscribe(
                  (data2) => {
                    this.modalReference.close();
                    swal.fire(
                      "Success",
                      "UDISE Record saved successfully",
                      "success"
                    );
                    this.getalludisecodes();
                    this.hideLoading_indicator = true;
                    this.reset();
                  },
                  (error) => {},
                  () => {}
                );
            }
            this.hideLoading_indicator = true;
          },
          (error) => {},
          () => {}
        );
    }
  }

  // update_data() {
  //   if (
  //     this.txt_udisecode == null ||
  //     this.txt_udisecode == undefined ||
  //     this.txt_udisecode == ""
  //   ) {
  //     swal.fire("Info", "UDISE Code is not valid", "warning");
  //   } else if (
  //     this.txt_schoolname == null ||
  //     this.txt_schoolname == undefined ||
  //     this.txt_schoolname == ""
  //   ) {
  //     swal.fire("Info", "Schoolname is not valid", "warning");
  //   } else {
  //     this.hideLoading_indicator = false;
  //     this.supervisorcontrollerService
  //       .checkudisecodeexistance(this.txt_udisecode)
  //       .subscribe(
  //         (data1) => {
  //           if (Object.keys(data1).length > 0) {
  //             if (data1[0]._id == this.record_id) {
  //               let body = {
  //                 udisecode: this.txt_udisecode,
  //                 schoolname: this.txt_schoolname,
  //               };
  //               this.supervisorcontrollerService
  //                 .updateudisecode(this.record_id, body)
  //                 .subscribe(
  //                   (data2) => {
  //                     this.modalReference.close();
  //                     swal.fire(
  //                       "Success",
  //                       "UDISE Record updated successfully",
  //                       "success"
  //                     );
  //                     this.getalludisecodes();
  //                     this.hideLoading_indicator = true;
  //                     this.reset();
  //                   },
  //                   (error) => {},
  //                   () => {}
  //                 );
  //             } else {
  //               swal.fire("Info", "UDISE Code already exists", "warning");
  //             }
  //           } else {
  //             let body = {
  //               udisecode: this.txt_udisecode,
  //               schoolname: this.txt_schoolname,
  //             };
  //             this.supervisorcontrollerService
  //               .updateudisecode(this.record_id, body)
  //               .subscribe(
  //                 (data2) => {
  //                   this.modalReference.close();
  //                   swal.fire(
  //                     "Success",
  //                     "UDISE Record updated successfully",
  //                     "success"
  //                   );
  //                   this.getalludisecodes();
  //                   this.hideLoading_indicator = true;
  //                   this.reset();
  //                 },
  //                 (error) => {},
  //                 () => {}
  //               );
  //           }
  //           this.hideLoading_indicator = true;
  //         },
  //         (error) => {},
  //         () => {}
  //       );
  //   }
  // }

  // delete_data() {
  //   swal
  //     .fire({
  //       title: "Are you sure?",
  //       text: "Do you want to remove this record?",
  //       type: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes",
  //     })
  //     .then((result) => {
  //       if (result.value) {
  //         this.hideLoading_indicator = false;
  //         this.supervisorcontrollerService.deleteudisecode(this.record_id).subscribe(
  //           (data) => {
  //             swal.fire(
  //               "Success",
  //               "UDISE Record deleted successfully",
  //               "success"
  //             );
  //           },
  //           (error) => {
  //             console.log("--> Delete Error", error);
  //           },
  //           () => {
  //             this.getalludisecodes();
  //             this.hideLoading_indicator = true;
  //             this.reset();
  //           }
  //         );
  //       }
  //     });
  // }

  search(term: string) {
    if (!term) {
      this.allanganwadilist = this.alludisecodeslist_bkp;
    } else {
      this.allanganwadilist = this.alludisecodeslist_bkp.filter((element) =>
        element.schoolname
          .trim()
          .toLowerCase()
          .includes(term.trim().toLowerCase())
      );
    }
  }

  // ----------------------------- Modal -------------------------------
  open(content, flag) {
    this.reset();
    this.flag = flag;

    if (flag == "save") {
      this.txt_passcode = "";
      this.txt_anganwadiname = "";
    } else if (flag == "update") {
      this.txt_passcode = this.selected_record.udisecode;
      this.txt_anganwadiname = this.selected_record.schoolname;
    }

    this.modalReference = this.modalService.open(content);
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

class anganwadiselect {
  id: number;
  anganwadiname: string;
  isselected: boolean;
}
