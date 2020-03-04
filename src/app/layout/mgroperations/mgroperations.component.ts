/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from "file-saver";

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MgroperationsService } from  './mgroperations.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeValue} from '@angular/platform-browser';

@Component({
    selector: 'app-mgroperations',
    templateUrl: './mgroperations.component.html',
    styleUrls: ['./mgroperations.component.scss'],
    animations: [routerTransition()]
})
export class MgroperationsComponent implements OnInit {	
	@ViewChild('gmap') gmapElement: ElementRef;
	map: google.maps.Map;
	marker: google.maps.Marker;
	  
	hideLoading_indicator: boolean;
	hide_gmap_div: boolean;
	public managers : any;

	usersubmitaction: string;
	public operation_list : any;
	img64: any;
    submitted = false;
	closeResult: string;
	model: any;
	
	hideNo_results_div: boolean;
	modalReference: any;

	centerimageFormGroup: FormGroup;
	userid: string;
	selected_userid: string;
	selected_operation: String = '';;
	selected_username: string;

	public sliders: Array<any> = [];

    constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder,
        private translate: TranslateService,
        public router: Router,
		private mgroperationsService: MgroperationsService,
		private domSanitizer: DomSanitizer
	) {
		this.centerimageFormGroup = this.formBuilder.group({
			
		});

		this.hideLoading_indicator = true;	
		this.hideNo_results_div = true;
		this.hide_gmap_div = true;	
	}
	
	ngOnInit() {
		this.hideLoading_indicator = false;
		this.getallmanager();

		let lat = 18.5793;
		let lng = 73.8143;
		//this.showOnMap(lat, lng);
	}

	getallmanager(){
		this.hideLoading_indicator = false;
		this.mgroperationsService.getallmanager().subscribe(data => {
				//console.log('@@@data: '+JSON.stringify(data));
				this.managers = data;
				//var _blank_obj = { userid:'', username: '-- Select User --' }
				//this.managers.splice(0,0,_blank_obj);
				this.hideLoading_indicator = true;				
			}, 
			error => {}, 
			() => {}
		);	
	}

	showOnMap(lat, lng){
		this.hide_gmap_div = false;	
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

	showmap(lat, lng){
		console.log('showmap() invoked');
		this.hide_gmap_div = false;	
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

	closemap(){
		this.hide_gmap_div = true;	
		this.map = null;
		this.marker = null;
	}

	locate(_lat,_lng){
		console.log('@@@_lat: '+_lat+'    @@@_lng: '+_lng);
		let newlat = 18.5793;
		let newlng = 73.8143;
		newlat = (_lat != null && _lat != undefined && _lat != '')?parseFloat(_lat):18.5793;
		newlng = (_lng != null && _lng != undefined && _lng != '')?parseFloat(_lng):73.8143;
		var myLatLng = new google.maps.LatLng(newlat, newlng);
    	this.marker.setPosition(myLatLng);
    	this.map.setCenter(myLatLng);
	}

	open(content,param,flag) {
		console.log('#### flag: '+flag);
		if(flag == 'view'){
			this.sliders = [];
			this.sliders.push({imagePath: param, label: '', text: ''});
		}else if(flag == 'locate'){
			this.showOnMap(param.lat, param.lng);
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

	onselect_operation_select(event){
		let selectedOptions = event.target['options'];
		let selectedIndex = selectedOptions.selectedIndex;
		let selectedOptionValue = selectedOptions[selectedIndex].value;
		this.selected_operation = selectedOptionValue;
		console.log('-->Selected operation= '+this.selected_operation);
	}

	getoperationbyuserid(userid, operation){
		this.hideLoading_indicator = false;	
		this.mgroperationsService.getoperationbyuserid(userid, operation).subscribe(data => {
				//console.log('@@@data: '+JSON.stringify(data));
				this.operation_list = data;		
				this.hideLoading_indicator = true;					
			}, 
			error => {}, 
			() => {}
		);
	}	

	FormSubmitAction(){
		if(this.selected_userid == null || this.selected_userid == undefined || this.selected_userid == ''){
			alert('Please select user !!!')
		}else if(this.selected_operation == null || this.selected_operation == undefined || this.selected_operation == ''){
			alert('Please select operation !!!')
		}else{
			this.getoperationbyuserid(this.selected_userid, this.selected_operation.trim());	
		}
	}

	downloadimage(image){
		console.log('@@@ image object: '+JSON.stringify(image));
		let filename = image.imageurl;
		filename = (filename != null || filename != undefined || filename != '')? filename.replace('assets/images/uploads/',''):'';
		console.log('@@@ image to be download: '+filename);
		this.mgroperationsService.downloadcenterimage(filename).subscribe(data => {
				saveAs(data, filename);
			}, 
			error => {}, 
			() => {}
		);
	}

	deleteimage(image){
		console.log('@@@ image object: '+JSON.stringify(image));
		let id = image._id;
		let userid = image.userid;
		console.log('@@@ image to be deleted: '+id);
		this.mgroperationsService.deletecenterimage(id).subscribe(data => {
				//saveAs(data, filename);
				this.getoperationbyuserid(userid, this.selected_operation);
				this.modalReference.close();
			}, 
			error => {}, 
			() => {}
		);
	}

	createslider(images){
		images.forEach(v => {
			console.log('@@@v : '+JSON.stringify(v));
			this.sliders.push({imagePath: v['imageurl'], label: '', text: ''});
		});
	}
}
