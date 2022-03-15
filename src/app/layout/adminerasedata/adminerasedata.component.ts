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
  isChecked: boolean = false;
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
  allchanged(e, centerObj) {
    this.isChecked = e.target.checked;
    if (this.isChecked) {
      this.data.push("all");
      this.userdata = true;
      this.pptdata = true;
      this.monthly = true;
      this.baseline = true;
      this.endline = true;
      this.nsdcexam = true;
    } else {
      this.userdata = false;
      this.pptdata = false;
      this.monthly = false;
      this.baseline = false;
      this.endline = false;
      this.nsdcexam = false;
    }
  }
  userDataCheckboxChanged(e, value) {
    this.data.push("user");
  }
  baselineCheckboxChanged(e, value) {
    this.data.push("baseline");
  }
  pptCheckboxChanged(e, value) {
    this.data.push("ppt");
  }
  monthlyCheckboxChanged(e, value) {
    this.data.push("training");
  }
  endlineCheckboxChanged(e, value) {
    this.data.push("endline");
  }
  nsdcCheckboxChanged(e, value) {
    this.data.push("nsdcexam");
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
          this.isChecked = false;
          this.data = [];
          window.location.reload();
        },
        (error) => {},
        () => {}
      );
    }
  }
  // ---------------------------- Display Result ----------------------
}
