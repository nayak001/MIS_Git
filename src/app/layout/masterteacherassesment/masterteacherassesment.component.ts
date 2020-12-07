import { Component, OnInit, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { MasterteacherassesmentService } from './masterteacherassesment.service';
import { ManagersboxService } from  './../managersbox/managersbox.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import swal from 'sweetalert2';

import { environment } from './../../../environments/environment.prod';
import { isObject } from 'util';
const URL = environment.uploadURL;

@Component({
    selector: 'app-teacherassesment',
    templateUrl: './masterteacherassesment.component.html',
    styleUrls: ['./masterteacherassesment.component.scss'],
    animations: [routerTransition()]
})

export class MasterteacherassesmentComponent  implements OnInit {
	// video
	isSelected:boolean=true;
	selected_prefmonth:any;
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
	selected_preflanguage:any;
	public Editor = ClassicEditor;
    
    constructor(
		private modalService: NgbModal,
        public router: Router,
		private masterteachertraining2Service: MasterteacherassesmentService,
		private managersboxService: ManagersboxService
	) {
		this.hideLoading_indicator = true;
		this.hideContent_div = false;
		this.selected_prefmonth = 'm1'
		this.selected_preflanguage = 'en'
		
	}
	
	ngOnInit() {
		this.load_all_assesment(this.selected_prefmonth,this.selected_preflanguage)
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
	//function called when change in month to add question
	prefmonth_select_onchange(event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.selected_prefmonth = selectedOptionValue;
		this.allsubmodules_list = [];
		this.alltopic_list=[];
		this.data = [];
		this.load_all_assesment(this.selected_prefmonth,this.selected_preflanguage)
	  }

    load_all_assesment(month,language){
	  this.hideLoading_indicator = false;
	  this.masterteachertraining2Service.getalltrainingassesment(month,language).subscribe(data => {
		this.hideLoading_indicator = true;
		if(Object.keys(data).length > 0){
			this.save_operation = 'update';
			this.record_id = data[0]['_id'];
			this.quiz_value = data[0]['quiz'];
		}else{
			this.save_operation = 'Save'
			this.quiz_value = [];
		}
	  },
	  error => {},
	  () => {}
	 );
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
	back_btn_click(){
		this.router.navigate(['/masterteachertraining2']);
	}
	
	async load_record(){
		this.hideContent_div = false;
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
	currentVedioUpload :any;
	s3vediopath:any;
	obj:any;

	preflanguage_select_onchange(event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.selected_preflanguage = selectedOptionValue;
		this.allsubmodules_list = [];
		this.alltopic_list=[];
		this.data = [];
		this.load_all_assesment(this.selected_prefmonth,this.selected_preflanguage);
		// this.load_record(this.selected_preflanguage, this.selected_program, this.selected_subject, this.selected_month, this.selected_week, this.selected_level);
	  }
	async save_btn_click(selected_tab){
		const body = {
			language:this.selected_preflanguage,
			quiz: this.quiz_value,
			month:this.selected_prefmonth
		}
		if(this.save_operation == 'Save'){
			this.save_record(body)
		}else{
			this.update_record(this.record_id,body)
		}
	}
	async save_record(body){
		this.masterteachertraining2Service.createnewtrainingassesment(body).subscribe(data => {
				swal.fire('Success', 'Record saved successfully', 'success');
				this.load_all_assesment(this.selected_prefmonth,this.selected_preflanguage);
			},
			error => {},
			() => {}
		);
	}
	async update_record(id, body){
		this.masterteachertraining2Service.updatetrainingassesmentyid(id, body).subscribe(data => {
				swal.fire('Success', 'Record updated successfully', 'success');
				this.load_all_assesment(this.selected_prefmonth,this.selected_preflanguage);
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