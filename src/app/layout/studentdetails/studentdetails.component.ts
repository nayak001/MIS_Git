import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StudentdetailsService, ValidationService } from './studentdetails.service';

@Component({
    selector: 'app-studentdetails',
    templateUrl: './studentdetails.component.html',
    styleUrls: ['./studentdetails.component.scss'],
    animations: [routerTransition()]
})
export class StudentdetailsComponent implements OnInit {
	public teachers : any;
	public paymentinfolist : any;
	userid: string;
	selected_userid: string;
	selected_username: string;
	


	userModalFormGroup: FormGroup;
	
	usersubmitaction: string;
	public data : any;
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
		private studentdetailsService: StudentdetailsService
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
	}
	
	ngOnInit() {
		this.hideLoading_indicator = false;
		this.studentdetailsService.getallteachers().subscribe(data => {
				// console.log('### data: '+JSON.stringify(data));
				this.teachers = data;
				this.teachers.unshift({});
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
		console.log('-->Selected userid= '+this.selected_userid+'   username= '+this.selected_username);
	}

	getstudentdetailsbyuserid(){
		this.hideLoading_indicator = false;	
		this.studentdetailsService.getallstudentsbyteacher(this.selected_userid).subscribe(data => {
				console.log('@@@data: '+JSON.stringify(data));
				this.data = data;	
				this.hideLoading_indicator = true;					
			}, 
			error => {}, 
			() => {}
		);
	}

	getpaymentinfo(studentid){
		console.log('@@@studentid: '+JSON.stringify(studentid));
		this.hideLoading_indicator = false;	
		this.studentdetailsService.getalltchpaymentdetailsbystudentid(studentid).subscribe(data => {
				console.log('@@@paymentinfo data: '+JSON.stringify(data));
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
		//console.log('#### content: '+ JSON.stringify(content));
		// update
		if(student != undefined || student != null){
			console.log('#### info modal');
			this.paymentinfolist = [];
			const studentid = student.studentid;
			this.getpaymentinfo(studentid);
		} 
		// create new
		else {
			console.log('#### delete modal');
		}
		console.log('#### this.disable_emailid: '+ this.disable_emailid);
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
		console.log('-->Selected Opt Value= '+selectedOptionValue + '   Text= '+selectElementText);
		this.modal_usertype = selectedOptionValue;
	}

	// selecting gender
	onSelect_modal_gender(event: Event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= ' +selectedOptionValue+'   Text= '+selectElementText);
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
		console.log('###111'+usersubmitaction+' frm_id: '+frm_id+' user: ' + JSON.stringify(user));
		if(usersubmitaction === 'Create' && frm_id === '') {
			console.log('### inside if');

			// check the emailid is already exist or not
			this.isMailIdExists(frm_emailid);
			if(this.emailid_exists){
				alert('Email id already taken !!!');
			}else{
				user['userid'] = frm_emailid;
				this.studentdetailsService.createnewuser(user).subscribe(data => {
						console.log('### res data: ' + JSON.stringify(data));
						this.modalReference.close();
						location.reload();
					},
					error => {console.log('###2 error: ' + JSON.stringify(error)); },
					() => {}
				);
			}
			
			// alert('Data saved successfully !!!');
		} else if (usersubmitaction === 'Update' && frm_id !== '') {
			console.log('### inside elseif');
			this.studentdetailsService.updateuser(frm_id, user).subscribe(data => {
					console.log('### res data: ' + JSON.stringify(data));
					this.modalReference.close();
					location.reload();
				},
				error => {},
				() => {}
			);
			// alert('Data updated successfully !!!');
		} else {
			console.log('### inside else');
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
		console.log('### id: ' + id);
		this.studentdetailsService.deletestudentbyid(id).subscribe(data => {
				console.log('### res data: ' + JSON.stringify(data));
				
				this.modalReference.close();
				alert('Delete user '+data);
				location.reload();
			},
			error => {console.log('###2 error: ' + JSON.stringify(error)); },
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
