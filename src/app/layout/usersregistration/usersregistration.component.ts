import { Component, OnInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse, HttpEventType } from '@angular/common/http';

import { Router, ActivatedRoute } from '@angular/router';
import { UsersregistrationService } from './usersregistration.service';

import { ManagersboxService } from  './../managersbox/managersbox.service';
import swal from 'sweetalert2';

import { CroppieOptions } from 'croppie';
import { NgxCroppieComponent } from './../modules/ngx-croppie/ngx-croppie.component';

import {TeacherprofilecreateComponent} from './../teacherprofilecreate/teacherprofilecreate.component';


@Component({
    selector: 'app-usersregistration',
    templateUrl: './usersregistration.component.html',
    styleUrls: ['./usersregistration.component.scss'],
    animations: [routerTransition()]
})

export class UsersregistrationComponent implements OnInit {
	@ViewChild('ngxCroppie') ngxCroppie: NgxCroppieComponent;
	widthPx = '400';
	heightPx = '400';
	imageUrl = '';
	currentImage: string;
	croppieImage: string;
	editedImage:string;

	@ViewChild('auto') auto;
	
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
	modalReference2: any;
	modal_id: string;
	modal_userid: string;
	modal_username: string;
	modal_contactno: string;
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
	selected_teacherprofile_data_bkp: any = [];
	selected_teacherprofile: string = '';

	// teacher profile auto-complete 
	//data_teachers: any;
	//teachers: any;
	keyword_teachername = 'teachername';
	hide_teacherprofile_dropdown: boolean = true;

	qp_action: string = '';
	qp_userid:  string = '';
	btn_text: string = '';
	profileimage: string = './../../../../assets/images/default-user-profile-image.jpg';
	
	image_filename_original: string = '';
	image_filename_cropped: string = '';
	image_filename_s3: string = '';
	image_filetype: string = '';
	image_s3url: string = '';

    constructor(
		private modalService: NgbModal,
        public route: ActivatedRoute,
        public router: Router,
		private usersregistrationService: UsersregistrationService,
		private managersboxService: ManagersboxService,
		private changeDetectorRef: ChangeDetectorRef
	) {
		// get values from the query params
		this.route.queryParams.subscribe(params => {
			this.qp_action= params['action'];
			this.qp_userid = params['userid'];
		});
		  
		this.getallactiveteacherprofiles();
		this.getAllUsertypes();
		
		this.modal_contactnumber = '';		// set default
		this.hideLoading_indicator = true;
		this.hide_teacherprofile_dropdown = true;
		this.showpassword = false;
		this.showhide_button='Show';
	}
	
	ngOnInit() {
		this.currentImage = this.imageUrl;
		this.croppieImage = this.imageUrl;

		this.edit_or_new();
		//this.getallUsers();
	}

	edit_or_new(){
		if(this.qp_action == 'edit_user'){
			this.btn_text = 'UPDATE';
			this.getUserByUserid();
		}else{
			this.btn_text = 'SAVE';
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
			this.selected_teacherprofile_data_bkp = [];
			this.hide_teacherprofile_dropdown = true;
			this.currentImage = this.profileimage;
			//this.userModalFormGroup.controls['modal_emailid'].enable();
		}
	}
	
