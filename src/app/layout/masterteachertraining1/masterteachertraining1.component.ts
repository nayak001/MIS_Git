import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { routerTransition } from "../../router.animations";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  Masterteachertraining1Service,
  ValidationService,
} from "./masterteachertraining1.service";
import { environment } from "./../../../environments/environment.prod";
import { UsersComponent } from "../users/users.component";
const teacherappAuthkey = environment.teacherappAuthkey;
@Component({
  selector: "app-masterteachertraining1",
  templateUrl: "./masterteachertraining1.component.html",
  styleUrls: ["./masterteachertraining1.component.scss"],
  animations: [routerTransition()],
})
export class Masterteachertraining1Component implements OnInit {
  selected_preflanguage: any = "od";
  selected_usertype: any = "";
  public allmodules_list: any;

  // module
  module_id: string = "";
  moduleid: string = "";
  modulename_tosave: string = "";
  modulename_toupdate: string = "";
  modulename_todelete: string = "";
  isSelected: boolean = true;

  // sub-modules
  submodule_id: string = "";
  submoduleid: string = "";
  submodule_moduleid: string = "";
  submodule_modulename: string = "";
  submodulename_tosave: string = "";
  submodulename_toupdate: string = "";
  submodulename_todelete: string = "";
  selected_submodule_moduleid: string = "";
  selected_submodule_modulename: string = "";
  selected_submodule_id: string = "";
  subtopicname_tosave: string = "";
  allsubmodules_list: any;

  // topic
  topic_id: any;
  topicid: any;
  topicname_todelete: any;
  topic_toupdate: any;
  submodule_topic_id: any;
  alltopic_list: any;
  data: any;

