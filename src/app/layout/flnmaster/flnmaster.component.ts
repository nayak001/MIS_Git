import { Component, OnInit, ElementRef } from "@angular/core";
import { routerTransition } from "../../router.animations";
import { Router } from "@angular/router";
import { HttpResponse, HttpEventType } from "@angular/common/http";
import { FlnService } from "./flnmaster.service";
import { ManagersboxService } from "../managersbox/managersbox.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import swal from "sweetalert2";

import { environment } from "../../../environments/environment.prod";
const URL = environment.uploadURL;

@Component({
  selector: "app-flnmaster",
  templateUrl: "./flnmaster.component.html",
  styleUrls: ["./flnmaster.component.scss"],
  animations: [routerTransition()],
})
export class FlnMasterComponent implements OnInit {
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
  quiz_value: string = "";
  activity_documents: any = [];
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
  isPGE: boolean = true;
  isECE: boolean = true;
  public Editor = ClassicEditor;

  constructor(
    private modalService: NgbModal,
    public router: Router,
    private FlnService: FlnService,
    private managersboxService: ManagersboxService
  ) {
    this.hideLoading_indicator = true;
    this.hideContent_div = false;
    this.selected_preflanguage = "od";
    this.selected_assesment = "baseline";
  }

  ngOnInit() {
    this.load_record();
    this.load_activity_record();
  }
  selected_assesment: any = "baseline";
  show_month: boolean = false;
  onselect_assesment_select(event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_assesment = selectedOptionValue;
    console.log("assessment", this.selected_assesment);

    if (
      this.selected_assesment == "baseline" ||
      this.selected_assesment == "midline" ||
      this.selected_assesment == "endline"
    ) {
      this.show_month = false;
    } else {
      this.show_month = true;
    }
    this.load_record();
  }

  onselect_change_class(event) {
    // const selectedOptions = event.target["options"];
    // const selectedIndex = selectedOptions.selectedIndex;
    // const selectedOptionValue = selectedOptions[selectedIndex].value;
    // const selectElementText = selectedOptions[selectedIndex].text;
    // console.log("elementtext-->",selectElementText)
    // this.selected_class = selectedOptionValue;
    // console.log("selected class-->",this.selected_class)
    // this.checkProgram();
    // this.load_record();
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    console.log("elementtext-->",selectElementText)
    this.selected_program = selectElementText ;
    console.log("selected program-->",this.selected_program)
    this.selected_class = selectedOptionValue;
    console.log("selected class-->",this.selected_class)
    this.checkProgram();
    this.load_record();
  }

  checkProgram() {
      if (this.selected_program == "PGE") {
      
        this.isPGE = true;
        this.isECE = false;
        console.log("isPge2-->", this.isPGE)
        console.log("isece2-->", this.isECE)

      
      // this.selected_subject = "na";
    } else{
      this.isPGE = false;
      this.isECE = true;
      console.log("isPge1-->", this.isPGE)
      console.log("isece1-->", this.isECE)
    }
    
   
      
  }

  onselect_assesment_subject(event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_subject = selectedOptionValue;
    this.load_record();
    console.log("subj", this.selected_subject);
  }

