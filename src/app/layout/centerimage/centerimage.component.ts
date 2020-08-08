import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from "file-saver";

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CenterimageService } from  './centerimage.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeValue} from '@angular/platform-browser';

@Component({
    selector: 'app-centerimage',
    templateUrl: './centerimage.component.html',
    styleUrls: ['./centerimage.component.scss'],
    animations: [routerTransition()]
})
export class CenterimageComponent implements OnInit {	
	usersubmitaction: string;
    public managers : any;
	public images : any;
	img64: any;
    submitted = false;
	closeResult: string;
	model: any;
	hideLoading_indicator: boolean;
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
		private centerimageService: CenterimageService,
		private domSanitizer: DomSanitizer
	) {
		this.centerimageFormGroup = this.formBuilder.group({
			
		});

		this.hideLoading_indicator = true;	
		this.hideNo_results_div = true;	
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
		//this.getcenterimagebyuserid(this.selected_userid);
	}

	open(content,param,flag) {
		if(flag == 'view'){
			this.createslider(param);
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
	}

	getallmanager(){
		this.hideLoading_indicator = false;
		this.centerimageService.getallmanager().subscribe(data => {
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
		this.centerimageService.getcenterimagebyuserid(userid).subscribe(data => {
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
							imageurl : data[i].imageurl,
							contentType : data[i].contentType,
							image : this.domSanitizer.bypassSecurityTrustResourceUrl("data:image/"+data[i].contentType+";base64,"+data[i].image),
							createdon : data[i].createdon
						}
						newdata.push(newobj);
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

		}else{
			this.getcenterimagebyuserid(this.selected_userid);	
		}
	}

	downloadimage(image){
		let filename = image.imageurl;
		filename = (filename != null || filename != undefined || filename != '')? filename.replace('assets/images/uploads/',''):'';
		this.centerimageService.downloadcenterimage(filename).subscribe(data => {
				saveAs(data, filename);
			}, 
			error => {}, 
			() => {}
		);
	}

	deleteimage(image){
		let id = image._id;
		let userid = image.userid;
		this.centerimageService.deletecenterimage(id).subscribe(data => {
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
			this.sliders.push({imagePath: v['imageurl'], label: '', text: ''});
		});
	}
}
