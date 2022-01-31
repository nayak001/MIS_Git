import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { routerTransition } from "../../router.animations";
import { Router, NavigationExtras } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import swal from "sweetalert2";
import { UserswapService } from "./userswap.service";

@Component({
  selector: "app-userswap",
  templateUrl: "./userswap.component.html",
  styleUrls: ["./userswap.component.scss"],
  animations: [routerTransition()],
})
export class UserswapComponent implements OnInit {
  public alluserdata: any;
  public filterdata: any;
  alldistrictdata: any;
  allblockdata: any;
  passcodedata: any = [];
  allpasscodedata: any = [];
  schooldata: any = [];
  allschooldata: any = [];

  hideLoading_indicator: boolean;
  hideLoading_indicator2: boolean;
  modalReference: any;
  closeResult: string;

  usertypelist: any = ["anganwadi", "fellow", "school"];
  _id: string = "";
  selected_userid: string = "";
  new_userid: string = "";
  new_username: string = "";
  swapType: string = "olduser";
  selected_username: string = "";
  selected_password: string = "";
  selected_passcode: string = "";
  selected_usertype: string = "fellow";
  selected_gender: string = "female";
  selected_phone: string = "";
  selected_qualification: string = "graduate";
  selected_udisecode: string = "";
  selected_schoolname: string = "";
  selected_managerid: string = "";
  selected_managername: string = "";
  selected_managertype: any = "manager";
  selected_stateid: string = "20";
  selected_statename: string = "odisha";
  selected_districtid: string = "";
  selected_districtname: string = "";
  selected_blockid: string = "";
  selected_blockname: string = "";
  selected_userimage: string = "";
  selected_status: string = "active";

  selected_searchfilter: string = "username";
  data_to_db: any = {};

  hide_usertype: boolean = false;
  hide_password: boolean = false;
  hide_school: boolean = false;
  hide_manager: boolean = false;
  hide_managertype: boolean = false;
  isSelected: boolean = true;

  //-------------
  selected_emailid: string = "";
  selected_address: string = "";
  selected_centername: string = "";
  selected_centerid: string = "";
  selected_createdon: string = "";

  constructor(
    private modalService: NgbModal,
    private changeDetectorRef: ChangeDetectorRef,
    public router: Router,
    private usersService: UserswapService
  ) {
    this.reset_defaults();
    this.hideLoading_indicator = true;
    this.getallUsers();
    this.getdistrictsofstate();
    this.getpasscodebymanagerid();
    this.getallschoollistbypasscode();
  }

  ngOnInit() {}

  getallUsers() {
    this.hideLoading_indicator = false;
    this.usersService.gettotalusersbyusertype(this.selected_usertype).subscribe(
      (data) => {
        this.alluserdata = data;
        this.filterdata = data;
        this.hideLoading_indicator = true;
      },
      (error) => {},
      () => {}
    );
  }

  getpasscodebymanagerid() {
    this.hideLoading_indicator2 = false;
    this.usersService.getallprimarypasscodes(null).subscribe(
      (data) => {
        if (Object.keys(data).length > 0) {
          this.allpasscodedata = data;
          console.log("--> All Passcodes: ", this.allpasscodedata);
          this.setpasscodelist();
        } else {
          this.allpasscodedata = [];
        }
        this.hideLoading_indicator2 = true;
      },
      (error) => {},
      () => {}
    );
  }

  setpasscodelist() {
    if (this.allpasscodedata.length > 0) {
      if (this.selected_usertype == "manager") {
        this.passcodedata = this.allpasscodedata.filter((elem) => {
          return elem.userid == this.selected_userid;
        });
      } else {
        this.passcodedata = this.allpasscodedata;
      }
    } else {
      this.passcodedata = [];
    }
  }

  getallschoollistbypasscode() {
    this.hideLoading_indicator2 = false;
    this.usersService.getallschoolsregistered().subscribe(
      (data) => {
        console.log("--> All Schools: ", data);
        if (Object.keys(data).length > 0) this.allschooldata = data;
        else this.allschooldata = [];
        this.setschoollist();
        this.hideLoading_indicator2 = true;
      },
      (error) => {},
      () => {}
    );
  }

  setschoollist() {
    if (this.allschooldata.length > 0) {
      if (this.selected_usertype == "manager") {
        this.schooldata = [];
      } else {
        let arr = this.allschooldata.filter((elem) => {
          return elem.passcode == this.selected_passcode;
        });
        this.schooldata = arr.length > 0 ? arr[0].schools : [];
      }
    } else {
      this.schooldata = [];
    }
  }

