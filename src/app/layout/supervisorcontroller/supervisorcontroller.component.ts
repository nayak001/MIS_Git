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
  selected_stateid2: string = "20";
  selected_statename2: string = "odisha";

  selected_districtid: string = "";

  selected_districtname: string = "";
  selected_districtid2: string = "";
  selected_districtname2: string = "";
  selected_blockid: string = "";

  selected_blockname: string = "";
  selected_blockid2: string = "";
  selected_blockname2: string = "";

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

    //  this.save_data();

    // this._anganwadiselect = new anganwadiselect();
  }

  getallpasscodes() {
   
    this.hideLoading_indicator = false;
    this.supervisorcontrollerService.getallsupervisordetails(this.selected_stateid2,this.selected_districtid2,this.selected_blockid2).subscribe(
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
          console.log("supervisordata-->", this.supervisordata);
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

 
supervisorid:any;
supervisorname:any;
  record_onselect(row) {
    //this.reset();
    this.selected_record = row;
    console.log("row", this.selected_record);
    this.record_id = row._id;
    // console.log("id-->", this.record_id);
    this.txt_passcode = row.passcode;
    // console.log("onselect passcode-->", this.txt_passcode);
    this.supervisorid = row.managerid;

    this.supervisorname = row.managername;

    this.txt_anganwadiname = row.anganwadiList.map(
      (item) => item.anganwadiname
    );
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
            // this.allanganwadicontrollerlist_bkp = data;

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
    //  this.allanganwadicontrollerlist = "";

    this.selected_districtname = "";
    this.selected_blockname = "";
    this.selected_statename = "";
    // this.selected_statename = "";
    //  this.state = "";
  }
  selected_anganwadilist: any;

  array_obj: any = [];
  onchange(item) {
    this.array_obj.push(item);
    console.log("clicked1", item.supervisorAssigned);
    console.log("clicked2", this.array_obj);
    this.selected_anganwadilist = item;
    //console.log("item-->",[item])
    //console.log("spread-->",item.push(this.array_obj));
    // console.log("spread-->",Object.entries([item]));
    console.log("spread-->", item);
    item.passcode = this.txt_passcode;
    // console.log("onchange push-->",item.passcode = this.txt_passcode )
    // console.log("txt passcode-->",this.txt_passcode )
    // this.allanganwadicontrollerlist.anganwadiname =
    // const onchange = this.allanganwadicontrollerlist.map(
    //   (x) => x.passcode
    // )
    // this.pass = item;
    // console.log("pass-->", item)
    // const onchange = this.allanganwadicontrollerlist.map((x)=>x.passcode);
    // console.log("onchange-->",onchange)
    // this.txt_passcode =item.passcode ;
    // console.log("item.passcode-->",item.passcode)

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
  setAnganwadiList: any;
  wholeUpdate: any;
  onchange_update(item) {
    console.log("item-->", item);

    this.unsetAnganwadiListt = this.select_anganwadiname.filter(
      (x) => x.supervisorAssigned == false
    );

    if(this.unsetAnganwadiListt){
      this.select_anganwadiname.filter(
        (x) => x.passcode = '')
      
    }else(
       this.select_anganwadiname.filter(
        (x) => x.passcode = this.txt_passcode)
      
    )

    console.log("unselect anganwadi-->", this.unsetAnganwadiListt);

    this.setAnganwadiList = this.updateallanganwadicontrollerlist.filter(
      (x) => x.supervisorAssigned == true
    );

if( this.setAnganwadiList){
  this.updateallanganwadicontrollerlist.filter(
    (x) => x.passcode = this.txt_passcode
  );
}else (
  this.updateallanganwadicontrollerlist.filter(
    (x) => x.passcode = ""
  )
)

    console.log(
      "ang update2-->",
      this.setAnganwadiList
    );

    this.wholeUpdate = [...this.unsetAnganwadiListt, ...this.setAnganwadiList];

    console.log("wholeUpdate-->", this.wholeUpdate);

    // const selected = this.allanganwadicontrollerlist.filter(
    //   (x) => x.supervisorAssigned == false
    // );

    // console.log("selected-->", selected);

    // const unselected = this.allanganwadicontrollerlist.filter(
    //   (x) => x.supervisorAssigned == true
    // );
    // console.log("unselected-->",unselected)

    // if (
    //   this.select_anganwadiname.map((x) => x.supervisorAssigned == true) &&
    //   this.updateallanganwadicontrollerlist.map((x) => x.supervisorAssigned == true)
    // ) {
    //   this.selected_anganwadiname = [
    //     ...this.select_anganwadiname,
    //     ...this.updateallanganwadicontrollerlist,
    //   ];
    //   console.log("selected_anganwadiname-->", this.selected_anganwadiname);
    // } else if (
    //   this.select_anganwadiname.map((x) => x.supervisorAssigned == false)
    //   //  ||
    //   // this.updateallanganwadicontrollerlist.map((x) => !x.isselected )
    // ) {
    //   console.log(
    //     " this.unselected_anganwadiname",
    //     this.selected_anganwadiname
    //  );
    // }
  }

  unselect() {
    console.log("allangawadilist", this.anganwadiList);
    console.log();
  }
  savesupervisorData: any;
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
      // this.supervisorcontrollerService

      //   .checkanganwadinameexistance(

      //     this.allanganwadicontrollerlist.anganwadiname

      //   )

      // .subscribe(
      // (data1) => {
      //   console.log("data1-->",data1)
      //   if (Object.keys(data1).length > 0) {
      //     console.log("Object-->",Object)
      //     console.log("Object.keys-->",Object.keys)
      //     swal.fire("Info", "Anganwadi name already exists", "warning");
      //   } else {
      const assignedAnganwadis = this.allanganwadicontrollerlist.filter(
        (e) => e.supervisorAssigned == true
      );
      console.log("assignedAnganwadis-->", assignedAnganwadis);
      console.log(
        "this.allanganwadicontrollerlist-->",
        this.allanganwadicontrollerlist
      );
      let body = {
        passcode: this.txt_passcode,
        anganwadiList: this.array_obj,
        blockid: this.selected_blockid,
        blockname: this.selected_blockname,
        stateid: this.selected_stateid,
        statename: this.selected_statename,
        districtid: this.selected_districtid,
        districtname: this.selected_districtname,
      };

      console.log("setang", assignedAnganwadis);
      console.log("save", body);
      this.savesupervisorData = body;
      console.log("savesupervisorData-->", this.savesupervisorData);

      this.supervisorcontrollerService.savesupervisordetails(body).subscribe(
        (data2) => {
          console.log("data3", data2);
          console.log("body", body);
          console.log("data2", Object.values(data2)[0]);

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
        }
        // (error) => {},
        // () => {}
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
      // const selectedAnganwadiList = this.select_anganwadiname.filter(
      //   (x) => x.supervisorAssigned == true
      // );
      // console.log("selectedAnganwadiList-->", selectedAnganwadiList);

      let body = {
        passcode: this.txt_passcode,
        //  anganwadiList: this.allanganwadicontrollerlist,
        // anganwadiList: selectedAnganwadiList,
        anganwadiList: this.wholeUpdate,
        // unsetAnganwadiList: this.selected_record.anganwadiList.filter(
        //   (x) => !x.isselected
        // ),
        // unsetAnganwadiList: this.updateallanganwadicontrollerlist,
        stateid: this.selected_record.stateid,
        districtid: this.selected_record.districtid,
        blockid: this.selected_record.blockid,
      };
      console.log("update1-->", body);
      // console.log("update2-->", this.unsetAnganwadiList);

        this.supervisorcontrollerService.updatesupervisordetails(body).subscribe((data2)=>{
          if (this.wholeUpdate.length > 0) {
            this.modalReference.close();
            swal.fire(
              "Success",
              "Supervisor Code updated successfully",
              "success"
            );
          }
           this.getallpasscodes();
          this.hideLoading_indicator = true;
          // this.reset();
        },

        )
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

  
  getblocksofdistricts2() {
    this.hideLoading_indicator = false;
    this.supervisorcontrollerService
      .getblocksofdistricts(this.selected_stateid2, this.selected_districtid2)
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
    console.log("selected_districtid", this.selected_districtid);
    this.selected_districtname = selectedElementText;

    console.log("selected_districtname", this.selected_districtname);

    this.getblocksofdistricts();
  }

  selected_block_onchange(event: Event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.selected_blockid = selectedOptionValue;
    console.log("selected_blockid", this.selected_blockid);
    this.selected_blockname = selectedElementText;

    console.log("selected_blockname", this.selected_blockname);
    this.getanganwadiList();
  }


  selected_state_onchange2(event: Event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.selected_stateid2 = selectedOptionValue;
    // console.log("stateid2-->", this.selected_stateid);
    this.selected_statename2 = selectedElementText;
  }
  selected_district_onchange2(event: Event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.selected_districtid2 = selectedOptionValue;
    console.log("selected_districtid2", this.selected_districtid2);
    this.selected_districtname2 = selectedElementText;

    console.log("selected_districtname2", this.selected_districtname2);

    this.getblocksofdistricts2();
  }

  selected_block_onchange2(event: Event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.selected_blockid2 = selectedOptionValue;
    console.log("selected_blockid2", this.selected_blockid2);
    this.selected_blockname2 = selectedElementText;

    console.log("selected_blockname2", this.selected_blockname2);
    this.getallpasscodes();
  }

  anganwadiList: any;
  // ----------------------------- Modal -------------------------------
  open(content, flag) {
    this.reset();
    this.flag = flag;

    if (flag == "save") {
      this.txt_passcode = "";
      this.txt_anganwadiname = "";
    } else if (flag == "update") {
      // console.log("@@@@ selected_record", this.selected_record);
      this.txt_passcode = this.selected_record.passcode;
      this.select_anganwadiname = this.selected_record.anganwadiList.filter(
        (x) => x.supervisorAssigned == true
      );

      this.anganwadiList = this.selected_record;

      console.log("selectanganwadiname-->", this.anganwadiList);

      this.supervisorcontrollerService
        .getallunassignedanganwadis(
          this.selected_stateid,
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
              //this.no_record_selected = true;
            } else {
              this.updateallanganwadicontrollerlist = data;
              console.log(
                "updateanganwadi-->",
                this.updateallanganwadicontrollerlist
              );
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
