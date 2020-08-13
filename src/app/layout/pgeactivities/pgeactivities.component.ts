import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { PgeactivitiesService } from './pgeactivities.service';
import { ManagersboxService } from  './../managersbox/managersbox.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { environment } from './../../../environments/environment.prod';
const URL = environment.uploadURL;


@Component({
  selector: 'app-pgeactivities',
  templateUrl: './pgeactivities.component.html',
  styleUrls: ['./pgeactivities.component.scss'],
  animations: [routerTransition()]
})
export class PgeactivitiesComponent implements OnInit {
  public Editor = ClassicEditor;

  save_operation: string = '';
  record_id: string = '';
  public data: any;
  selected_preflanguage = '';
  selected_program: string = '';
  selected_subject: string = '';
  selected_month: string = '';
  selected_week: string = '';
  selected_level: string = '';

  level_select_option_list: any = [];
  month_select_option_list: any = [];
  week_select_option_list: any = [];

  segments_list: any = [];
  selected_segment_index: number = -1;
  selected_segment_type: string = '';
  selected_segment_displayname: string = '';
  selected_segment_s3name: string = '';
  selected_segment_filetype: string = '';
  selected_segment_s3_url: string = '';
  selected_segment_preview_url: string = '';
  selected_segment_value: string = '';
  current_segment_details: string = '';

  hideLoading_indicator: boolean;
  hide_createnewsegment_button: boolean = false;

  closeResult: string;
  modalReference: any;

  // xxxxxxxxxxxxxxxxxx image
  flag: string = '';
  txt_modal_url: string = '';
  content_value: string = '';
  image_value: any = [];
  video_value: any = [];




  constructor(
    private modalService: NgbModal,
    public router: Router,
    private pgeactivitiesService: PgeactivitiesService,
    private managersboxService: ManagersboxService
  ) {
    this.selected_program = '';
    this.selected_subject = '';
    this.selected_month = '';
    this.selected_week = '';
    this.selected_level = '';
    this.content_value = '';
    this.video_value = [];

    this.level_select_option_list = [{value: '1', text: 'Level 1'}, {value: '2', text: 'Level 2'}, {value: '3', text: 'Level 3'}, {value: '4', text: 'Level 4'}, {value: '5', text: 'Level 5'}];
    this.month_select_option_list = [{value: '1', text: 'Skill 1-4'}, {value: '2', text: 'Skill 5-8'}, {value: '3', text: 'Skill 9-12'}, {value: '4', text: 'Skill 13-16'}, {value: '5', text: 'Skill 17-20'}];
    
    this.hideLoading_indicator = true;
    this.hide_createnewsegment_button = true;
  }

  ngOnInit() {}

  preflanguage_select_onchange(event) {
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    console.log('-->Selected Opt Value= ' + selectedOptionValue + '   Text= ' + selectElementText);
    this.selected_preflanguage = selectedOptionValue;

    this.load_record(this.selected_preflanguage, this.selected_program, this.selected_subject, this.selected_month, this.selected_week, this.selected_level);
  }

  program_select_onchange(event) {
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    console.log('-->Selected Opt Value= ' + selectedOptionValue + '   Text= ' + selectElementText);
    this.selected_program = selectedOptionValue;
    
    this.selected_subject = '';
    this.selected_month = '';
    this.selected_week = '';
    this.selected_level = '';
    
    this.week_select_option_list = [];
    
    this.load_record(this.selected_preflanguage, this.selected_program, this.selected_subject, this.selected_month, this.selected_week, this.selected_level);
  }

  level_select_onchange(value) {
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    console.log('-->Selected Opt Value= ' + selectedOptionValue + '   Text= ' + selectElementText);
    this.selected_level = selectedOptionValue;
    this.load_record(this.selected_preflanguage, this.selected_program, this.selected_subject, this.selected_month, this.selected_week, this.selected_level);
  }

  subject_select_onchange(value) {
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    console.log('-->Selected Opt Value= ' + selectedOptionValue + '   Text= ' + selectElementText);
    this.selected_subject = selectedOptionValue;
    this.load_record(this.selected_preflanguage, this.selected_program, this.selected_subject, this.selected_month, this.selected_week, this.selected_level);
  }

  month_select_onchange(value) {
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    console.log('-->Selected Opt Value= ' + selectedOptionValue + '   Text= ' + selectElementText);
    this.selected_month = selectedOptionValue;

    this.selected_week = '';
    // get list of skills which will be placed in place of weeks in case of pge. 
    if (this.selected_program == 'pge') {
      this.week_select_option_list = [];
      this.hideLoading_indicator = false;
      let selected_stage = 'month'+this.selected_month;
      this.pgeactivitiesService.gettchassessment(this.selected_preflanguage, this.selected_program, this.selected_level, selected_stage, this.selected_subject).subscribe(data => {
        console.log('### data: ' + JSON.stringify(data));
        Object.keys(data).forEach(ind => {
          let obj = {};
          obj = {
            value: (parseInt(ind)+1),
            text: data[ind]['question']
          }
          this.week_select_option_list.push(obj);
        });
        this.hideLoading_indicator = true;
      },error => { this.hideLoading_indicator = true; },() =>{});
    }
    this.load_record(this.selected_preflanguage, this.selected_program, this.selected_subject, this.selected_month, this.selected_week, this.selected_level);
  }

