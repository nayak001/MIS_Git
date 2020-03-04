import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TchassessmentService } from './tchassessment.service';

@Component({
    selector: 'app-tchassessment',
    templateUrl: './tchassessment.component.html',
    styleUrls: ['./tchassessment.component.scss']
})
export class TchassessmentComponent implements OnInit {
	public data : any;
	public teachers : any;
	public assessment_details: any = []; 

	userid: string;
	selected_userid: string;
	selected_username: string;
	selected_program: string = '';
	selected_subject: string = '';
	selected_month: string = '';
	
	preview_studentname: string;
	preview_program: string = '';
	preview_subject: string = '';
	preview_month: string = '';
	preview_level: string = '';
	preview_date: string = '';

	hide_subject_dropdown: boolean = true;
	hide_month_dropdown: boolean = true;
	hide_quarter_dropdown: boolean = true;
	hideLoading_indicator: boolean;
	hide_no_records: boolean = false;

	// auto-complete 
	keyword = 'username';


    constructor(
        public router: Router,
		private tchassessmentService: TchassessmentService
	) {
		this.hideLoading_indicator = true;
		this.hide_subject_dropdown = true;
		this.hide_month_dropdown = true;
		this.hide_quarter_dropdown = true;
	}
	
	ngOnInit() {
		this.hideLoading_indicator = false;
		this.tchassessmentService.getallteachers().subscribe(data => {
				// console.log('### data: '+JSON.stringify(data));
				this.teachers = data;
				//this.teachers.unshift({});
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}

	
	onchange_teachers_select(val: string) {
		console.log('--> auto-complete change event'+JSON.stringify(val));
	}
	onfocus_teachers_select(e){
		console.log('--> auto-complete focus event'+JSON.stringify(e));
	}
	onselect_teachers_select(item){
		console.log('--> auto-complete select event'+JSON.stringify(item));
		this.selected_userid = item.userid;
		this.selected_username = item.username;
		this.gettchassessmentbyuserid();
	}

	onselect_program(event: Event){
    	let selectedOptions = event.target['options'];
		let selectedIndex = selectedOptions.selectedIndex;
		let selectedOptionValue = selectedOptions[selectedIndex].value;
		let selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= '+selectedOptionValue+'   Text= '+selectElementText);
		this.selected_program = selectedOptionValue;

		this.data = [];
		this.assessment_details = [];
		this.selected_month = '';

		if(this.selected_program == 'pge'){
			this.selected_subject = '';
			this.hide_subject_dropdown = false;
			this.hide_month_dropdown = false;
			this.hide_quarter_dropdown = true;
		}else{
			this.selected_subject = 'na';
			this.hide_subject_dropdown = true;
			this.hide_month_dropdown = true;
			this.hide_quarter_dropdown = false;
		}
		this.gettchassessmentbyuserid();
    }

    onselect_subject(event: Event){
    	let selectedOptions = event.target['options'];
		let selectedIndex = selectedOptions.selectedIndex;
		let selectedOptionValue = selectedOptions[selectedIndex].value;
		let selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= '+selectedOptionValue+'   Text= '+selectElementText);
		this.selected_subject = selectedOptionValue;
		this.gettchassessmentbyuserid();
    }

    onselect_month(event: Event){
    	let selectedOptions = event.target['options'];
		let selectedIndex = selectedOptions.selectedIndex;
		let selectedOptionValue = selectedOptions[selectedIndex].value;
		let selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= '+selectedOptionValue+'   Text= '+selectElementText);
		this.selected_month = selectedOptionValue;
		this.gettchassessmentbyuserid();
	}

	gettchassessmentbyuserid(){
		if(this.selected_userid == undefined || this.selected_userid == null || this.selected_userid == ''){
			//alert('Please select an User');
		}else if(this.selected_program == undefined || this.selected_program == null || this.selected_program == ''){
			//alert('Please select a Program');
		}else if(this.selected_subject == undefined || this.selected_subject == null || this.selected_subject == ''){
			//alert('Please select a Subject');
		}else if(this.selected_month == undefined || this.selected_month == null || this.selected_month == ''){
			//alert('Please select an Month');
		}else{
			this.data = [];
			this.assessment_details = [];
			this.hideLoading_indicator = false;	
			this.hide_no_records = false;
			this.tchassessmentService.gettchassessmentdetails_all(this.selected_userid, this.selected_program, this.selected_month, this.selected_subject).subscribe(data => {
					console.log('@@@data: '+JSON.stringify(data));
					this.data = data;	
					this.hideLoading_indicator = true;					
				}, 
				error => {}, 
				() => {}
			);
		}
	}

	view_btn_click(user){
		this.assessment_details = user.assessmenttest;
		
		this.preview_studentname = user.studentname;
		this.preview_program = user.program;
		this.preview_subject = user.subject;
		this.preview_month = user.stage;
		this.preview_level = user.level;
		this.preview_date = user.createdon;
		this.hide_no_records = true;
	}
}
