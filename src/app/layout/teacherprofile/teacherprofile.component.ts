import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { TeacherprofileService } from './teacherprofile.service';

@Component({
    selector: 'app-teacherprofile',
    templateUrl: './teacherprofile.component.html',
    styleUrls: ['./teacherprofile.component.scss'],
    animations: [routerTransition()]
})
export class TeacherprofileComponent implements OnInit {
	public data : any;
	allteacherprofile_data: any= [];
	public filterData : any;
	modalReference: any;
	closeResult: string;
	model: any;
	
	modal_id: string;
	modal_userid: string;
	modal_teachername: string;
	modal_contactno: string;
	modal_qualification: string;
	modal_address: string;
	modal_specialinitiatives: string;
	modal_aspirations: string;
	//modal_startdate: string = '';
	modal_pretrainingmark: string = '';
	teacherprofile_status: string = '';

	public minDate: Date = new Date ("01/01/2015");
    public maxDate: Date = new Date ();
	public dateValue: Date = new Date ();
	modal_startdate: Date = new Date ();

	button_action: string = '';
	hideLoading_indicator: boolean;

    constructor(
		private modalService: NgbModal,
        public router: Router,
		private teacherprofileService: TeacherprofileService
	) {
		this.hideLoading_indicator = true;
		this.getallteacherprofiles();
	}
	
	ngOnInit() {}

	// get all user types
	getallteacherprofiles() {
		this.hideLoading_indicator = false;
		this.teacherprofileService.getallteacherprofiles().subscribe(data => {
				console.log('### allteacherprofile_data: '+JSON.stringify(data));
				this.data = data;
				this.allteacherprofile_data = data;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
  	}

	search(term: string) {
		term = (term == undefined || term == null) ? '' : term;
		if(!term) {
		  this.filterData = this.data;
		} else {
		  this.filterData = this.data.filter(element => 
			element.emailid.toLowerCase().includes(term.trim().toLowerCase())
		  );
		}
	}

	// selecting user type
	onSelect_modal_qualification(event: Event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= '+selectedOptionValue + '   Text= '+selectElementText);
		this.modal_qualification = selectedOptionValue;
	}

	datepicker_onchange(event){
		this.modal_startdate = new Date(event.value);
		console.log('###selected_date: '+this.modal_startdate);
	}

	// save user
	save_button_click() {
		if(this.modal_teachername == undefined || this.modal_teachername == null || this.modal_teachername == ''){
			swal.fire(
				'Data insufficient',
				'Please mention teacher name.',
				'warning'
			);
		}
		else if(this.modal_contactno == undefined || this.modal_contactno == null || this.modal_contactno == ''){
			swal.fire(
				'Data insufficient',
				'Please mention contact no.',
				'warning'
			);
		}
		else{
			const body = {
				teachername : this.modal_teachername,
				qualification : this.modal_qualification,
				contactno : this.modal_contactno,
				address : this.modal_address,
				special_initiatives : this.modal_specialinitiatives,
				aspirations : this.modal_aspirations,
				center_start_date : this.modal_startdate,
				preprogram_training_mark : this.modal_pretrainingmark,
				status : this.teacherprofile_status
			};
			if(this.button_action === 'new') {
				this.save(body);
			}
			else if (this.button_action === 'edit') {
				this.update(body);
			} else {
				swal.fire(
					'Success',
					'Data saved successfully.',
					'success'
				);
			}
		}
	}

	save(body) {
		this.teacherprofileService.createnewteacherprofile(body).subscribe(data => {
				console.log('### res data: ' + JSON.stringify(data));
				this.modalReference.close();
				this.getallteacherprofiles();
			},
			error => {console.log('###2 error: ' + JSON.stringify(error)); },
			() => {}
		);
		swal.fire(
			'Success',
			'Data saved successfully.',
			'success'
		);
	}

	update(body) {
		console.log('### inside elseif');
		this.teacherprofileService.updateteacherprofile(this.modal_id, body).subscribe(data => {
				console.log('### res data: ' + JSON.stringify(data));
				this.modalReference.close();
				this.getallteacherprofiles();
			},
			error => {},
			() => {}
		);
		swal.fire(
			'Success',
			'Data updated successfully.',
			'success'
		);
	}

	disable_button_click(teacherprofile, current_status){
		let id = teacherprofile._id;
		let body = {
		  status: current_status
		}
		this.hideLoading_indicator = false;
		this.teacherprofileService.updateteacherprofile(id, body).subscribe(data => {
			console.log('### res data: ' + JSON.stringify(data));
			this.getallteacherprofiles();
		},
		error => {},
		() => {}
		);
	}
	
	open(content,teacherprofile) {
		// edit
		if(teacherprofile != undefined || teacherprofile != null){
			this.button_action = 'edit';
			this.modal_id = teacherprofile._id;
			this.modal_teachername = teacherprofile.teachername;
			this.modal_qualification = teacherprofile.qualification;
			this.modal_contactno = teacherprofile.contactno;
			this.modal_address = teacherprofile.address;
			this.modal_specialinitiatives = teacherprofile.special_initiatives;
			this.modal_aspirations = teacherprofile.aspirations;
			this.modal_startdate = teacherprofile.center_start_date;
			this.modal_pretrainingmark = teacherprofile.preprogram_training_mark;
			this.teacherprofile_status = teacherprofile.status;
		} 
		// new
		else {
			this.button_action = 'new';
			this.modal_id = '';
			this.modal_teachername = '';
			this.modal_qualification = 'matric';
			this.modal_contactno = '';
			this.modal_address = '';
			this.modal_specialinitiatives = '';
			this.modal_aspirations = '';
			this.modal_startdate = new Date();
			this.modal_pretrainingmark = '';
			this.teacherprofile_status = 'active';
		}
		this.modalReference = this.modalService.open(content, {backdrop  : 'static',keyboard  : false});
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