  closeResult: string;
  hideLoading_indicator1: boolean;
  hideLoading_indicator2: boolean;
  hideLoading_indicator3: boolean;
  modalReference: any;
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    public router: Router,
    private masterteachertraining1Service: Masterteachertraining1Service
  ) {
    this.hideLoading_indicator1 = true;
    this.hideLoading_indicator2 = true;
    this.hideLoading_indicator3 = true;
    this.selected_preflanguage = "od";
  }

  ngOnInit() {
    this.load_allmodules_list(this.selected_preflanguage,this.selected_usertype);
  }

  // modules part
  load_allmodules_list(language,usertype) {
    // this.hideLoading_indicator1 = false;
    this.masterteachertraining1Service
      .getalltrainingmodules(language,usertype)
      .subscribe(
        (data) => {
          this.allmodules_list = data;
         // console.log("modulelist-->", this.allmodules_list)
          this.hideLoading_indicator1 = true;
        },
        (error) => {},
        () => {}
      );
  }

  savemodule_btnclick() {
    this.modulename_tosave = this.modulename_tosave.toUpperCase().toLowerCase();
    if (
      this.selected_preflanguage == "" ||
      this.selected_preflanguage == null
    ) {
      alert("Select prefered language");
    } else if (
      this.modulename_tosave == undefined ||
      this.modulename_tosave == null ||
      this.modulename_tosave == ""
    ) {
      alert("Module name can not be empty");
    } else {
      this.hideLoading_indicator1 = false;
      this.masterteachertraining1Service
        .findtrainingmodulebyname(this.modulename_tosave)
        .subscribe(
          (data) => {
            this.hideLoading_indicator1 = true;
            if (Object.keys(data).length > 0) {
              alert("Module name already exists.");
            } else {
              let curr_date = new Date();
              // console.log("moduleid-->",curr_date.getTime())
              // console.log("modulename-->",this.modulename_tosave)
              // console.log("language-->",this.selected_preflanguage)
              // console.log("usertype-->", this.selected_usertype)
              let modulebody = {
                moduleid: curr_date.getTime(),
               
                modulename: this.modulename_tosave,
                language: this.selected_preflanguage,
                usertype: this.selected_usertype,
              };
              this.masterteachertraining1Service
                .createnewtrainingmodule(modulebody)
                .subscribe(
                  (data: any) => {
                    if (data.status == "success") {
                      this.masterteachertraining1Service
                        .moduleAddNotification(
                          "training",
                          modulebody.modulename,
                          "module"
                        )
                        .subscribe(
                          (data) => {
                            this.hideLoading_indicator1 = true;
                            this.load_allmodules_list(
                              this.selected_preflanguage,
                              this.selected_usertype
                            );
                            this.modulename_tosave = "";
                          },
                          (err) => {},
                          () => {}
                        );
                    } else {
                      this.hideLoading_indicator1 = true;
                      this.load_allmodules_list(this.selected_preflanguage,this.selected_usertype);
                      this.modulename_tosave = "";
                    }
                  },
                  (error) => {},
                  () => {}
                );
            }
          },
          (error) => {},
          () => {}
        );
    }
  }

  preflanguage_select_onchange(event) {
    this.allsubmodules_list = [];
    this.alltopic_list = [];
    this.hideLoading_indicator1 = false;
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_preflanguage = selectedOptionValue;
    // console.log("language-->",this.selected_preflanguage)
    if (this.selected_preflanguage != "") {
      this.masterteachertraining1Service
        .getalltrainingmodules(this.selected_preflanguage,this.selected_usertype)
        .subscribe(
          (data) => {
            if (data) {
              this.allmodules_list = data;
              // console.log("modules2-->", this.allmodules_list)
            } else {
              this.allmodules_list = "";
              this.allsubmodules_list = "";
              this.alltopic_list = "";
            }
            this.hideLoading_indicator1 = true;
          },
          (error) => {},
          () => {}
        );
    }
  }

  preftype_select_onchange(event) {
    this.allsubmodules_list = [];
    this.alltopic_list = [];
    this.hideLoading_indicator1 = false;
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_usertype = selectedOptionValue;
    // console.log("usertype-->", this.selected_usertype )
    if (this.selected_preflanguage != "") {
      this.masterteachertraining1Service
        .getalltrainingmodules(this.selected_preflanguage,this.selected_usertype)
        .subscribe(
          (data) => {
            if (data) {
              this.allmodules_list = data;
              // console.log("modules2-->", this.allmodules_list)
            } else {
              this.allmodules_list = "";
              this.allsubmodules_list = "";
              this.alltopic_list = "";
            }
            this.hideLoading_indicator1 = true;
          },
          (error) => {},
          () => {}
        );
    }
  }


  updatemodule_btnclick() {
    this.modulename_toupdate = this.modulename_toupdate
      .toUpperCase()
      .toLowerCase();
    if (
      this.modulename_toupdate == undefined ||
      this.modulename_toupdate == null ||
      this.modulename_toupdate == ""
    ) {
      alert("Module name can not be empty");
    } else {
      this.hideLoading_indicator1 = false;
      this.masterteachertraining1Service
        .findtrainingmodulebyname(this.modulename_toupdate)
        .subscribe(
          (data) => {
            this.hideLoading_indicator1 = true;

            if (Object.keys(data).length > 0) {
              alert("Module name already exists.");
            } else {
              let modulebody = {
                moduleid: this.moduleid,
                modulename: this.modulename_toupdate,
                language: this.selected_preflanguage,
              };
              this.masterteachertraining1Service
                .updatetrainingmodulebyid(this.module_id, modulebody)
                .subscribe(
                  (data: any) => {
                    if (data.status == "success") {
                      this.masterteachertraining1Service
                        .moduleAddNotification(
                          "training",
                          modulebody.modulename,
                          "module"
                        )
                        .subscribe(
                          (data: any) => {
                            if (data.status == "success") {
                              this.masterteachertraining1Service
                                .moduleAddNotification(
                                  "training",
                                  modulebody.modulename,
                                  "module"
                                )
                                .subscribe(
                                  (data) => {
                                    this.modalReference.close();
                                    this.hideLoading_indicator1 = true;
                                    this.load_allmodules_list(
                                      this.selected_preflanguage,
                                      this.selected_usertype
                                    );
                                    this.modulename_toupdate = "";
                                  },
                                  (err) => {},
                                  () => {}
                                );
                            } else {
                              this.modalReference.close();
                              this.hideLoading_indicator1 = true;
                              this.load_allmodules_list(
                                this.selected_preflanguage,
                                this.selected_usertype
                              );
                              this.modulename_toupdate = "";
                            }
                          },
                          (err) => {},
                          () => {}
                        );
                    } else {
                      this.modalReference.close();
                      this.hideLoading_indicator1 = true;
                      this.load_allmodules_list(this.selected_preflanguage,this.selected_usertype);
                      this.modulename_toupdate = "";
                    }
                  },
                  (error) => {},
                  () => {}
                );
            }
          },
          (error) => {},
          () => {}
        );
    }
  }

  deletemodule_btnclick() {
    this.masterteachertraining1Service
      .deletetrainingmodulebyid(this.moduleid)
      .subscribe(
        (data) => {
          this.modalReference.close();
          this.hideLoading_indicator1 = true;
          this.load_allmodules_list(this.selected_preflanguage,this.selected_usertype);
          this.load_allsubmodules_list(
            this.selected_usertype,
            this.selected_submodule_moduleid,
            this.selected_preflanguage
          );
          this.modulename_todelete = "";
        },
        (error) => {},
        () => {}
      );
  }

  // sub modules part
  onselect_modules_select(event: Event) {
    let selectedOptions = event.target["options"];
    let selectedIndex = selectedOptions.selectedIndex;
    let selectedOptionValue = selectedOptions[selectedIndex].value;
    let selectElementText = selectedOptions[selectedIndex].text;
    this.selected_submodule_moduleid = selectedOptionValue;
    this.selected_submodule_modulename = selectElementText;
    this.alltopic_list = [];
    this.load_allsubmodules_list(
      this.selected_usertype,
      this.selected_submodule_moduleid,
      this.selected_preflanguage
    );
  }

  selected_submodule_name: any;

  onselect_sub_modules_select(event: Event) {
    let selectedOption = event.target["options"];
    let selectedindex = selectedOption.selectedIndex;
    let selectedoptionValue = selectedOption[selectedindex].value;
    let selectElement = selectedOption[selectedindex].text;
    this.selected_submodule_name = selectElement;
    this.selected_submodule_id = selectedoptionValue;
    this.load_alltopic_list(
      this.selected_usertype,
      this.selected_submodule_id,
      this.selected_preflanguage
    );
  }

  load_alltopic_list(usertype,submoduleid, language) {
    if (submoduleid != undefined && submoduleid != null && submoduleid != "" && usertype != undefined && usertype != null && usertype != "") {
      this.hideLoading_indicator3 = false;
      this.masterteachertraining1Service
        .getalltrainingtopics(this.selected_usertype,this.selected_submodule_id, language)
        .subscribe(
          (data) => {
            this.alltopic_list = data;
            // console.log("topic list-->",  this.alltopic_list )
            this.hideLoading_indicator3 = true;
          },
          (error) => {},
          () => {}
        );
    } else {
      this.alltopic_list = [];
    }
  }

  load_allsubmodules_list(usertype,moduleid, language) {
    if (moduleid != undefined && moduleid != null && moduleid != "" && usertype != undefined && usertype != null && usertype != "") {
      this.hideLoading_indicator2 = false;
      this.masterteachertraining1Service
        .getalltrainingsubmodules(this.selected_usertype,moduleid, this.selected_preflanguage)
        .subscribe(
          (data) => {
            this.allsubmodules_list = data;
            // console.log("submodule org-->", this.allsubmodules_list)
            this.hideLoading_indicator2 = true;
          },
          (error) => {},
          () => {}
        );
    } else {
      this.allsubmodules_list = [];
    }
  }

  savesubmodule_btnclick() {
    this.submodulename_tosave = this.submodulename_tosave
      .toUpperCase()
      .toLowerCase();
    if (
      this.submodulename_tosave == undefined ||
      this.submodulename_tosave == null ||
      this.submodulename_tosave == ""
    ) {
      alert("Sub-module name can not be empty");
    } else {
      this.hideLoading_indicator2 = false;
      this.masterteachertraining1Service
        .findtrainingsubmodulebyname(
          this.selected_submodule_moduleid,
          this.submodulename_tosave
        )
        .subscribe(
          (data) => {
            this.hideLoading_indicator2 = true;

            if (Object.keys(data).length > 0) {
              alert("Sub-module name already exists.");
            } else {
              let curr_date = new Date();
              // console.log("submoduleid-->",curr_date.getTime())
              // console.log("submodulename-->", this.submodulename_tosave)
              // console.log("subusertype-->",this.selected_usertype)
              let submodulebody = {
                moduleid: this.selected_submodule_moduleid,
                modulename: this.selected_submodule_modulename,
                submoduleid: curr_date.getTime(),
                submodulename: this.submodulename_tosave,
                language: this.selected_preflanguage,
                usertype:this.selected_usertype,
              };
              this.masterteachertraining1Service
                .createnewtrainingsubmodule(submodulebody)
                .subscribe(
                  (data: any) => {
                    if (data.status == "success") {
                      this.masterteachertraining1Service
                        .moduleAddNotification(
                          "training",
                          submodulebody.submodulename,
                          "submodule"
                        )
                        .subscribe(
                          (data) => {
                            this.hideLoading_indicator2 = true;
                            this.load_allsubmodules_list(
                              this.selected_usertype,
                              this.selected_submodule_moduleid,
                              this.selected_preflanguage
                            );
                            this.submodulename_tosave = "";
                          },
                          (err) => {},
                          () => {}
                        );
                    } else {
                      this.hideLoading_indicator2 = true;
                      this.load_allsubmodules_list(
                        this.selected_usertype,
                        this.selected_submodule_moduleid,
                        this.selected_preflanguage
                      );
                      this.submodulename_tosave = "";
                    }
                  },
                  (error) => {},
                  () => {}
                );
            }
          },
          (error) => {},
          () => {}
        );
    }
  }

  updatesubmodule_btnclick() {
    this.submodulename_toupdate = this.submodulename_toupdate
      .toUpperCase()
      .toLowerCase();
    if (
      this.submodulename_toupdate == undefined ||
      this.submodulename_toupdate == null ||
      this.submodulename_toupdate == ""
    ) {
      alert("Sub-module name can not be empty");
    } else {
      this.hideLoading_indicator2 = false;
      this.masterteachertraining1Service
        .findtrainingsubmodulebyname(
          this.selected_submodule_moduleid,
          this.submodulename_toupdate
        )
        .subscribe(
          (data) => {
            this.hideLoading_indicator2 = true;

            if (Object.keys(data).length > 0) {
              alert("Sub-module name already exists.");
            } else {
              let modulebody = {
                moduleid: this.submodule_moduleid,
                modulename: this.submodule_modulename,
                submoduleid: this.submoduleid,
                submodulename: this.submodulename_toupdate,
                language: this.selected_preflanguage,
              };
              this.masterteachertraining1Service
                .updatetrainingsubmodulebyid(this.submodule_id, modulebody)
                .subscribe(
                  (data: any) => {
                    if (data.status == "success") {
                      this.masterteachertraining1Service
                        .moduleAddNotification(
                          "training",
                          modulebody.submodulename,
                          "submodule"
                        )
                        .subscribe(
                          (data) => {
                            this.modalReference.close();
                            this.hideLoading_indicator2 = true;
                            this.load_allsubmodules_list(
                              this.selected_usertype,
                              this.selected_submodule_moduleid,
                              this.selected_preflanguage
                            );
                            this.submodulename_toupdate = "";
                          },
                          (err) => {},
                          () => {}
                        );
                    } else {
                      this.modalReference.close();
                      this.hideLoading_indicator2 = true;
                      this.load_allsubmodules_list(
                        this.selected_usertype,
                        this.selected_submodule_moduleid,
                        this.selected_preflanguage
                      );
                      this.submodulename_toupdate = "";
                    }
                  },
                  (error) => {},
                  () => {}
                );
            }
          },
          (error) => {},
          () => {}
        );
    }
  }

  deletesubmodule_btnclick() {
    this.masterteachertraining1Service
      .deletetrainingsubmodulebyid(this.submoduleid)
      .subscribe(
        (data) => {
          this.modalReference.close();
          this.hideLoading_indicator2 = true;
          this.load_allsubmodules_list(
            this.selected_usertype,
            this.selected_submodule_moduleid,
            this.selected_preflanguage
          );
          this.submodulename_todelete = "";
        },
        (error) => {},
        () => {}
      );
  }

  savesubtopic_btnclick() {
    this.subtopicname_tosave = this.subtopicname_tosave
      .toUpperCase()
      .toLowerCase();
    if (
      this.subtopicname_tosave == undefined ||
      this.subtopicname_tosave == null ||
      this.subtopicname_tosave == ""
    ) {
      alert("Topic name can not be empty");
    } else if (this.selected_submodule_id == "") {
      alert("Select submodule");
    } else {
      this.hideLoading_indicator2 = false;
      this.masterteachertraining1Service
        .findtrainingtopicbyname(
          this.selected_submodule_id,
          this.subtopicname_tosave
        )
        .subscribe(
          (data) => {
            this.hideLoading_indicator2 = true;
            if (data["check"] == false) {
              alert("Topic name already exists.");
            } else {
              let curr_date = new Date();
              let subtopicbody = {
                usertype:this.selected_usertype,
                topicid: curr_date.getTime(),
                submoduleid: this.selected_submodule_id,
                topicname: this.subtopicname_tosave,
                language: this.selected_preflanguage,
              };
              this.masterteachertraining1Service
                .createnewtrainingtopic(subtopicbody)
                .subscribe(
                  (data: any) => {
                    if (Object.keys(data).length > 0) {
                      if (data.status == "success") {
                        this.masterteachertraining1Service
                          .moduleAddNotification(
                            "training",
                            subtopicbody.topicname,
                            "topic"
                          )
                          .subscribe(
                            (data) => {
                              // this.sendMessageToallUser(
                              //   this.selected_submodule_modulename,
                              //   this.selected_submodule_name,
                              //   this.subtopicname_tosave
                              // );
                              this.hideLoading_indicator3 = true;
                              this.load_alltopic_list(
                                this.selected_usertype,
                                this.selected_submodule_moduleid,
                                this.selected_preflanguage
                              );
                              this.subtopicname_tosave = "";
                            },
                            (err) => {},
                            () => {}
                          );
                      } else {
                        // this.sendMessageToallUser(
                        //   this.selected_submodule_modulename,
                        //   this.selected_submodule_name,
                        //   this.subtopicname_tosave
                        // );
                        this.hideLoading_indicator3 = true;
                        this.load_alltopic_list(
                          this.selected_usertype,
                          this.selected_submodule_moduleid,
                          this.selected_preflanguage
                        );
                        this.subtopicname_tosave = "";
                      }
                    }
                  },
                  (error) => {},
                  () => {}
                );
            }
          },
          (error) => {},
          () => {}
        );
    }
  }

  all_users: any;
  txt_title: String;
  txt_message: String;
  // sendMessageToallUser(modulename, submodulename, subtopicname) {
  //   this.txt_title = "New topic added";
  //   this.txt_message =
  //     "New topic" +
  //     " " +
  //     subtopicname +
  //     " " +
  //     "added in" +
  //     " " +
  //     submodulename +
  //     "  " +
  //     "under" +
  //     "  " +
  //     modulename;
  //   this.masterteachertraining1Service.getalluser().subscribe(
  //     (data) => {
  //       this.all_users = data;
  //       if (Object.keys(data).length > 0) {
  //         let id = "" + new Date().getTime();
  //         let title = this.txt_title;
  //         let message = this.txt_message;
  //         let status = "unread";
  //         let obj = {
  //           id: id,
  //           userid_list: this.all_users,
  //           title: title,
  //           message: message,
  //           status: status,
  //         };
  //         this.masterteachertraining1Service.createnewmessage(obj).subscribe(
  //           (data) => {
  //             // location.reload();
  //           },
  //           (error) => {},
  //           () => {}
  //         );
  //       }
  //     },
  //     (error) => {},
  //     () => {}
  //   );
  // }

  updatetopic_btnclick() {
    this.topic_toupdate = this.topic_toupdate.toUpperCase().toLowerCase();
    if (
      this.topic_toupdate == undefined ||
      this.topic_toupdate == null ||
      this.topic_toupdate == ""
    ) {
      alert("topic name can not be empty");
    } else {
      this.hideLoading_indicator3 = false;
      this.masterteachertraining1Service
        .findtrainingtopicbyname(
          this.selected_submodule_id,
          this.topic_toupdate
        )
        .subscribe(
          (data) => {
            this.hideLoading_indicator2 = true;

            if (data["check"] == false) {
              alert("Topic name already exists.");
            } else {
              let body = {
                submoduleid: this.selected_submodule_id,
                topicid: this.topic_id,
                topicname: this.topic_toupdate,
                language: this.selected_preflanguage,
              };
              this.masterteachertraining1Service
                .updatetrainingtopicbyid(this.submodule_topic_id, body)
                .subscribe(
                  (data: any) => {
                    if (data.status == "success") {
                      this.masterteachertraining1Service
                        .moduleAddNotification(
                          "training",
                          body.topicname,
                          "topic"
                        )
                        .subscribe(
                          (data) => {
                            this.modalReference.close();
                            this.hideLoading_indicator3 = true;
                            this.load_alltopic_list(
                              this.selected_usertype,
                              this.selected_submodule_moduleid,
                              this.selected_preflanguage
                            );
                            this.topic_toupdate = "";
                          },
                          (err) => {},
                          () => {}
                        );
                    } else {
                      this.modalReference.close();
                      this.hideLoading_indicator3 = true;
                      this.load_alltopic_list(
                        this.selected_usertype,
                        this.selected_submodule_moduleid,
                        this.selected_preflanguage
                      );
                      this.topic_toupdate = "";
                    }
                  },
                  (error) => {},
                  () => {}
                );
            }
          },
          (error) => {},
          () => {}
        );
    }
  }

  deletetopic_btnclick() {
    this.masterteachertraining1Service
      .deletetrainingtopicbyid(this.topicid)
      .subscribe(
        (data) => {
          this.modalReference.close();
          this.hideLoading_indicator3 = true;
          this.load_alltopic_list(
            this.selected_usertype,
            this.selected_submodule_moduleid,
            this.selected_preflanguage
          );
          this.topicname_todelete = "";
        },
        (error) => {},
        () => {}
      );
  }

  back_btn_click() {
    this.router.navigate(["/masterteachertraining2"]);
  }

  // ----------------------------------------------
  open(content, module, flag) {
    if (flag == "edit_module") {
      this.module_id = module._id;
      this.moduleid = module.moduleid;
      this.modulename_toupdate = module.modulename;
    } else if (flag == "delete_module") {
      this.module_id = module._id;
      this.moduleid = module.moduleid;
      this.modulename_todelete = module.modulename;
    } else if (flag == "edit_submodule") {
      this.submodule_id = module._id;
      this.submoduleid = module.submoduleid;
      this.submodule_moduleid = module.moduleid;
      this.submodule_modulename = module.modulename;
      this.submodulename_toupdate = module.submodulename;
    } else if (flag == "delete_submodule") {
      this.submodule_id = module._id;
      this.submoduleid = module.submoduleid;
      this.submodulename_todelete = module.submodulename;
    } else if (flag == "edit_topic") {
      this.submodule_topic_id = module._id;
      this.topic_id = module.topicid;
      this.topicid = module.topicid;
      this.topic_toupdate = module.topicname;
    } else if (flag == "delete_topic") {
      this.submodule_topic_id = module._id;
      this.topic_id = module._id;
      this.topicid = module.topicid;
      this.topicname_todelete = module.topicname;
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
