import { Component, OnInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse, HttpEventType } from '@angular/common/http';

import { Router, ActivatedRoute } from '@angular/router';
import { UsersregistrationpageService } from './usersregistrationpage.service';

import { ManagersboxService } from  './../managersbox/managersbox.service';
import swal from 'sweetalert2';

import { CroppieOptions } from 'croppie';
import { NgxCroppieComponent } from './../modules/ngx-croppie/ngx-croppie.component';

import {TeacherprofilecreateComponent} from './../teacherprofilecreate/teacherprofilecreate.component';


@Component({
    selector: 'app-usersregistrationpage',
    templateUrl: './usersregistrationpage.component.html',
    styleUrls: ['./usersregistrationpage.component.scss'],
    animations: [routerTransition()]
})

export class UsersregistrationpageComponent implements OnInit {
	@ViewChild('loadingmodal') loadingmodal;
	// Query string
	qp_action: string = '';
	qp_userid:  string = '';

	// Form fields
	document_id: string;
	hide_anganwadis_schools_fellows_form: boolean = true;
	hide_managers_form: boolean = true;
	hideLoading_indicator: boolean;
	hideModalLoading_indicator: boolean = true;
	showpassword: boolean;
	showhide_button: string;

	// Users
	selected_username: string;
	selected_userid: string;
	selected_password: string;
	selected_phone: string;
	selected_email: string;
	selected_permanentaddress: string = '';
	selected_block: string;

	// Action type
	btn_text: string = '';
	usersubmitaction: string;

	// Usertype
	all_available_usertypes_list: any = [{typeid: 'anganwadi', typetext: 'Anganwadi'}, {typeid: 'school', typetext: 'School'}, {typeid: 'fellow', typetext: 'Fellow'}, {typeid: 'manager', typetext: 'Manager'}];
	selected_usertype_list: any = [];
	selected_usertypeid: string = '';
	usertype_multiselect_settings: any = {};
	disable_usertype_dropdown: boolean = false;

	// Center
	all_available_centers_list: any = [];
	selected_center_list: any = [];
	selected_centerid: string;
	selected_centername: string;
	center_multiselect_settings: any = {};
	disable_center_dropdown: boolean = false;
	disable_rlease_center_button: boolean = false;

	// Manager
	all_available_managers_list: any = [];
	selected_manager_list: any = [];
	selected_managerid: string;
	selected_managername: string;
	manager_multiselect_settings: any = {};

	// Gender
	all_available_genders_list: any = [{genderid:'male', gendername: 'Male'}, {genderid:'female', gendername: 'Female'}, {genderid:'other', gendername: 'Other'}];
	selected_gender_list: any = [];
	selected_gender: string;
	gender_multiselect_settings: any = {};

	// State
	all_available_states_list: any = [];
	selected_state_list: any = [];
	selected_statecode: string;
	selected_statevalue: string;
	state_multiselect_settings: any = {};

	// District
	all_available_districts_list: any = [];
	selected_district_list: any = [];
	selected_districtid: string;
	selected_districtvalue: string;
	district_multiselect_settings: any = {};

	// Image
	profileimage: string = './../../../../assets/images/default-user-profile-image.jpg';
	image_filename_original: string = '';
	image_filename_cropped: string = '';
	image_filename_s3: string = '';
	image_filetype: string = '';
	image_s3url: string = '';

	// Image Cropper
	@ViewChild('ngxCroppie') ngxCroppie: NgxCroppieComponent;
	widthPx = '400';
	heightPx = '400';
	imageUrl = '';
	currentImage: string;
	croppieImage: string;
	editedImage:string;

	// Modal
	modalReference: any;
	closeResult: string;

	// Regex
	validatemail: any = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
	validatephone: any = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	

    constructor(
		private modalService: NgbModal,
        public route: ActivatedRoute,
        public router: Router,
		private usersregistrationpageService: UsersregistrationpageService,
		private managersboxService: ManagersboxService,
		private changeDetectorRef: ChangeDetectorRef
	) {
		this.reset_all();
		this.hideLoading_indicator = true;
		this.hideModalLoading_indicator = true;
		this.showpassword = false;
		this.showhide_button='Show';
		this.currentImage = this.imageUrl;
		this.croppieImage = this.imageUrl;
		this.get_availavle_centers();
		this.get_availavle_managers();
		//this.get_availavle_states();
		this.get_queryparams_values();
	}
	
	ngOnInit() {
		this.usertpe_multiselect_configuration();
		this.center_multiselect_configuration();
		this.manager_multiselect_configuration();
		this.gender_multiselect_configuration();
		//this.state_multiselect_configuration();
		//this.district_multiselect_configuration();
		this.load_page_data();
	}

