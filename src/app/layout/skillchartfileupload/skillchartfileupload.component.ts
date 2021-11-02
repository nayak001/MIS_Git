import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { routerTransition } from "../../router.animations";
import { HttpResponse, HttpEventType } from "@angular/common/http";
import { SkillchartfileuploadService } from "./skillchartfileupload.service";
import { environment } from "./../../../environments/environment.prod";

import swal from "sweetalert2";

@Component({
  selector: "app-skillchartfileupload",
  templateUrl: "./skillchartfileupload.component.html",
  styleUrls: ["./skillchartfileupload.component.scss"],
  animations: [routerTransition()],
})
export class SkillchartfileuploadComponent implements OnInit {
  @ViewChild("fileInput")
  fileInputVariable: ElementRef;
  baseUrl = environment.baseUrl + "s3api/download/";

  skillchartfilename_ece: string = "skillchart_file_ece";
  skillchartfilename_pgemath: string = "skillchart_file_pge_math";
  skillchartfilename_pgeeng: string = "skillchart_file_pge_eng";
  skillchartfilename_pgeodia: string = "skillchart_file_pge_odia";

  data_ece: any = [];
  data_pgemath: any = [];
  data_pgeeng: any = [];
  data_pgeodia: any = [];

  imageicon_ece: string = "";
  imageicon_pgemath: string = "";
  imageicon_pgeeng: string = "";
  imageicon_pgeodia: string = "";

  filename_ece: string = "";
  filename_pgemath: string = "";
  filename_pgeeng: string = "";
  filename_pgeodia: string = "";

  uploaddate_ece: string = "";
  uploaddate_pgemath: string = "";
  uploaddate_pgeeng: string = "";
  uploaddate_pgeodia: string = "";

  saveaction_ece: string = "";
  saveaction_pgemath: string = "";
  saveaction_pgeeng: string = "";
  saveaction_pgeodia: string = "";

  documentid_ece: string = "";
  documentid_pgemath: string = "";
  documentid_pgeeng: string = "";
  documentid_pgeodia: string = "";

  hidedeletebutton_ece: boolean = false;
  hidedeletebutton_pgemath: boolean = false;
  hidedeletebutton_pgeeng: boolean = false;
  hidedeletebutton_pgeodia: boolean = false;

  selectedFiles: FileList;
  currentFileUpload: File;

  selected_filecategory: string = "";
  filecategory: string = "";
  s3path: string = "";
  displayname: string = "";
  dateuploaded: string = "";

  filetype: string = "";

  progress: { percentage: number } = { percentage: 0 };
  hideProgressbar: boolean = true;
  hideLoading_indicator: boolean = true;

  constructor(
    private skillchartfileuploadService: SkillchartfileuploadService
  ) {
    this.hideProgressbar = true;
    this.hideLoading_indicator = true;
    this.load_data();
  }

  ngOnInit() {}

  load_data() {
    this.geteceskillchartfileuploaddetails();
    this.getpgemathskillchartfileuploaddetails();
    this.getpgeengskillchartfileuploaddetails();
    this.getpgeodiaskillchartfileuploaddetails();
  }

  geteceskillchartfileuploaddetails() {
    this.skillchartfileuploadService
      .geteceskillchartfileuploaddetails()
      .subscribe(
        (data) => {
          this.data_ece = data;
          if (Object.keys(data).length > 0) {
            this.saveaction_ece = "update";
            this.documentid_ece = data[0]._id;
            this.filename_ece = data[0].displayname;
            this.imageicon_ece = "assets/images/pdf.png";
            this.uploaddate_ece = data[0].dateuploaded;
            this.hidedeletebutton_ece = false;
          } else {
            this.saveaction_ece = "save";
            this.documentid_ece = "";
            this.filename_ece = "";
            this.imageicon_ece = "assets/images/warn.png";
            this.uploaddate_ece = "";
            this.hidedeletebutton_ece = true;
          }
          this.hideLoading_indicator = true;
        },
        (error) => {},
        () => {}
      );
  }