  onselect_change_month(event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_month = selectedOptionValue;
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
  delete_ques_id: any;
  edit_ques_id: any;
  open(content, obj, index, flag) {
    console.log("--> obj: ", obj, "    index: ", index, "    flag: ", flag);
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
      this.edit_q_question = obj.assessmentquestion;
      this.edit_q_optionA = obj.A;
      this.edit_q_optionB = obj.B;
      this.edit_q_optionC = obj.C;
      this.edit_q_optionD = obj.D;
      this.edit_q_ans = obj.answer;
      this.edit_ques_id = obj._id;
    } else if (flag == "delete") {
      this.delete_ques_id = obj;
      this.delete_doc_id = obj._id;
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
  selected_activity_class: any;
  activity_class_select_onchange(event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_activity_class = selectedOptionValue;
    this.load_record();
    this.load_activity_record();
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
    this.quiz_value = "";
  }
  dataid: any;
  activity_doc: any = [];
  selected_class: any = 1;
  selected_month: any = "month0";
  selected_subject: any = "odia";
  selected_program:any = "PGE";
  alldata: any;
  async load_record() {
    this.FlnService.getallflnmasterdata(
      this.selected_assesment,
      this.selected_preflanguage,
      this. selected_program,
      this.selected_class,
      this.selected_subject,
     
    ).subscribe(
      (data) => {
        if (Object.keys(data).length > 0) {
          this.alldata = data;
          console.log("alldata-->",this.alldata)
          this.dataid = data[0]._id;
          this.hideProgressbar = false;
          this.save_operation = "update";
        } else {
          this.quiz_value = "";
          this.alldata = [];
          this.save_operation = "save";
        }
      },
      (error) => {},
      () => {}
    );
  }
  delete_doc_id: any;
  async load_activity_record() {
    this.FlnService.getflnactivitydocument(
      this.selected_activity_class
    ).subscribe(
      (data) => {
        if (Object.keys(data).length > 0) {
          this.activity_doc = data;
        } else {
          this.activity_doc = [];
        }
      },
      (error) => {},
      () => {}
    );
  }

  addquiz12() {
    if (this.add_q_question == "") {
      swal.fire("info", "Please add the question!!!", "warning");
    } else {
      let obj = {
        qid: new Date().getTime(),
        question: this.add_q_question,
        // "A": (this.add_q_optionA == '')?'':this.add_q_optionA,
        // "B": (this.add_q_optionB == '')?'':this.add_q_optionB,
        // "C": (this.add_q_optionC == '')?'':this.add_q_optionC,
        // "D": (this.add_q_optionD == '')?'':this.add_q_optionD,
        // "answer": this.selected_qans_val_add
      };
      this.quiz_value = this.add_q_question;
      this.modalReference.close();
    }
  }
  updatequiz() {
    const body = {
      assessmentquestion: this.edit_q_question,
    };
    this.quiz_value = this.edit_q_question;
    this.modalReference.close();
    this.FlnService.updateflnmasterdata(this.edit_ques_id, body).subscribe(
      (data) => {
        swal.fire("Success", "assesment updated successfully", "success");
        this.load_record();
      },
      (error) => {},
      () => {}
    );
  }
  openUploadDocModal() {}
  delquiz() {
    //this.quiz_value.splice(this.delete_q_index, 1);
    this.FlnService.deleteflncontent(this.delete_ques_id).subscribe(
      (data) => {
        swal.fire("Success", "assesment deleted successfully", "success");
        this.load_record();
      },
      (error) => {},
      () => {}
    );
    this.modalReference.close();
    this.load_record();
  }
  deleteactivity() {
    // -------------------------- Get S3 File Name ----------------------------
    var selected_obj = this.delete_ques_id;
    var s3_filepath = selected_obj ? selected_obj.activitydocument : "";
    var s3_filename = s3_filepath
      ? s3_filepath.substring(s3_filepath.lastIndexOf("/") + 1)
      : "";
    console.log("Obj: ", selected_obj, "   s3_filename: ", s3_filename);
    // ------------------------------------------------------------------------

    // Delete from db
    this.FlnService.deletecontent(this.delete_doc_id).subscribe(
      (data) => {
        // Delete from S3
        this.managersboxService
          .deleteFromStorage(s3_filename)
          .subscribe((event) => {
            swal.fire("Success", "document deleted successfully", "success");
            this.load_activity_record();
            this.modalReference.close();
          });
      },
      (error) => {},
      () => {}
    );
    this.modalReference.close();
  }

  async addquiz() {
    if (this.add_q_question == "") {
      swal.fire("info", "Please add the question!!!", "warning");
    } else {
      const body = {
        assessmentquestion: this.add_q_question,
        language: this.selected_preflanguage,
        type: this.selected_assesment,
        class: this.selected_class,
        subject: this.selected_subject,
        program:this.selected_program,
      };
      console.log("bodyfln", body);

      this.FlnService.createflnmasterdata(body).subscribe(
        (data) => {
          swal.fire("Success", "assesment created successfully", "success");
          this.load_record();
        },
        (error) => {},
        () => {}
      );
      this.modalReference.close();
    }
  }

  selectedFiles: FileList;
  displayname: string;
  filetype: string;
  s3name: string;
  filechooser_onchange(event) {
    if (event.target.files.length > 0) {
      this.selectedFiles = event.target.files;
      this.displayname = event.target.files[0].name;
      this.filetype = this.displayname.split(".").pop();
      this.s3name = new Date().getTime() + "." + this.filetype;
      this.hideProgressbar = false;
      this.progress.percentage = 0;
      this.currentFileUpload = this.selectedFiles.item(0);
      this.FlnService.pushFileToStorage(
        this.currentFileUpload,
        this.s3name
      ).subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(
            (100 * event.loaded) / event.total
          );
        } else if (event instanceof HttpResponse) {
          this.s3path = event.body["s3path"];
          this.hideProgressbar = true;
        }
      });
    } else {
      this.displayname = "";
      this.selectedFiles = null;
    }
  }
  uploadactivitydoc() {
    if (this.s3path == "") {
      swal.fire("info", "Please add the activity!!!", "warning");
    } else {
      const body = {
        class: this.selected_activity_class,
        activitydocument: this.s3path,
        filetype: this.filetype,
        displayname: this.displayname,
      };
      this.FlnService.saveactivitydocument(body).subscribe(
        (data) => {
          swal.fire("Success", "activity saved successfully", "success");
          this.load_record();
          this.load_activity_record();
          this.hideProgressbar = false;
          this.progress.percentage = 0;
          this.modalReference.close();
        },
        (error) => {},
        () => {}
      );
    }
  }
}