import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { BlockdistrictService } from './blockdistrict.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-blockdistrict',
    templateUrl: './blockdistrict.component.html',
    styleUrls: ['./blockdistrict.component.scss'],
    animations: [routerTransition()]
})
export class BlockdistrictComponent implements OnInit {
	// state data
	allstate_districts: any = [];
	selected_statecode: any = '';
	selected_statevalue: any = '';
	selected_statecode_filter: any = '';
	selected_statevalue_filter: any = '';

	// district data
	distFormGroup: FormGroup;
	all_districts: any = [];
	selected_districtid: any = '';
	selected_districtvalue: any = '';
	districtid: any;

	// block data
	block_name = '';

	public data: any;
	centersubmitaction: string;

	closeResult: string;
	model: any;
	modalReference: any;

	hideLoading_indicator: boolean;
	modal_id: string;
	modal_centerid: string;
	modal_centername: string;
	modal_centerpin: string;
	modal_centeraddress: string;
	postal_index: string;

    constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder,
        public router: Router,
		private blockdistrictService: BlockdistrictService
	) {
		this.distFormGroup = this.formBuilder.group({
			block_name: ['', [Validators.required]]
		});
		this.hideLoading_indicator = true;
	}

	ngOnInit() {
		/*
		this.hideLoading_indicator = false;
		this.blockdistrictService.getallblocksanddistricts().subscribe(data => {
				console.log('### data: ' + JSON.stringify(data));
				const newdata = [];
				Object.keys(data).forEach(i => {
					let element = data[i];
					console.log('@@@element: ' + JSON.stringify(element));
					if (element['block'].length > 0) {
						newdata.push(element);
					}
				});
				this.data = newdata;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);

		this.blockdistrictService.getalldistrict().subscribe(data => {
				console.log('### data: ' + JSON.stringify(data));
				this.all_districts = data;
				this.selected_district = data[0];
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
		*/
		
		this.selected_statecode_filter = 'OR';
		this.selected_statevalue_filter='Odisha'
		this.getallblocksanddistrictsbystatecode(this.selected_statecode_filter); 	// <-- for showing details in the table
		this.getallstateanddistricts();												// <-- in create new block district modal
	}
	
	getallblocksanddistrictsbystatecode(statecode){
		this.hideLoading_indicator = false;
		this.blockdistrictService.getallblocksanddistrictsbystatecode(statecode).subscribe(data => {
				console.log('### data: ' + JSON.stringify(data));
				const newdata = [];
				Object.keys(data).forEach(i => {
					let element = data[i];
					console.log('@@@element: ' + JSON.stringify(element));
					if (element['block'].length > 0) {
						newdata.push(element);
					}
				});
				this.data = newdata;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}

	getallstateanddistricts(){
		this.blockdistrictService.getallstateanddistricts().subscribe(data => {
				//console.log('### data: ' + JSON.stringify(data));
				this.allstate_districts = data;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}

	state_on_change(event: Event) {
    	const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectedElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= ' + selectedOptionValue + '   Text= ' + selectedElementText);
		this.selected_statecode = selectedOptionValue;
		this.selected_statevalue = selectedElementText;
		
		this.all_districts = this.allstate_districts.filter(obj => {
			return obj.code === selectedOptionValue
		});
		if(this.all_districts.length > 0)
			this.all_districts = this.all_districts[0].districts;
		//console.log('###all-districts: '+JSON.stringify(this.all_districts));
    }

	statefilter_on_change(event: Event) {
    	const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectedElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= ' + selectedOptionValue + '   Text= ' + selectedElementText);
		this.selected_statecode_filter = selectedOptionValue;
		this.selected_statevalue_filter = selectedElementText;
		this.getallblocksanddistrictsbystatecode(this.selected_statecode_filter);
    }

	district_on_change(event: Event) {
    	const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectedElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= ' + selectedOptionValue + '   Text= ' + selectedElementText);
		this.selected_districtid = selectedOptionValue;
		this.selected_districtvalue = selectedElementText;
    }

	formSubmitAction() {
		if (this.selected_statecode == undefined || this.selected_statecode == null || this.selected_statecode == '') {
			swal.fire('Data insufficient','Please select state.','warning');
		}else if (this.selected_districtid == undefined || this.selected_districtid == null || this.selected_districtid == '') {
			swal.fire('Data insufficient','Please select district.','warning');
		}else if (this.block_name == undefined || this.block_name == null || this.block_name.trim() == '') {
			swal.fire('Data insufficient','Please enter valid block name.','warning');
		}else{
			this.save_data();
		} 
	}

	save_data(){
		const distobj = {
			statecode: this.selected_statecode,
			statevalue : this.selected_statevalue,
			districtid : this.selected_districtid,
			districtvalue : this.selected_districtvalue,
			block : this.block_name
		};
		console.log('$$$distobj: ' + JSON.stringify(distobj));
		this.blockdistrictService.createnewblockdistrict(distobj).subscribe(data => {
				console.log('### res data: ' + JSON.stringify(data));
				this.modalReference.close();
				location.reload();
			},
			error => {console.log('###2 error: ' + JSON.stringify(error)); },
			() => {}
		);
	}

	deleteFormSubmitAction(id) {
		console.log('### id: ' + id);
		this.blockdistrictService.deleteblockdistrictbyid(id).subscribe(data => {
				console.log('### res data: ' + JSON.stringify(data));
				this.modalReference.close();
				location.reload();
			},
			error => {console.log('###2 error: ' + JSON.stringify(error)); },
			() => {}
		);
	}

	open(content, center) {
		console.log('#### center: ' + JSON.stringify(center));
		if (center !== undefined || center != null) {
			this.centersubmitaction = 'Update';
			this.modal_id = center._id;
			this.modal_centername = center.centername;
			this.modal_centerpin = center.centerpin;
			this.modal_centeraddress  = center.centeraddress;
		} else {
			this.centersubmitaction = 'Create';
			this.modal_id = '';
			this.modal_centername = '';
			this.modal_centerpin = '';
			this.modal_centeraddress  = '';
		}
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
}
