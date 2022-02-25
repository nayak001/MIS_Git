import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { routerTransition } from "../../router.animations";
import {
  NgbModal,
  NgbModalOptions,
  ModalDismissReasons,
} from "@ng-bootstrap/ng-bootstrap";

import { Router } from "@angular/router";
import { PptreportService } from "./pptreport.service";
import swal from "sweetalert2";
// download as csv
import * as json2csv from "json2csv"; // convert json file to csv
import { saveAs } from "file-saver"; // save the file

@Component({
  selector: "app-pptreport",
  templateUrl: "./pptreport.component.html",
  styleUrls: ["./pptreport.component.scss"],
  animations: [routerTransition()],
})
export class PptreportComponent implements OnInit {
  @ViewChild("searchtextfield") searchtextfield: ElementRef;
  // Loading indicator
  hideLoading_indicator: boolean;
  hideModalLoading_indicator: boolean = true;

  // Json to Csv
  Json2csvParser = json2csv.Parser;

  // Modal
  ngbModalOptions: NgbModalOptions = {
    backdrop: "static",
    keyboard: false,
    size: "lg",
  };
  modalReference: any;
  closeResult: string;

  // filter radio button
  selected_radiofilter_value: string = "ppt";

  // User
  status_list: any = [
    { statusid: "0", statusname: "All" },
    { statusid: "1", statusname: "Complete" },
    { statusid: "2", statusname: "In Progress" },
    { statusid: "3", statusname: "Not Started Yet" },
  ];
  status_multiselect_selectedlist = [];
  status_multiselect_settings = {};

  // Language
  language_list: any = [
    { languageid: "en", languagename: "English" },
    { languageid: "od", languagename: "Odia" },
    { languageid: "hi", languagename: "Hindi" },
  ];
  language_multiselect_selectedlist = [];
  language_multiselect_settings = {};
  closeDropdownSelection = false;
  disabled = false;

  // Table Data
  alldata: any = [];
  alldata_bkp: any = [];
  alldata_bkp2: any = [];

  transdata: any = [];
  totaltopics: any = [];
  tabledata: any = [];
  tabledata_bkp: any = [];
  modulesarr: any = [];

  // Details modal
  modal_userid: string = "";
  modal_username: string = "";

  constructor(
    private modalService: NgbModal,
    public router: Router,
    private pptreportService: PptreportService
  ) {
    this.hideLoading_indicator = true;
    this.hideModalLoading_indicator = true;
    this.selected_radiofilter_value = "ppt";
  }

  ngOnInit() {
    this.initialize_language_multiselect();
    this.initialize_status_multiselect();

    // set default
    let langarr = [];
    langarr.push(this.language_list[0]);
    let statarr = [];
    statarr.push(this.status_list[0]);
    this.language_multiselect_selectedlist = langarr;
    this.status_multiselect_selectedlist = statarr;

    // fetch data
    this.getoveralldata();
  }

  // Status
  initialize_status_multiselect() {
    this.status_multiselect_selectedlist = [];
    this.status_multiselect_settings = {
      singleSelection: true,
      idField: "statusid",
      textField: "statusname",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };
  }
  status_multiselect_onselect(item: any) {
    this.filterdata();
  }
  status_multiselect_ondeselect(items: any) {
    this.filterdata();
  }
  /*status_multiselect_onselectall(items: any) {
		this.status_multiselect_selectedlist = items;
		this.filterdata();
	}*/

  // language multi-select
  initialize_language_multiselect() {
    this.language_multiselect_selectedlist = [];
    this.language_multiselect_settings = {
      singleSelection: true,
      idField: "languageid",
      textField: "languagename",
      itemsShowLimit: 1,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };
  }
  language_multiselect_onselect(item: any) {
    this.showdata();
  }
  language_multiselect_ondeselect(items: any) {
    this.showdata();
  }

  // Radio on change event
  radiofilter_on_change(val) {
    this.selected_radiofilter_value = val;
  }

  // Get Table Data
  getoveralldata() {
    this.hideLoading_indicator = false;
    let language = this.language_multiselect_selectedlist[0].languageid;
    this.pptreportService.ppt_trans_getoveralldata(language).subscribe(
      (data) => {
        if (Object.keys(data).length > 0) {
          if (data["status"] == "success") {
            this.alldata = data["data"];
            this.alldata_bkp = data["data"];
            this.alldata_bkp2 = data["data"];
          } else {
            this.alldata = [];
            this.alldata_bkp = [];
            this.alldata_bkp2 = [];
          }
        } else {
          this.alldata = [];
          this.alldata_bkp = [];
          this.alldata_bkp2 = [];
        }
        this.hideLoading_indicator = true;
      },
      (error) => {},
      () => {}
    );
  }

  // Show Data
  async showdata() {
    if (
      this.language_multiselect_selectedlist == undefined ||
      this.language_multiselect_selectedlist == null ||
      this.language_multiselect_selectedlist.length <= 0
    ) {
      swal.fire("Info", "Please select language", "warning");
      this.alldata = [];
      this.alldata_bkp = [];
    } else {
      this.getoveralldata();
    }
  }

  searchdata(searchstring: string) {
    let statarr = [];
    statarr.push(this.status_list[0]);
    this.status_multiselect_selectedlist = statarr;

    searchstring =
      searchstring == undefined || searchstring == null ? "" : searchstring;
    if (!searchstring) {
      this.alldata = this.alldata_bkp;
    } else {
      this.alldata = this.alldata_bkp.filter((element) =>
        element.username
          .toLowerCase()
          .includes(searchstring.trim().toLowerCase())
      );
    }
  }

  async filterdata() {
    this.searchtextfield.nativeElement.value = "";

    if (
      this.status_multiselect_selectedlist == undefined ||
      this.status_multiselect_selectedlist == null ||
      this.status_multiselect_selectedlist.length <= 0
    ) {
      swal.fire("Info", "Please select atleast one status", "warning");
    } else {
      let statusid = this.status_multiselect_selectedlist[0].statusid;
      if (statusid == "0") {
        this.alldata = this.alldata_bkp2;
      } else {
        this.alldata = this.alldata_bkp2.filter((element) =>
          element.status.toLowerCase().includes(statusid.trim().toLowerCase())
        );
      }
    }
  }

  async showdetails(row) {
    let uid = row ? row.userid : "";
    let lng = this.language_multiselect_selectedlist
      ? this.language_multiselect_selectedlist[0].languageid
      : "en";
    this.hideModalLoading_indicator = false;
    this.pptreportService.ppt_trans_getoveralldatabyuserid(uid, lng).subscribe(
      (data) => {
        if (Object.keys(data).length > 0) {
          this.modulesarr = data["modulesarr"];
        } else {
          this.modulesarr = [];
        }
        this.hideModalLoading_indicator = true;
      },
      (error) => {},
      () => {}
    );
  }

  // Open modal box
  open(content, row) {
    this.modal_userid = row ? row.userid : "";
    this.modal_username = row ? row.username : "";

    this.modalReference = this.modalService.open(content, this.ngbModalOptions);
    this.showdetails(row);
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

  /*
	download_report(){
		let data = this.all_report_data;
        let csvData = this.convertToCSV(data);
        let file = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
		saveAs(file,"HBL_Data.csv");
		this.modalReference.close();
	}

    public convertToCSV(objArray: any, fields?) {
        let json2csvParser = new this.Json2csvParser({ opts: fields });
        let csv = json2csvParser.parse(objArray);
        return csv;
    }
	*/
}
