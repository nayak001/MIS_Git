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
	loader : Boolean = false
	getallStu:any;
	page: any = 1;
	totalPage: any;
	page_no:any = 1;
	center_type : any ='all'
	api_hit:any = true
	
	userType:any = 'all'
	distric: any =  'all'
	block: any =  'all'
	program_type: any 

count : any;

	avg_attendance : any = 'all';
	sex: any = 'all';
	baseline : any = 'all';
	seventyece :any = 'all';
	mfRowsOnPage : any = 25;
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
	downloadclick : boolean = false;

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

	

	highlight(index:String){

		document.querySelectorAll('.record-row').forEach(function(ele) {
			console.log(ele.getAttribute("id"));
			if(ele.getAttribute("id") == "user_"+ index) {
				ele.classList.add('highlight');
			} else {
				ele.classList.remove('highlight');
			}
			// Now do something with my button
		});}



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
			this.modalReference = this.modalService.open(content,{ size: 'lg' });
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
		this.api_hit = false
		this.page_no = 1
		this.isLoaded = false
		this.isdata_table = false
		this.getallDetailsStudents()
	}


	getPageNo(event) {
		debugger
		this.loader = true;
		try{
		// const page = event.target.text.match(/\d+/)[0]
		this.page_no = event
		}catch(error){
console.log(error)
		}
		this.getallDetailsStudents()
	}


	// setTimeout(getallDetailsStudents(),300)


	getallDetailsStudents(){
		this.api_hit = false
		const selectControl:any = document.getElementById("program_type");

		const program_type = selectControl ? selectControl.value : "all";

		setTimeout(() => {
			this.program_type = program_type
		},300);

		const data = {
			centertype:this.center_type,
			distric:this.distric,
			block:this.block,
			program_type:program_type,
			baseline:this.baseline,
			sex:this.sex,
			enrolldate:this.enrolldate,
			seventyece:this.seventyece,
			avg_attendance : this.avg_attendance,
			page_no :this.page_no,
			limit:10,
			downloadclick:this.downloadclick,
		}
		this.StudentDetailsPageService.getallDetailsStudents(data).subscribe(res => {

			// console.log('### data: '+JSON.stringify(data));
			debugger
			this.program_type = program_type
			
			console.log(res)
			this.getallStudents = res
			this.isLoaded = true
			if(this.getallStudents.length == 0){
				this.isdata_table = true;
				}
				else{
					this.isdata_table = false 
			this.count = this.getallStudents[0].Count		
				}
		this.loader = false
		

		this.api_hit = true

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
					if (this.allDistics[j].districtvalue == this.allDisticBlocks[i].districtvalue) {
						isDistic = true;
					}
				}
				if (!isDistic) {
					this.allDistics.push(this.allDisticBlocks[i]);
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


 headCols =[];
//applyProgramFilter = 
canDisplay(type){
	return this.program_type == "all" || this.program_type == type; 
}


download(){
	this.downloadclick = true;
	this.loader = true;
	const rows = [
	["Name", "Date of Enrollment","Sex","Center Name","Centerid","Center Type","Name of the Type", "Program Type", "Block","District","State",
	"ECE Level", "PG Maths Level", "PG English Level", "PG Odia Level","Maths Assessment Score","English Assessment Score","Odia Assessment Score","Quarterly ECE Assessment Score",
	"Avg Attendance	","No of Endline Assessment Completed in PG	", "No of Levels jumped in Maths", "No of Levels jumped in Odia","No of Levels jumped in English",
	"Total Number of Quarter 4 Assessment Completed in ECE","Acheived atleast 70% age-appropriate learning outcomes in ECE",
	"Baseline Test Participated","Class/Grade of the Student"]
	];


	const data = {
		centertype:this.center_type,
		distric:this.distric,
		block:this.block,
		program_type:this.program_type,
		baseline:this.baseline,
		sex:this.sex,
		enrolldate:this.enrolldate,
		seventyece:this.seventyece,
		avg_attendance : this.avg_attendance,
		downloadclick:this.downloadclick,

	}
	this.StudentDetailsPageService.getallDetailsStudents(data).subscribe(res => {
		// console.log('### data: '+JSON.stringify(data));
		debugger
		this.loader = false;
		console.log(res)
		this.getallStu = res
		this.isLoaded = true
	
		





	this.getallStu.forEach(value => {
	var usertType =''
		var block = ''
		if (value && value.student && value.student.user && value.student.user.usertype) {
		usertType = value.student.user.usertype
		
		};

	

 		const getAssestmentString  = (score) => {

 
		//var math_score = {month1: { value : 0, isgiven :'yes' } , month2 : { value:10, isgiven: 'no'}};


		var m_display = '';
		for(var month in score){
			var month_score = score[month];
			var month_number = month.replace("month","");
			m_display += "Assestment "+ month_number +"- " + month_score.value +  "/"+ month_score.isgiven + "  |  "
		}
return m_display;
	}

	const geteceAssestmentString  = (score) => {

 
		//var math_score = {month1: { value : 0, isgiven :'yes' } , month2 : { value:10, isgiven: 'no'}};


		var m_display = '';
		for(var quarter in score){
			var quarter_score = score[quarter];
			var quarter_number = quarter.replace("quarter","");
			m_display += "Quarter "+ quarter_number +"- " + quarter_score.value +  "/"+ quarter_score.isgiven + "  |  "
		}
return m_display;
	}

	if(value.student.program == "pge"){

		const math_score = value.scores.math;
		const eng_score = value.scores.english;
		const odia_score = value.scores.odia;

		var math_String = getAssestmentString(math_score);
		var eng_String = getAssestmentString(eng_score);
		var odia_String = getAssestmentString(odia_score);
		}else{
			const ece_score = value.scores
			var ece_string = geteceAssestmentString(ece_score)
		}


		const mathbaseline = value.mathbaseline
		const engbaseline = value.engbaseline
		const odiabaseline = value.odiabaseline

		const getendline = (mathbaseline,engbaseline,odiabaseline) =>{
			var endl = ''
			endl += "math -" + mathbaseline + "   " + "eng -" + engbaseline + "    " + "odia -"+ odiabaseline

			return endl
		}

		var endline = getendline(mathbaseline,engbaseline,odiabaseline)

		debugger

 	  

		var array = [value.student.studentname , value.student.registration_date ,value.student.gender,value.student.center.centername,value.student.center.centerid,value.student.center.centertype,
		usertType , value.student.program , value.student.center.block, value.student.center.district || "",value.state,
		value.student.ec_level , value.student.math_level , value.student.eng_level , value.student.odia_level ,
		math_String , eng_String || "", odia_String || "" , ece_string || "", value.avg_attendance || "",
		endline || "",value.jumpmath,value.jumpodia,value.jumpeng,
		value.quarter4ece,value.ispass,value.isparticipated,value.student.class]


		rows.push(array)
	});
	
	let csvContent = "data:text/csv;charset=utf-8,"
	+ rows.map(e => e.join(",")).join("\n");
	var encodedUri = encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", "StudentDetails.csv");
	document.body.appendChild(link); // Required for FF
	this.api_hit = true
	link.click()
})

	}
selectBlock(distic) {
	//this.selectedBlock = 'all'
	this.all_blocks = []
	for (let i = 0; i < this.allDisticBlocks.length; i++) {
		if (this.allDisticBlocks[i] && this.allDisticBlocks[i].districtvalue) {
			if (this.allDisticBlocks[i].districtvalue == distic) {
				this.all_blocks.push(this.allDisticBlocks[i])
			}
		}

	}
	console.log(this.all_blocks);
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


