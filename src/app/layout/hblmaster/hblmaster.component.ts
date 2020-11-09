import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { HblmasterService } from  './hblmaster.service';
import swal from 'sweetalert2';

// download as csv
import * as json2csv from 'json2csv'; // convert json file to csv
import { saveAs } from 'file-saver';  // save the file

@Component({
    selector: 'app-hblmaster',
    templateUrl: './hblmaster.component.html',
    styleUrls: ['./hblmaster.component.scss'],
    animations: [routerTransition()]
})

export class HblmasterComponent implements OnInit {
	Json2csvParser = json2csv.Parser;

	ngbModalOptions: NgbModalOptions = {
		backdrop : 'static',
		keyboard : false
  	};
	modalReference: any;
	closeResult: string;
	hideLoading_indicator: boolean;
	hideModalLoading_indicator: boolean = true;
	hideSearchStudentLoading_indicator: boolean = true;

	// current document id
	_id: string = '';

	// Student
	all_students_list: any = [];
	all_students_list_bkp: any = [];
	all_students_list_report: any = [];
	all_students_list_search: any = [];
	studentid: string = '';
	studentname: string = '';
	studentmanagerid: string = '';
	studentmanagername: string = '';
	studentvolunteerid: string = '';
	studentvolunteername: string = '';
	studentschoolid: string = '';
	studentschoolname: string = '';
	studentgender: any;
    studentclass: any;
	studentphone: string = '';

	// Manager
	all_managers_list: any = [];
	managerid: string = '';
	managername: string = '';
	managerphone: string = '';
	is_manager_have_volunteers: boolean = false;

	// Volunteer
	all_volunteers_list: any = [];
	all_volunteers_list_bkp: any = [];
	volunteermanagerid: string = '';
	volunteermanagername: string = '';
	volunteerid: string = '';
	volunteername: string = '';
	volunteerphone: string = '';

	// School
	all_schools_list: any = [];
	schoolid: string = '';
	schoolname: string = '';
	schoolblock: string = '';
	schooldistrict: string = '';
	
	// Level
	all_levels_list: any = [];
	levelid: string = '';
	leveldesc: string = '';
	levelsubject: string = '';

	// Response
	all_responses_list: any = [];
	responseid: string = '';
	responsedesc: string = '';
	responsesubject: string = '';

	// Misc
	//studentmanagername: string = '';
	//studentvolunteername: string = '';
	//studentschoolname: string = '';
	studentschoolblock: string = '';
	studentschooldistrict: string = '';
	public searchdata : any;
	studentnamesearchstring: string = '';
	
	// For infinite loading
	page: number = 0;

	validatephone: any = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    constructor(
		private modalService: NgbModal,
        public router: Router,
		private hblmasterService: HblmasterService
	) {
		this.hideLoading_indicator = true;
		this.hideModalLoading_indicator = true;
		this.hideSearchStudentLoading_indicator = true;
		this.reload_all_data();
	}

	ngOnInit() {}

	// Page Load
	reload_all_data(){
		//this.getallstudentsdata();
		this.getallstudentsdatabypage();
		this.getallmanagersdata();
		this.getallvolunteersdata();
		this.getallschoolsdata();
		this.getalllevelsdata();
		this.getallresponsesdata();
	}

	getallstudentsdata(){
		this.hideModalLoading_indicator = false;
		this.hblmasterService.gethblreportdata().subscribe(data => {
			console.log('@@@ Report Data: '+JSON.stringify(data))
			this.all_students_list_report = data['studentdetails'];
			this.hideModalLoading_indicator = true;
		}, error => {}, () => {});
	}

	public searchhblstudentsbystudentname(){
		this.hideSearchStudentLoading_indicator = false;
		this.hblmasterService.searchhblstudentsbystudentname(this.studentnamesearchstring).subscribe(data => {
			this.all_students_list_search = data;
			this.studentnamesearchstring = '';
			this.hideSearchStudentLoading_indicator = true;
		}, error => {}, () => { });
	}

	getallstudentsdatabypage(){  
		console.log('GetData PageNo: ', this.page);
		this.hblmasterService.getallhblstudentsbypage(this.page).subscribe(data => {
			if (data != undefined) {
				Object.keys(data).forEach(i => {
					this.all_students_list.push(data[i]);
				});
			}
		}, error => {}, () => {}); 
		this.all_students_list_bkp = this.all_students_list;
	}

