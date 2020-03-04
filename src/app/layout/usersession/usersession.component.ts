import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UsersessionService } from  './usersession.service';

@Component({
    selector: 'app-usersession',
    templateUrl: './usersession.component.html',
    styleUrls: ['./usersession.component.scss'],
    animations: [routerTransition()]
})
export class UsersessionComponent implements OnInit {
  public minDate: Date = new Date ("01/01/2015");
  public maxDate: Date = new Date ();
	public dateValue: Date = new Date ();
  selected_date: Date = new Date ();
  
  public data: any;
  all_usersessions: any = [];
  public all_users : any;
  
  selected_userid: string = '';
  selected_username: string = '';

	// modal
	closeResult: string;
	modalReference: any;

	// loading gif
  hideLoading_indicator: boolean;
  hide_datefield: boolean = false;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    public router: Router,
    private usersessionService: UsersessionService
	) {
    this.hideLoading_indicator = true;
	}

	ngOnInit() {
    this.hideLoading_indicator = false;
    this.getAllUsers();
    this.getAllUserSessions();
  }
	
	getAllUsers() {
		this.hideLoading_indicator = false;
		this.usersessionService.getallusers().subscribe(data => {
				// console.log('### data: '+JSON.stringify(data));
				this.all_users = data;
				// this.teachers.unshift({});
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}
  onselect_usrs_select(event){
    let selectedOptions = event.target['options'];
		let selectedIndex = selectedOptions.selectedIndex;
		let selectedOptionValue = selectedOptions[selectedIndex].value;
		let selectElementText = selectedOptions[selectedIndex].text;
		this.selected_userid = selectedOptionValue;
		this.selected_username = selectElementText;
		console.log('-->Selected userid= '+this.selected_userid+'   username= '+this.selected_username);
  }

  datepicker_onchange(event){
    this.selected_date = new Date(event.value);
		console.log('###selected_date: '+this.selected_date);
  }

  checkbox_onchange(value){
    console.log('###Checkbox checked: '+value);
    this.hide_datefield = !value;
  }

  getusersessionbyuseriddate(){
    if(this.selected_userid == undefined || this.selected_userid == null || this.selected_userid == ''){
      if(this.hide_datefield)
        this.getAllUserSessions();          // all
      else
        this.getUserSessionsByDate();       // only date
    }else{
      if(this.hide_datefield)
        this.getUserSessionsByUserid();     // only user
      else
        this.getAllUserSessionsByUseridDate();  // user and date
    }
  }

  getAllUserSessions(){
    // get all usersessions
    this.usersessionService.getallusersession().subscribe(data => {
      //this.data = data;
      this.filterData(data);
      this.data = this.all_usersessions;
      this.hideLoading_indicator = true;
    },
    error => {},
    () => {}
    );
  }

  getUserSessionsByUserid(){
    // get all usersessions
    this.usersessionService.getusersessionbyuserid(this.selected_userid).subscribe(data => {
      //this.data = data;
      this.filterData(data);
      this.data = this.all_usersessions;
      this.hideLoading_indicator = true;
    },
    error => {},
    () => {}
    );
  }

  getUserSessionsByDate(){
    // get all usersessions
    this.usersessionService.getusersessionbydate(this.selected_date).subscribe(data => {
      //this.data = data;
      this.filterData(data);
      this.data = this.all_usersessions;
      this.hideLoading_indicator = true;
    },
    error => {},
    () => {}
    );
  }

  getAllUserSessionsByUseridDate(){
    // get all usersessions
    this.usersessionService.getusersessionbyuseriddate(this.selected_userid, this.selected_date).subscribe(data => {
      //this.data = data;
      this.filterData(data);
      this.data = this.all_usersessions;
      this.hideLoading_indicator = true;
    },
    error => {},
    () => {}
    );
  }

  filterData(data){
    this.all_usersessions = [];
    Object.keys(data).forEach(i => {
      //console.log('element: '+JSON.stringify(data[i]));
      let userid = data[i]['userid'];
      let username = data[i]['username'];
      let checkintime = data[i]['checkintime'];
      let checkouttime = data[i]['checkouttime'];
      let duration = this.calculateDuration(new Date(checkintime), new Date(checkouttime));
      let currentdate = data[i]['currentdate'];

      let newobj = {
        userid: userid,
        username: username,
        checkintime: checkintime,
        checkouttime: checkouttime,
        duration: duration,
        currentdate: currentdate
      }
      this.all_usersessions.push(newobj);
    });
    console.log('all user session: '+JSON.stringify(this.all_usersessions));
  }

  calculateDuration(date1,date2){ 
    if (date2 < date1) {
        date2.setDate(date2.getDate() + 1);
    }
    let diff = date2 - date1;

    let msec = diff;
    let hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    let mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    let ss = Math.floor(msec / 1000);
    msec -= ss * 1000;
    // diff = 28800000 => hh = 8, mm = 0, ss = 0, msec = 0

    let duration = hh+' Hour(s): '+mm+' Min(s): '+ss+' Sec(s)';
    //console.log('###Duration: '+duration);
    return duration;
  }
}
