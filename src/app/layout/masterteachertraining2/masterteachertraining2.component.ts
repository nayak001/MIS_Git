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
				// console.log('### data: '+JSON.stringify(data));
				this.allmodules_list = data;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}

	load_allsubmodules_list(moduleid){
		if(moduleid != undefined && moduleid != null && moduleid != ''){
			this.hideLoading_indicator = false;
			this.masterteachertraining2Service.getalltrainingsubmodules(moduleid).subscribe(data => {
					console.log('### allsubmodules_list: '+JSON.stringify(this.allsubmodules_list));
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
		console.log('-->Selected Opt Value= '+selectedOptionValue + '   Text= '+selectElementText);
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
		console.log('-->Selected Opt Value= '+selectedOptionValue + '   Text= '+selectElementText);

		this.selected_submoduleid = selectedOptionValue;
		this.selected_submodulename = selectElementText;
		this.load_record();
		
		this.reset_contents();
	}

	onselect_editq_select(value){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= '+selectedOptionValue + '   Text= '+selectElementText);

		this.selected_qans_val_edit = selectedOptionValue;
		this.selected_qans_text_edit = selectElementText;
	}

	onselect_addq_select(value){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= '+selectedOptionValue + '   Text= '+selectElementText);

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
		  && this.selected_submoduleid != undefined && this.selected_submoduleid != null && this.selected_submoduleid != ''){

			this.hideLoading_indicator = false;
			this.hideContent_div = true;
			this.masterteachertraining2Service.getalltrainingcontents(this.selected_moduleid, this.selected_submoduleid).subscribe(data => {
					console.log('### data: '+JSON.stringify(data));
					if(Object.keys(data).length > 0){
						this.save_operation = 'update';
						this.record_id = data[0]['_id'];
						this.content_value = data[0]['content'];
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

	addflashcard(){}
	delflashcard(i){
		console.log('-->Index Value= '+i);
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


	currentFileUpload: File;
	hideProgressbar: boolean = true;
	progress: { percentage: number } = { percentage: 0 };
	s3path: string = '';
	async save_btn_click(selected_tab){
		console.log('### selected_tab: '+selected_tab);
		if(selected_tab == 'content_tab') {
			if(this.content_value == undefined || this.content_value == null || this.content_value == '') {
				swal.fire('info', 'Please add some content !!!', 'warning');
			} else{
				const body = {
					moduleid : this.selected_moduleid,
					modulename : this.selected_modulename,
					submoduleid : this.selected_submoduleid,
					submodulename : this.selected_submodulename,
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
					console.log('###selectedFiles: '+JSON.stringify(this.selectedFiles));
					this.managersboxService.pushFileToStorage(this.currentFileUpload, this.s3name).subscribe(event => {
						console.log('$$$event: '+JSON.stringify(event));
						if (event.type === HttpEventType.UploadProgress) {
							this.progress.percentage = Math.round(100 * event.loaded / event.total);
						} else if (event instanceof HttpResponse) {
							this.s3path = event.body['s3path'];
							console.log('File is completely uploaded!->'+this.s3path);
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
					console.log('###selectedFiles: '+JSON.stringify(this.selectedFiles));
					this.managersboxService.pushFileToStorage(this.currentFileUpload, this.s3name).subscribe(event => {
						console.log('$$$event: '+JSON.stringify(event));
						if (event.type === HttpEventType.UploadProgress) {
							this.progress.percentage = Math.round(100 * event.loaded / event.total);
						} else if (event instanceof HttpResponse) {
							this.s3path = event.body['s3path'];
							console.log('File is completely uploaded!->'+this.s3path);
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
				console.log('###1 save data: '+JSON.stringify(data));
				swal.fire('Success', 'Record saved successfully', 'success');
				this.load_record();
			},
			error => {},
			() => {}
		);
	}

	async update_record(id, body){
		this.masterteachertraining2Service.updatetrainingcontentsbyid(id, body).subscribe(data => {
				console.log('###1 update data: '+JSON.stringify(data));
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
		if(event.target.files.length > 0){
			this.selectedFiles = event.target.files;
			this.displayname = event.target.files[0].name;
			this.filetype = this.displayname.split('.').pop();
			this.s3name = (new Date()).getTime()+'.'+this.filetype;
			console.log('@@@Filename: '+event.target.files[0].name+'    filetype: '+this.filetype);
		}else{
			this.displayname = '';
			this.selectedFiles = null;
		}
	}

	open(content,obj,index,flag) {
		console.log('#### Object: '+ JSON.stringify(obj));
		console.log('#### flag: '+ flag);
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
			console.log('#### other: ');
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
