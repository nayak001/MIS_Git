import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { routerTransition } from "../../router.animations";
import { Router } from "@angular/router";
import { AssessmentmasterService } from "./assessmentmaster.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-assessmentmaster",
  templateUrl: "./assessmentmaster.component.html",
  styleUrls: ["./assessmentmaster.component.scss"],
  animations: [routerTransition()],
})
export class AssessmentmasterComponent implements OnInit {
  public data: any = [];
  assessment_list: any = [];

  record_id: string = "";
  id: string = "";

  selected_preflanguage = "";
  selected_program: string = "";
  selected_level: string = "";
  selected_subject: string = "";
  selected_stage: string = "";
  content_value: string = "";

  save_operation: string = "";
  hideLoading_indicator: boolean;
  hideContent_div: boolean;
  hideClass_select: boolean;
  hideSubject_select: boolean;

  modalReference: any;
  closeResult: string;

  level_select_option_list: any = [];
  stage_select_option_list: any = [];

  constructor(
    public router: Router,
    private assessmentmasterService: AssessmentmasterService,
    private modalService: NgbModal
  ) {
    this.selected_program = "";
    this.selected_level = "";
    this.selected_subject = "";
    this.selected_stage = "";

    this.content_value = "";

    this.hideLoading_indicator = true;
    this.hideContent_div = true;
    this.hideSubject_select = false;
  }

  ngOnInit() {}

  async load_record(preflanguage, program, level, subject, stage) {
    if (
      preflanguage != undefined &&
      preflanguage != null &&
      preflanguage != "" &&
      program != undefined &&
      program != null &&
      program != "" &&
      level != undefined &&
      level != null &&
      level != "" &&
      subject != undefined &&
      subject != null &&
      subject != "" &&
      stage != undefined &&
      stage != null &&
      stage != ""
    ) {
      this.hideLoading_indicator = false;
      this.hideContent_div = true;
      // /gettchassessment/:preferedlanguage/:program/:level/:stage/:subject
      this.assessmentmasterService
        .getmasterassessmentdetails(
          preflanguage,
          program,
          level,
          stage,
          subject
        )
        .subscribe(
          (data) => {
            this.assessment_list = data;

            if (Object.keys(data).length > 0) {
              this.save_operation = "update";
              //this.record_id = data[0]['_id'];
              //this.id = data[0]['id'];
              //this.content_value = data[0]['question'];
            } else {
              this.save_operation = "save";
              //this.record_id = '';
              //this.id = '';
              //this.content_value = '';
            }
            this.data = data;
            this.hideLoading_indicator = true;
            this.hideContent_div = false;
          },
          (error) => {},
          () => {}
        );
    } else {
      this.content_value = "";
      this.hideLoading_indicator = true;
      this.hideContent_div = true;
    }
  }

  preflanguage_select_onchange(event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_preflanguage = selectedOptionValue;

    this.load_record(
      this.selected_preflanguage,
      this.selected_program,
      this.selected_level,
      this.selected_subject,
      this.selected_stage
    );
  }

  program_select_onchange(event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_program = selectedOptionValue;

    if (this.selected_program == "ece") {
      this.selected_level = "0";
      this.selected_subject = "na";
      this.stage_select_option_list = [
        { value: "quarter0", text: "Baseline" },
        { value: "quarter1", text: "Quarter 1" },
        { value: "quarter2", text: "Quarter 2" },
        { value: "quarter3", text: "Quarter 3" },
        { value: "quarter4", text: "End Line" },
      ];
      this.level_select_option_list = [
        { value: "1", text: "Level 1" },
        { value: "2", text: "Level 2" },
        { value: "3", text: "Level 3" },
      ];

      this.hideClass_select = false;
      this.hideSubject_select = true;
      this.hideContent_div = true;
    } else {
      this.selected_level = "";
      this.selected_subject = "";
      this.stage_select_option_list = [
        { value: "month0", text: "Baseline" },
        { value: "month1", text: "Assessment 1" },
        { value: "month2", text: "Assessment 2" },
        { value: "month3", text: "Assessment 3" },
        { value: "month4", text: "Assessment 4" },
        { value: "month5", text: "Assessment 5" },
        { value: "month6", text: "Assessment 6" },
        { value: "month7", text: "Assessment 7" },
        { value: "month8", text: "Assessment 8" },
        { value: "month9", text: "Assessment 9" },
        { value: "month10", text: "Assessment 10" },
        { value: "month11", text: "End Line" },
      ];
      this.level_select_option_list = [
        { value: "1", text: "Class 1" },
        { value: "2", text: "Class 2" },
        { value: "3", text: "Class 3" },
        { value: "4", text: "Class 4" },
        { value: "5", text: "Class 5" },
      ];

      this.hideClass_select = false;
      this.hideSubject_select = false;
      this.hideContent_div = false;
    }
    this.selected_level = "";
    this.selected_stage = "";
    this.load_record(
      this.selected_preflanguage,
      this.selected_program,
      this.selected_level,
      this.selected_subject,
      this.selected_stage
    );
  }

