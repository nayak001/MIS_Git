import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router,ActivatedRoute,Params, Route} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {IndividualUserPageService } from './individualUserPage.service';
import { $ } from 'protractor';

import * as jquery from "jquery";
import * as  moment from 'moment/moment';
import { shallowEqual } from '@angular/router/src/utils/collection';



@Component({
	selector: 'app-studentDetailsPage',
	templateUrl: './individualUserPage.component.html',
	styleUrls: ['./individualUserPage.component.scss'],
	animations: [routerTransition()]
})
export class IndividualUserPageComponent implements OnInit {
	userModalFormGroup: FormGroup;
	managerId:any;
	userType:any;

	constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder,
		private translate: TranslateService,
		public router: Router,
		private activatedRoute: ActivatedRoute,
		private IndividualUserPageService: IndividualUserPageService
	) {
		var _self = this
		this.activatedRoute.params.subscribe((params: Params) => {
		var data  =	params['id']
		 var obj =	data.split("?")
			 _self.managerId = obj[0]
			_self.userType = obj[1]
			_self.getManagerDetails()
		});
	}
	async ngOnInit() {
	
	
	}

	getManagerDetails(){
		this.IndividualUserPageService.getManagerDetails(this.managerId,this.userType).subscribe(data => {
			console.log(data)
		})

	}
	

	
}


