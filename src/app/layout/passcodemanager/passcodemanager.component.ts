import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { PasscodemanagerService } from  './passcodemanager.service';

@Component({
    selector: 'app-passcodemanager',
    templateUrl: './passcodemanager.component.html',
    styleUrls: ['./passcodemanager.component.scss'],
    animations: [routerTransition()]
})
export class PasscodemanagerComponent implements OnInit {
  public data : any;
  public filterData : any;
  end_date_str: string = '';
  passcode_id: string = '';
  org_name: string = '';
  passcode: string = '';
  flag: string = '';
  modalReference: any;
	closeResult: string;
  valid_submit: boolean = false;
	hideLoading_indicator: boolean = true;
  
  
  constructor(
		private modalService: NgbModal,
    public router: Router,
		private passcodemanagerService: PasscodemanagerService
	) {}

	ngOnInit() {
    this.hideLoading_indicator = false;
    this.getallPasscode();
  }

	getallPasscode(){
		this.hideLoading_indicator = false;
		this.passcodemanagerService.getallpasscode().subscribe(data => {
        this.data = data;
        this.filterData = data;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}
  search(term: string) {
		term = (term == undefined || term == null) ? '' : term;
		if(!term) {
		  this.filterData = this.data;
		} else {
      this.filterData = this.data.filter(element => 
			element.orgname.toLowerCase().includes(term.trim().toLowerCase())
		  );
		}
	}
  clear(){
    this.passcode_id = '';
    this.org_name = '';
    this.passcode = '';
  }

  reset(){
    this.flag = '';
    this.valid_submit = false;
    this.clear();
  }

  validate(){
    let nameregex = new RegExp("[a-zA-Z_]")
    let passcoderegx = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$")
    if(this.org_name == null || this.org_name == undefined || this.org_name == '') {
      this.valid_submit = false;
      alert('Organisation name is not valid !!!');
    }else if(!nameregex.test(this.org_name)){
      alert('Organisation name should be valid !!!');
    }else if(this.passcode == null || this.passcode == undefined || this.passcode == '') {
      this.valid_submit = false;
      alert('Passcode is not valid !!!');
    }else if(this.passcode.length<5 || this.passcode.length>15){
      this.valid_submit = false;
      alert('Passcode must have only 5 -to- 15 charchters !!!');
    }else if(!passcoderegx.test(this.passcode)){
      this.valid_submit = false;
      alert('Passcode should content letters and numeric !!!');
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
		this.passcodemanagerService.getpasscode(this.passcode.toUpperCase()).subscribe(data1 => {
				if(data1['check']){
          alert('Passcode already exists !!!');
        }else{
          let body = {
            orgname: this.org_name,
            passcode: this.passcode.toUpperCase()
          }
          this.passcodemanagerService.createnewpasscode(body).subscribe(data2 => {
                this.modalReference.close();
                alert('Passcode saved '+data2['status']);
                this.getallPasscode();
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
    this.passcodemanagerService.getpasscode(this.passcode.toUpperCase()).subscribe(data1 => {
      if(Object.keys(data1).length > 0){
        let body = {
          orgname: this.org_name,
          passcode: this.passcode.toUpperCase()
        }
        this.passcodemanagerService.updatepasscode(this.passcode_id, body).subscribe(data2 => {
            this.modalReference.close();
            alert('Passcode updated '+data2['status']);
            this.getallPasscode();
            this.hideLoading_indicator = true;
            this.reset();
          },
          error => {},
          () => {}
        );
      }else{
        this.hideLoading_indicator = true;
        alert('Passcode not found !!!');
      }
    });
  }

  delete_data(){
    this.hideLoading_indicator = false;
		this.passcodemanagerService.deletepasscode(this.passcode_id).subscribe(data => {
        this.modalReference.close();
        alert('passcode removed '+data['status']);
        this.getallPasscode();
				this.hideLoading_indicator = true;
        this.reset();
			},
			error => {},
			() => {}
    );
  }

	open(content, param, flag) {
    this.flag = flag;

		if(flag == 'add') {
      this.clear();
    } else if(flag == 'edit') {
      this.passcode_id = param._id;
      this.org_name = param.orgname;
      this.passcode = param.passcode;
    } else if(flag == 'delete') {
      this.passcode_id = param._id;
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
