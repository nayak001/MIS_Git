import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { HblmasterService } from  './hblmaster.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-hblmaster',
    templateUrl: './hblmaster.component.html',
    styleUrls: ['./hblmaster.component.scss'],
    animations: [routerTransition()]
})
export class HblmasterComponent implements OnInit {
	ngbModalOptions: NgbModalOptions = {
		backdrop : 'static',
		keyboard : false
  	};
	modalReference: any;
	closeResult: string;
	hideLoading_indicator: boolean;

	// current document id
	_id: string = '';

	// Student
	all_students_list: any = [];
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

	// Volunteer
	all_volunteers_list: any = [];
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

	// Misc
	//studentmanagername: string = '';
	//studentvolunteername: string = '';
	//studentschoolname: string = '';
	studentschoolblock: string = '';
	studentschooldistrict: string = '';

    constructor(
		private modalService: NgbModal,
        public router: Router,
		private hblmasterService: HblmasterService
	) {
		this.hideLoading_indicator = true;
		this.reload_all_data();
	}

	ngOnInit() {}

	// Page Load
	reload_all_data(){
		this.getallstudentsdata();
		this.getallmanagersdata();
		this.getallvolunteersdata();
		this.getallschoolsdata();
		this.getalllevelsdata();
		this.getallresponsesdata();
	}

	getallstudentsdata(){
		this.hideLoading_indicator = false;
		this.hblmasterService.getallhblstudents().subscribe(data => {
				console.log('@@--> get students response data: '+JSON.stringify(data));
				this.all_students_list = data;
				this.hideLoading_indicator = true;
			}, error => {}, () => {}
		);
	}

	getallmanagersdata(){
		this.hideLoading_indicator = false;
		this.hblmasterService.getallhblmanagers().subscribe(data => {
				console.log('@@--> get managers response data: '+JSON.stringify(data));
				this.all_managers_list = data;
				this.hideLoading_indicator = true;
			}, error => {}, () => {}
		);
	}

	getallvolunteersdata(){
		this.hideLoading_indicator = false;
		this.hblmasterService.getallhblvolunteers().subscribe(data => {
				console.log('@@--> get volunteers response data: '+JSON.stringify(data));
				this.all_volunteers_list = data;
				this.hideLoading_indicator = true;
			}, error => {}, () => {}
		);
	}

	getallschoolsdata(){
		this.hideLoading_indicator = false;
		this.hblmasterService.getallhblschools().subscribe(data => {
				console.log('@@--> get schools response data: '+JSON.stringify(data));
				this.all_schools_list = data;
				this.hideLoading_indicator = true;
			}, error => {}, () => {}
		);
	}

	getalllevelsdata(){
		this.hideLoading_indicator = false;
		this.hblmasterService.getallhbllevels().subscribe(data => {
				console.log('@@--> get levels response data: '+JSON.stringify(data));
				this.all_levels_list = data;
				this.hideLoading_indicator = true;
			}, error => {}, () => {}
		);
	}

	getallresponsesdata(){
		this.hideLoading_indicator = false;
		this.hblmasterService.getallhblresponses().subscribe(data => {
				console.log('@@--> get responses response data: '+JSON.stringify(data));
				this.all_responses_list = data;
				this.hideLoading_indicator = true;
			}, error => {}, () => {}
		);
	}

	// Comment from here
	getmanagername(managerid){
		this.hideLoading_indicator = false;
		this.hblmasterService.gethblmanagerbyid(managerid).subscribe(data => {
				this.studentmanagername = (Object.keys(data).length > 0) ? data[0].managername : 'Not found';
				this.hideLoading_indicator = true;
			}, error => {}, () => {}
		);
	}

	getvolunteername(volunteerid){
		this.hideLoading_indicator = false;
		this.hblmasterService.gethblvolunteerbyid(volunteerid).subscribe(data => {
				this.studentvolunteername = (Object.keys(data).length > 0) ? data[0].volunteername : 'Not found';
				this.hideLoading_indicator = true;
			}, error => {}, () => {}
		);
	}

	getschoolname(schoolid){
		this.hideLoading_indicator = false;
		this.hblmasterService.gethblschoolbyid(schoolid).subscribe(data => {
				if(Object.keys(data).length > 0){
					this.studentschoolname = data[0].schoolname;
					this.studentschoolblock = data[0].block;
					this.studentschooldistrict = data[0].district;
				}else{
					this.studentschoolname = 'Not found';
					this.studentschoolblock = 'Not found';
					this.studentschooldistrict = 'Not found';
				}	
				this.hideLoading_indicator = true;
			}, error => {}, () => {}
		);
	}
	// comment to here

