import { Component, OnInit } from "@angular/core";
import { routerTransition } from "../../router.animations";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import swal from "sweetalert2";
import { SupervisorcontrollerService } from "./supervisorcontroller.service";
import { event } from "jquery";
import { Subscriber } from "rxjs";
@Component({
  selector: "app-supervisorcontroller",
  templateUrl: "./supervisorcontroller.component.html",
  styleUrls: ["./supervisorcontroller.component.scss"],
  animations: [routerTransition()],
})
export class SupervisorcontrollerComponent implements OnInit {
  public allanganwadicontrollerlist: any = [];
  public allanganwadicontrollerlist_bkp: any = [];
  public alludisecodeslist_bkp: any = [];
  public allanganwadilist_bkp: any = [];
  public allanganwadilist: any = [];
  public supervisordata: any = [];
  public updateallanganwadicontrollerlist: any = [];
  // _anganwadiselect: anganwadiselect;

  flag: string = "";
  no_record_selected: boolean = false;
  assignedAnganwadis: "";
  selected_anganwadiname: any = [];
  unselected_anganwadiname: any = [];
  select_anganwadiname: any = [];
  unselect_anganwadiname: "";
  txt_passcode: string = "";
  txt_anganwadiname: string = "";
  unsetAnganwadiList: string = "";
  anganwadimap: string = "";
  anganwadi_push: string = "";
  anganwadi_pop: string = "";
  values: string = "";
  anganwadicode: string = "";
  anganwadiname: string = "";
  passcode: string = "";
  stateid: string = "";
  state: string = "";
  districtid: string = "";
  district: string = "";
  blockid: string = "";
  block: string = "";
  alldistrictdata: any;
  allblockdata: any;
  selected_stateid: string = "20";
  selected_statename: string = "odisha";

  selected_districtid: string = "";
  selected_districtname: string = "";
  selected_blockid: string = "";
  selected_blockname: string = "";

  hideLoading_indicator: boolean;
  hideLoading_indicator2: boolean;

  selected_record: any = {};
  record_id: string = "";
  modalReference: any;
  closeResult: string;
  sup: boolean = true;
  // hideLoading_indicator: boolean = true;
  constructor(
    private modalService: NgbModal,
    public router: Router,
    private supervisorcontrollerService: SupervisorcontrollerService
  ) {
    this.getdistrictsofstate();
    this.hideLoading_indicator = true;
  }

  ngOnInit() {
    this.getanganwadiList();
    this.getallpasscodes();
    // this._anganwadiselect = new anganwadiselect();
  }

  getallpasscodes() {
    this.hideLoading_indicator = false;
    this.supervisorcontrollerService.getallsupervisordetails().subscribe(
      (data) => {
        if (
          data == undefined ||
          data == null ||
          Object.keys(data).length <= 0
        ) {
          this.allanganwadilist = [];
          this.allanganwadilist_bkp = [];
          this.selected_record = {};
          this.record_id = "";
          this.no_record_selected = true;
        } else {
          // this.allanganwadilist = data;
          this.supervisordata = data;
          this.sup = true;
          // console.log("sup1-->", this.sup);
          // console.log("supervisordata-->", this.supervisordata);
          this.allanganwadilist_bkp = data;
          this.selected_record = data[0];
          this.record_id = this.selected_record._id;
          this.record_onselect(this.selected_record);
          this.no_record_selected = false;
        }
        this.hideLoading_indicator = true;
      },
      (error) => {},
      () => {}
    );
  }


