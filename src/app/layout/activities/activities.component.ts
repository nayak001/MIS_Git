import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { ActivitiesService } from './activities.service';
import swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


import { environment } from './../../../environments/environment.prod';
const URL = environment.uploadURL;

// ng2-file-uploader components
import { FileUploader } from 'ng2-file-upload';
//const URL = 'http://18.191.206.88:1234/thinkzone/trainingcontentsuploads';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  animations: [routerTransition()]
})
export class ActivitiesComponent implements OnInit {
  flag: string = '';
  imgURL = environment.ImageURL;

  userModalFormGroup: FormGroup;
  public data: any;
  selected_program: string = '';
  selected_subject: string = '';
  selected_month: string = '';
  selected_week: string = '';
  selected_level: string = '';

  save_operation: string = '';
  hideLoading_indicator: boolean;
  hideContent_div: boolean;
  hideSubject_select: boolean;

  record_id: string = '';
  content_value: string = '';
  txt_modal_url: string = '';
  worksheet_value: any = [];
  video_value: any = [];

  public sliders: Array<any> = [];
  closeResult: string;
  modalReference: any;

  // image
  imageURL = this.imgURL;
  uploaded_image_name: string = '';
  uploaded_image_name_arr: any = [];
  flashcard_value: any = [];

  selected_preflanguage = '';
  public Editor = ClassicEditor;