	// Select On Change Events
	studentmanager_onchange(event: Event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.studentmanagerid = selectedOptionValue;
		this.studentmanagername = selectElementText;
		console.log('@@--> studentmanagerid: '+this.studentmanagerid+'    studentmanagername: '+this.studentmanagername);
	}

	studentvolunteer_onchange(event: Event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.studentvolunteerid = selectedOptionValue;
		this.studentvolunteername = selectElementText;
		console.log('@@--> studentvolunteerid: '+this.studentvolunteerid+'    studentvolunteername: '+this.studentvolunteername);
	}

	studentschool_onchange(event: Event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.studentschoolid = selectedOptionValue;
		this.studentschoolname = selectElementText;
		console.log('@@--> studentschoolid: '+this.studentschoolid+'    studentschoolname: '+this.studentschoolname);
	}

	schooldistrict_onchange(event: Event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.schooldistrict = selectedOptionValue;
		console.log('@@--> selected schooldistrict: '+this.schooldistrict);
	}
	
	levelsubject_onchange(event: Event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.levelsubject = selectedOptionValue;
		console.log('@@--> selected levelsubject: '+this.levelsubject);
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
			swal.fire('Info', 'Please enter a valid phone number', 'warning')
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
				studentid: this.studentid,
				studentname: this.studentname,
				phone: this.studentphone,
				gender: gender,
				class: this.studentclass,
				status: 'active'
			}
			this.hideLoading_indicator = false;
			this.hblmasterService.createnewhblstudent(body).subscribe(data => {
					console.log('@@--> save student response data: '+JSON.stringify(data));
					swal.fire('Success', 'Student details saved successfully', 'success');

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
					this.hideLoading_indicator = true;
				}, error => {}, () => {}
			);
		}
	}

	manager_save_btn_click(){
		if(this.managername == undefined || this.managername == null || this.managername.trim() == ''){
			swal.fire('Info', 'Please check manager name', 'warning')
		}else{
			this.managerid = ''+(new Date().getTime());
			let body = {
				managerid: this.managerid,
				managername: this.managername,
				phone: this.managerphone,
				status: 'active'
			}
			this.hideLoading_indicator = false;
			this.hblmasterService.createnewhblmanager(body).subscribe(data => {
					console.log('@@--> save manager response data: '+JSON.stringify(data));
					swal.fire('Success', 'Manager details saved successfully', 'success');
					// reset
					this.managerid = '';
					this.managername = '';
					this.managerphone = '';

					this.reload_all_data();
					this.hideLoading_indicator = true;
				}, error => {}, () => {}
			);
		}
	}

	volunteer_save_btn_click(){
		if(this.volunteername == undefined || this.volunteername == null || this.volunteername.trim() == ''){
			swal.fire('Info', 'Please check volunteer name', 'warning')
		}else{
			this.volunteerid = ''+(new Date().getTime());
			let body = {
				volunteerid: this.volunteerid,
				volunteername: this.volunteername,
				phone: this.volunteerphone,
				status: 'active'
			}
			this.hideLoading_indicator = false;
			this.hblmasterService.createnewhblvolunteer(body).subscribe(data => {
					console.log('@@--> save volunteer response data: '+JSON.stringify(data));
					swal.fire('Success', 'Volunteer details saved successfully', 'success');
					// reset
					this.volunteerid = '';
					this.volunteername = '';
					this.volunteerphone = '';

					this.reload_all_data();
					this.hideLoading_indicator = true;
				}, error => {}, () => {}
			);
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
				schoolid: this.schoolid,
				schoolname: this.schoolname,
				block: this.schoolblock,
				district: this.schooldistrict,
				status: 'active'
			}
			this.hideLoading_indicator = false;
			this.hblmasterService.createnewhblschool(body).subscribe(data => {
					console.log('@@--> save school response data: '+JSON.stringify(data));
					swal.fire('Success', 'School details saved successfully', 'success');
					// reset
					this.schoolid = '';
					this.schoolname = '';
					this.schoolblock = '';
					this.schooldistrict = '';

					this.reload_all_data();
					this.hideLoading_indicator = true;
				}, error => {}, () => {}
			);
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
				subject: this.levelsubject
			}
			this.hideLoading_indicator = false;
			this.hblmasterService.createnewhbllevel(body).subscribe(data => {
					console.log('@@--> save level response data: '+JSON.stringify(data));
					swal.fire('Success', 'Level details saved successfully', 'success');
					// reset
					this.levelid = '';
					this.leveldesc = '';
					this.levelsubject = '';

					this.reload_all_data();
					this.hideLoading_indicator = true;
				}, error => {}, () => {}
			);
		}
	}

	response_save_btn_click(){
		if(this.responsedesc == undefined || this.responsedesc == null || this.responsedesc.trim() == ''){
			swal.fire('Info', 'Please check response description', 'warning')
		}else{
			this.responseid = ''+(new Date().getTime());
			let body = {
				responseid: this.responseid,
				responsedesc: this.responsedesc
			}
			this.hideLoading_indicator = false;
			this.hblmasterService.createnewhblresponse(body).subscribe(data => {
					console.log('@@--> save response response data: '+JSON.stringify(data));
					swal.fire('Success', 'Response details saved successfully', 'success');
					// reset
					this.responseid = '';
					this.responsedesc = '';

					this.reload_all_data();
					this.hideLoading_indicator = true;
				}, error => {}, () => {}
			);
		}
	}

	// Update operations
	student_update_btn_click(){
		this.hideLoading_indicator = false;
		let gender = (this.studentgender == '1') ? 'male' : 'female';
		let body = {
			managerid: this.studentmanagerid,
			managername: this.studentmanagername,
			volunteerid: this.studentvolunteerid,
			volunteername: this.studentvolunteername,
			schoolid: this.studentschoolid,
			schoolname: this.studentschoolname,
			studentid: this.studentid,
			studentname: this.studentname,
			phone: this.studentphone,
			gender: gender,
			class: this.studentclass,
			status: 'active'
		}
		this.hblmasterService.updatehblstudent(this._id, body).subscribe(data => {
				console.log('@@--> update students response data: '+JSON.stringify(data));
				swal.fire('Success', 'Student details updated successfully.', 'success');

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
				this.hideLoading_indicator = true;
				this.modalReference.close();
			}, error => {}, () => {}
		);
	}

	manager_update_btn_click(){
		this.hideLoading_indicator = false;
		let body = {
			managerid: this.managerid,
			managername: this.managername,
			phone: this.managerphone,
			status: 'active'
		}
		this.hblmasterService.updatehblmanager(this._id, body).subscribe(data => {
				console.log('@@--> update managers response data: '+JSON.stringify(data));
				swal.fire('Success', 'Manager details updated successfully.', 'success');

				// reset
				this._id = '';
				this.managerid = '';
				this.managername = '';
				this.managerphone = '';

				this.reload_all_data();
				this.hideLoading_indicator = true;
				this.modalReference.close();
			}, error => {}, () => {}
		);
	}

	volunteer_update_btn_click(){
		this.hideLoading_indicator = false;
		let body = {
			volunteerid: this.volunteerid,
			volunteername: this.volunteername,
			phone: this.volunteerphone,
			status: 'active'
		}
		this.hblmasterService.updatehblvolunteer(this._id, body).subscribe(data => {
				console.log('@@--> update volunteers response data: '+JSON.stringify(data));
				swal.fire('Success', 'Volunteer details updated successfully.', 'success');

				// reset
				this._id = '';
				this.volunteerid = '';
				this.volunteername = '';
				this.volunteerphone = '';

				this.reload_all_data();
				this.hideLoading_indicator = true;
				this.modalReference.close();
			}, error => {}, () => {}
		);
	}

	school_update_btn_click(){
		this.hideLoading_indicator = false;
		let body = {
			schoolid: this.schoolid,
			schoolname: this.schoolname,
			block: this.schoolblock,
			district: this.schooldistrict,
			status: 'active'
		}
		this.hblmasterService.updatehblschool(this._id, body).subscribe(data => {
				console.log('@@--> update school response data: '+JSON.stringify(data));
				swal.fire('Success', 'School details updated successfully.', 'success');

				// reset
				this._id = '';
				this.schoolid = '';
				this.schoolname = '';
				this.schoolblock = '';
				this.schooldistrict = '';

				this.reload_all_data();
				this.hideLoading_indicator = true;
				this.modalReference.close();
			}, error => {}, () => {}
		);
	}

	level_update_btn_click(){
		this.hideLoading_indicator = false;
		let body = {
			levelid: this.levelid,
			leveldesc: this.leveldesc,
			subject: this.levelsubject
		}
		this.hblmasterService.updatehbllevel(this._id, body).subscribe(data => {
				console.log('@@--> update level response data: '+JSON.stringify(data));
				swal.fire('Success', 'Level details updated successfully.', 'success');

				// reset
				this._id = '';
				this.levelid = '';
				this.leveldesc = '';
				this.levelsubject = '';

				this.reload_all_data();
				this.hideLoading_indicator = true;
				this.modalReference.close();
			}, error => {}, () => {}
		);
	}

	response_update_btn_click(){
		this.hideLoading_indicator = false;
		let body = {
			responseid: this.responseid,
			responsedesc: this.responsedesc
		}
		this.hblmasterService.updatehblresponse(this._id, body).subscribe(data => {
				console.log('@@--> update response response data: '+JSON.stringify(data));
				swal.fire('Success', 'Response details updated successfully.', 'success');

				// reset
				this._id = '';
				this.responseid = '';
				this.responsedesc = '';

				this.reload_all_data();
				this.hideLoading_indicator = true;
				this.modalReference.close();
			}, error => {}, () => {}
		);
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
				console.log('@@--> delete students response data: '+JSON.stringify(data));
				swal.fire('Success', 'Student details deleted successfully.', 'success');

				this._id = '';
				this.reload_all_data();
				this.hideLoading_indicator = true;
			}, error => {}, () => {}
		);
	}
	
	manager_delete_btn_click(managerdata){
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
		this.hideLoading_indicator = false;
		this.hblmasterService.deletehblmanager(id).subscribe(data => {
				console.log('@@--> delete managers response data: '+JSON.stringify(data));
				swal.fire('Success', 'Manager details deleted successfully.', 'success');

				this._id = '';
				this.reload_all_data();
				this.hideLoading_indicator = true;
			}, error => {}, () => {}
		);
	}
	
	volunteer_delete_btn_click(volunteerdata){
		this._id = volunteerdata._id;
		swal.fire({
			title: 'Are you sure?',
			text: "Do you want to delete this volunteer details?",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes'
		}).then((result) => {
			if (result.value) {
				this.deletevolunteer(this._id);
			}
		});
	}

	deletevolunteer(id){
		this.hideLoading_indicator = false;
		this.hblmasterService.deletehblvolunteer(id).subscribe(data => {
				console.log('@@--> delete volunteers response data: '+JSON.stringify(data));
				swal.fire('Success', 'Volunteer details deleted successfully.', 'success');

				this._id = '';
				this.reload_all_data();
				this.hideLoading_indicator = true;
			}, error => {}, () => {}
		);
	}
	
	school_delete_btn_click(schooldata){
		this._id = schooldata._id;
		swal.fire({
			title: 'Are you sure?',
			text: "Do you want to delete this school details?",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes'
		}).then((result) => {
			if (result.value) {
				this.deleteschool(this._id);
			}
		});
	}

	deleteschool(id){
		this.hideLoading_indicator = false;
		this.hblmasterService.deletehblschool(id).subscribe(data => {
				console.log('@@--> delete school response data: '+JSON.stringify(data));
				swal.fire('Success', 'School details deleted successfully.', 'success');

				this._id = '';
				this.reload_all_data();
				this.hideLoading_indicator = true;
			}, error => {}, () => {}
		);
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
				console.log('@@--> delete level response data: '+JSON.stringify(data));
				swal.fire('Success', 'Level details deleted successfully.', 'success');

				this._id = '';
				this.reload_all_data();
				this.hideLoading_indicator = true;
			}, error => {}, () => {}
		);
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
				console.log('@@--> delete response response data: '+JSON.stringify(data));
				swal.fire('Success', 'Response details deleted successfully.', 'success');

				this._id = '';
				this.reload_all_data();
				this.hideLoading_indicator = true;
			}, error => {}, () => {}
		);
	}

	// Open modal box
	open(content,param) {
		if(param != null || param != undefined){}
		
		console.log(this.ngbModalOptions);
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

		console.log(this.ngbModalOptions);
		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_viewstudentmodal(content, studentdata){
		console.log('@@--> studentdata: '+JSON.stringify(studentdata));
		this.studentmanagername = '';
		this.studentvolunteername = '';
		this.studentschoolname = '';

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
		this.studentgender = studentdata.gender;
		this.studentclass = parseInt(studentdata.class);

		console.log(this.ngbModalOptions);
		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_updatestudentmodal(content, studentdata){
		console.log('@@--> studentdata: '+JSON.stringify(studentdata));
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

		console.log(this.ngbModalOptions);
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

		console.log(this.ngbModalOptions);
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

		console.log(this.ngbModalOptions);
		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_createvolunteermodal(content) {
		this._id = '';
		this.volunteerid = '';
		this.volunteername = '';
		this.volunteerphone = '';

		console.log(this.ngbModalOptions);
		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_updatevolunteermodal(content, volunteerdata){
		this._id = volunteerdata._id;
		this.volunteerid = volunteerdata.volunteerid;
		this.volunteername = volunteerdata.volunteername;
		this.volunteerphone = volunteerdata.phone;

		console.log(this.ngbModalOptions);
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

		console.log(this.ngbModalOptions);
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

		console.log(this.ngbModalOptions);
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

		console.log(this.ngbModalOptions);
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

		console.log(this.ngbModalOptions);
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

		console.log(this.ngbModalOptions);
		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_updateresponsemodal(content, responsedata) {
		this._id = responsedata._id;
		this.levelid = responsedata.responseid;
		this.responsedesc = responsedata.responsedesc;

		console.log(this.ngbModalOptions);
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
}
