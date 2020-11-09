import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { HblactivityreportService } from  './hblactivityreport.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-hblactivityreport',
    templateUrl: './hblactivityreport.component.html',
    styleUrls: ['./hblactivityreport.component.scss'],
    animations: [routerTransition()]
})

export class HblactivityreportComponent implements OnInit {
	ngbModalOptions: NgbModalOptions = {
		backdrop : 'static',
		keyboard : false
  	};
	modalReference: any;
	closeResult: string;
	hideLoading_indicator: boolean;

	// activity
	all_students_list: any = [];
	all_students_list_bkp: any = []; 

	// manager
	all_managers_list: any = [];
	selected_managerid: string = '';

	// volunteer
	all_volunteers_list: any = [];
	selected_volunteerid: string = '';
	
	// week
	all_weeks_list: any = [];
	selected_week: string = '';

	// Modal
	modal_student_name: string = '';
	modal_week: string = '';
	modal_odia_level_baseline: string = '';
	modal_math_level_baseline: string = '';
	modal_odia_level_endline: string = '';
	modal_math_level_endline: string = '';

	modal_odia_activity: any = [];
	modal_math_activity: any = []; 

    constructor(
		private modalService: NgbModal,
        public router: Router,
		private hblactivityreportService: HblactivityreportService
	) {
		// initialize week list
		for(let i=1; i<=56; i++) this.all_weeks_list.push(""+i);

		// initialize selected list values
		this.selected_managerid = 'all';
		this.selected_volunteerid = 'all';
		this.selected_week = '1';

		this.hideLoading_indicator = true;

		this.getallmanagersdata();
		//this.load_records();
	}

	ngOnInit() {}
	
	// load records
	load_records(){
		this.getallhblactivitiesandbaselines(this.selected_managerid, this.selected_volunteerid, this.selected_week);
	}

	getallmanagersdata(){
		this.hideLoading_indicator = false;
		this.hblactivityreportService.getallhblmanagers().subscribe(data => {
			this.all_managers_list = data;
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
	}

	gethblvolunteerbymanagerid(managerid){
		this.hideLoading_indicator = false;
		this.hblactivityreportService.gethblvolunteerbymanagerid(managerid).subscribe(data => {
			this.all_volunteers_list = data;
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
	}

	getallhblactivitiesandbaselines(managerid, volunteerid, week){
		this.hideLoading_indicator = false;
		this.hblactivityreportService.getallhblactivitiesandbaselines(managerid, volunteerid, week).subscribe(data => {
			console.log('@@--> getallhblactivitiesandbaselines: '+JSON.stringify(data));
			if(Object.keys(data).length > 0){
				this.all_students_list = data['studentdetails'];
				this.all_students_list_bkp = data['studentdetails'];
			}else{
				this.all_students_list = [];
			}
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
	}

	// Select On Change Events
	managerlist_onchange(event: Event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectedElementText = selectedOptions[selectedIndex].text;
		this.selected_managerid = selectedOptionValue;

		this.all_volunteers_list = [];
		this.gethblvolunteerbymanagerid(this.selected_managerid);
		this.load_records();
	}
	
	volunteerlist_onchange(event: Event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectedElementText = selectedOptions[selectedIndex].text;
		this.selected_volunteerid = selectedOptionValue;
		this.load_records();
	}
	
	weeklist_onchange(event: Event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectedElementText = selectedOptions[selectedIndex].text;
		this.selected_week = selectedOptionValue;
		this.load_records();
	}

	// Open modal box
	open(content,param) {
		if(param != null || param != undefined){}
		
		console.log(this.ngbModalOptions);
		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_viewodialevelbaselinemodal(content,param) {
		if(param != null || param != undefined){
			this.modal_student_name = param.baselinedetails[0].studentname;
			this.modal_odia_level_baseline = param.baselinedetails[0].odia_level_baseline;
		}else {
			this.modal_student_name = 'Not Found';
			this.modal_odia_level_baseline = 'Not Found'
		}
		
		console.log(this.ngbModalOptions);
		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_viewmathlevelbaselinemodal(content,param) {
		if(param != null || param != undefined){
			this.modal_student_name = param.baselinedetails[0].studentname;
			this.modal_math_level_baseline = param.baselinedetails[0].math_level_baseline;
		}else {
			this.modal_student_name = 'Not Found';
			this.modal_math_level_baseline = 'Not Found'
		}
		
		console.log(this.ngbModalOptions);
		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_viewodialevelendlinemodal(content,param) {
		if(param != null || param != undefined){
			this.modal_student_name = param.baselinedetails[0].studentname;
			this.modal_odia_level_endline = param.baselinedetails[0].odia_level_endline;
		}else {
			this.modal_student_name = 'Not Found';
			this.modal_odia_level_endline = 'Not Found'
		}
		
		console.log(this.ngbModalOptions);
		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_viewmathlevelendlinemodal(content,param) {
		if(param != null || param != undefined){
			this.modal_student_name = param.baselinedetails[0].studentname;
			this.modal_math_level_endline = param.baselinedetails[0].math_level_endline;
		}else {
			this.modal_student_name = 'Not Found';
			this.modal_math_level_endline = 'Not Found'
		}
		
		console.log(this.ngbModalOptions);
		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_viewodiaactivitymodal(content,param) {
		if(param != null || param != undefined){
			this.modal_student_name = param.activitydetails[0].studentname;
			this.modal_odia_activity = param.activitydetails[0].odia_activity;
		}else {
			this.modal_student_name = 'Not Found';
			this.modal_odia_activity = []
		}
		
		console.log(this.ngbModalOptions);
		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_viewmathactivitymodal(content,param) {
		if(param != null || param != undefined){
			this.modal_student_name = param.activitydetails[0].studentname;
			this.modal_math_activity = param.activitydetails[0].math_activity;
		}else {
			this.modal_student_name = 'Not Found';
			this.modal_math_activity = []
		}
		
		console.log(this.ngbModalOptions);
		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
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
	
	

	searchstudent(term: string) {
		term = (term == undefined || term == null) ? '' : term;
		if(!term) {
			this.all_students_list = this.all_students_list_bkp;
		} else {
			this.all_students_list = this.all_students_list_bkp.filter(element => element.studentname.toLowerCase().includes(term.trim().toLowerCase())
		  );
		}
	}


	toast(type, message){
		const Toast = swal.mixin({
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000
		})
			
		Toast.fire({
			type: type,
			title: message
		})
	}
}

// Toast Message
