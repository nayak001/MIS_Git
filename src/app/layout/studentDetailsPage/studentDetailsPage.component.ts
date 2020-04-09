import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StudentDetailsPageService,ValidationService } from './studentDetailsPage.service';
import { $ } from 'protractor';

import * as jquery from "jquery";
import * as  moment from 'moment/moment';
import { shallowEqual } from '@angular/router/src/utils/collection';



@Component({
	selector: 'app-studentDetailsPage',
	templateUrl: './studentDetailsPage.component.html',
	styleUrls: ['./studentDetailsPage.component.scss'],
	animations: [routerTransition()]
})
export class StudentDetailsPageComponent implements OnInit {
	userModalFormGroup: FormGroup;
	check:boolean = false;
	check1:boolean = false;
	check2:boolean = false;
	check3:boolean = false;
	
	userType:any = 'all'
	distric: any =  'all'
	block: any =  'all'
	program_type: any =  'all'

	avg_attendance : any = 'all';
	sex: any = 'all';
	baseline : any = 'all';
	seventyece :any = 'all';
	mfRowsOnPage : any = 10;
	mfActivePage :any ;
    enrolldate:Date ;
	usersubmitaction: string;
	all_blocks: any = [];
	getallStudents:any = [];
	allDistics: any = [];
	selected_block: any = '';
	selectedDistic: any = 'Select';
	public data: any;
	public filterData: any;
	closeResult: string;
	model: any;
	hideLoading_indicator: boolean;
	isLoaded: boolean = false;
	showpassword: boolean;
	showhide_button: string;
	allDisticBlocks: any = [];
	modalReference: any;
	modal_id: string;
	modal_userid: string;
	modal_username: string;
	modal_emailid: string;
	modal_password: string;
	modal_usertype: string;
	modal_gender: string;
	selectedBlock: any;
	all_Data: any = [];
	isdata_table: boolean = false;
	userDetails:any;
	assessDetails:any;

	constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder,
		private translate: TranslateService,
		public router: Router,
		private StudentDetailsPageService: StudentDetailsPageService
	) {

		this.hideLoading_indicator = true;
		this.showpassword = false;
		this.showhide_button = 'Show';
		this.hideLoading_indicator = false;
		this.getBlockDetails()

		 this.getallDetailsStudents()

	}

	async ngOnInit() {
	
	
	}

	getRoundedValue(value){
 	return	Math.round(value);
	}

	

	openmathAssessDetails(content, center){
		this.assessDetails = center
		debugger
		this.check=true;
			this.modalReference = this.modalService.open(content, center);
			
			this.modalReference.result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
				
			

			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			
			});
	

	}
	openenglishAssessDetails(content, center){
		this.assessDetails = center
		debugger
		
			this.modalReference = this.modalService.open(content, center);
		
			this.modalReference.result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
				
			

			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			
			});
	

	}


	openodiaAssessDetails(content, center){
		this.assessDetails = center
		debugger
		
			this.modalReference = this.modalService.open(content, center);
		
			this.modalReference.result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
				
			

			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			
			});
	

	}

	openQuaterlyAssessDetails(content, center){
		this.assessDetails = center
		debugger
		this.check=true;
			this.modalReference = this.modalService.open(content, center);
			
			this.modalReference.result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
				
			

			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			
			});
	

	}



	openStudentDetails(content, center){
		this.userDetails = center
		debugger
			this.modalReference = this.modalService.open(content, center);
			this.modalReference.result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
				this.check = true;
			this.check1 = false;
			this.check2 = false;
			this.check3 = false;
			

			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				
			});this.check = true;
			this.check1 = false;
			this.check2 = false;
			this.check3 = false;
			
	

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
	getDate(data){
		if(data && data.student && data.student.registration_date){
			var date = moment(data.student.registration_date).format('DD MMM, YYYY')
			return date
			
		}
		return ''

		

	}
	
	search(term: string) {
		
	  }
	viewData(){
		this.isLoaded = false
		this.isdata_table = false
		this.getallDetailsStudents()
	}
	getallDetailsStudents(){
		const data = {
			userType:this.userType,
			distric:this.distric,
			block:this.block,
			program_type:this.program_type,
			baseline:this.baseline,
			sex:this.sex,
			enrolldate:this.enrolldate,
			seventyece:this.seventyece,
			avg_attendance : this.avg_attendance,
		}
		this.StudentDetailsPageService.getallDetailsStudents(data).subscribe(data => {
			// console.log('### data: '+JSON.stringify(data));
			console.log(data)
			this.getallStudents = data
			this.isLoaded = true
			if(this.getallStudents.length == 0){
				this.isdata_table = true;
				}
				else{
					this.isdata_table = false;
	
				}

	})
   };
   getBlockDetails() {		
	this.StudentDetailsPageService.getBlocks().subscribe(data => {
		// console.log('### data: '+JSON.stringify(data));
		//console.log(data)
		
		this.allDisticBlocks = data
		for (var i = 0; i < this.allDisticBlocks.length; i++) {
			if (this.allDistics.length > 0) {
				let isDistic = false
				for (var j = 0; j < this.allDistics.length; j++) {
					if (this.allDistics[j].district == this.allDisticBlocks[i].district) {
						isDistic = true

					}
				}
				if (!isDistic) {
					this.allDistics.push(this.allDisticBlocks[i])
				}

			}
			else {
				this.allDistics.push(this.allDisticBlocks[i])
			}

		}

		console.log(this.allDistics)
		// this.all_blocks=data;
	},
		error => { },
		() => { }
	);

}

