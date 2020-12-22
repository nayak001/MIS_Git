import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { CentersService } from  './centers.service';
import swal from 'sweetalert2';
@Component({
    selector: 'app-centers',
    templateUrl: './centers.component.html',
    styleUrls: ['./centers.component.scss'],
    animations: [routerTransition()]
})
export class CentersComponent implements OnInit {
	@ViewChild('searchtext') searchtext: ElementRef;
	;
	// Form
	document_id: string;
	centersubmitaction: string;

	// Center
	all_centers_list: any;
	public filterData : any;
	selected_centerid: string;
	selected_centername: string='';

	// State
	all_states: any = ['odisha'];
	selected_statecode: string = 'OR';
	selected_statevalue: string = 'Odisha';

	// District
	all_districts: any = [];
	selected_districtid: string = '';
	selected_districtvalue: string = '';

	// Block
	all_blocks: any = [];
	selected_blockname: string = '';

    // Modal
	closeResult: string;
	model: any;
	modalReference: any;

	// Loading indicator
	hideLoading_indicator: boolean;
	
	

	
	//@ViewChild('auto') auto;
	//all_usertypes: any = [];
	//modal_centertype: string= 'school';
	//modal_centerpin: string;
	//modal_centeraddress: string;
	//postal_index: string;
	//disable_autocomplete: boolean = false;
	// teachers auto-complete 
	//data_teachers: any;
	//teachers: any;
	//keyword_teachers = 'userid';
	//selected_userid: string = '';
	//selected_username: string = '';
	//block_name = '';
	//districtid: any;
	//centers: any;
	//keyword = 'centername';

    constructor(
		private modalService: NgbModal,
        public router: Router,
		private centersService: CentersService
	) {
	}

	ngOnInit() {
		this.reset_all();
		this.pageload_data();
	}

