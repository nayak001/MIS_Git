/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from "file-saver";

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CenterlocationService } from  './centerlocation.service';



@Component({
    selector: 'app-centerlocation',
    templateUrl: './centerlocation.component.html',
    styleUrls: ['./centerlocation.component.scss'],
    animations: [routerTransition()]
})
export class CenterlocationComponent implements OnInit {	
	@ViewChild('gmap') gmapElement: ElementRef;
  	map: google.maps.Map;
  	marker: google.maps.Marker;

	usersubmitaction: string;
    public managers : any;
    public locations : any;
    submitted = false;
	closeResult: string;
	model: any;
	hideLoading_indicator: boolean;
	modalReference: any;

	centerlocationFormGroup: FormGroup;
	userid: string;
	selected_userid: string;
	selected_username: string;

	public sliders: Array<any> = [];

    constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder,
        private translate: TranslateService,
        public router: Router,
		private centerlocationService: CenterlocationService
	) {
		this.centerlocationFormGroup = this.formBuilder.group({
			
		});

		this.hideLoading_indicator = true;	
	}
	
	ngOnInit() {
		/*if (localStorage.getItem('_currentuser_emailid') &&
			localStorage.getItem('_currentuser_password') &&
			localStorage.getItem('_currentuser_type') === 'admin') {
			this.router.navigate(['dashboard']);
		}else{
			this.router.navigate(['/']);
		}
		*/
		this.hideLoading_indicator = false;

		this.getallmanager();
		//if(this.selected_userid == null || this.selected_userid == undefined) this.selected_userid = '';
		//console.log('@@@pageload userid: '+this.selected_userid);
		//this.getcenterimagebyuserid(this.selected_userid);
		let lat = 18.5793;
		let lng = 73.8143;
		this.showOnMap(lat, lng);
	}

	open(content,param,flag) {
		console.log('#### flag: '+flag+'    #### param: '+JSON.stringify(param));
		if(flag == 'view'){
			let lat = 18.5793;
			let lng = 73.8143;
			this.showOnMap(lat, lng);
		}
		this.modalReference = this.modalService.open(content,param);	
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

	onselect_centerimage_user_select(event){
		let selectedOptions = event.target['options'];
		let selectedIndex = selectedOptions.selectedIndex;
		let selectedOptionValue = selectedOptions[selectedIndex].value;
		let selectElementText = selectedOptions[selectedIndex].text;
		this.selected_userid = selectedOptionValue;
		this.selected_username = selectElementText;
		console.log('-->Selected userid= '+this.selected_userid+'   username= '+this.selected_username);
	}

	getallmanager(){
		this.hideLoading_indicator = false;
		this.centerlocationService.getallmanager().subscribe(data => {
				//console.log('@@@data: '+JSON.stringify(data));
				var _blank_obj = {
					userid:'',
					username: ''
				}
				this.managers = data;
				this.managers.splice(0,0,_blank_obj);
				this.hideLoading_indicator = true;				
			}, 
			error => {}, 
			() => {}
		);	
	}

	getcenterimagebyuserid(userid){
		this.hideLoading_indicator = false;	
		this.centerlocationService.getgeolocationbyuserid(userid).subscribe(data => {
				/*let arr: Array<any> = [];
				if(Object.keys(data).length > 0){
					Object.keys(data).forEach((v, k) => {
						console.log('@@v: '+JSON.stringify(v)+'    @@k: '+JSON.stringify(k));
						let obj = {};
						obj['_id'] = v['_id'];
						obj['userid'] = v['userid'];
						obj['username'] = v['username'];
						obj['centerid'] = v['centerid'];
						obj['centername'] = v['centername'];
						obj['lat'] = (v['latlng'])['lat'];
						obj['lng'] = (v['latlng'])['lng']; 
						arr.push(obj);
					})
				}*/
				this.locations = data;		
				this.hideLoading_indicator = true;					
			}, 
			error => {}, 
			() => {}
		);
	}	

	FormSubmitAction(){
		if(this.selected_userid == null || this.selected_userid == undefined || this.selected_userid == ''){

		}else{
			this.getcenterimagebyuserid(this.selected_userid);	
		}
	}

	showOnMap(lat, lng){
		var myLatLng = {lat: lat, lng: lng}; //{lat: 18.5793, lng: 73.8143}; //{lat: -25.363, lng: 131.044};
		var mapProp = {
	      center: myLatLng,
	      zoom: 15,
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
	    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

	    this.marker = new google.maps.Marker({
          position: myLatLng,
          map: this.map,
          title: 'Hello World!'
        });
	}

	locate(_lat,_lng){
		//console.log('@@@_lat: '+_lat+'    @@@_lng: '+_lng);
		let newlat = 18.5793;
		let newlng = 73.8143;
		newlat = (_lat != null && _lat != undefined && _lat != '')?parseFloat(_lat):18.5793;
		newlng = (_lng != null && _lng != undefined && _lng != '')?parseFloat(_lng):73.8143;
		var myLatLng = new google.maps.LatLng(newlat, newlng);
    	this.marker.setPosition(myLatLng);
    	this.map.setCenter(myLatLng);
	}
}
