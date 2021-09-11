import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AnganwadimanagerService } from  './anganwadimanager.service';

@Component({
    selector: 'app-anganwadimanager',
    templateUrl: './anganwadimanager.component.html',
    styleUrls: ['./anganwadimanager.component.scss'],
    animations: [routerTransition()]
})
export class AnganwadimanagerComponent implements OnInit {
  public getallanganwadilist : any = [];
  public getallanganwadilist_bkp : any = [];
  flag: string = '';
  no_record_selected: boolean = false;

  txt_anganwadi_unique_code: string = '';
  txt_anganwadiname: string = '';

  selected_record: any = {};
  record_id: string = '';

  modalReference: any;
	closeResult: string;
	hideLoading_indicator: boolean = true;

  constructor(
		private modalService: NgbModal,
    public router: Router,
		private anganwadimanagerService: AnganwadimanagerService
	) {}

	ngOnInit() {
    this.getallanganwadis();
  }

	getallanganwadis(){
		this.hideLoading_indicator = false;
		this.anganwadimanagerService.getallanganwadilist().subscribe(data => {
      console.log('-->get records: ',data);
      if(data == undefined || data ==null || Object.keys(data).length <= 0){
        this.getallanganwadilist = [];
        this.getallanganwadilist_bkp = [];
        this.selected_record = {};
        this.record_id = '';
        this.no_record_selected = true;
      }else{
        this.getallanganwadilist = data;
        console.log("this.getallanganwadilist",this.getallanganwadilist)
        this.getallanganwadilist_bkp = data;
        this.selected_record = data[0];
        this.record_id = this.selected_record._id;
        this.record_onselect(this.selected_record);
        this.no_record_selected = false;
      }
      this.hideLoading_indicator = true;
		},error => {},() => {});
	}

  record_onselect(row){
    console.log('--> selected row: ',row);
    //this.reset();
    this.selected_record = row;
    this.record_id = row._id;
    this.txt_anganwadi_unique_code = row.anganwadicode;
    this.txt_anganwadiname = row.anganwadiname;
  }

  reset(){
    this.txt_anganwadi_unique_code = '';
    this.txt_anganwadiname = '';
  }

  save_data(){
    if(this.txt_anganwadi_unique_code == null || this.txt_anganwadi_unique_code == undefined || this.txt_anganwadi_unique_code == '') {
      swal.fire('Info','Code is not valid', 'warning');
    }else if(this.txt_anganwadiname == null || this.txt_anganwadiname == undefined || this.txt_anganwadiname == '') {
      swal.fire('Info', 'Anganwadiname is not valid', 'warning');
    }else{
      this.hideLoading_indicator = false;
      this.anganwadimanagerService.checkanganwadiexistance(this.txt_anganwadi_unique_code).subscribe(data1 => {
        console.log('-->save check anganwadi: ',data1);
        if(Object.keys(data1).length > 0){
          swal.fire('Info', 'anganwadi Code already exists', 'warning');
        }else{
          let body = {
            anganwadicode: this.txt_anganwadi_unique_code,
            anganwadiname: this.txt_anganwadiname
          }
          this.anganwadimanagerService.saveanganwadi(body).subscribe(data2 => {
            this.modalReference.close();
            swal.fire('Success', 'Anganwadi Record saved successfully', 'success');
            this.getallanganwadis();
            this.hideLoading_indicator = true;
            this.reset();
          },error => {},() => {});
        }
        this.hideLoading_indicator = true;
      },error => {},() => {});
    }
  }

  update_data(){
    if(this.txt_anganwadi_unique_code == null || this.txt_anganwadi_unique_code == undefined || this.txt_anganwadi_unique_code == '') {
      swal.fire('Info','anganwadi Code is not valid', 'warning');
    }else if(this.txt_anganwadiname == null || this.txt_anganwadiname == undefined || this.txt_anganwadiname == '') {
      swal.fire('Info', 'Anganwadi name is not valid', 'warning');
    }else{
      this.hideLoading_indicator = false;
      this.anganwadimanagerService.checkanganwadiexistance(this.txt_anganwadi_unique_code).subscribe(data1 => {
        console.log('-->update check anganwadi: ',data1);
        if(Object.keys(data1).length > 0){
          if(data1[0]._id == this.record_id){
            let body = {
              anganwadicode: this.txt_anganwadi_unique_code,
              schoolname: this.txt_anganwadiname
            }
            this.anganwadimanagerService.updateanganwadi(this.record_id, body).subscribe(data2 => {
              this.modalReference.close();
              swal.fire('Success', 'anganwadi Record updated successfully', 'success');
              this.getallanganwadis();
              this.hideLoading_indicator = true;
              this.reset();
            },error => {},() => {});
          }else{
            swal.fire('Info', 'anganwadi Code already exists', 'warning');
          }
        }else{
          let body = {
            anganwadicode: this.txt_anganwadi_unique_code,
            schoolname: this.txt_anganwadiname
          }
          this.anganwadimanagerService.updateanganwadi(this.record_id, body).subscribe(data2 => {
            this.modalReference.close();
            swal.fire('Success', 'anganwadi Record updated successfully', 'success');
            this.getallanganwadis();
            this.hideLoading_indicator = true;
            this.reset();
          },error => {},() => {});
        }
        this.hideLoading_indicator = true;
      },error => {},() => {});
    }
  }

  delete_data(){
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
        this.anganwadimanagerService.deleteanganwadi(this.record_id).subscribe(data => {
          swal.fire('Success', 'anganwadi Record deleted successfully', 'success');
        },error => {
          console.log('--> Delete Error',error);
        },() => {
          console.log('--> Delete Final ');
          this.getallanganwadis();
          this.hideLoading_indicator = true;
          this.reset();
        });
      }
    });
  }


	search(term: string) {
		if(!term) {
		  this.getallanganwadilist = this.getallanganwadilist_bkp;
		} else {
		  this.getallanganwadilist = this.getallanganwadilist_bkp.filter(element => 
			  element.schoolname.trim().toLowerCase().includes(term.trim().toLowerCase())
		  );
		}
	}

  // ----------------------------- Modal -------------------------------
	open(content, flag) {
    this.reset();
    this.flag = flag;

		if(flag == 'save') {
      this.txt_anganwadi_unique_code = '';
      this.txt_anganwadiname = '';
    } else if(flag == 'update') {
      this.txt_anganwadi_unique_code = this.selected_record.anganwadicode;
      this.txt_anganwadiname = this.selected_record.schoolname;
    }

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
}