  record_onselect(row) {
    //this.reset();
    this.selected_record = row;
    // console.log("row", this.selected_record);
    this.record_id = row._id;
    // console.log("id-->", this.record_id);
    this.txt_passcode = row.passcode;
    // console.log("onselect passcode-->", this.txt_passcode);
    this.txt_anganwadiname = row.anganwadiList.map(
      (item) => item.anganwadiname
    );
    // console.log("onselect anganwadiname-->", this.txt_anganwadiname);

    // this.anganwadimap = this.supervisordata.filter
    //   (element => element.anganwadiList.includes("anganwadiname")
    // );

    // this.anganwadimap = this.supervisordata.forEach(
    //   (element) => element.anganwadiList
    // );

    // this.anganwadimap = this.supervisordata.forEach(function (
    //   myProperty_element
    // ) {
    //   var x = myProperty_element.anganwadiList;
    //   console.log("x-->", x);

    // for (let index = 0; index < x.length; index++) {
    //   const element = x.map((ele)=>ele.anganwadiname)[index];
    // console.log("element-->",element)

    // }

    // });

    // for (let index = 0; index < this.supervisordata.length; index++) {
    //   const element =  this.supervisordata[index];
    //   const id = element.anganwadiList[index]
    //   console.log("element-->",element)
    //   console.log("id-->",id)

    // }
    // this.anganwadimap =  row.anganwadiList.map((x)=>x.anganwadiname);
    // console.log("onselect anganwadiname-->", this.anganwadimap);

    // this.txt_anganwadiname = row.anganwadimap

    // .filter((x) => x.isselected == true)
    // .map((x) => x.anganwadiname);

    // console.log("onselect anganwadiname2-->", this.txt_anganwadiname);
  }

  getanganwadiList() {

    this.hideLoading_indicator = false;
    this.supervisorcontrollerService
      .getallunassignedanganwadis(
        this.selected_stateid,
        this.selected_districtid,
        this.selected_blockid
      )
      .subscribe(
        (data) => {
          if (
            data == undefined ||
            data == null ||
            Object.keys(data).length <= 0
          ) {
            this.allanganwadicontrollerlist = [];
            this.allanganwadicontrollerlist_bkp = [];
            this.selected_record = {};
            this.record_id = "";
            this.no_record_selected = true;
          } else {
            this.allanganwadicontrollerlist = data;
            this.allanganwadicontrollerlist_bkp = data;

            // console.log("alllanganwadiist-->", this.allanganwadicontrollerlist);
            this.allanganwadicontrollerlist_bkp = data;

            // this.selected_record = data[0];
            // this.record_id = this.selected_record._id;
            // this.record_onselect(this.selected_record);
            // this.no_record_selected = false;
          }
          this.hideLoading_indicator = true;
        },
        (error) => {},
        () => {}
      );
  }

 
  reset() {
    this.txt_passcode = "";
    // this.txt_anganwadiname = "";
     this.allanganwadicontrollerlist = "";
   

   
    this.selected_stateid = "";
    this.selected_blockid = "";
    this.selected_districtid = "";
 
    // this.selected_statename = "";
    //  this.state = "";
  }

  onchange() {
    // this.allanganwadicontrollerlist.anganwadiname =
    const onchange = this.allanganwadicontrollerlist.filter(
      (x) => x.supervisorAssigned == false
    );
    // .map((x) => x.anganwadiname)
    // .join(",")
    // .toString();
    // console.log(
    //   "anganwadiname-->",
    //   // this.allanganwadicontrollerlist.anganwadiname
    //   onchange
    // );
    // console.log(
    //   "allangnawadicontrollerlist-->",
    //   this.allanganwadicontrollerlist
    // );

    // console.log("clicked", this.allanganwadicontrollerlist.anganwadiname);
    //  this.getcourses()
  }
  // onpasscodechange() {
  //   console.log("input", this.txt_passcode);
  // }

  unsetAnganwadiListt: any;
  addAnganwadi: any;

