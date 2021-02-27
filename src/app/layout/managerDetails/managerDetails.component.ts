import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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


	constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder,
		private translate: TranslateService,
		public router: Router,
		private ManagerDetailsService: ManagerDetailsService
	) {

		this.hideLoading_indicator = true;
		this.showpassword = false;
		this.showhide_button = 'Show';
		this.hideLoading_indicator = false;
		

	
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
			limit:10,
		} 
		this.ManagerDetailsService.getAllManagersDetails(data).subscribe((data: any)=> {
			this.gotoTable(this.info_type);
			this.data = data.records;
			this.dyCols = data.dyCols;
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
	var cols = [];
	this.loader = true
	// var cols = ["name","feedback date"]
    var cols =  this.dyCols;
	// cols.splice(0,0,"feedbackdate");
	// cols.splice(0,0,"Name");
	// cols.splice(0,0, "Age")
	var rows =[];
	
	rows.push(cols)
	for(var i = 0 ; i < this.all_managers_data.length;i++){
		var row = []
		var data_row =this.all_managers_data[i];
		// row.push(data_row.Details.username)
		// row.push(data_row.Details.createdon)
		// row['name'] = data_row.name;
		for(var c=0;c<this.dyCols.length;c++){
			var col_name = this.dyCols[c];
			// row[col_name] = data_row[col_name];
			let data = data_row[col_name]
			if(data){
				row.push(data[0])
			}	
		}
		rows.push(row);
	}
	
    
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

 exportToCsv(filename, rows) {
	var processRow = function (row) {
		var finalVal = '';
		for (var j = 0; j < row.length; j++) {
			var innerValue = row[j] === null ? '' : row[j].toString();
			if (row[j] instanceof Date) {
				innerValue = row[j].toLocaleString();
			};
			var result = innerValue.replace(/"/g, '""');
			if (result.search(/("|,|\n)/g) >= 0)
				result = '"' + result + '"';
			if (j > 0)
				finalVal += ',';
			finalVal += result;
		}
		return finalVal + '\n';
	};

	var csvFile = '';
	for (var i = 0; i < rows.length; i++) {
		csvFile += processRow(rows[i]);
	}

	var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
	if (navigator.msSaveBlob) { // IE 10+
		navigator.msSaveBlob(blob, filename);
	} else {
		var link = document.createElement("a");
		if (link.download !== undefined) { // feature detection
			// Browsers that support HTML5 download attribute
			var url = URL.createObjectURL(blob);
			link.setAttribute("href", url);
			link.setAttribute("download", filename);
			link.style.visibility = 'hidden';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	}
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

}