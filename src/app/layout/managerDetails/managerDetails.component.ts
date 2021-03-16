import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeValue} from '@angular/platform-browser';

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ManagerDetailsService,ValidationService } from './managerDetails.service';
import { $ } from 'protractor';

import * as  moment from 'moment/moment';
import { shallowEqual } from '@angular/router/src/utils/collection';
import { RouterModule, Route } from '@angular/router';  



@Component({
	selector: 'app-studentDetailsPage',
	templateUrl: './managerDetails.component.html',
	styleUrls: ['./managerDetails.component.scss'],
	animations: [routerTransition()]
})
export class ManagerDetailsComponent implements OnInit {
	userModalFormGroup: FormGroup;
	check:boolean = false;
	check1:boolean = false;
	check2:boolean = false;
	check3:boolean = false;
	isdata_table: boolean = false;
	api_hit : any = true
	
	userType:any = 'all'
	center_type: any =  'all'
	info_type: any =  'dailyinfo'
	program_type: any =  'all'
	loader : any = false

month : any;
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
	userDetails:any;
	all_managers_data:any;
	createdon : any = 'all'

	page: any = 1;
	totalPage: any;
	page_no:any = 1;
	count : any;

	image_preview: any = null;
	hideModalLoading_indicator: boolean = true;

	constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder,
		private translate: TranslateService,
		public domSanitizer:DomSanitizer,
		public router: Router,
		private ManagerDetailsService: ManagerDetailsService
	) {

		this.hideLoading_indicator = true;
		this.showpassword = false;
		this.showhide_button = 'Show';
		this.hideLoading_indicator = false;
		this.hideModalLoading_indicator = true;
		

	
	}

	async ngOnInit() {
		this.getManagersDetails();
		// this.getallmanagersfeedbacks()
		// this.getallissuesmgr();
	}

	// mont(value){
	// 	this.month = value
	// }


	getPageNo(event) {
		
		this.page_no = event
		// this.isLoaded = false
		this.getManagersDetails()

	}
	dyCols = [];
	getManagersDetails(){
		this.dyCols = [];
		this.api_hit = false
		// var mon = document.getElementById("month1")
		const data = {
			center_type : this.center_type,
			createdon : this.createdon,
			page_no :this.page_no,
			month : this.month,
			limit:100,
		} 
		this.ManagerDetailsService.getAllManagersDetails(data).subscribe((data: any)=> {
			this.gotoTable(this.info_type);
			this.data = data.records;
			this.dyCols = data.dyCols.reverse();
			
			this.all_managers_data = data.records;
			this.isLoaded = true
			if(this.all_managers_data.length == 0){
				this.isdata_table = true;
				// this.isLoaded = false;
				}
				else{
					this.isdata_table = false;
				}

				this.api_hit = true
				// this.loader = false
				},
				error => {},
				() => {}
			);
		  }
	   highlight(index:String){
		document.querySelectorAll('.record-row').forEach(function(ele) {
			if(ele.getAttribute("id") == "user_"+ index) {
				ele.classList.add('highlight');
			} else {
				ele.classList.remove('highlight');
			}
			// Now do something with my button
		});}
		viewData(){
			this.api_hit = false
			this.page_no = 1
			this.isLoaded = true
			this.getManagersDetails()
		}

	gotoTable(value){
		this.check= true;
		this.check1= false;
		this.check2= false;
		this.check3= false;
		if(value == 'dailyinfo'){
			this.check = true
		} else if(value == 'skillstought'){
			this.check=false;
			this.check1= true;
		}else if(value == 'Monthlyinfo'){
			this.check=false;
			this.check2= true;
		}else if(value == 'feedbackissues'){
			this.check=false;
			this.check3= true;
		}
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
		if(data && data.Details && data.Details.createdon){
			var date = moment(data.Details.createdon).format('DD MMM, YYYY')
			return date
		}
		return ''
	}
	
	search(term: string) {}
	
	
	  

   getBlockDetails() {		
	this.ManagerDetailsService.getBlocks().subscribe(data => {
		
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

	},
		error => { },
		() => { }
	);

}


download(){	
	this.loader = true
	var cols =  this.dyCols;
	var rows =[];
	rows.push(cols)
	for(var i = 0 ; i < this.all_managers_data.length;i++){
		var row = []
		// if(this.all_managers_data[i] == ''){
		// 	this.all_managers_data[i] = 'NA'
		// }
		var data_row =this.all_managers_data[i];

		console.log("data_row12",data_row)
		for(var c=0;c<this.dyCols.length;c++){
			var col_name = this.dyCols[c];
			console.log("data_row",data_row[col_name],"col_name",col_name)
			// if(data_row == col_name){
				// var data = data_row[col_name]
				// if(data){
				// 	row.push(data)
				// }
			 //}
			// console.log("col_name",data_row[col_name][0])
			// row[col_name] = data_row[col_name];
			 if(typeof(data_row[col_name]) == "object"){
				var data = data_row[col_name][0]
				if(data){
					row.push(data)
				}
			 }
			 if(typeof(data_row[col_name]) == "string"){
				var data1 = data_row[col_name]
				if(data1){
					row.push(data1)
				}
			}
		}
		rows.push(row);
	}
	console.log("rows",rows)
	this.loader = false
	this.api_hit = true
	let csvContent = "data:text/csv;charset=utf-8,"+ rows.map(e => e.join(",")).join("\n");
	
	var encodedUri = encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", "ManagerDetails.csv");
	document.body.appendChild(link); // Required for FF	
	link.click()
}

 

// Date:-16/02/2021
// Activity:-Worked on debugging center




selectBlock(distic) {
	this.all_blocks = []
	for (let i = 0; i < this.allDisticBlocks.length; i++) {
		if (this.allDisticBlocks[i] && this.allDisticBlocks[i].district) {
			if (this.allDisticBlocks[i].district == distic) {
				this.all_blocks.push(this.allDisticBlocks[i])
			}
		}
	}
}

gotoViewDetails(data){
	const mangerId = data.manager._id
	this.router.navigate(['individualUserPage/' + mangerId]);
}

show_picture(content,user){
	this.hideModalLoading_indicator = false;
	this.image_preview = null;
	let id = user["_id"];
	//console.log('###document id: '+id)
	 
	this.ManagerDetailsService.getfeedbackimagebyid(id).subscribe((data: any)=> {
		if(Object.keys(data).length > 0){
			if(data.images == undefined || data.images == null || data.images.length <= 0){
				this.image_preview = null;
			}else{
				this.image_preview = this.domSanitizer.bypassSecurityTrustResourceUrl("data:image/jpg;base64,"+data.images[0]);
			}
		}else{
			this.image_preview = null;
		}
		this.hideModalLoading_indicator = true;
	},error => {},() => {this.hideModalLoading_indicator = true;});
	this.modalReference = this.modalService.open(content);	
	this.modalReference.result.then((result) => {
		this.closeResult = `Closed with: ${result}`;
	}, (reason) => {
		this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
	});
}

}