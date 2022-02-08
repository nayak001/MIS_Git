import { Component, OnInit, ElementRef } from "@angular/core";
import { routerTransition } from "../../router.animations";
import { Router } from "@angular/router";
import { HttpResponse, HttpEventType } from "@angular/common/http";
import { MasterNsdcService } from "./masternsdcmodule.service";
import { ManagersboxService } from "../managersbox/managersbox.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import swal from "sweetalert2";

import { environment } from "../../../environments/environment.prod";
const URL = environment.uploadURL;

@Component({
  selector: "app-masternsdc",
  templateUrl: "./masternsdcmodule.component.html",
  styleUrls: ["./masternsdcmodule.component.scss"],
  animations: [routerTransition()],
})
export class MasterNsdcComponent implements OnInit {
  // video
  isSelected: boolean = true;
  selected_preflanguage: any;
  disable_button: boolean;
  video_file_name: string = "";
  divs: number[] = [];
  allcontent: any = [];
  // worksheet
  worksheet_file_name: string = "";

  // image
  imageURL = environment.ImageURL;
  uploaded_image_name: string = "";
  uploaded_image_name_arr: any = [];

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
  currentFileUpload: File;
  hideProgressbar: boolean = true;
  progress: { percentage: number } = { percentage: 0 };
  s3path: string = "";
  currentvedioFileUpload: File;
  hidevedioProgressbar: boolean = true;
  vedioprogress: { percentage: number } = { percentage: 0 };
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
  public alltopic_list: any;
  selected_topicid: any;
  selected_topicname: any;
  public data: any;
  modalReference: any;
  closeResult: string;

  save_operation: string = "save";
  hideLoading_indicator: boolean;
  hideContent_div: boolean;

  record_id: string = "";
  content_value: string = "";
  worksheet_value: any = [];
  video_value: any = [];
  flashcard_value: any = [];
  quiz_value: any = [];
  contents: any = [];
  selectedvedioFiles: any;
  displayvedioname: any;
  vediofiletype: any;
  s3vedioname: any;
  edit_selectedFiles: any;
  edit_displayname: any;
  edit_filetype: any;
  edit_s3name: any;
  edit_selectedvedioFiles: any;
  edit_displayvedioname: any;
  edit_vediofiletype: any;
  edit_s3vedioname: any;
  public Editor = ClassicEditor;

