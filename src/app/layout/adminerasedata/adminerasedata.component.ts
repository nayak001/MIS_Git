import { Component, OnInit } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { routerTransition } from "../../router.animations";
import { Router } from "@angular/router";
import { AdminEraseDataService } from "./adminerasedata.service";
import swal from "sweetalert2";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { environment } from "../../../environments/environment.prod";
const URL = environment.uploadURL;

@Component({
  selector: "app-adminerasedata",
  templateUrl: "./adminerasedata.component.html",
  styleUrls: ["./adminerasedata.component.scss"],
  animations: [routerTransition()],
})
export class AdminEraseDataComponent implements OnInit {
  public allpostcallrecordslist: any = [];
  public allpostcallrecordslist_bkp: any = [];
  flag: string = "";
  hidesubject: boolean = true;
  hidesubject_filter: boolean = true;

  record_id: string = "";
  preferedlanguage: any = "";
  program: any = "";
  subject: any = "";
  question: any = "";

  preferedlanguage_filter: any = "od";
  program_filter: any = "ece";
  subject_filter: any = "na";

  modalReference: any;
  closeResult: string;
  hideLoading_indicator: boolean = true;

  constructor(
    private modalService: NgbModal,
    public router: Router,
    private AdminEraseDataService: AdminEraseDataService
  ) {}

  ngOnInit() {
    this.getmasterpostcallactivities(
      this.preferedlanguage_filter,
      this.program_filter
    );
  }

  // -------------------------- Get Data -------------------------------
  getmasterpostcallactivities(preferedlanguage, program) {
    if (
      preferedlanguage != undefined &&
      preferedlanguage != null &&
      preferedlanguage.trim() != "" &&
      program != undefined &&
      program != null &&
      program.trim() != ""
    ) {
      this.hideLoading_indicator = false;
      this.AdminEraseDataService.getmasterpostcallactivities(
        preferedlanguage,
        program
      ).subscribe(
        (data) => {
          if (
            data == undefined ||
            data == null ||
            Object.keys(data).length <= 0
          ) {
            this.allpostcallrecordslist = [];
            this.allpostcallrecordslist_bkp = [];
          } else {
            this.allpostcallrecordslist = data;
            this.allpostcallrecordslist_bkp = data;
          }
          this.hideLoading_indicator = true;
        },
        (error) => {},
        () => {}
      );
    }
  }

  // -------------------------- Save -------------------------------
  save_data() {
    if (
      this.preferedlanguage == null ||
      this.preferedlanguage == undefined ||
      this.preferedlanguage == ""
    ) {
      swal.fire("Info", "Prefered language is not valid", "warning");
    } else if (
      this.program == null ||
      this.program == undefined ||
      this.program == ""
    ) {
      swal.fire("Info", "Program is not valid", "warning");
    } else if (
      this.question == null ||
      this.question == undefined ||
      this.question == ""
    ) {
      swal.fire("Info", "Remark is not valid", "warning");
    } else {
      this.hideLoading_indicator = false;
      let body = {
        preferedlanguage: this.preferedlanguage,
        program: this.program,
        //subject: this.subject,
        question: this.question,
      };
      this.AdminEraseDataService.savemasterpostcallactivity(body).subscribe(
        (data2) => {
          this.modalReference.close();
          swal.fire("Success", "Record saved successfully", "success");
          this.getmasterpostcallactivities(
            this.preferedlanguage_filter,
            this.program_filter
          );
          this.hideLoading_indicator = true;
          this.reset();
        },
        (error) => {},
        () => {}
      );
    }
  }

