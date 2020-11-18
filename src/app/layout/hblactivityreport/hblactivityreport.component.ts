import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { HblactivityreportService } from  './hblactivityreport.service';
import swal from 'sweetalert2';
// download as csv
import * as json2csv from 'json2csv'; // convert json file to csv
import { saveAs } from 'file-saver';  // save the file

@Component({
    selector: 'app-hblactivityreport',
    templateUrl: './hblactivityreport.component.html',
    styleUrls: ['./hblactivityreport.component.scss'],
    animations: [routerTransition()]
})

export class HblactivityreportComponent implements OnInit {
	Json2csvParser = json2csv.Parser;

	ngbModalOptions: NgbModalOptions = {
		backdrop : 'static',
		keyboard : false
  	};
	modalReference: any;
	closeResult: string;
	hideLoading_indicator: boolean;
	hideModalLoading_indicator: boolean = true;

	// report data
	all_report_data: any = [];
	current_report_data: any = [];
	current_report_data_bkp: any = [];

	// filter radio button
	selected_radiofilter_value: string = 'district';

	// district
	all_districts_list: any = [];
	district_multiselect_selectedlist = [];
	district_multiselect_settings = {};

	// manager
	all_managers_list: any = [];
	manager_multiselect_selectedlist = [];
	manager_multiselect_settings = {};
	
	// week
	all_weeks_list: any = [];
	week_multiselect_selectedlist = [];
	week_multiselect_settings = {};
	closeDropdownSelection=false;
	disabled=false;

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
		for(let i=1; i<=30; i++) this.all_weeks_list.push(""+i);
		this.selected_radiofilter_value = 'district';
		this.hideLoading_indicator = true;
		this.hideModalLoading_indicator = true;