	pageload_data(){
		// get all centers
		this.hideLoading_indicator = false;
		this.centersService.getallcreatedcenters().subscribe(data => {
			this.all_centers_list = data;
			this.filterData = data;
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
  
		// get all states
		this.hideLoading_indicator = false;
		this.centersService.getallstates().subscribe(data => {
			this.all_states = data;
			this.hideLoading_indicator = true;
		}, error => {}, () => {});
	}

	// Select on Change events
	state_select_onchange(event: Event) {
    	const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectedOptionText = selectedOptions[selectedIndex].text;

		this.selected_statecode = selectedOptionValue;
		this.selected_statevalue = selectedOptionText;

		this.load_districts_arr(this.selected_statecode);
	}

	load_districts_arr(statecode){
		let state_arr = this.all_states.filter( state => state.code == statecode);
		this.all_districts = (state_arr == undefined || state_arr == null || state_arr.length <= 0) ? [] : state_arr[0].districts;
	}
	
	district_select_onchange(event: Event) {
    	const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectedOptionText = selectedOptions[selectedIndex].text;

		this.selected_districtid = selectedOptionValue;
		this.selected_districtvalue = selectedOptionText;
	}

	formSubmitAction(centersubmitaction) {
		this.document_id = (this.document_id == undefined || this.document_id == null || this.document_id.trim() == '') ? '' : this.document_id ;
		this.selected_centerid = (this.selected_centerid == undefined || this.selected_centerid == null || this.selected_centerid.trim() == '') ? '' : this.selected_centerid ;
		this.selected_centername = (this.selected_centername == undefined || this.selected_centername == null || this.selected_centername.trim() == '') ? '' : this.selected_centername.toLowerCase() ;
		this.selected_statecode = (this.selected_statecode == undefined || this.selected_statecode == null || this.selected_statecode.trim() == '') ? '' : this.selected_statecode ;
		this.selected_statevalue = (this.selected_statevalue == undefined || this.selected_statevalue == null || this.selected_statevalue.trim() == '') ? '' : this.selected_statevalue ;
		this.selected_districtid = (this.selected_districtid == undefined || this.selected_districtid == null || this.selected_districtid.trim() == '') ? '' : this.selected_districtid ;
		this.selected_districtvalue = (this.selected_districtvalue == undefined || this.selected_districtvalue == null || this.selected_districtvalue.trim() == '') ? '' : this.selected_districtvalue ;
		this.selected_blockname = (this.selected_blockname == undefined || this.selected_blockname == null || this.selected_blockname.trim() == '') ? '' : this.selected_blockname ;

		if(this.selected_centername.trim() == ''){
			swal.fire('Info','Invalid center name.','warning');
		}else if(this.selected_centername.trim().length < 3){
			swal.fire('Info','Center name must be of 3 or more character length.','warning');
		}else if(this.selected_statecode.trim() == ''){
			swal.fire('Info','Invalid state.','warning');
		}else if(this.selected_districtid.trim() == ''){
			swal.fire('Info','Invalid district.','warning');
		}else if(this.selected_blockname.trim() == ''){
			swal.fire('Info','Invalid block name.','warning');
		}else if(this.selected_blockname.trim().length < 3){
			swal.fire('Info','Block name must be of 3 or more character length.','warning');
		}else{
			if (centersubmitaction === 'Create' && this.document_id === '') {
				let name = this.selected_centername;
				name = name.trim();
				var arr = name.split(' ');
				name = (arr.length > 0) ? arr[0] : ''; 
				var suffix = Math.floor(1000 + Math.random() * 9999);
				this.selected_centerid = name+'@'+suffix;

				let body = {
					centerid : this.selected_centerid.trim().toLowerCase(),
					centername : this.selected_centername.trim().toLowerCase(),
					statecode : this.selected_statecode.trim(),
					statevalue : this.selected_statevalue.trim(),
					districtid : this.selected_districtid.trim(),
					districtvalue : this.selected_districtvalue.trim(),
					block : this.selected_blockname.trim().toLowerCase(),
					status : 'available'
				}
				//console.log('-->body: ',body)
				this.savecenter(body);
			} else if (centersubmitaction === 'Update' && this.document_id !== '') {
				let body = {
					centername : this.selected_centername.trim().toLowerCase(),
					statecode : this.selected_statecode.trim(),
					statevalue : this.selected_statevalue.trim(),
					districtid : this.selected_districtid.trim(),
					districtvalue : this.selected_districtvalue.trim(),
					block : this.selected_blockname.trim().toLowerCase(),
				}
				//console.log('-->documentid: ',this.document_id,'    body: ',body)
				this.updatecenter(this.document_id, body);
			} else {
				swal.fire('Info', 'Data can not be saved', 'warning');
			}
		}
	}

	savecenter(body){
		this.centersService.createnewcenter(body).subscribe(data => {
			this.modalReference.close();
			this.reset_all();
			this.pageload_data();
			swal.fire('Success', 'Data saved successfully', 'success');
		}, error => { }, () => {});
	}

	updatecenter(documentid, body){
		this.centersService.updatecenter(documentid, body).subscribe(data => {
			this.modalReference.close();
			this.reset_all();
			this.pageload_data();
			swal.fire('Success', 'Data updated successfully', 'success');
		}, error => {}, () => {});
	}

	deletecenter_btn_click(center){
		let id = center._id;
		swal.fire({
			title: 'Center name: '+center.centername,
			text: 'Do you want to delete this center?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes'
		}).then((result) => {
			if (result.value) {
				//console.log('-->id: ',id)
				this.deleteFormSubmitAction(id);
			}
		});
		
	}

	deleteFormSubmitAction(id) {
		this.centersService.deletecenter(id).subscribe(data => {
			this.reset_all();
			this.pageload_data();
			swal.fire('Success', 'Data deleted successfully', 'success');
		}, error => { }, () => {});
	}
	
	open(content, center) {
		if (Object.keys(center).length > 0) {
			//console.log('--> Selected center: ',center)
			this.centersubmitaction = 'Update';
			this.document_id = center._id;
			this.selected_centername = (center.centername == undefined || center.centername == null || center.centername.trim() == '') ? '' : center.centername;
			this.selected_statecode = (center.statecode == undefined || center.statecode == null || center.statecode.trim() == '') ? '' : center.statecode;
			this.selected_statevalue = (center.statevalue == undefined || center.statevalue == null || center.statevalue.trim() == '') ? '' : center.statevalue;
			this.load_districts_arr(this.selected_statecode);
			this.selected_districtid = (center.districtid == undefined || center.districtid == null || center.districtid.trim() == '') ? '' : center.districtid;
			this.selected_districtvalue = (center.districtvalue == undefined || center.districtvalue == null || center.districtvalue.trim() == '') ? '' : center.districtvalue;
			this.selected_blockname = (center.block == undefined || center.block == null || center.block.trim() == '') ? '' : center.block;
		} else {
			this.centersubmitaction = 'Create';
			this.document_id = '';
			this.selected_centerid = '';
			this.selected_centername = '';
			this.selected_statecode = '';
			this.selected_statevalue = '';
			this.selected_districtid = '';
			this.selected_districtvalue = '';
			this.selected_blockname = '';
		}
		//this.selected_centername = ('undefined')?'':this.selected_centername;
		this.modalReference = this.modalService.open(content, center);
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

	search(term: string) {
		term = (term == undefined || term == null) ? '' : term;
		if(!term) {
		  this.filterData = this.all_centers_list;
		} else {
			this.filterData = this.all_centers_list.filter(element => 
				  element.centername.toLowerCase().includes(term.trim().toLowerCase())
			);
		}
	}

	reset_all(){
		this.selected_centerid = '';
		this.selected_centername = '';
		this.selected_statecode = '';
		this.selected_statevalue = '';
		this.selected_districtid = '';
		this.selected_districtvalue = '';
		this.selected_blockname = '';

		this.searchtext.nativeElement.value = '';
		this.hideLoading_indicator = true;
	}

	// Unused
	/*
		swal confirm
		-------------
		swal.fire({
				title: 'Are you sure?',
				text: "Do you want to save changes?",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes'
			}).then((result) => {
				if (result.value) {
					if(this.save_operation == 'update'){
						this.update_baseline(this.record_id);
					}else{
						this.save_baseline();
					}
				}
			});
		}


		// get all active user types
		this.centersService.getallactiveusertypes().subscribe(data => {
				this.data = data;
				this.all_usertypes = data;
			}, error => {}, () => {}
		);

		// get all teachers
		this.centersService.getallteachers().subscribe(data => {
				this.data_teachers = data;
				this.teachers = data;
			}, error => {}, () => {}
		);
		
		pincode_entered(pin: string) {
			if (pin.length === 6) {
				this.postal_index = pin;
				this.find_address_bypincode(pin);
			}
		}

		find_address() {
			this.find_address_bypincode(this.find_address_bypincode);
		}

		find_address_bypincode(pincode) {
			this.centersService.getaddress(pincode).subscribe(data => {
					const keys = Object.keys(data);
					const len = keys.length;
					if (len > 0) {
						this.modal_centeraddress = data[0]['taluk'] + ', ' + data[0]['district'] + ', ' + data[0]['state'];
					} else {
						this.modal_centeraddress = 'Unspecified area';
					}
				}, error => {}, () => {}
			);
		}

		// centers auto complete
		onchange_centers_select(val: string) {
		}
		onfocus_centers_select(e){
			this.data = this.centers;
		}
		onselect_centers_select(item){
			let arr = [];
			arr.push(item);
			this.data = arr;
			this.disable_autocomplete = true;
		}

		// teachers auto complete
		onchange_teachers_select(val: string) {
		}
		onfocus_teachers_select(e){
			this.data_teachers = this.teachers;
		}
		onselect_teachers_select(item){
			this.selected_userid = (item.userid == undefined) ? '' : item.userid;
			this.selected_username = (item.username == undefined) ? '' : item.username;
		}

		onSelect_modal_centertype(event){
			const selectedOptions = event.target['options'];
			const selectedIndex = selectedOptions.selectedIndex;
			const selectedOptionValue = selectedOptions[selectedIndex].value;
			const selectElementText = selectedOptions[selectedIndex].text;
			this.modal_centertype = selectedOptionValue;
		}
	
		refresh(){
			//this.auto.clear();
			//this.disable_autocomplete = false;
		}

		open(content) {
			this.modalService.open(content).result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			});
		}
	*/
}
