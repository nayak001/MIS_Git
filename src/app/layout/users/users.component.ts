import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UsersService, ValidationService } from './users.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    animations: [routerTransition()]
})
export class UsersComponent implements OnInit {
	@ViewChild('auto') auto;
	userModalFormGroup: FormGroup;
	
	all_usertypes_list: any = [];

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

	teacherprofile_data1: any = [];
	teacherprofile_data2: any = [];
	selected_teacherprofile_data: any = [];
	selected_teacherprofile: string = '';

	// teacher profile auto-complete 
	//data_teachers: any;
	//teachers: any;
	keyword_teachername = 'teachername';
	hide_teacherprofile_dropdown: boolean = true;

    constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder,
        private translate: TranslateService,
        public router: Router,
		private usersService: UsersService
	) {
		this.userModalFormGroup = this.formBuilder.group({
			modal_id: ['', []],
			modal_userid: ['', []],
			modal_username: ['', [Validators.required]],
			modal_emailid: ['', [Validators.required, ValidationService.emailValidator]],
			modal_password: ['', [Validators.required, ValidationService.passwordValidator]],
			// modal_contactnumber: ['', [Validators.required]],
			modal_permanentaddress: ['', [Validators.required]]
		});
		this.modal_contactnumber = '';		// set default
		this.hideLoading_indicator = true;
		this.hide_teacherprofile_dropdown = true;
		this.showpassword = false;
		this.showhide_button='Show';
	}
	
	ngOnInit() {
		this.getallactiveteacherprofiles();
		this.getAllUsertypes();
		this.getallUsers();
	}

	// get all all active teacher profiles
	getallactiveteacherprofiles() {
		this.hideLoading_indicator = false;
		this.usersService.getallactiveteacherprofiles().subscribe(data => {
				this.teacherprofile_data1 = data;
				console.log('### teacherprofile_data1: '+JSON.stringify(this.teacherprofile_data1));
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
  	}

	// get all user types
	getAllUsertypes() {
		this.hideLoading_indicator = false;
		this.usersService.getallactiveusertypes().subscribe(data => {
        this.data = data;
				this.all_usertypes_list = data;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
  	}

	// get all users
	getallUsers() {
		this.hideLoading_indicator = false;
		this.usersService.getalluser().subscribe(data => {
				console.log('### data: '+JSON.stringify(data));
				this.data = data;
				this.filterData = data;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}

	search(term: string) {
		term = (term == undefined || term == null) ? '' : term;
		if(!term) {
		  this.filterData = this.data;
		} else {
		  this.filterData = this.data.filter(element => 
			element.emailid.toLowerCase().includes(term.trim().toLowerCase())
		  );
		}
	  }
	
	// teacher profile auto complete
	onchange_teacherprofile(val: string) {
		console.log('--> teachers auto-complete change event'+JSON.stringify(val));
	}
	onfocus_teacherprofile(e){
		console.log('--> teachers auto-complete focus event'+JSON.stringify(e));
		this.teacherprofile_data2 = this.teacherprofile_data1;
	}
	onselect_teacherprofile(item){
		console.log('--> teachers auto-complete select event'+JSON.stringify(item));
		this.selected_teacherprofile_data = [];
		this.selected_teacherprofile_data = item;
		this.selected_teacherprofile = (item.teachername == undefined) ? '' : item.teachername;
		console.log('--> selected_teacherprofile: '+this.selected_teacherprofile);
	}

    /*open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }*/

	// selecting user type
	onSelect_modal_usertype(event: Event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= '+selectedOptionValue + '   Text= '+selectElementText);
		this.modal_usertype = selectedOptionValue;

		if(selectedOptionValue == 'anganwadi' || selectedOptionValue == 'school' || selectedOptionValue == 'fellow') {
			this.selected_teacherprofile = '';
			this.selected_teacherprofile_data = [];
			this.hide_teacherprofile_dropdown = false;
		} else {
			this.selected_teacherprofile = '';
			this.selected_teacherprofile_data = [];
			this.hide_teacherprofile_dropdown = true;
		}
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
			teacherprofile: this.selected_teacherprofile_data,
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
				this.usersService.createnewuser(user).subscribe(data => {
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
			this.usersService.updateuser(frm_id, user).subscribe(data => {
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
		this.usersService.deleteuser(id).subscribe(data => {
				console.log('### res data: ' + JSON.stringify(data));
				this.modalReference.close();
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
	
	open(content,user) {
		//console.log('#### user: '+ JSON.stringify(user));
		// update
		if(user != undefined || user != null){
			this.usersubmitaction = 'Update';
			this.modal_id = user._id;
			this.modal_userid = user.userid;
			this.modal_username = user.username;
			this.modal_emailid = user.emailid;
			this.modal_password = user.password;
			this.modal_usertype = user.usertype;
			this.modal_gender = user.gender;
			this.modal_contactnumber = user.contactnumber;
			this.modal_permanentaddress = user.permanentaddress;
			this.selected_teacherprofile = user.teacherprofile.teachername;
			this.selected_teacherprofile_data = user.teacherprofile;
			this.hide_teacherprofile_dropdown = (user.usertype == 'manager') ? true : false;
		} 
		// create new
		else {
			this.usersubmitaction = 'Create';
			this.modal_id = '';
			this.modal_userid = '';
			this.modal_username = '';
			this.modal_emailid = '';
			this.modal_password = '';
			this.modal_usertype = 'manager';
			this.modal_gender = 'male';
			this.modal_contactnumber = '';
			this.modal_permanentaddress = '';
			this.selected_teacherprofile = '';
			this.selected_teacherprofile_data = [];
			this.hide_teacherprofile_dropdown = true;
			this.userModalFormGroup.controls['modal_emailid'].enable();
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
}
