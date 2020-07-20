import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GalleryService } from  './gallery.service';
import { environment } from './../../../environments/environment.prod';
const baseUrl = environment.baseUrl;

import swal from 'sweetalert2';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss'],
    animations: [routerTransition()]
})

export class GalleryComponent implements OnInit {
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

	// TAB
	selected_tab: string = 'managerapp_tab';

	// DIRECTORY
	apptype: string = '';
	directories_list: any = [];
	directoryname: string = '';
	selected_directory: string = '';

	// Resources
	filelist: any = [];
	resources: any = [];
	resources_inside_directory: any = [];

	// Modal
	closeResult: string;
	modalReference: any;

	//SHOW HIDE
	hide_content1: boolean = false;
	hide_content2: boolean = false;

	constructor(private galleryService: GalleryService, private modalService: NgbModal) {
		this.resetall();

		// get default view
		this.selected_tab = 'managerapp_tab';
		this.apptype = 'managerapp';
		this.getdirectorieslist();
		this.getallfilelist();

		//this.getAllFromManagersBox();
	}

	ngOnInit() {}

	resetall(){
		this.hide_content1 = false;
		this.hide_content2 = true;

		this.hideLoading_indicator = true;
		this.hideProgressbar = true;
		this.progress.percentage = 0;
		this.selectedFiles = null;
		//this.fileInputVariable.nativeElement.value = "";
		this.selected_directory = '';
		this.directoryname = '';
	}

	tab_on_change(tabname){
		this.selected_tab = tabname;
		console.log('---> selected_tab: '+JSON.stringify(this.selected_tab));
		if(this.selected_tab == 'managerapp_tab'){
			this.apptype = 'managerapp';
			this.selected_directory = '';
			this.directoryname = '';
		}else if(this.selected_tab == 'teacherapp_tab'){
			this.apptype = 'teacherapp';
			this.selected_directory = '';
			this.directoryname = '';
		}
		this.getdirectorieslist();
	}

