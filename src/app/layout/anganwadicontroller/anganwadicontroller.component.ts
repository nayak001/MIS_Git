import { Component, OnInit } from '@angular/core';
import { routerTransition } from "../../router.animations";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import swal from "sweetalert2";
import { AnganwadicontrollerService } from './anganwadicontroller.service';
@Component({
  selector: 'app-anganwadicontroller',
  templateUrl: './anganwadicontroller.component.html',
  styleUrls: ['./anganwadicontroller.component.scss'],
  animations: [routerTransition()],
})
export class AnganwadicontrollerComponent implements OnInit {
  
  public allanganwadicontrollerlist: any = [];
  public allanganwadicontrollerlist_bkp: any = [];
  flag: string = "";
  no_record_selected: boolean = false;

  anganwadicode: string = "";
  anganwadiname: string = "";
  passcode:string ="";
  stateid:string="";
  state: string="";
 districtid:string="";
 district:string="";
  blockid:string="";
  block: string="";
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
  // hideLoading_indicator: boolean = true;
  constructor(
    private modalService: NgbModal,
    public router: Router,
    private angawadicontrollerService:AnganwadicontrollerService
  ) {    this.getdistrictsofstate();
    this.hideLoading_indicator = true;
  }

  ngOnInit() {
    this.getusercode();
  }
  getusercode(){

    this.hideLoading_indicator = false;
    this.angawadicontrollerService.getusercode(this.selected_stateid, this.selected_districtid, this.selected_blockid).subscribe(
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
          console.log("alllist-->",this.allanganwadicontrollerlist)
          this.allanganwadicontrollerlist_bkp = data;
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
    this.record_id = row._id;
    this.anganwadicode = row.anganwadicode;
    this.anganwadiname = row.anganwadiname;
    this.passcode =row.passcode;
  }
  reset() {
    this.anganwadicode = "";
    this.anganwadiname = "";
    this.passcode="";
  }

  addusercode() {
    if (
      this.anganwadicode == null ||
      this.anganwadicode == undefined ||
      this.anganwadicode == ""
    ) {
      swal.fire("Info", "Awc Code is not valid", "warning");
    } else if (
      this.anganwadiname == null ||
      this.anganwadiname == undefined ||
      this.anganwadiname == ""
    ) {
      swal.fire("Info", "Anganwadiname is not valid", "warning");
    }
    
    // else if (
    //   this.passcode == null ||
    //   this.passcode == undefined ||
    //   this.passcode == ""
    // ){
    //   swal.fire("Info", "Pass code is not valid", "warning")
    // }
    else {
      this.hideLoading_indicator = false;
      console.log("check", this.selected_blockid, this.selected_districtid);
      
      this.angawadicontrollerService
        .checkanganwadicodeexistance(this.anganwadicode)
        .subscribe(
          (data1) => {
            if (Object.keys(data1).length > 0) {
              swal.fire("Info", " Code already exists", "warning");
            } else {
              let body = {
                anganwadicode: this.anganwadicode,
                anganwadiname: this.anganwadiname,
                passcode: this.passcode,
                stateid: this.selected_stateid,
                state: this.selected_statename,
               districtid:this.selected_districtid,
               district: this.selected_districtname,
                blockid:this.selected_blockid,
                block:this.selected_blockname,

              };
               console.log("body", body);
              
              this.angawadicontrollerService.addusercode(body).subscribe(
                (data2) => {
                  this.modalReference.close();
                  swal.fire(
                    "Success",
                    "Anganwadi Record saved successfully",
                    "success"
                  );
                   this.getusercode();
                  this.hideLoading_indicator = true;
                  this.reset();
                },
                (error) => {},
                () => {}
              );
            }
            this.hideLoading_indicator = true;
          },
          (error) => {},
          () => {}
        );
    }
  }
  
  updateusercode() {
    if (
      this.anganwadicode == null ||
      this.anganwadicode == undefined ||
      this.anganwadicode == ""
    ) 
    {
      swal.fire("Info", "AwcCode is not valid", "warning");
    } else if (
      this.anganwadiname == null ||
      this.anganwadiname == undefined ||
      this.anganwadiname == ""
    ) {
      swal.fire("Info", "Anganwadiname is not valid", "warning");
    }
    else if( this.selected_districtname == null ||
      this.selected_districtname  == undefined ||
      this.selected_districtname  == ""){
      swal.fire("Info", "District is not valid", "warning");
    }
    else if( this.selected_blockname== null ||
      this.selected_blockname == undefined ||
      this.selected_blockname == ""){
      swal.fire("Info", "Blok is not valid", "warning");
    }
    // else if (
    //   this.passcode == null ||
    //   this.passcode == undefined ||
    //   this.passcode == ""
    // ){
    //   swal.fire("Info", "Pass code is not valid", "warning")
    // } 
    else {
      this.hideLoading_indicator = false;
      this.angawadicontrollerService
        .checkanganwadicodeexistance(this.anganwadicode)
        .subscribe(
          (data1) => {
            if (Object.keys(data1).length > 0) {
              if (data1[0]._id == this.record_id) {
                let body = {
                  anganwadicode: this.anganwadicode,
                anganwadiname: this.anganwadiname,
                // passcode: this.passcode,
                stateid: this.selected_stateid,
                state: this.selected_statename,
               districtid:this.selected_districtid,
               district: this.selected_districtname,
                blockid:this.selected_blockid,
                block:this.selected_blockname,
                 passcode:this.passcode,
                };

      console.log("body-->",body)
          console.log("id-->",this.record_id)

                // this.angawadicontrollerService
                //   .updateusercode(this.record_id, body)
                  // .subscribe(
                  //   (data2) => {
                  //     this.modalReference.close();
                  //     swal.fire(
                  //       "Success",
                  //       "Anganwadi Record updated successfully",
                  //       "success"
                  //     );
                  //     this.getusercode();
                  //     this.hideLoading_indicator = true;
                  //     this.reset();
                  //   },
                  //   (error) => {},
                  //   () => {}
                  // );
              }
              //  else {
              //   swal.fire("Info", "Anganwadi Code already exists", "warning");
              // }
            } 
            //else {
            //   let body = {
            //     anganwadicode: this.anganwadicode,
            //     anganwadiname: this.anganwadiname,
            //     passcode: this.passcode,
            //     stateid: this.selected_stateid,
            //     state: this.selected_statename,
            //    districtid:this.selected_districtid,
            //    district: this.selected_districtname,
            //     blockid:this.selected_blockid,
            //     block:this.selected_blockname,
            //   };
            //   this.angawadicontrollerService
            //     .updateusercode(this.record_id, body)
            //     .subscribe(
            //       (data2) => {
            //         this.modalReference.close();
            //         swal.fire(
            //           "Success",
            //           "Anganwadi Record updated successfully",
            //           "success"
            //         );
            //         this.getusercode();
            //         this.hideLoading_indicator = true;
            //         this.reset();
            //       },
            //       (error) => {},
            //       () => {}
            //     );
            // }
            this.hideLoading_indicator = true;
          },
          (error) => {},
          () => {}
        );
    }
  }

  deleteusercode() {
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
          this.hideLoading_indicator = false;
          this.angawadicontrollerService.deleteusercode(this.record_id).subscribe(
            (data) => {
              swal.fire(
                "Success",
                "Anganwadi Record deleted successfully",
                "success"
              );
            },
            (error) => {
              console.log("--> Delete Error", error);
            },
            () => {
              this.getusercode();
              this.hideLoading_indicator = true;
              this.reset();
            }
          );
        }
      });
  }
  search(term: string) {
    if (!term) {
      this.allanganwadicontrollerlist = this.allanganwadicontrollerlist_bkp;
    } else {
      this.allanganwadicontrollerlist = this.allanganwadicontrollerlist_bkp.filter((element) =>
        element.anganwadiname
          .trim()
          .toLowerCase()
          .includes(term.trim().toLowerCase())
      );
    }
  }
  open(content, flag) {
    this.reset();
    this.flag = flag;

    if (flag == "save") {
      this.anganwadicode = "";
      this.anganwadiname = "";
      // this.passcode ="";
    } else if (flag == "update") {
      this.anganwadicode = this.selected_record.anganwadicode;
      this.anganwadiname = this.selected_record.anganwadiname;
      // this.passcode = this.selected_record.passcode;

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





  getdistrictsofstate() {
    this.hideLoading_indicator = false;
    this.angawadicontrollerService.getdistrictsofstate(this.selected_stateid).subscribe(
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
    this.angawadicontrollerService
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
    // console.log("stateid->",this.selected_stateid)
    this.selected_statename = selectedElementText;
    
  }
  selected_district_onchange(event: Event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.selected_districtid = selectedOptionValue;
    
    this.selected_districtname = selectedElementText;
    console.log("selected_districtid", this.selected_districtid );
    console.log("selected_districtname", this.selected_districtname );

    
    this.getblocksofdistricts();
  }

  selected_block_onchange(event: Event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.selected_blockid = selectedOptionValue;
    this.selected_blockname = selectedElementText;
    console.log("selected_blockid", this.selected_blockid );
    console.log("selected_blockname", this.selected_blockname );
    this.getusercode();
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
