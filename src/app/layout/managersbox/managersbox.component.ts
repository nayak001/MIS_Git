import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { ManagersboxService } from  './managersbox.service';
import { environment } from './../../../environments/environment.prod';
const baseUrl = environment.baseUrl;

import swal from 'sweetalert2';

@Component({
    selector: 'app-managersbox',
    templateUrl: './managersbox.component.html',
    styleUrls: ['./managersbox.component.scss'],
    animations: [routerTransition()]
})

export class ManagersboxComponent implements OnInit {
	@ViewChild('fileInput')
	fileInputVariable: ElementRef;
	baseUrl = environment.baseUrl+'s3api/download/';

	
	data: any = [];
	total_file_count_str: string = '';
	hideProgressbar: boolean = true;
	hideLoading_indicator: boolean = true;

	selectedFiles: FileList;
	currentFileUpload: File;
	progress: { percentage: number } = { percentage: 0 };
	
	displayname: string = '';
	s3name: string = '';
	filetype: string = '';
	s3path: string = '';

	constructor(private managersboxService: ManagersboxService) {
		this.hideProgressbar = true;
		this.hideLoading_indicator = true;
		this.getAllFromManagersBox();
	 }

	ngOnInit() {}

	getAllFromManagersBox(){
		this.managersboxService.getAllFromManagersBox().subscribe(data => {
				this.data = data;
				this.total_file_count_str = "Total Files: "+this.data.length;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}

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

	uploadfile_button_click() {
		this.hideProgressbar = false;
		this.progress.percentage = 0;

		this.currentFileUpload = this.selectedFiles.item(0);
		this.managersboxService.pushFileToStorage(this.currentFileUpload, this.s3name).subscribe(event => {
			if (event.type === HttpEventType.UploadProgress) {
				this.progress.percentage = Math.round(100 * event.loaded / event.total);
			} else if (event instanceof HttpResponse) {
				this.s3path = event.body['s3path'];
				this.hideProgressbar = true;
				this.savetodb();
			}
		});
		//this.selectedFiles = undefined;
	}

	savetodb(){
		this.hideLoading_indicator = false;
		let body = {
			displayname: this.displayname,
			s3name: this.s3name,
			filetype: this.filetype,
			s3path: this.s3path
		}
		this.managersboxService.uploadToManagersBox(body).subscribe(data => {
				this.getAllFromManagersBox();
				this.hideLoading_indicator = true;
				swal.fire('Save', 'Level added '+data['status'], 'success');
				this.resetall();
			},
			error => {},
			() => {}
		);
	}

	delete_button_click(filedata){
		swal.fire({
		  title: 'Are you sure?',
		  text: "Do you want to delete this file?",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes'
		}).then((result) => {
		  if (result.value) {
			this.deletes3file(filedata);
		  }
		});
	}

	deletes3file(filedata){
		this.hideLoading_indicator = false;
		this.managersboxService.deleteFromStorage(filedata.s3name).subscribe(data1 => {
				this.managersboxService.deleteFromManagersBox(filedata._id).subscribe(data2 => {
						this.getAllFromManagersBox();
						this.hideLoading_indicator = true;
						swal.fire(
							'Save',
							'File deletion '+data2['status'],
							'success'
						);
						this.resetall();
					},
					error => {},
					() => {}
				);
			},
			error => {},
			() => {}
		);
	}

	resetall(){
		this.hideProgressbar = true;
		this.progress.percentage = 0;
		this.selectedFiles = null;
		this.fileInputVariable.nativeElement.value = "";
	}
}