  week_select_onchange(value) {
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    console.log('-->Selected Opt Value= ' + selectedOptionValue + '   Text= ' + selectElementText);
    this.selected_week = selectedOptionValue;
    this.load_record(this.selected_preflanguage, this.selected_program, this.selected_subject, this.selected_month, this.selected_week, this.selected_level);
  }

  segment_select_onchange(value) {
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    console.log('-->Selected Opt Value= ' + selectedOptionValue + '   Text= ' + selectElementText);
    this.selected_segment_index = selectedOptionValue;
    //this.load_record(this.selected_preflanguage, this.selected_program, this.selected_subject, this.selected_month, this.selected_week, this.selected_level);
    this.load_segment(this.selected_segment_index)
  }

  async load_segment(idx){
    let selected_segment = this.segments_list[idx];
    if(Object.keys(selected_segment).length > 0){
      this.selected_segment_type        = selected_segment.type;
      this.selected_segment_displayname = selected_segment.displayname;
      this.selected_segment_s3name      = selected_segment.s3name;
      this.selected_segment_filetype    = selected_segment.filetype;
      this.selected_segment_s3_url      = selected_segment.s3_url;
      this.selected_segment_preview_url = selected_segment.preview_url;
      this.selected_segment_value       = selected_segment.value;
      if(this.selected_segment_type == 'text_content'){
        this.current_segment_details = this.selected_segment_value;
      }else if(this.selected_segment_type == 'image_content'){
        this.current_segment_details = '<div><img src='+this.selected_segment_s3_url+' style="width: 80%"></div>';
      }
    }else{
      this.selected_segment_type        = '';
      this.selected_segment_displayname = '';
      this.selected_segment_s3name      = '';
      this.selected_segment_filetype    = '';
      this.selected_segment_s3_url      = '';
      this.selected_segment_preview_url = '';
      this.selected_segment_value       = '';
      this.current_segment_details      = '';
    }
  }

  go_btn_click() {
    this.load_record(this.selected_preflanguage, this.selected_program, this.selected_subject, this.selected_month, this.selected_week, this.selected_level);
  }

  async load_record(preflanguage, program, subject, month, week, level) {
    if (
      preflanguage != undefined && preflanguage != null && preflanguage != ''
      && program != undefined && program != null && program != ''
      && subject != undefined && subject != null && subject != ''
      && month != undefined && month != null && month != ''
      && week != undefined && week != null && week != ''
      && level != undefined && level != null && level != ''
    ) {
      this.content_value = '';
      this.video_value = [];
      this.hideLoading_indicator = false;
      
      this.hide_createnewsegment_button = false;

      let preferedlanguage = preflanguage;
      this.pgeactivitiesService.getmasteractivitiydetails(preferedlanguage, program, subject, month, week, level).subscribe(data => {
        console.log('### page load data: ' + JSON.stringify(data));
        if (Object.keys(data).length > 0) {
          this.save_operation = 'update';
          this.record_id = data[0]['_id'];
          this.segments_list = data[0]['segment'];

          this.content_value = data[0]['content'];
          this.image_value = data[0]['image'];
          this.video_value = data[0]['video'];
        } else {
          this.save_operation = 'save';
          this.record_id = '';
          this.segments_list = [];

          this.content_value = '';
          this.image_value = [];
          this.video_value = [];
        }
        this.image_value = (this.image_value == undefined || this.image_value == null) ? [] : this.image_value;
        this.data = data;
        this.hideLoading_indicator = true;
      },
        error => { },
        () => { }
      );
    } else {
      this.content_value = '';
      this.video_value = [];
      this.hideLoading_indicator = true;
      this.hide_createnewsegment_button = true;
    }
  }

  currentFileUpload: File;
	hideProgressbar: boolean = true;
	progress: { percentage: number } = { percentage: 0 };
  s3path: string = '';
  