download(){
	const rows = [
	["Name", "Date of Enrollment", "Name of the Type", "Program Type", "Block","District","State",
	"ECE Level", "PG Maths Level", "PG English Level", "PG Odia Level","Avg Monthly Assessment Score",
	"Quarterly Assessment Score","AvgQuarterly Assessment Score", "Monthly English Assessment Score", "Avg Attendance","Age Appropriate Learning Outcomes Achieved",
	"LevelJumped"]
	];
	this.getallStudents.forEach(value => {
	var usertType =''
	if (value && value.user && value.user.usertype){
	usertType = value.user.usertype
	}
	var array = [value.student.studentname , value.student.registration_date , usertType , value.student.program , value.center.block , value.center.district,value.center.state,
	value.student.ec_level , value.student.math_level , value.student.eng_level , value.student.odia_level ,
	value.averages.AvgMonthlyAssestmentScore , value.averages.QuarterlyAssestmentScore , value.averages.AvgQuarterlyAssestmentScore,value.averages.MonthlyEnglishAssestmentScore , value.averages.AverageAttendance,
	value.averages.AgeAppropriateLearningOutcomesAchieved , value.averages.LevelJumped]
	rows.push(array)
	});
	
	let csvContent = "data:text/csv;charset=utf-8,"
	+ rows.map(e => e.join(",")).join("\n");
	var encodedUri = encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", "StudentDetails.csv");
	document.body.appendChild(link); // Required for FF
	
	link.click()
	}
selectBlock(distic) {
	//this.selectedBlock = 'all'
	this.all_blocks = []
	for (let i = 0; i < this.allDisticBlocks.length; i++) {
		if (this.allDisticBlocks[i] && this.allDisticBlocks[i].district) {
			if (this.allDisticBlocks[i].district == distic) {
				this.all_blocks.push(this.allDisticBlocks[i])
			}
		}

	}
	console.log(this.all_blocks)


}
show(value){

	
	if(value == 'shoDetails'){
		
		this.check  =  !this.check ;
	}
	 if(value == 'eceDetails'){
		this.check1 = !this.check1 ;
	}
	if(value == 'pgeDetails'){
		this.check2 = !this.check2 ;
	}
	if(value == 'scoresDetails'){
		this.check3 = !this.check3 ;;
	}
}
}


