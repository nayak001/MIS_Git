import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PushnotificationService } from './pushnotification.service';
import { environment } from './../../../environments/environment.prod';

//import { IDropdownSettings } from 'ng-multiselect-dropdown';
import swal from 'sweetalert2';

const teacherappAuthkey = environment.teacherappAuthkey;

@Component({
    selector: 'app-pushnotification',
    templateUrl: './pushnotification.component.html',
    styleUrls: ['./pushnotification.component.scss'],
    animations: [routerTransition()]
})
export class PushnotificationComponent implements OnInit {
	alluserlist: any= [];
	allmanagers: any= [];
	allteachers: any= [];
	availabledevices: any = [];
	allnotifications: any = [];
	public data : any;
	public filterData : any;
	closeResult: string;
	model: any;
	hideLoading_indicator: boolean;
	selected_apptype: string = '';

	modalReference: any;
	modal_id: string;
	modal_userid: string;
	modal_push_title: string;
	modal_push_subtitle: string;
	modal_push_message: string;

	notificationid: number = 0;

	// multi select settings
	multiselect_userlist = [];
	multiselect_selecteduserlist = [];
	multiselect_settings = {};
	
	multiselect_applist = [{appid: 'teacherapp', appname: 'Teacher App'}, {appid: 'managerapp', appname: 'Support App'}];
	multiselect_selectedapplist = [];
	multiselect_settings_applist = {};

    constructor(
		private modalService: NgbModal,
        public router: Router,
		private pushnotificationService: PushnotificationService
	) {
		this.hideLoading_indicator = true;
	}
	
	ngOnInit() {
		this.getallteacherslist();
		this.getallmanagerslist();
		this.getallfcmtokenmessages();
		this.initialize_multiselect();
		this.initialize_applist_multiselect();
	}

