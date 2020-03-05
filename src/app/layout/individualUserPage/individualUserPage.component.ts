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
import { SelectorMatcher } from '@angular/compiler';



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
	managerData:any ="select";
	userDetails:any;
	public data : any;
	managerDetails: any;
	

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
			debugger
			_self.managerId  =	params['id']	
			_self.getManagerDetails()
		});
	}
	async ngOnInit() {
	this.getmanagers()
	
	}

	getManagerDetails(){
		this.IndividualUserPageService.getManagerDetails(this.managerId).subscribe(data => {
			console.log(data)
			this.userDetails = data;
		})

	}

	getUserData(value){
		this.managerId  =	value	
		this.getManagerDetails()

	}
	getDate(data){
		if(data && data.manger && data.manger.createdon){
			var date = moment(data.manger.createdon).format('DD MMM, YYYY')
			return date
			
		}
		return ''

		

	}
	search(managername){
		
		

	}
	getmanagers(){
		this.IndividualUserPageService.getManagers().subscribe(data => {
			debugger
			console.log(data)
			this.managerDetails = data;
	})
	

	
}

}


