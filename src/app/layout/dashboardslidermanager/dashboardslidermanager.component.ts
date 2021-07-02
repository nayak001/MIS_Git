import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DashboardslidermanagerService } from  './dashboardslidermanager.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeValue} from '@angular/platform-browser';

@Component({
    selector: 'app-dashboardslidermanager',
    templateUrl: './dashboardslidermanager.component.html',
    styleUrls: ['./dashboardslidermanager.component.scss'],
    animations: [routerTransition()]
})
export class DashboardslidermanagerComponent implements OnInit {
  public alludashboardsliderlist : any = [];
  flag: string = '';
  no_record_selected: boolean = false;

  slider_type: string = 'advertisement';
  slider_title: string = '';
  slider_subtitle: string = '';
  slider_message: string = '';
  slider_createdon: string = '';

  selected_record: any = {};
  record_id: string = '';

  modalReference: any;
	closeResult: string;
	hideLoading_indicator: boolean = true;

  // image
	filetype: string;
  imageurl:any;
  base64str:any;
  base64img: any;

  constructor(
		private modalService: NgbModal,
    public router: Router,
		private dashboardslidermanagerService: DashboardslidermanagerService,
		private domSanitizer: DomSanitizer
	) {}

	ngOnInit() {
    this.getalldashboardslides();
  }

  slider_type_onchange(event) {
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectedElementText = selectedOptions[selectedIndex].text;
    this.slider_type = selectedOptionValue;
  }

	getalldashboardslides(){
		this.hideLoading_indicator = false;
		this.dashboardslidermanagerService.getalldashboardslides().subscribe(data => {
      console.log('-->get records: ',data);
      if(data == undefined || data ==null || Object.keys(data).length <= 0){
        this.alludashboardsliderlist = [];
        this.selected_record = {};
        this.record_id = '';
        this.no_record_selected = true;
      }else{
        this.alludashboardsliderlist = data;
        this.selected_record = data[0];
        this.record_id = this.selected_record._id;
        this.no_record_selected = false;
      }
      this.hideLoading_indicator = true;
		},error => {},() => {});
	}

  reset(){
    this.imageurl = null;
    this.base64str = null;
    this.base64img = null;
    this.slider_type = 'advertisement';
    this.slider_title = '';
    this.slider_subtitle = '';
    this.slider_message = '';
    this.slider_createdon = null;
  }

  save_data(){
    if(this.base64str == null || this.base64str == undefined || this.base64str == '') {
      swal.fire('Info','Select an image', 'warning');
    }else if(!(this.filetype.toLocaleLowerCase() == 'jpg' || this.filetype.toLocaleLowerCase() == 'jpeg' || this.filetype.toLocaleLowerCase() == 'png')) {
      swal.fire('Info','Image is not valid', 'warning');
    }else if(this.slider_type == null || this.slider_type == undefined || this.slider_type == '') {
      swal.fire('Info', 'Select type', 'warning');
    }else{
      this.hideLoading_indicator = false;
      let body = {
        title: this.slider_title,
        subtitle: this.slider_subtitle,
        message: this.slider_message,
        type: this.slider_type,
        image: this.base64str
      }
      this.dashboardslidermanagerService.savedashboardslides(body).subscribe(data2 => {
        this.modalReference.close();
        swal.fire('Success', 'Slider Record saved successfully', 'success');
        this.getalldashboardslides();
        this.hideLoading_indicator = true;
        this.reset();
      },error => {},() => {});
    }
  }

  delete_data(row){
    swal.fire({
      title: 'Are you sure?',
      text: "Do you want to remove this record?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.hideLoading_indicator = false;
        this.dashboardslidermanagerService.deletedashboardslides(row._id).subscribe(data => {
          swal.fire('Success', 'Slider Record deleted successfully', 'success');
        },error => {
          console.log('--> Delete Error',error);
        },() => {
          console.log('--> Delete Final ');
          this.getalldashboardslides();
          this.hideLoading_indicator = true;
          this.reset();
        });
      }
    });
  }

  // ----------------------------- Modal -------------------------------
	open(content) {
    this.reset();
    this.base64str = null;
    this.base64img = null;
    this.slider_type = 'advertisement';
    this.slider_title = '';
    this.slider_subtitle = '';
    this.slider_message = '';

		this.modalReference = this.modalService.open(content);
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

  //--------------------------- Image ----------------------------------

	filechooser_onchange(event) {
		if(event.target.files.length > 0){
			let files = event.target.files;
			let file = event.target.files[0];
			this.filetype = file.name.split('.').pop();
      if (files && file) {
        let reader = new FileReader();
        reader.onload =this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
      }
		}
	}

  _handleReaderLoaded(readerEvt) {
    this.imageurl = readerEvt.target.result; // this is the image path i.e. url
    this.base64str= btoa(this.imageurl);
    this.base64img = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + this.base64str);
  }
}
