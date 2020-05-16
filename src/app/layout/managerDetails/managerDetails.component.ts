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
	
	userType:any = 'all'
	center_type: any =  'all'
	info_type: any =  'dailyinfo'
	program_type: any =  'all'


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


	getPageNo(event) {
		
		this.page_no = event
		// this.isLoaded = false
		this.getManagersDetails()

	}
	dyCols = [];
	getManagersDetails(){
		const data = {
			center_type : this.center_type,
			createdon : this.createdon,
			page_no :this.page_no,
			limit:10,
		} 
		debugger
		this.ManagerDetailsService.getAllManagersDetails(data).subscribe((data: any)=> {
			this.gotoTable(this.info_type);
			debugger
			console.log(data);
			this.data = data.records;
			this.dyCols = data.dyCols;
			console.log(data);
			this.all_managers_data = data.records;
			this.isLoaded = true
			if(this.all_managers_data.length == 0){
				this.isdata_table = true;
				// this.isLoaded = false;
				}
				else{
					this.isdata_table = false;
				}
				// this.loader = false
				},
				error => {},
				() => {}
			);
		  }


	// 	  getallmanagersfeedbacks(){
	// 		this.ManagerDetailsService.getallmanagersfeedbacks().subscribe(data => {
	// 			debugger
	// 			this.data = data
	// 			console.log(data)
	// 		},
	// 		error => {},
	// 		() => {}
	// 	);
	//   }

	//   getallissuesmgr(){
	// 	this.ManagerDetailsService.getallissuesmgr().subscribe(data => {
	// 		debugger
	// 		this.data = data
	// 		console.log(data)
	// 	},
	// 	error => {},
	// 	() => {}
	// );
	//   }



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



			  
		  viewData(){
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
	
	search(term: string) {
	  }
	
	
	  

	  dailyInfoT(content, center){
		this.data = center
		debugger
			this.modalReference = this.modalService.open(content,{ size: 'lg' });
			this.modalReference.result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
				
			

			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				
			});
	

	}



	skilsss(content, center){
		this.data = center
	
			this.modalReference = this.modalService.open(content,{ size: 'lg' });
			this.modalReference.result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
				
			

			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				
			});
	

	}

	monthlyDetails(content, center){
		this.data = center
	
			this.modalReference = this.modalService.open(content,{ size: 'lg' });
			this.modalReference.result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
				
			

			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				
			});
	

	}


	
	feedbackDetails(content, center){
		this.data = center
	
			this.modalReference = this.modalService.open(content,{ size: 'lg' });
			this.modalReference.result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
				
			

			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				
			});
	

	}

   getBlockDetails() {		
	this.ManagerDetailsService.getBlocks().subscribe(data => {
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
debugger

	var cols = this.dyCols;

	var rows =[];
	for(var i =0 ; i < this.all_managers_data.length;i++){
		var row = []
		var data_row =this.all_managers_data[i];
		row['name'] = data_row.name;
		for(var c=0;c<this.dyCols.length;c++){
			var col_name = this.dyCols[c];
			row[col_name] = data_row[col_name];
		}
		rows.push(row);
	}

	
	
	// 	rows = [
	// 		["Name", "Center", "Date of Visit", "Extra Activity", "Supervisor's Feedback", "Headmaster's Feedback", "Parent's Feedback",
	// 			"Specific Issues from the center"]
	// 	];
	// 	this.all_managers_data.forEach(value => {
	// 		var usertType = ''
	// 		if (value && value.user && value.user.usertype) {
	// 			usertType = value.user.usertype
	// 		}
	// 		var array = [value.manager.username,value.center.centertype, value.date_of_visit, value.extra_activites, value.superVisor_feedback, value.headMaster_feedback, value.parents_feedback, value.specific_issues_from_center]
	// 		rows.push(array)
	// 	});
		
	// let csvContent = "data:text/csv;charset=utf-8,"
	// + rows.map(e => e.join(",")).join("\n");
	// var encodedUri = encodeURI(csvContent);
	// var link = document.createElement("a");
	// link.setAttribute("href", encodedUri);
	// link.setAttribute("download", "ManagerDetails.csv");
	// document.body.appendChild(link); // Required for FF	
	// link.click()
	}
selectBlock(distic) {
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

gotoViewDetails(data){
	
	const mangerId = data.manager._id
	this.router.navigate(['individualUserPage/' + mangerId]);
}

}



