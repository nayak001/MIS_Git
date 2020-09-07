import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Masterteachertraining1Service, ValidationService } from './masterteachertraining1.service';

@Component({
    selector: 'app-masterteachertraining1',
    templateUrl: './masterteachertraining1.component.html',
    styleUrls: ['./masterteachertraining1.component.scss'],
    animations: [routerTransition()]
})
export class Masterteachertraining1Component implements OnInit {
	// module
	public allmodules_list : any;
	module_id: string = '';
	moduleid: string = '';
	modulename_tosave: string ='';
	modulename_toupdate: string ='';
	modulename_todelete: string ='';

	// sub-modules
	public allsubmodules_list : any;
	submodule_id: string = '';
	submodule_moduleid: string = '';
	submodule_modulename: string ='';
	submoduleid: string ='';
	submodulename_tosave: string ='';
	submodulename_toupdate: string ='';
	submodulename_todelete: string ='';
	selected_submodule_moduleid: string = '';
	selected_submodule_modulename: string ='';
	selected_submodule_id: string = '';
	subtopicname_tosave: string ='';
	public alltopic_list:any;
	topic_id:any;
	topicname_todelete:any;
	topic_toupdate:any;
	submodule_topic_id:any;
	public data : any;
	closeResult: string;
	hideLoading_indicator1: boolean;
	hideLoading_indicator2: boolean;
	hideLoading_indicator3: boolean;
	modalReference: any;

    constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder,
        private translate: TranslateService,
        public router: Router,
		private masterteachertraining1Service: Masterteachertraining1Service
	) {
		this.hideLoading_indicator1 = true;
		this.hideLoading_indicator2 = true;
		this.hideLoading_indicator3=true;
	}
	
	ngOnInit() {
		this.load_allmodules_list();
	}

	// modules part
	load_allmodules_list(){
		this.hideLoading_indicator1 = false;
		this.masterteachertraining1Service.getalltrainingmodules().subscribe(data => {
				this.allmodules_list = data;
				this.hideLoading_indicator1 = true;
			},
			error => {},
			() => {}
		);
	}

	savemodule_btnclick(){
		this.modulename_tosave = this.modulename_tosave.toUpperCase().toLowerCase();
		if(this.modulename_tosave == undefined || this.modulename_tosave == null || this.modulename_tosave == ''){
			alert('Module name can not be empty');
		}else{
			this.hideLoading_indicator1 = false;
			this.masterteachertraining1Service.findtrainingmodulebyname(this.modulename_tosave).subscribe(data => {
					this.hideLoading_indicator1 = true;

					if(Object.keys(data).length > 0){
						alert('Module name already exists.')
					}else{
						let curr_date = new Date();
						let modulebody = {
							moduleid: curr_date.getTime(),
							modulename: this.modulename_tosave
						}
						this.masterteachertraining1Service.createnewtrainingmodule(modulebody).subscribe(data => {
								this.hideLoading_indicator1 = true;
								this.load_allmodules_list();
								this.modulename_tosave ='';
							},
							error => {},
							() => {}
						);
					}
				},
				error => {},
				() => {}
			);
		}
	}

	updatemodule_btnclick(){
		this.modulename_toupdate = this.modulename_toupdate.toUpperCase().toLowerCase();
		if(this.modulename_toupdate == undefined || this.modulename_toupdate == null || this.modulename_toupdate == ''){
			alert('Module name can not be empty');
		}else{
			this.hideLoading_indicator1 = false;
			this.masterteachertraining1Service.findtrainingmodulebyname(this.modulename_toupdate).subscribe(data => {
					this.hideLoading_indicator1 = true;

					if(Object.keys(data).length > 0){
						alert('Module name already exists.')
					}else{
						let modulebody = {
							moduleid: this.moduleid,
							modulename: this.modulename_toupdate
						}
						this.masterteachertraining1Service.updatetrainingmodulebyid(this.module_id, modulebody).subscribe(data => {
								this.modalReference.close();
								this.hideLoading_indicator1 = true;
								this.load_allmodules_list();
								this.modulename_toupdate ='';
							},
							error => {},
							() => {}
						);
					}
				},
				error => {},
				() => {}
			);
		}
	}

	deletemodule_btnclick(){
		this.masterteachertraining1Service.deletetrainingmodulebyid(this.module_id).subscribe(data => {
				// delete sub module records
				this.masterteachertraining1Service.deletetrainingsubmodulebymoduleid(this.selected_submodule_moduleid).subscribe(data => {
				},error => {},() => {});

				this.modalReference.close();
				this.hideLoading_indicator1 = true;
				this.load_allmodules_list();
				this.load_allsubmodules_list("");
				this.modulename_todelete ='';
			},
			error => {},
			() => {}
		);
	}

	// sub modules part
	onselect_modules_select(event: Event){
    	let selectedOptions = event.target['options'];
		let selectedIndex = selectedOptions.selectedIndex;
		let selectedOptionValue = selectedOptions[selectedIndex].value;
		let selectElementText = selectedOptions[selectedIndex].text;
		this.selected_submodule_moduleid = selectedOptionValue;
		this.selected_submodule_modulename = selectElementText;
		this.alltopic_list = [];
		this.load_allsubmodules_list(this.selected_submodule_moduleid);
	}
	onselect_sub_modules_select(event: Event){
		let selectedOption = event.target['options'];
		let selectedindex = selectedOption.selectedIndex;
		let selectedoptionValue = selectedOption[selectedindex].value;
		let selectElement = selectedOption[selectedindex].text;
		this.selected_submodule_id = selectedoptionValue;
		this.load_alltopic_list(this.selected_submodule_id);
		
	}
	load_alltopic_list(submoduleid){
		if(submoduleid != undefined && submoduleid != null && submoduleid != ''){
			this.hideLoading_indicator3 = false;
			this.masterteachertraining1Service.getalltrainingtopics(this.selected_submodule_id).subscribe(data => {
					this.alltopic_list = data;
					this.hideLoading_indicator3 = true;
				},
				error => {},
				() => {}
			);
		}else{
			this.alltopic_list = [];
		}
	}
	load_allsubmodules_list(moduleid){
		if(moduleid != undefined && moduleid != null && moduleid != ''){
			this.hideLoading_indicator2 = false;
			this.masterteachertraining1Service.getalltrainingsubmodules(moduleid).subscribe(data => {
					this.allsubmodules_list = data;
					this.hideLoading_indicator2 = true;
				},
				error => {},
				() => {}
			);
		}else{
			this.allsubmodules_list = [];
		}
	}

	savesubmodule_btnclick(){
		this.submodulename_tosave = this.submodulename_tosave.toUpperCase().toLowerCase();
		if(this.submodulename_tosave == undefined || this.submodulename_tosave == null || this.submodulename_tosave == ''){
			alert('Sub-module name can not be empty');
		}else{
			this.hideLoading_indicator2 = false;
			this.masterteachertraining1Service.findtrainingsubmodulebyname(this.selected_submodule_moduleid, this.submodulename_tosave).subscribe(data => {
					this.hideLoading_indicator2 = true;

					if(Object.keys(data).length > 0){
						alert('Sub-module name already exists.')
					}else{
						let curr_date = new Date();
						let submodulebody = {
							moduleid: this.selected_submodule_moduleid,
							modulename: this.selected_submodule_modulename,
							submoduleid: curr_date.getTime(),
							submodulename: this.submodulename_tosave
						}
						this.masterteachertraining1Service.createnewtrainingsubmodule(submodulebody).subscribe(data => {
								this.hideLoading_indicator2 = true;
								this.load_allsubmodules_list(this.selected_submodule_moduleid);
								this.submodulename_tosave ='';
							},
							error => {},
							() => {}
						);
					}
				},
				error => {},
				() => {}
			);
		}
	}

	updatesubmodule_btnclick(){
		this.submodulename_toupdate = this.submodulename_toupdate.toUpperCase().toLowerCase();
		if(this.submodulename_toupdate == undefined || this.submodulename_toupdate == null || this.submodulename_toupdate == ''){
			alert('Sub-module name can not be empty');
		}else{
			this.hideLoading_indicator2 = false;
			this.masterteachertraining1Service.findtrainingsubmodulebyname(this.selected_submodule_moduleid, this.submodulename_toupdate).subscribe(data => {
					this.hideLoading_indicator2 = true;

					if(Object.keys(data).length > 0){
						alert('Sub-module name already exists.')
					}else{
						let modulebody = {
							moduleid: this.submodule_moduleid,
							modulename: this.submodule_modulename,
							submoduleid: this.submoduleid,
							submodulename: this.submodulename_toupdate
						}
						this.masterteachertraining1Service.updatetrainingsubmodulebyid(this.submodule_id, modulebody).subscribe(data => {
								this.modalReference.close();
								this.hideLoading_indicator2 = true;
								this.load_allsubmodules_list(this.selected_submodule_moduleid);
								this.submodulename_toupdate ='';
							},
							error => {},
							() => {}
						);
					}
				},
				error => {},
				() => {}
			);
		}
	}

	deletesubmodule_btnclick(){
		this.masterteachertraining1Service.deletetrainingsubmodulebyid(this.submodule_id).subscribe(data => {
				this.modalReference.close();
				this.hideLoading_indicator2 = true;
				this.load_allsubmodules_list(this.selected_submodule_moduleid);
				this.submodulename_todelete ='';
			},
			error => {},
			() => {}
		);
	}
	savesubtopic_btnclick(){
		this.subtopicname_tosave = this.subtopicname_tosave.toUpperCase().toLowerCase();
		if(this.subtopicname_tosave == undefined || this.subtopicname_tosave == null || this.subtopicname_tosave == ''){
			alert('Topic name can not be empty');
		}else if(this.selected_submodule_id == ''){
			alert('Select submodule');
		}else{
			this.hideLoading_indicator2 = false;
			this.masterteachertraining1Service.findtrainingtopicbyname(this.selected_submodule_id, this.subtopicname_tosave).subscribe(data => {
					this.hideLoading_indicator2 = true;
					if(data['check'] == false){
						alert('Topic name already exists.')
					}else{
						let curr_date = new Date();
						let subtopicbody = {
							topicid:curr_date.getTime(),
							submoduleid: this.selected_submodule_id,
							topicname: this.subtopicname_tosave
						}
						this.masterteachertraining1Service.createnewtrainingtopic(subtopicbody).subscribe(data => {
								this.hideLoading_indicator3 = true;
								this.load_alltopic_list(this.selected_submodule_moduleid);
								this.subtopicname_tosave ='';
							},
							error => {},
							() => {}
						);
					}
				},
				error => {},
				() => {}
			);
		}
	}
	updatetopic_btnclick(){
		this.topic_toupdate = this.topic_toupdate.toUpperCase().toLowerCase();
		if(this.topic_toupdate == undefined || this.topic_toupdate == null || this.topic_toupdate == ''){
			alert('topic name can not be empty');
		}else{
			this.hideLoading_indicator3 = false;
			this.masterteachertraining1Service.findtrainingtopicbyname(this.selected_submodule_id, this.topic_toupdate).subscribe(data => {
					this.hideLoading_indicator2 = true;

					if(data['check'] == false){
						alert('Topic name already exists.')
					}else{
						let body = {
							submoduleid: this.selected_submodule_id,
							topicid: this.topic_id,
							topicname: this.topic_toupdate
						}
						this.masterteachertraining1Service.updatetrainingtopicbyid(this.submodule_topic_id, body).subscribe(data => {
								this.modalReference.close();
								this.hideLoading_indicator3 = true;
								this.load_alltopic_list(this.selected_submodule_moduleid);
								this.topic_toupdate ='';
							},
							error => {},
							() => {}
						);
					}
				},
				error => {},
				() => {}
			);
		}
	}

	deletetopic_btnclick(){
		this.masterteachertraining1Service.deletetrainingtopicbyid(this.submodule_topic_id).subscribe(data => {
				this.modalReference.close();
				this.hideLoading_indicator3 = true;
				this.load_alltopic_list(this.selected_submodule_moduleid);
				this.topicname_todelete ='';
			},
			error => {},
			() => {}
		);
	}
	back_btn_click(){
		this.router.navigate(['/masterteachertraining2']);
	}

	// ----------------------------------------------
	open(content,module, flag) {
		if(flag == 'edit_module'){
			this.module_id = module._id;
			this.moduleid= module.moduleid;
			this.modulename_toupdate = module.modulename;
		}else if(flag == 'delete_module'){ 
			this.module_id = module._id;
			this.modulename_todelete = module.modulename;
		}else if(flag == 'edit_submodule'){
			this.submodule_id = module._id;
			this.submodule_moduleid = module.moduleid;
			this.submodule_modulename = module.modulename;
			this.submoduleid = module.submoduleid;
			this.submodulename_toupdate = module.submodulename;
		}else if(flag == 'delete_submodule'){ 
			this.submodule_id = module._id;
			this.submodulename_todelete = module.submodulename;
		} else if(flag == 'edit_topic'){
			this.submodule_topic_id = module._id;
			this.topic_id = module.topicid;
			this.topic_toupdate = module.topicname;
		}else if(flag == 'delete_topic'){
			this.submodule_topic_id = module._id;
			this.topic_id = module._id;
			this.topicname_todelete = module.topicname;
		}
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