	getdirectorieslist(){
		this.galleryService.getdistinctdirectorylistbyapptype(this.apptype).subscribe(data => {
				console.log('---> directories_list: '+JSON.stringify(data));
				this.directories_list = data;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}

	getallfilelist(){
		this.hideLoading_indicator = false;
		this.galleryService.getallfilelistbyapptype(this.apptype).subscribe(async data => {
				console.log('---> resources: '+JSON.stringify(data));
				//this.resources = data;
				
				this.filelist = data;
				if(this.filelist.length == 0) this.set_resource(this.filelist);
				let arr: any = [];
				let counter: number = 0;
				await this.filelist.forEach(ele => {
					counter++;
					console.log(counter+' --> ele: '+JSON.stringify(ele));
					if((ele.s3directory == undefined || ele.s3directory == null || ele.s3directory == '') && (ele.type == 'file')){
						arr.push(ele);
					}else if(ele.type == 'directory'){
						arr.push(ele);
					}
					if(counter == this.filelist.length){
						this.set_resource(arr);
					}
				});

				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}

	getallfilelist_inside_directory(directoryname){
		this.hideLoading_indicator = false;
		this.galleryService.getallfilelistinsidedirectorybyapptype(this.apptype, directoryname).subscribe(async data => {
				console.log('---> resources: '+JSON.stringify(data));
				this.resources_inside_directory = data;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}

	set_resource(arr){
		this.resources = arr;
	}

	directory_select_onchange(event: Event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= ' + selectedOptionValue + '   Text= ' + selectElementText);
		this.selected_directory = selectedOptionValue;
	}

	
	create_s3directory_button_click(apptype){	// apptype: twotypes 1. managerapp, 2. teacherapp
		swal.fire({
			title: "Directory Name",
			text: "",
			input: 'text',
			showCancelButton: true        
		}).then((result) => {
			if (result.value) {
				console.log("Result: " + result.value);
				this.directoryname = result.value;
				
				this.galleryService.finddirectorybyname(this.apptype, this.directoryname).subscribe(async data => {
						console.log('---> resources: '+JSON.stringify(data));
						if(Object.keys(data).length > 0){
							swal.fire('Info','Directory having this name already exists.', 'warning');
						}else{
							this.create_s3directory(apptype, this.directoryname);
						}
					},
					error => {},
					() => {}
				);
				//this.create_s3directory(apptype, this.directoryname);
			}else{
				swal.fire('Info','No valid directory name entered.', 'warning');
			}
		});
	}

	create_s3directory(apptype, directoryname){
		this.hideProgressbar = false;
		this.galleryService.creates3directory(directoryname).subscribe(data => {
			console.log('$$$data: '+JSON.stringify(data));
		});
				
		let body = {
			displayname: directoryname,
			s3name: directoryname,
			filetype: 'directory',
			s3path: this.s3path,
			s3directory: directoryname,
			type: 'directory',
			app: apptype
		}
		this.savetodb(body);
		this.hideProgressbar = true;
	}

	filechooser_onchange(event) {
		if(event.target.files.length > 0){
			this.selectedFiles = event.target.files;
			this.displayname = event.target.files[0].name;
			this.filetype = this.displayname.split('.').pop();
			this.s3name = (new Date()).getTime()+'.'+this.filetype;
			console.log('@@@Filename: '+event.target.files[0].name+'    filetype: '+this.filetype);
		}else{
			this.displayname = '';
			this.selectedFiles = null;
		}
	}

	uploadfile_button_click(apptype) {
		this.apptype = apptype;
		this.hideProgressbar = false;
		this.progress.percentage = 0;

		this.currentFileUpload = this.selectedFiles.item(0);
		this.selected_directory = (this.selected_directory == undefined || this.selected_directory == null || this.selected_directory == '') ? '' : this.selected_directory ; 

		this.galleryService.pushFileToStorage(this.currentFileUpload, this.selected_directory, this.s3name).subscribe(event => {
			console.log('$$$event: '+JSON.stringify(event));
			if (event.type === HttpEventType.UploadProgress) {
				this.progress.percentage = Math.round(100 * event.loaded / event.total);
			} else if (event instanceof HttpResponse) {
				this.s3path = event.body['s3path'];
				console.log('File is completely uploaded!->'+this.s3path);
				let body = {
					displayname: this.displayname,
					s3name: this.s3name,
					filetype: this.filetype,
					s3path: this.s3path,
					s3directory: this.selected_directory,
					type: 'file',
					app: this.apptype
				}
				this.savetodb(body);
				this.hideProgressbar = true;
				this.fileInputVariable.nativeElement.value = "";
			}
		});
		//this.selectedFiles = undefined;
	}

	savetodb(body){
		this.hideLoading_indicator = false;
		this.galleryService.uploadToManagersBox(body).subscribe(data => {
				console.log('@@@data saved to db: '+JSON.stringify(data));
				this.getallfilelist();
				this.hideLoading_indicator = true;
				swal.fire('Save', 'Level added '+data['status'], 'success');
				this.resetall();
				this.getdirectorieslist();
			},
			error => {},
			() => {}
		);
	}

	fileresource_on_click(dt){
		console.log('### fileresource_on_click : '+JSON.stringify(dt));
		if(dt.type == 'file'){

		}else if(dt.type == 'directory'){
			this.hide_content1 = true;
			this.hide_content2 = false;
			this.getallfilelist_inside_directory(dt.s3directory);
		}
	}

	back_button_click(){
		this.resources_inside_directory = [];
		this.getallfilelist();
		this.hide_content1 = false;
		this.hide_content2 = true;
	}

	delete_button_click(filedata){
		console.log('### filedata : '+JSON.stringify(filedata));
		swal.fire({
		  title: 'Are you sure?',
		  text: "Do you want to delete this?",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes'
		}).then((result) => {
		  if (result.value) {
			  if(filedata.type == 'file'){
				this.deletes3file(filedata);
			  }else if(filedata.type == 'directory'){
				this.deletes3directory(filedata);
			  }
		  }
		});
	}

	deletes3file(filedata){
		let filename = filedata.s3name;
		let filedirectory = filedata.s3directory;
		this.hideLoading_indicator = false;

		this.galleryService.deleteFromStorage(filedirectory, filename).subscribe(data1 => {
				console.log('@@@s3 data delete: '+JSON.stringify(data1));
			},
			error => {},
			() => {}
		);
		this.deletefile_from_db(filedata);
	}

	deletefile_from_db(filedata){
		this.galleryService.deleteFromManagersBox(filedata._id).subscribe(data2 => {
				console.log('@@@db data delete: '+JSON.stringify(data2));
				this.getallfilelist();
				this.hideLoading_indicator = true;
				swal.fire('Save','File deletion '+data2['status'],'success');
				this.resetall();
			},
			error => {},
			() => {}
		);
	}

	deletes3directory(filedata){
		let filedirectory = filedata.s3directory;
		this.hideLoading_indicator = false;
		console.log('@@@filedirectory to delete: '+filedirectory);
		this.galleryService.deleteDirectoryFromStorage(filedirectory).subscribe(data1 => {
				console.log('@@@s3 folder delete: '+JSON.stringify(data1));
			},
			error => {},
			() => {}
		);
		this.deletedirectory_from_db(filedata);
	}

	deletedirectory_from_db(filedata){
		this.galleryService.deleteDirectoryFromManagersBox(filedata.s3directory).subscribe(data2 => {
				console.log('@@@db data delete: '+JSON.stringify(data2));
				this.resetall();
				this.hideLoading_indicator = true;
				swal.fire('Save','File deletion '+data2['status'],'success');
			},
			error => {},
			() => {
				this.getallfilelist();
				this.getdirectorieslist();
			}
		);
	}

	open(content, param) {
		this.apptype = param;
		this.modalReference = this.modalService.open(content, param);
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
		  return `with: ${reason}`;
		}
	} 

	/*
	gets3directorieslist(selected_tab){
		this.galleryService.gets3directorieslist().subscribe(data => {
				console.log('@@@s3directories_list: '+JSON.stringify(data));
				this.s3directories_list = data;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}

	getAllFromManagersBox(){
		this.galleryService.getAllFromManagersBox().subscribe(data => {
				//console.log('@@@data saved to db: '+JSON.stringify(data));
				this.data = data;
				this.total_file_count_str = "Total Files: "+this.data.length;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}
	*/
}
