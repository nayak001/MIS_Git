import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CentersAllocationService, ValidationService } from  './centers-allocation.service';

@Component({
    selector: 'app-centers-allocation',
    templateUrl: './centers-allocation.component.html',
    styleUrls: ['./centers-allocation.component.scss'],
    animations: [routerTransition()]
})
export class CentersAllocationComponent implements OnInit {
	centerAllotModalFormGroup: FormGroup;
	
	centersubmitaction: string;
	public data : any
	public filterData: any;

	closeResult: string;
	model: any;
	modalReference: any;
	isChecked: boolean;
	
	hideLoading_indicator: boolean;	
	public allmanagerslist: any;
	public availablemanagerslist: any;
	availability_status: string;
	public allcenterslist: any;
	modal_id: string;
	modal_manager: string;
	selected_centers_arr = [];
	
	add_allocation_centers_arr = [];
	delete_allocation_centers_arr = [];
	remaining_centers_arr: any = [];

	modal_userid: string;
	modal_username: string;
	modal_centerid: string;
	modal_centername: string;
	modal_centerpin: string;
	modal_centeraddress: string;
	postal_index: string;
	
    constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder,
        private translate: TranslateService,
        public router: Router,
		private centersAllocationService: CentersAllocationService
	) {
		this.centerAllotModalFormGroup = this.formBuilder.group({
			modal_id: ['', []],
			modal_centername: ['', [Validators.required]],
			modal_centerpin: ['', [Validators.required]]
		});
		this.hideLoading_indicator = true;
	}
	
	ngOnInit() {
		let table_data = [];
		this.hideLoading_indicator = false;

		this.centersAllocationService.getallmanagers().subscribe(data => {
				this.allmanagerslist = data;
			}, error => {}, () => {}
		);

		this.centersAllocationService.getallavailablemanagers().subscribe(data => {
				this.availablemanagerslist = data;
				this.availability_status = (this.availablemanagerslist.length)+' manager(s) available';
				//console.log('###availability_status: '+this.availability_status);
			}, error => {}, () => {}
		);

		this.centersAllocationService.getallcenters().subscribe(data => {
				this.allcenterslist = data;
				this.filterData = data;
			}, error => {}, () => {}
		);

		this.centersAllocationService.getallmanager_center().subscribe(data => {
				Object.keys(data).forEach(function(i){
					let obj = {}; 
					let id = data[i]['_id'];
					let uid = data[i]['userid'];
					let uname = data[i]['username'];
					let cnames= '';
					let centers = data[i]['centers'];
					Object.keys(centers).forEach(function(j){
						cnames += centers[j]['centername']+', ';
					});
					obj['id'] = id;
					obj['uid'] = uid;
					obj['uname']  = uname;
					obj['cnames'] = cnames;
					obj['centers'] = centers;
					table_data.push(obj);
				});
				console.log('$$$: '+JSON.stringify(table_data));
				this.data = table_data;
				this.hideLoading_indicator = true;	
			}, 
			error => {}, 
			() => {}
		);
	}

	search(term: string) {
		if(!term) {
		  this.filterData = this.allcenterslist;
		} else {
		  this.filterData = this.allcenterslist.filter(x => 
			 x.centername.trim().toLowerCase().includes(term.trim().toLowerCase())
		  );
		}
	  }

	open(content,centerallot) {
		console.log('#### centerallot: '+JSON.stringify(centerallot));
		if(centerallot != undefined || centerallot != null){
			this.centersubmitaction = 'Update';
			this.modal_id = centerallot._id;
			this.modal_userid = centerallot.userid;
			this.modal_username = centerallot.username;
			this.modal_centerid = centerallot.centerid;
			this.modal_centername = centerallot.centername;	
			this.modal_centerpin = centerallot.centerpin;	
			this.modal_centeraddress  = centerallot.centeraddress;	
			this.remaining_centers_arr = centerallot.centers;
		}else{
			this.centersubmitaction = 'Create';
			this.modal_id = '';	
			this.modal_userid = '';
			this.modal_username = '';
			this.modal_centerid = '';		
			this.modal_centername = '';	
			this.modal_centerpin = '';		
			this.modal_centeraddress  = '';			
		}
		this.modalReference = this.modalService.open(content,centerallot);
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
		
	formSubmitAction(centersubmitaction){
		let frm_id = this.modal_id;	
		let frm_userid = this.modal_userid;
		let frm_username = this.modal_username;
		let frm_centers = this.selected_centers_arr;
		
		var centerallot = {
			userid: frm_userid,
			username: frm_username,
			centers: frm_centers	
		}
		console.log('###111'+centersubmitaction+' frm_id: '+frm_id+' centerallot: '+JSON.stringify(centerallot));

		// save operation
		if(centersubmitaction=='Create' && frm_id == ''){
			// check user is selected and center for allocation are selected
			if(frm_userid == undefined || frm_userid.length <= 0){
				alert('Select user.  '+frm_userid);
			}else if(frm_centers.length <= 0){
				alert('Select centers for allocation.');
			}else{
				this.centersAllocationService.createnewcenterallocation(centerallot).subscribe(data => {
						console.log('### res data1: '+JSON.stringify(data));	
						
						this.centersAllocationService.updatecenterstatus_allloted(frm_centers).subscribe(data => {
								console.log('### res data2: '+JSON.stringify(data));	
								this.modalReference.close();
								location.reload();					
							}, 
							error => {console.log('### error2: '+JSON.stringify(error));}, 
							() => {}
						);
						this.modalReference.close();
						location.reload();					
					}, 
					error => {console.log('### error1: '+JSON.stringify(error));}, 
					() => {}
				);
			}
		}
		// update operation
		else if(centersubmitaction=='Update' && frm_id != ''){
			console.log('### inside elseif frm_id= '+frm_id);
			this.centersAllocationService.updateallocatedcenter(frm_id,centerallot).subscribe(data => {
					console.log('### res data: '+JSON.stringify(data));	
					this.modalReference.close();
					location.reload();
				}, 
				error => {}, 
				() => {}
			);
			//alert('Data updated successfully !!!');
		}else{
			console.log('### inside else');
			alert('Data can not be saved !!!');
		}		
	}
	
	deleteAllocationFormSubmitAction(id){
		console.log('### id: '+id);	
		this.centersAllocationService.deleteallocatedcenter(id).subscribe(data => {
			console.log('### 1 res data: '+JSON.stringify(data));
			console.log('### 1 res data: '+JSON.stringify(this.remaining_centers_arr));
				this.centersAllocationService.updatecenterstatus_available(this.remaining_centers_arr).subscribe(data => {
						console.log('### 2 res data: '+JSON.stringify(data));	
						//this.modalReference.close();
						//location.reload();
					}, 
					error => {console.log('### 2 error: '+JSON.stringify(error));}, 
					() => {}
				);	
				this.modalReference.close();
				location.reload();
			}, 
			error => {console.log('### 1 error: '+JSON.stringify(error));}, 
			() => {}
		);
	}

	deleteCenterFormSubmitAction(_id, uid, uname){
		console.log('#### _id: '+_id+'    userid: '+uid+'    username: '+uname);
		//console.log('####remaining_centers_arr: '+JSON.stringify(this.remaining_centers_arr));
		let arr: any = [];
		if(this.delete_allocation_centers_arr.length > 0){
			this.remaining_centers_arr.forEach(element => {
				if(this.delete_allocation_centers_arr.includes(element)){

				}else{
					arr.push(element);
				}
			});
			//console.log('####arr: '+JSON.stringify(arr));

			const body = {
				userid: uid,
				username: uname,
				centers: arr
			}
			this.centersAllocationService.updateallocatedcenter(_id, body).subscribe(data => {
					console.log('### 1 res data: '+JSON.stringify(data));	
					this.centersAllocationService.updatecenterstatus_available(this.delete_allocation_centers_arr).subscribe(data => {
							console.log('### 2 res data: '+JSON.stringify(data));	
							//this.modalReference.close();
							//location.reload();
						}, 
						error => {console.log('### 2 error: '+JSON.stringify(error));}, 
						() => {}
					);
					this.modalReference.close();
					location.reload();
				}, 
				error => {console.log('### 1 error: '+JSON.stringify(error));}, 
				() => {}
			);
		}else{
			alert('Insufficient center limit !!!');
		}
	}

	addCenterFormSubmitAction(allocobj){
		console.log('==>Allocated Object: '+JSON.stringify(allocobj));
		console.log('==>Existing centers: '+JSON.stringify(allocobj.centers));
		console.log('==>Centers to be added: '+JSON.stringify(this.add_allocation_centers_arr));
		let new_centers_arr = allocobj.centers.concat(this.add_allocation_centers_arr);
		console.log('==>New Centers list: '+JSON.stringify(new_centers_arr));

		const body = {
			userid: allocobj.uid,
			username: allocobj.uname,
			centers: new_centers_arr
		}
		this.centersAllocationService.updateallocatedcenter(allocobj.id, body).subscribe(data => {
				console.log('### 1 res data: '+JSON.stringify(data));	
				this.centersAllocationService.updatecenterstatus_allloted(this.add_allocation_centers_arr).subscribe(data => {
						console.log('### $$$ data: '+JSON.stringify(data));	
						//this.modalReference.close();
						//location.reload();
					}, 
					error => {console.log('### $$$ error: '+JSON.stringify(error));}, 
					() => {}
				);
				this.modalReference.close();
				location.reload();
			}, 
			error => {console.log('### 1 error: '+JSON.stringify(error));}, 
			() => {}
		);
	}

	select_center(centerObj){
		console.log('#### select_center(centerObj) #### ');
		let cid = centerObj['_id'];

		// add to selected centers array 
		this.selected_centers_arr.push(centerObj);

		// remove from filterdata array
		let index1 = -1;
		this.filterData.forEach(function(v,k){
			if(cid == v['_id'])
				index1 = k;
		});
		this.filterData.splice(index1,1);
		console.log('#### selected_centers_arr: '+JSON.stringify(this.selected_centers_arr));
		
		// add to data array
		let index2 = -1;
		this.data.forEach(function(v,k){
			if(cid == v['_id'])
				index2 = k;
		});
		this.data.splice(index2,1);
	}

	deselect_center(centerObj){
		console.log('#### deselect_center(centerObj) #### ');
		let cid = centerObj['_id'];

		// add to filterdata array
		this.filterData.push(centerObj);

		// remove from selected centers array 
		let index1 = -1;
		this.selected_centers_arr.forEach(function(v,k){
			if(cid == v['_id'])
				index1 = k;
		});
		this.selected_centers_arr.splice(index1,1);
		console.log('#### selected_centers_arr: '+JSON.stringify(this.selected_centers_arr));
		
		// remove from data array 
		let index2 = -1;
		this.data.forEach(function(v,k){
			if(cid == v['_id'])
				index2 = k;
		});
		this.data.splice(index2,1);
	}

	/*checkboxChanged(e, centerObj){
		this.isChecked= e.target.checked;

		console.log('###checkbox checked: '+this.isChecked);
		if(this.isChecked){
			this.selected_centers_arr.push(centerObj);
		}else{
			let cid = centerObj['_id'];
			let index = -1;
			this.selected_centers_arr.forEach(function(v,k){
				if(cid == v['_id'])
					index = k;
			});
			this.selected_centers_arr.splice(index,1);
		}
		console.log('#### selected_centers_arr: '+JSON.stringify(this.selected_centers_arr));
	}
	*/
	addCheckboxChanged(e, centerObj){
		this.isChecked= e.target.checked;
		console.log('###checkbox checked: '+this.isChecked);
		if(this.isChecked){
			this.add_allocation_centers_arr.push(centerObj);
		}else{
			let cid = centerObj['_id'];
			let index = -1;
			this.add_allocation_centers_arr.forEach(function(v,k){
				if(cid == v['_id'])
					index = k;
			});
			this.add_allocation_centers_arr.splice(index,1);
		}
		console.log('#### add_allocation_centers_arr: '+JSON.stringify(this.add_allocation_centers_arr));
	}

	deleteCheckboxChanged(e, centerObj){
		this.isChecked= e.target.checked;

		console.log('###checkbox checked: '+this.isChecked);
		if(this.isChecked){
			this.delete_allocation_centers_arr.push(centerObj);
		}else{
			let cid = centerObj['_id'];
			let index = -1;
			this.delete_allocation_centers_arr.forEach(function(v,k){
				if(cid == v['_id'])
					index = k;
			});
			this.delete_allocation_centers_arr.splice(index,1);
		}
		console.log('#### delete_allocation_centers_arr: '+JSON.stringify(this.delete_allocation_centers_arr));
	}

	onSelect_modal_manager(event){
		let selectedOptions = event.target['options'];
		let selectedIndex = selectedOptions.selectedIndex;
		let selectedOptionValue = selectedOptions[selectedIndex].value;
		let selectElementText = selectedOptions[selectedIndex].text;
		//console.log('-->Selected Opt Value= '+JSON.stringify(selectedOptionValue)+'   Text= '+selectElementText);
		this.modal_manager = selectedOptionValue['username'];
		this.modal_userid = selectedOptionValue;
		this.modal_username = selectElementText;
		console.log('-->Selected userid= '+this.modal_userid+'   username= '+this.modal_username);
	}
}