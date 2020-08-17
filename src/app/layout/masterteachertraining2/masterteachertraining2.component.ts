import { Component, OnInit, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { Masterteachertraining2Service } from './masterteachertraining2.service';
import { ManagersboxService } from  './../managersbox/managersbox.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import swal from 'sweetalert2';

import { environment } from './../../../environments/environment.prod';
const URL = environment.uploadURL;

@Component({
    selector: 'app-masterteachertraining2',
    templateUrl: './masterteachertraining2.component.html',
    styleUrls: ['./masterteachertraining2.component.scss'],
    animations: [routerTransition()]
})

export class Masterteachertraining2Component implements OnInit {
	// video
	video_file_name:string ='';
	divs: number[] = [];
	allcontent:any = [];
	// worksheet
	worksheet_file_name:string ='';

	// image
	imageURL = environment.ImageURL;
	uploaded_image_name: string = '';
	uploaded_image_name_arr: any = [];

	// quiz - add
	add_q_index: string = '';
	add_q_qid: string = '';
	add_q_question: string = '';
	add_q_optionA: string = '';
	add_q_optionB: string = '';
	add_q_optionC: string = '';
	add_q_optionD: string = '';
	add_q_ans: string = '';
	selected_qans_val_add: string = '';
	selected_qans_text_add: string ='';

	// quiz - edit
	edit_q_index: string = '';
	edit_q_qid: string = '';
	edit_q_question: string = '';
	edit_q_optionA: string = '';
	edit_q_optionB: string = '';
	edit_q_optionC: string = '';
	edit_q_optionD: string = '';
	edit_q_ans: string = '';
	selected_qans_val_edit: string = '';
	selected_qans_text_edit: string ='';

	// quiz - delete
	delete_q_index: string = '';


	public allmodules_list : any;
	public allsubmodules_list: any;
	selected_moduleid: string = '';
	selected_modulename: string = '';
	selected_submoduleid: string = '';
	selected_submodulename: string = '';
	public alltopic_list: any;
	selected_topicid:any;
	selected_topicname:any;
	public data : any;
	modalReference: any;
	closeResult: string;

	save_operation:string = '';
	hideLoading_indicator: boolean;
	hideContent_div: boolean;

	record_id:string = '';
	content_value: string ='';
	worksheet_value:any = [];
	video_value:any = [];
	flashcard_value:any = [];
	quiz_value:any = [];
	contents:any = [];
	selectedvedioFiles:any;
	displayvedioname:any;
	vediofiletype:any;
	s3vedioname:any;
	edit_selectedFiles:any;
	edit_displayname:any;
	edit_filetype:any;
	edit_s3name:any;
	edit_selectedvedioFiles:any;
	edit_displayvedioname:any;
	edit_vediofiletype:any;
	edit_s3vedioname:any;
	public Editor = ClassicEditor;
    
    constructor(
		private modalService: NgbModal,
        public router: Router,
		private masterteachertraining2Service: Masterteachertraining2Service,
		private managersboxService: ManagersboxService
	) {
		this.hideLoading_indicator = true;
		this.hideContent_div = true;
	}
	
	ngOnInit() {
		this.reset_contents();
		this.load_allmodules_list();
	}

	reset_contents(){
		this.content_value = '';
		this.video_value = [];
		this.worksheet_value = [];
		this.flashcard_value = [];
		this.quiz_value = [];
	}

	load_allmodules_list(){
		this.hideLoading_indicator = false;
		this.masterteachertraining2Service.getalltrainingmodules().subscribe(data => {
				this.allmodules_list = data;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}

	load_alltopic_list(submoduleid){
		if(submoduleid != undefined && submoduleid != null && submoduleid != ''){
			this.hideLoading_indicator = false;
			this.masterteachertraining2Service.getalltrainingtopics(submoduleid).subscribe(data => {
					this.alltopic_list = data;
					this.hideLoading_indicator = true;
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
			this.hideLoading_indicator = false;
			this.masterteachertraining2Service.getalltrainingsubmodules(moduleid).subscribe(data => {
					this.allsubmodules_list = data;
					this.hideLoading_indicator = true;
				},
				error => {},
				() => {}
			);
		}else{
			this.allsubmodules_list = [];
		}
	}

	onselect_modules_select(event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.selected_moduleid = selectedOptionValue;
		this.selected_modulename = selectElementText;
		
		this.load_allsubmodules_list(this.selected_moduleid);
		this.load_record();
	}

	onselect_submodules_select(value){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;

		this.selected_submoduleid = selectedOptionValue;
		this.selected_submodulename = selectElementText;
		// this.load_record();
		
		this.reset_contents();
		this.load_alltopic_list(this.selected_submoduleid);
	}
	onselect_topic_select(value){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;

		this.selected_topicid = selectedOptionValue;
		this.selected_topicname = selectElementText;
		this.load_record();
		
		this.reset_contents();
	}
	onselect_editq_select(value){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;

		this.selected_qans_val_edit = selectedOptionValue;
		this.selected_qans_text_edit = selectElementText;
	}

	onselect_addq_select(value){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;

		this.selected_qans_val_add = selectedOptionValue;
		this.selected_qans_text_add = selectElementText;
	}

	go_btn_click(){
		this.load_record();
	}

	modulesubmodule_btn_click(){
		this.router.navigate(['/masterteachertraining1']);
	}
	
	async load_record(){
		if(	 this.selected_moduleid != undefined && this.selected_moduleid != null && this.selected_moduleid != ''
		  && this.selected_submoduleid != undefined && this.selected_submoduleid != null && this.selected_submoduleid != '' && this.selected_topicid != undefined && this.selected_topicid != null && this.selected_topicid != '') {

			this.hideLoading_indicator = false;
			this.hideContent_div = true;
			this.masterteachertraining2Service.getalltrainingcontents(this.selected_moduleid, this.selected_submoduleid,this.selected_topicid).subscribe(data => {
				console.log("data",data);
					if(Object.keys(data).length > 0){
						this.save_operation = 'update';
						this.record_id = data[0]['_id'];
						// this.content_value = data[0]['content'];
						this.allcontent =  data[0]['content'];
						console.log("this.allcontent",this.allcontent)
						this.worksheet_value = data[0]['worksheet'];
						this.video_value = data[0]['video'];
						this.flashcard_value = data[0]['flashcard'];
						this.quiz_value = data[0]['quiz'];
					}else{
						this.save_operation = 'save';
						this.record_id = '';
						this.content_value = '';
						this.worksheet_value = [];
						this.video_value = [];
						this.flashcard_value = [];
						this.quiz_value = [];
						this.allcontent = [];
					}
					this.data = data;
					this.hideLoading_indicator = true;
					this.hideContent_div = false;
				},
				error => {},
				() => {}
			);
		} else {
			this.content_value = '';
			this.video_value = [];
			this.worksheet_value = [];
			this.hideLoading_indicator = true;
			this.hideContent_div = true;
		}
	}

	addvideo(){
		if(this.video_file_name == undefined || this.video_file_name == null || this.video_file_name.trim() == ''){
			alert('Invalid filename');
		} else {
			let filename = this.video_file_name+'.mp4';
			let newfilename = '/THINKZONE/TRAINING/VIDEO/'+filename;
			this.video_value.push(newfilename);
			this.modalReference.close();
		}
	}

	delvideo(index){
		if(this.video_value.length > 0) {
			if(confirm('Do you want to delete video from this record?')){
				//this.video_value.splice(this.video_value.length-1, 1);
				this.video_value.splice(index, 1);
			}
		} else {
			alert('Nothing to delete !!!');
		}
	}
	

	createDiv(){
		// this.divs.length= 1;
		this.divs.push(this.divs.length);
		console.log("hii",this.divs)
	}
	
	addflashcard(){}
	delflashcard(i){
		if(confirm('Are you sure to remove this item?'))
			this.flashcard_value.splice(i,1);
	}
	addquiz(){
		let obj = {
			"qid": new Date().getTime(),
			"question": this.add_q_question,
			"A": this.add_q_optionA,
			"B": this.add_q_optionB,
			"C": this.add_q_optionC,
			"D": this.add_q_optionD,
			"answer": this.selected_qans_val_add
		}
		this.quiz_value.push(obj);
		this.modalReference.close();
	}
	updatequiz(){
		let obj = {
			"qid":this.edit_q_qid,
			"question": this.edit_q_question,
			"A": this.edit_q_optionA,
			"B": this.edit_q_optionB,
			"C": this.edit_q_optionC,
			"D": this.edit_q_optionD,
			"answer": this.selected_qans_val_edit
		}
		this.quiz_value.splice(this.edit_q_index, 1, obj);
		this.modalReference.close();
	}

	delquiz(){
		this.quiz_value.splice(this.delete_q_index, 1);
		this.modalReference.close();
	}
	currentVedioUpload :any;
	s3vediopath:any;
	obj:any;
	addcontent(){
		const body = {
			moduleid : this.selected_moduleid,
			modulename : this.selected_modulename,
			submoduleid : this.selected_submoduleid,
			submodulename : this.selected_submodulename,
			topicid : this.selected_topicid,
			topicname : this.selected_topicname,
			content: this.contents,
			flashcard: this.flashcard_value,
			worksheet: this.worksheet_value,
			video: this.video_value,
			quiz: this.quiz_value
		}
		console.log("body",body)
		this.save_record(body);
	}
	addnextcontent(){
		
		// if(this.content_value == undefined || this.content_value == null || this.content_value == '') {
		// 	swal.fire('info', 'Please add some content !!!', 'warning');
		// }else if(this.content_value.length > 500){
		// 	swal.fire('info', 'content should not be more than 500 words', 'warning');
		// }else{

		// }
			// console.log("this.selectedvedioFiles",this.selectedvedioFiles)
			
			// console.log("this.selectedFiles",this.selectedFiles)
			// if(this.selectedFiles != undefined || this.selectedFiles != null){
				this.currentFileUpload = this.selectedFiles.item(0);
				this.managersboxService.pushFileToStorage(this.currentFileUpload, this.s3name).subscribe(event => {
					if (event.type === HttpEventType.UploadProgress) {
						this.progress.percentage = Math.round(100 * event.loaded / event.total);
					} else if (event instanceof HttpResponse) {
						this.s3path = event.body['s3path'];
						this.callsecond(this.s3path);
						// console.log("this.s3path",this.s3path)
						this.hideProgressbar = true;
						
					}
				});	
	}
	callsecond(imagepath){
		this.currentVedioUpload = this.selectedvedioFiles.item(0);
				this.managersboxService.pushFileToStorage(this.currentVedioUpload, this.s3vedioname).subscribe(event => {
					if (event.type === HttpEventType.UploadProgress) {
						this.progress.percentage = Math.round(100 * event.loaded / event.total);
					} else if (event instanceof HttpResponse) {
						this.s3vediopath = event.body['s3path'];
						console.log("this.s3vediopath",this.s3vediopath)
						this.hideProgressbar = true;
						let obj = {
							"contentid" : new Date().getTime(),
							"content":this.content_value,
							"image":imagepath,
							"vedio":this.s3vediopath,
							"vedio_name":this.s3vedioname
						}
						this.contents.push(obj)
						this.content_value = '';
						// this.
						
					}	
				});
	}
	currentFileUpload: File;
	hideProgressbar: boolean = true;
	progress: { percentage: number } = { percentage: 0 };
	s3path: string = '';
	async save_btn_click(selected_tab){
		if(selected_tab == 'content_tab') {
			if(this.content_value == undefined || this.content_value == null || this.content_value == '') {
				swal.fire('info', 'Please add some content !!!', 'warning');
			} else{
				const body = {
					moduleid : this.selected_moduleid,
					modulename : this.selected_modulename,
					submoduleid : this.selected_submoduleid,
					submodulename : this.selected_submodulename,
					topicid : this.selected_topicid,
					topicname : this.selected_topicname,
					content: this.content_value,
					flashcard: this.flashcard_value,
					worksheet: this.worksheet_value,
					video: this.video_value,
					quiz: this.quiz_value
				}
				if(this.save_operation == 'save'){
					this.save_record(body);
				}else if(this.save_operation == 'update'){
					this.update_record(this.record_id, body);
				}
			}
		}else if(selected_tab == 'quiz_tab') {
			const body = {
				quiz: this.quiz_value
			}
			if(this.save_operation == 'save'){
				swal.fire('info', 'Please add some content !!!', 'warning');
			}else if(this.save_operation == 'update'){
				this.update_record(this.record_id, body);
			}
		}else if(selected_tab == 'image_tab') {
			if(this.save_operation == 'save'){
				swal.fire('info', 'Please add some content !!!', 'warning');
			}else if(this.save_operation == 'update'){
				if(this.selectedFiles == undefined || this.selectedFiles == null){
					swal.fire('info', 'Please select image file', 'warning');
				}else{this.hideProgressbar = false;
					this.progress.percentage = 0;
		
					this.currentFileUpload = this.selectedFiles.item(0);
					this.managersboxService.pushFileToStorage(this.currentFileUpload, this.s3name).subscribe(event => {
						if (event.type === HttpEventType.UploadProgress) {
							this.progress.percentage = Math.round(100 * event.loaded / event.total);
						} else if (event instanceof HttpResponse) {
							this.s3path = event.body['s3path'];
							this.hideProgressbar = true;
		
							let obj = {
								displayname: this.displayname,
								s3name: this.s3name,
								filetype: this.filetype,
								s3path: this.s3path
							}
							this.flashcard_value.push(obj);
		
							const body = {
								flashcard: this.flashcard_value
							}
							this.update_record(this.record_id, body);
							//this.load_record();
						}
					});
				}
			}
		}else if(selected_tab == 'video_tab') {
			if(this.save_operation == 'save'){
				swal.fire('info', 'Please add some content !!!', 'warning');
			}else if(this.save_operation == 'update'){
				if(this.selectedFiles == undefined || this.selectedFiles == null){
					swal.fire('info', 'Please select video file', 'warning');
				}else{this.hideProgressbar = false;
					this.progress.percentage = 0;
		
					this.currentFileUpload = this.selectedFiles.item(0);
					this.managersboxService.pushFileToStorage(this.currentFileUpload, this.s3name).subscribe(event => {
						if (event.type === HttpEventType.UploadProgress) {
							this.progress.percentage = Math.round(100 * event.loaded / event.total);
						} else if (event instanceof HttpResponse) {
							this.s3path = event.body['s3path'];
							this.hideProgressbar = true;
		
							let obj = {
								displayname: this.displayname,
								s3name: this.s3name,
								filetype: this.filetype,
								s3path: this.s3path
							}
							this.video_value.push(obj);
		
							const body = {
								video: this.video_value
							}
							this.update_record(this.record_id, body);
							//this.load_record();
						}
					});
				}
			}
		}
	}


	async save_record(body){
		this.masterteachertraining2Service.createnewtrainingcontents(body).subscribe(data => {
				swal.fire('Success', 'Record saved successfully', 'success');
				this.load_record();
			},
			error => {},
			() => {}
		);
	}

	async update_record(id, body){
		this.masterteachertraining2Service.updatetrainingcontentsbyid(id, body).subscribe(data => {
				swal.fire('Success', 'Record updated successfully', 'success');
				this.load_record();
			},
			error => {},
			() => {}
		);
	}

	// upload button
	selectedFiles: FileList;
	displayname: string;
	filetype: string;
	s3name: string;
	filechooser_onchange(event) {
		console.log("event",event)
		if(event.target.files.length > 0){
			this.selectedFiles = event.target.files;
			this.displayname = event.target.files[0].name;
			this.filetype = this.displayname.split('.').pop();
			this.s3name = (new Date()).getTime()+'.'+this.filetype;
		}else{
			this.displayname = '';
			this.selectedFiles = null;
		}
	}
	videochooser_onchange(event) {
		if(event.target.files.length > 0){
			this.selectedvedioFiles = event.target.files;
			this.displayvedioname = event.target.files[0].name;
			this.vediofiletype = this.displayvedioname.split('.').pop();
			this.s3vedioname = (new Date()).getTime()+'.'+this.vediofiletype;
		}else{
			this.displayvedioname = '';
			this.selectedvedioFiles = null;
		}
	}
	
	edit_filechooser_onchange(event) {
		if(event.target.files.length > 0){
			this.edit_selectedFiles = event.target.files;
			this.edit_displayname = event.target.files[0].name;
			this.edit_filetype = this.edit_displayname.split('.').pop();
			this.edit_s3name = (new Date()).getTime()+'.'+this.edit_filetype;
		}else{
			this.edit_displayname = '';
			this.edit_selectedFiles = null;
		}
	}
	
	edit_videochooser_onchange(event) {
		if(event.target.files.length > 0){
			this.edit_selectedvedioFiles = event.target.files;
			this.edit_displayvedioname = event.target.files[0].name;
			this.edit_vediofiletype = this.edit_displayvedioname.split('.').pop();
			this.edit_s3vedioname = (new Date()).getTime()+'.'+this.edit_vediofiletype;
		}else{
			this.edit_displayvedioname = '';
			this.edit_selectedvedioFiles = null;
		}
	}
	edit_content_index:any;
	edit_content_id:any;
	edit_vedio_value:any;
	edit_img_value:any;
	edit_content_value:any;
	opencontent(content,obj,index,flag) {
		console.log("obj",content,obj,index,flag)
		if(flag == 'addcontentmodal'){
			this.content_value = '';
			this.add_q_question = '';
			this.add_q_optionA = '';
		} else if(flag == 'editcontentmodal'){
			this.edit_content_index = index;
			this.edit_content_value = obj.content;
			this.edit_content_id = obj.contentid;
			this.edit_img_value = obj.image;
			this.edit_vedio_value = obj.vedio
			// this.edit_q_question = obj.question;
			// this.edit_q_optionA = obj.A;
			// this.edit_q_optionB = obj.B;
			// this.edit_q_optionC = obj.C;
			// this.edit_q_optionD = obj.D;
			// this.edit_q_ans = obj.answer;
		}
		this.modalReference = this.modalService.open(content, {backdrop  : 'static',keyboard  : false});
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open(content,obj,index,flag) {
		// update
		if(flag == 'add'){
			this.add_q_qid = '';
			this.add_q_question = '';
			this.add_q_optionA = '';
			this.add_q_optionB = '';
			this.add_q_optionC = '';
			this.add_q_optionD = '';
			this.add_q_ans = '';
		} else if(flag == 'edit'){
			this.edit_q_index = index;
			this.edit_q_qid = obj.qid;
			this.edit_q_question = obj.question;
			this.edit_q_optionA = obj.A;
			this.edit_q_optionB = obj.B;
			this.edit_q_optionC = obj.C;
			this.edit_q_optionD = obj.D;
			this.edit_q_ans = obj.answer;
		} else if(flag == 'delete'){
			this.delete_q_index = index;
		} else if(flag == 'addvideo'){
			
		} else if(flag == 'addworksheet'){
			
		} else {
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
