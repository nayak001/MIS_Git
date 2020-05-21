import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { TzworkshopcontentService } from  './tzworkshopcontent.service';
import { ManagersboxService } from  './../managersbox/managersbox.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
    selector: 'app-tzworkshopcontent',
    templateUrl: './tzworkshopcontent.component.html',
    styleUrls: ['./tzworkshopcontent.component.scss'],
    animations: [routerTransition()]
})
export class TzworkshopcontentComponent implements OnInit {
  public Editor = ClassicEditor;

  selected_preferredlanguage: string = 'en';
  selected_workshopday: string = '1';
  selected_workshoptype: string = 'sr';
  selected_subject: string = 'na';
  selected_action: string = 'gi';
  selected_level: string = 'na';
  selected_levelname: string = 'na';

  record_id: string = '';
  selected_content: string = '';
  days: any= ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50'];
  levels: any = [];
  contents: any = [];

  hide_subject_dropdown: boolean = true;
  hide_level_dropdown: boolean = true;
	hideLoading_indicator: boolean = true;

  modal_button_action: string = 'save';
  closeResult: string;
	modalReference: any;
  
  constructor(
		private modalService: NgbModal,
    public router: Router,
    private tzworkshopcontentService: TzworkshopcontentService,
    private managersboxService: ManagersboxService
	) {
    this.hideLoading_indicator = true;
    this.hide_subject_dropdown = true;
    this.hide_level_dropdown = true;
    this.selected_preferredlanguage = 'en';
    this.selected_workshopday = '1';
    this.selected_workshoptype = 'sr';
    this.selected_subject = 'na';
    this.selected_action = 'gi';
    this.selected_level = 'na';
    this.selected_levelname = 'na';

    this.show_data()
  }

  ngOnInit() {}

  get_ws_levels(wspreflang, wstype, wssubject, wsday){
    console.log('@@@wspreflang: '+wspreflang+'    wstype: '+wstype+'    wssubject: '+wssubject+'    wsday: '+wsday);
    this.hideLoading_indicator = false;
    this.tzworkshopcontentService.getwslevel(wspreflang, wstype, wssubject, wsday).subscribe(data => {
        console.log('@@@data: '+JSON.stringify(data));
        this.levels = (Object.keys(data).length > 0) ? data : [];
        console.log('@@@Level[]: '+JSON.stringify(this.levels));
        this.hideLoading_indicator = true;
      },
      error => {},
      () => {}
    );
  }
  
  preferredlanguage_onchange(event: Event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= '+selectedOptionValue + '   Text= '+selectElementText);
    this.selected_preferredlanguage = selectedOptionValue;
    
    if(this.selected_action == 'ip'){
      this.selected_level = '1';
      this.selected_levelname = 'Level 1';
      this.get_ws_levels(this.selected_preferredlanguage, this.selected_workshoptype, this.selected_subject, this.selected_workshopday);
      this.hide_level_dropdown = false;
    }else{
      this.levels = [];
      this.selected_level = 'na';
      this.selected_levelname = 'na';
      this.hide_level_dropdown = true;
    }
    this.show_data();
  }
  
  workshopday_onchange(event: Event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= '+selectedOptionValue + '   Text= '+selectElementText);
		this.selected_workshopday = selectedOptionValue;

    if(this.selected_action == 'ip'){
      this.selected_level = '1';
      this.selected_levelname = 'Level 1';
      this.get_ws_levels(this.selected_preferredlanguage, this.selected_workshoptype, this.selected_subject, this.selected_workshopday);
      this.hide_level_dropdown = false;
    }else{
      this.levels = [];
      this.selected_level = 'na';
      this.selected_levelname = 'na';
      this.hide_level_dropdown = true;
    }
    this.show_data();
  }
  
  workshoptype_onchange(event: Event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= '+selectedOptionValue + '   Text= '+selectElementText);
    this.selected_workshoptype = selectedOptionValue;
    
    if(this.selected_workshoptype == 'sr'){
      this.hide_subject_dropdown = true;
      this.selected_subject = 'na';
    }else{
      this.hide_subject_dropdown = false;
      this.selected_subject = 'english';
    }

    if(this.selected_action == 'ip'){
      this.selected_level = '1';
      this.selected_levelname = 'Level 1';
      this.get_ws_levels(this.selected_preferredlanguage, this.selected_workshoptype, this.selected_subject, this.selected_workshopday);
      this.hide_level_dropdown = false;
    }else{
      this.levels = [];
      this.selected_level = 'na';
      this.selected_levelname = 'na';
      this.hide_level_dropdown = true;
    }
    this.show_data();
  }
  