  onchange_update() {
    // console.log("clicked-->",this.selected_record)
    // this.allanganwadicontrollerlist = this.selected_record.anganwadiList.filter(
    //   (x) => x.isselected == true
    // );
    // .map((x) => x.anganwadiname)
    // .join(",")
    // .toString();
    // .push( this.anganwadi_push)

    this.addAnganwadi = [
      ...this.select_anganwadiname,
      ...this.updateallanganwadicontrollerlist,
    ].filter((x) => x.supervisorAssigned == true);
    // console.log("addAnganwadi2-->", this.addAnganwadi);

    // console.log("anganwadipush-->", this.select_anganwadiname);
    // console.log("addanganwadi-->", [
    //   ...this.select_anganwadiname,
    //   ...this.updateallanganwadicontrollerlist,
    // ]);

    this.unsetAnganwadiListt = this.select_anganwadiname.filter(
      (x) => x.supervisorAssigned == false
    );

   
 
 
  }


  save_data() {
    if (
      this.txt_passcode == null ||
      this.txt_passcode == undefined ||
      this.txt_passcode == ""
    ) {
      swal.fire("Info", "Supervisor Passcode is not valid", "warning");
    } else if (
      this.allanganwadicontrollerlist == null ||
      this.allanganwadicontrollerlist == undefined ||
      this.allanganwadicontrollerlist == ""
    ) {
      swal.fire("Info", "Anganwadi List is not valid", "warning");
    } else {
      this.hideLoading_indicator = false;
   
      const assignedAnganwadis = this.allanganwadicontrollerlist.filter(
        (e) => e.supervisorAssigned == true
      );
      let body = {
        passcode: this.txt_passcode,
        anganwadiList: assignedAnganwadis,
        blockid: this.selected_blockid,
        stateid: this.selected_stateid,
        districtid: this.selected_districtid,
      };

      // console.log("setang", assignedAnganwadis);
      // console.log("save", body);

      this.supervisorcontrollerService.savesupervisordetails(body).subscribe(
        (data2) => {
          // console.log("data2", Object.values(data2)[0]);
          this.modalReference.close();
          if (Object.values(data2)[0] == "supervisorAlreadyExists")
            swal.fire(
              "Supervisor already exists.",
              "Supervisor Record saved failed",
              "error"
            );
          else {
            swal.fire(
              "Success",
              "Supervisor Record saved successfully",
              "success"
            );
          }
          this.getallpasscodes();
          this.hideLoading_indicator = true;
          this.reset();
        },
        (error) => {},
        () => {}
      );
    }
    // this.hideLoading_indicator = true;
    // },
    // (error) => {},
    // () => {};
    // );
    // }
  }

  update_data() {
    if (
      this.txt_passcode == null ||
      this.txt_passcode == undefined ||
      this.txt_passcode == ""
    ) {
      swal.fire("Info", "Passcode is not valid", "warning");
    } else if (
      this.select_anganwadiname == null ||
      this.select_anganwadiname == undefined ||
      this.select_anganwadiname == ""
    ) {
      swal.fire("Info", "Anganwaduname is not valid", "warning");
    } else {
      this.hideLoading_indicator = false;
      const selectedAnganwadiList = this.select_anganwadiname.filter(
        (x) => x.supervisorAssigned == true
      );
      // console.log("selectedAnganwadiList-->", selectedAnganwadiList);

      let body = {
        passcode: this.txt_passcode,
        //  anganwadiList: this.allanganwadicontrollerlist,
        anganwadiList: this.addAnganwadi,
        // unsetAnganwadiList: this.selected_record.anganwadiList.filter(
        //   (x) => !x.isselected
        // ),
        // unsetAnganwadiList: this.updateallanganwadicontrollerlist,
        stateid: this.selected_record.stateid,
        districtid: this.selected_record.districtid,
        blockid: this.selected_record.blockid,
      };
      // console.log("update1-->", body);
      // console.log("update2-->", this.unsetAnganwadiList);

      this.supervisorcontrollerService.updatesupervisordetails(body).subscribe(
        (data2) => {
          // console.log("update-->", body);
          // console.log("updatedata-->", data2);
          if (this.unsetAnganwadiListt.length == 0) {
            this.modalReference.close();
            swal.fire(
              "Success",
              "Supervisor Code updated successfully",
              "success"
            );
          } else {
            this.unsetAnganwadiListt.forEach((e) => {
              this.supervisorcontrollerService
                .updateByAnganwadiCode(e)
                .subscribe((data3) => {
                  this.modalReference.close();
                  swal.fire(
                    "Success",
                    "Supervisor Code updated successfully",
                    "success"
                  );
                });
            });
          }

          this.getallpasscodes();
          // this.getanganwadiList();
          this.hideLoading_indicator = true;
          this.reset();
        },
        (error) => {},
        () => {}
      );

      this.hideLoading_indicator = true;

      () => {};
    }
  }

