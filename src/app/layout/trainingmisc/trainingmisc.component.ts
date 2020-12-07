import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { TrainingmiscService } from  './trainingmisc.service';
import swal from 'sweetalert2';
@Component({
    selector: 'app-trainingmisc',
    templateUrl: './trainingmisc.component.html',
    styleUrls: ['./trainingmisc.component.scss'],
    animations: [routerTransition()]
})
export class TrainingMiscComponent implements OnInit {
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
		private TrainingmiscService: TrainingmiscService
	) {}

	ngOnInit() {
    // this.hideLoading_indicator = false;
    this.getallfiles();
  }
  currentFileUpload: File;
	hideProgressbar: boolean = true;
	progress: { percentage: number } = { percentage: 0 };
	s3path: string = '';
	currentvedioFileUpload: File;
  addfile(){
		if(this.selectedFiles == undefined || this.selectedFiles == null){
			swal.fire('info', 'Please select image file', 'warning');
		}else{
		this.hideProgressbar = false;
		this.progress.percentage = 0;

		this.currentFileUpload = this.selectedFiles.item(0);
		this.TrainingmiscService.pushFileToStorage(this.currentFileUpload, this.s3name).subscribe(event => {
			if (event.type === HttpEventType.UploadProgress) {
				this.progress.percentage = Math.round(100 * event.loaded / event.total);
			} else if (event instanceof HttpResponse) {
				this.s3path = event.body['s3path'];
        this.hideProgressbar = true;
        const body ={
          "filename":this.s3name,
          "filepath":this.s3path,
          "filetype": this.filetype,
          "type":'file'
        }
        this.save_record(body);
			}
		});
	  }
  }
  selectedFiles:any;
  displayname:any;
  filetype:any;
  s3name:any;
  filechooser_onchange(event) {
		if(event.target.files.length > 0){
			this.selectedFiles = event.target.files;
			this.displayname = event.target.files[0].name;
			this.filetype = this.displayname.split('.').pop();
			this.s3name = (new Date()).getTime()+'.'+this.filetype;
		}else{
			this.displayname = '';
			this.selectedFiles = null;
		}
  }
  async save_record(body){
		this.TrainingmiscService.savefiles(body).subscribe(data => {
				swal.fire('Success', 'Record save status: '+data['status'], 'success');
				location.reload();
			},
			error => {},
			() => {}
		);
  }
  async update_record(id, body){
		this.TrainingmiscService.updatefile(id, body).subscribe(data => {
				swal.fire('Success', 'Record updated successfully', 'success');
				this.getallfiles();
			},
			error => {},
			() => {}
		);
	}
  edit_selectedFiles:any;
  edit_displayname:any;
  edit_filetype:any;
  edit_s3name:any;
  edit_filechooser_onchange(event) {
		if(event.target.files.length > 0){
			this.edit_selectedFiles = event.target.files;
			this.edit_displayname = event.target.files[0].name;
			this.edit_filetype = this.edit_displayname.split('.').pop();
			this.edit_s3name = (new Date()).getTime()+'.'+this.edit_filetype;
		}else{
			this.edit_displayname = '';
			this.edit_selectedFiles = null;
		}
	}
	edit_s3_path:any;
	updatefile() {
		this.hideProgressbar = false;
		this.progress.percentage = 0;
		this.currentFileUpload = this.edit_selectedFiles.item(0);
		this.TrainingmiscService.pushFileToStorage(this.currentFileUpload, this.edit_s3name).subscribe(event => {
			if (event.type === HttpEventType.UploadProgress) {
				this.progress.percentage = Math.round(100 * event.loaded / event.total);
			} else if (event instanceof HttpResponse) {
        this.edit_s3_path = event.body['s3path'];
        this.hideProgressbar = true;
        const body ={
          "filename": this.edit_s3name,
          "filepath":	this.edit_s3_path,
          "filetype": this.edit_filetype,
          "type":'file',
        }
        this.update_record(this.file_id,body);
			}
		});
		
	}
	getallfiles(){
		this.hideLoading_indicator = false;
		this.TrainingmiscService.getallfiles().subscribe(data => {
        this.data = data;
        this.filterData = data;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}
 
  clear(){
    this.file_id = '';
  }

  reset(){
    this.flag = '';
    this.valid_submit = false;
    this.clear();
  }
  delete_data(){
    this.hideLoading_indicator = false;
		this.TrainingmiscService.deletefiles(this.file_id).subscribe(data => {
        this.modalReference.close();
        alert('file removed successfully');
        this.getallfiles();
				this.hideLoading_indicator = true;
        this.reset();
			},
			error => {},
			() => {}
    );
  }
  file_id:any;
  filename:any;
  filepath:any;
	open(content, param, flag) {
    this.flag = flag;

		if(flag == 'add') {
      this.clear();
    } else if(flag == 'edit') {
      this.file_id = param._id;
      this.filename = param.filename;
      this.filepath = param.filepath;
    } else if(flag == 'delete') {
      this.file_id = param._id;
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

