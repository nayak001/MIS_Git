import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PreprogramtrainingService, ValidationService } from './preprogramtrainingmodules.service';
import { environment } from './../../../environments/environment.prod';
const teacherappAuthkey = environment.teacherappAuthkey;
import swal from 'sweetalert2';
@Component({
    selector: 'app-preprogramtrainingmodules',
    templateUrl: './preprogramtrainingmodules.component.html',
    styleUrls: ['./preprogramtrainingmodules.component.scss'],
    animations: [routerTransition()]
})
export class PreprogramTrainingComponent implements OnInit {
	// module
	selected_preflanguage:any;
	public allmodules_list : any;
	module_id: string = '';
	moduleid: string = '';
	modulename_tosave: string ='';
	modulename_toupdate: string ='';
	modulename_todelete: string ='';
	isSelected:boolean=true;
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

	// enable/ disable save button
	disable_button: boolean = false;
	modalReference: any;
    constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder,
        private translate: TranslateService,
        public router: Router,
		private preprogramteachertrainingService: PreprogramtrainingService
	) {
		this.hideLoading_indicator1 = true;
		this.hideLoading_indicator2 = true;
		this.hideLoading_indicator3=true;
		this.selected_preflanguage = 'od'
	}
	
	ngOnInit() {
		this.load_allmodules_list(this.selected_preflanguage);
	}

	// modules part
	load_allmodules_list(language){
		this.hideLoading_indicator1 = false;
		this.preprogramteachertrainingService.getallppttrainingmodules(language).subscribe(data => {
				this.allmodules_list = data;
				this.hideLoading_indicator1 = true;
			},
			error => {},
			() => {}
		);
	}

	savemodule_btnclick(){
		this.disable_button = true;
		this.modulename_tosave = this.modulename_tosave.toUpperCase().toLowerCase();
		if(this.selected_preflanguage == '' || this.selected_preflanguage == null){
			swal.fire('Info','Select prefered language','warning');
			this.disable_button = false;
		}else if(this.modulename_tosave == undefined || this.modulename_tosave == null || this.modulename_tosave == ''){
			swal.fire('Info','Module name can not be empty','warning');
			this.disable_button = false;
		}else{
			this.hideLoading_indicator1 = false;
			this.preprogramteachertrainingService.findppttrainingmodulebyname(this.modulename_tosave).subscribe(data => {
				this.hideLoading_indicator1 = true;
				if(Object.keys(data).length > 0){
					swal.fire('Info','Module name already exists.','warning');
					this.disable_button = false;
				}else{
					let curr_date = new Date();
					let modulebody = {
						moduleid: curr_date.getTime(),
						modulename: this.modulename_tosave,
						language:this.selected_preflanguage
					}
					this.preprogramteachertrainingService.createnewppttrainingmodule(modulebody).subscribe(data => {
							this.hideLoading_indicator1 = true;
							this.load_allmodules_list(this.selected_preflanguage);
							this.modulename_tosave ='';
							this.disable_button = false;
					},error => {},() => {this.disable_button = false;});
				}
			},error => {},() => {this.disable_button = false;});
		}
	}
    preflanguage_select_onchange(event) {
		this.allsubmodules_list = [];
		this.alltopic_list = [];
		this.hideLoading_indicator1 = false;
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.selected_preflanguage = selectedOptionValue;
		if(this.selected_preflanguage !=''){
			this.preprogramteachertrainingService.getallppttrainingmodules(this.selected_preflanguage).subscribe(data => {
				if(data){
					this.allmodules_list = data;
				}else{
					this.allmodules_list = '';
					this.allsubmodules_list = '';
					this.alltopic_list = '';
				}
				this.hideLoading_indicator1 = true;
			},
			error => {},
			() => {}
		  );
		}
	  }
	updatemodule_btnclick(){
		this.modulename_toupdate = this.modulename_toupdate.toUpperCase().toLowerCase();
		if(this.modulename_toupdate == undefined || this.modulename_toupdate == null || this.modulename_toupdate == ''){
			swal.fire('Info','Module name can not be empty','warning');
		}else{
			this.hideLoading_indicator1 = false;
			this.preprogramteachertrainingService.findppttrainingmodulebyname(this.modulename_toupdate).subscribe(data => {
					this.hideLoading_indicator1 = true;

					if(Object.keys(data).length > 0){
						swal.fire('Info','Module name already exists.','warning')
					}else{
						let modulebody = {
							moduleid: this.moduleid,
							modulename: this.modulename_toupdate,
							language:this.selected_preflanguage
						}
						this.preprogramteachertrainingService.updateppttrainingmodulebyid(this.module_id, modulebody).subscribe(data => {
								this.modalReference.close();
								this.hideLoading_indicator1 = true;
								this.load_allmodules_list(this.selected_preflanguage);
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
		this.preprogramteachertrainingService.deleteppttrainingmodulebyid(this.module_id).subscribe(data => {
				// delete sub module records
				this.preprogramteachertrainingService.deletetrainingsubmodulebymoduleid(this.selected_submodule_moduleid).subscribe(data => {
				},error => {},() => {});

				this.modalReference.close();
				this.hideLoading_indicator1 = true;
				this.load_allmodules_list(this.selected_preflanguage);
				this.load_allsubmodules_list(this.selected_submodule_moduleid,this.selected_preflanguage);
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
		this.load_allsubmodules_list(this.selected_submodule_moduleid,this.selected_preflanguage);
	}
	selected_submodule_name:any;
	onselect_sub_modules_select(event: Event){
		let selectedOption = event.target['options'];
		let selectedindex = selectedOption.selectedIndex;
		let selectedoptionValue = selectedOption[selectedindex].value;
		let selectElement = selectedOption[selectedindex].text;
		this.selected_submodule_name = selectElement;
		this.selected_submodule_id = selectedoptionValue;
		this.load_alltopic_list(this.selected_submodule_id,this.selected_preflanguage);
		
	}
	load_alltopic_list(submoduleid,language){
		if(submoduleid != undefined && submoduleid != null && submoduleid != ''){
			this.hideLoading_indicator3 = false;
			this.preprogramteachertrainingService.getallppttrainingtopics(this.selected_submodule_id,language).subscribe(data => {
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
	load_allsubmodules_list(moduleid,language){
		if(moduleid != undefined && moduleid != null && moduleid != ''){
			this.hideLoading_indicator2 = false;
			this.preprogramteachertrainingService.getallppttrainingsubmodules(moduleid,this.selected_preflanguage).subscribe(data => {
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
		this.disable_button = true;
		this.submodulename_tosave = this.submodulename_tosave.toUpperCase().toLowerCase();
		if(this.selected_submodule_moduleid == undefined || this.selected_submodule_moduleid == null || this.selected_submodule_moduleid == ''){
			swal.fire('Info','Please select a module.','warning');
			this.disable_button = false;
		}else if(this.submodulename_tosave == undefined || this.submodulename_tosave == null || this.submodulename_tosave == ''){
			swal.fire('Info','Sub-module name can not be empty','warning');
			this.disable_button = false;
		}else{
			this.hideLoading_indicator2 = false;
			this.preprogramteachertrainingService.findppttrainingsubmodulebyname(this.selected_submodule_moduleid, this.submodulename_tosave).subscribe(data => {
				this.hideLoading_indicator2 = true;
				if(Object.keys(data).length > 0){
					swal.fire('Info','Sub-module name already exists.','warning');
					this.disable_button = false;
				}else{
					let curr_date = new Date();
					let submodulebody = {
						moduleid: this.selected_submodule_moduleid,
						modulename: this.selected_submodule_modulename,
						submoduleid: curr_date.getTime(),
						submodulename: this.submodulename_tosave,
						language:this.selected_preflanguage
					}
					this.preprogramteachertrainingService.createpptnewtrainingsubmodule(submodulebody).subscribe(data => {
							this.hideLoading_indicator2 = true;
							this.load_allsubmodules_list(this.selected_submodule_moduleid,this.selected_preflanguage);
							this.submodulename_tosave ='';
							this.disable_button = false;
					},error => {},() => {this.disable_button = false;});
				}
			},error => {},() => {this.disable_button = false;});
		}
	}

	updatesubmodule_btnclick(){
		this.submodulename_toupdate = this.submodulename_toupdate.toUpperCase().toLowerCase();
		if(this.submodulename_toupdate == undefined || this.submodulename_toupdate == null || this.submodulename_toupdate == ''){
			swal.fire('Info','Sub-module name can not be empty','warning');
		}else{
			this.hideLoading_indicator2 = false;
			this.preprogramteachertrainingService.findppttrainingsubmodulebyname(this.selected_submodule_moduleid, this.submodulename_toupdate).subscribe(data => {
					this.hideLoading_indicator2 = true;

					if(Object.keys(data).length > 0){
						swal.fire('Info','Sub-module name already exists.','warning')
					}else{
						let modulebody = {
							moduleid: this.submodule_moduleid,
							modulename: this.submodule_modulename,
							submoduleid: this.submoduleid,
							submodulename: this.submodulename_toupdate,
							language:this.selected_preflanguage
						}
						this.preprogramteachertrainingService.updateppttrainingsubmodulebyid(this.submodule_id, modulebody).subscribe(data => {
								this.modalReference.close();
								this.hideLoading_indicator2 = true;
								this.load_allsubmodules_list(this.selected_submodule_moduleid,this.selected_preflanguage);
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
		this.preprogramteachertrainingService.deleteppttrainingsubmodulebyid(this.submodule_id).subscribe(data => {
				this.modalReference.close();
				this.hideLoading_indicator2 = true;
				this.load_allsubmodules_list(this.selected_submodule_moduleid,this.selected_preflanguage);
				this.submodulename_todelete ='';
			},
			error => {},
			() => {}
		);
	}
	savesubtopic_btnclick(){
		this.disable_button = true;
		this.subtopicname_tosave = this.subtopicname_tosave.toUpperCase().toLowerCase();
		if(this.selected_submodule_id == undefined || this.selected_submodule_id == null ||this.selected_submodule_id == ''){
			swal.fire('Info','Select submodule','warning');
			this.disable_button = false;
		}else if(this.subtopicname_tosave == undefined || this.subtopicname_tosave == null || this.subtopicname_tosave == ''){
			swal.fire('Info','Topic name can not be empty','warning');
			this.disable_button = false;
		}else{
			this.hideLoading_indicator2 = false;
			this.preprogramteachertrainingService.findppttrainingtopicbyname(this.selected_submodule_id, this.subtopicname_tosave).subscribe(data => {
				this.hideLoading_indicator2 = true;
				if(data['check'] == false){
					swal.fire('Info','Topic name already exists.','warning');
					this.disable_button = false;
				}else{
					let curr_date = new Date();
					let subtopicbody = {
						moduleid: this.selected_submodule_moduleid,
						modulename: this.selected_submodule_modulename,
						submoduleid: this.selected_submodule_id,
						submodulename: this.selected_submodule_name,
						topicid:curr_date.getTime(),
						topicname: this.subtopicname_tosave,
						language:this.selected_preflanguage
					}
					this.preprogramteachertrainingService.createnewppttrainingtopic(subtopicbody).subscribe(data => {
						console.log("data1234",Object.keys(data).length>0,this.selected_submodule_modulename,this.selected_submodule_name,this.subtopicname_tosave)
						if(Object.keys(data).length>0){
							// this.sendMessageToallUser(this.selected_submodule_modulename,this.selected_submodule_name,this.subtopicname_tosave)
							this.hideLoading_indicator3 = true;
							this.load_alltopic_list(this.selected_submodule_moduleid,this.selected_preflanguage);
							this.subtopicname_tosave ='';
							this.disable_button = false;
						}
					},error => {},() => {this.disable_button = false;});
				}
			},error => {},() => {this.disable_button = false;});
		}
	}
	
	all_users:any;
	txt_title:String;
	txt_message:String;
	sendMessageToallUser(modulename,submodulename,subtopicname){
		this.txt_title = "New topic added";
		this.txt_message = "New topic" + " " + subtopicname + " " +"added in" + " " + submodulename + "  " +"under" + "  "+modulename;
		this.preprogramteachertrainingService.getalluser().subscribe(data => {
			this.all_users = data;
			console.log(" this.all_users", this.all_users)
			if(Object.keys(data).length>0){
				let id = ''+ (new Date().getTime());
				let title = this.txt_title;
				let message = this.txt_message;
				let status = 'unread';
				let obj = {
				  id: id,
				  userid_list: this.all_users,
				  title: title,
				  message: message,
				  status: status
				};
				this.preprogramteachertrainingService.createnewmessage(obj).subscribe(data => {
					// location.reload();
					console.log("hi i am here",data)
				  },
				  error => { },
				  () => {}
				);
			}
		  },
		  error => {},
		  () => {}
		);
	}

	updatetopic_btnclick(){
		this.topic_toupdate = this.topic_toupdate.toUpperCase().toLowerCase();
		if(this.topic_toupdate == undefined || this.topic_toupdate == null || this.topic_toupdate == ''){
			swal.fire('Info','topic name can not be empty','warning');
		}else{
			this.hideLoading_indicator3 = false;
			this.preprogramteachertrainingService.findppttrainingtopicbyname(this.selected_submodule_id, this.topic_toupdate).subscribe(data => {
					this.hideLoading_indicator2 = true;

					if(data['check'] == false){
						swal.fire('Info','Topic name already exists.','warning')
					}else{
						let body = {
							moduleid: this.selected_submodule_moduleid,
							modulename: this.selected_submodule_modulename,
							submoduleid: this.selected_submodule_id,
							submodulename: this.selected_submodule_name,
							topicid: this.topic_id,
							topicname: this.topic_toupdate,
							language:this.selected_preflanguage
						}
						this.preprogramteachertrainingService.updateppttrainingtopicbyid(this.submodule_topic_id, body).subscribe(data => {
								this.modalReference.close();
								this.hideLoading_indicator3 = true;
								this.load_alltopic_list(this.selected_submodule_moduleid,this.selected_preflanguage);
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
		this.preprogramteachertrainingService.deleteppttrainingtopicbyid(this.submodule_topic_id).subscribe(data => {
				this.modalReference.close();
				this.hideLoading_indicator3 = true;
				this.load_alltopic_list(this.selected_submodule_moduleid,this.selected_preflanguage);
				this.topicname_todelete ='';
			},
			error => {},
			() => {}
		);
	}
	back_btn_click(){
		this.router.navigate(['/ppt']);
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
