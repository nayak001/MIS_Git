import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { SendSMSService } from './sendSMS.service';

//import { IDropdownSettings } from 'ng-multiselect-dropdown';
import swal from 'sweetalert2';

import { environment } from './../../../environments/environment.prod';
const sms_userid = environment.sms_userid;
const sms_password = environment.sms_password;
const sms_senderid1 = environment.sms_senderid1;  
const sms_senderid2 = environment.sms_senderid2;
const sms_send_url = environment.sms_send_url;

@Component({
    selector: 'app-sendSMS',
    templateUrl: './sendSMS.component.html',
    styleUrls: ['./sendSMS.component.scss'],
    animations: [routerTransition()]
})
export class SendSMSComponent implements OnInit {
	sms_api_url_full: string = '';
	sms_to_numbers: string = ''; // comma separated nos. ex: 91xxxxxxxxxx,91xxxxxxxxxx,91xxxxxxxxxxx
	sms_message: string = '';

	allcontactlist: any= [];
	allsmslist: any = [];
	smsid: number = 0;
	
	// multi select settins
	multiselect_contactlist = [];
	multiselect_selectedcontactlist = [];
	multiselect_settings = {};

	// contacts modal
	modal_contact_name: string = '';
	modal_contact_number: string = '';

	// sms modal
	modal_sms_message: string;
	
	modalReference: any;
	closeResult: string;
	hideLoading_indicator: boolean;


    constructor(
		private modalService: NgbModal,
        public router: Router,
		private sendSMSService: SendSMSService
	) {
		this.hideLoading_indicator = true;
		this.getallcontacts();
		this.getallsms();
		this.initialize_multiselect();
	}
	
	ngOnInit() {}

	// --------------------- multi select starts -----------------------
	initialize_multiselect() {
		this.multiselect_selectedcontactlist = [];
		this.multiselect_settings = {
		  singleSelection: false,
		  idField: 'contactnumber',
		  textField: 'contactname',
		  selectAllText: 'Select All',
		  unSelectAllText: 'UnSelect All',
		  itemsShowLimit: 3,
		  allowSearchFilter: true
		};
	  }
	  multiselect_onselectitem(item: any) {}
	  multiselect_onselectall(items: any) {
		this.multiselect_selectedcontactlist = items;
	  }
	// -----------------------------------------------------------------

	async getallcontacts(){
		this.hideLoading_indicator = false;
		this.sendSMSService.getallcontacts().subscribe(data => {
				console.log('### getallcontacts: '+JSON.stringify(data));
				this.allcontactlist = data;
				this.multiselect_contactlist = this.allcontactlist;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}

	async getallsms(){
		this.hideLoading_indicator = false;
		this.sendSMSService.getallsms().subscribe(data => {
				console.log('### getallsms: '+JSON.stringify(data));
				this.allsmslist = data;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}

	save_contact_button_click(){
		if(
			this.modal_contact_name == undefined || this.modal_contact_name == null || this.modal_contact_name == '' ||
			this.modal_contact_number == undefined || this.modal_contact_number == null || this.modal_contact_number == ''
		){
			swal.fire('Info', 'Invalid inputs', 'warning');
		}else{
			this.sendSMSService.findcontactbynmber(this.modal_contact_number).subscribe(data1 => {
					console.log('### res data1: ' + JSON.stringify(data1));
					if(Object.keys(data1).length > 0){
						swal.fire('Info', 'Contact number already exists', 'warning');
					}else{
						this.sendSMSService.createnewcontact({contactname: this.modal_contact_name, contactnumber: this.modal_contact_number}).subscribe(data2 => {
								console.log('### res data2: ' + JSON.stringify(data2));
								swal.fire('Success', 'Contact saved successfully', 'success');
								this.modal_contact_number = '';
								this.modal_contact_name = '';
								//this.modalReference.close();
							},
							error => {console.log('###2 error: ' + JSON.stringify(error)); },
							() => {}
						);
					}
				},
				error => {console.log('###2 error: ' + JSON.stringify(error)); },
				() => {}
			);
		}
	}
	
	send_button_click() {
		console.log('### multiselect_selectedcontactlist: '+JSON.stringify(this.multiselect_selectedcontactlist));
		if(this.multiselect_selectedcontactlist.length > 0){
			let count = 0;
			this.multiselect_selectedcontactlist.forEach(contact => {
				if(count == this.multiselect_selectedcontactlist.length-1) this.sms_to_numbers += contact.contactnumber;
				else this.sms_to_numbers += contact.contactnumber+',';
				count++;
			});
			
			let sms_obj = {
				sms: this.modal_sms_message,
				tonumbers: this.multiselect_selectedcontactlist
			}
			
			if(this.modal_sms_message == undefined || this.modal_sms_message == null || this.modal_sms_message == ''){
				swal.fire('Info', 'Invalid message', 'warning');
			}else{
	
				this.sendSMS(this.sms_to_numbers, this.modal_sms_message);
				this.saveSMS(sms_obj);
				this.multiselect_selectedcontactlist = [];
				this.sms_to_numbers = '';
				this.modal_sms_message = '';
				this.modalReference.close();
			}
		}else{
			this.sms_to_numbers = '';
			swal.fire('Info', 'Select some user, who will get this SMS', 'warning');
		}
	}

	async sendSMS(sms_to_numbers, sms_message){
		this.sms_api_url_full = sms_send_url+'?usr='+sms_userid+'&pwd='+sms_password+'&sndr='+sms_senderid1+'&ph='+sms_to_numbers+'&message='+sms_message;

		this.hideLoading_indicator = false;
		await this.sendSMSService.sendSMS(sms_to_numbers, sms_message).subscribe(data => {
				console.log('### send SMS reponse: '+JSON.stringify(data));
				this.hideLoading_indicator = true;
				swal.fire('Success', 'Message sent successfully', 'success');
				this.modalReference.close();
			},
			error => {},
			() => {
				this.sms_to_numbers = '';
				this.modal_sms_message = '';
			}
		);
	}

	async saveSMS(sms_obj){
		this.hideLoading_indicator = false;
		await this.sendSMSService.saveSMS(sms_obj).subscribe(data => {
				console.log('### save SMS reponse: '+JSON.stringify(data));
				this.hideLoading_indicator = true;
				//swal.fire('Success', 'Message sent successfully', 'success');
				this.modalReference.close();
			},
			error => {},
			() => {
				this.sms_to_numbers = '';
				this.modal_sms_message = '';
			}
		);
	}

	async delete_contact_btn_click(contact_obj){
		console.log('### delete contactbyid reponse: '+JSON.stringify(contact_obj));
		this.hideLoading_indicator = false;
		await this.sendSMSService.deletecontactbyid(contact_obj._id).subscribe(data => {
				console.log('### delete contactbyid reponse: '+JSON.stringify(data));
				this.hideLoading_indicator = true;
				this.getallcontacts();
				swal.fire('Success', 'Contact deleted successfully', 'success');
				this.modalReference.close();
			},
			error => {},
			() => {
				this.sms_to_numbers = '';
				this.modal_sms_message = '';
			}
		);
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
