import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as  moment from 'moment/moment';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IndividualTeachersEducatorPageService } from './individualTeachersEducatorPage.service';

@Component({
	selector: 'app-individualTeachersEducatorPage',
	templateUrl: './individualTeachersEducatorPage.component.html',
	styleUrls: ['./individualTeachersEducatorPage.component.scss'],
	animations: [routerTransition()]
})
export class IndividualTeachersEducatorPageComponent implements OnInit {
	userModalFormGroup: FormGroup;
	center_type: any = 'all'
	distric: any = 'all'
	block: any = 'all'
	program_type: any = 'all'
	centerDetails: any;
	check: boolean = true;
	check1: boolean = false;
	check2: boolean = false;
	check3: boolean = false;
	check4:boolean = false;
	user : any ;
	


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
	userDetails:any;


	page: any = 1;
	totalPage: any;
	page_no:any = 1;
	count : any;



	emailid_exists: boolean = false;
	disable_emailid: boolean = false;

	constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder,
		private translate: TranslateService,
		public router: Router,
		private IndividualTeachersEducatorPageService:IndividualTeachersEducatorPageService
	) {

		this.hideLoading_indicator = true;
		this.showpassword = false;
		this.showhide_button = 'Show';
	}

	async ngOnInit() {
		this.hideLoading_indicator = false;
		await this.getBlockDetails();
		await this.individualTeacherEducatorDetail();

		
	}

	getBlockDetails() {
		this.IndividualTeachersEducatorPageService.getBlocks().subscribe(data => {
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
	getDate(data){
		if(data && data.user && data.user.center_start_date){
			var date = moment(data.user.center_start_date).format('DD MMM, YYYY')
			return date
			
		}
		return ''

		

	}


	getPageNo(event) {
		const page = event.target.text.match(/\d+/)[0]
		this.page_no = page
		// this.isLoaded = false
		this.individualTeacherEducatorDetail()

	}

    individualTeacherEducatorDetail(){
		const data = {
			center_type:this.center_type,
			distric:this.distric,
			block:this.block,
			program_type:this.program_type,
			page_no :this.page_no,
			limit:25,
		}
	this.IndividualTeachersEducatorPageService.TeacherEducatorDetail(data).subscribe(data => {
		debugger
		// console.log('### data: '+JSON.stringify(data));
		//console.log(data)
				this.filterData = data
				this.count = this.filterData.usercount
		 this.isLoaded = true
		console.log(this.filterData)
		// this.all_blocks=data;
	},
		error => { },
		() => { }
	);
 }
	viewData() {
		this.isLoaded = false
		// this.isdata_table = false
		 this.individualTeacherEducatorDetail()
	}


	openTeacherDetails(content, center){
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
				this.check = true;
				this.check1 = false;
				this.check2 = false;
				this.check3 = false;
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
	download() {

		const rows = [
			["Educator Name", "Status", "Center Name", "Center Type", "Center Id", "Block", "District", "State", "Qualification",
				"Contact No", "Address", "Special Initiatives", "Aspirations", "Centre Start Date", "Pre-Program Training Marks Secured",
				"Online Training Module Details",]

		];
		this.filterData.forEach(value => {
			var teacherName = ''
			var status =''
			var cont =''
			var add=""
			var sp =""
			var csd = ""
			var ptm =""
			var asp =""
			var cn = ""
			var ctype = ""
			var cid =""
			var d=""
			var bl = ""
			if(value && value.user && (value.user.teachernme || value.user.status ||
				 value.user.contactno || value.user.address || value.user.special_initiatives
				 || value.user.aspirations || value.user.center_start_date || value.user.preprogram_training_mark)
				){
				teacherName = value.user.teachernme;
				status = value.user.status
				cont = value.user.contactno
				add = value.user.address
				sp = value.user.special_initiatives
				asp = value.user.aspirations
				csd =  value.user.center_start_date
				ptm = value.user.preprogram_training_mark

			}
			if(value && value.center && (value.center.centername||  value.center.centertype 
				||  value.center.centerid || value.center.block ||value.center.district )){
				cn = value.center.centername
				ctype =   value.center.centertype
				cid = value.center.centerid
				d = value.center.district
				bl = value.center.block 
			}

			
			var array = [teacherName,status, cn , ctype,cid, , ,
			value.state,cont,add,sp,value.asp, csd, , ptm, 
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
	// show(value) {


	// 	if (value == 'shoDetails') {

	// 		this.check = !this.check;
	// 	}
	// 	if (value == 'eceDetails') {
	// 		this.check1 = !this.check1;
	// 	}
	// 	if (value == 'pgeDetails') {
	// 		this.check2 = !this.check2;
	// 	}
	// 	if (value == 'scoresDetails') {
	// 		this.check3 = !this.check3;;
	// 	}
	// 	if(value == 'otherDetails'){
	// 		this.check4 = !this.check4;
	// 	}
	// }

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

