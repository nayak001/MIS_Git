import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BlockdistrictService } from './blockdistrict.service';

@Component({
    selector: 'app-blockdistrict',
    templateUrl: './blockdistrict.component.html',
    styleUrls: ['./blockdistrict.component.scss'],
    animations: [routerTransition()]
})
export class BlockdistrictComponent implements OnInit {
	public data: any;
	all_districts: any = [];
	selected_district: any = '';
	block_name = '';
	districtid: any;

	distFormGroup: FormGroup;

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
        private translate: TranslateService,
        public router: Router,
		private blockdistrictService: BlockdistrictService
	) {
		this.distFormGroup = this.formBuilder.group({
			block_name: ['', [Validators.required]]
		});
		this.hideLoading_indicator = true;
	}

	ngOnInit() {
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

	formSubmitAction() {
		const distobj = {
			id: this.districtid,
		    district : this.selected_district,
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

		/*if (centersubmitaction === 'Update' && frm_id !== '') {
			console.log('### inside elseif frm_id= ' + frm_id);
			this.blockdistrictService.updateblockdistrictbyid(frm_id, center).subscribe(data => {
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
		}*/
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

	district_on_change(event: Event) {
    	const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= ' + selectedOptionValue + '   Text= ' + selectElementText);
		this.selected_district = selectedOptionValue;

		this.blockdistrictService.getidbydistrict(selectElementText).subscribe(data => {
				console.log('### data: ' + JSON.stringify(data));
				this.districtid = data['id'];
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
    }
}
