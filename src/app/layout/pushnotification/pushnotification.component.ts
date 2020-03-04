import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PushnotificationService, ValidationService } from './pushnotification.service';
import { environment } from './../../../environments/environment.prod';

const teacherappAuthkey = environment.teacherappAuthkey;

@Component({
    selector: 'app-pushnotification',
    templateUrl: './pushnotification.component.html',
    styleUrls: ['./pushnotification.component.scss'],
    animations: [routerTransition()]
})
export class PushnotificationComponent implements OnInit {
	pushModalFormGroup: FormGroup;
	
	availabledevices: any = [];
	allnotifications: any = [];
	public data : any;
	public filterData : any;
	closeResult: string;
	model: any;
	hideLoading_indicator: boolean;

	
	modalReference: any;
	modal_id: string;
	modal_userid: string;
	modal_push_title: string;
	modal_push_subtitle: string;
	modal_push_message: string;

	notificationid: number = 0;

    constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder,
        private translate: TranslateService,
        public router: Router,
		private pushnotificationService: PushnotificationService
	) {
		this.hideLoading_indicator = true;
		
		this.pushModalFormGroup = this.formBuilder.group({
			modal_id: ['', []],
			modal_push_title: ['', [Validators.required]],
			modal_push_subtitle: ['', [Validators.required]],
			modal_push_message: ['', [Validators.required]]
		});
	}
	
	ngOnInit() {
		this.hideLoading_indicator = false;
		this.pushnotificationService.getallfcmtokenmessages().subscribe(data => {
				console.log('### data: '+JSON.stringify(data));
				this.allnotifications = data;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
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
	
	// send notification
	async formSubmitAction() {
		this.notificationid = new Date().getTime();
		// get all available devices
		this.hideLoading_indicator = false;
		
		await this.pushnotificationService.getallavailabledevices().subscribe(data => {
				console.log('### all available devices: '+JSON.stringify(data));
				this.availabledevices = data;

				this.availabledevices.forEach(async item => {
					this.send_notification_to_each_device(item);
				});

				this.hideLoading_indicator = true;
				
			},
			error => {},
			() => {
				//this.modalReference.close();
				//location.reload();
				alert('Message successfully sent !!!');
				this.modal_push_title = '';
				this.modal_push_subtitle = '';
				this.modal_push_message = '';
			}
		);
		
	}

	async send_notification_to_each_device(item: any) {
		// device id or token id
		let token_id = item.token;

		// header with auth key
		let header = {
			'Content-Type': 'application/json',
			'Authorization': teacherappAuthkey
		};

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
				console.log('### send msg response: '+JSON.stringify(data));
				this.save_notification_data_to_db(data_tobe_save);
			},
			error => {},
			() => {}
		);	
	}

	async save_notification_data_to_db(item: any) {
		await this.pushnotificationService.createnewfcmtokenmessage(item).subscribe(data => {
				console.log('### saving msg to db response: '+JSON.stringify(data));
			},
			error => {},
			() => {}
		);
	}

	
	deleteFormSubmitAction(element) {
		let id = element._id;

		if(this.allnotifications.includes(element)){
			let ind = this.allnotifications.indexOf(element);
			console.log('$$$ index: '+ind);
			this.allnotifications.splice(ind,1);
		}
		console.log('### id: ' + id);
		this.pushnotificationService.deletefcmtokenmessage(id).subscribe(data => {
				console.log('### res data: ' + JSON.stringify(data));
				this.modalReference.close();
				//location.reload();
			},
			error => {console.log('###2 error: ' + JSON.stringify(error)); },
			() => {}
		);
	}
}