  class_select_onchange(value) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_level = selectedOptionValue;
    this.load_record(
      this.selected_preflanguage,
      this.selected_program,
      this.selected_level,
      this.selected_subject,
      this.selected_stage
    );
  }

  subject_select_onchange(value) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_subject = selectedOptionValue;
    this.load_record(
      this.selected_preflanguage,
      this.selected_program,
      this.selected_level,
      this.selected_subject,
      this.selected_stage
    );
  }

  stage_select_onchange(value) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_stage = selectedOptionValue;
    this.load_record(
      this.selected_preflanguage,
      this.selected_program,
      this.selected_level,
      this.selected_subject,
      this.selected_stage
    );
  }

  go_btn_click() {
    this.load_record(
      this.selected_preflanguage,
      this.selected_program,
      this.selected_level,
      this.selected_subject,
      this.selected_stage
    );
  }

  async save_record() {
    if (
      this.content_value == undefined ||
      this.content_value == null ||
      this.content_value.trim() == ""
    ) {
      alert("Please give assessment content");
    } else {
      const body = {
        id: new Date().getTime(),
        preferedlanguage: this.selected_preflanguage,
        program: this.selected_program,
        level: this.selected_level,
        stage: this.selected_stage,
        subject: this.selected_subject,
        question: this.content_value,
      };
      this.assessmentmasterService.createmasterassessmentmaster(body).subscribe(
        (data) => {
          this.modalReference.close();
          //alert('Record save status: '+JSON.stringify(data));
          this.load_record(
            this.selected_preflanguage,
            this.selected_program,
            this.selected_level,
            this.selected_subject,
            this.selected_stage
          );
        },
        (error) => {},
        () => {}
      );
    }
  }

  async update_record() {
    if (
      this.content_value == undefined ||
      this.content_value == null ||
      this.content_value.trim() == ""
    ) {
      alert("Please give assessment content");
    } else {
      const body = {
        id: this.id,
        preferedlanguage: this.selected_preflanguage,
        program: this.selected_program,
        level: this.selected_level,
        stage: this.selected_stage,
        subject: this.selected_subject,
        question: this.content_value,
      };
      this.assessmentmasterService
        .updatemasterassessmentmaster(this.record_id, body)
        .subscribe(
          (data) => {
            this.modalReference.close();
            //alert('Record update status: '+JSON.stringify(data));
            this.load_record(
              this.selected_preflanguage,
              this.selected_program,
              this.selected_level,
              this.selected_subject,
              this.selected_stage
            );
          },
          (error) => {},
          () => {}
        );
    }
  }

  async delete_record() {
    this.assessmentmasterService.deletetchassessment(this.record_id).subscribe(
      (data) => {
        this.modalReference.close();
        //alert('Record update status: '+JSON.stringify(data));
        this.load_record(
          this.selected_preflanguage,
          this.selected_program,
          this.selected_level,
          this.selected_subject,
          this.selected_stage
        );
      },
      (error) => {},
      () => {}
    );
  }

  open(content, flag, obj) {
    if (flag == "add") {
      this.record_id = "";
      this.id = "";
      this.content_value = "";
    } else if (flag == "edit") {
      this.record_id = obj._id;
      this.id = obj.id;
      this.content_value = obj.question;
    } else if (flag == "delete") {
      this.record_id = obj._id;
      this.id = obj.id;
      this.content_value = obj.question;
    }

    this.modalReference = this.modalService.open(content, {
      backdrop: "static",
      keyboard: false,
    });
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