	// Extract query paramiters
	get_queryparams_values(){
		this.route.queryParams.subscribe(params => {
			this.qp_action= params['action'];
			this.qp_userid = params['userid'];
		});
	}
	
	// Multi-select configurations
	usertpe_multiselect_configuration() {
		this.usertype_multiselect_settings = {
			idField: 'typeid',
			textField: 'typetext',
			searchPlaceholderText: 'Search',
			noDataAvailablePlaceholderText: 'No Data Found',
			singleSelection: true,
			allowSearchFilter: true,
			clearSearchFilter: true,
			showSelectedItemsAtTop: true,
			defaultOpen: false,
			closeDropDownOnSelection: true
		};
	}
	
	center_multiselect_configuration() {
		this.center_multiselect_settings = {
			idField: 'centerid',
			textField: 'centername',
			searchPlaceholderText: 'Search',
			noDataAvailablePlaceholderText: 'No Data Found',
			singleSelection: true,
			allowSearchFilter: true,
			clearSearchFilter: true,
			showSelectedItemsAtTop: true,
			defaultOpen: false,
			closeDropDownOnSelection: true
		};
	}
	
	manager_multiselect_configuration() {
		this.manager_multiselect_settings = {
			idField: 'userid',
			textField: 'username',
			searchPlaceholderText: 'Search',
			noDataAvailablePlaceholderText: 'No Data Found',
			singleSelection: true,
			allowSearchFilter: true,
			clearSearchFilter: true,
			showSelectedItemsAtTop: true,
			defaultOpen: false,
			closeDropDownOnSelection: true
		};
	}
	
	gender_multiselect_configuration() {
		this.gender_multiselect_settings = {
			idField: 'genderid',
			textField: 'gendername',
			searchPlaceholderText: 'Search',
			noDataAvailablePlaceholderText: 'No Data Found',
			singleSelection: true,
			allowSearchFilter: true,
			clearSearchFilter: true,
			showSelectedItemsAtTop: true,
			defaultOpen: false,
			closeDropDownOnSelection: true
		};
	}
	
	state_multiselect_configuration() {
		this.state_multiselect_settings = {
			idField: '_id',
			textField: 'statevalue',
			searchPlaceholderText: 'Search',
			noDataAvailablePlaceholderText: 'No Data Found',
			singleSelection: true,
			allowSearchFilter: true,
			clearSearchFilter: true,
			showSelectedItemsAtTop: true,
			defaultOpen: false,
			closeDropDownOnSelection: true
		};
	}
	
	district_multiselect_configuration() {
		this.district_multiselect_settings = {
			idField: '_id',
			textField: 'districtvalue',
			searchPlaceholderText: 'Search',
			noDataAvailablePlaceholderText: 'No Data Found',
			singleSelection: true,
			allowSearchFilter: true,
			clearSearchFilter: true,
			showSelectedItemsAtTop: true,
			defaultOpen: false,
			closeDropDownOnSelection: true
		};
	}