  getdistrictsofstate() {
    this.hideLoading_indicator = false;
    this.usersService.getdistrictsofstate(this.selected_stateid).subscribe(
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
    this.usersService
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

  swapType_onchange(event: Event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    // const selectedElementText = selectedOptions[selectedIndex].text;
    this.swapType = selectedOptionValue;
    console.log("swapType", this.swapType);
  }

  selected_usertype_onchange(event: Event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.selected_usertype = selectedOptionValue;

    this.getallUsers();
    this.setpasscodelist();
  }

  selected_passcode_onchange(event: Event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.selected_passcode = selectedOptionValue;

    this.setschoollist();
    let arr = this.passcodedata.filter(
      (elem) => elem.passcode == this.selected_passcode
    );
    if (arr.length > 0) {
      this.selected_managerid = arr[0].userid;
      this.selected_managername = arr[0].username;
    }
  }

  selected_managertype_onchange(event: Event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.selected_managertype = selectedOptionValue;
  }

  selected_gender_onchange(event: Event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.selected_gender = selectedOptionValue;
  }

  selected_qualification_onchange(event: Event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.selected_qualification = selectedOptionValue;
  }

  selected_school_onchange(event: Event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.selected_udisecode = selectedOptionValue;
    this.selected_schoolname = selectedElementText;
  }

  /*selected_manager_onchange(event: Event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectedElementText = selectedOptions[selectedIndex].text;
		this.selected_managerid = selectedOptionValue;
		this.selected_managername = selectedElementText;
  }*/

  selected_status_onchange(event: Event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.selected_status = selectedOptionValue;
  }

  selected_state_onchange(event: Event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.selected_stateid = selectedOptionValue;
    this.selected_statename = selectedElementText;
  }

  selected_district_onchange(event: Event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.selected_districtid = selectedOptionValue;
    this.selected_districtname = selectedElementText;
    this.getblocksofdistricts();
  }

  selected_block_onchange(event: Event) {
    const selectedOptions = event.target["options"];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.selected_blockid = selectedOptionValue;
    this.selected_blockname = selectedElementText;
  }

  search(term: string) {
    term = term == undefined || term == null ? "" : term;
    if (!term) {
      this.filterdata = this.alluserdata;
    } else {
      this.filterdata = this.alluserdata.filter((element) =>
        element.username.toLowerCase().includes(term.trim().toLowerCase())
      );
    }
  }

  create_user() {
    if (this.savemanager_validation()) {
      this.hideLoading_indicator = false;
      this.usersService
        .getuserbyuserid(this.selected_userid.toLowerCase())
        .subscribe(
          (data) => {
            this.hideLoading_indicator = true;

            if (Object.keys(data).length <= 0) {
              this.usersService.createnewuser(this.data_to_db).subscribe(
                (data) => {
                  this.modalReference.close();
                  this.getallUsers();
                  this.reset_defaults();
                  swal.fire(
                    "Success",
                    "Manager created successfully.",
                    "success"
                  );
                },
                (error) => {},
                () => {}
              );
            } else {
              swal.fire("Info", "User id already registerd", "info");
            }
          },
          (error) => {},
          () => {}
        );
    } else {
      //swal.fire('Info', 'Eneter reuired fields', 'info');
    }
  }

  update_user() {
    let data = {
      olduserid: this.selected_userid,
      newuserid: this.new_userid,
      newusername: this.new_username,
      emailid: this.new_userid,
      usertype: this.selected_usertype,
      schoolname: this.selected_schoolname,
      udisecode: this.selected_udisecode,
      phone: this.selected_phone,
      gender: this.selected_gender,
      stateid: this.selected_stateid,
      statename: this.selected_statename,
      districtid: this.selected_districtid,
      districtname: this.selected_districtname,
      blockid: this.selected_blockid,
      blockname: this.selected_blockname,
    };

    console.log("swap data --->>>", this.swapType);

    if (this.edituser_validation()) {
      this.hideLoading_indicator = false;
      if (this.swapType == "olduser") {
        this.usersService.swapolduser(data).subscribe(
          (res) => {
            this.hideLoading_indicator = true;
            this.modalReference.close();
            this.getallUsers();
            this.reset_defaults();
            console.log(res);

            swal.fire("Success", "User swapped successfully.", "success");
          },
          (error) => {
            console.log("swap err", error);
          },
          () => {}
        );
      } else {
        this.usersService.swapnewuser(data).subscribe(
          (res) => {
            this.hideLoading_indicator = true;
            this.modalReference.close();
            this.getallUsers();
            this.reset_defaults();
            console.log(res);

            swal.fire("Success", "User swapped successfully.", "success");
          },
          (error) => {
            console.log("swap err", error);
          },
          () => {}
        );
      }
    }
  }

  // delete user
  delete_user(id) {
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
          this.usersService.deleteuser(id).subscribe(
            (data) => {
              this.getallUsers();
            },
            (error) => {},
            () => {}
          );
        }
      });
  }

  open(modal, user, flag) {
    if (flag == "details") {
      this.reset_defaults();
      this.set_values(user);
    } else if (flag == "new") {
      this.reset_defaults();
    } else if (flag == "edit") {
      this.reset_defaults();
      this.set_values(user);
      this.setschoollist();
      this.setpasscodelist();
    }

    this.changeDetectorRef.detectChanges();
    this.modalReference = this.modalService.open(modal, {
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

  reset_defaults() {
    this._id = "";
    this.selected_username = "";
    this.selected_userid = "";
    this.selected_password = "";
    this.selected_passcode = "";
    //this.selected_usertype = 'manager';
    this.selected_gender = "male";
    this.selected_emailid = "";
    this.selected_phone = "";
    this.selected_qualification = "graduate";
    this.selected_address = "";
    this.selected_status = "active";
    this.selected_centername = "";
    this.selected_centerid = "";
    this.selected_udisecode = "";
    this.selected_schoolname = "";
    this.selected_managerid = "";
    this.selected_managername = "";
    this.selected_managertype = "manager";
    this.selected_stateid = "20";
    this.selected_statename = "odisha";
    this.selected_districtid = "";
    this.selected_districtname = "";
    this.selected_blockid = "";
    this.selected_blockname = "";
    this.selected_userimage = "";
    this.new_userid = "";
    this.new_username = "";
    this.data_to_db = {};
    this.swapType = "olduser";
    this.show_hide();
  }

  set_values(user) {
    this._id =
      user._id == undefined || user._id == null || user._id.trim() == ""
        ? ""
        : user._id;
    this.selected_username =
      user.username == undefined ||
      user.username == null ||
      user.username.trim() == ""
        ? ""
        : user.username.trim().toLowerCase();
    this.selected_userid =
      user.userid == undefined ||
      user.userid == null ||
      user.userid.trim() == ""
        ? ""
        : user.userid.trim();
    this.selected_password =
      user.password == undefined ||
      user.password == null ||
      user.password.trim() == ""
        ? ""
        : user.password;
    this.selected_passcode =
      user.passcode == undefined ||
      user.passcode == null ||
      user.passcode.trim() == ""
        ? ""
        : user.passcode;
    this.selected_usertype =
      user.usertype == undefined ||
      user.usertype == null ||
      user.usertype.trim() == ""
        ? ""
        : user.usertype.trim().toLowerCase();
    this.selected_gender =
      user.gender == undefined ||
      user.gender == null ||
      user.gender.trim() == ""
        ? "male"
        : user.gender.trim().toLowerCase();
    this.selected_emailid =
      user.emailid == undefined ||
      user.emailid == null ||
      user.emailid.trim() == ""
        ? ""
        : user.emailid.trim();
    this.selected_phone =
      user.contactnumber == undefined ||
      user.contactnumber == null ||
      user.contactnumber.trim() == ""
        ? ""
        : user.contactnumber.trim();
    this.selected_qualification =
      user.qualification == undefined ||
      user.qualification == null ||
      user.qualification.trim() == ""
        ? ""
        : user.qualification.trim();
    this.selected_address =
      user.permanentaddress == undefined ||
      user.permanentaddress == null ||
      user.permanentaddress.trim() == ""
        ? ""
        : user.permanentaddress.trim().toLowerCase();
    this.selected_status =
      user.status == undefined ||
      user.status == null ||
      user.status.trim() == ""
        ? ""
        : user.status.trim().toLowerCase();
    this.selected_centerid =
      user.centerid == undefined ||
      user.centerid == null ||
      user.centerid.trim() == ""
        ? ""
        : user.centerid.trim();
    this.selected_centername =
      user.centername == undefined ||
      user.centername == null ||
      user.centername.trim() == ""
        ? ""
        : user.centername.trim().toLowerCase();
    this.selected_udisecode =
      user.udisecode == undefined ||
      user.udisecode == null ||
      user.udisecode.trim() == ""
        ? ""
        : user.udisecode.trim().toLowerCase();
    this.selected_schoolname =
      user.schoolname == undefined ||
      user.schoolname == null ||
      user.schoolname.trim() == ""
        ? ""
        : user.schoolname.trim().toLowerCase();
    this.selected_managerid =
      user.managerid == undefined ||
      user.managerid == null ||
      user.managerid.trim() == ""
        ? ""
        : user.managerid.trim().toLowerCase();
    this.selected_managername =
      user.managername == undefined ||
      user.managername == null ||
      user.managername.trim() == ""
        ? ""
        : user.managername.trim().toLowerCase();
    this.selected_managertype =
      user.managertype == undefined ||
      user.managertype == null ||
      user.managertype.trim() == ""
        ? ""
        : user.managertype.trim().toLowerCase();
    this.selected_stateid =
      user.stateid == undefined ||
      user.stateid == null ||
      user.stateid.trim() == ""
        ? "20"
        : user.stateid.trim();
    this.selected_statename =
      user.statename == undefined ||
      user.statename == null ||
      user.statename.trim() == ""
        ? "odisha"
        : user.statename.trim().toLowerCase();
    this.selected_districtid =
      user.districtid == undefined ||
      user.districtid == null ||
      user.districtid.trim() == ""
        ? ""
        : user.districtid.trim();
    this.selected_districtname =
      user.districtname == undefined ||
      user.districtname == null ||
      user.districtname.trim() == ""
        ? ""
        : user.districtname.trim().toLowerCase();
    this.selected_blockid =
      user.blockid == undefined ||
      user.blockid == null ||
      user.blockid.trim() == ""
        ? ""
        : user.blockid.trim().toLowerCase();
    this.selected_blockname =
      user.blockname == undefined ||
      user.blockname == null ||
      user.blockname.trim() == ""
        ? ""
        : user.blockname.trim().toLowerCase();
    this.selected_userimage =
      user.image == undefined || user.image == null || user.image.trim() == ""
        ? ""
        : user.image.trim();
  }

  show_hide() {
    if (this.selected_usertype == "manager") {
      this.hide_usertype = true;
      this.hide_school = true;
      this.hide_manager = true;
      this.hide_managertype = false;
      this.hide_password = false;
    } else {
      this.hide_usertype = false;
      this.hide_school = false;
      this.hide_manager = false;
      this.hide_managertype = true;
      this.hide_password = true;
    }
  }

  savemanager_validation() {
    let regex_email =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    let regex_phone = /^((\\+91-?)|0)?[0-9]{10}$/;
    if (
      this.selected_userid == undefined ||
      this.selected_userid == null ||
      this.selected_userid.trim() == ""
    ) {
      swal.fire("Info", "Please enter valid User id", "info");
      return false;
    } else if (!this.selected_userid.match(regex_email)) {
      swal.fire("Info", "Not a valid User id.", "info");
    } else if (
      this.selected_username == undefined ||
      this.selected_username == null ||
      this.selected_username.trim() == ""
    ) {
      swal.fire("Info", "Please enter User name", "info");
      return false;
    } else if (
      this.selected_username.length < 4 ||
      this.selected_username.length > 20
    ) {
      swal.fire("Info", "User name must be between 5 to 20 characters", "info");
      return false;
    } else if (
      this.selected_password == undefined ||
      this.selected_password == null ||
      this.selected_password.trim() == ""
    ) {
      swal.fire("Info", "Please enter Password", "info");
      return false;
    } else if (
      this.selected_password.length < 5 ||
      this.selected_password.length > 15
    ) {
      swal.fire("Info", "Password must be between 5 to 15 characters", "info");
      return false;
    } else if (
      this.selected_phone == undefined ||
      this.selected_phone == null ||
      this.selected_phone.trim() == ""
    ) {
      swal.fire("Info", "Please enter valid Mobile number", "info");
      return false;
    } else if (!this.selected_phone.match(regex_phone)) {
      swal.fire("Info", "Not a valid Mobile number", "info");
      return false;
    } else if (
      this.selected_managertype == undefined ||
      this.selected_managertype == null ||
      this.selected_managertype.trim() == ""
    ) {
      swal.fire("Info", "Please select manager type", "info");
      return false;
    } else {
      this.data_to_db = {
        userid: this.selected_userid.toLowerCase(),
        username: this.selected_username.toLowerCase(),
        password: this.selected_password,
        passcode: this.selected_passcode.toUpperCase(),
        contactnumber: this.selected_phone,
        managertype: this.selected_managertype.toLowerCase(),
        gender: this.selected_gender.toLowerCase(),
        qualification: this.selected_qualification.toLowerCase(),
        stateid: this.selected_stateid,
        statename: this.selected_statename.toLowerCase(),
        districtid: this.selected_districtid,
        districtname: this.selected_districtname.toLowerCase(),
        blockid: this.selected_blockid,
        blockname: this.selected_blockname.toLowerCase(),
        usertype: "manager",
        status: this.selected_status,
      };
      return true;
    }
  }

  editmanager_validation() {
    let regex_phone = /^((\\+91-?)|0)?[0-9]{10}$/;
    if (
      this.selected_passcode == undefined ||
      this.selected_passcode == null ||
      this.selected_passcode.trim() == ""
    ) {
      swal.fire("Info", "Please select passcode", "info");
      return false;
    } else if (
      this.selected_password == undefined ||
      this.selected_password == null ||
      this.selected_password.trim() == ""
    ) {
      swal.fire("Info", "Please enter Password", "info");
      return false;
    } else if (
      this.selected_password.length < 5 ||
      this.selected_password.length > 15
    ) {
      swal.fire("Info", "Password must be between 5 to 15 characters", "info");
      return false;
    } else if (
      this.selected_phone == undefined ||
      this.selected_phone == null ||
      this.selected_phone.trim() == ""
    ) {
      swal.fire("Info", "Please enter valid Mobile number", "info");
      return false;
    } else if (!this.selected_phone.match(regex_phone)) {
      swal.fire("Info", "Not a valid Mobile number", "info");
      return false;
    } else if (
      this.selected_managertype == undefined ||
      this.selected_managertype == null ||
      this.selected_managertype.trim() == ""
    ) {
      swal.fire("Info", "Please select manager type", "info");
      return false;
    } else {
      this.data_to_db = {
        username: this.selected_username.toLowerCase(),
        password: this.selected_password,
        passcode: this.selected_passcode.toUpperCase(),
        contactnumber: this.selected_phone,
        managertype: this.selected_managertype.toLowerCase(),
        gender: this.selected_gender.toLowerCase(),
        qualification: this.selected_qualification.toLowerCase(),
        stateid: this.selected_stateid,
        statename: this.selected_statename.toLowerCase(),
        districtid: this.selected_districtid,
        districtname: this.selected_districtname.toLowerCase(),
        blockid: this.selected_blockid,
        blockname: this.selected_blockname.toLowerCase(),
        status: this.selected_status,
      };
      return true;
    }
  }

  edituser_validation() {
    let regex_phone = /^((\\+91-?)|0)?[0-9]{10}$/;
    if (
      this.selected_username == undefined ||
      this.selected_username == null ||
      this.selected_username.trim() == ""
    ) {
      swal.fire("Info", "Please enter User name", "info");
      return false;
    } else if (
      this.selected_username.length < 4 ||
      this.selected_username.length > 20
    ) {
      swal.fire("Info", "User name must be between 5 to 20 characters", "info");
      return false;
    } else if (
      this.selected_usertype == undefined ||
      this.selected_usertype == null ||
      this.selected_usertype.trim() == ""
    ) {
      swal.fire("Info", "Please enter valid User type", "info");
      return false;
    } else if (
      this.selected_phone == undefined ||
      this.selected_phone == null ||
      this.selected_phone.trim() == ""
    ) {
      swal.fire("Info", "Please enter valid Mobile number", "info");
      return false;
    } else if (!this.selected_phone.match(regex_phone)) {
      swal.fire("Info", "Not a valid Mobile number", "info");
      return false;
    } else {
      this.data_to_db = {
        usertype: this.selected_usertype.toLowerCase(),
        username: this.selected_username.toLowerCase(),
        passcode: this.selected_passcode.toUpperCase(),
        contactnumber: this.selected_phone,
        udisecode: this.selected_udisecode,
        schoolname: this.selected_schoolname,
        managerid: this.selected_managerid.toLowerCase(),
        managername: this.selected_managername.toLowerCase(),
        managertype: "",
        gender: this.selected_gender.toLowerCase(),
        qualification: this.selected_qualification.toLowerCase(),
        stateid: this.selected_stateid,
        statename: this.selected_statename.toLowerCase(),
        districtid: this.selected_districtid,
        districtname: this.selected_districtname.toLowerCase(),
        blockid: this.selected_blockid,
        blockname: this.selected_blockname.toLowerCase(),
        status: this.selected_status,
      };
      return true;
    }
  }
}
