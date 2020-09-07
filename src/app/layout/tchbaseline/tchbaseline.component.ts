import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TchbaselineService } from './tchbaseline.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-tchbaseline',
    templateUrl: './tchbaseline.component.html',
    styleUrls: ['./tchbaseline.component.scss']
})
export class TchbaselineComponent implements OnInit {
	modalReference: any;
	closeResult: string;

	public teachers : any;
	public students: any;
	public baseline_details: any = []; 
	public student_levels_list: any;

	userid: string;
	selected_userid: string;
	selected_username: string;
	selected_program: string = '';
	
	preview_studentname: string;
	preview_program: string = '';
	preview_subject: string = '';
	preview_level: string = '';
	preview_date: string = '';

	hideLoading_indicator: boolean;
	hide_no_records: boolean = false;

	// auto-complete 
	keyword = 'username';
	keyword1 = 'studentname';
	selected_studentid: any;
	selected_studentname: any;
	detailsid: any;

	set_subject: any;
	level_id: any;


    constructor(
		private modalService: NgbModal,
        public router: Router,
		private tchbaselineService: TchbaselineService
	) {
		this.hideLoading_indicator = true;
	}
	
	ngOnInit() {
		this.hideLoading_indicator = false;
		this.tchbaselineService.getallteachers().subscribe(data => {
				this.teachers = data;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}

	
	onchange_teachers_select(val: string) {
	}
	onfocus_teachers_select(e){
	}
	onselect_teachers_select(item){
		this.selected_userid = item.userid;
		this.selected_username = item.username;
		this.selected_program ='';
		this.students =[];
	}

	onselect_program(event: Event){
    	let selectedOptions = event.target['options'];
		let selectedIndex = selectedOptions.selectedIndex;
		let selectedOptionValue = selectedOptions[selectedIndex].value;
		let selectElementText = selectedOptions[selectedIndex].text;
		this.selected_program = selectedOptionValue;
		this.get_student_list(this.selected_userid, this.selected_program);
	}
	
	get_student_list(selected_userid, selected_program){
		if(selected_userid == undefined || selected_userid == null || selected_userid == ''){
		}else if(selected_program == undefined || selected_program == null || selected_program == ''){
		}else {
			this.hideLoading_indicator = false;
			this.tchbaselineService.getallstudentsbyteacher_program(selected_userid, selected_program).subscribe(data => {
					this.students = data;	
					this.hideLoading_indicator = true;					
				}, 
				error => {}, 
				() => {}
			);
		}
	}
	
	onchange_students_select(val: string) {
	}
	onfocus_students_select(e){
	}
	onselect_students_select(item){
		this.detailsid = item._id;
		this.selected_studentid = item.studentid;
		this.selected_studentname = item.studentname;
		this.get_student_level_list(this.selected_userid, this.selected_program, this.detailsid);
	}

	get_student_level_list(selected_userid, selected_program, detailsid){
		if(selected_userid == undefined || selected_userid == null || selected_userid == ''){
		}else if(selected_program == undefined || selected_program == null || selected_program == ''){
		}else if(detailsid == undefined || detailsid == null || detailsid == ''){
		}else {
			this.hideLoading_indicator = false;
			this.tchbaselineService.getallleveldetailsbydetailsid(detailsid).subscribe(data => {
				this.student_levels_list = data;	
				this.hideLoading_indicator = true;					
			}, 
			error => {}, 
			() => {}
		);
		}
	}

	view_btn_click(student_level){
		this.level_id = student_level._id;
		this.preview_subject = student_level.subject;
		this.preview_level = student_level.level;
		this.baseline_details = student_level.baselinetest;
		this.preview_date = student_level.createdon;
		this.preview_studentname = this.selected_studentname;
		this.preview_program = this.selected_program;
		this.hide_no_records = true;
	}
	
	open(content,user) {
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
	
    onselect_subject(event: Event){
    	let selectedOptions = event.target['options'];
		let selectedIndex = selectedOptions.selectedIndex;
		let selectedOptionValue = selectedOptions[selectedIndex].value;
		let selectElementText = selectedOptions[selectedIndex].text;
		this.set_subject = selectedOptionValue;
	}
	
	setsubject(){
		if(this.level_id == undefined || this.level_id == null || this.level_id == ''){
		}else if(this.preview_level == undefined || this.preview_level == null || this.preview_level == ''){
		}else if(this.set_subject == undefined || this.set_subject == null || this.set_subject == ''){
		}else {
			this.hideLoading_indicator = false;
			this.tchbaselineService.updatestudentlevelbyid(this.level_id, {subject: this.set_subject}).subscribe(data => {
				this.hideLoading_indicator = true;	
				this.modalReference.close();	
				this.get_student_level_list(this.selected_userid, this.selected_program, this.detailsid);
				
				let obj = {
					_id: this.level_id,
					subject: this.set_subject,
					level: this.preview_level,
					baselinetest: this.baseline_details,
					createdon: this.preview_date
				}
				this.view_btn_click(obj);
			}, 
			error => {}, 
			() => {}
		);
		}
	}
}