	// get all users
	getUserByUserid() {
		this.hideLoading_indicator = false;
		this.usersregistrationService.getuserbyuserid(this.qp_userid).subscribe(data => {
				if(Object.keys(data).length > 0){
					let user = data[0];
					this.usersubmitaction = 'Update';
					this.modal_id = user._id;
					this.modal_userid = user.userid;
					this.modal_username = user.username;
					this.modal_emailid = user.emailid;
					this.modal_password = user.password;
					this.modal_usertype = user.usertype;
					this.modal_gender = user.gender;
					this.modal_contactno = user.contactnumber;
					this.modal_permanentaddress = user.permanentaddress;
					this.selected_teacherprofile = (user.teacherprofile == undefined || user.teacherprofile == null) ? '' : user.teacherprofile.teachername;
					this.selected_teacherprofile_data = user.teacherprofile;
					this.selected_teacherprofile_data_bkp = user.teacherprofile;
					this.hide_teacherprofile_dropdown = (user.usertype == 'manager') ? true : false;
					this.currentImage = user.image;
				}
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}

	// get all all active teacher profiles
	getallactiveteacherprofiles() {
		this.hideLoading_indicator = false;
		this.usersregistrationService.getallactiveteacherprofiles().subscribe(data => {
				this.teacherprofile_data1 = data;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
  	}

	// get all user types
	getAllUsertypes() {
		this.hideLoading_indicator = false;
		this.usersregistrationService.getallactiveusertypes().subscribe(data => {
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
		this.usersregistrationService.getalluser().subscribe(data => {
				this.data = data;
				this.filterData = data;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}

	// teacher profile auto complete
	onchange_teacherprofile(val: string) {
	}
	onfocus_teacherprofile(e){
		//this.teacherprofile_data2 = this.teacherprofile_data1;
	}
	onselect_teacherprofile(item){
		this.selected_teacherprofile_data = [];
		this.selected_teacherprofile_data = item;
		//this.selected_teacherprofile = (item.teachername == undefined) ? '' : item.teachername;
	}

	teacherprofile_select_btn_click(){
		this.selected_teacherprofile = (this.selected_teacherprofile_data.teachername == undefined) ? '' : this.selected_teacherprofile_data.teachername;
		this.modalReference.close();
	}
	teacherprofile_cancel_btn_click(){
		this.selected_teacherprofile_data = this.selected_teacherprofile_data_bkp;
		this.modalReference.close();
	}

	// selecting user type
	onSelect_modal_usertype(event: Event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
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

	// save user
	formSubmitAction(usersubmitaction) {
		const frm_id = this.modal_id;
		this.profileimage = (this.image_s3url == undefined || this.image_s3url == null || this.image_s3url == '') ? this.profileimage : this.image_s3url ;
		const frm_userid = this.modal_userid;
		const frm_username = this.modal_username;
		const frm_usertype = this.modal_usertype;
		const frm_emailid = this.modal_emailid;
		const frm_password = this.modal_password;
		const frm_status = 'active';
		const frm_contactnumber = this.modal_contactno;
		const frm_gender = 'Male'; //this.modal_gender;
		const frm_dob = '1990-12-30T18:30:00.000+0000';
		const frm_permanentaddress = this.modal_permanentaddress;
		
		// Validation starts from here 
		if(this.modal_username == undefined || this.modal_username == null || this.modal_username == ''){
			swal.fire('Info','Invalid username.','warning');
		}else if(this.modal_contactno == undefined || this.modal_contactno == null || this.modal_contactno == ''){
			swal.fire('Info','Invalid mobile number.','warning');
		}else  if(this.modal_emailid == undefined || this.modal_emailid == null || this.modal_emailid == ''){
			swal.fire('Info','Invalid email id.','warning');
		}else if (!(this.modal_emailid.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/))) {
			swal.fire('Info','Not a valid email id.','warning');
		}else  if(this.modal_password == undefined || this.modal_password == null || this.modal_password == ''){
			swal.fire('Info','Invalid password.','warning');
		}else  if(this.modal_usertype != 'manager' && (this.selected_teacherprofile_data == undefined || this.selected_teacherprofile_data == null || this.selected_teacherprofile_data.length <= 0)){
			swal.fire('Info','Invalid teacher profile.','warning');
		}else{
			const user = {
				userid: frm_emailid,
				username: frm_username,
				usertype: frm_usertype,
				teacherprofile: this.selected_teacherprofile_data,
				emailid: frm_emailid,
				password: frm_password,
				status: frm_status,
				gender: frm_gender,
				dob: frm_dob,
				contactnumber: frm_contactnumber,
				permanentaddress: frm_permanentaddress,
				image: this.profileimage
			};

			// Create New User
			if(usersubmitaction === 'Create' && frm_id === '') {
				// check the emailid is already exist or not
				//this.isMailIdExists(frm_emailid);
				if(!this.checkemailavailability(frm_emailid)){
					swal.fire('Info','Email id already taken.','warning');
					//alert('Email id already taken !!!');
				}else{
					// user['userid'] = frm_emailid;
					this.usersregistrationService.createnewuser(user).subscribe(data => {
							swal.fire('Success','User profile registered successfully.','success');
							this.router.navigate(['/users']);
						},
						error => { },
						() => {}
					);
				}
			// Update Existing User
			} else if (usersubmitaction === 'Update' && frm_id !== '') {
				this.usersregistrationService.updateuser(frm_id, user).subscribe(data => {
						swal.fire('Success','User profile updated successfully.','success');
						this.router.navigate(['/users']);
					},
					error => {},
					() => {}
				);
			} else {
				swal.fire('Info','Data can not be saved.','warning');
			}
		}
	}

	// check mail id is existing or not
	async checkemailavailability(frm_emailid){
		await this.usersregistrationService.checkemailavailability(frm_emailid).subscribe(data => {
				if(Object.keys(data).length > 0){
					if(data['status'] == true)
						return true;
					else
						return false;
				}else{
					return false;
				}
			},
			error => {},
			() => {}
		);

		this.data.forEach(element => {
			if(element.emailid == frm_emailid){
				this.emailid_exists = true;
				return;
			}
		});
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

	// --------------------------------------------------------
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

	// delete user
	deleteFormSubmitAction(id) {
		this.usersregistrationService.deleteuser(id).subscribe(data => {
				this.modalReference.close();
				location.reload();
			},
			error => { },
			() => {}
		);
	}

	// selecting gender
	onSelect_modal_gender(event: Event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.modal_gender = selectedOptionValue;
	}
}
