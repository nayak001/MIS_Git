import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AttendanceService, ValidationService } from './attendance.service';

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    styleUrls: ['./attendance.component.scss'],
    animations: [routerTransition()]
})
export class AttendanceComponent implements OnInit {
	public minDate: Date = new Date ("01/01/2015");
    public maxDate: Date = new Date ();
	public dateValue: Date = new Date ();
	selected_date: Date = new Date ();
	userid: string;
	selected_userid: string;
	selected_username: string;
	public teachers : any;
	public data : any;
	public monthly_attendance_list: any;

	end_date_str: string = '';
	start_date_str: string = '';
	modalReference: any;
	closeResult: string;
	hideLoading_indicator: boolean;
	
    constructor(
		private modalService: NgbModal,
        public router: Router,
		private attendanceService: AttendanceService
	) {
		this.hideLoading_indicator = true;
	}
	
	ngOnInit() {
		this.hideLoading_indicator = false;
		this.attendanceService.getallteachers().subscribe(data => {
				// console.log('### data: '+JSON.stringify(data));
				this.teachers = data;
				// this.teachers.unshift({});
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}

	datepicker_onchange(event){
		this.selected_date = new Date(event.value);
		console.log('###selected_date: '+this.selected_date);
		this.set_end_date(this.selected_date);
	}

	onselect_teachers_select(event){
		let selectedOptions = event.target['options'];
		let selectedIndex = selectedOptions.selectedIndex;
		let selectedOptionValue = selectedOptions[selectedIndex].value;
		let selectElementText = selectedOptions[selectedIndex].text;
		this.selected_userid = selectedOptionValue;
		this.selected_username = selectElementText;
		console.log('-->Selected userid= '+this.selected_userid+'   username= '+this.selected_username);
	}

	
	getattendancebyuserid(){
		console.log('###userid: '+this.selected_userid+'    date : '+this.end_date_str);
		if(this.selected_date == undefined || this.selected_date == null){
			alert('Please select a valid date !!!');
		}else if(this.selected_userid == undefined || this.selected_userid == null || this.selected_userid == ''){
			alert('Please select a valid Teacher !!!');
		}else{
			this.hideLoading_indicator = false;	
			this.attendanceService.getattendanceofteacherbydate(this.selected_userid, this.end_date_str).subscribe(data => {
					console.log('@@@data: '+JSON.stringify(data));
					this.data = data;	
					this.hideLoading_indicator = true;					
				}, 
				error => {}, 
				() => {}
			);
		}
	}
	
	getattendanceofstudent_formonth(student){
		let studentid = student.studentid;
		let to_date = student.attendancedate;
		this.set_start_date(to_date);
		console.log('###studentid: '+studentid+'    from-date : '+this.start_date_str+'    to-date : '+this.end_date_str);
		this.hideLoading_indicator = false;	
		this.attendanceService.getattendanceofstudentbetweendate(studentid, this.start_date_str, this.end_date_str).subscribe(data => {
				console.log('@@@Monthly attendance data: '+JSON.stringify(data));
				this.monthly_attendance_list = data;	
				this.hideLoading_indicator = true;					
			}, 
			error => {}, 
			() => {}
		);
		
	}

	set_start_date(inputDate){
		let inpdt:Date = new Date(inputDate);
		let yr = inpdt.getFullYear();
		let month =inpdt.getMonth()+1;
		let mn = (month<10)? '0'+month : month;
		let dt = '01';
		this.start_date_str = yr+'-'+mn+'-'+dt+'T00:00:00.000Z';
		console.log('###start_date_str: '+this.start_date_str);
	}

	set_end_date(inputDate){
		let inpdt:Date = new Date(inputDate);
		let yr = inpdt.getFullYear();
		let month =inpdt.getMonth()+1;
		let dat = inpdt.getDate();
		let mn = (month<10)? '0'+month : month;
		let dt = (dat<10)? '0'+dat : dat;
		this.end_date_str = yr+'-'+mn+'-'+dt+'T23:59:59.999Z';
		console.log('###end_date_str: '+this.end_date_str);
	}	
	
	open(content,student) {
		//console.log('#### content: '+ JSON.stringify(content));
		// update
		if(student != undefined || student != null){
			//console.log('#### info modal'+JSON.stringify(student));
			this.monthly_attendance_list = [];
			this.getattendanceofstudent_formonth(student);
		} 
		// create new
		else {
			console.log('#### delete modal');
		}
		this.modalReference = this.modalService.open(content, {backdrop  : 'static',keyboard  : false});
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }
}
