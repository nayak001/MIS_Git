import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { routerTransition } from "../../router.animations";
import { Router, NavigationExtras } from "@angular/router";
import { HttpResponse, HttpEventType } from "@angular/common/http";
import swal from "sweetalert2";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { PgeactivitiesService } from "./pgeactivities.service";
import { GalleryService } from "./../gallery/gallery.service";

import { ManagersboxService } from "./../managersbox/managersbox.service";

@Component({
  selector: "app-pgeactivities",
  templateUrl: "./pgeactivities.component.html",
  styleUrls: ["./pgeactivities.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: [routerTransition()],
})
export class PgeactivitiesComponent implements OnInit {
  @ViewChild("updatetextcontentsmodal") updatetextcontentsmodal: any;
  @ViewChild("updateimagecontentsmodal") updateimagecontentsmodal: any;
  @ViewChild("updatevideocontentsmodal") updatevideocontentsmodal: any;
  @ViewChild("textpreviewmodal") textpreviewmodal: any;
  @ViewChild("imagepreviewmodal") imagepreviewmodal: any;
  @ViewChild("videopreviewmodal") videopreviewmodal: any;

  // File chooser variables
  selectedFiles: FileList;
  displayname: string;
  filetype: string;
  s3name: string;

  public Editor1 = ClassicEditor;
  public Editor2 = ClassicEditor;

  save_operation: string = "";
  record_id: string = "";
  selected_preflanguage = "";
  selected_program: string = "pge";
  selected_class: string = "";
  selected_subject: string = "";
  selected_skillsetid: string = "";
  selected_skillsetname: string = "";

  class_select_option_list: any = [
    { value: "1", text: "1" },
    { value: "2", text: "2" },
    { value: "3", text: "3" },
    { value: "4", text: "4" },
    { value: "5", text: "5" },
  ];
  skill_select_option_list: any = [];

  extraresources_list: any = [];
  segments_list: any = [];
  selected_segment_index: number = -1;
  selected_segment: any = {};
  selected_segment_type: string = "";
  selected_segment_displayname: string = "";
  selected_segment_s3name: string = "";
  selected_segment_filetype: string = "";
  selected_segment_s3_url: string = "";
  selected_segment_preview_url: string = "";
  selected_segment_value: string = "";
  current_segment_details: string = "";

  hide_Loading_indicator: boolean;
  hide_createnewsegment_button: boolean = false;
  isSelected: boolean = true;

  closeResult: string;
  modalReference: any;

  content_value: string = "";
  image_value: any = [];
  video_value: any = [];

  text_to_preview: string = "";
  image_to_preview: string = "";
  video_to_play: string = "";

  // to delete
  skillset_label: string = "Skill Set";
  month_select_option_list: any = [];

  constructor(
    private modalService: NgbModal,
    public router: Router,
    private pgeactivitiesService: PgeactivitiesService,
    private galleryService: GalleryService,
    private managersboxService: ManagersboxService
  ) {
    this.selected_program = "pge";
    this.selected_class = "";
    this.selected_subject = "";
    this.selected_skillsetid = "";
    this.selected_preflanguage = "od";

    this.content_value = "";
    this.video_value = [];

    //this.skillset_label = 'Skill Set';
    this.class_select_option_list = [
      { value: "1", text: "1" },
      { value: "2", text: "2" },
      { value: "3", text: "3" },
      { value: "4", text: "4" },
      { value: "5", text: "5" },
    ];

    this.hide_Loading_indicator = true;
    this.hide_createnewsegment_button = true;
  }

  ngOnInit() {}

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

  preflanguage_select_onchange(event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_preflanguage = selectedOptionValue;

    // Reset other dropdown list
    this.selected_class = "";
    this.selected_subject = "";
    this.selected_skillsetid = "";
    this.selected_skillsetname = "";
    this.load_record(
      this.selected_preflanguage,
      this.selected_program,
      this.selected_subject,
      this.selected_class,
      this.selected_skillsetid
    );
  }

  class_select_onchange(value) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_class = selectedOptionValue;

    this.selected_skillsetid = "";
    this.selected_skillsetname = "";
    this.load_skilllist();
    this.load_record(
      this.selected_preflanguage,
      this.selected_program,
      this.selected_subject,
      this.selected_class,
      this.selected_skillsetid
    );
  }

  subject_select_onchange(value) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_subject = selectedOptionValue;

    this.load_skilllist();
    this.load_record(
      this.selected_preflanguage,
      this.selected_program,
      this.selected_subject,
      this.selected_class,
      this.selected_skillsetid
    );
  }

  skill_select_onchange(value) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_skillsetid = selectedOptionValue;
    this.selected_skillsetname = selectElementText;
    this.load_record(
      this.selected_preflanguage,
      this.selected_program,
      this.selected_subject,
      this.selected_class,
      this.selected_skillsetid
    );
  }

  // ====================================== Segment related codes started from here =================================

  segment_select_onchange(value) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_segment_index = selectedOptionValue;
    this.load_segment(this.selected_segment_index);
  }

  reset_segment() {
    this.selected_segment = {};
    this.selected_segment_type = "";
    this.selected_segment_displayname = "";
    this.selected_segment_s3name = "";
    this.selected_segment_filetype = "";
    this.selected_segment_s3_url = "";
    this.selected_segment_preview_url = "";
    this.selected_segment_value = "";
    this.current_segment_details = "";
    this.hide_Loading_indicator = true;
  }

  async load_segment(idx) {
    this.reset_segment();
    this.hide_Loading_indicator = false;

    this.selected_segment = this.segments_list[idx];
    if (
      this.selected_segment == undefined ||
      this.selected_segment == null ||
      Object.keys(this.selected_segment).length <= 0
    ) {
      this.reset_segment();
    } else {
      this.selected_segment_type = this.selected_segment.type;
      this.selected_segment_displayname = this.selected_segment.displayname;
      this.selected_segment_s3name = this.selected_segment.s3name;
      this.selected_segment_filetype = this.selected_segment.filetype;
      this.selected_segment_s3_url = this.selected_segment.s3_url;
      this.selected_segment_preview_url = this.selected_segment.preview_url;
      this.selected_segment_value = this.selected_segment.value;

      if (this.selected_segment_type == "text_content") {
        this.current_segment_details = this.selected_segment_value;
        this.hide_Loading_indicator = true;
      } else if (this.selected_segment_type == "image_content") {
        this.current_segment_details =
          '<div class="imgcenter"><img src=' +
          this.selected_segment_s3_url +
          ' class="imgpreview" /></div>';
        this.hide_Loading_indicator = true;
      } else if (this.selected_segment_type == "video_content") {
        this.current_segment_details =
          '<div class="imgcenter"><img src="assets/images/video_preview.jpg" class="imgpreview" /></div>';
        this.hide_Loading_indicator = true;
      }
    }
  }

  delete_segment_btn_click() {
    swal
      .fire({
        title: "Are you sure?",
        text: "Do you want to remove this segement?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      })
      .then((result) => {
        if (result.value) {
          this.delete_segment();
        }
      });
  }

  delete_segment() {
    let segment_to_delete = this.segments_list[this.selected_segment_index];
    let file_to_delete = segment_to_delete.s3name;
    console.log(
      "--> file_to_delete: ",
      file_to_delete,
      "    segment_to_delete: ",
      segment_to_delete
    );
    this.segments_list.splice(this.selected_segment_index, 1);
    const body = {
      segment: this.segments_list,
    };

    if (
      this.selected_segment_type == "image_content" ||
      this.selected_segment_type == "video_content"
    ) {
      // Delete from db
      this.galleryService.deleteFromStorage(null, file_to_delete).subscribe(
        (data1) => {
          // Delete from S3
          this.managersboxService
            .deleteFromStorage(file_to_delete)
            .subscribe((event) => {
              this.update_record(this.record_id, body);
              this.go_btn_click();
            });
          this.update_record(this.record_id, body);
          this.go_btn_click();
        },
        (error) => {},
        () => {}
      );
    } else {
      this.update_record(this.record_id, body);
      this.go_btn_click();
    }
  }

  update_segment_btn_click() {
    let segment_to_update = this.segments_list[this.selected_segment_index];
    if (this.selected_segment_type == "text_content") {
      this.openupdatetextcontentsmodal(this.updatetextcontentsmodal);
    } else if (this.selected_segment_type == "image_content") {
      this.openupdateimagecontentsmodal(this.updateimagecontentsmodal);
    } else if (this.selected_segment_type == "video_content") {
      this.openupdatevideocontentsmodal(this.updatevideocontentsmodal);
    }
  }

  update_segment(modalwindow) {
    if (modalwindow == "textcontentsmodal") {
      let newobj = {
        type: "text_content",
        displayname: null,
        s3name: null,
        filetype: null,
        s3_url: null,
        preview_url: null,
        value: this.content_value,
      };
      this.segments_list.splice(this.selected_segment_index, 1, newobj);
      let body = {
        segment: this.segments_list,
      };
      this.update_record(this.record_id, body);
      this.modalReference.close();
    } else if (modalwindow == "imagecontentsmodal") {
      let oldfilename = this.segments_list[this.selected_segment_index].s3name;
      this.hideProgressbar = false;
      this.progress.percentage = 0;
      this.currentFileUpload = this.selectedFiles.item(0);
      this.galleryService
        .pushFileToStorage(this.currentFileUpload, null, this.s3name)
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress.percentage = Math.round(
              (100 * event.loaded) / event.total
            );
          } else if (event instanceof HttpResponse) {
            this.hideProgressbar = true;
            this.s3path = event.body["s3path"];
            let newobj = {
              type: "image_content",
              displayname: this.displayname,
              s3name: this.s3name,
              filetype: this.filetype,
              s3_url: this.s3path,
              preview_url: this.s3path,
              value: this.s3path,
            };
            this.segments_list.splice(this.selected_segment_index, 1, newobj);
            let body = {
              segment: this.segments_list,
            };
            this.update_record(this.record_id, body);
            this.galleryService.deleteFromStorage(null, oldfilename).subscribe(
              (data1) => {},
              (error) => {},
              () => {}
            );
            this.modalReference.close();
          }
        });
    } else if (modalwindow == "videocontentsmodal") {
      let oldfilename = this.segments_list[this.selected_segment_index].s3name;
      this.hideProgressbar = false;
      this.progress.percentage = 0;
      this.currentFileUpload = this.selectedFiles.item(0);
      this.galleryService
        .pushFileToStorage(this.currentFileUpload, null, this.s3name)
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress.percentage = Math.round(
              (100 * event.loaded) / event.total
            );
          } else if (event instanceof HttpResponse) {
            this.hideProgressbar = true;
            this.s3path = event.body["s3path"];
            let newobj = {
              type: "video_content",
              displayname: this.displayname,
              s3name: this.s3name,
              filetype: this.filetype,
              s3_url: this.s3path,
              preview_url: this.s3path,
              value: this.s3path,
            };
            this.segments_list.splice(this.selected_segment_index, 1, newobj);
            let body = {
              segment: this.segments_list,
            };
            this.update_record(this.record_id, body);
            this.galleryService.deleteFromStorage(null, oldfilename).subscribe(
              (data1) => {},
              (error) => {},
              () => {}
            );
            this.modalReference.close();
          }
        });
    }
  }

  preview_segment_btn_click() {
    if (this.selected_segment_type == "text_content") {
      this.opentextpreviewmodal(this.textpreviewmodal);
    } else if (this.selected_segment_type == "image_content") {
      this.openimagepreviewmodal(this.imagepreviewmodal);
    } else if (this.selected_segment_type == "video_content") {
      this.openvideopreviewmodal(this.videopreviewmodal);
    }
  }

  // Resources
  add_resources_btn_click() {
    if (this.save_operation == "save") {
      swal.fire("info", "Please add atleast one segment first", "warning");
      this.modalReference.close();
    } else {
      this.hideProgressbar = false;
      this.progress.percentage = 0;
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.displayname = this.selectedFiles[i].name;
        this.filetype = this.displayname.split(".").pop();
        this.s3name = new Date().getTime() + "." + this.filetype;
        this.currentFileUpload = this.selectedFiles.item(i);
        this.galleryService
          .pushFileToStorage(this.currentFileUpload, null, this.s3name)
          .subscribe((event) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress.percentage = Math.round(
                (100 * event.loaded) / event.total
              );
            } else if (event instanceof HttpResponse) {
              this.hideProgressbar = true;
              this.s3path = event.body["s3path"];
              let newobj = {
                type: "resources",
                displayname: this.displayname,
                s3name: this.s3name,
                filetype: this.filetype,
                s3_url: this.s3path,
                preview_url: this.s3path,
                value: this.s3path,
              };
              this.extraresources_list.push(newobj);
              let body = {
                extraresources: this.extraresources_list,
              };
              this.update_record(this.record_id, body);
              this.modalReference.close();
            }
          });
      }
    }
  }

  delete_resource_btn_click(index_position) {
    swal
      .fire({
        title: "Are you sure?",
        text: "Do you want to remove this Resource file?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      })
      .then((result) => {
        if (result.value) {
          this.delete_resource_file(index_position);
        }
      });
  }

  delete_resource_file(index_position) {
    let resource_to_delete = this.extraresources_list[index_position];
    let file_to_delete = resource_to_delete.s3name;
    this.extraresources_list.splice(index_position, 1);
    const body = {
      extraresources: this.extraresources_list,
    };
    this.galleryService.deleteFromStorage(null, file_to_delete).subscribe(
      (data1) => {
        this.update_record(this.record_id, body);
        this.go_btn_click();
      },
      (error) => {},
      () => {}
    );
  }
  // ====================================== Segment related codes ends here =================================

  go_btn_click() {
    this.load_record(
      this.selected_preflanguage,
      this.selected_program,
      this.selected_subject,
      this.selected_class,
      this.selected_skillsetid
    );
  }

  async load_record(preflanguage, program, subject, clas, skill) {
    this.selected_segment_index = -1;
    this.reset_segment();
    if (
      preflanguage != undefined &&
      preflanguage != null &&
      preflanguage != "" &&
      subject != undefined &&
      subject != null &&
      subject != "" &&
      clas != undefined &&
      clas != null &&
      clas != "" &&
      skill != undefined &&
      skill != null &&
      skill != ""
    ) {
      this.content_value = "";
      this.video_value = [];
      this.hide_Loading_indicator = false;
      this.hide_createnewsegment_button = false;

      let preferedlanguage = preflanguage;
      this.pgeactivitiesService
        .getmasteractivitiydetails(
          preferedlanguage,
          "pge",
          subject,
          clas,
          skill
        )
        .subscribe(
          (data) => {
            if (Object.keys(data).length > 0) {
              this.save_operation = "update";
              this.record_id = data[0]["_id"];
              this.extraresources_list = data[0]["extraresources"];
              this.segments_list = data[0]["segment"];
              // added by nayak on 21-09-2020 to set segment 1 selected bydefault
              if (this.segments_list.length > 0) {
                this.load_segment(0);
              }
            } else {
              this.save_operation = "save";
              this.record_id = "";
              this.extraresources_list = [];
              this.segments_list = [];
            }
            this.hide_Loading_indicator = true;
          },
          (error) => {},
          () => {}
        );
    } else {
      this.hide_Loading_indicator = true;
      this.hide_createnewsegment_button = true;
    }
  }

  currentFileUpload: File;
  hideProgressbar: boolean = true;
  progress: { percentage: number } = { percentage: 0 };
  s3path: string = "";

  async save_btn_click(selected_tab) {
    let body = {};
    if (selected_tab == "textcontent_tab") {
      if (
        this.content_value == undefined ||
        this.content_value == null ||
        this.content_value == ""
      ) {
        swal.fire("info", "Please add some content !!!", "warning");
      } else {
        if (this.save_operation == "save") {
          body = {
            preferedlanguage: this.selected_preflanguage,
            program: "pge",
            themeid: "",
            themename: "na",
            subject: this.selected_subject,
            class: this.selected_class,
            skillsetid: this.selected_skillsetid,
            skillsetname: this.selected_skillsetname,
            segment: [
              {
                type: "text_content",
                displayname: null,
                s3name: null,
                filetype: null,
                s3_url: null,
                preview_url: null,
                value: this.content_value,
              },
            ],
            extraresources: [],
          };
          this.save_record(body);
          this.modalReference.close();
        } else {
          let newobj = {
            type: "text_content",
            displayname: null,
            s3name: null,
            filetype: null,
            s3_url: null,
            preview_url: null,
            value: this.content_value,
          };
          this.segments_list.push(newobj);
          body = {
            segment: this.segments_list,
          };
          this.update_record(this.record_id, body);
          this.modalReference.close();
        }
      }
    } else if (selected_tab == "image_tab") {
      if (this.selectedFiles == undefined || this.selectedFiles == null) {
        swal.fire("info", "Please select image file", "warning");
      } else {
        this.hideProgressbar = false;
        this.progress.percentage = 0;
        for (let i = 0; i < this.selectedFiles.length; i++) {
          this.displayname = this.selectedFiles[i].name;
          this.filetype = this.displayname.split(".").pop();
          this.s3name = new Date().getTime() + "." + this.filetype;
          this.currentFileUpload = this.selectedFiles.item(i);
          this.galleryService
            .pushFileToStorage(this.currentFileUpload, null, this.s3name)
            .subscribe((event) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress.percentage = Math.round(
                  (100 * event.loaded) / event.total
                );
              } else if (event instanceof HttpResponse) {
                this.s3path = event.body["s3path"];
                this.hideProgressbar = true;
                if (this.save_operation == "save") {
                  body = {
                    preferedlanguage: this.selected_preflanguage,
                    program: "pge",
                    themeid: "",
                    themename: "na",
                    subject: this.selected_subject,
                    class: this.selected_class,
                    skillsetid: this.selected_skillsetid,
                    skillsetname: this.selected_skillsetname,
                    segment: [
                      {
                        type: "image_content",
                        displayname: this.displayname,
                        s3name: this.s3name,
                        filetype: this.filetype,
                        s3_url: this.s3path,
                        preview_url: this.s3path,
                        value: this.s3path,
                      },
                    ],
                    extraresources: [],
                  };
                  this.save_record(body);
                  this.modalReference.close();
                } else {
                  let newobj = {
                    type: "image_content",
                    displayname: this.displayname,
                    s3name: this.s3name,
                    filetype: this.filetype,
                    s3_url: this.s3path,
                    preview_url: this.s3path,
                    value: this.s3path,
                  };
                  this.segments_list.push(newobj);
                  body = {
                    segment: this.segments_list,
                  };
                  this.update_record(this.record_id, body);
                  this.modalReference.close();
                }
              }
            });
        }
      }
    } else if (selected_tab == "video_tab") {
      if (this.selectedFiles == undefined || this.selectedFiles == null) {
        swal.fire("info", "Please select video file", "warning");
      } else {
        this.hideProgressbar = false;
        this.progress.percentage = 0;
        for (let i = 0; i < this.selectedFiles.length; i++) {
          this.displayname = this.selectedFiles[i].name;
          this.filetype = this.displayname.split(".").pop();
          this.s3name = new Date().getTime() + "." + this.filetype;
          this.currentFileUpload = this.selectedFiles.item(i);
          this.galleryService
            .pushFileToStorage(this.currentFileUpload, null, this.s3name)
            .subscribe((event) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress.percentage = Math.round(
                  (100 * event.loaded) / event.total
                );
              } else if (event instanceof HttpResponse) {
                this.s3path = event.body["s3path"];
                this.hideProgressbar = true;
                if (this.save_operation == "save") {
                  body = {
                    preferedlanguage: this.selected_preflanguage,
                    program: "pge",
                    themeid: "",
                    themename: "na",
                    subject: this.selected_subject,
                    class: this.selected_class,
                    skillsetid: this.selected_skillsetid,
                    skillsetname: this.selected_skillsetname,
                    segment: [
                      {
                        type: "video_content",
                        displayname: this.displayname,
                        s3name: this.s3name,
                        filetype: this.filetype,
                        s3_url: this.s3path,
                        preview_url: this.s3path,
                        value: this.s3path,
                      },
                    ],
                    extraresources: [],
                  };
                  this.save_record(body);
                  this.modalReference.close();
                } else {
                  let newobj = {
                    type: "video_content",
                    displayname: this.displayname,
                    s3name: this.s3name,
                    filetype: this.filetype,
                    s3_url: this.s3path,
                    preview_url: this.s3path,
                    value: this.s3path,
                  };
                  this.segments_list.push(newobj);
                  body = {
                    segment: this.segments_list,
                  };
                  this.update_record(this.record_id, body);
                  this.modalReference.close();
                }
              }
            });
        }
      }
    }
  }

  async save_record(body) {
    this.pgeactivitiesService.createmasteractivities(body).subscribe(
      (data) => {
        swal.fire("Successful", "Data saved successfully", "success");
        this.load_record(
          this.selected_preflanguage,
          this.selected_program,
          this.selected_subject,
          this.selected_class,
          this.selected_skillsetid
        );
      },
      (error) => {},
      () => {}
    );
  }

  async update_record(id, body) {
    this.pgeactivitiesService.updatemasteractivities(id, body).subscribe(
      (data) => {
        swal.fire("Successful", "Data updated successfully", "success");
        this.load_record(
          this.selected_preflanguage,
          this.selected_program,
          this.selected_subject,
          this.selected_class,
          this.selected_skillsetid
        );
      },
      (error) => {},
      () => {}
    );
  }

  opencontentsmodal(content) {
    this.content_value = "";
    this.modalReference = this.modalService.open(content, {
      size: "lg",
      backdrop: "static",
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
  click_to_add_skill() {
    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: {
        program: "pge",
        navigatedfrom: "/pgeactivities",
      },
    };
    this.router.navigate(["/pgskillmaster"], navigationExtras);
  }
  open(content) {
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

  openupdatetextcontentsmodal(content) {
    this.content_value = this.selected_segment.value;
    this.modalReference = this.modalService.open(content, {
      size: "lg",
      backdrop: "static",
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

  openupdateimagecontentsmodal(content) {
    this.image_value = this.selected_segment.s3_url;
    this.modalReference = this.modalService.open(content, {
      size: "lg",
      backdrop: "static",
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

  openupdatevideocontentsmodal(content) {
    this.video_value = this.selected_segment.s3_url;
    this.modalReference = this.modalService.open(content, {
      size: "lg",
      backdrop: "static",
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

  opentextpreviewmodal(content) {
    this.text_to_preview = this.selected_segment.value;
    this.modalReference = this.modalService.open(content, {
      size: "lg",
      backdrop: "static",
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

  openimagepreviewmodal(content) {
    this.image_to_preview = this.selected_segment.s3_url;
    this.modalReference = this.modalService.open(content, {
      size: "lg",
      backdrop: "static",
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

  openvideopreviewmodal(content) {
    this.video_to_play = this.selected_segment.s3_url;
    this.modalReference = this.modalService.open(content, {
      size: "lg",
      backdrop: "static",
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

  openreordersegments(content) {
    this.video_to_play = this.selected_segment.s3_url;
    this.modalReference = this.modalService.open(content, {
      size: "lg",
      backdrop: "static",
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

  reordered_segments_list: any = [];
  listStyle: any = {
    width: "400px", //default 300,
    height: "250px", //default 250,
    dropZoneHeight: "50px", //default 50
  };

  listOrderChanged(event) {
    this.reordered_segments_list = event;
  }

  save_reorder_btn_click() {
    this.reordered_segments_list =
      this.reordered_segments_list == undefined ||
      this.reordered_segments_list == null
        ? []
        : this.reordered_segments_list;
    if (this.reordered_segments_list.length <= 0) {
      swal.fire("Info", "Error generating reordered list", "warning");
    } else if (
      this.record_id == undefined ||
      this.record_id == null ||
      this.record_id == ""
    ) {
      swal.fire("Info", "Error fetching record id", "warning");
    } else {
      const body = {
        segment: this.reordered_segments_list,
      };
      this.update_record(this.record_id, body);
      this.go_btn_click();
      this.reordered_segments_list = [];
      this.modalReference.close();
    }
  }
  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  delflashcard(i) {
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
          this.image_value.splice(i, 1);

          const body = {
            image: this.image_value,
          };
          this.update_record(this.record_id, body);
        }
      });
  }

  async load_skilllist() {
    this.selected_segment_index = -1;
    this.reset_segment();
    if (
      this.selected_preflanguage != undefined &&
      this.selected_preflanguage != null &&
      this.selected_preflanguage != "" &&
      this.selected_subject != undefined &&
      this.selected_subject != null &&
      this.selected_subject != "" &&
      this.selected_class != undefined &&
      this.selected_class != null &&
      this.selected_class != ""
    ) {
      this.hide_Loading_indicator = false;
      this.selected_skillsetid = "";
      //-------- Get all assessments of that subject
      this.skill_select_option_list = [];
      this.hide_Loading_indicator = false;

      this.pgeactivitiesService
        .getpgeactivityskill(
          this.selected_preflanguage,
          this.selected_program,
          this.selected_subject,
          this.selected_class
        )
        .subscribe(
          (data) => {
            console.log("--> data: ", data);
            /*
        Object.keys(data).forEach((ind) => {
          let obj = {};
          obj = {
            value: parseInt(ind) + 1,
            text: data[ind]["question"],
          };
          this.skill_select_option_list.push(obj);
        });
        */
            this.skill_select_option_list = data;
            this.hide_Loading_indicator = true;
          },
          (error) => {
            this.hide_Loading_indicator = true;
          },
          () => {}
        );
      //--------
      this.hide_Loading_indicator = true;
    }
  }

  /*
  program_select_onchange(event) {
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_program = selectedOptionValue;
    this.selected_subject = '';

    if (this.selected_program == 'ece') {
      this.skillset_label = 'Themes';
      this.selected_subject = 'na';
      this.month_select_option_list = [{value: '1', text: 'Body Parts'}, {value: '2', text: 'Animals, Birds & their Sounds'}, {value: '3', text: 'Flowers, Fruits & Vegetables'}, {value: '4', text: 'House & Accessories'}, {value: '5', text: 'Transportation'}, {value: '6', text: 'Occupation'}, {value: '7', text: 'Service Providing Center'}, {value: '8', text: 'Insects'}, {value: '9', text: 'Environment'}, {value: '10', text: 'Seasons'}];
      this.skill_select_option_list = [{value: '1', text: 'Physical'}, {value: '2', text: 'Memory'}, {value: '3', text: 'Social & Emotional'}, {value: '4', text: 'Language'}];
      this.class_select_option_list = [{value: '1', text: 'Level 1'}, {value: '2', text: 'Level 2'}, {value: '3', text: 'Level 3'}];
    } else {
      this.skillset_label = 'Skill Set';
      this.selected_subject = '';
      this.month_select_option_list = [{value: '1', text: 'Skill 1-4'}, {value: '2', text: 'Skill 5-8'}, {value: '3', text: 'Skill 9-12'}, {value: '4', text: 'Skill 13-16'}, {value: '5', text: 'Skill 17-20'}];
      this.skill_select_option_list = [];
      this.class_select_option_list = [{value: '1', text: 'Class 1'}, {value: '2', text: 'Class 2'}, {value: '3', text: 'Class 3'}, {value: '4', text: 'Class 4'}, {value: '5', text: 'Class 5'}];
    }

    this.selected_class = '';
    //this.selected_subject = '';
    this.selected_month = '';
    this.selected_skillsetid = '';
    this.load_record(this.selected_preflanguage, this.selected_program, this.selected_subject, this.selected_month, this.selected_skillsetid, this.selected_class);
  }
  */

  /*
  month_select_onchange(value) {
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    console.log('-->Selected Opt Value= ' + selectedOptionValue + '   Text= ' + selectElementText);
    this.selected_month = selectedOptionValue;

    this.selected_skillsetid = '';
    // get list of skills which will be placed in place of weeks in case of pge.
    if (this.selected_program == 'pge') {
      this.skill_select_option_list = [];
      this.hide_Loading_indicator = false;
      let selected_stage = 'month'+this.selected_month;
      this.pgeactivitiesService.gettchassessment(this.selected_preflanguage, this.selected_program, this.selected_class, selected_stage, this.selected_subject).subscribe(data => {
        console.log('### data: ' + JSON.stringify(data));
        Object.keys(data).forEach(ind => {
          let obj = {};
          obj = {
            value: (parseInt(ind)+1),
            text: data[ind]['question']
          }
          this.skill_select_option_list.push(obj);
        });
        this.hide_Loading_indicator = true;
      },error => { this.hide_Loading_indicator = true; },() =>{});
    }
    this.load_record(this.selected_preflanguage, this.selected_program, this.selected_subject, this.selected_month, this.selected_skillsetid, this.selected_class);
  }*/
}