  async save_btn_click(selected_tab) {
    console.log('### selected_tab: '+selected_tab);
    let body = {};
    if(selected_tab == 'textcontent_tab'){
			if(this.content_value == undefined || this.content_value == null || this.content_value == '') {
				swal.fire('info', 'Please add some content !!!', 'warning');
			} else{
        console.log('### textcontent_tab save_operation: ' + this.save_operation);
        if(this.save_operation == 'save'){
          body = {
            preferedlanguage: this.selected_preflanguage,
            program: this.selected_program,
            subject: this.selected_subject,
            month: this.selected_month,
            week: this.selected_week,
            level: this.selected_level,
            segment:[{
              type: 'text_content',
              displayname: null,
              s3name: null,
              filetype: null,
              s3_url: null,
              preview_url: null,
              value: this.content_value
            }],
            extraresources: []
          }
          this.save_record(body);
        }else{
          let newobj = {
            type: 'text_content',
            displayname: null,
            s3name: null,
            filetype: null,
            s3_url: null,
            preview_url: null,
            value: this.content_value
          }
          this.segments_list.push(newobj);
          body = {
            segment: this.segments_list
          }
          this.update_record(this.record_id, body);
        }
      }
    }else if(selected_tab == 'image_tab'){
      if(this.selectedFiles == undefined || this.selectedFiles == null){
        swal.fire('info', 'Please select image file', 'warning');
      }else{
        this.hideProgressbar = false;
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

            console.log('### image_tab save_operation: ' + this.save_operation);
            if (this.save_operation == 'save') {
              body = {
                preferedlanguage: this.selected_preflanguage,
                program: this.selected_program,
                subject: this.selected_subject,
                month: this.selected_month,
                week: this.selected_week,
                level: this.selected_level,
                segment:[{
                  type: 'image_content',
                  displayname: this.displayname,
                  s3name: this.s3name,
                  filetype: this.filetype,
                  s3_url: this.s3path,
                  preview_url: this.s3path,
                  value: this.s3path
                }],
                extraresources: []
              }
              this.save_record(body);
            } else {
              let newobj = {
                type: 'image_content',
                displayname: this.displayname,
                s3name: this.s3name,
                filetype: this.filetype,
                s3_url: this.s3path,
                preview_url: this.s3path,
                value: this.s3path
              }
              this.segments_list.push(newobj);
              body = {
                segment: this.segments_list
              }
              this.update_record(this.record_id, body);
            }
          }
        });
      }
    }else if(selected_tab == 'video_tab'){
      if(this.selectedFiles == undefined || this.selectedFiles == null){
        swal.fire('info', 'Please select video file', 'warning');
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
  
            console.log('### video_tab save_operation: ' + this.save_operation);
            if (this.save_operation == 'save') {
              body = {
                preferedlanguage: this.selected_preflanguage,
                program: this.selected_program,
                subject: this.selected_subject,
                month: this.selected_month,
                week: this.selected_week,
                level: this.selected_level,
                segment:[{
                  type: 'video_content',
                  displayname: this.displayname,
                  s3name: this.s3name,
                  filetype: this.filetype,
                  s3_url: this.s3path,
                  preview_url: this.s3path,
                  value: this.s3path
                }],
                extraresources: []
              }
              this.save_record(body);
            } else {
              let newobj = {
                type: 'video_content',
                displayname: this.displayname,
                s3name: this.s3name,
                filetype: this.filetype,
                s3_url: this.s3path,
                preview_url: this.s3path,
                value: this.s3path
              }
              this.segments_list.push(newobj);
              body = {
                segment: this.segments_list
              }
              this.update_record(this.record_id, body);
            }
          }
        });
      }
    }
  }

  async save_record(body) {
    this.pgeactivitiesService.createmasteractivities(body).subscribe(data => {
      console.log('###1 save data: ' + JSON.stringify(data));
      swal.fire('Successful', 'Data saved successfully', 'success');
      this.modalReference.close();
      this.load_record(this.selected_preflanguage, this.selected_program, this.selected_subject, this.selected_month, this.selected_week, this.selected_level);
    }, error => {}, () => {});
  }

  async update_record(id, body) {
    this.pgeactivitiesService.updatemasteractivities(id, body).subscribe(data => {
      console.log('###1 update data: ' + JSON.stringify(data));
      swal.fire('Successful', 'Data updated successfully', 'success');
      this.modalReference.close();
      this.load_record(this.selected_preflanguage, this.selected_program, this.selected_subject, this.selected_month, this.selected_week, this.selected_level);
    }, error => {}, () => {}
    );
  }

  delflashcard(i) {
    console.log('-->Index Value= ' + i);
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
        this.image_value.splice(i, 1);

        const body = {
          image: this.image_value
        }
        this.update_record(this.record_id, body);
      }
    });
  }

	// upload button
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

  open(content, param, flag) {
    console.log('###> flag: ' + flag);
    this.flag = flag;
    if (flag == 'view') {
    } else if (flag == 'addworksheet') {
      this.txt_modal_url = '';
    } else if (flag == 'editworksheet') {
      this.txt_modal_url = param;
    } else if (flag == 'addvideo') {
      this.txt_modal_url = '';
    } else if (flag == 'editvideo') {
      this.txt_modal_url = param;
    }

    this.modalReference = this.modalService.open(content, param);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  opencontentsmodal(content) {
    console.log('---> save_operation: ' + this.save_operation);

    this.modalReference = this.modalService.open(content, {size: 'lg', backdrop: 'static'});
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
}
