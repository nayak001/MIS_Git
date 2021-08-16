import { Component, OnInit, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { offlinetrainingService } from './offlinetraining.service';
import { ManagersboxService } from  './../managersbox/managersbox.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import swal from 'sweetalert2';

import { environment } from './../../../environments/environment.prod';
const URL = environment.uploadURL;

@Component({
    selector: 'app-offlinetraining',
    templateUrl: './offlinetraining.component.html',
    styleUrls: ['./offlinetraining.component.scss'],
    animations: [routerTransition()]
})

export class  offlinetrainingComponent implements OnInit {
	delete_q_index: string = '';
	public data : any;
	hideLoading_indicator: boolean;
	hideContent_div: boolean;
	public Editor = ClassicEditor;
    allmonth_list:any;
    constructor(
		private modalService: NgbModal,
        public router: Router,
		private offlinetrainingService: offlinetrainingService,
		private managersboxService: ManagersboxService
	) {
		this.hideLoading_indicator = true;
		this.hideContent_div = true;
	}
	
	ngOnInit() {
		this.load_allmonth_list();
		this.load_all_fellowlist();
	}

	all_fellows:any;
	load_all_fellowlist(){
		this.offlinetrainingService.getallteachers().subscribe(data => {
			this.all_fellows = data;
			
			// this.teachers.unshift({});
			this.hideLoading_indicator = true;
			
		},
		error => {},
		() => {}
	);
	}

	load_allmonth_list(){
		this.allmonth_list = [
			{ value: "month1", text: "month1" },
			{ value: "month2", text: "month2" },
			{ value: "month3", text: "month3" },
			{ value: "month4", text: "month4" },
			{ value: "month5", text: "month5" },
			{ value: "month6", text: "month6"},
			{ value: "month7", text: "month7" },
			{ value: "month8", text: "month8" },
			{ value: "month9", text: "month9" },
			{ value: "month10", text: "month10" },
			{ value: "month11", text: "month11" },
			{ value: "month12", text: "month12" },
		  ];
	}
	selected_month:any = '';
	selected_category:any = '';
	selected_status:any = '';
	selected_fellow:any = '';
	selected_fellow_name:any = '' ;
	apiresponse:any = '';
	onselect_month(event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;

		this.selected_month = selectedOptionValue;
	}
	onselect_category(event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;

		this.selected_category = selectedOptionValue;
	}
	onselect_status(event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.selected_status = selectedOptionValue;
	}
	
	onselect_fellow(event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.selected_fellow = selectedOptionValue;
		this.selected_fellow_name = selectElementText;
	}
	save_btn_click(){
		if(this.selected_month == '' || this.selected_category == '' || this.selected_status == '' || this.selected_fellow == ''){
			swal.fire('info', 'Please add all content !!!', 'warning');
		}else{
			const body = {
				userid : this.selected_fellow,
				username : this.selected_fellow_name,
				selectedmonth:this.selected_month,
				training_mode:this.selected_category,
				training_status:this.selected_status
			}
			this.offlinetrainingService.saveteachertrainingstatus(body).subscribe(data => {
				this.apiresponse = data;
				if(this.apiresponse.status == 'success') {
					swal.fire('info', 'training status saved', 'success');
				}
				// this.teachers.unshift({});
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);

		}
	}
	// async save_btn_click(selected_tab){
	// 	const body = {
	// 		moduleid : this.selected_moduleid,
	// 		modulename : this.selected_modulename,
	// 		submoduleid : this.selected_submoduleid,
	// 		submodulename : this.selected_submodulename,
	// 		topicid : this.selected_topicid,
	// 		topicname : this.selected_topicname,
	// 		content: this.allcontent,
	// 		flashcard: this.flashcard_value,
	// 		worksheet: this.worksheet_value,
	// 		video: this.video_value,
	// 		quiz: this.quiz_value,
	// 		language:this.selected_preflanguage
	// 	}
	// 	if(this.quiz_value.length>0 && this.save_operation == 'update'){
	// 		this.update_record(this.record_id,body)
	// 	}else{
	// 		swal.fire('info', 'Please add some content !!!', 'warning');
	// 	}
	// }

}