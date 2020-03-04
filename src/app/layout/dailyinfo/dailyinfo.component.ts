/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from "file-saver";

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DailyinfoService } from  './dailyinfo.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeValue} from '@angular/platform-browser';

@Component({
    selector: 'app-dailyinfo',
    templateUrl: './dailyinfo.component.html',
    styleUrls: ['./dailyinfo.component.scss'],
    animations: [routerTransition()]
})
export class DailyinfoComponent implements OnInit {	
	@ViewChild('gmap') gmapElement: ElementRef;
	map: google.maps.Map;
	marker: google.maps.Marker;
	  
	hideLoading_indicator: boolean;
	hide_gmap_div: boolean;
	public managers : any;

	usersubmitaction: string;
	public images : any;
	img64: any;
    submitted = false;
	closeResult: string;
	model: any;
	
	hideNo_results_div: boolean;
	modalReference: any;

	centerimageFormGroup: FormGroup;
	userid: string;
	selected_userid: string;
	selected_username: string;

	public sliders: Array<any> = [];

    constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder,
        private translate: TranslateService,
        public router: Router,
		private dailyinfoService: DailyinfoService,
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
		this.dailyinfoService.getallmanager().subscribe(data => {
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

	getcenterimagebyuserid(userid){
		this.hideLoading_indicator = false;	
		this.dailyinfoService.getcenterimagebyuserid(userid).subscribe(data => {
				console.log('@@@data: '+JSON.stringify(data));
				let newdata: any =[];
				if(Object.keys(data).length > 0){
					//------------------------------------------------------------
					Object.keys(data).forEach(i => {
						/*let TYPED_ARRAY = new Uint8Array(data[i].image.data);
						const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
						let base64String = btoa(STRING_CHAR);
						this.img64= this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + base64String);
						*/
						var newobj = { 
							_id : data[i]._id,
							userid : data[i].userid,
							username : data[i].username,
							centerid : data[i].centerid,
							centername : data[i].centername,
							date: data[i].date,
							centrefeedback: data[i].centrefeedback,
							latlng: data[i].latlng,
							imageurl : data[i].imageurl,
							contentType : data[i].contentType,
							image : this.domSanitizer.bypassSecurityTrustResourceUrl("data:image/"+data[i].contentType+";base64,"+data[i].image),
							createdon : data[i].createdon
						}
						newdata.push(newobj);
						// console.log('@@@newobj: '+JSON.stringify(newobj));
					});
					data = newdata;
					//------------------------------------------------------------
					this.hideNo_results_div = true;
				}else
					this.hideNo_results_div = false;
				this.images = data;		
				this.hideLoading_indicator = true;					
			}, 
			error => {}, 
			() => {}
		);
	}	

	FormSubmitAction(){
		if(this.selected_userid == null || this.selected_userid == undefined || this.selected_userid == ''){
			alert('Process can not be completed !!!')
		}else{
			this.getcenterimagebyuserid(this.selected_userid);	
		}
	}

	downloadimage(image){
		console.log('@@@ image object: '+JSON.stringify(image));
		let filename = image.imageurl;
		filename = (filename != null || filename != undefined || filename != '')? filename.replace('assets/images/uploads/',''):'';
		console.log('@@@ image to be download: '+filename);
		this.dailyinfoService.downloadcenterimage(filename).subscribe(data => {
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
		this.dailyinfoService.deletecenterimage(id).subscribe(data => {
				//saveAs(data, filename);
				this.getcenterimagebyuserid(userid);
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