	async getallteacherslist(){
		this.hideLoading_indicator = false;
		this.pushnotificationService.getallteachers().subscribe(data => {
			this.allteachers = data;
			//this.alluserlist = data;
			//this.multiselect_userlist = this.alluserlist;
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
	}

	async getallmanagerslist(){
		this.hideLoading_indicator = false;
		this.pushnotificationService.getallmanager().subscribe(data => {
			this.allmanagers = data;
			//this.alluserlist = data;
			//this.multiselect_userlist = this.alluserlist;
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
	}

	async getallfcmtokenmessages(){
		this.hideLoading_indicator = false;
		this.pushnotificationService.getallfcmtokenmessages().subscribe(data => {
			this.allnotifications = data;
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
	}

	// --------------------- multi select starts -----------------------
	// app type multiselect
	initialize_applist_multiselect() {
		this.multiselect_selectedapplist = [];
		this.multiselect_settings_applist = {
		  singleSelection: true,
		  idField: 'appid',
		  textField: 'appname',
		  selectAllText: 'Select All',
		  unSelectAllText: 'UnSelect All',
		  itemsShowLimit: 3,
		  allowSearchFilter: true,
		  closeDropDownOnSelection: true
		};
	}
	multiselect_applist_onselectitem(item: any) {
		this.selected_apptype = item.appid;
		if(this.multiselect_selectedapplist == undefined || this.multiselect_selectedapplist == null || this.multiselect_selectedapplist.length <= 0){
			this.alluserlist = [];
		}else if(this.multiselect_selectedapplist[0].appid == 'teacherapp'){
			this.alluserlist = this.allteachers;
		}else if(this.multiselect_selectedapplist[0].appid == 'managerapp'){
			this.alluserlist = this.allmanagers;
		}
		this.multiselect_userlist = this.alluserlist;
	}
	multiselect_applist_ondeselectitem(item: any) {
		this.selected_apptype = '';
		this.alluserlist = [];
		this.multiselect_userlist = this.alluserlist;
	}
	multiselect_applist_onselectall(items: any) {
		this.multiselect_selectedapplist = items;
	}

	//---------
	// user type multiselect
	initialize_multiselect() {
		//this.multiselect_userlist = this.alluserlist;
		this.multiselect_selecteduserlist = [];
		this.multiselect_settings = {
		  singleSelection: false,
		  idField: 'userid',
		  textField: 'username',
		  selectAllText: 'Select All',
		  unSelectAllText: 'UnSelect All',
		  itemsShowLimit: 3,
		  allowSearchFilter: true
		};
	}
	multiselect_onselectitem(item: any) {}
	multiselect_onselectall(items: any) {
		this.multiselect_selecteduserlist = items;
	}
	// -----------------------------------------------------------------
	/*
	onSelect_apptype_select(event: Event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.selected_apptype = selectedOptionValue;
	}
	*/
	
	// send notification
	send_button_click() {
		if(this.selected_apptype == undefined || this.selected_apptype == null || this.selected_apptype == ''){
			swal.fire('Info','Invalid app type','warning');
		}else if(this.multiselect_selecteduserlist == undefined || this.multiselect_selecteduserlist == null || this.multiselect_selecteduserlist.length <= 0){
			swal.fire('Info','Select some user, who will get this notification','warning');
		}else if(this.modal_push_title == undefined || this.modal_push_title == null || this.modal_push_title.trim() == ''){
			swal.fire('Info','Invalid notification title','warning');
		}else if(this.modal_push_message == undefined || this.modal_push_message == null || this.modal_push_message.trim() == ''){
			swal.fire('Info','Invalid notification message','warning');
		}else{
			if(this.selected_apptype == 'teacherapp'){
				this.send_notification_to_teacherapp();
			}else if(this.selected_apptype == 'managerapp'){
				this.send_notification_to_managerapp();
			}else{
				// do nothing
			}
		}
	}
	
	async send_notification_to_teacherapp(){
		this.notificationid = new Date().getTime();
		// get all available devices
		this.hideLoading_indicator = false;
		
		let selected_userids = this.multiselect_selecteduserlist.map(ele => ele.userid);
		await this.pushnotificationService.getfcmtokenidbymultipleuserid(selected_userids).subscribe(data => {
			this.availabledevices = data;
			this.availabledevices.forEach(async item => {
				this.send_notification_to_each_device(item);
			});
			this.hideLoading_indicator = true;
		},error => {},() => {
			//this.modalReference.close();
			//location.reload();
			swal.fire('Success','Message successfully sent','success');
			this.modal_push_title = '';
			this.modal_push_subtitle = '';
			this.modal_push_message = '';
		});
	}

	async send_notification_to_managerapp(){
		let body = {
			userid : this.multiselect_selecteduserlist,
			title: this.modal_push_title,
			body: this.modal_push_message
		}	
		await this.pushnotificationService.addusernotification(body).subscribe(data => {
			swal.fire('Success','Notification sent successfully','success');

			// clear all fields and close modal
			//this.selected_apptype = 'teacherapp';
			this.multiselect_selecteduserlist = [];
			this.modal_push_title = '';
			this.modal_push_message = '';
			this.modalReference.close();
		},error => {},() => {});	
	}

	async send_notification_to_each_device(item: any) {
		// device id or token id
		let token_id = item.token;
		// header with auth key
		let header = {'Content-Type': 'application/json','Authorization': teacherappAuthkey};

		// request body
		let body = {
			"notification":{
				"title":this.modal_push_title,
				"body":this.modal_push_subtitle,
				"sound":"default",
				"click_action":"FCM_PLUGIN_ACTIVITY",
				"icon":"fcm_push_icon"
			},
			"data":{
				"message":this.modal_push_message
			},
			"to":token_id,
			"priority":"high",
			"restricted_package_name":""
		};

		let data_tobe_save = {
			notificationid: this.notificationid,
			userid: item.userid,
			username: item.username,
			title:this.modal_push_title,
			body:this.modal_push_subtitle,
			message:this.modal_push_message,
			status:'na'
		}
			
		await this.pushnotificationService.sendpushnotification(body, header).subscribe(data => {
			this.save_notification_data_to_db(data_tobe_save);
		},error => {},() => {});	
	}

	async save_notification_data_to_db(item: any) {
		await this.pushnotificationService.createnewfcmtokenmessage(item).subscribe(data => {},error => {},() => {});
	}

	deleteFormSubmitAction(element) {
		let id = element._id;

		if(this.allnotifications.includes(element)){
			let ind = this.allnotifications.indexOf(element);
			this.allnotifications.splice(ind,1);
		}
		this.pushnotificationService.deletefcmtokenmessage(id).subscribe(data => {
			this.modalReference.close();
			//location.reload();
		},error => {},() => {});
	}

    open(content) {
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