  constructor(
    private modalService: NgbModal,
    public router: Router,
    private MasterNsdcService: MasterNsdcService,
    private managersboxService: ManagersboxService
  ) {
    this.hideLoading_indicator = true;
    this.hideContent_div = false;
  }
  nsdc_mastermoduleload() {
    this.router.navigate(["/backtomaster"]);
  }
  ngOnInit() {
    this.load_record();
  }
  selected_assesment: any = "baseline";
  onselect_assesment_select(event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_assesment = selectedOptionValue;
    this.load_record();
  }
  selected_category: any = "pedagogy";
  onselect_category_select(event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_category = selectedOptionValue;
    this.load_record();
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
  delete_q_qid: any;
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
      this.delete_q_qid = obj._id;
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
  preflanguage_select_onchange(event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_preflanguage = selectedOptionValue;
    this.load_record();
    // this.load_allmodules_list(this.selected_preflanguage);
    // this.allsubmodules_list = [];
    // this.alltopic_list=[];
    // this.data = [];
  }
  reset_contents() {
    this.content_value = "";
    this.video_value = [];
    this.worksheet_value = [];
    this.flashcard_value = [];
    this.quiz_value = [];
  }
  dataid: any;
  all_fellows: any;
  async load_record() {
    // getalluser;
    this.MasterNsdcService.getnsdcusers().subscribe(
      (data) => {
        if (Object.keys(data).length > 0) {
          this.all_fellows = data;
        } else {
          this.all_fellows = [];
        }
      },
      (error) => {},
      () => {}
    );
    // this.MasterNsdcService.getnsdcexamquestions("subjective").subscribe(
    //   (data) => {
    //     if (Object.keys(data).length > 0) {
    //       this.dataid = data[0]._id;
    //       this.quiz_value = data;
    //       this.save_operation = "save";
    //     } else {
    //       this.quiz_value = [];
    //     }
    //   },
    //   (error) => {},
    //   () => {}
    // );
  }
  selected_user: any;
  user_select_onchange() {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_user = selectedOptionValue;
    this.MasterNsdcService.getansfromuser(this.selected_user).subscribe(
      (data) => {
        if (Object.keys(data).length > 0) {
          this.quiz_value = data[0].questionanswer;
        } else {
        }
      },
      (error) => {},
      () => {}
    );
  }
  secured_mark: any;
  save_mark() {
    if (
      this.secured_mark == "" ||
      this.secured_mark == undefined ||
      this.selected_user == undefined
    ) {
      swal.fire("info", "Please select user and mark!", "warning");
    } else {
      const body = {
        evaluate: "complete",
        score: this.secured_mark,
        userid: this.selected_user,
      };
      this.MasterNsdcService.updateuserstatus(body).subscribe(
        (data) => {
          swal.fire("Success", "user status updated successfully", "success");
          this.load_record();
        },
        (error) => {},
        () => {}
      );
    }
  }
  addquiz() {
    if (this.add_q_question == "" || this.selected_qans_val_add == "") {
      swal.fire(
        "info",
        "Please fill at least two options with answer!!!",
        "warning"
      );
    } else {
      let obj = {
        qid: new Date().getTime(),
        question: this.add_q_question,
        A: this.add_q_optionA == "" ? "" : this.add_q_optionA,
        B: this.add_q_optionB == "" ? "" : this.add_q_optionB,
        C: this.add_q_optionC == "" ? "" : this.add_q_optionC,
        D: this.add_q_optionD == "" ? "" : this.add_q_optionD,
        answer: this.selected_qans_val_add,
      };
      this.quiz_value.push(obj);
      this.modalReference.close();
    }
  }
  updatequiz() {
    //let obj = {
    // qid:this.edit_q_qid,
    // question: this.edit_q_question,
    // A: this.edit_q_optionA,
    // B: this.edit_q_optionB,
    // C: this.edit_q_optionC,
    // D: this.edit_q_optionD,
    // answer: this.selected_qans_val_edit
    //}
    //this.quiz_value.splice(this.edit_q_index, 1, obj);
    this.modalReference.close();
  }

  //delquiz(){
  // this.quiz_value.splice(this.delete_q_index, 1);
  // this.modalReference.close();
  //}
  async delquiz() {
    var contentdata;
    var record_id;

    this.MasterNsdcService.deletecontent(this.delete_q_qid).subscribe(
      (data) => {
        swal.fire("Success", "Record updated successfully", "success");
        this.load_record();
      },
      (error) => {},
      () => {}
    );
  }

  async save_btn_click() {
    this.save_operation = "save";
    if (this.save_operation == "save") {
      const body = {
        qid: new Date().getTime(),
        question: this.add_q_question,
        A: this.add_q_optionA == "" ? "" : this.add_q_optionA,
        B: this.add_q_optionB == "" ? "" : this.add_q_optionB,
        C: this.add_q_optionC == "" ? "" : this.add_q_optionC,
        D: this.add_q_optionD == "" ? "" : this.add_q_optionD,
        answer: this.selected_qans_val_add,
        language: this.selected_preflanguage,
        type: this.selected_assesment,
        category: this.selected_category,
      };
      this.MasterNsdcService.createteacherassesment(body).subscribe(
        (data) => {
          swal.fire("Success", "assesment created successfully", "success");
          this.load_record();
        },
        (error) => {},
        () => {}
      );
    } else {
      swal.fire("info", "Something went wrong !!!", "warning");
    }
  }
  async update_btn_click() {
    if (this.save_operation == "update") {
      const body = {
        qid: this.edit_q_qid,
        question: this.edit_q_question,
        A: this.edit_q_optionA,
        B: this.edit_q_optionB,
        C: this.edit_q_optionC,
        D: this.edit_q_optionD,
        answer: this.selected_qans_val_edit,
        language: this.selected_preflanguage,
        type: this.selected_assesment,
        category: this.selected_category,
      };
      this.MasterNsdcService.updateteacherassesment(
        this.dataid,
        body
      ).subscribe(
        (data) => {
          swal.fire("Success", "assesment updated successfully", "success");
          this.load_record();
        },
        (error) => {},
        () => {}
      );
    } else {
      swal.fire("info", "Something went wrong !!!", "warning");
    }
  }
}
