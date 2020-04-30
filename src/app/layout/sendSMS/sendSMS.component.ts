import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { SendSMSService } from './sendSMS.service';

//import { IDropdownSettings } from 'ng-multiselect-dropdown';
import swal from 'sweetalert2';
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
				//console.log('### getallcontacts: '+JSON.stringify(data));
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
				//console.log('### getallsms: '+JSON.stringify(data));
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
								this.getallcontacts();
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
		//console.log('### multiselect_selectedcontactlist: '+JSON.stringify(this.multiselect_selectedcontactlist));
		let sms_data_arr = [];
		if(this.multiselect_selectedcontactlist.length > 0){
			let count = 0;
			this.multiselect_selectedcontactlist.forEach(contact => {
				//----------------------
				let ob = {};
				ob = {
					mobile: contact.contactnumber,
					message: this.modal_sms_message
				}
				sms_data_arr.push(ob);
				//----------------------
				/*
				if(count == this.multiselect_selectedcontactlist.length-1) this.sms_to_numbers += contact.contactnumber;
				else{
					this.sms_to_numbers += contact.contactnumber+',';
				} 
				count++;
				*/
			});
			
			if(this.modal_sms_message == undefined || this.modal_sms_message == null || this.modal_sms_message == ''){
				swal.fire('Info', 'Invalid message', 'warning');
			}else{
				let sms_obj = {
					sms: this.modal_sms_message,
					tonumbers: this.multiselect_selectedcontactlist
				}
				//this.sendSMS(this.sms_to_numbers, this.modal_sms_message);
				console.log('### sms_data_arr: '+JSON.stringify(sms_data_arr));
				this.sendSMS(sms_data_arr);
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

	//async sendSMS(sms_to_numbers, sms_message){
	async sendSMS(body){
		this.hideLoading_indicator = false;
		await this.sendSMSService.postSMS(body).subscribe(data => {
		//await this.sendSMSService.sendSMS(sms_to_numbers, sms_message).subscribe(data => {
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
				this.getallsms();
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
				this.getallcontacts();
				this.hideLoading_indicator = true;
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



	// Import contacts from csv file part ---------------------------------------------
	@ViewChild('csvReader') csvReader: any; 
	public records: any[] = [];
	no_of_records: number= 0;  

	uploadListener($event: any): void { 
		let files = $event.srcElement.files;  

		if (this.isValidCSVFile(files[0])) {  
		  let input = $event.target;  
		  let reader = new FileReader();  
		  reader.readAsText(input.files[0]); 

		  reader.onload = () => {  
			let csvData = reader.result;  
			let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
			let headersRow = this.getHeaderArray(csvRecordsArray);  
			this.no_of_records = csvRecordsArray.length;
			console.log('@@@ headersRow= '+JSON.stringify(headersRow)); 
			this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length); 
			console.log('@@@ records= '+JSON.stringify(this.records)); 
		  };  
		  reader.onerror = function () {  
			console.log('error is occured while reading file!');  
		  };  
		} else {  
		  alert("Please import valid .csv file.");  
		  this.fileReset();  
		}  
	  }    
  
	  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
		let conactsArr = [];  
		for (let i = 1; i < csvRecordsArray.length; i++) { 
			let contobj = {}; 
		  let curruntRecord = (<string>csvRecordsArray[i]).split(','); 
		  if(curruntRecord.length > 1){
			  if(curruntRecord[1] == undefined || curruntRecord[1] == null || curruntRecord[1].trim() == ''){
				  // do nothing
			  }else{
				contobj = {
					contactname: curruntRecord[0],
					contactnumber: curruntRecord[1]
				}; 
				conactsArr.push(contobj);
			  }
		  }
		}  
		return conactsArr;  
	  }  
	  
	  isValidCSVFile(file: any) {  
		return file.name.endsWith(".csv");  
	  }  
	  
	  getHeaderArray(csvRecordsArr: any) {  
		let headers = (<string>csvRecordsArr[0]).split(',');  
		let headerArray = [];  
		for (let j = 0; j < headers.length; j++) {  
		  headerArray.push(headers[j]);  
		}  
		return headerArray;  
	  }  
	  
	  fileReset() {  
		this.csvReader.nativeElement.value = "";  
		this.records = [];  
	  } 

	async import_contact_button_click(){
		if(this.records.length <= 0){
			swal.fire('Info', 'No contacts found', 'warning')
		}else{
		this.hideLoading_indicator = false;
		await this.sendSMSService.importContacts(this.records).subscribe(data => {
				console.log('### save SMS reponse: '+JSON.stringify(data));
				this.getallcontacts();
				this.hideLoading_indicator = true;
				swal.fire('Success', 'Contacts imported successfully', 'success');
				this.modalReference.close();
				//this.fileReset();
			},
			error => {},
			() => {
				swal.fire('Success', 'Contacts imported successfully', 'success');
				this.modalReference.close();
				//this.fileReset();
			}
		);
		}
	}
}