  getdistrictsofstate() {
    this.hideLoading_indicator = false;
    this.supervisorcontrollerService
      .getdistrictsofstate(this.selected_stateid)
      .subscribe(
        (data) => {
          this.alldistrictdata = data;
          this.hideLoading_indicator = true;
        },
        (error) => {},
        () => {}
      );
  }

  getblocksofdistricts() {
    this.hideLoading_indicator = false;
    this.supervisorcontrollerService
      .getblocksofdistricts(this.selected_stateid, this.selected_districtid)
      .subscribe(
        (data) => {
          this.allblockdata = data;
          this.hideLoading_indicator = true;
        },
        (error) => {},
        () => {}
      );
  }

  selected_state_onchange(event: Event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.selected_stateid = selectedOptionValue;
    // console.log("stateid-->", this.selected_stateid);
    this.selected_statename = selectedElementText;
  }
  selected_district_onchange(event: Event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.selected_districtid = selectedOptionValue;
    // console.log("selected_districtid", this.selected_districtid);
    this.selected_districtname = selectedElementText;

    // console.log("selected_districtname", this.selected_districtname);

    this.getblocksofdistricts();
  }

  selected_block_onchange(event: Event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.selected_blockid = selectedOptionValue;
    //  console.log("selected_blockid", this.selected_blockid);
    this.selected_blockname = selectedElementText;

     console.log("selected_blockname", this.selected_blockname);
    this.getanganwadiList();
  }

  anganwadiList: any;
  // ----------------------------- Modal -------------------------------
  open(content, flag) {
    this.reset();
    this.flag = flag;

    if (flag == "save") {
      this.txt_passcode = "";
      this.txt_anganwadiname = "";
      this.selected_stateid = "";
      this.selected_blockid = "";
      this.selected_districtid = "";
    
    } else if (flag == "update") {
      // console.log("@@@@ selected_record", this.selected_record);
      this.txt_passcode = this.selected_record.passcode;
      this.select_anganwadiname = this.selected_record.anganwadiList.filter(
        (x) => x.supervisorAssigned == true
      );

      this.anganwadiList = this.selected_record.anganwadiList;

      // console.log("selectanganwadiname-->", this.select_anganwadiname);

      this.supervisorcontrollerService
        .getallunassignedanganwadis(
          this.selected_record.stateid,
          this.selected_record.districtid,
          this.selected_record.blockid
        )
        .subscribe(
          (data) => {
            if (
              data == undefined ||
              data == null ||
              Object.keys(data).length <= 0
            ) {
              this.selected_record = {};
              this.record_id = "";
              this.no_record_selected = true;
            } else {
              this.updateallanganwadicontrollerlist = data;
              // console.log(
              //   "updateanganwadi-->",
              //   this.updateallanganwadicontrollerlist
              // );
            }
          },

          (error) => {},
          () => {}
        );
      // this.selected_record. anganwadiList
      //   .filter((x) => !x.isselected)
      //   .map((x) => x.anganwadiname)
      //   .join(",")
      //   .toString();
    }

    this.modalReference = this.modalService.open(content);
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

// class anganwadiselect {
//   id: number;
//   anganwadiname: string;
//   isselected: boolean;
// }
