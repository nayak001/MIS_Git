import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UsertypeService } from  './usertype.service';

@Component({
    selector: 'app-usertype',
    templateUrl: './usertype.component.html',
    styleUrls: ['./usertype.component.scss'],
    animations: [routerTransition()]
})
export class UsertypeComponent implements OnInit {
  public data: any;
  all_usertypes: any = [];

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
    private usertypeService: UsertypeService
	) {
    this.hideLoading_indicator = true;
    this.getallusertypes();
	}

  ngOnInit() {}
  
  getallusertypes(){
		this.hideLoading_indicator = false;
		this.usertypeService.getallusertypes().subscribe(data => {
        this.data = data;
				this.all_usertypes = data;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
  }
	
	getallactiveusertypes() {
		this.hideLoading_indicator = false;
		this.usertypeService.getallactiveusertypes().subscribe(data => {
        this.data = data;
				this.all_usertypes = data;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
  }
  
  disable_button_click(usertype_obj, status){
    let id = usertype_obj._id;
    let body = {
      usertype: usertype_obj.usertype,
      status: status
    }
    this.hideLoading_indicator = false;
		this.usertypeService.updateusertype(id, body).subscribe(data => {
        this.getallusertypes();
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
  }
}