  level_select_option_list: any = [];
  month_select_option_list: any = [];
  week_select_option_list: any = [];

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image',
    maxFileSize: 2 * 1024 * 1024 // 2 MB
  });

  initImageUpload() {
    this.uploader.onAfterAddingFile = (file) => {
      //--------------------renaming the file-------------------------
      let filename = file.file.name;
      let ext = filename.substr(filename.lastIndexOf('.') + 1);
      let newfilename = Date.now() + '.' + ext;
      file.file.name = newfilename;
      this.uploaded_image_name = newfilename;
      //--------------------------------------------------------------
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      this.flashcard_value.push(this.uploaded_image_name);
      console.log('@@@ flashcard_value:', JSON.stringify(this.flashcard_value));
      //console.log('Uploaded File Details:', item);
      //alert('File successfully uploaded!');
      this.save_btn_click();
    };
  }


  constructor(
    private modalService: NgbModal,
    public router: Router,
    private activitiesService: ActivitiesService
  ) {
    this.initImageUpload();

    this.selected_program = '';
    this.selected_subject = '';
    this.selected_month = '';
    this.selected_week = '';
    this.selected_level = '';
    this.content_value = '';
    this.video_value = [];
    this.worksheet_value = [];
    this.hideLoading_indicator = true;
    this.hideContent_div = true;
    this.hideSubject_select = false;
  }

  ngOnInit() { }

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
    if (this.selected_program == 'ece') {
      this.selected_subject = 'na';
      this.hideSubject_select = true;
      this.month_select_option_list = [{value: '1', text: 'Body Parts'}, {value: '2', text: 'Animals, Birds & their Sounds'}, {value: '3', text: 'Flowers, Fruits & Vegetables'}, {value: '4', text: 'House & Accessories'}, {value: '5', text: 'Transportation'}, {value: '6', text: 'Occupation'}, {value: '7', text: 'Service Providing Center'}, {value: '8', text: 'Insects'}, {value: '9', text: 'Environment'}, {value: '10', text: 'Seasons'}];
      this.week_select_option_list = [{value: '1', text: 'Physical'}, {value: '2', text: 'Memory'}, {value: '3', text: 'Social & Emotional'}, {value: '4', text: 'Language'}];
      this.level_select_option_list = [{value: '1', text: 'Level 1'}, {value: '2', text: 'Level 2'}, {value: '3', text: 'Level 3'}];
    } else {
      this.selected_subject = '';
      this.hideSubject_select = false;
      this.month_select_option_list = [{value: '1', text: 'Skill 1-4'}, {value: '2', text: 'Skill 5-8'}, {value: '3', text: 'Skill 9-12'}, {value: '4', text: 'Skill 13-16'}, {value: '5', text: 'Skill 17-20'}];
      this.week_select_option_list = [];
      this.level_select_option_list = [{value: '1', text: 'Level 1'}, {value: '2', text: 'Level 2'}, {value: '3', text: 'Level 3'}, {value: '4', text: 'Level 4'}, {value: '5', text: 'Level 5'}];
    }
    this.selected_month = '';
    this.selected_week = '';
    this.selected_level = '';
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

    // get list of skills which will be placed in place of weeks in case of pge. 
    if (this.selected_program == 'pge') {
      this.hideLoading_indicator = false;
      let selected_stage = 'month'+this.selected_month;
      this.activitiesService.gettchassessment(this.selected_preflanguage, this.selected_program, this.selected_level, selected_stage, this.selected_subject).subscribe(data => {
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

  go_btn_click() {
    this.load_record(this.selected_preflanguage, this.selected_program, this.selected_subject, this.selected_month, this.selected_week, this.selected_level);
  }

  addvideo() {
    console.log('@@@ addvideo()    url: ' + this.txt_modal_url);
    let reg = /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/;
    if (reg.test(this.txt_modal_url)) {
      this.video_value.push(this.txt_modal_url);

      const body = {
        video: this.video_value
      }
      this.update_record(this.record_id, body);
    } else {
      alert('Not a valid URL');
    }
  }

  delvideo(i) {
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
        this.video_value.splice(i, 1);

        const body = {
          video: this.video_value
        }
        this.update_record(this.record_id, body);
      }
    });
		/*if(this.video_value.length > 0) {
			if(confirm('Do you want to delete video from this record?')){
				this.video_value.splice(this.video_value.length-1, 1);
			}
		} else {
			alert('Nothing to delete !!!');
		}
		*/
  }

  addsheet() {
    console.log('@@@ addsheet()');
    let reg = /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/;
    if (reg.test(this.txt_modal_url)) {
      this.worksheet_value.push(this.txt_modal_url);

      const body = {
        worksheet: this.worksheet_value
      }
      this.update_record(this.record_id, body);
    } else {
      alert('Not a valid URL');
    }
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
		/*
		if(this.worksheet_value.length > 0) {
			if(confirm('Do you want to delete worksheet from this record?')){
				this.worksheet_value.splice(this.worksheet_value.length-1, 1);
			}
		} else {
			alert('Nothing to delete !!!');
		}
		*/
  }

  async load_record(preflanguage, program, subject, month, week, level) {
    if (
      preflanguage != undefined && preflanguage != null && preflanguage != ''
      && program != undefined && program != null && program != ''
      && subject != undefined && subject != null && subject != ''
      && month != undefined && month != null && month != ''
      && week != undefined && week != null && week != ''
      && level != undefined && level != null && level != '') {

      this.content_value = '';
      this.video_value = [];
      this.worksheet_value = [];
      this.hideContent_div = true;
      this.hideLoading_indicator = false;
      this.hideSubject_select = (program == 'ece') ? true : false;

      let preferedlanguage = preflanguage;
      this.activitiesService.getmasteractivitiydetails(preferedlanguage, program, subject, month, week, level).subscribe(data => {
        console.log('### data: ' + JSON.stringify(data));
        if (Object.keys(data).length > 0) {
          this.save_operation = 'update';
          this.record_id = data[0]['_id'];
          this.content_value = data[0]['content'];
          this.flashcard_value = data[0]['image'];
          this.worksheet_value = data[0]['worksheet'];
          this.video_value = data[0]['video'];
        } else {
          this.save_operation = 'save';
          this.record_id = '';
          this.content_value = '';
          this.flashcard_value = [];
          this.worksheet_value = [];
          this.video_value = [];
        }
        this.flashcard_value = (this.flashcard_value == undefined || this.flashcard_value == null) ? [] : this.flashcard_value;
        this.data = data;
        this.hideLoading_indicator = true;
        this.hideContent_div = false;
      },
        error => { },
        () => { }
      );
    } else {
      this.content_value = '';
      this.video_value = [];
      this.worksheet_value = [];
      this.hideLoading_indicator = true;
      this.hideContent_div = true;
    }
  }

  async save_btn_click() {
    if (this.content_value == undefined || this.content_value == null || this.content_value == '') {
      //alert('Please add some content !!!');
      swal.fire(
        'Data insufficient',
        'Please add some text contents.',
        'warning'
      );
    } else {
      swal.fire({
        title: 'Are you sure?',
        text: "Do you want to save changes?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          const body = {
            preferedlanguage: this.selected_preflanguage,
            program: this.selected_program,
            subject: this.selected_subject,
            month: this.selected_month,
            week: this.selected_week,
            level: this.selected_level,
            content: this.content_value,
            image: this.flashcard_value,
            worksheet: this.worksheet_value,
            video: this.video_value,
          }
          console.log('### this.save_operation: ' + this.save_operation);
          if (this.save_operation == 'update') {
            this.update_record(this.record_id, body);
          } else {
            this.save_record(body);
          }
        }
      });
    }
  }

  async save_record(body) {
    this.activitiesService.createmasteractivities(body).subscribe(data => {
      console.log('###1 save data: ' + JSON.stringify(data));
      //alert('Record save status: '+JSON.stringify(data));
      swal.fire(
        'Successful',
        'Data saved successfully',
        'success'
      );

      this.load_record(this.selected_preflanguage, this.selected_program, this.selected_subject, this.selected_month, this.selected_week, this.selected_level);
    },
      error => { },
      () => { }
    );
  }

  async update_record(id, body) {
    this.activitiesService.updatemasteractivities(id, body).subscribe(data => {
      console.log('###1 update data: ' + JSON.stringify(data));
      //alert('Record update status: '+JSON.stringify(data));
      this.modalReference.close();
      swal.fire(
        'Successful',
        'Data updated successfully',
        'success'
      );

      this.load_record(this.selected_preflanguage, this.selected_program, this.selected_subject, this.selected_month, this.selected_week, this.selected_level);
    },
      error => { },
      () => { }
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
        this.flashcard_value.splice(i, 1);

        const body = {
          image: this.flashcard_value
        }
        this.update_record(this.record_id, body);
      }
    });
  }

  modal_submit() {
    console.log('### flag: ' + this.flag + '    url: ' + this.txt_modal_url);
    if (this.flag == 'addworksheet') this.addsheet();
    else if (this.flag == 'addvideo') this.addvideo();
  }

  open(content, param, flag) {
    console.log('###> flag: ' + flag);
    this.flag = flag;
    if (flag == 'view') {
      this.sliders = [];
      this.sliders.push({ imagePath: this.imageURL + '' + param, label: '', text: '' });
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
