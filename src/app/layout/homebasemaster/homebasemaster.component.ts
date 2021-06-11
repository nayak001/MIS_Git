import { Component, OnInit, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { HomebaseService } from './homebasemaster.service';
import { ManagersboxService } from  './../managersbox/managersbox.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import swal from 'sweetalert2';

import { environment } from './../../../environments/environment.prod';
const URL = environment.uploadURL;

@Component({
    selector: 'app-homebasemaster',
    templateUrl: './homebasemaster.component.html',
    styleUrls: ['./homebasemaster.component.scss'],
    animations: [routerTransition()]
})

export class HomebaseMasterComponent implements OnInit {
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

	save_operation:string = 'save';
	hideLoading_indicator: boolean;
	hideContent_div: boolean;

	record_id:string = '';
	content_value: string ='';
	worksheet_value:any = [];
	video_value:any = [];
	flashcard_value:any = [];
	quiz_value:string = '';
	activity_documents:any = [];
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
		private HomebaseService: HomebaseService,
		private managersboxService: ManagersboxService
	) {
		this.hideLoading_indicator = true;
		this.hideContent_div = false;
		this.selected_preflanguage = 'en'
		this.selected_assesment = 'baseline'
	}
	
	ngOnInit() {
		this.load_record();
		this.load_activity_record()
	}
	selected_assesment:any = "baseline";
	show_month:boolean = false;
	onselect_assesment_select(event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.selected_assesment = selectedOptionValue;
		if(this.selected_assesment == 'baseline' || this.selected_assesment == 'endline'){
			this.show_month = false;
		}else{
			this.show_month = true; 
		}
		this.load_record();
	}
	
	onselect_change_class(event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.selected_class = selectedOptionValue;
		this.load_record();
	}
	
	onselect_change_month(event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.selected_month = selectedOptionValue;
		this.load_record();
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
	delete_ques_id:any;
	edit_ques_id:any;
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
			this.edit_q_question = obj.assessmentquestion;
			this.edit_q_optionA = obj.A;
			this.edit_q_optionB = obj.B;
			this.edit_q_optionC = obj.C;
			this.edit_q_optionD = obj.D;
			this.edit_q_ans = obj.answer;
			this.edit_ques_id = obj._id;
		} else if(flag == 'delete'){
			this.delete_ques_id = obj;
			this.delete_doc_id = obj._id;
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
	preflanguage_select_onchange(event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.selected_preflanguage = selectedOptionValue;
		this.load_record()
		// this.load_allmodules_list(this.selected_preflanguage);
		// this.allsubmodules_list = [];
		// this.alltopic_list=[];
		// this.data = [];
	  }
	reset_contents(){
		this.content_value = '';
		this.video_value = [];
		this.worksheet_value = [];
		this.flashcard_value = [];
		this.quiz_value = '';
	}
	dataid:any;
	activity_doc:any = [];
	selected_class:any = 0;
	selected_month:any = 'month0';
	alldata:any;
	async load_record(){
			this.HomebaseService.getallteacherassesment(this.selected_assesment, this.selected_preflanguage,this.selected_class,this.selected_month).subscribe(data => {
				if(Object.keys(data).length > 0){
					this.alldata = data;
					this.dataid = data[0]._id;
					this.hideProgressbar = false;
					this.save_operation = 'update';
				}else{
					this.quiz_value = '';
					this.alldata = [];
					this.save_operation = 'save';
				}
				},
				error => {},
				() => {}
			);

			
		
	}
	delete_doc_id:any;
	async load_activity_record(){
		this.HomebaseService.getactivitydocument('hbl').subscribe(data => {
			if(Object.keys(data).length > 0){
				this.activity_doc = data;
			}else{
				
			}
			},
			error => {},
			() => {}
		);
   }
	

	addquiz12(){
		if(this.add_q_question == ''){
			swal.fire('info', 'Please add the question!!!', 'warning');
		}else{
			let obj = {
				"qid": new Date().getTime(),
				"question": this.add_q_question,
				// "A": (this.add_q_optionA == '')?'':this.add_q_optionA,
				// "B": (this.add_q_optionB == '')?'':this.add_q_optionB,
				// "C": (this.add_q_optionC == '')?'':this.add_q_optionC,
				// "D": (this.add_q_optionD == '')?'':this.add_q_optionD,
				// "answer": this.selected_qans_val_add
			}
			this.quiz_value = this.add_q_question;
			this.modalReference.close();
		}
	}
	updatequiz(){
		const body = {
			assessmentquestion : this.edit_q_question,
		}
		this.quiz_value = this.edit_q_question;
		this.modalReference.close();
		this.HomebaseService.updatehomebasedmasterdata(this.edit_ques_id,body).subscribe(data => {
			swal.fire('Success', 'assesment updated successfully', 'success');
			this.load_record();
		},error => {}, () => {});
		
	}
	openUploadDocModal(){

	}
	delquiz(){
		//this.quiz_value.splice(this.delete_q_index, 1);
		this.HomebaseService.deleteassesment(this.delete_ques_id).subscribe(data => {
			swal.fire('Success', 'assesment deleted successfully', 'success');
			this.load_record();
		},error => {}, () => {});
		this.modalReference.close();
		this.load_record();
	}
	deleteactivity(){
		// this.hideProgressbar = true;
		// this.progress.percentage = 0;
		// this.s3path = '';
	
		// const body = {
		// 	activitydocument : '',
		// 	displayname : ''
		// }
		this.HomebaseService.deletecontent(this.delete_doc_id).subscribe(data => {
			swal.fire('Success', 'document deleted successfully', 'success');
			this.load_activity_record();
		},error => {}, () => {});
		this.modalReference.close();
		// this.load_activity_record();
	}
	
	async addquiz(){
		if(this.add_q_question == ''){
			swal.fire('info', 'Please add the question!!!', 'warning');
		}else{
			if(this.selected_assesment == 'baseline' || this.selected_assesment == 'endline'){
				this.selected_month = 'month0'
			}
			else{
				this.selected_month  = this.selected_month
			}
			const body = {
				assessmentquestion : this.add_q_question,
				language:this.selected_preflanguage,
				type : this.selected_assesment,
				activitydocument : this.s3path,
				displayname : this.displayname,
				class : this.selected_class,
				month:this.selected_month
			}
			this.HomebaseService.createhomebasemasterdata(body).subscribe(data => {
				swal.fire('Success', 'assesment created successfully', 'success');
				this.load_record();
			},error => {}, () => {});
			this.modalReference.close();
			
			
		}
	
	}

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
			this.hideProgressbar = false;
			this.progress.percentage = 0;
			this.currentFileUpload = this.selectedFiles.item(0);
			this.HomebaseService.pushFileToStorage(this.currentFileUpload, this.s3name).subscribe(event => {
				if (event.type === HttpEventType.UploadProgress) {
					this.progress.percentage = Math.round(100 * event.loaded / event.total);
				} else if (event instanceof HttpResponse) {
					this.s3path = event.body['s3path'];
					this.hideProgressbar = true;
				}
			});
		}else{
			this.displayname = '';
			this.selectedFiles = null;
		}
	}
	uploadactivitydoc(){
		const body = {
			language:this.selected_preflanguage,
			activitydocument : this.s3path,
			filetype:this.filetype,
			displayname : this.displayname,
		}
		this.HomebaseService.saveactivitydocument(body).subscribe(data => {
			swal.fire('Success', 'assesment created successfully', 'success');
			this.load_record();
			this.load_activity_record();
			this.hideProgressbar = false;
			this.progress.percentage = 0;
			this.modalReference.close();
			
		},error => {}, () => {});
	}

}