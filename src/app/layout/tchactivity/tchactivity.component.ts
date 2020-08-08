import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TchactivityService, ValidationService } from './tchactivity.service';

@Component({
    selector: 'app-tchactivity',
    templateUrl: './tchactivity.component.html',
    styleUrls: ['./tchactivity.component.scss'],
    animations: [routerTransition()]
})
export class TchactivityComponent implements OnInit {
	public teachers : any;
	public paymentinfolist : any;
	userid: string;
	selected_userid: string;
	selected_username: string;
	selected_program: string = '';
	selected_subject: string = '';
	selected_month: string = '';
	selected_week: string = '';

	public data : any;
	public activity_details: any = [];
	hide_subject_dropdown: boolean = false;
	


	userModalFormGroup: FormGroup;
	
	usersubmitaction: string;
	public filterData : any;
	closeResult: string;
	model: any;
	hideLoading_indicator: boolean;
	showpassword: boolean;
	showhide_button: string;
	
	modalReference: any;
	modal_id: string;
	modal_userid: string;
	modal_username: string;
	modal_emailid: string;
	modal_password: string;
	modal_usertype: string;
	modal_gender: string;
	modal_contactnumber: string;
	modal_permanentaddress: string;

	emailid_exists: boolean = false;
	disable_emailid: boolean = false;

    constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder,
        private translate: TranslateService,
        public router: Router,
		private tchactivityService: TchactivityService
	) {
		this.userModalFormGroup = this.formBuilder.group({
			modal_id: ['', []],
			modal_userid: ['', []],
			modal_username: ['', [Validators.required]],
			modal_emailid: ['', [Validators.required, ValidationService.emailValidator]],
			modal_password: ['', [Validators.required, ValidationService.passwordValidator]],
			modal_contactnumber: ['', [Validators.required]],
			modal_permanentaddress: ['', [Validators.required]]
		});
		this.hideLoading_indicator = true;
		this.showpassword = false;
		this.showhide_button='Show';

		this.hide_subject_dropdown = false;
	}
	
	ngOnInit() {
		this.hideLoading_indicator = false;
		this.tchactivityService.getallteachers().subscribe(data => {
				this.teachers = data;
				//this.teachers.unshift({});
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}

	onselect_teachers_select(event){
		let selectedOptions = event.target['options'];
		let selectedIndex = selectedOptions.selectedIndex;
		let selectedOptionValue = selectedOptions[selectedIndex].value;
		let selectElementText = selectedOptions[selectedIndex].text;
		this.selected_userid = selectedOptionValue;
		this.selected_username = selectElementText;
		this.gettchactivitybyuserid();
	}
	onselect_program(event: Event){
    	let selectedOptions = event.target['options'];
		let selectedIndex = selectedOptions.selectedIndex;
		let selectedOptionValue = selectedOptions[selectedIndex].value;
		let selectElementText = selectedOptions[selectedIndex].text;
		this.selected_program = selectedOptionValue;

		if(this.selected_program == 'pge'){
			this.selected_subject = 'math';
			this.hide_subject_dropdown = false;
		}else{
			this.selected_subject = 'na';
			this.hide_subject_dropdown = true;
		}
		this.gettchactivitybyuserid();
    }

    onselect_subject(event: Event){
    	let selectedOptions = event.target['options'];
		let selectedIndex = selectedOptions.selectedIndex;
		let selectedOptionValue = selectedOptions[selectedIndex].value;
		let selectElementText = selectedOptions[selectedIndex].text;
		this.selected_subject = selectedOptionValue;
		this.gettchactivitybyuserid();
    }

    onselect_month(event: Event){
    	let selectedOptions = event.target['options'];
		let selectedIndex = selectedOptions.selectedIndex;
		let selectedOptionValue = selectedOptions[selectedIndex].value;
		let selectElementText = selectedOptions[selectedIndex].text;
		this.selected_month = selectedOptionValue;
		this.gettchactivitybyuserid();
    }

    onselect_week(event: Event){
    	let selectedOptions = event.target['options'];
		let selectedIndex = selectedOptions.selectedIndex;
		let selectedOptionValue = selectedOptions[selectedIndex].value;
		let selectElementText = selectedOptions[selectedIndex].text;
		this.selected_week = selectedOptionValue;
		this.gettchactivitybyuserid();
	}

	gettchactivitybyuserid(){
		if(this.selected_userid == undefined || this.selected_userid == null || this.selected_userid == ''){
			//alert('Please select an User');
		}else if(this.selected_program == undefined || this.selected_program == null || this.selected_program == ''){
			//alert('Please select a Program');
		}else if(this.selected_subject == undefined || this.selected_subject == null || this.selected_subject == ''){
			//alert('Please select a Subject');
		}else if(this.selected_month == undefined || this.selected_month == null || this.selected_month == ''){
			//alert('Please select an Month');
		}else if(this.selected_week == undefined || this.selected_week == null || this.selected_week == ''){
			//alert('Please select an Week');
		}else{
			this.data = [];
			this.activity_details = [];

			this.hideLoading_indicator = false;	
			this.tchactivityService.gettchactivitybyuser(this.selected_userid, this.selected_program, this.selected_subject, this.selected_month, this.selected_week).subscribe(data => {
					this.data = data;	
					this.hideLoading_indicator = true;					
				}, 
				error => {}, 
				() => {}
			);
		}
	}

	gettchactivitydetailsbyuserid(activity){
		if(activity == undefined || activity == null || activity == ''){
			alert('Error loading activity.');
		}else{
			this.activity_details = [];
			this.hideLoading_indicator = false;	
			this.tchactivityService.gettchactivitiydetails(this.selected_userid, this.selected_program, this.selected_subject, this.selected_month, this.selected_week, activity).subscribe(data => {
					this.activity_details = data;	
					this.hideLoading_indicator = true;					
				}, 
				error => {}, 
				() => {}
			);
		}
	}

	getpaymentinfo(studentid){
		this.hideLoading_indicator = false;	
		this.tchactivityService.getalltchpaymentdetailsbystudentid(studentid).subscribe(data => {
				this.paymentinfolist = data;	
				this.hideLoading_indicator = true;					
			}, 
			error => {}, 
			() => {}
		);
	}

    /*open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }*/

	open(content,student) {
		// update
		if(student != undefined || student != null){
			this.paymentinfolist = [];
			const studentid = student.studentid;
			this.getpaymentinfo(studentid);
		} 
		// create new
		else {
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

	// selecting user type
	onSelect_modal_usertype(event: Event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.modal_usertype = selectedOptionValue;
	}

	// selecting gender
	onSelect_modal_gender(event: Event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.modal_gender = selectedOptionValue;
	}

	// save user
	formSubmitAction(usersubmitaction) {
		const frm_id = this.modal_id;
		const frm_userid = this.modal_userid;
		const frm_username = this.modal_username;
		const frm_usertype = this.modal_usertype;
		const frm_emailid = this.modal_emailid;
		const frm_password = this.modal_password;
		const frm_status = 'active';
		const frm_gender = this.modal_gender;
		const frm_dob = '1990-12-30T18:30:00.000+0000';
		const frm_contactnumber = this.modal_contactnumber;
		const frm_permanentaddress = this.modal_permanentaddress;


		const user = {
			// userid: frm_userid,
			username: frm_username,
			usertype: frm_usertype,
			emailid: frm_emailid,
			password: frm_password,
			status: frm_status,
			gender: frm_gender,
			dob: frm_dob,
			contactnumber: frm_contactnumber,
			permanentaddress: frm_permanentaddress
		};
		if(usersubmitaction === 'Create' && frm_id === '') {

			// check the emailid is already exist or not
			this.isMailIdExists(frm_emailid);
			if(this.emailid_exists){
				alert('Email id already taken !!!');
			}else{
				user['userid'] = frm_emailid;
				this.tchactivityService.createnewuser(user).subscribe(data => {
						this.modalReference.close();
						location.reload();
					},
					error => { },
					() => {}
				);
			}
			
			// alert('Data saved successfully !!!');
		} else if (usersubmitaction === 'Update' && frm_id !== '') {
			this.tchactivityService.updateuser(frm_id, user).subscribe(data => {
					this.modalReference.close();
					location.reload();
				},
				error => {},
				() => {}
			);
			// alert('Data updated successfully !!!');
		} else {
			alert('Data can not be saved !!!');
		}
	}

	// check mail id is existing or not
	isMailIdExists(frm_emailid){
		this.data.forEach(element => {
			if(element.emailid == frm_emailid){
				this.emailid_exists = true;
				return;
			}
		});
	}

	// delete user
	deleteFormSubmitAction(id) {
		this.tchactivityService.deletestudentbyid(id).subscribe(data => {
				
				this.modalReference.close();
				alert('Delete user '+data);
				location.reload();
			},
			error => {},
			() => {}
		);
	}

	// show/ hide password
	showpass() {
		if (this.showpassword) {
			this.showpassword = false;
			this.showhide_button = 'Show';
		} else {
			this.showpassword = true;
			this.showhide_button = 'Hide ';
		}
	}
}
