import { Component, OnInit, ElementRef } from "@angular/core";
import { routerTransition } from "../../router.animations";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpResponse, HttpEventType } from "@angular/common/http";
import { Mastermanagertraining2Service } from "./mastermanagertraining2.service";
import { ManagersboxService } from "./../managersbox/managersbox.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { environment } from "./../../../environments/environment.prod";
const URL = environment.uploadURL;
import swal from "sweetalert2";

@Component({
  selector: "app-mastermanagertraining2",
  templateUrl: "./mastermanagertraining2.component.html",
  styleUrls: ["./mastermanagertraining2.component.scss"],
  animations: [routerTransition()],
})
export class Mastermanagertraining2Component implements OnInit {
  // File Upload
  fileInputVariable: ElementRef;
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  displayname: string = "";
  s3name: string = "";
  filetype: string = "";
  s3path: string = "";
  hideProgressbar: boolean = true;
  // video
  video_file_name: string = "";

  // worksheet
  worksheet_file_name: string = "";

  // image

  // quiz - add
  add_q_index: string = "";
  add_q_qid: string = "";
  add_q_question: string = "";
  add_q_optionA: string = "";
  add_q_optionB: string = "";
  add_q_optionC: string = "";
  add_q_optionD: string = "";
  add_q_ans: string = "";
  selected_qans_val_add: string = "";
  selected_qans_text_add: string = "";

  // quiz - edit
  edit_q_index: string = "";
  edit_q_qid: string = "";
  edit_q_question: string = "";
  edit_q_optionA: string = "";
  edit_q_optionB: string = "";
  edit_q_optionC: string = "";
  edit_q_optionD: string = "";
  edit_q_ans: string = "";
  selected_qans_val_edit: string = "";
  selected_qans_text_edit: string = "";

  // quiz - delete
  delete_q_index: string = "";

  public allmodules_list: any;
  public allsubmodules_list: any;
  selected_moduleid: string = "";
  selected_modulename: string = "";
  selected_submoduleid: string = "";
  selected_submodulename: string = "";

  public data: any;
  modalReference: any;
  closeResult: string;

  save_operation: string = "";
  hideLoading_indicator: boolean;
  hideContent_div: boolean;

  record_id: string = "";
  content_value: string = "";
  worksheet_value: any = [];
  video_value: any = [];
  flashcard_value: any = [];
  quiz_value: any = [];

  public Editor = ClassicEditor;

  constructor(
    private modalService: NgbModal,
    public router: Router,
    public route: ActivatedRoute,
    private mastermanagertraining2Service: Mastermanagertraining2Service,
    private managersboxService: ManagersboxService
  ) {
    // query params
    this.route.queryParams.subscribe((params) => {
      if (params && params.paramiters) {
        let qryParams = JSON.parse(params.paramiters);
        if (Object.keys(qryParams).length > 0) {
          this.selected_moduleid = qryParams.moduleid;
          this.selected_modulename = qryParams.modulename;
          this.selected_submoduleid = qryParams.submoduleid;
          this.selected_submodulename = qryParams.submodulename;
          this.load_record();
        }
      }
    });

    this.hideLoading_indicator = true;
    this.hideContent_div = true;

    this.reset_content_tab();
    this.reset_quiz_tab();
    this.reset_image_tab();
    this.reset_video_tab();
  }

  ngOnInit() {}

