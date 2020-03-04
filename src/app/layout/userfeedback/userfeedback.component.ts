import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserfeedbackService } from  './userfeedback.service';

@Component({
    selector: 'app-userfeedback',
    templateUrl: './userfeedback.component.html',
    styleUrls: ['./userfeedback.component.scss'],
    animations: [routerTransition()]
})
export class UserfeedbackComponent implements OnInit {
  // res
  public data: any;
	all_userfeedbacks: any = [];

  // form
  userfeedbackModalFormGroup: FormGroup;

	// modal
	closeResult: string;
	modalReference: any;

	// loading gif
	hideLoading_indicator: boolean;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    public router: Router,
    private userfeedbackService: UserfeedbackService
	) {
		this.userfeedbackModalFormGroup = this.formBuilder.group({
		});
		this.hideLoading_indicator = true;
	}

	ngOnInit() {
		this.hideLoading_indicator = false;

		// get all userfeedbacks
		this.userfeedbackService.getalluserfeedback().subscribe(data => {
        this.data = data;
        this.all_userfeedbacks = data;
        this.hideLoading_indicator = true;
      },
      error => {},
      () => {}
    );
  }

	open(content, center) {
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

	deleteFormSubmitAction(id) {
		this.userfeedbackService.deleteuserfeedbackbyid(id).subscribe(data => {
				this.modalReference.close();
				location.reload();
			},
			error => {console.log('###2 error: ' + JSON.stringify(error)); },
			() => {}
		);
	}
}
