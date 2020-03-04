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
	center_type:any = 'all'
	distric: any =  'all'
	block: any =  'all'
	program_type: any =  'all'

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

	emailid_exists: boolean = false;
	disable_emailid: boolean = false;

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
	}

	getBlockDetails() {		
		this.centerDetailsService.getBlocks().subscribe(data => {
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
	viewData(){
		this.isLoaded = false
		this.isdata_table = false
		this.getCenterDetails()
	}


	getCenterDetails() {
		// const data = {
		// 	center_type:"all",
		// 	distric:"all",
		// 	block:"all",
		// 	program_type:"all"
		// }
		const data = {
			center_type:this.center_type,
			distric:this.distric,
			block:this.block,
			program_type:this.program_type
		}
		this.centerDetailsService.getCenterDetails(data).subscribe(data => {
			// console.log('### data: '+JSON.stringify(data));
			 console.log(data)
			this.filterData = data;
			
			//this.filterData = [];
			this.isLoaded = true;
			this.isdata_table = true;
		},
			error => { },
			() => { }
		);
	}


	selectBlock(distic) {
		this.selectedBlock = 'all'
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
	download(){
		const rows = [
		["Id", "Name", "Type", "Program Type", "Block","District","State","Educator Name","Students",
		"ECE - Level 1", "ECE - Level 2","ECE - Level 3","PG English Level 1","PG English Level 2", "PG English Level 3",
		"PG English Level 4","PG English Level 5","PG Odia Level 1","PG Odia Level 2","PG Odia Level 3",
		"PG Odia Level 4","PG Odia Level 5","PG Math Level 1","PG Math Level 2","PG Math Level 3","PG Math Level 4",
		"PG Math Level 5","Average Attendance","Percentage of students achieving monthly goals in PG - English",
		"Percentage of students achieving monthly goals in PG - Odia","Percentage of students achieving monthly goals in PG - Maths	",
		"Percentage of students achieving quarterly goals in ECE Program","Percentage of students achieving age-appropriate skills in ECE Program2",
		"Percentage of students who jumped 1 Level in PG - English","Percentage of students who jumped 1 Level in PG - Odia	",
		"Percentage of students who jumped 1 Level in PG - Maths","Percentage of students who jumped 2 Levels in PG - English",
		"Percentage of students who jumped 2 Levels in PG - Odia","Percentage of students who jumped 2 Levels in PG - Maths	",
		"Pre-Program Training Marks Secured	","Online Training Module Details", ]
		
		];
		this.filterData.forEach(value => {
		var usertType =''
		if (value && value.user && value.user.usertype){
		usertType = value.user.usertype
		}
		var array = [value.center.centerid , value.center.centername, usertType , value.center.centertype || "", value.center.block || "", value.center.district || "",
		value.state ,value.educator ,value.no_of_students ,value.educator 
		,value.eceLevel1 ,value.eceLevel2,value.eceLevel3 ,value.pgEngl1 ,value.pgEngl2 
		,value.pgEngl3,,value.pgEngl4 ,value.pgEngl5 ,value.pgOdia1 ,value.pgOdia2 
		,value.pgOdia3 ,value.pgOdia4 ,value.pgOdia5 ,value.pgMath1 ,value.pgMath2 ,
		value.pgMath3 ,value.pgMath4 ,value.pgMath5 ,
		value.percentage_of_student_monthly_gaol_odia ,
		value.percentage_of_student_monthly_gaol_math ,
		value.percentage_of_student_monthly_gaol_eceProgram ,
		value.percentage_of_student_monthly_gaol_eceProgram2 ,
		value.percentage_of_students_jump1_level_pg_eng ,
		value.percentage_of_students_jump1_level_pg_odia ,
		value.percentage_of_students_jump1_level_pg_math ,
		value.percentage_of_students_jump2_level_pg_eng ,
		value.percentage_of_students_jump2_level_pg_odia ,
		value.percentage_of_students_jump2_level_pg_math ,
		value.preProgram_training_marks_Secured ,
		value.online_training_Module ,
		value.avrg_Attendance ,
		value.monthly_Attendance ,
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
		
		link.click()
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