	// Get all AVAILABLE Centers
	get_availavle_centers(){
		this.hideLoading_indicator = false;
		this.usersregistrationpageService.userreg_getavailablecenters().subscribe(data => {
			//console.log('-->get_userbyuserid: '+JSON.stringify(data));
			if(Object.keys(data).length > 0){
				this.all_available_centers_list = data;
			}else{
				this.all_available_centers_list = [];
			}
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
	}

	get_center_by_centerid(centerid){
		this.hideLoading_indicator = false;
		this.usersregistrationpageService.userreg_getcenterbycenterid(centerid).subscribe(data => {
			console.log('-->userreg_getcenterbycenterid: '+JSON.stringify(data));
			if(Object.keys(data).length > 0){
				this.selected_statecode = (data[0].statecode == undefined || data[0].statecode == null || data[0].statecode.trim() == '') ? '' : data[0].statecode;
				this.selected_statevalue = (data[0].statevalue == undefined || data[0].statevalue == null || data[0].statevalue.trim() == '') ? '' :  data[0].statevalue;
				this.selected_districtid = (data[0].districtid == undefined || data[0].districtid == null || data[0].districtid.trim() == '') ? '' :  data[0].districtid;
				this.selected_districtvalue = (data[0].districtvalue == undefined || data[0].districtvalue == null || data[0].districtvalue.trim() == '') ? '' :  data[0].districtvalue;
				this.selected_block = (data[0].block == undefined || data[0].block == null || data[0].block.trim() == '') ? '' :  data[0].block;
			}else{
				this.selected_statecode = '';
				this.selected_statevalue = '';
				this.selected_districtid = '';
				this.selected_districtvalue = '';
				this.selected_block = '';
			}
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
	}

	// Get all Managers
	get_availavle_managers(){
		this.hideLoading_indicator = false;
		this.usersregistrationpageService.userreg_getmanagers().subscribe(data => {
			//console.log('-->get_userbyuserid: '+JSON.stringify(data));
			if(Object.keys(data).length > 0){
				this.all_available_managers_list = data;
			}else{
				this.all_available_managers_list = [];
			}
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
	}

	// Get all States
	get_availavle_states(){
		this.hideLoading_indicator = false;
		this.usersregistrationpageService.userreg_getstates().subscribe(data => {
			//console.log('-->get_userbyuserid: '+JSON.stringify(data));
			if(Object.keys(data).length > 0){
				this.all_available_states_list = data;
			}else{
				this.all_available_states_list = [];
			}
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
	}

	// Get all Districts
	get_availavle_districts(statecode){
		//console.log('-->statecode: '+JSON.stringify(statecode));
		this.hideLoading_indicator = false;
		this.usersregistrationpageService.userreg_getdistricts(statecode).subscribe(data => {
			//console.log('-->get_districts: '+JSON.stringify(data));
			if(Object.keys(data).length > 0){
				this.all_available_districts_list = data;
			}else{
				this.all_available_districts_list = [];
			}
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
	}

	update_center_status(id, body){
		this.hideLoading_indicator = false;
		this.usersregistrationpageService.userreg_updatecenter(id, body).subscribe(data => {
			//console.log('-->update center status: '+JSON.stringify(data));
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
	}

	release_center_button_click(){
		swal.fire({
			title: 'Are you sure? ',
			text: 'Do you want to release this center for this user?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes'
		}).then((result) => {
			if (result.value) {
				if(this.selected_centerid != undefined && this.selected_centerid != null && this.selected_centerid.length > 0){
					// update center status
					this.update_center_status(this.selected_centerid, {status: 'available'});
					// update user
					let body = { centerid : '', centername : '', statecode : '', statevalue : '', districtid : '', districtvalue : '' };
					this.hideLoading_indicator = false;
					this.usersregistrationpageService.userreg_updateuser(this.document_id, body).subscribe(data => {this.hideLoading_indicator = true;}, error => {}, () => {} );
		
					this.get_availavle_centers();
					this.selected_center_list = [];
					this.selected_centerid = '';
					this.selected_centername = '';
					this.disable_center_dropdown = false;
				}else{
					swal.fire('Info', 'No Centers selected', 'warning');
					this.selected_center_list = [];
					this.selected_centerid = '';
					this.selected_centername = '';
					this.disable_center_dropdown = false;
				}
			}
		});
	}

	load_page_data(){
		//console.log('--> action: '+this.qp_action, '    userid: '+this.qp_userid);
		if(this.qp_action == 'edit_user'){
			this.btn_text = 'UPDATE';
			this.get_userbyuserid();
		}else{
			this.btn_text = 'SAVE';
			this.usersubmitaction = 'Create';
			this.reset_all();
			this.currentImage = this.profileimage;
		}
	}

	get_userbyuserid() {
		this.hideLoading_indicator = false;
		this.usersregistrationpageService.userreg_getuserbyuserid(this.qp_userid).subscribe(data => {
			//console.log('-->get_userbyuserid: '+JSON.stringify(data));
			if(Object.keys(data).length > 0){
				let user = data[0];
				this.usersubmitaction = 'Update';
				
				this.selected_usertypeid = user.usertype;
				this.document_id = user._id;
				this.selected_centerid = user.centerid;				//<-
				this.selected_centername = user.centername;			//<-
				this.selected_managerid = user.managerid;			//<-
				this.selected_managername = user.managername;		//<-
				this.selected_username = user.username;
				this.selected_userid = user.userid;
				this.selected_password = user.password;
				this.selected_phone = user.contactnumber;
				this.selected_gender = user.gender;
				this.selected_statecode = user.statecode;			//<-
				this.selected_statevalue = user.statevalue;			//<-
				this.selected_districtid = user.districtid;		//<-
				this.selected_districtvalue = user.districtvalue;	//<-
				this.selected_block = user.block;				//<-
				this.selected_permanentaddress = user.permanentaddress;
				this.currentImage = user.image;

				this.selected_usertypeid = (this.selected_usertypeid == undefined || this.selected_usertypeid == null || this.selected_usertypeid.trim() == '') ? '' : this.selected_usertypeid.trim().toLowerCase();
				this.selected_gender   = (this.selected_gender == undefined || this.selected_gender == null || this.selected_gender.trim() == '') ? '' : this.selected_gender.trim().toLowerCase();
		
				//console.log('-->selected_usertypeid= ',this.selected_usertypeid,'    selected_centerid= ',this.selected_centerid,'    selected_managerid= ',this.selected_managerid,'    selected_username= ',this.selected_username,'    selected_password= ',this.selected_password,'    selected_phone= ',this.selected_phone,'    selected_email= ',this.selected_email,'    selected_gender= ',this.selected_gender,'    selected_statecode= ',this.selected_statecode,'    selected_statevalue= ',this.selected_statevalue,'    selected_districtid= ',this.selected_districtid,'    selected_districtvalue= ',this.selected_districtvalue,'    selected_block= ',this.selected_block);
				
				if(this.selected_usertypeid.trim().toLowerCase() == 'anganwadi' || this.selected_usertypeid.trim().toLowerCase() == 'school' || this.selected_usertypeid.trim().toLowerCase() == 'fellow'){	
					this.hide_anganwadis_schools_fellows_form = false;
					this.hide_managers_form = true;
					this.disable_center_dropdown = true;
					//this.disable_rlease_center_button = (this.selected_centerid == undefined || this.selected_centerid == null || this.selected_centerid.trim() == '') ? true : false;
				}else if(this.selected_usertypeid.trim().toLowerCase() == 'manager') {
					this.hide_anganwadis_schools_fellows_form = true;
					this.hide_managers_form = false;
					this.disable_center_dropdown = true;
					//this.disable_rlease_center_button = (this.selected_centerid == undefined || this.selected_centerid == null || this.selected_centerid.trim() == '') ? true : false;
				}else{
					this.hide_anganwadis_schools_fellows_form = true;
					this.hide_managers_form = true;
					this.disable_center_dropdown = false;
					//this.disable_rlease_center_button = (this.selected_centerid == undefined || this.selected_centerid == null || this.selected_centerid.trim() == '') ? true : false;
				}
				this.set_selected_list();
			}
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
	}

	set_selected_list(){
		if(this.selected_usertypeid.trim().length > 0){
			this.disable_usertype_dropdown = (this.usersubmitaction == 'Update') ? true : false;
			if(this.selected_usertypeid.trim().toLowerCase() == 'anganwadi')    this.selected_usertype_list = [{typeid: 'anganwadi', typetext: 'Anganwadi'}];
			else if(this.selected_usertypeid.trim().toLowerCase() == 'school')  this.selected_usertype_list = [{typeid: 'school', typetext: 'School'}];
			else if(this.selected_usertypeid.trim().toLowerCase() == 'fellow')  this.selected_usertype_list = [{typeid: 'fellow', typetext: 'Fellow'}];
			else if(this.selected_usertypeid.trim().toLowerCase() == 'manager') this.selected_usertype_list = [{typeid: 'manager', typetext: 'Manager'}];
			this.selected_center_list = [{centerid: this.selected_centerid, centername: this.selected_centername}];
			this.selected_manager_list = [{userid: this.selected_managerid, username: this.selected_managername}];
			if(this.selected_gender.trim().toLowerCase() == 'male')    			this.selected_gender_list = [{genderid:this.selected_gender, gendername: 'Male'}];
			else if(this.selected_gender.trim().toLowerCase() == 'female')  	this.selected_gender_list = [{genderid:this.selected_gender, gendername: 'Female'}];
			else  																this.selected_gender_list = [{genderid:this.selected_gender, gendername: 'Other'}];
			this.selected_state_list = [{_id: this.selected_statecode, statevalue: this.selected_statevalue}];
			this.selected_district_list = [{_id: this.selected_districtid, districtvalue: this.selected_districtvalue}];
		}else{
			this.disable_usertype_dropdown = (this.usersubmitaction == 'Update') ? true : false;
			this.selected_usertype_list = [];
			this.selected_center_list 	= [];
			this.selected_manager_list 	= [];
			this.selected_gender_list 	= [];
			this.selected_state_list 	= [];
			this.selected_district_list = [];
		}

	}

	// select dropdown onchange events
	usertype_multiselect_onselect(item: any){
		this.reset_all();
		this.selected_usertypeid = item.typeid;
		this.selected_usertypeid = (this.selected_usertypeid == undefined || this.selected_usertypeid == null || this.selected_usertypeid.trim() == '') ? '' : this.selected_usertypeid;

		this.selected_usertype_list = [{typeid: item.typeid, typetext: item.typetext}]; 
		if(this.selected_usertypeid.trim().toLowerCase() == 'anganwadi' || this.selected_usertypeid.trim().toLowerCase() == 'school' || this.selected_usertypeid.trim().toLowerCase() == 'fellow'){	
			this.hide_anganwadis_schools_fellows_form = false;
			this.hide_managers_form = true;
		}else if(this.selected_usertypeid.trim().toLowerCase() == 'manager') {
			this.hide_anganwadis_schools_fellows_form = true;
			this.hide_managers_form = false;
		}else{
			this.hide_anganwadis_schools_fellows_form = true;
			this.hide_managers_form = true;
		}
	}
	usertype_multiselect_ondeselect(item: any){
		this.selected_usertypeid = '';
		this.hide_anganwadis_schools_fellows_form = true;
		this.hide_managers_form = true;
	}

	center_multiselect_onselect(item: any) {
		console.log(this.selected_center_list)
		this.selected_centerid = item.centerid;
		this.selected_centername = item.centername;
		this.selected_centerid = (this.selected_centerid == undefined || this.selected_centerid == null || this.selected_centerid.trim() == '') ? '' : this.selected_centerid;
		this.selected_centername = (this.selected_centername == undefined || this.selected_centername == null || this.selected_centername.trim() == '') ? '' : this.selected_centername;
		
		this.get_center_by_centerid(this.selected_centerid);
	}
	center_multiselect_ondeselect(item: any) {
		this.selected_centerid = '';
		this.selected_centername = '';

		this.selected_statecode = '';
		this.selected_statevalue = '';
		this.selected_districtid = '';
		this.selected_districtvalue = '';
		this.selected_block = '';
	}

	manager_multiselect_onselect(item: any) {
		this.selected_managerid = item.userid;
		this.selected_managername = item.username;
		this.selected_managerid = (this.selected_managerid == undefined || this.selected_managerid == null || this.selected_managerid.trim() == '') ? '' : this.selected_managerid;
		this.selected_managername = (this.selected_managername == undefined || this.selected_managername == null || this.selected_managername.trim() == '') ? '' : this.selected_managername;
	}
	manager_multiselect_ondeselect(item: any) {
		this.selected_managerid = '';
		this.selected_managername = '';
	}

	gender_multiselect_onselect(item: any) {
		this.selected_gender = item.genderid;
		this.selected_gender = (this.selected_gender == undefined || this.selected_gender == null || this.selected_gender.trim() == '') ? '' : this.selected_gender;
	}
	gender_multiselect_ondeselect(item: any) {
		this.selected_gender = '';
	}

	state_multiselect_onselect(item: any) {
		this.selected_district_list = null;
		this.selected_districtid = '';
		this.selected_districtvalue = '';
		this.selected_statecode = item._id;
		this.selected_statevalue = item.statevalue;
		this.selected_statecode = (this.selected_statecode == undefined || this.selected_statecode == null || this.selected_statecode.trim() == '') ? '' : this.selected_statecode;
		this.selected_statevalue = (this.selected_statevalue == undefined || this.selected_statevalue == null || this.selected_statevalue.trim() == '') ? '' : this.selected_statevalue;
		if(this.selected_statecode.trim() != '')
			this.get_availavle_districts(this.selected_statecode);
	}
	state_multiselect_ondeselect(item: any) {
		this.selected_statecode = '';
		this.selected_statevalue = '';
		this.selected_district_list = null;
		this.selected_districtid = '';
		this.selected_districtvalue = '';
	}

	district_multiselect_onselect(item: any) {
		this.selected_districtid = item._id;
		this.selected_districtvalue =  item.districtvalue;
	}
	district_multiselect_ondeselect(item: any) {
		this.selected_districtid = '';
		this.selected_districtvalue = '';
		this.selected_district_list = null;
	}

	// save user
	formSubmitAction(usersubmitaction) {
		//console.log('-->usersubmitaction= ',usersubmitaction)
		//console.log('-->selected_usertypeid= ',this.selected_usertypeid,'    selected_centerid= ',this.selected_centerid,'    selected_managerid= ',this.selected_managerid,'    selected_username= ',this.selected_username,'    selected_password= ',this.selected_password,'    selected_phone= ',this.selected_phone,'    selected_email= ',this.selected_email,'    selected_gender= ',this.selected_gender,'    selected_statecode= ',this.selected_statecode,'    selected_statevalue= ',this.selected_statevalue,'    selected_districtid= ',this.selected_districtid,'    selected_districtvalue= ',this.selected_districtvalue,'    selected_block= ',this.selected_block)
		
		let body = {};
		this.document_id = (this.document_id == undefined || this.document_id == null || this.document_id.trim() == '') ? '' : this.document_id ;
		this.selected_userid = (this.selected_userid == undefined || this.selected_userid == null || this.selected_userid.trim() == '') ? '' : this.selected_userid ;
		this.selected_username = (this.selected_username == undefined || this.selected_username == null || this.selected_username.trim() == '') ? '' : this.selected_username.toLowerCase() ;
		this.selected_usertypeid = (this.selected_usertypeid == undefined || this.selected_usertypeid == null || this.selected_usertypeid.trim() == '') ? '' : this.selected_usertypeid.toLowerCase() ;
		this.selected_password = (this.selected_password == undefined || this.selected_password == null || this.selected_password.trim() == '') ? '' : this.selected_password ;
		this.selected_email = (this.selected_email == undefined || this.selected_email == null || this.selected_email.trim() == '') ? '' : this.selected_email.toLowerCase() ;
		this.selected_centerid = (this.selected_centerid == undefined || this.selected_centerid == null || this.selected_centerid.trim() == '') ? '' : this.selected_centerid ;
		this.selected_managerid = (this.selected_managerid == undefined || this.selected_managerid == null || this.selected_managerid.trim() == '') ? '' : this.selected_managerid ;
		this.selected_statecode = (this.selected_statecode == undefined || this.selected_statecode == null || this.selected_statecode.trim() == '') ? '' : this.selected_statecode ;
		this.selected_statevalue = (this.selected_statevalue == undefined || this.selected_statevalue == null || this.selected_statevalue.trim() == '') ? '' : this.selected_statevalue;
		this.selected_districtid = (this.selected_districtid == undefined || this.selected_districtid == null || this.selected_districtid.trim() == '') ? '' : this.selected_districtid ;
		this.selected_districtvalue = (this.selected_districtvalue == undefined || this.selected_districtvalue == null || this.selected_districtvalue.trim() == '') ? '' : this.selected_districtvalue ;
		this.selected_block = (this.selected_block == undefined || this.selected_block == null || this.selected_block.trim() == '') ? '' : this.selected_block.toLowerCase() ;
		this.selected_phone = (this.selected_phone == undefined || this.selected_phone == null || this.selected_phone.trim() == '') ? '' : this.selected_phone ;
		this.selected_gender = (this.selected_gender == undefined || this.selected_gender == null || this.selected_gender.trim() == '') ? '' : this.selected_gender.toLowerCase() ;
		this.selected_permanentaddress = (this.selected_permanentaddress == undefined || this.selected_permanentaddress == null || this.selected_permanentaddress.trim() == '') ? '' : this.selected_permanentaddress.toLowerCase() ;
		this.profileimage = (this.image_s3url == undefined || this.image_s3url == null || this.image_s3url.trim() == '') ? this.profileimage : this.image_s3url ;
		
		const _id = this.document_id;
		let userid = this.selected_userid;
		const username = this.selected_username;
		const usertype = this.selected_usertypeid;
		const password = this.selected_password;
		const emailid = this.selected_email;

		const centerid = this.selected_centerid;
		const centername = this.selected_centername;
		const managerid = this.selected_managerid;
		const managername = this.selected_managername;
		const statecode = this.selected_statecode;
		const statevalue = this.selected_statevalue;
		const districtid = this.selected_districtid;
		const districtvalue = this.selected_districtvalue;
		const block = this.selected_block;
		const permanentaddress = this.selected_permanentaddress;

		const status = 'active';
		const contactnumber = this.selected_phone;
		const gender = this.selected_gender;
		const image = this.profileimage;

		if(usertype.trim() == ''){
			swal.fire('Info','Invalid usertype.','warning');
		}else{
			if(username.trim() == ''){
				swal.fire('Info','Invalid username.','warning');
			}else if(password.trim() == ''){
				swal.fire('Info','Invalid password.','warning');
			}else if(password.trim().length < 5){
				swal.fire('Info','Password must be of 5 or more character length.','warning');
			}else if(emailid.trim() != ''){
				if(!(this.selected_email.match(this.validatemail))) {
					swal.fire('Info','Invalid email id.','warning');
				}
			}else if(gender.trim() == ''){
				swal.fire('Info','Invalid gender.','warning');
			}else if(usertype == 'manager'){
				console.log('--> Usertype = '+usertype);
				if(usersubmitaction === 'Create'){
					let name = username;
					name = name.trim();
					var arr = name.split(' ');
					name = (arr.length > 0) ? arr[0] : ''; 
					var suffix = Math.floor(1000 + Math.random() * 9999);
					userid = name+''+suffix+'@thinkzone.in';
					
					body = {};
					body = {
						userid : userid,
						username : username,
						usertype : usertype,
						emailid : emailid,
						password : password,
						status : status,
						gender : gender,
						centerid : centerid,
						centername : centername,
						managerid : managerid,
						managername : managername,
						statecode : statecode,
						statevalue : statevalue,
						districtid : districtid,
						districtvalue : districtvalue,
						block : block,
						permanentaddress: permanentaddress,
						image : image,
						contactnumber : contactnumber
					}
					//console.log('-->save user  body: ', body);
					this.saveuser(body);
					this.update_center_status(centerid, {status: 'alloted'});
				}else if (usersubmitaction === 'Update'){
					if(_id.trim() == ''){
						swal.fire('Info','Invalid document id.','warning');
					}else if(userid.trim() == ''){
						swal.fire('Info','Invalid userid.','warning');
					}else{
					
						body = {};
						body = {
							username : username,
							usertype : usertype,
							emailid : emailid,
							password : password,
							status : status,
							gender : gender,
							centerid : centerid,
							centername : centername,
							managerid : managerid,
							managername : managername,
							statecode : statecode,
							statevalue : statevalue,
							districtid : districtid,
							districtvalue : districtvalue,
							block : block,
							permanentaddress: permanentaddress,
							image : image,
							contactnumber : contactnumber
						}
						console.log('-->update user  _id: ', _id, '    body: ', body);
						this.updateuser(_id, body);
						this.update_center_status(centerid, {status: 'alloted'});
					}
				}else {
					swal.fire('Info','Data can not be saved.','warning');
				}
			}else{
				console.log('--> Usertype = '+usertype);
				if(centerid.trim() == ''){
					swal.fire('Info','Invalid center.','warning');
				}else if(managerid.trim() == ''){
					swal.fire('Info','Invalid manager.','warning');
				}else if(contactnumber.trim() == ''){
					swal.fire('Info','Invalid contact number.','warning');
				}else if(!this.validatephone.test(contactnumber)){
					swal.fire('Info', 'Contact number is not in valid format. Valid formats: 0123456789, (012)345-6789, 012-345-6789', 'warning')
				}else if(statecode.trim() == ''){
					swal.fire('Info','Invalid state.(check Center master)','warning');
				}else if(districtid.trim() == ''){
					swal.fire('Info','Invalid district.(check Center master)','warning');
				}else if(block.trim() == ''){
					swal.fire('Info','Invalid block name.(check Center master)','warning');
				}else if(block.trim().length < 4){
					swal.fire('Info','Block name must be of 4 or more character length.','warning');
				}else if(permanentaddress.trim() != '' && permanentaddress.length < 5){
					swal.fire('Info','Invalid address.','warning');
				}else{
					if(usersubmitaction === 'Create'){
						let name = username;
						name = name.trim();
						var arr = name.split(' ');
						name = (arr.length > 0) ? arr[0] : ''; 
						var suffix = Math.floor(1000 + Math.random() * 9999);
						userid = name+''+suffix+'@thinkzone.in';
						
						body = {};
						body = {
							userid : userid,
							username : username,
							usertype : usertype,
							emailid : emailid,
							password : password,
							status : status,
							gender : gender,
							centerid : centerid,
							centername : centername,
							managerid : managerid,
							managername : managername,
							statecode : statecode,
							statevalue : statevalue,
							districtid : districtid,
							districtvalue : districtvalue,
							block : block,
							permanentaddress: permanentaddress,
							image : image,
							contactnumber : contactnumber
						}
						//console.log('-->save user  body: ', body);
						this.saveuser(body);
						this.update_center_status(centerid, {status: 'alloted'});
					}else if (usersubmitaction === 'Update'){
						if(_id.trim() == ''){
							swal.fire('Info','Invalid document id.','warning');
						}else if(userid.trim() == ''){
							swal.fire('Info','Invalid userid.','warning');
						}else{
						
							body = {};
							body = {
								username : username,
								usertype : usertype,
								emailid : emailid,
								password : password,
								status : status,
								gender : gender,
								centerid : centerid,
								centername : centername,
								managerid : managerid,
								managername : managername,
								statecode : statecode,
								statevalue : statevalue,
								districtid : districtid,
								districtvalue : districtvalue,
								block : block,
								permanentaddress: permanentaddress,
								image : image,
								contactnumber : contactnumber
							}
							console.log('-->update user  _id: ', _id, '    body: ', body);
							this.updateuser(_id, body);
							this.update_center_status(centerid, {status: 'alloted'});
						}
					}else {
						swal.fire('Info','Data can not be saved.','warning');
					}
				}
			}
		}
	}

	saveuser(body){
		this.hideLoading_indicator = false;
		this.hideModalLoading_indicator = false;
		this.open(this.loadingmodal);
		this.usersregistrationpageService.userreg_createuser(body).subscribe(data => {
			swal.fire('Success','User profile registered successfully.','success');
			this.reset_all();
			this.hideLoading_indicator = true;
			this.hideModalLoading_indicator = true;
			this.modalReference.close();
			this.router.navigate(['/users']);
		}, error => { }, () => {} );
	}

	updateuser(id, body){
		this.hideLoading_indicator = false;
		this.usersregistrationpageService.userreg_updateuser(id, body).subscribe(data => {
			swal.fire('Success','User profile updated successfully.','success');
			this.reset_all();
			this.hideLoading_indicator = true;
			this.router.navigate(['/users']);
		}, error => {}, () => {} );
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
	
	back_to_users_page(){
		this.router.navigate(['/users']);
	}

	// Nrusingh- 19-03-2020, ngx-croppie image upload part
	public get imageToDisplay() {
		if (this.currentImage) { this.profileimage = this.currentImage; return this.currentImage; }
		if (this.imageUrl) { this.profileimage = this.imageUrl; return this.imageUrl; }
		return this.profileimage;
	}
	
	public get croppieOptions(): CroppieOptions {
		const opts: CroppieOptions = {};
			opts.viewport = {
			width: parseInt(this.widthPx, 10),
			height: parseInt(this.heightPx, 10),
			type: 'circle'
		};
		opts.boundary = {
			width: parseInt(this.widthPx, 10),
			height: parseInt(this.heightPx, 10)
		};
		opts.enforceBoundary = true;
		//opts.enableZoom = false;
		return opts;
	}
	
	newImageResultFromCroppie(img: string) {
		this.editedImage = img;
	}
	
	saveImageFromCroppie() {
		this.currentImage = this.editedImage;
		this.save_to_s3();
	}
	
	cancelCroppieEdit() {
		this.croppieImage = this.currentImage;
	}
	
	imageUploadEvent(evt: any) {
		if (!evt.target) { return; }
		if (!evt.target.files) { return; }
		if (evt.target.files.length !== 1) { return; }
		const file = evt.target.files[0];

		// Nrusingh- 19-03-2020, get the original file details
		this.image_filename_original = file.name;
		this.image_filetype = this.image_filename_original.split('.').pop();
		this.image_filename_s3 = (new Date()).getTime()+'.'+this.image_filetype;

		if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif' && file.type !== 'image/jpg') { return; }
		const fr = new FileReader();
		fr.onloadend = (loadEvent) => {
			this.croppieImage = fr.result as string;
		};
		fr.readAsDataURL(file);
	}
	
	getCropPoints() {
		if (this.ngxCroppie) {
			alert('Crop points: ' + this.ngxCroppie.get().points);
		}
	}
	
  	// Nrusingh- 18-03-2020, save cropped image to S3 Bucket
  	save_to_s3(){
		const imageBlob = this.base64_to_file(this.currentImage);
		const imageFile = new File([imageBlob], '_image', { type: 'image/png' });

		this.managersboxService.pushFileToStorage(imageFile, this.image_filename_s3).subscribe(event => {
			if (event.type === HttpEventType.UploadProgress) {
				this.modalReference.close();
			} else if (event instanceof HttpResponse) {
				this.image_s3url = event.body['s3path'];
			}
		});
  	}

  	base64_to_file(base64_data) {
		// Base64 format is like:- "data:image/gif;base64,R0lGODlhPQBEAPeoAJosM//AwO/Aw......ZbEhAAOw==";

		let block = base64_data.split(";");				// Split the base64 string in data and contentType
		let content_type = block[0].split(":")[1];		// Get the content type of the image. For example "image/gif"
		let real_data = block[1].split(",")[1];			// get the real base64 content of the file

		const byteString  = window.atob(real_data);
		const arrayBuffer = new ArrayBuffer(byteString.length);
		const int8Array   = new Uint8Array(arrayBuffer);
		for (let i = 0; i < byteString.length; i++) {
			int8Array[i]  = byteString.charCodeAt(i);
		}
		const blob = new Blob([int8Array], { type: content_type });    
		return blob;
	}
	
	savetodb(){
		this.hideLoading_indicator = false;
		let body = {
			displayname: this.image_filename_original,
			s3name: this.image_filename_s3,
			filetype: this.image_filetype,
			s3path: this.image_s3url
		}
		this.managersboxService.uploadToManagersBox(body).subscribe(data => {
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}
	
	open(content) {
		this.changeDetectorRef.detectChanges();
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
	
	open_createnewteacherprofile_modal(){
		this.modalReference = this.modalService.open(TeacherprofilecreateComponent);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}

	// Reset everything
	reset_all(){
		this.selected_usertypeid = '';
		this.document_id = '';
		this.selected_centerid = '';
		this.selected_managerid = '';
		this.selected_username = '';
		this.selected_userid = '';
		this.selected_password = '';
		this.selected_phone = '';
		this.selected_gender = '';
		this.selected_statecode = '';
		this.selected_districtid = '';
		this.selected_block = '';
		this.selected_permanentaddress = '';

		this.selected_usertype_list = [];
		this.selected_center_list 	= [];
		this.selected_manager_list 	= [];
		this.selected_gender_list 	= [];
		this.selected_state_list 	= [];
		this.selected_gender_list 	= [];

		this.disable_usertype_dropdown = (this.usersubmitaction == 'Update') ? true : false;
		this.disable_center_dropdown = false;
		//this.disable_rlease_center_button = (this.selected_centerid == undefined || this.selected_centerid == null || this.selected_centerid.trim() == '') ? true : false;
		this.hide_anganwadis_schools_fellows_form = true;
		this.hide_managers_form = true;
	}
}