  // -------------------------- Update -------------------------------
  update_data() {
    if (
      this.preferedlanguage == null ||
      this.preferedlanguage == undefined ||
      this.preferedlanguage == ""
    ) {
      swal.fire("Info", "Prefered language is not valid", "warning");
    } else if (
      this.program == null ||
      this.program == undefined ||
      this.program == ""
    ) {
      swal.fire("Info", "Program is not valid", "warning");
    } else if (
      this.question == null ||
      this.question == undefined ||
      this.question == ""
    ) {
      swal.fire("Info", "Remark is not valid", "warning");
    } else {
      this.hideLoading_indicator = false;
      let body = {
        preferedlanguage: this.preferedlanguage,
        program: this.program,
        //subject: this.subject,
        question: this.question,
      };
      this.AdminEraseDataService.updatemasterpostcallactivity(
        this.record_id,
        body
      ).subscribe(
        (data2) => {
          this.modalReference.close();
          swal.fire("Success", "Record updated successfully", "success");
          this.getmasterpostcallactivities(
            this.preferedlanguage_filter,
            this.program_filter
          );
          this.hideLoading_indicator = true;
          this.reset();
        },
        (error) => {},
        () => {}
      );
    }
  }

  // -------------------------- Delete -------------------------------
  delete_data(row) {
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
          this.record_id = row._id;
          this.hideLoading_indicator = false;
          this.AdminEraseDataService.deletemasterpostcallactivity(
            this.record_id
          ).subscribe(
            (data) => {
              swal.fire("Success", "Record deleted successfully", "success");
            },
            (error) => {
              console.log("--> Delete Error", error);
            },
            () => {
              this.getmasterpostcallactivities(
                this.preferedlanguage_filter,
                this.program_filter
              );
              this.hideLoading_indicator = true;
              this.reset();
            }
          );
        }
      });
  }

  // -------------------------- Reset -------------------------------
  reset() {
    this.record_id = "";
    this.preferedlanguage = "od";
    this.program = "ece";
    this.subject = "na";
    this.question = "";
    this.hidesubject = true;
  }

  // --------------------------- Select On Change --------------------
  preferedlanguage_onchange(event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.preferedlanguage = selectedOptionValue;
  }

  program_onchange(event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.program = selectedOptionValue;
    if (this.program == "ece") {
      this.hidesubject = true;
      this.subject = "na";
    } else {
      this.hidesubject = false;
      this.subject = "odia";
    }
  }

  subject_onchange(event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.subject = selectedOptionValue;
  }

  // ---------------------------- Display Result ----------------------
  preferedlanguage_filter_onchange(event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.preferedlanguage_filter = selectedOptionValue;
    this.getmasterpostcallactivities(
      this.preferedlanguage_filter,
      this.program_filter
    );
  }

  program_filter_onchange(event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.program_filter = selectedOptionValue;
    if (this.program_filter == "ece") {
      this.hidesubject_filter = true;
      this.subject_filter = "na";
    } else {
      // this.hidesubject_filter = false;
      // this.subject_filter = 'odia';
    }
    this.getmasterpostcallactivities(
      this.preferedlanguage_filter,
      this.program_filter
    );
  }

  subject_filter_onchange(event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.subject_filter = selectedOptionValue;
    this.getmasterpostcallactivities(
      this.preferedlanguage_filter,
      this.program_filter
    );
  }

  filterbutton_click() {
    this.getmasterpostcallactivities(
      this.preferedlanguage_filter,
      this.program_filter
    );
  }

  // ---------------------------- Search Result ----------------------
  search(term: string) {
    if (!term) {
      this.allpostcallrecordslist = this.allpostcallrecordslist_bkp;
    } else {
      this.allpostcallrecordslist = this.allpostcallrecordslist_bkp.filter(
        (element) =>
          element.question
            .trim()
            .toLowerCase()
            .includes(term.trim().toLowerCase())
      );
    }
  }

  // ----------------------------- Modal -------------------------------
  open(content, flag, row) {
    this.reset();
    this.flag = flag;

    if (flag == "save") {
      this.reset();
    } else if (flag == "update") {
      this.record_id = row._id;
      this.preferedlanguage = row.preferedlanguage;
      this.program = row.program;
      if (this.program == "ece") {
        this.hidesubject = true;
        this.subject = "na";
      } else {
        this.hidesubject = false;
        this.subject = row.subject;
      }
      this.question = row.question;
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