  getpgemathskillchartfileuploaddetails() {
    this.skillchartfileuploadService
      .getpgemathskillchartfileuploaddetails()
      .subscribe(
        (data) => {
          this.data_pgemath = data;
          if (Object.keys(data).length > 0) {
            this.saveaction_pgemath = "update";
            this.documentid_pgemath = data[0]._id;
            this.filename_pgemath = data[0].displayname;
            this.imageicon_pgemath = "assets/images/pdf.png";
            this.uploaddate_pgemath = data[0].dateuploaded;
            this.hidedeletebutton_pgemath = false;
          } else {
            this.saveaction_pgemath = "save";
            this.documentid_pgemath = "";
            this.filename_pgemath = "";
            this.imageicon_pgemath = "assets/images/warn.png";
            this.uploaddate_pgemath = "";
            this.hidedeletebutton_pgemath = true;
          }
          this.hideLoading_indicator = true;
        },
        (error) => {},
        () => {}
      );
  }

  getpgeengskillchartfileuploaddetails() {
    this.skillchartfileuploadService
      .getpgeengskillchartfileuploaddetails()
      .subscribe(
        (data) => {
          this.data_ece = data;
          if (Object.keys(data).length > 0) {
            this.saveaction_pgeeng = "update";
            this.documentid_pgeeng = data[0]._id;
            this.filename_pgeeng = data[0].displayname;
            this.imageicon_pgeeng = "assets/images/pdf.png";
            this.uploaddate_pgeeng = data[0].dateuploaded;
            this.hidedeletebutton_pgeeng = false;
          } else {
            this.saveaction_pgeeng = "save";
            this.documentid_pgeeng = "";
            this.filename_pgeeng = "";
            this.imageicon_pgeeng = "assets/images/warn.png";
            this.uploaddate_pgeeng = "";
            this.hidedeletebutton_pgeeng = true;
          }
          this.hideLoading_indicator = true;
        },
        (error) => {},
        () => {}
      );
  }

  getpgeodiaskillchartfileuploaddetails() {
    this.skillchartfileuploadService
      .getpgeodiaskillchartfileuploaddetails()
      .subscribe(
        (data) => {
          this.data_pgeodia = data;
          if (Object.keys(data).length > 0) {
            this.saveaction_pgeodia = "update";
            this.documentid_pgeodia = data[0]._id;
            this.filename_pgeodia = data[0].displayname;
            this.imageicon_pgeodia = "assets/images/pdf.png";
            this.uploaddate_pgeodia = data[0].dateuploaded;
            this.hidedeletebutton_pgeodia = false;
          } else {
            this.saveaction_pgeodia = "save";
            this.documentid_pgeodia = "";
            this.filename_pgeodia = "";
            this.imageicon_pgeodia = "assets/images/warn.png";
            this.uploaddate_pgeodia = "";
            this.hidedeletebutton_pgeodia = true;
          }
          this.hideLoading_indicator = true;
        },
        (error) => {},
        () => {}
      );
  }

  radio_button_change(filecategory) {
    this.selected_filecategory = filecategory;
  }

  filechooser_onchange(event) {
    if (event.target.files.length > 0) {
      this.selectedFiles = event.target.files;
    } else {
      this.selectedFiles = null;
    }
  }

