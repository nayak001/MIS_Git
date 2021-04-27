import { Component, OnInit, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { PreprogramteachertrainingService } from './preprogramteachertraining.service';
import { ManagersboxService } from  './../managersbox/managersbox.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import swal from 'sweetalert2';

import { environment } from './../../../environments/environment.prod';
const URL = environment.uploadURL;

@Component({
    selector: 'app-preprogramteachertraining',
    templateUrl: './preprogramteachertraining.component.html',
    styleUrls: ['./preprogramteachertraining.component.scss'],
    animations: [routerTransition()]
})

export class PreprogrmateachertrainingComponent implements OnInit {
	// video
	isSelected:boolean=true;
	selected_preflanguage:any;
	disable_button:boolean;
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
	currentFileUpload: File;
	hideProgressbar: boolean = true;
	progress: { percentage: number } = { percentage: 0 };
	s3path: string = '';
	currentvedioFileUpload: File;
	hidevedioProgressbar: boolean = true;
	vedioprogress: { percentage: number } = { percentage: 0 };
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
		private preprogramteachertrainingService: PreprogramteachertrainingService,
		private managersboxService: ManagersboxService
	) {
		this.hideLoading_indicator = true;
		this.hideContent_div = true;
		this.selected_preflanguage = 'od'
		
	}
	
	ngOnInit() {
		this.reset_contents();
		this.load_allmodules_list(this.selected_preflanguage);
		this.Editor.defaultConfig = {
			toolbar: {
			  items: [
				'heading',
				'|',
				'bold',
				'italic',
				'|',
				'bulletedList',
				'numberedList',
				'|',
				'undo',
				'redo'
			  ]
			},
			image: {
			  toolbar: [
				'imageStyle:full',
				'imageStyle:side',
				'|',
				'imageTextAlternative'
			  ]
			},
			table: {
			  contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
			},
			language: 'en'
		  };
	}
	preflanguage_select_onchange(event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.selected_preflanguage = selectedOptionValue;
		this.load_allmodules_list(this.selected_preflanguage);
		this.allsubmodules_list = [];
		this.alltopic_list=[];
		this.data = [];
		// this.load_record(this.selected_preflanguage, this.selected_program, this.selected_subject, this.selected_month, this.selected_week, this.selected_level);
	  }
	reset_contents(){
		this.content_value = '';
		this.video_value = [];
		this.worksheet_value = [];
		this.flashcard_value = [];
		this.quiz_value = [];
	}

	load_allmodules_list(language){
		this.hideLoading_indicator = false;
		this.preprogramteachertrainingService.getalltrainingmodules(language).subscribe(data => {
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
			this.preprogramteachertrainingService.getalltrainingtopics(submoduleid,this.selected_preflanguage).subscribe(data => {
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
			this.preprogramteachertrainingService.getalltrainingsubmodules(moduleid,this.selected_preflanguage).subscribe(data => {
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
		this.router.navigate(['/preprogramtrainingmodule']);
	}
	
	async load_record(){
		if(	 this.selected_moduleid != undefined && this.selected_moduleid != null && this.selected_moduleid != ''
		  && this.selected_submoduleid != undefined && this.selected_submoduleid != null && this.selected_submoduleid != '' && this.selected_topicid != undefined && this.selected_topicid != null && this.selected_topicid != '') {

			this.hideLoading_indicator = false;
			this.hideContent_div = true;
			this.preprogramteachertrainingService.getalltrainingcontents(this.selected_moduleid, this.selected_submoduleid,this.selected_topicid,this.selected_preflanguage).subscribe(data => {
					if(Object.keys(data).length > 0){
						this.save_operation = 'update';
						this.record_id = data[0]['_id'];
						// this.content_value = data[0]['content'];
						this.allcontent =  data[0]['content'];
						this.worksheet_value = data[0]['worksheet'];
						this.video_value = data[0]['video'];
						this.flashcard_value = data[0]['flashcard'];
						this.quiz_value = data[0]['quiz'];
						this.disable_button = false;
					}else{
						this.save_operation = 'save';
						this.record_id = '';
						this.content_value = '';
						this.worksheet_value = [];
						this.video_value = [];
						this.flashcard_value = [];
						this.quiz_value = [];
						this.allcontent = [];
						this.disable_button = true;
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
		if(confirm('Are you sure to remove this item?'))
			this.flashcard_value.splice(i,1);
	}
	addquiz(){
		if(this.add_q_question == '' || this.add_q_optionA == '' || this.add_q_optionB == '' ||this.add_q_optionC == '' || this.add_q_optionD == '' || this.selected_qans_val_add == ''){
			swal.fire('info', 'Please fill all the fields !!!', 'warning');
		}else{
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
	async deletecontent(){
		var contentdata
		var record_id;
		var indexdelete = this.delete_content_index
		var del_content_id = this.del_content_id;
		this.data.forEach(function(value,key){
			if(value.content!=undefined){
				value.content.forEach(function(item,key){
					if(item.contentid == del_content_id){
						record_id = value._id;
						value.content.splice(key, 1);
						contentdata = value.content;
					}
				})
			}	
		})
		this.preprogramteachertrainingService.deletecontent(record_id,contentdata).subscribe(data => {
			swal.fire('Success', 'Record updated successfully', 'success');
			this.load_record();
		},
		error => {},
		() => {}
	);	
	}

	delelteimage(){
		// this.deleteallcontent(this.record_id,this.del_image_id)
		var contentdata
		var record_id;
		var indexdelete = this.delete_content_index
		var del_image_id = this.del_image_id;
		this.data.forEach(function(value,key){
			if(value.content!=undefined){
				value.content.forEach(function(item,key){
					if(item.contentid == del_image_id){
						record_id = value._id;
						value.content.splice(key, 1);
						contentdata = value.content;
					}
				})
			}	
		})
		this.preprogramteachertrainingService.deletecontent(record_id,contentdata).subscribe(data => {
			swal.fire('Success', 'Record updated successfully', 'success');
			this.load_record();
		},
		error => {},
		() => {}
	);	
	}
	vediodelete(){
		var contentdata
		var record_id;
		var indexdelete = this.delete_content_index
		var del_vedio_id = this.del_vedio_id;
		this.data.forEach(function(value,key){
			if(value.content!=undefined){
				value.content.forEach(function(item,key){
					if(item.contentid == del_vedio_id){
						record_id = value._id;
						value.content.splice(key, 1);
						contentdata = value.content;
					}
				})
			}	
		})
		this.preprogramteachertrainingService.deletecontent(record_id,contentdata).subscribe(data => {
			swal.fire('Success', 'Record updated successfully', 'success');
			this.load_record();
		},
		error => {},
		() => {}
	);	
	}
	deleteallcontent(recordid,contentid){
		this.preprogramteachertrainingService.deletecontent(recordid,contentid).subscribe(data => {
			swal.fire('Success', 'Record updated successfully', 'success');
			this.load_record();
		},
		error => {},
		() => {}
	);
	}
	currentVedioUpload :any;
	s3vediopath:any;
	obj:any;
	addcontent(){
		if(this.content_value == '' || this.content_value == undefined || this.content_value ==  null){
			swal.fire('info', 'Please add some content !!!', 'warning');
		}else 
		if(this.content_value.length > 500){
			swal.fire('info', 'you can add only 500 words', 'warning');
		}else{
			const obj = {
				"contentid" : new Date().getTime(),
				"content":this.content_value,
				"type":"content"
			}
			if(this.save_operation == 'save'){
				this.contents.push(obj)
			}else{
				this.allcontent.push(obj)
			}
			
			swal.fire('content added successfully!')
			
		}
	}
	addimage(){
		if(this.selectedFiles == undefined || this.selectedFiles == null){
			swal.fire('info', 'Please select image file', 'warning');
		}else{
			this.hideProgressbar = false;
		this.progress.percentage = 0;

		this.currentFileUpload = this.selectedFiles.item(0);
		this.managersboxService.pushFileToStorage(this.currentFileUpload, this.s3name).subscribe(event => {
			if (event.type === HttpEventType.UploadProgress) {
				this.progress.percentage = Math.round(100 * event.loaded / event.total);
			} else if (event instanceof HttpResponse) {
				this.s3path = event.body['s3path'];
				this.hideProgressbar = true;
				const obj = {
					"contentid" : new Date().getTime(),
					"content":this.s3path,
					"type":"image"
				}
				if(this.save_operation == 'save'){
					this.contents.push(obj)
				}else{
					this.allcontent.push(obj)
				}
			}
		});
	  }
	}
	addvedio(){
		if(this.selectedvedioFiles == undefined || this.selectedvedioFiles == null){
			swal.fire('info', 'Please select vedio file', 'warning');
		}else{
			this.hidevedioProgressbar = false;
			this.vedioprogress.percentage = 0;
			this.currentvedioFileUpload = this.selectedvedioFiles.item(0);
			this.managersboxService.pushFileToStorage(this.currentvedioFileUpload, this.s3vedioname).subscribe(event => {
			if (event.type === HttpEventType.UploadProgress) {
				this.vedioprogress.percentage  = Math.round(100 * event.loaded / event.total);
			} else if (event instanceof HttpResponse) {
				this.s3vediopath = event.body['s3path'];
				this.hidevedioProgressbar = true;
				const obj = {
					"contentid" : new Date().getTime(),
					"content":this.s3vediopath,
					"vedio_path":this.s3vedioname,
					"type":"vedio"
				}
				if(this.save_operation == 'save'){
					this.contents.push(obj)
				}else{
					this.allcontent.push(obj)
				}
			}	
		});
	  }
	}
	savecontent(){
		if(this.save_operation == 'save' && this.contents.length>0){
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
				quiz: this.quiz_value,
				language:this.selected_preflanguage
			}
			this.save_record(body);
			this.s3vedioname = '';
			this.s3vediopath = '';
			this.s3path = '';
			this.s3name = '';
			this.disable_button = false;
		}
		else if(this.save_operation == 'update' && this.allcontent.length>0){
			const body = {
				moduleid : this.selected_moduleid,
				modulename : this.selected_modulename,
				submoduleid : this.selected_submoduleid,
				submodulename : this.selected_submodulename,
				topicid : this.selected_topicid,
				topicname : this.selected_topicname,
				content: this.allcontent,
				flashcard: this.flashcard_value,
				worksheet: this.worksheet_value,
				video: this.video_value,
				quiz: this.quiz_value,
				language:this.selected_preflanguage
			}
			// this.allcontent.push({"key":"value"})
			this.update_record(this.record_id,body);
		}
		else{
			swal.fire('info', 'Please select some content', 'warning');
			this.modalReference.close()
		}
	}
	updatecontent() {
		const body = {
			contentid:this.edit_content_id,
			content:this.edit_content_value,
			type:"content"
		}
		var contentdata
		var record_id;
		var edit_content_id =this.edit_content_id;
		this.data.forEach(function(value,key){
			if(value.content!=undefined){
				value.content.forEach(function(item,key){
					if(item.contentid == edit_content_id){
						record_id = value._id;
						value.content.splice(key, 1, body);
						contentdata = value.content;
					}
				})
			}	
		})
		this.preprogramteachertrainingService.deletecontent(record_id,contentdata).subscribe(data => {
			swal.fire('Success', 'Record updated successfully', 'success');
			this.load_record();
			this.modalReference.close()
		},
		error => {},
		() => {}
	);	
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
	edit_s3_path:any;
	updateimage() {
		this.hideProgressbar = false;
		this.progress.percentage = 0;
		this.currentFileUpload = this.edit_selectedFiles.item(0);
		this.managersboxService.pushFileToStorage(this.currentFileUpload, this.edit_s3name).subscribe(event => {
			if (event.type === HttpEventType.UploadProgress) {
				this.progress.percentage = Math.round(100 * event.loaded / event.total);
			} else if (event instanceof HttpResponse) {
				this.edit_s3_path = event.body['s3path'];
				this.hideProgressbar = true;
				const body = {
					contentid:this.edit_image_id,
					content:this.edit_s3_path,
					type:"image"
				}
				var contentdata
				var record_id;
				var edit_image_id =this.edit_image_id;
				this.data.forEach(function(value,key){
					if(value.content!=undefined){
						value.content.forEach(function(item,key){
							if(item.contentid == edit_image_id){
								record_id = value._id;
								value.content.splice(key, 1, body);
								contentdata = value.content;
							}
						})
					}	
				})
				this.preprogramteachertrainingService.deletecontent(record_id,contentdata).subscribe(data => {
					swal.fire('Success', 'Record updated successfully', 'success');
					this.load_record();
					this.modalReference.close()
				},
				error => {},
				() => {}
			    );
				this.modalReference.close()
			}
		});
		
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
	vedioupdate() {
		this.hidevedioProgressbar = false;
		this.vedioprogress.percentage = 0;
		this.currentvedioFileUpload = this.edit_selectedvedioFiles.item(0);
	    this.managersboxService.pushFileToStorage(this.currentvedioFileUpload, this.edit_s3vedioname).subscribe(event => {
		if (event.type === HttpEventType.UploadProgress) {
			this.vedioprogress.percentage  = Math.round(100 * event.loaded / event.total);
		} else if (event instanceof HttpResponse) {
			this.edit_s3_vedio_path = event.body['s3path'];
			this.hidevedioProgressbar = true;
			const body = {
				contentid:this.edit_vedio_id,
				vedio_path:this.edit_s3vedioname,
				content:this.edit_s3_vedio_path,
				type:"vedio"
			}
			var contentdata
				var record_id;
				var edit_vedio_id =this.edit_vedio_id;
				this.data.forEach(function(value,key){
					if(value.content!=undefined){
						value.content.forEach(function(item,key){
							if(item.contentid == edit_vedio_id){
								record_id = value._id;
								value.content.splice(key, 1, body);
								contentdata = value.content;
							}
						})
					}	
				})
				this.preprogramteachertrainingService.deletecontent(record_id,contentdata).subscribe(data => {
					swal.fire('Success', 'Record updated successfully', 'success');
					this.load_record();
					this.modalReference.close()
				},
				error => {},
				() => {}
			    );
			// this.allcontent.splice(this.edit_vedio_index, 1, body);
			// this.update_content_record(this.record_id,this.allcontent);
			this.modalReference.close()
			
		}	
	});
	}
	async save_btn_click(selected_tab){
		const body = {
			moduleid : this.selected_moduleid,
			modulename : this.selected_modulename,
			submoduleid : this.selected_submoduleid,
			submodulename : this.selected_submodulename,
			topicid : this.selected_topicid,
			topicname : this.selected_topicname,
			content: this.allcontent,
			flashcard: this.flashcard_value,
			worksheet: this.worksheet_value,
			video: this.video_value,
			quiz: this.quiz_value,
			language:this.selected_preflanguage
		}
		if(this.quiz_value.length>0 && this.save_operation == 'update'){
			this.update_record(this.record_id,body)
		}else{
			swal.fire('info', 'Please add some content !!!', 'warning');
		}
	}
	async save_record(body){
		this.preprogramteachertrainingService.createnewtrainingcontents(body).subscribe(data => {
				swal.fire('Success', 'Record saved successfully', 'success');
				this.load_record();
				this.content_value = '';
			    this.contents = [];
			},
			error => {},
			() => {}
		);
	}
	updatetchtrainingpercentage(moduleid,submoduleid,topicid){
		// this.masterteachertraining1Service.gettchtrainingdetails(moduleid,submoduleid).subscribe(data => {
		// 	console.log("hii i am hereee12",data)
		// 	},
		// 	error => {},
		// 	() => {}
		// );
		this.preprogramteachertrainingService.updatetchtrainingpercentage(moduleid,submoduleid,topicid).subscribe(data => {
			console.log("hii i am hereee12",data)
		  },
		  error => {},
		  () => {}
		);
	}
	async update_content_record(id, body){
		this.preprogramteachertrainingService.updatetrainingcontents(id, body).subscribe(data => {
				swal.fire('Success', 'Record updated successfully', 'success');
				this.load_record();
			},
			error => {},
			() => {}
		);
	}
	async update_record(id, body){
		this.preprogramteachertrainingService.updatetrainingcontentsbyid(id, body).subscribe(data => {
				swal.fire('Success', 'Record updated successfully', 'success');
				// this.updatetchtrainingpercentage(this.selected_moduleid,this.selected_submoduleid, this.selected_topicid)
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
	
	
	
	
	edit_content_index:any;
	edit_content_id:any;
	edit_vedio_value:any;
	edit_img_value:any;
	edit_content_value: string ='';
	edit_image_index:any;
	edit_image_path:any;
	edit_image_id:any;
	edit_vedio_index:any;
	edit_s3_vedio_path:any;
	edit_vedio_id:any;
	edit_vedio_name:any;
	delete_content_index:any;
	del_content_id:any;
	delete_image_index:any;
	del_image_id:any;
	delete_vedio_index:any;
	del_vedio_id:any;
	text_to_preview:any;
	image_to_preview:any;
	vedio_to_preview:any;
	opencontent(content,obj,index,flag) {
		this.content_value = '';
		this.s3path = '';
		this.s3vediopath = '';
		if(flag == 'addcontentmodal'){
			this.content_value = '';
			this.add_q_question = '';
			this.add_q_optionA = '';
		} else if(flag == 'editcontentmodal'){
			this.edit_content_index = index;
			this.edit_content_value = obj.content;
			this.edit_content_id = obj.contentid;
		} else if(flag == 'editimagemodal'){
			this.edit_image_index = index;
			this.edit_s3_path = obj.content;
			this.edit_image_id = obj.contentid;
		} else if(flag == 'editvediomodal'){
			this.edit_vedio_index = index;
			this.edit_s3_vedio_path =obj.content ;
			this.edit_vedio_id = obj.contentid;
			this.edit_s3vedioname = obj.vedio_path;
		}else if(flag == 'deletecontentmodal'){
			this.delete_content_index = index;
			this.del_content_id = obj.contentid;
		}else if(flag == 'deleteimagemodal'){
			this.delete_image_index = index;
			this.del_image_id = obj.contentid;
		}else if(flag == 'deletevediomodal'){
			this.delete_vedio_index = index;
			this.del_vedio_id = obj.contentid;
		}else if(flag == 'previewimagemodal'){
			this.image_to_preview = obj.content;
		}else if(flag == 'previewcontentmodal'){
			this.text_to_preview = obj.content;
		}else if(flag == 'previewvediomodal'){
			this.vedio_to_preview = obj.content;
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