  // load record
  async load_record() {
    if (
      this.selected_moduleid != undefined &&
      this.selected_moduleid != null &&
      this.selected_moduleid != "" &&
      this.selected_submoduleid != undefined &&
      this.selected_submoduleid != null &&
      this.selected_submoduleid != ""
    ) {
      this.hideLoading_indicator = false;
      this.hideContent_div = true;
      this.mastermanagertraining2Service
        .getallmanagertrainingcontents(
          this.selected_moduleid,
          this.selected_submoduleid
        )
        .subscribe(
          (data) => {
            if (Object.keys(data).length > 0) {
              this.save_operation = "update";
              this.record_id = data[0]["_id"];

              this.content_value = data[0]["content"];
              this.quiz_value = data[0]["quiz"];
              this.flashcard_value = data[0]["flashcard"];
              this.video_value = data[0]["video"];
            } else {
              this.save_operation = "save";
              this.record_id = "";

              this.content_value = "";
              this.quiz_value = [];
              this.flashcard_value = [];
              this.video_value = [];
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
      this.quiz_value = [];
      this.flashcard_value = [];
      this.video_value = [];
      this.hideLoading_indicator = true;
      this.hideContent_div = true;
    }
  }

  onselect_editq_select(value) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_qans_val_edit = selectedOptionValue;
    this.selected_qans_text_edit = selectElementText;
  }

  onselect_addq_select(value) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_qans_val_add = selectedOptionValue;
    this.selected_qans_text_add = selectElementText;
  }

  // quiz
  addquiz() {
    let obj = {
      qid: new Date().getTime(),
      question: this.add_q_question,
      A: this.add_q_optionA,
      B: this.add_q_optionB,
      C: this.add_q_optionC,
      D: this.add_q_optionD,
      answer: this.selected_qans_val_add,
    };
    this.quiz_value.push(obj);
    this.modalReference.close();
  }

  updatequiz() {
    let obj = {
      qid: this.edit_q_qid,
      question: this.edit_q_question,
      A: this.edit_q_optionA,
      B: this.edit_q_optionB,
      C: this.edit_q_optionC,
      D: this.edit_q_optionD,
      answer: this.selected_qans_val_edit,
    };
    this.quiz_value.splice(this.edit_q_index, 1, obj);
    this.modalReference.close();
  }

  delquiz() {
    this.quiz_value.splice(this.delete_q_index, 1);
    this.modalReference.close();
  }

  // back button
  back_btn_click() {
    this.router.navigate(["mastermanagertraining1"]);
  }

  // save
  async save_btn_click(segment) {
    if (segment == "text") {
      if (
        this.content_value == undefined ||
        this.content_value == null ||
        this.content_value == ""
      ) {
        swal.fire("Info", "[1]Please add some content.", "warning");
      } else {
        const body = {
          moduleid: this.selected_moduleid,
          modulename: this.selected_modulename,
          submoduleid: this.selected_submoduleid,
          submodulename: this.selected_submodulename,
          content: this.content_value,
          flashcard: this.flashcard_value,
          worksheet: this.worksheet_value,
          video: this.video_value,
          quiz: this.quiz_value,
        };
        if (this.save_operation == "update") {
          if (confirm("Do you want to update the existing record?"))
            this.update_record(this.record_id, body);
        } else {
          if (confirm("Do you want to save this record?"))
            this.save_record(body);
        }
      }
    } else if (segment == "quiz") {
      const body = {
        quiz: this.quiz_value,
      };
      if (this.save_operation == "update") {
        if (
          this.content_value == undefined ||
          this.content_value == null ||
          this.content_value == ""
        ) {
          swal.fire("Info", "[2]Please add some content.", "warning");
        } else {
          this.update_record(this.record_id, body);
        }
      } else {
        swal.fire("Info", "[3]Please add some content.", "warning");
      }
    } else if (segment == "image") {
      if (this.save_operation == "update") {
        if (
          this.content_value == undefined ||
          this.content_value == null ||
          this.content_value == ""
        ) {
          swal.fire("Info", "[4]Please add some content.", "warning");
        } else {
          this.hideProgressbar = false;
          this.progress.percentage = 0;

          this.currentFileUpload = this.selectedFiles.item(0);
          this.managersboxService
            .pushFileToStorage(this.currentFileUpload, this.s3name)
            .subscribe((event) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress.percentage = Math.round(
                  (100 * event.loaded) / event.total
                );
              } else if (event instanceof HttpResponse) {
                this.s3path = event.body["s3path"];
                this.hideProgressbar = true;

                let obj = {
                  displayname: this.displayname,
                  s3name: this.s3name,
                  filetype: this.filetype,
                  s3path: this.s3path,
                };
                this.flashcard_value.push(obj);

                const body = {
                  flashcard: this.flashcard_value,
                };
                this.update_record(this.record_id, body);
                this.reset_image_tab();
              }
            });
        }
      } else {
        swal.fire("Info", "[5]Please add some content.", "warning");
      }
    } else if (segment == "video") {
      if (this.save_operation == "update") {
        if (
          this.content_value == undefined ||
          this.content_value == null ||
          this.content_value == ""
        ) {
          swal.fire("Info", "[6]Please add some content.", "warning");
        } else {
          this.hideProgressbar = false;
          this.progress.percentage = 0;

          this.currentFileUpload = this.selectedFiles.item(0);
          this.managersboxService
            .pushFileToStorage(this.currentFileUpload, this.s3name)
            .subscribe((event) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress.percentage = Math.round(
                  (100 * event.loaded) / event.total
                );
              } else if (event instanceof HttpResponse) {
                this.s3path = event.body["s3path"];
                this.hideProgressbar = true;

                let obj = {
                  displayname: this.displayname,
                  s3name: this.s3name,
                  filetype: this.filetype,
                  s3path: this.s3path,
                };
                this.video_value.push(obj);

                const body = {
                  video: this.video_value,
                };
                this.update_record(this.record_id, body);
                this.reset_image_tab();
              }
            });
        }
      } else {
        swal.fire("Info", "[7]Please add some content.", "warning");
      }
    }
  }

  // save record
  async save_record(body) {
    this.mastermanagertraining2Service
      .createnewmanagertrainingcontents(body)
      .subscribe(
        (data) => {
          swal.fire(
            "Success",
            "Record save status: " + data["status"],
            "success"
          );
          location.reload();
        },
        (error) => {},
        () => {}
      );
  }

  // update record
  async update_record(id, body) {
    this.mastermanagertraining2Service
      .updatemanagertrainingcontentsbyid(id, body)
      .subscribe(
        (data) => {
          swal.fire(
            "Success",
            "Record update status: " + data["status"],
            "success"
          );
          this.load_record();
        },
        (error) => {},
        () => {}
      );
  }

  // delete from s3
  delete_button_click(segmenttype, filedata, indx) {
    swal
      .fire({
        title: "Are you sure?",
        text: "Do you want to delete this file?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      })
      .then((result) => {
        if (result.value) {
          this.deletes3file(segmenttype, filedata, indx);
        }
      });
  }

  deletes3file(segmenttype, filedata, indx) {
    this.hideLoading_indicator = false;
    this.managersboxService.deleteFromStorage(filedata.s3name).subscribe(
      (data1) => {
        if (segmenttype == "image") {
          this.flashcard_value.splice(indx, 1);
          const body = {
            flashcard: this.flashcard_value,
          };
          this.update_record(this.record_id, body);
        } else if (segmenttype == "video") {
          this.video_value.splice(indx, 1);
          const body = {
            video: this.video_value,
          };
          this.update_record(this.record_id, body);
        }
      },
      (error) => {},
      () => {}
    );
  }

  // reset
  reset_content_tab() {
    this.content_value = "";
  }

  reset_quiz_tab() {
    this.quiz_value = [];
  }

  reset_image_tab() {
    this.hideProgressbar = true;
    this.progress.percentage = 0;
    this.selectedFiles = null;
    //this.fileInputVariable.nativeElement.value = "";
  }

  reset_video_tab() {
    this.video_value = [];
  }

  // Open Modal
  open(content, obj, index, flag) {
    // update
    if (flag == "add") {
      this.add_q_qid = "";
      this.add_q_question = "";
      this.add_q_optionA = "";
      this.add_q_optionB = "";
      this.add_q_optionC = "";
      this.add_q_optionD = "";
      this.add_q_ans = "";
    } else if (flag == "edit") {
      this.edit_q_index = index;
      this.edit_q_qid = obj.qid;
      this.edit_q_question = obj.question;
      this.edit_q_optionA = obj.A;
      this.edit_q_optionB = obj.B;
      this.edit_q_optionC = obj.C;
      this.edit_q_optionD = obj.D;
      this.edit_q_ans = obj.answer;
    } else if (flag == "delete") {
      this.delete_q_index = index;
    } else if (flag == "addvideo") {
    } else if (flag == "addworksheet") {
    } else {
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

  //==========================================================

  // upload button
  filechooser_onchange(event) {
    if (event.target.files.length > 0) {
      this.selectedFiles = event.target.files;
      this.displayname = event.target.files[0].name;
      this.filetype = this.displayname.split(".").pop();
      this.s3name = new Date().getTime() + "." + this.filetype;
    } else {
      this.displayname = "";
      this.selectedFiles = null;
    }
  }
}