  subject_onchange(event: Event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= '+selectedOptionValue + '   Text= '+selectElementText);
		this.selected_subject = selectedOptionValue;

    if(this.selected_action == 'ip'){
      this.selected_level = '1';
      this.selected_levelname = 'Level 1';
      this.get_ws_levels(this.selected_preferredlanguage, this.selected_workshoptype, this.selected_subject, this.selected_workshopday);
      this.hide_level_dropdown = false;
    }else{
      this.levels = [];
      this.selected_level = 'na';
      this.selected_levelname = 'na';
      this.hide_level_dropdown = true;
    }
    this.show_data();
  }
  
  action_onchange(event: Event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= '+selectedOptionValue + '   Text= '+selectElementText);
    this.selected_action = selectedOptionValue;

    if(this.selected_action == 'ip'){
      this.selected_level = '1';
      this.selected_levelname = 'Level 1';
      this.get_ws_levels(this.selected_preferredlanguage, this.selected_workshoptype, this.selected_subject, this.selected_workshopday);
      this.hide_level_dropdown = false;
    }else{
      this.levels = [];
      this.selected_level = 'na';
      this.selected_levelname = 'na';
      this.hide_level_dropdown = true;
    }
    this.show_data();
  }

  level_onchange(event: Event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= '+selectedOptionValue + '   Text= '+selectElementText);
    this.selected_level = selectedOptionValue;
    this.show_data();
  }

  save_operation: string= '';
  worksheet_value: any= [];
  show_data(){
    if(
      this.selected_preferredlanguage == undefined || this.selected_preferredlanguage == null || this.selected_preferredlanguage == '' ||
      this.selected_workshopday == undefined || this.selected_workshopday == null || this.selected_workshopday == '' ||
      this.selected_workshoptype == undefined || this.selected_workshoptype == null || this.selected_workshoptype == '' ||
      this.selected_subject == undefined || this.selected_subject == null || this.selected_subject == '' ||
      this.selected_action == undefined || this.selected_action == null || this.selected_action == '' ||
      this.selected_level == undefined || this.selected_level == null || this.selected_level == '' 
    ){
      return;
    }else{
      this.hideLoading_indicator = false;
      this.tzworkshopcontentService.getwscontent(this.selected_preferredlanguage, this.selected_workshoptype, this.selected_subject, this.selected_action, this.selected_level, this.selected_workshopday).subscribe(data => {
          console.log('@@@Get ws data: '+JSON.stringify(data));
          if(Object.keys(data).length > 0){
            this.save_operation = 'update';
            this.contents = [];
            this.contents.push(data[0]);
            console.log('@@@1: '+JSON.stringify(this.contents));
            this.record_id = data[0]['_id'];
            console.log('@@@2: '+JSON.stringify(this.record_id));
            this.selected_content = data[0]['content'];
            this.worksheet_value = data[0]['worksheet'];
          }else{
            this.save_operation = 'save';
            this.contents = [];
            this.record_id = '';
            this.selected_content = '';
            this.worksheet_value = [];
          }
          console.log('@@@Record_id: '+this.record_id+'    Contents: '+JSON.stringify(this.contents));
          this.hideLoading_indicator = true;
        },
        error => {},
        () => {}
      );
    }
  }

  open(content){
		if(this.record_id == undefined || this.record_id == null || this.record_id == ''){
      this.selected_content = '';
      this.modal_button_action = 'save';
		}else{
      this.modal_button_action = 'update';
    }
    console.log('#### modal_button_action: '+ this.modal_button_action);
    
		this.modalReference = this.modalService.open(content, {backdrop  : 'static',keyboard  : false});
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

  save_button_click(){
    swal.fire({
      title: 'Are you sure?',
      text: "Do you want to save thie changes?",
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        if(this.modal_button_action == 'save'){
          this.add_new_content();
        }else if(this.modal_button_action == 'update'){
          this.update_existing_content();
        }
      }
    });
  }

