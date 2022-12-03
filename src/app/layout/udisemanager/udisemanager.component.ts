import { Component, OnInit } from "@angular/core";
import { routerTransition } from "../../router.animations";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

import swal from "sweetalert2";
import { Router } from "@angular/router";
import { UdisemanagerService } from "./udisemanager.service";

@Component({
  selector: "app-udisemanager",
  templateUrl: "./udisemanager.component.html",
  styleUrls: ["./udisemanager.component.scss"],
  animations: [routerTransition()],
})
export class UdisemanagerComponent implements OnInit {
  public alludisecodeslist: any = [];
  public alludisecodeslist_bkp: any = [];
  flag: string = "";
  no_record_selected: boolean = false;

  txt_udisecode: string = "";
  txt_schoolname: string = "";

  selected_record: any = {};
  record_id: string = "";

  modalReference: any;
  closeResult: string;
  hideLoading_indicator: boolean = true;

  constructor(
    private modalService: NgbModal,
    public router: Router,
    private udisemanagerService: UdisemanagerService
  ) {}

  ngOnInit() {
    this.getalludisecodes();
  }

  getalludisecodes() {
    this.hideLoading_indicator = false;
    this.udisemanagerService.getalludisecodes().subscribe(
      (data) => {
        if (
          data == undefined ||
          data == null ||
          Object.keys(data).length <= 0
        ) {
          this.alludisecodeslist = [];
          this.alludisecodeslist_bkp = [];
          this.selected_record = {};
          this.record_id = "";
          this.no_record_selected = true;
        } else {
          this.alludisecodeslist = data;
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
    this.txt_udisecode = row.udisecode;
    this.txt_schoolname = row.schoolname;
  }

  reset() {
    this.txt_udisecode = "";
    this.txt_schoolname = "";
  }

  save_data() {
    if (
      this.txt_udisecode == null ||
      this.txt_udisecode == undefined ||
      this.txt_udisecode == ""
    ) {
      swal.fire("Info", "UDISE Code is not valid", "warning");
    } else if (
      this.txt_schoolname == null ||
      this.txt_schoolname == undefined ||
      this.txt_schoolname == ""
    ) {
      swal.fire("Info", "Schoolname is not valid", "warning");
    } else {
      this.hideLoading_indicator = false;
      this.udisemanagerService
        .checkudisecodeexistance(this.txt_udisecode)
        .subscribe(
          (data1) => {
            if (Object.keys(data1).length > 0) {
              swal.fire("Info", "UDISE Code already exists", "warning");
            } else {
              let body = {
                udisecode: this.txt_udisecode,
                schoolname: this.txt_schoolname,
              };
              this.udisemanagerService.saveudisecode(body).subscribe(
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

  update_data() {
    if (
      this.txt_udisecode == null ||
      this.txt_udisecode == undefined ||
      this.txt_udisecode == ""
    ) {
      swal.fire("Info", "UDISE Code is not valid", "warning");
    } else if (
      this.txt_schoolname == null ||
      this.txt_schoolname == undefined ||
      this.txt_schoolname == ""
    ) {
      swal.fire("Info", "Schoolname is not valid", "warning");
    } else {
      this.hideLoading_indicator = false;
      this.udisemanagerService
        .checkudisecodeexistance(this.txt_udisecode)
        .subscribe(
          (data1) => {
            if (Object.keys(data1).length > 0) {
              if (data1[0]._id == this.record_id) {
                let body = {
                  udisecode: this.txt_udisecode,
                  schoolname: this.txt_schoolname,
                };
                this.udisemanagerService
                  .updateudisecode(this.record_id, body)
                  .subscribe(
                    (data2) => {
                      this.modalReference.close();
                      swal.fire(
                        "Success",
                        "UDISE Record updated successfully",
                        "success"
                      );
                      this.getalludisecodes();
                      this.hideLoading_indicator = true;
                      this.reset();
                    },
                    (error) => {},
                    () => {}
                  );
              } else {
                swal.fire("Info", "UDISE Code already exists", "warning");
              }
            } else {
              let body = {
                udisecode: this.txt_udisecode,
                schoolname: this.txt_schoolname,
              };
              this.udisemanagerService
                .updateudisecode(this.record_id, body)
                .subscribe(
                  (data2) => {
                    this.modalReference.close();
                    swal.fire(
                      "Success",
                      "UDISE Record updated successfully",
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

  delete_data() {
    swal
      .fire({
        title: "Are you sure?",
        text: "Do you want to remove this record?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      })
      .then((result) => {
        if (result.value) {
          this.hideLoading_indicator = false;
          this.udisemanagerService.deleteudisecode(this.record_id).subscribe(
            (data) => {
              swal.fire(
                "Success",
                "UDISE Record deleted successfully",
                "success"
              );
            },
            (error) => {
              console.log("--> Delete Error", error);
            },
            () => {
              this.getalludisecodes();
              this.hideLoading_indicator = true;
              this.reset();
            }
          );
        }
      });
  }

  search(term: string) {
    if (!term) {
      this.alludisecodeslist = this.alludisecodeslist_bkp;
      console.log("search udise1-->",this.alludisecodeslist)
    } else {
      this.alludisecodeslist = this.alludisecodeslist_bkp.filter((element) =>
        element.schoolname
          .trim()
          .toLowerCase()
          .includes(term.trim().toLowerCase())
      );
    }
    console.log("search udise-->",this.alludisecodeslist_bkp)
  }

  // ----------------------------- Modal -------------------------------
  open(content, flag) {
    this.reset();
    this.flag = flag;

    if (flag == "save") {
      this.txt_udisecode = "";
      this.txt_schoolname = "";
    } else if (flag == "update") {
      this.txt_udisecode = this.selected_record.udisecode;
      this.txt_schoolname = this.selected_record.schoolname;
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
