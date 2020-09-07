import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TeacherprofileService } from './../teacherprofile/teacherprofile.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-teacherprofilecreate',
  templateUrl: './teacherprofilecreate.component.html',
  styleUrls: ['./teacherprofilecreate.component.scss']
})
export class TeacherprofilecreateComponent implements OnInit {
	modal_id: string;
	modal_userid: string;
	modal_teachername: string;
	modal_contactno: string;
	modal_qualification: string;
	modal_address: string;
	modal_specialinitiatives: string;
	modal_aspirations: string;
	modal_pretrainingmark: string = '';
	teacherprofile_status: string = 'active';

	public minDate: Date = new Date ("01/01/2015");
  public maxDate: Date = new Date ();
	public dateValue: Date = new Date ();
	modal_startdate: Date = new Date ();
	hideLoading_indicator: boolean;

  constructor(
	  public router: Router,
	  public activeModal: NgbActiveModal,
      private teacherprofileService: TeacherprofileService
	) {}
	
	ngOnInit() {
    this.hideLoading_indicator = true;
  }

	// selecting user type
	onSelect_modal_qualification(event: Event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.modal_qualification = selectedOptionValue;
	}

	datepicker_onchange(event){
		this.modal_startdate = new Date(event.value);
	}

	// save user
	save_button_click() {
		if(this.modal_teachername == undefined || this.modal_teachername == null || this.modal_teachername == ''){
			swal.fire('Data insufficient', 'Please mention teacher name.', 'warning');
		} else if(this.modal_contactno == undefined || this.modal_contactno == null || this.modal_contactno == ''){
			swal.fire('Data insufficient', 'Please mention contact no.', 'warning');
		} else{
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
      this.save(body);
		}
	}

	save(body) {
		this.teacherprofileService.createnewteacherprofile(body).subscribe(data => {
        if(data['status'] == 'success'){
          swal.fire('Success', 'Data saved successfully.', 'success');
		  location.reload();
		  //this.activeModal.dismiss();
        }else{
          swal.fire('Info', 'Something went wrong.', 'warning');
		  location.reload();
		  //this.activeModal.dismiss();
        }
			},
			error => {},
			() => {}
		);
	}
}