	getallmanagersdata(){
		this.hideLoading_indicator = false;
		this.hblmasterService.getallhblmanagers().subscribe(data => {
			this.all_managers_list = data;
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
	}

	getallvolunteersdata(){
		this.hideLoading_indicator = false;
		this.hblmasterService.getallhblvolunteers().subscribe(data => {
			this.all_volunteers_list = data;
			this.all_volunteers_list_bkp = data;
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
	}

	gethblvolunteerbyvolunteerid(volunteerid){
		this.hideLoading_indicator = false;
		this.hblmasterService.gethblvolunteerbyvolunteerid(volunteerid).subscribe(data => {
			if(Object.keys(data).length > 0){
				this.studentmanagerid = data[0].managerid;
				this.studentmanagername = data[0].managername;
			}else{
				this.studentmanagerid = '';
				this.studentmanagername = '';
			}
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
	}

	gethblvolunteerbymanagerid(managerid){
		this.hideLoading_indicator = false;
		this.hblmasterService.gethblvolunteerbymanagerid(managerid).subscribe(data => {
			if(Object.keys(data).length > 0){
				this.is_manager_have_volunteers = true;
			}else{
				this.is_manager_have_volunteers = false;
			}
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
	}

	getallschoolsdata(){
		this.hideLoading_indicator = false;
		this.hblmasterService.getallhblschools().subscribe(data => {
			this.all_schools_list = data;
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
	}

	getalllevelsdata(){
		this.hideLoading_indicator = false;
		this.hblmasterService.getallhbllevels().subscribe(data => {
			this.all_levels_list = data;
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
	}

	getallresponsesdata(){
		this.hideLoading_indicator = false;
		this.hblmasterService.getallhblresponses().subscribe(data => {
			this.all_responses_list = data;
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
	}

	gethblschoolbyschoolid(schoolid){
		this.hideLoading_indicator = false;
		this.hblmasterService.gethblschoolbyschoolid(schoolid).subscribe(data => {
			if(Object.keys(data).length > 0){
				this.studentschoolblock = data[0].block;
				this.studentschooldistrict = data[0].district;
			}else{
				this.studentschoolblock = 'Not found';
				this.studentschooldistrict = 'Not found';
			}	
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
	}

	// Select On Change Events
	studentmanager_onchange(event: Event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.studentmanagerid = selectedOptionValue;
		this.studentmanagername = selectElementText;
	}

	studentvolunteer_onchange(event: Event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.studentvolunteerid = selectedOptionValue;
		this.studentvolunteername = selectElementText;
		this.gethblvolunteerbyvolunteerid(this.studentvolunteerid);
	}

	studentschool_onchange(event: Event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.studentschoolid = selectedOptionValue;
		this.studentschoolname = selectElementText;
	}

	schooldistrict_onchange(event: Event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.schooldistrict = selectedOptionValue;
	}
	
	levelsubject_onchange(event: Event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.levelsubject = selectedOptionValue;
	}

	responsesubject_onchange(event: Event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.responsesubject = selectedOptionValue;
	}

	volunteermanager_onchange(event: Event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.volunteermanagerid = selectedOptionValue;
		this.volunteermanagername = selectElementText;
	}

	// Save oprations
	student_save_btn_click(){
		if(this.studentmanagerid == undefined || this.studentmanagerid == null || this.studentmanagerid.trim() == ''){
			swal.fire('Info', 'Please select manager', 'warning')
		}else if(this.studentvolunteerid == undefined || this.studentvolunteerid == null || this.studentvolunteerid.trim() == ''){
			swal.fire('Info', 'Please select volunteer', 'warning')
		}else if(this.studentschoolid == undefined || this.studentschoolid == null || this.studentschoolid.trim() == ''){
			swal.fire('Info', 'Please select school', 'warning')
		}else if(this.studentname == undefined || this.studentname == null || this.studentname.trim() == ''){
			swal.fire('Info', 'Please check student name', 'warning')
		}else if(this.studentphone == undefined || this.studentphone == null || this.studentphone.trim() == ''){
			swal.fire('Info', 'Phone number is required', 'warning')
		}else if(!this.validatephone.test(this.studentphone)){
			swal.fire('Info', 'Please enter a valid phone number. Valid formats: 0123456789, (012)345-6789, 012-345-6789', 'warning')
		}else if(this.studentclass == undefined || this.studentclass == null || this.studentclass == ''){
			swal.fire('Info', 'Please select class', 'warning')
		}else if(this.studentgender == undefined || this.studentgender == null || this.studentgender == ''){
			swal.fire('Info', 'Please choose gender', 'warning')
		}else{
			this.studentid = ''+(new Date().getTime());
			let gender = (this.studentgender == 1) ? 'male' : 'female';
			let body = {
				managerid: this.studentmanagerid,
				managername: this.studentmanagername,
				volunteerid: this.studentvolunteerid,
				volunteername: this.studentvolunteername,
				schoolid: this.studentschoolid,
				schoolname: this.studentschoolname,
				studentid: this.studentid.toLowerCase(),
				studentname: this.studentname.toLowerCase(),
				phone: this.studentphone,
				gender: gender.toLowerCase(),
				class: this.studentclass,
				status: 'active'
			}
			this.hideModalLoading_indicator = false;
			this.hblmasterService.createnewhblstudent(body).subscribe(data => {
				this.toast('success', 'Successfully saved');

				// reset
				this.studentmanagerid = '';
				this.studentmanagername = '';
				this.studentvolunteerid = '';
				this.studentvolunteername = '';
				this.studentschoolid = '';
				this.studentschoolname = '';
				this.studentid = '';
				this.studentname = '';
				this.studentphone = '';
				this.studentgender = '';
				this.studentclass = '';

				this.reload_all_data();
				this.hideModalLoading_indicator = true;
			}, error => {}, () => {});
		}
	}

	manager_save_btn_click(){
		if(this.managername == undefined || this.managername == null || this.managername.trim() == ''){
			swal.fire('Info', 'Please check manager name', 'warning')
		}else if(this.managerphone == undefined || this.managerphone == null || this.managerphone.trim() == ''){
			swal.fire('Info', 'Phone number is required', 'warning')
		}else if(!this.validatephone.test(this.managerphone)){
			swal.fire('Info', 'Please enter a valid phone number. Valid formats: 0123456789, (012)345-6789, 012-345-6789', 'warning')
		}else{
			let name = this.managername;
			name = name.trim();
			var arr = name.split(' ');
			name = (arr.length > 0) ? arr[0] : ''; 
			var suffix = Math.floor(1000 + Math.random() * 9999);
			this.managerid = name+'@'+suffix;

			let body = {
				managerid: this.managerid.toLowerCase(),
				managername: this.managername.toLowerCase(),
				phone: this.managerphone,
				status: 'active'
			}
			this.hideModalLoading_indicator = false;
			this.hblmasterService.createnewhblmanager(body).subscribe(data => {
				this.toast('success', 'Successfully saved');

				// reset
				this.managerid = '';
				this.managername = '';
				this.managerphone = '';

				this.reload_all_data();
				this.hideModalLoading_indicator = true;
			}, error => {}, () => {});
		}
	}

	volunteer_save_btn_click(){
		if(this.volunteermanagername == undefined || this.volunteermanagername == null || this.volunteermanagername == ''){
			swal.fire('Info', 'Please select a manager', 'warning')
		}else if(this.volunteername == undefined || this.volunteername == null || this.volunteername.trim() == ''){
			swal.fire('Info', 'Please check volunteer name', 'warning')
		}else if(this.volunteerphone == undefined || this.volunteerphone == null || this.volunteerphone.trim() == ''){
			swal.fire('Info', 'Phone number is required', 'warning')
		}else if(!this.validatephone.test(this.volunteerphone)){
			swal.fire('Info', 'Please enter a valid phone number. Valid formats: 0123456789, (012)345-6789, 012-345-6789', 'warning')
		}else{
			let name = this.volunteername;
			name = name.trim();
			var arr = name.split(' ');
			name = (arr.length > 0) ? arr[0] : ''; 
			var suffix = Math.floor(1000 + Math.random() * 9999);
			this.volunteerid = name+'@'+suffix;
			let body = {
				managerid: this.volunteermanagerid,
				managername: this.volunteermanagername,
				volunteerid: this.volunteerid.toLowerCase(),
				volunteername: this.volunteername.toLowerCase(),
				phone: this.volunteerphone,
				status: 'active'
			}
			this.hideModalLoading_indicator = false;
			this.hblmasterService.createnewhblvolunteer(body).subscribe(data => {
				this.toast('success', 'Successfully saved');

				// reset
				this.volunteerid = '';
				this.volunteername = '';
				this.volunteerphone = '';

				this.reload_all_data();
				this.hideModalLoading_indicator = true;
			}, error => {}, () => {});
		}
	}

	school_save_btn_click(){
		if(this.schoolname == undefined || this.schoolname == null || this.schoolname.trim() == ''){
			swal.fire('Info', 'Please check school name', 'warning')
		}else if(this.schooldistrict == undefined || this.schooldistrict == null || this.schooldistrict.trim() == ''){
			swal.fire('Info', 'Please select district', 'warning')
		}else if(this.schoolblock == undefined || this.schoolblock == null || this.schoolblock.trim() == ''){
			swal.fire('Info', 'Please check block name', 'warning')
		}else{
			this.schoolid = ''+(new Date().getTime());
			let body = {
				schoolid: this.schoolid.toLowerCase(),
				schoolname: this.schoolname.toLowerCase(),
				block: this.schoolblock.toLowerCase(),
				district: this.schooldistrict.toLowerCase(),
				status: 'active'
			}
			this.hideModalLoading_indicator = false;
			this.hblmasterService.createnewhblschool(body).subscribe(data => {
				this.toast('success', 'Successfully saved');

				// reset
				this.schoolid = '';
				this.schoolname = '';
				this.schoolblock = '';
				this.schooldistrict = '';

				this.reload_all_data();
				this.hideModalLoading_indicator = true;
			}, error => {}, () => {});
		}
	}

	level_save_btn_click(){
		if(this.leveldesc == undefined || this.leveldesc == null || this.leveldesc.trim() == ''){
			swal.fire('Info', 'Please check level description', 'warning')
		}else if(this.levelsubject == undefined || this.levelsubject == null || this.levelsubject.trim() == ''){
			swal.fire('Info', 'Please select subject', 'warning')
		}else{
			this.levelid = ''+(new Date().getTime());
			let body = {
				levelid: this.levelid,
				leveldesc: this.leveldesc,
				subject: this.levelsubject.toLowerCase()
			}
			this.hideModalLoading_indicator = false;
			this.hblmasterService.createnewhbllevel(body).subscribe(data => {
				this.toast('success', 'Successfully saved');

				// reset
				this.levelid = '';
				this.leveldesc = '';
				this.levelsubject = '';

				this.reload_all_data();
				this.hideModalLoading_indicator = true;
			}, error => {}, () => {});
		}
	}

	response_save_btn_click(){
		if(this.responsedesc == undefined || this.responsedesc == null || this.responsedesc.trim() == ''){
			swal.fire('Info', 'Please check response description', 'warning')
		}else if(this.responsesubject == undefined || this.responsesubject == null || this.responsesubject.trim() == ''){
			swal.fire('Info', 'Please select subject', 'warning')
		}else{
			this.responseid = ''+(new Date().getTime());
			let body = {
				responseid: this.responseid,
				responsedesc: this.responsedesc,
				subject: this.responsesubject
			}
			this.hideModalLoading_indicator = false;
			this.hblmasterService.createnewhblresponse(body).subscribe(data => {
				this.toast('success', 'Successfully saved');

				// reset
				this.responseid = '';
				this.responsedesc = '';
				this.responsesubject = '';

				this.reload_all_data();
				this.hideModalLoading_indicator = true;
			}, error => { console.log(' !!! Connection Error !!!') }, () => {});
		}
	}

	// Update operations
	student_update_btn_click(){
		if(this.studentmanagerid == undefined || this.studentmanagerid == null || this.studentmanagerid.trim() == ''){
			swal.fire('Info', 'Please select manager', 'warning')
		}else if(this.studentvolunteerid == undefined || this.studentvolunteerid == null || this.studentvolunteerid.trim() == ''){
			swal.fire('Info', 'Please select volunteer', 'warning')
		}else if(this.studentschoolid == undefined || this.studentschoolid == null || this.studentschoolid.trim() == ''){
			swal.fire('Info', 'Please select school', 'warning')
		}else if(this.studentname == undefined || this.studentname == null || this.studentname.trim() == ''){
			swal.fire('Info', 'Please check student name', 'warning')
		}else if(this.studentphone == undefined || this.studentphone == null || this.studentphone.trim() == ''){
			swal.fire('Info', 'Phone number is required', 'warning')
		}else if(!this.validatephone.test(this.studentphone)){
			swal.fire('Info', 'Please enter a valid phone number. Valid formats: 0123456789, (012)345-6789, 012-345-6789', 'warning')
		}else if(this.studentclass == undefined || this.studentclass == null || this.studentclass == ''){
			swal.fire('Info', 'Please select class', 'warning')
		}else if(this.studentgender == undefined || this.studentgender == null || this.studentgender == ''){
			swal.fire('Info', 'Please choose gender', 'warning')
		}else{
			this.hideModalLoading_indicator = false;
			let gender = (this.studentgender == '1') ? 'male' : 'female';
			let body = {
				managerid: this.studentmanagerid,
				managername: this.studentmanagername,
				volunteerid: this.studentvolunteerid,
				volunteername: this.studentvolunteername,
				schoolid: this.studentschoolid,
				schoolname: this.studentschoolname,
				studentname: this.studentname.toLowerCase(),
				phone: this.studentphone,
				gender: gender.toLowerCase(),
				class: this.studentclass,
				status: 'active'
			}
			this.hblmasterService.updatehblstudent(this._id, body).subscribe(data => {
				let obj = {
					managerid: this.studentmanagerid,
					managername: this.studentmanagername,
					volunteerid: this.studentvolunteerid,
					volunteername: this.studentvolunteername,
					schoolid: this.studentschoolid,
					schoolname: this.studentschoolname,
					studentname: this.studentname.toLowerCase(),
					studentphone: this.studentphone,
					gender: gender.toLowerCase(),
					class: this.studentclass
				}
				this.hblmasterService.updatehbl_trnasactivity_transbaseline_bystudentid(this.studentid, obj).subscribe(data => {
					this.toast('success', 'Successfully updated');
	
					// reset
					this._id = '';
					this.studentmanagerid = '';
					this.studentvolunteerid = '';
					this.studentschoolid = '';
					this.studentid = '';
					this.studentname = '';
					this.studentgender = '';
					this.studentclass = '';
	
					this.reload_all_data();
					this.hideModalLoading_indicator = true;
					this.modalReference.close();
				}, error => {}, () => {});
			}, error => {}, () => {});
		}
	}

	manager_update_btn_click(){
		if(this.managername == undefined || this.managername == null || this.managername.trim() == ''){
			swal.fire('Info', 'Please check manager name', 'warning')
		}else if(this.managerphone == undefined || this.managerphone == null || this.managerphone.trim() == ''){
			swal.fire('Info', 'Phone number is required', 'warning')
		}else if(!this.validatephone.test(this.managerphone)){
			swal.fire('Info', 'Please enter a valid phone number. Valid formats: 0123456789, (012)345-6789, 012-345-6789', 'warning')
		}else{
			this.hideModalLoading_indicator = false;
			let body = {
				managername: this.managername.toLowerCase(),
				phone: this.managerphone,
				status: 'active'
			}
			this.hblmasterService.updatehblmanager(this._id, body).subscribe(data => {
				let obj = {
					managername: this.managername.toLowerCase()
				}

				this.hblmasterService.updatehblvolunteer_managername(this.managerid, obj).subscribe(data => {
					this.hblmasterService.updatehblstudent_managername(this.managerid, obj).subscribe(data => {
						this.hblmasterService.updatehbl_trnasactivity_transbaseline_bymanagerid(this.managerid, obj).subscribe(data => {
							this.toast('success', 'Successfully updated');
			
							// reset
							this._id = '';
							this.managerid = '';
							this.managername = '';
							this.managerphone = '';
			
							this.reload_all_data();
							this.hideModalLoading_indicator = true;
							this.modalReference.close();
						}, error => {}, () => {});
					}, error => {}, () => {});
				}, error => {}, () => {});
			}, error => {}, () => {});
		}
	}

	volunteer_update_btn_click(){
		if(this.volunteermanagername == undefined || this.volunteermanagername == null || this.volunteermanagername == ''){
			swal.fire('Info', 'Please select a manager', 'warning')
		}else if(this.volunteername == undefined || this.volunteername == null || this.volunteername.trim() == ''){
			swal.fire('Info', 'Please check volunteer name', 'warning')
		}else if(this.volunteerphone == undefined || this.volunteerphone == null || this.volunteerphone.trim() == ''){
			swal.fire('Info', 'Phone number is required', 'warning')
		}else if(!this.validatephone.test(this.volunteerphone)){
			swal.fire('Info', 'Please enter a valid phone number. Valid formats: 0123456789, (012)345-6789, 012-345-6789', 'warning')
		}else{
			this.hideModalLoading_indicator = false;
			let body = {
				managerid: this.volunteermanagerid,
				managername: this.volunteermanagername,
				volunteername: this.volunteername.toLowerCase(),
				phone: this.volunteerphone,
				status: 'active'
			}
			this.hblmasterService.updatehblvolunteer(this._id, body).subscribe(data => {
				let obj = {
					managerid: this.volunteermanagerid,
					managername: this.volunteermanagername,
					volunteername: this.volunteername.toLowerCase()
				}

				this.hblmasterService.updatehblstudent_volunteername(this.volunteerid, obj).subscribe(data => {
					this.hblmasterService.updatehbl_trnasactivity_transbaseline_byvolunteerid(this.volunteerid, obj).subscribe(data => {
						this.toast('success', 'Successfully updated');
		
						// reset
						this._id = '';
						this.volunteerid = '';
						this.volunteername = '';
						this.volunteerphone = '';
		
						this.reload_all_data();
						this.hideModalLoading_indicator = true;
						this.modalReference.close();
					}, error => {}, () => {});
					
				}, error => {}, () => {});
			}, error => {}, () => {});
		}
	}

	school_update_btn_click(){
		if(this.schoolname == undefined || this.schoolname == null || this.schoolname.trim() == ''){
			swal.fire('Info', 'Please check school name', 'warning')
		}else if(this.schooldistrict == undefined || this.schooldistrict == null || this.schooldistrict.trim() == ''){
			swal.fire('Info', 'Please select district', 'warning')
		}else if(this.schoolblock == undefined || this.schoolblock == null || this.schoolblock.trim() == ''){
			swal.fire('Info', 'Please check block name', 'warning')
		}else{
			this.hideModalLoading_indicator = false;
			let body = {
				schoolname: this.schoolname.toLowerCase(),
				block: this.schoolblock.toLowerCase(),
				district: this.schooldistrict.toLowerCase(),
				status: 'active'
			}
			this.hblmasterService.updatehblschool(this._id, body).subscribe(data => {
				let obj = {
					schoolname: this.schoolname.toLowerCase()
				}

				this.hblmasterService.updatehblstudent_schoolname(this.schoolid, obj).subscribe(data => {
					this.toast('success', 'Successfully updated');
	
					// reset
					this._id = '';
					this.schoolid = '';
					this.schoolname = '';
					this.schoolblock = '';
					this.schooldistrict = '';
	
					this.reload_all_data();
					this.hideModalLoading_indicator = true;
					this.modalReference.close();
				}, error => {}, () => {});
			}, error => {}, () => {});
		}
	}

	level_update_btn_click(){
		if(this.leveldesc == undefined || this.leveldesc == null || this.leveldesc.trim() == ''){
			swal.fire('Info', 'Please check level description', 'warning')
		}else if(this.levelsubject == undefined || this.levelsubject == null || this.levelsubject.trim() == ''){
			swal.fire('Info', 'Please select subject', 'warning')
		}else{
			this.hideModalLoading_indicator = false;
			let body = {
				leveldesc: this.leveldesc,
				subject: this.levelsubject.toLowerCase()
			}
			this.hblmasterService.updatehbllevel(this._id, body).subscribe(data => {
				this.toast('success', 'Successfully updated');

				// reset
				this._id = '';
				this.levelid = '';
				this.leveldesc = '';
				this.levelsubject = '';

				this.reload_all_data();
				this.hideModalLoading_indicator = true;
				this.modalReference.close();
			}, error => {}, () => {});
		}
	}

	response_update_btn_click(){
		if(this.responsedesc == undefined || this.responsedesc == null || this.responsedesc.trim() == ''){
			swal.fire('Info', 'Please check response description', 'warning')
		}else if(this.responsesubject == undefined || this.responsesubject == null || this.responsesubject.trim() == ''){
			swal.fire('Info', 'Please select subject', 'warning')
		}else{
			this.hideModalLoading_indicator = false;
			let body = {
				responsedesc: this.responsedesc,
				subject: this.responsesubject
			}
			this.hblmasterService.updatehblresponse(this._id, body).subscribe(data => {
				this.toast('success', 'Successfully updated');

				// reset
				this._id = '';
				this.responseid = '';
				this.responsedesc = '';
				this.responsesubject = '';

				this.reload_all_data();
				this.hideModalLoading_indicator = true;
				this.modalReference.close();
			}, error => {}, () => {});
		}
	}

	// Delete operations
	student_delete_btn_click(studentdata){
		this._id = studentdata._id;
		swal.fire({
			title: 'Are you sure?',
			text: "Do you want to delete this student details?",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes'
		}).then((result) => {
			if (result.value) {
				this.deletestudent(this._id);
			}
		});
	}

	deletestudent(id){
		this.hideLoading_indicator = false;
		this.hblmasterService.deletehblstudent(id).subscribe(data => {
			this.toast('success', 'Successfully deleted');

			this._id = '';
			this.reload_all_data();
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
	}
	
	manager_delete_btn_click(managerdata){
		this.gethblvolunteerbymanagerid(managerdata.managerid);

		this._id = managerdata._id;
		swal.fire({
			title: 'Are you sure?',
			text: "Do you want to delete this manager details?",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes'
		}).then((result) => {
			if (result.value) {
				this.deletemanager(this._id);
			}
		});
	}

	deletemanager(id){
		if(this.is_manager_have_volunteers == true){
			swal.fire('Info', 'Can not delete this manager because it is linked with some of the volunteers. Please re-assign the volunteers to another manager.', 'info');
		}else{
			this.hideLoading_indicator = false;
			this.hblmasterService.deletehblmanager(id).subscribe(data => {
				this.toast('success', 'Successfully deleted');
	
				this._id = '';
				this.reload_all_data();
				this.hideLoading_indicator = true;
			}, error => {}, () => {});
		}
	}
	
	volunteer_delete_btn_click(volunteerdata){
		this._id = volunteerdata._id;
		let volunteerid = volunteerdata.volunteerid;
		swal.fire({
			title: 'Are you sure?',
			text: "By deleting this volunteer, all the student informations also be removed permanently. Do you want to delete this volunteer details??",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes'
		}).then((result) => {
			if (result.value) {
				this.deletevolunteer(this._id, volunteerid);
			}
		});
	}

	deletevolunteer(id, volunteerid){
		this.hideLoading_indicator = false;
		this.hblmasterService.deletehblvolunteer(id).subscribe(data => {
			this.hblmasterService.deletehblstudentsbyvolunteerid(volunteerid).subscribe(data => {
				this.toast('success', 'Successfully deleted');
	
				this._id = '';
				this.reload_all_data();
				this.hideLoading_indicator = true;
			}, error => {}, () => {});
		}, error => {}, () => {});
	}
	
	school_delete_btn_click(schooldata){
		this._id = schooldata._id;
		let school_id = schooldata.schoolid;
		swal.fire({
			title: 'Are you sure?',
			text: "By deleting this school, all the student informations also be removed permanently. Do you want to delete this school details?",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes'
		}).then((result) => {
			if (result.value) {
				this.deleteschool(this._id, school_id);
			}
		});
	}

	deleteschool(id, schoolid){
		this.hideLoading_indicator = false;
		this.hblmasterService.deletehblschool(id).subscribe(data => {
			this.hblmasterService.deletehblstudentsbyschoolid(schoolid).subscribe(data => {
				this.toast('success', 'Successfully deleted');
	
				this._id = '';
				this.reload_all_data();
				this.hideLoading_indicator = true;
			}, error => {}, () => {});
		}, error => {}, () => {});
	}
	
	level_delete_btn_click(leveldata){
		this._id = leveldata._id;
		swal.fire({
			title: 'Are you sure?',
			text: "Do you want to delete this level details?",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes'
		}).then((result) => {
			if (result.value) {
				this.deletelevel(this._id);
			}
		});
	}

	deletelevel(id){
		this.hideLoading_indicator = false;
		this.hblmasterService.deletehbllevel(id).subscribe(data => {
			this.toast('success', 'Successfully deleted');

			this._id = '';
			this.reload_all_data();
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
	}
	
	response_delete_btn_click(responsedata){
		this._id = responsedata._id;
		swal.fire({
			title: 'Are you sure?',
			text: "Do you want to delete this response details?",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes'
		}).then((result) => {
			if (result.value) {
				this.deleteresponse(this._id);
			}
		});
	}

	deleteresponse(id){
		this.hideLoading_indicator = false;
		this.hblmasterService.deletehblresponse(id).subscribe(data => {
			this.toast('success', 'Successfully deleted');

			this._id = '';
			this.reload_all_data();
			this.hideLoading_indicator = true;
		}, error => { console.log(' !!! Connection Error !!!') }, () => {});
	}

	// Open modal box
	open(content,param) {
		if(param != null || param != undefined){}
		
		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_createstudentmodal(content) {
		this._id = '';
		this.studentmanagerid = '';
		this.studentmanagername = '';
		this.studentvolunteerid = '';
		this.studentvolunteername = '';
		this.studentschoolid = '';
		this.studentschoolname = '';
		this.studentid = '';
		this.studentname = '';
		this.studentphone = '';
		this.studentgender = '';
		this.studentclass = '';

		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_viewstudentmodal(content, studentdata){
		this.studentmanagername = '';
		this.studentvolunteername = '';
		this.studentschoolname = '';

		this._id = studentdata._id;
		this.studentmanagerid = studentdata.managerid;
		this.studentmanagername = studentdata.managername;
		this.studentvolunteerid = studentdata.volunteerid;
		this.studentvolunteername = studentdata.volunteername;
		this.studentschoolid = studentdata.schoolid;
		this.gethblschoolbyschoolid(this.studentschoolid);
		this.studentschoolname = studentdata.schoolname;
		this.studentid = studentdata.studentid;
		this.studentname = studentdata.studentname;
		this.studentphone = studentdata.phone;
		this.studentgender = studentdata.gender;
		this.studentclass = parseInt(studentdata.class);

		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_updatestudentmodal(content, studentdata){
		this._id = studentdata._id;
		this.studentmanagerid = studentdata.managerid;
		this.studentmanagername = studentdata.managername;
		this.studentvolunteerid = studentdata.volunteerid;
		this.studentvolunteername = studentdata.volunteername;
		this.studentschoolid = studentdata.schoolid;
		this.studentschoolname = studentdata.schoolname;
		this.studentid = studentdata.studentid;
		this.studentname = studentdata.studentname;
		this.studentphone = studentdata.phone;
		this.studentgender = (studentdata.gender == 'male') ? 1 : 2;
		this.studentclass = parseInt(studentdata.class);

		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_createmanagermodal(content) {
		this._id = '';
		this.managerid = '';
		this.managername = '';
		this.managerphone = '';

		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_updatemanagermodal(content, managerdata){
		this._id = managerdata._id;
		this.managerid = managerdata.managerid;
		this.managername = managerdata.managername;
		this.managerphone = managerdata.phone;

		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_createvolunteermodal(content) {
		this._id = '';
		this.volunteermanagerid = '';
		this.volunteermanagername = '';
		this.volunteerid = '';
		this.volunteername = '';
		this.volunteerphone = '';

		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_updatevolunteermodal(content, volunteerdata){
		this._id = volunteerdata._id;
		this.volunteermanagerid = volunteerdata.managerid;
		this.volunteermanagername = volunteerdata.managername;
		this.volunteerid = volunteerdata.volunteerid;
		this.volunteername = volunteerdata.volunteername;
		this.volunteerphone = volunteerdata.phone;

		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_createschoolmodal(content) {
		this._id = '';
		this.schoolid = '';
		this.schoolname = '';
		this.schoolblock = '';
		this.schooldistrict = '';

		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_updateschoolmodal(content, schooldata) {
		this._id = schooldata._id;
		this.schoolid = schooldata.schoolid;
		this.schoolname = schooldata.schoolname;
		this.schoolblock = schooldata.block;
		this.schooldistrict = schooldata.district;

		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_createlevelmodal(content) {
		this._id = '';
		this.levelid = '';
		this.leveldesc = '';
		this.levelsubject = '';

		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_updatelevelmodal(content, leveldata) {
		this._id = leveldata._id;
		this.levelid = leveldata.levelid;
		this.leveldesc = leveldata.leveldesc;
		this.levelsubject = leveldata.subject;

		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_createresponsemodal(content) {
		this._id = '';
		this.responseid = '';
		this.responsedesc = '';
		this.responsesubject = '';

		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_updateresponsemodal(content, responsedata) {
		this._id = responsedata._id;
		this.responseid = responsedata.responseid;
		this.responsedesc = responsedata.responsedesc;
		this.responsesubject = responsedata.subject;

		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_downloadfilemodal(content) {
		this.getallstudentsdata();

		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_searchstudentmodal(content) {
		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
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
	
	

	searchstudent(term: string) {
		term = (term == undefined || term == null) ? '' : term;
		if(!term) {
			this.all_students_list = this.all_students_list_bkp;
		} else {
			this.all_students_list = this.all_students_list_bkp.filter(element => 
			element.studentname.toLowerCase().includes(term.trim().toLowerCase())
		  );
		}
	}
	
	searchstudentbystudentname() {
		if(this.studentnamesearchstring == undefined || this.studentnamesearchstring == null || this.studentnamesearchstring.trim() == ''){
		}else{
			this.searchhblstudentsbystudentname();
		}
	}

	searchvolunteer(term: string) {
		term = (term == undefined || term == null) ? '' : term;
		if(!term) {
			this.all_volunteers_list = this.all_volunteers_list_bkp;
		} else {
			this.all_volunteers_list = this.all_volunteers_list_bkp.filter(element => 
			element.volunteername.toLowerCase().includes(term.trim().toLowerCase())
		  );
		}
	}

	downloadfile(){
		let data = this.all_students_list_report;
        let csvData = this.convertToCSV(data);
        let file = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
		saveAs(file,"HBL_Data.csv");
		this.modalReference.close();
	}

    public convertToCSV(objArray: any, fields?) {
        let json2csvParser = new this.Json2csvParser({ opts: fields });
        let csv = json2csvParser.parse(objArray);
        //console.log(csv);
        return csv;
    }

	//-------------- Infinite Loading --------------
	onScroll(){  
		console.log("Scrolled");  
		this.page = this.page + 1;  
		this.getallstudentsdatabypage();
	}
	//----------------------------------------------

	toast(type, message){
		const Toast = swal.mixin({
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000
		})
			
		Toast.fire({
			type: type,
			title: message
		})
	}
}