  uploadfile_button_click() {
    if (
      this.selectedFiles.item(0) == null ||
      this.selectedFiles.item(0) == undefined
    ) {
      swal.fire("Info", "Please select file to upload", "warning");
    } else if (
      this.selected_filecategory == null ||
      this.selected_filecategory == undefined ||
      this.selected_filecategory == ""
    ) {
      swal.fire("Info", "Please select file category", "warning");
    } else {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.currentFileUpload = this.selectedFiles.item(i);
        let currentfilename = this.currentFileUpload.name;
        this.filetype = currentfilename.split(".").pop();

        if (this.selected_filecategory == "ece") {
          this.displayname = this.skillchartfilename_ece + "." + this.filetype;
        } else if (this.selected_filecategory == "pgemath") {
          this.displayname =
            this.skillchartfilename_pgemath + "." + this.filetype;
        } else if (this.selected_filecategory == "pgeeng") {
          this.displayname =
            this.skillchartfilename_pgeeng + "." + this.filetype;
        } else if (this.selected_filecategory == "pgeodia") {
          this.displayname =
            this.skillchartfilename_pgeodia + "." + this.filetype;
        }
        this.savetos3(
          this.currentFileUpload,
          this.displayname,
          this.selected_filecategory
        );
      }
    }
  }

  savetos3(skillchartfile, filename, filecategory) {
    this.hideProgressbar = false;
    this.progress.percentage = 0;
    this.skillchartfileuploadService
      .savetos3(skillchartfile, filename)
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(
            (100 * event.loaded) / event.total
          );
        } else if (event instanceof HttpResponse) {
          this.s3path = event.body["s3path"];
          this.hideProgressbar = true;
          this.saveupdatetodb(filecategory, this.s3path, this.displayname);
        }
      });
  }

  saveupdatetodb(filecategory, fileurl, displayname) {
    if (filecategory == "ece") {
      if (this.saveaction_ece == "save")
        this.savetodb(filecategory, fileurl, displayname);
      else if (this.saveaction_ece == "update")
        this.updatetodb(
          this.documentid_ece,
          filecategory,
          fileurl,
          displayname
        );
    } else if (filecategory == "pgemath") {
      if (this.saveaction_pgemath == "save")
        this.savetodb(filecategory, fileurl, displayname);
      else if (this.saveaction_pgemath == "update")
        this.updatetodb(
          this.documentid_pgemath,
          filecategory,
          fileurl,
          displayname
        );
    } else if (filecategory == "pgeeng") {
      if (this.saveaction_pgeeng == "save")
        this.savetodb(filecategory, fileurl, displayname);
      else if (this.saveaction_pgeeng == "update")
        this.updatetodb(
          this.documentid_pgeeng,
          filecategory,
          fileurl,
          displayname
        );
    } else if (filecategory == "pgeodia") {
      if (this.saveaction_pgeodia == "save")
        this.savetodb(filecategory, fileurl, displayname);
      else if (this.saveaction_pgeodia == "update")
        this.updatetodb(
          this.documentid_pgeodia,
          filecategory,
          fileurl,
          displayname
        );
    }
  }

  savetodb(filecategory, fileurl, displayname) {
    this.getdateuploaded();
    this.hideLoading_indicator = false;
    let body = {
      filecategory: filecategory,
      fileurl: fileurl,
      displayname: displayname,
      dateuploaded: this.dateuploaded,
    };
    this.skillchartfileuploadService
      .saveskillchartfileuploaddetails(body)
      .subscribe(
        (data) => {
          this.load_data();
          this.hideLoading_indicator = true;
          swal.fire("Save", "File uploaded successfully", "success");
          this.resetall();
        },
        (error) => {},
        () => {}
      );
  }

  updatetodb(documentid, filecategory, fileurl, displayname) {
    this.getdateuploaded();
    this.hideLoading_indicator = false;
    let body = {
      filecategory: filecategory,
      fileurl: fileurl,
      displayname: displayname,
      dateuploaded: this.dateuploaded,
    };
    this.skillchartfileuploadService
      .updateskillchartfileuploaddetails(documentid, body)
      .subscribe(
        (data) => {
          this.load_data();
          this.hideLoading_indicator = true;
          this.resetall();
        },
        (error) => {},
        () => {}
      );
  }

  delete_button_click(filecategory) {
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
          this.deletes3file(filecategory);
        }
      });
  }

  deletes3file(filecategory) {
    this.hideLoading_indicator = false;
    let s3filename = "";
    let documentid = "";
    if (filecategory == "ece") {
      s3filename = this.filename_ece;
      documentid = this.documentid_ece;
    } else if (filecategory == "pgemath") {
      s3filename = this.filename_pgemath;
      documentid = this.documentid_pgemath;
    } else if (filecategory == "pgeeng") {
      s3filename = this.filename_pgeeng;
      documentid = this.documentid_pgeeng;
    } else if (filecategory == "pgeodia") {
      s3filename = this.filename_pgeodia;
      documentid = this.documentid_pgeodia;
    }
    this.skillchartfileuploadService.deletefroms3(s3filename).subscribe(
      (data1) => {
        this.skillchartfileuploadService
          .deleteskillchartfileuploaddetails(documentid)
          .subscribe(
            (data2) => {
              this.load_data();
              this.hideLoading_indicator = true;
              swal.fire("Delete", "File deleted successfully", "success");
              this.resetall();
            },
            (error) => {},
            () => {}
          );
      },
      (error) => {},
      () => {}
    );
  }

  getdateuploaded() {
    let currentdate = new Date();
    this.dateuploaded =
      currentdate.getDate() +
      " - " +
      (currentdate.getMonth() + 1) +
      " - " +
      currentdate.getFullYear() +
      "   " +
      currentdate.getHours() +
      " : " +
      currentdate.getMinutes();
  }

  resetall() {
    this.hideProgressbar = true;
    this.progress.percentage = 0;
    this.selectedFiles = null;
    this.fileInputVariable.nativeElement.value = "";
  }
}