  add_new_content(){
    let body = {
      language : this.selected_preferredlanguage,
      wtype : this.selected_workshoptype,
      subject : this.selected_subject,
      action: this.selected_action,
      level : this.selected_level,
      worksheet : 'na',
      day : this.selected_workshopday,
      content: this.selected_content
    }
    this.hideLoading_indicator = false;
    this.tzworkshopcontentService.createwscontent(body).subscribe(data => {
        console.log('@@@checking for package: '+JSON.stringify(data));
        swal.fire(
          'Save',
          'Content saved '+data['status'],
          'success'
        );
        this.hideLoading_indicator = true;
        this.modalReference.close();
        this.show_data();
      },
      error => {},
      () => {}
    );
  }

  update_existing_content(){
    let body = {
      language : this.selected_preferredlanguage,
      wtype : this.selected_workshoptype,
      subject : this.selected_subject,
      action: this.selected_action,
      level : this.selected_level,
      worksheet : 'na',
      day : this.selected_workshopday,
      content: this.selected_content
    }
    this.hideLoading_indicator = false;
    this.tzworkshopcontentService.updatewscontent(this.record_id, body).subscribe(data => {
        console.log('@@@checking for package: '+JSON.stringify(data));
        swal.fire(
          'Save',
          'Content saved '+data['status'],
          'success'
        );
        this.hideLoading_indicator = true;
        this.modalReference.close();
        this.show_data();
      },
      error => {},
      () => {}
    );
  }

  delete_button_clicked(){
    if(this.record_id == undefined || this.record_id == null || this.record_id == ''){
      swal.fire(
        'Data insufficient',
        'Nothing to delete!',
        'warning'
      );
    }else{
      swal.fire({
        title: 'Are you sure?',
        text: "Do you want to delete this content?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.delete_content();
        }
      });
    }
  }

  delete_content(){
    this.hideLoading_indicator = false;
    this.tzworkshopcontentService.deletewscontent(this.record_id).subscribe(data => {
        console.log('@@@data: '+JSON.stringify(data));
        swal.fire(
          'Save',
          'Content deletion '+data['status'],
          'success'
        );
        this.hideLoading_indicator = true;
        this.show_data();
      },
      error => {},
      () => {}
    );
  }

  // worksheet pdf file events
  //----------------------------------------------------------------------------------------------------
	selectedFiles: FileList;
	displayname: string;
	filetype: string;
	s3name: string;
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
  
  currentFileUpload: File;
	hideProgressbar: boolean = true;
	progress: { percentage: number } = { percentage: 0 };
  s3path: string = '';
  uploadworksheet_btn_click(){
    if(this.save_operation == 'save'){
      swal.fire('info', 'Please add some content !!!', 'warning');
    }else if(this.save_operation == 'update'){
      if(this.selectedFiles == undefined || this.selectedFiles == null){
        swal.fire('info', 'Please select worksheet file', 'warning');
      }else{this.hideProgressbar = false;
        this.progress.percentage = 0;
  
        this.currentFileUpload = this.selectedFiles.item(0);
        console.log('###selectedFiles: '+JSON.stringify(this.selectedFiles));
        this.managersboxService.pushFileToStorage(this.currentFileUpload, this.s3name).subscribe(event => {
          console.log('$$$event: '+JSON.stringify(event));
          if (event.type === HttpEventType.UploadProgress) {
            this.progress.percentage = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.s3path = event.body['s3path'];
            console.log('File is completely uploaded!->'+this.s3path);
            this.hideProgressbar = true;
  
            let obj = {
              displayname: this.displayname,
              s3name: this.s3name,
              filetype: this.filetype,
              s3path: this.s3path
            }
            this.worksheet_value.push(obj);
  
            const body = {
              worksheet: this.worksheet_value
            }
            this.update_record(this.record_id, body);
            //this.load_record();
          }
        });
      }
    }
  }

  async update_record(id, body) {
    this.tzworkshopcontentService.updatewscontent(id, body).subscribe(data => {
      console.log('###1 update data: ' + JSON.stringify(data));
      swal.fire('Successful', 'Data updated successfully', 'success');
      this.show_data();
    },
      error => { },
      () => { }
    );
  }

  delsheet(i) {
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
        this.worksheet_value.splice(i, 1);

        const body = {
          worksheet: this.worksheet_value
        }
        this.update_record(this.record_id, body);
      }
    });
  }

}
