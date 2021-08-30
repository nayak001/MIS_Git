import { Component, OnInit, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { offlinetrainingService } from './offlinetraining.service';
import { ManagersboxService } from  './../managersbox/managersbox.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import swal from 'sweetalert2';

import { environment } from './../../../environments/environment.prod';
const URL = environment.uploadURL;

@Component({
    selector: 'app-offlinetraining',
    templateUrl: './offlinetraining.component.html',
    styleUrls: ['./offlinetraining.component.scss'],
    animations: [routerTransition()]
})

export class  offlinetrainingComponent implements OnInit {
	delete_q_index: string = '';
	public data : any;
	hideLoading_indicator: boolean;
	hideContent_div: boolean;
	public Editor = ClassicEditor;
    allmonth_list:any;
	modalReference: any;
	flag:any;
	closeResult: string;
	offlinepptmark:any;
    constructor(
		private modalService: NgbModal,
        public router: Router,
		private offlinetrainingService: offlinetrainingService,
		private managersboxService: ManagersboxService
	) {
		this.hideLoading_indicator = true;
		this.hideContent_div = true;
	}
	
	ngOnInit() {
		this.load_allmonth_list();
		this.load_all_fellowlist();
	}

	all_fellows:any;
	load_all_fellowlist(){
		this.offlinetrainingService.getallteachers().subscribe(data => {
			this.all_fellows = data;
			
			// this.teachers.unshift({});
			this.hideLoading_indicator = true;
			
		},
		error => {},
		() => {}
	);
	}

	load_allmonth_list(){
		this.allmonth_list = [
			{ value: "month1", text: "month1" },
			{ value: "month2", text: "month2" },
			{ value: "month3", text: "month3" },
			{ value: "month4", text: "month4" },
			{ value: "month5", text: "month5" },
			{ value: "month6", text: "month6"},
			{ value: "month7", text: "month7" },
			{ value: "month8", text: "month8" },
			{ value: "month9", text: "month9" },
			{ value: "month10", text: "month10" },
			{ value: "month11", text: "month11" },
			{ value: "month12", text: "month12" },
		  ];
	}
	selected_month:any = '';
	selected_category:any = '';
	selected_status:any = '';
	selected_fellow:any = '';
	selected_fellow_name:any = '' ;
	apiresponse:any = '';
	onselect_month(event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;

		this.selected_month = selectedOptionValue;
	}
	onselect_category(event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;

		this.selected_category = selectedOptionValue;
	}
	onselect_status(event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.selected_status = selectedOptionValue;
	}
	
	onselect_fellow(event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.selected_fellow = selectedOptionValue;
		this.selected_fellow_name = selectElementText;
	}
	save_btn_click(){
		if(this.selected_month == '' || this.selected_category == '' || this.selected_status == '' || this.selected_fellow == ''){
			swal.fire('info', 'Please add all content !!!', 'warning');
		}else{
			const body = {
				userid : this.selected_fellow,
				username : this.selected_fellow_name,
				selected_month:this.selected_month,
				training_mode:this.selected_category,
				training_status:this.selected_status
			}
			this.offlinetrainingService.saveteachertrainingstatus(body).subscribe(data => {
				this.apiresponse = data;
				if(this.apiresponse.status == 'success') {
					swal.fire('info', 'training status saved', 'success');
				}
				// this.teachers.unshift({});
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);

		}
	}
	clear(){
		
	  }
	  reset(){
		
		this.clear();
	  }
	open(content, param, flag) {
		this.flag = flag;
	
			if(flag == 'add') {
		  this.clear();
		} else if(flag == 'edit') {
		  
		} else if(flag == 'delete') {
		 
		} else {
		  this.reset();
		}
			this.modalReference = this.modalService.open(content,param);
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
	  selectedfellow:any;
	  selectedfellow_name:any;
	  changefellow(event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.selectedfellow = selectedOptionValue;
		this.selectedfellow_name = selectElementText;
		this.offlinepptmark = '';
	}
	  
	  submit_data(){
		  if(this.offlinepptmark == ''){
			swal.fire('info', 'Please add ppt mark !!!', 'warning');
		  }else{
			let body = {
				userid : this.selectedfellow,
				username : this.selectedfellow_name,
				offlinepptmark:this.offlinepptmark
			}
			  this.offlinetrainingService.saveofflinepptmark(body).subscribe(data2 => {
			  this.modalReference.close();
			  swal.fire('info', 'training status saved'+data2['status']);
			  this.hideLoading_indicator = true;
			  this.reset();
			},
			error => {},
			() => {}
		  );
		 }	
	} 
  }



