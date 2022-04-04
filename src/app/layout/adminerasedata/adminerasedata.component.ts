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
  modalReference: any;
  closeResult: string;
  hideLoading_indicator: boolean = true;
  allChecked: boolean = false;
  userdata: boolean = false;
  pptdata: boolean = false;
  monthly: boolean = false;
  baseline: boolean = false;
  endline: boolean = false;
  nsdcexam: boolean = false;
  constructor(
    private modalService: NgbModal,
    public router: Router,
    private AdminEraseDataService: AdminEraseDataService
  ) {}

  ngOnInit() {}
  data = [];

  allchanged(e) {
    this.allChecked = e.target.checked;
    this.userdata = e.target.checked;
    this.pptdata = e.target.checked;
    this.monthly = e.target.checked;
    this.baseline = e.target.checked;
    this.endline = e.target.checked;
    this.nsdcexam = e.target.checked;
    this.checkStatus();
  }

  checkStatus() {
    if (
      (this.userdata &&
        this.baseline &&
        this.pptdata &&
        this.monthly &&
        this.endline &&
        this.nsdcexam) == true
    ) {
      this.allChecked = true;
      this.data.push("all");
    } else {
      this.allChecked = false;
      this.data = this.data.filter((e) => e !== "all");
    }
  }

  userDataCheckboxChanged(e) {
    this.allChecked = false;
    this.userdata = e.target.checked;
    this.checkStatus();
    if (this.userdata == true) {
      this.data.push("user");
    } else if (this.userdata == false) {
      this.data = this.data.filter((e) => e !== "user");
    }
  }

  baselineCheckboxChanged(e) {
    this.allChecked = false;
    this.baseline = e.target.checked;
    this.checkStatus();
    if (this.baseline == true) {
      this.data.push("baseline");
    } else {
      this.data = this.data.filter((e) => e !== "baseline");
    }
  }

  pptCheckboxChanged(e) {
    this.allChecked = false;
    this.pptdata = e.target.checked;
    this.checkStatus();
    if (this.pptdata == true) {
      this.data.push("ppt");
    } else {
      this.data = this.data.filter((e) => e !== "ppt");
    }
  }

  monthlyCheckboxChanged(e) {
    this.allChecked = false;
    this.monthly = e.target.checked;
    this.checkStatus();
    if (this.monthly == true) {
      this.data.push("training");
    } else {
      this.data = this.data.filter((e) => e !== "training");
    }
  }

  endlineCheckboxChanged(e) {
    this.allChecked = false;
    this.endline = e.target.checked;
    this.checkStatus();
    if (this.endline == true) {
      this.data.push("endline");
    } else {
      this.data = this.data.filter((e) => e !== "endline");
    }
  }

  nsdcCheckboxChanged(e) {
    this.allChecked = false;
    this.nsdcexam = e.target.checked;
    this.checkStatus();
    if (this.nsdcexam == true) {
      this.data.push("nsdcexam");
    } else {
      this.data = this.data.filter((e) => e !== "nsdcexam");
    }
  }

  userid: any;
  userid_onchange(event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.userid = selectedOptionValue;
  }

  eraseData() {
    if (this.data.length < 0 || this.userid == "" || this.userid == undefined) {
      swal.fire(
        "info",
        "Please select one which you want to remove data !!!",
        "warning"
      );
    } else {
      let body = {
        models: this.data,
      };

      this.AdminEraseDataService.updateUserData(this.userid, body).subscribe(
        (data2) => {
          swal.fire("Success", "Record updated successfully", "success");
          this.hideLoading_indicator = true;
          this.allChecked = false;
          this.data = [];
          window.location.reload();
        },
        (error) => {},
        () => {}
      );
    }
  }
}
