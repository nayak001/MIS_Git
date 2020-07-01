import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CenterDetailsService } from './centerDetails.service';

@Component({
	selector: 'app-centerDetails',
	templateUrl: './centerDetails.component.html',
	styleUrls: ['./centerDetails.component.scss'],
	animations: [routerTransition()]
})
export class CenterDetailsComponent implements OnInit {
	userModalFormGroup: FormGroup;
	center_type: any = 'all'
	distric: any = 'all'
	block: any = 'all'
	program_type: any = 'all'
	class_type: any = ''
	is_program_type: any = 'all'
	noda : any = false;
	centerDetails: any;
	check: boolean = true;
	api_hit : any = true
	check1: boolean = false;
	check2: boolean = false;
	check3: boolean = false;
	check4:boolean = false;
	isClass:boolean = false;
	alldata : any ;
	user : any ;
	loader : Boolean = false
	usersubmitaction: string;
	all_blocks: any = [];
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
	modal_contactnumber: string;
	modal_permanentaddress: string;
	all_Data: any = [];
	isdata_table: boolean = false;
	downloadclick : boolean = false;
	emailid_exists: boolean = false;
	disable_emailid: boolean = false;
	Details:any;

	page: any = 1;
	totalPage: any;
	page_no:any = 1;
	count : any;
	currentrow : any;
	fixedHeader : boolean = false;
	scrollEvent : boolean=false
	// selectrow : any;

	constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder,
		private translate: TranslateService,
		public router: Router,
		private centerDetailsService: CenterDetailsService
	) {

		this.hideLoading_indicator = true;
		this.showpassword = false;
		this.showhide_button = 'Show';
	}

	async ngOnInit() {
		this.hideLoading_indicator = false;
		await this.getBlockDetails()

		await this.getCenterDetails()
		// window.addEventListener('scroll', this.myFunction, true);
	}




	// myFunction() {



	// 		var header = document.getElementById("headerid");
	// 		var sticky = header.offsetTop;

	// if (window.pageYOffset > sticky) {
	// 	header.classList.add("sticky");
	// } else {
	// 	header.classList.remove("sticky");
	// 	 }


	// }



	getBlockDetails() {
		this.centerDetailsService.getBlocks().subscribe(data => {
			//console.log(data)
			this.allDisticBlocks = data
			console.log('### allDisticBlocks: '+JSON.stringify(this.allDisticBlocks));
			for (var i = 0; i < this.allDisticBlocks.length; i++) {
				if (this.allDistics.length > 0) {
					let isDistic = false
					for (var j = 0; j < this.allDistics.length; j++) {
						if (this.allDistics[j].districtvalue == this.allDisticBlocks[i].districtvalue) {
							isDistic = true;
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
			console.log('@@@ allDistics: '+JSON.stringify(this.allDistics));
			// this.all_blocks=data;
		},
			error => { },
			() => { }
		);

	}
	viewData() {

		this.api_hit = false
		// this.program_type = this.is_program_type
		this.isLoaded = false
		this.page_no = 1
		this.isdata_table = false
		this.getCenterDetails()
	}



	getPageNo(event) {
		this.loader = true
		this.page_no = event
		this.getCenterDetails()

	}



	selectedRowIndex: number = 1;

	highlight(index:String){

		document.querySelectorAll('.record-row').forEach(function(ele) {
			console.log(ele.getAttribute("id"));
			if(ele.getAttribute("id") == "user_"+ index) {
				ele.classList.add('highlight');
			} else {
				ele.classList.remove('highlight');
			}
			// Now do something with my button
		});

		//his.selectedRowIndex = user.center.centername;
		// document.getElementsByClassName("record-row").forEach(element => {

		// });
	}

	getCenterDetails() {
		this.api_hit = false
		const data = {
			center_type: this.center_type,
			distric: this.distric,
			block: this.block,
			program_type: this.program_type,
			page_no :this.page_no,
			limit:10,
			downloadclick:this.downloadclick,
			class: this.class_type
		}
		this.centerDetailsService.getCenterDetails(data).subscribe(data => {
			// console.log('### data: '+JSON.stringify(data));
			console.log(data)
			this.filterData = data;
			//this.filterData = [];
			 this.isLoaded = true;
			if (this.filterData.length == 0) {
				this.isdata_table = true;

			}
			else {
				this.isdata_table = false;
				this.count = this.filterData[0].centercount
			}

			this.loader = false;
			this.api_hit = true
		});
	}


	getRoundedValue(value){
		return	Math.round(value);
	   }



	   classFunction(content, center){
		this.Details = center
		debugger
			this.modalReference = this.modalService.open(content, center);
			this.modalReference.result.then((result) => {
				this.closeResult = `Closed with: ${result}`;



			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

			});


	}








	   quarterStudentsDetails(content, center){
		this.Details = center
		debugger
			this.modalReference = this.modalService.open(content, center);
			this.modalReference.result.then((result) => {
				this.closeResult = `Closed with: ${result}`;



			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

			});


	}




	englishStudentsDetails(content, center){


		this.Details = center
		debugger
			this.modalReference = this.modalService.open(content, center);
			this.modalReference.result.then((result) => {
				this.closeResult = `Closed with: ${result}`;



			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

			});
	}



	mathStudentsDetails(content, center){
		this.Details = center
		debugger
			this.modalReference = this.modalService.open(content, center);
			this.modalReference.result.then((result) => {
				this.closeResult = `Closed with: ${result}`;



			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

			});


	}



	odiaStudentsDetails(content, center){
		this.Details = center
		debugger
			this.modalReference = this.modalService.open(content, center);
			this.modalReference.result.then((result) => {
				this.closeResult = `Closed with: ${result}`;



			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

			});


	}




	opencenterDetails(content, center) {
		this.user = center
		this.modalReference = this.modalService.open(content,{ size: 'lg' });
		this.modalReference.result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
			this.check = true;
			this.check1 = false;
			this.check2 = false;
			this.check3 = false;
			this.check4 = false;


		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			this.check = true;
			this.check1 = false;
			this.check2 = false;
			this.check3 = false;
			this.check4 = false;
		});


	}
	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

	selectProgramType(programType){
		if(programType == 'pge'){
			this.isClass = true
		}
		else{
			this.isClass = false
			this.class_type = ''
		}

	}

	selectBlock(distic) {
		console.log('@@@ selected distic: '+distic);
		this.selectedBlock = 'all';
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
	download() {

		this.loader = true
		this.downloadclick = true;
		const rows = [
			["Id", "Name", "Type", "Program Type", "Block", "District", "State", "Educator Name", "Students","Female Students",
				"ECE - Level 1", "ECE - Level 2", "ECE - Level 3", "PG English Level 1", "PG English Level 2", "PG English Level 3",
				"PG English Level 4", "PG English Level 5", "PG Odia Level 1", "PG Odia Level 2", "PG Odia Level 3",
				"PG Odia Level 4", "PG Odia Level 5", "PG Math Level 1", "PG Math Level 2", "PG Math Level 3", "PG Math Level 4",
				"PG Math Level 5", "Average Attendance", "Percentage of students achieving monthly goals in PG - English",
				"Percentage of students achieving monthly goals in PG - Odia", "Percentage of students achieving monthly goals in PG - Maths	",
				"Percentage of students achieving atleast 70% of age-appropriate skills in ECEProgram",
				"Percentage of students who jumped 1 Level in PG - English", "Percentage of students who jumped 1 Level in PG - Odia",
				"Percentage of students who jumped 1 Level in PG - Maths", "Percentage of students who jumped 2 Levels in PG - English",
				"Percentage of students who jumped 2 Levels in PG - Odia", "Percentage of students who jumped 2 Levels in PG - Maths",
				"No of Students who have graduated from ECE program	", "No of Students who have graduated from PG program","No of Students who have dropped out of the ECE program",
			"No of Students who have dropped out of the PG program","Class/Grade of the Student"]

		];
		const data = {
			center_type: this.center_type,
			distric: this.distric,
			block: this.block,
			program_type: this.program_type,
			downloadclick:this.downloadclick

		}

		this.centerDetailsService.getCenterDetails(data).subscribe(data => {
			// console.log('### data: '+JSON.stringify(data));
			debugger
			console.log(data)
			this.alldata = data;
			//this.filterData = [];
			 this.isLoaded = true;

			// if (this.alldata.length == 0) {
			// 	this.isdata_table = true;
			// }
			// else {
			// 	this.isdata_table = false;

			// }

			this.loader = false



		this.alldata.forEach(value => {
			var usertType = ''
			if (value && value.user && value.user.usertype) {
				usertType = value.user.usertype
			}



			const getAssestmentString  = (score) => {


				//var math_score = {month1: { value : 0, isgiven :'yes' } , month2 : { value:10, isgiven: 'no'}};


				var m_display = '';
				for(var month in score){
					var month_score = score[month];
					var month_number = month.replace("month","");
					m_display += "Assestment "+ month_number +" - " + month_score.value +  "/"+ month_score.check + "  |  "
				}
		return m_display;
			}

			const geteceAssestmentString  = (score) => {


				//var math_score = {month1: { value : 0, isgiven :'yes' } , month2 : { value:10, isgiven: 'no'}};


				var m_display = '';
				for(var quarter in score){
					var quarter_score = score[quarter];
					var quarter_number = quarter.replace("quarter","");
					m_display += "Assessment "+ quarter_number +" - " + quarter_score.value +  "/"+ quarter_score.check + "  |  "
				}
		return m_display;
			}



				const math_score = value.pgescores.math;
				const eng_score = value.pgescores.english;
				const odia_score = value.pgescores.odia;

				var math_String = getAssestmentString(math_score);
				var eng_String = getAssestmentString(eng_score);
				var odia_String = getAssestmentString(odia_score);

					const ece_score = value.ecescore
					var ece_string = geteceAssestmentString(ece_score)












			var array = [value.center.centerid, value.center.centername, usertType, value.center.centertype || "", value.center.block || "", value.center.district || "",
			value.state, value.educator, value.no_of_students,value.no_female_students
				, value.eceLevel1, value.eceLevel2, value.eceLevel3, value.pgEngl1, value.pgEngl2
				, value.pgEngl3, value.pgEngl4, value.pgEngl5, value.pgOdia1, value.pgOdia2
				, value.pgOdia3, value.pgOdia4, value.pgOdia5, value.pgMath1, value.pgMath2,
			value.pgMath3, value.pgMath4, value.pgMath5,
			value.average_attandance,
			eng_String,
			odia_String,
			math_String,
			ece_string,

			value.percentage_of_students_jump1_level_pg_eng,
			value.percentage_of_students_jump1_level_pg_odia,
			value.percentage_of_students_jump1_level_pg_math,
			value.percentage_of_students_jump2_level_pg_eng,
			value.percentage_of_students_jump2_level_pg_odia,
			value.percentage_of_students_jump2_level_pg_math,
			value.student_graduated_ece_program,
			value.student_graduated_pg_program,
			value.student_dropped_ece_program,
			value.student_dropped_pg_program,value.grade_of_student
			]
			rows.push(array)
		});

		let csvContent = "data:text/csv;charset=utf-8,"
			+ rows.map(e => e.join(",")).join("\n");
		var encodedUri = encodeURI(csvContent);
		var link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "CenterDetails.csv");
		document.body.appendChild(link); // Required for FF
		this.api_hit = true
		link.click()
	});
	}
	show(value) {


		if (value == 'shoDetails') {

			this.check = !this.check;
		}
		if (value == 'eceDetails') {
			this.check1 = !this.check1;
		}
		if (value == 'pgeDetails') {
			this.check2 = !this.check2;
		}
		if (value == 'scoresDetails') {
			this.check3 = !this.check3;;
		}
		if(value == 'otherDetails'){
			this.check4 = !this.check4;
		}
	}

	// viewData() {
	// 	this.filterData = []
	// 	this.isdata_table = false;


	// 	if(this.selectedDistic || this.selectedBlock){
	// 		for(var i = 0; i < this.all_Data.length; i++){
	// 		  if(this.selectedDistic && this.selectedBlock){
	// 			if (this.all_Data[i].district == this.selectedDistic && this.all_Data[i].block == this.selectedBlock) {
	// 				this.filterData.push(this.all_Data[i])
	// 			}
	// 			else if(this.all_Data[i].district == this.selectedDistic){
	// 				this.filterData.push(this.all_Data[i])
	// 			}
	//            console.log(this.filterData)
	// 		  }

	// 		}
	// 		this.isdata_table=true;
	// 	}

	// 	else{
	// 		this.filterData = this.all_Data
	// 	}


	// }
	// downloadCSV(){
	// 	//this.dtHolidays : JSONDATA , HolidayList : CSV file Name, this.csvOptions : file options
	// 	new  AngularCsv(this.all_Data, "HolidayList", this.csvOptions);
	//   }

}

