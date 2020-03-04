import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { VersionmanagerService } from  './versionmanager.service';

@Component({
    selector: 'app-versionmanager',
    templateUrl: './versionmanager.component.html',
    styleUrls: ['./versionmanager.component.scss'],
    animations: [routerTransition()]
})
export class VersionmanagerComponent implements OnInit {
  public data : any;

  record_id: string = '';
  txt_app_name: string = '';
  txt_app_package: string = '';
  txt_app_version: string = '';
  
  flag: string = '';
  modalReference: any;
	closeResult: string;
  
  valid_submit: boolean = false;
	hideLoading_indicator: boolean = true;
  

  constructor(
		private modalService: NgbModal,
    public router: Router,
		private versionmanagerService: VersionmanagerService
	) {}

	ngOnInit() {
    this.hideLoading_indicator = false;
    this.getallappversionlist();
  }

	getallappversionlist(){
		this.hideLoading_indicator = false;
		this.versionmanagerService.getallappversion().subscribe(data => {
				console.log('@@@data: '+JSON.stringify(data));
				this.data = data;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}

  clear(){
    this.record_id = '';
    this.txt_app_name = '';
    this.txt_app_package = '';
    this.txt_app_version = '';
  }

  reset(){
    this.flag = '';
    this.valid_submit = false;
    this.clear();
  }

  validate(){
    if(this.txt_app_name == null || this.txt_app_name == undefined || this.txt_app_name == '') {
      this.valid_submit = false;
      alert('App name is not valid !!!');
    }else if(this.txt_app_package == null || this.txt_app_package == undefined || this.txt_app_package == '') {
      this.valid_submit = false;
      alert('Package is not valid !!!');
    }else if(this.txt_app_version == null || this.txt_app_version == undefined || this.txt_app_version == '') {
      this.valid_submit = false;
      alert('Version is not valid !!!');
    }else{
      this.valid_submit = true;
    }
  }
  
  submit_data(){
    this.validate();
    if(this.valid_submit){
      if(this.flag == 'add') {
        this.save_data();
      } else if(this.flag == 'edit') {
        this.update_data();
      } else if(this.flag == 'delete') {
        this.delete_data();
      }
    }
  }

  save_data(){
		this.hideLoading_indicator = false;
		this.versionmanagerService.getappversion(this.txt_app_package).subscribe(data1 => {
				console.log('@@@checking for package: '+JSON.stringify(data1));
				if(Object.keys(data1).length > 0){
          alert('Package name already exists !!!');
        }else{
          let body = {
            appname: this.txt_app_name,
            package: this.txt_app_package,
            version: this.txt_app_version
          }
          this.versionmanagerService.createnewappversion(body).subscribe(data2 => {
                console.log('@@@saving new app version: '+JSON.stringify(data2));
                this.modalReference.close();
                alert('App saved '+data2['status']);
                this.getallappversionlist();
                this.hideLoading_indicator = true;
                this.reset();
              },
              error => {},
              () => {}
            );
        }
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
  }

  update_data(){
    this.hideLoading_indicator = false;
    this.versionmanagerService.getappversion(this.txt_app_package).subscribe(data1 => {
      console.log('@@@checking for package: '+JSON.stringify(data1));
      if(Object.keys(data1).length > 0){
        let body = {
          appname: this.txt_app_name,
          package: this.txt_app_package,
          version: this.txt_app_version
        }
        this.versionmanagerService.updateappversion(this.record_id, body).subscribe(data2 => {
            console.log('@@@data: '+JSON.stringify(data2));
            this.modalReference.close();
            alert('App updated '+data2['status']);
            this.getallappversionlist();
            this.hideLoading_indicator = true;
            this.reset();
          },
          error => {},
          () => {}
        );
      }else{
        this.hideLoading_indicator = true;
        alert('Package name not found !!!');
      }
    });
  }

  delete_data(){
    this.hideLoading_indicator = false;
		this.versionmanagerService.deleteappversion(this.record_id).subscribe(data => {
				console.log('@@@data: '+JSON.stringify(data));
        this.modalReference.close();
        alert('App removed '+data['status']);
        this.getallappversionlist();
				this.hideLoading_indicator = true;
        this.reset();
			},
			error => {},
			() => {}
    );
  }

	open(content, param, flag) {
		console.log("#### flag: "+flag+"    param: "+JSON.stringify(param));
    this.flag = flag;

		if(flag == 'add') {
      this.clear();
    } else if(flag == 'edit') {
      this.record_id = param._id;
      this.txt_app_name = param.appname;
      this.txt_app_package = param.package;
      this.txt_app_version = param.version;
    } else if(flag == 'delete') {
      this.record_id = param._id;
    } else {
      this.reset();
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
}
