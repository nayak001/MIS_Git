import { Component, OnInit, ElementRef } from "@angular/core";
import { routerTransition } from "../../router.animations";
import { Router } from "@angular/router";
import { NsdcService } from "./nsdc.service";
import swal from "sweetalert2";

import { environment } from "../../../environments/environment.prod";
const URL = environment.uploadURL;

@Component({
  selector: "app-nsdc",
  templateUrl: "./nsdc.component.html",
  styleUrls: ["./nsdc.component.scss"],
  animations: [routerTransition()],
})
export class NsdcComponent implements OnInit {
  // Filters
  manager_passcode_list: any = [];
  param_year: any = "all";
  param_managerid: any = "all";
  param_passcode: any = "all";

  // Year
  year_list: any = [{ yearid: 2022, yearname: "2022" }];
  year_multiselect_settings: any = {};
  selected_year: any = {};

  // Manager
  manager_list: any = [];
  manager_multiselect_settings: any = {};
  selected_manager: any = {};

  // Passcode
  passcode_list: any = [];
  passcode_multiselect_settings: any = {};
  selected_passcode: any = {};

  // Report
  report_list: any = [];

  // Counts
  total_fellows_appeared: number = 0;
  total_fellows_pending: number = 0;
  total_fellows_complete: number = 0;

  // Loader
  hideLoading_indicator: boolean;

  constructor(public router: Router, private nsdcService: NsdcService) {
    this.hideLoading_indicator = true;
    this.getpasscodes();
  }

  ngOnInit() {
    this.param_year = "all";
    this.param_managerid = "all";
    this.param_passcode = "all";
    this.getnsdcreport(
      this.param_year,
      this.param_managerid,
      this.param_passcode
    );
    this.initialize_year_multiselect();
    this.initialize_manager_multiselect();
    this.initialize_passcode_multiselect();
  }

  // --------------- Year Multi Select --------------------
  initialize_year_multiselect() {
    this.selected_year = {};
    this.year_multiselect_settings = {
      singleSelection: true,
      idField: "yearid",
      textField: "yearname",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };
  }
  year_multiselect_onselectitem(item: any) {
    this.selected_year = item;
  }
  year_multiselect_ondeselectitem(item: any) {
    this.selected_year = {};
  }
  year_multiselect_onselectall(items: any) {}
  // ---------------------------------------------------------

  // --------------- Manager Multi Select --------------------
  initialize_manager_multiselect() {
    this.selected_manager = {};
    this.manager_multiselect_settings = {
      singleSelection: true,
      idField: "userid",
      textField: "username",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };
  }
  manager_multiselect_onselectitem(item: any) {
    this.selected_manager = item;
    let arr = this.manager_passcode_list.filter((e) => e.userid == item.userid);
    this.passcode_list = arr[0].passcodesarr;
  }
  manager_multiselect_ondeselectitem(item: any) {
    this.selected_manager = {};
    this.passcode_list = [];
    this.selected_passcode = {};
  }
  manager_multiselect_onselectall(items: any) {}
  // ---------------------------------------------------------

  // --------------- Passcode Multi Select --------------------
  initialize_passcode_multiselect() {
    this.selected_passcode = {};
    this.passcode_multiselect_settings = {
      singleSelection: true,
      idField: "passcode",
      textField: "passcode",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };
  }
  passcode_multiselect_onselectitem(item: any) {
    this.selected_passcode = item;
  }
  passcode_multiselect_ondeselectitem(item: any) {
    this.selected_passcode = {};
  }
  passcode_multiselect_onselectall(items: any) {}
  // ---------------------------------------------------------

  goto(path: string) {
    this.router.navigate(["/" + path]);
  }

  getpasscodes() {
    this.hideLoading_indicator = false;
    this.report_list = [];
    this.nsdcService.getallapasscode().subscribe(
      (data) => {
        if (Object.keys(data).length > 0) {
          this.manager_passcode_list = data;
          this.manager_list = data;
        } else {
          this.manager_passcode_list = [];
          this.manager_list = [];
        }
        this.hideLoading_indicator = true;
      },
      (error) => {},
      () => {}
    );
  }

  getnsdcreport(year, managerid, passcode) {
    this.hideLoading_indicator = false;
    this.report_list = [];
    this.nsdcService
      .getmanagerwisensdcreport(year, managerid, passcode)
      .subscribe(
        (data) => {
          if (Object.keys(data).length > 0) {
            if (data["status"] == "200") {
              this.report_list = data["data"];

              this.total_fellows_appeared = this.report_list.reduce(
                (sum, ele) =>
                  sum + (parseInt(ele.total) ? parseInt(ele.total) : 0),
                0
              );
              this.total_fellows_pending = this.report_list.reduce(
                (sum, ele) =>
                  sum + (parseInt(ele.total) ? parseInt(ele.pending) : 0),
                0
              );
              this.total_fellows_complete = this.report_list.reduce(
                (sum, ele) =>
                  sum + (parseInt(ele.total) ? parseInt(ele.complete) : 0),
                0
              );
            } else {
              this.report_list = [];
              this.total_fellows_appeared = 0;
              this.total_fellows_pending = 0;
              this.total_fellows_complete = 0;
            }
          } else {
            this.report_list = [];
            this.total_fellows_appeared = 0;
            this.total_fellows_pending = 0;
            this.total_fellows_complete = 0;
          }
          this.hideLoading_indicator = true;
        },
        (error) => {},
        () => {}
      );
  }

  search_btnclick() {
    console.log(
      "-->selected year: ",
      this.selected_year.yearid,
      "    selected manager: ",
      this.selected_manager.userid,
      "    selected passcode ",
      this.selected_passcode.passcode
    );
    this.param_year =
      this.selected_year.yearid == undefined ||
      this.selected_year.yearid == null
        ? "all"
        : this.selected_year.yearid;
    this.param_managerid =
      this.selected_manager.userid == undefined ||
      this.selected_manager.userid == null
        ? "all"
        : this.selected_manager.userid;
    this.param_passcode =
      this.selected_passcode.passcode == undefined ||
      this.selected_passcode.passcode == null
        ? "all"
        : this.selected_passcode.passcode;
    this.getnsdcreport(
      this.param_year,
      this.param_managerid,
      this.param_passcode
    );
  }
}
