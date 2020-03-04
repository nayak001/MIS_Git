import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CentersService, ValidationService } from  './centers.service';

@Component({
    selector: 'app-centers',
    templateUrl: './centers.component.html',
    styleUrls: ['./centers.component.scss'],
    animations: [routerTransition()]
})
export class CentersComponent implements OnInit {
	@ViewChild('auto') auto;
	all_usertypes: any = [];
	
	all_districts: any = [];
	selected_district: any = '';

	all_blocks: any = [];
	selected_block: any = '';

	block_name = '';
	districtid: any;

	centerModalFormGroup: FormGroup;

	centersubmitaction: string;
    
	closeResult: string;
	model: any;
	modalReference: any;

	hideLoading_indicator: boolean;
	modal_id: string;
	modal_centerid: string;
	modal_centername: string='';
	modal_centertype: string= 'school';
	modal_centerpin: string;
	modal_centeraddress: string;
	postal_index: string;
	
	// centers auto-complete 
	data: any;
	centers: any;
	keyword = 'centername';
	disable_autocomplete: boolean = false;

	// teachers auto-complete 
	data_teachers: any;
	teachers: any;
	keyword_teachers = 'userid';
	selected_userid: string = '';
	selected_username: string = '';

    constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder,
        private translate: TranslateService,
        public router: Router,
		private centersService: CentersService
	) {
		this.centerModalFormGroup = this.formBuilder.group({
			modal_id: ['', []],
			modal_centername: ['', [Validators.required]]
		});
		this.hideLoading_indicator = true;
	}

	ngOnInit() {
		this.hideLoading_indicator = false;
		// get all active user types
		this.hideLoading_indicator = false;
		this.centersService.getallactiveusertypes().subscribe(data => {
        this.data = data;
				this.all_usertypes = data;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
  
		// get all districts
		this.centersService.getalldistrict().subscribe(data => {
				console.log('### getalldistrict data: ' + JSON.stringify(data));
				this.all_districts = data;
				this.selected_district = data[0] ;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);

		// get all teachers
		this.centersService.getallteachers().subscribe(data => {
				console.log('### All Teachers('+Object.keys(data).length+'): ' + JSON.stringify(data));
				this.data_teachers = data;
				this.teachers = data;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);

		// get all centers
		this.centersService.getallcreatedcenters().subscribe(data => {
				console.log('### All Centers('+Object.keys(data).length+'): ' + JSON.stringify(data));
				this.data = data;
				this.centers = data;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}
	
	// centers auto complete
	onchange_centers_select(val: string) {
		console.log('--> centers auto-complete change event'+JSON.stringify(val));
	}
	onfocus_centers_select(e){
		console.log('--> centers auto-complete focus event'+JSON.stringify(e));
		this.data = this.centers;
	}
	onselect_centers_select(item){
		console.log('--> centers auto-complete select event'+JSON.stringify(item));
		let arr = [];
		arr.push(item);
		this.data = arr;
		this.disable_autocomplete = true;
	}

	// teachers auto complete
	onchange_teachers_select(val: string) {
		console.log('--> teachers auto-complete change event'+JSON.stringify(val));
	}
	onfocus_teachers_select(e){
		console.log('--> teachers auto-complete focus event'+JSON.stringify(e));
		this.data_teachers = this.teachers;
	}
	onselect_teachers_select(item){
		console.log('--> teachers auto-complete select event'+JSON.stringify(item));
		this.selected_userid = (item.userid == undefined) ? '' : item.userid;
		this.selected_username = (item.username == undefined) ? '' : item.username;
		console.log('--> selected_userid: '+this.selected_userid+'    selected_username: '+this.selected_username);
	}


	onSelect_modal_centertype(event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= '+selectedOptionValue + '   Text= '+selectElementText);
		this.modal_centertype = selectedOptionValue;
	}

	refresh(){
		this.auto.clear();
		this.data = this.centers;
		this.disable_autocomplete = false;
	}

    /*open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }*/

	open(content, center) {
		if (Object.keys(center).length > 0) {
			console.log('### center: '+JSON.stringify(center));
			this.centersubmitaction = 'Update';
			this.modal_id = center._id;
			this.modal_centername = center.centername;
			this.modal_centertype= center.centertype;
			this.selected_userid = center.userid;
			this.selected_username = center.username;
			this.selected_district = center.district;
			this.get_blocks_of_district(this.selected_district);
			this.selected_block = center.block;
			this.modal_centeraddress  = center.centeraddress;
		} else {
			this.centersubmitaction = 'Create';
			this.modal_id = '';
			this.modal_centername = '';
			this.modal_centeraddress  = '';
		}
		console.log('#### centersubmitaction: '+this.centersubmitaction+'    center: ' + JSON.stringify(center));
		//this.modal_centername = ('undefined')?'':this.modal_centername;
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

	formSubmitAction(centersubmitaction) {
		const frm_id = this.modal_id;
		const frm_centername = this.modal_centername;
		const frm_centerid = (frm_centername.length > 3) ? ((frm_centername.substring(0, 3).toUpperCase()) + (new Date().getTime())) : (('CEN') + (new Date().getTime()));
		console.log('@@@ this.selected_block: ' + this.selected_block);

		const frm_centeraddress = this.modal_centeraddress;
		const frm_centerpin = '0';

		this.selected_block = (this.selected_block.length > 0)? this.selected_block: this.all_blocks[0];
		const center = {
			// userid: frm_userid,
			centername: frm_centername,
			centertype: this.modal_centertype,
			userid: this.selected_userid,
			username: this.selected_username,
		    district : this.selected_district,
		    block : this.selected_block,
		    status : 'active',
		};
		console.log('###111' + centersubmitaction + ' frm_id: ' + frm_id + ' center: ' + JSON.stringify(center));
		if (centersubmitaction === 'Create' && frm_id === '') {
			console.log('### inside if');
			center['centerid'] = frm_centerid;
			this.centersService.createnewcenter(center).subscribe(data => {
					console.log('### res data: ' + JSON.stringify(data));
					this.modalReference.close();
					location.reload();
				},
				error => {console.log('###2 error: ' + JSON.stringify(error)); },
				() => {}
			);
			// alert('Data saved successfully !!!');
		} else if (centersubmitaction === 'Update' && frm_id !== '') {
			console.log('### inside elseif frm_id= ' + frm_id);
			this.centersService.updatecenter(frm_id, center).subscribe(data => {
					console.log('### res data: ' + JSON.stringify(data));
					this.modalReference.close();
					location.reload();
				},
				error => {},
				() => {}
			);
			// alert('Data updated successfully !!!');
		} else {
			console.log('### inside else');
			alert('Data can not be saved !!!');
		}
	}

	deleteFormSubmitAction(id) {
		console.log('### id: ' + id);
		this.centersService.deletecenter(id).subscribe(data => {
				console.log('### res data: ' + JSON.stringify(data));
				this.modalReference.close();
				location.reload();
			},
			error => {console.log('###2 error: ' + JSON.stringify(error)); },
			() => {}
		);
	}

	pincode_entered(pin: string) {
		if (pin.length === 6) {
			console.log('###2 pin: ' + pin);
			this.postal_index = pin;
			this.find_address_bypincode(pin);
		}
	}

	find_address() {
		this.find_address_bypincode(this.find_address_bypincode);
	}

	find_address_bypincode(pincode) {
		this.centersService.getaddress(pincode).subscribe(data => {
				console.log('### data: ' + JSON.stringify(data));
				const keys = Object.keys(data);
				const len = keys.length;
				console.log('### len: ' + len);
				if (len > 0) {
					this.modal_centeraddress = data[0]['taluk'] + ', ' + data[0]['district'] + ', ' + data[0]['state'];
				} else {
					this.modal_centeraddress = 'Unspecified area';
				}
			}, error => {}, () => {}
		);
	}

	district_on_change(event: Event) {
    	const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= ' + selectedOptionValue + '   Text= ' + selectElementText);
		this.selected_district = selectedOptionValue;
		this.get_blocks_of_district(this.selected_district);
	}

	get_blocks_of_district(district: string){
		this.centersService.getallblocksbydistrict(district).subscribe(data => {
				console.log('### data: ' + JSON.stringify(data));
				const newdata = [];
				Object.keys(data).forEach(i => {
					const element = data[i];
					console.log('-->element= ' + JSON.stringify(element));
					if (element.length > 0) {
						newdata.push(element);
					}
				});
				this.all_blocks = newdata;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}

	block_on_change(event: Event) {
    	const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= ' + selectedOptionValue + '   Text= ' + selectElementText);
		this.selected_block = selectedOptionValue;
    }
}