		this.getalldistricts();
		this.getallmanagers();
	}

	ngOnInit() {
		this.initialize_district_multiselect();
		this.initialize_manager_multiselect();
		this.initialize_week_multiselect();
	}
	
	getalldistricts(){
		this.hideLoading_indicator = false;
		this.hblactivityreportService.getdistincthbldistricts().subscribe(data => {
			this.all_districts_list = data;
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
	}

	getallmanagers(){
		this.hideLoading_indicator = false;
		this.hblactivityreportService.getdistincthblmanagers().subscribe(data => {
			this.all_managers_list = data;
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
	}
	
	// Radio on change event
	radiofilter_on_change(val){
		this.selected_radiofilter_value = val;
		this.district_multiselect_selectedlist = [];
		this.manager_multiselect_selectedlist = [];
		this.week_multiselect_selectedlist = [];
		this.current_report_data = [];
		//console.log('@@@ selected radio button: '+this.selected_radiofilter_value);
	}
	
	//  multi select starts 
	// district
	initialize_district_multiselect() {
		this.district_multiselect_selectedlist = [];
		this.district_multiselect_settings = {
			singleSelection: false,
			idField: 'managerid',
			textField: 'managerid',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			itemsShowLimit: 1,
			allowSearchFilter: true
		};
	}
	district_multiselect_onselectitem(item: any) {}
	district_multiselect_onselectall(items: any) {
		this.district_multiselect_selectedlist = items;
	} 
	
	// manager
	initialize_manager_multiselect() {
		this.manager_multiselect_selectedlist = [];
		this.manager_multiselect_settings = {
			singleSelection: false,
			idField: 'managerid',
			textField: 'managerid',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			itemsShowLimit: 1,
			allowSearchFilter: true
		};
	}
	manager_multiselect_onselectitem(item: any) {}
	manager_multiselect_onselectall(items: any) {
		this.manager_multiselect_selectedlist = items;
	} 

	// week
	initialize_week_multiselect() {
		this.week_multiselect_selectedlist = [];
		this.week_multiselect_settings = {
			singleSelection: true,
			allowSearchFilter: true,
			closeDropDownOnSelection: this.closeDropdownSelection
		};
	}
	week_multiselect_onselectitem(item: any) {}
	toggleCloseDropdownSelection() {
		this.closeDropdownSelection = !this.closeDropdownSelection;
		this.week_multiselect_settings = Object.assign({}, this.week_multiselect_settings,{closeDropDownOnSelection: this.closeDropdownSelection});
	}
	// multi select ends

	getreportdatabydistricts(){
		// get schools array
		let obj = {
			districtsarray: this.district_multiselect_selectedlist
		}
		this.hideLoading_indicator = false;
		this.hblactivityreportService.getdistincthblschoolsbydistrictsarray(obj).subscribe(data => {
			let schoolsarray = data;
			//console.log('@@@ schoolsarray: '+JSON.stringify(schoolsarray))

			// get report data
			let obj = {
				schoolsarray: schoolsarray,
				week: this.week_multiselect_selectedlist[0]
			}
			this.hblactivityreportService.gethblreportdatabyschools(obj).subscribe(data => {
				//console.log('@@@ report data: '+JSON.stringify(data));
				if(Object.keys(data).length > 0){
					this.current_report_data = data['studentdetails'];
					this.current_report_data_bkp = data['studentdetails'];
				}else{
					this.current_report_data = [];
				}
				this.hideLoading_indicator = true;
			}, error => {}, () => {});
		}, error => {}, () => {});
	}

	getreportdatabymanagers(){
		let obj = {
			managersarray: this.manager_multiselect_selectedlist,
			week: this.week_multiselect_selectedlist[0]
		}
		this.hideLoading_indicator = false;
		this.hblactivityreportService.gethblreportdatabymanagers(obj).subscribe(data => {
			//console.log('@@@ report data: '+JSON.stringify(data));
			if(Object.keys(data).length > 0){
				this.current_report_data = data['studentdetails'];
				this.current_report_data_bkp = data['studentdetails'];
			}else{
				this.current_report_data = [];
			}
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
	}

	// Load data
	async getreport(filtervalue){
		if(filtervalue === 'district'){
			if(this.district_multiselect_selectedlist == undefined || this.district_multiselect_selectedlist == null || this.district_multiselect_selectedlist.length <= 0 ){
				swal.fire('Info','Please select some districts','warning');
				this.current_report_data = [];
			}else if(this.week_multiselect_selectedlist == undefined || this.week_multiselect_selectedlist == null || this.week_multiselect_selectedlist.length <= 0 ){
				swal.fire('Info','Please select week','warning');
				this.current_report_data = [];
			}else{
				this.getreportdatabydistricts();
			}
		}else if(filtervalue === 'manager'){
			if(this.manager_multiselect_selectedlist == undefined || this.manager_multiselect_selectedlist == null || this.manager_multiselect_selectedlist.length <= 0 ){
				swal.fire('Info','Please select some managers','warning');
				this.current_report_data = [];
			}else if(this.week_multiselect_selectedlist == undefined || this.week_multiselect_selectedlist == null || this.week_multiselect_selectedlist.length <= 0 ){
				swal.fire('Info','Please select week','warning');
				this.current_report_data = [];
			}else{
				this.getreportdatabymanagers();
			}
		}else{
			swal.fire('Info','Something went wrong','warning');
		}
	}

	download_current_report(){
		let data = this.current_report_data;
        let csvData = this.convertToCSV(data);
        let file = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
		saveAs(file,"HBL_Data.csv");
	}

	download_all_report(){
		let data = this.all_report_data;
        let csvData = this.convertToCSV(data);
        let file = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
		saveAs(file,"HBL_Data.csv");
		this.modalReference.close();
	}

    public convertToCSV(objArray: any, fields?) {
        let json2csvParser = new this.Json2csvParser({ opts: fields });
        let csv = json2csvParser.parse(objArray);
        return csv;
    }

	getallhblreportdata(){
		this.hideModalLoading_indicator = false;
		this.hblactivityreportService.getallhblreportdata().subscribe(data => {
			//console.log('@@@ Report Data: '+JSON.stringify(data))
			this.all_report_data = data['studentdetails'];
			this.hideModalLoading_indicator = true;
		}, error => {}, () => {});
	}

	// Open modal box
	open(content,param) {
		if(param != null || param != undefined){}
		
		//console.log(this.ngbModalOptions);
		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_viewodialevelbaselinemodal(content,param) {
		if(param != null || param != undefined){
			this.modal_student_name = param.studentname;
			this.modal_odia_level_baseline = param.odia_level_baseline;
		}else {
			this.modal_student_name = 'Not Found';
			this.modal_odia_level_baseline = 'Not Found'
		}
		
		//console.log(this.ngbModalOptions);
		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_viewmathlevelbaselinemodal(content,param) {
		if(param != null || param != undefined){
			this.modal_student_name = param.studentname;
			this.modal_math_level_baseline = param.math_level_baseline;
		}else {
			this.modal_student_name = 'Not Found';
			this.modal_math_level_baseline = 'Not Found'
		}
		
		//console.log(this.ngbModalOptions);
		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_viewodialevelendlinemodal(content,param) {
		if(param != null || param != undefined){
			this.modal_student_name = param.studentname;
			this.modal_odia_level_endline = param.odia_level_endline;
		}else {
			this.modal_student_name = 'Not Found';
			this.modal_odia_level_endline = 'Not Found'
		}
		
		//console.log(this.ngbModalOptions);
		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_viewmathlevelendlinemodal(content,param) {
		if(param != null || param != undefined){
			this.modal_student_name = param.studentname;
			this.modal_math_level_endline = param.math_level_endline;
		}else {
			this.modal_student_name = 'Not Found';
			this.modal_math_level_endline = 'Not Found'
		}
		
		//console.log(this.ngbModalOptions);
		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_viewodiaactivitymodal(content,param) {
		//console.log('@@@odia activity modal param: '+JSON.stringify(param));
		if(param != null || param != undefined){
			this.modal_student_name = param.studentname;
			this.modal_odia_activity = param.activitydetails[0].odia_activity;
		}else {
			this.modal_student_name = 'Not Found';
			this.modal_odia_activity = []
		}
		
		//console.log(this.ngbModalOptions);
		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_viewmathactivitymodal(content,param) {
		if(param != null || param != undefined){
			this.modal_student_name = param.studentname;
			this.modal_math_activity = param.activitydetails[0].math_activity;
		}else {
			this.modal_student_name = 'Not Found';
			this.modal_math_activity = []
		}
		
		//console.log(this.ngbModalOptions);
		this.modalReference = this.modalService.open(content, this.ngbModalOptions);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
	}
	open_downloadfilemodal(content) {
		this.getallhblreportdata();

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
			this.current_report_data = this.current_report_data_bkp;
		} else {
			this.current_report_data = this.current_report_data_bkp.filter(element => element.studentname.toLowerCase().includes(term.trim().toLowerCase())
		  );
		}
	}
}