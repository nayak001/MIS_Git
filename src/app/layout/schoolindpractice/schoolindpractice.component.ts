import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { SchoolindpracticeService } from './schoolindpractice.service';
import swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


import { environment } from './../../../environments/environment.prod';
const URL = environment.uploadURL;

// ng2-file-uploader components
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-schoolindpractice',
  templateUrl: './schoolindpractice.component.html',
  styleUrls: ['./schoolindpractice.component.scss'],
  animations: [routerTransition()]
})
export class SchoolindpracticeComponent implements OnInit {

  userModalFormGroup: FormGroup;
  public data: any;
  save_operation: string = '';
  selected_level: string = '';
  selected_language: string = '';
  selected_prefLanguage: string = '';
  selected_prefLevel: string = '';

  workshopDetails = {};
  buttonValid: boolean;

  hideContent_div: boolean;
  addContent_div: boolean;
  backContent_div: boolean;
  listContent_div: boolean;

  content_value: string = '';
  worksheet_value: any = [];

  public Editor = ClassicEditor;

  constructor(
    private modalService: NgbModal,
    public router: Router,
    private schoolindpracticeService: SchoolindpracticeService
  ) {
    this.selected_level = '';
    this.content_value = '';
    this.worksheet_value = [];
    this.selected_language = '';
    this.selected_prefLanguage = 'en';
    this.selected_prefLevel = 'level1';
    this.hideContent_div = true;
    this.addContent_div = false;
    this.backContent_div = true;
    this.listContent_div = true;
  }


  ngOnInit() {
    this.load_record();
  }

  prefLanguage_select_onchange(event) {
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_prefLanguage = selectedOptionValue;

    // this.listContent_div = false;

    // this.load_record();

  }
  prefLevel_select_onchange(event) {
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_prefLevel = selectedOptionValue;

    this.listContent_div = false;

    this.load_record();

  }

  language_select_onchange(event) {
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_language = selectedOptionValue;

  }

  level_select_onchange(event) {
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_level = selectedOptionValue;
    this.buttonValid = true;


    this.schoolindpracticeService.getinvidualdetails(this.selected_prefLanguage, 'null', this.selected_prefLevel).subscribe(data => {
      for (let i = 0; i < Object.keys(data).length; i++) {
        if (this.selected_level == data[i]['level'] && this.selected_language == data[i]['language']) {
          this.buttonValid = false;
          swal.fire({
            title: 'Duplicate Entry',
            text: "Data already exits.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          })
        }
      }
    },
      error => { },
      () => { }
    );

    // this.load_record(this.selected_level);
  }

  async load_record() {

    this.content_value = '';
    this.worksheet_value = [];
    this.hideContent_div = true;

    this.schoolindpracticeService.getinvidualdetails(this.selected_prefLanguage, 'null', this.selected_prefLevel).subscribe(data => {
      this.workshopDetails = data;
    },
      error => { },
      () => { }
    );
  }

  async save_btn_click() {
    if (this.content_value == undefined || this.content_value == null || this.content_value == '' ||
      this.worksheet_value == undefined || this.worksheet_value == null || this.worksheet_value == '' ||
      this.selected_level == undefined || this.selected_level == null || this.selected_level == ''
    ) {
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
            wtype: 'school_readiness',
            level: this.selected_level,
            language: this.selected_language,
            subject: 'null',
            content: this.content_value,
            worksheet: this.worksheet_value
          }
          if (this.save_operation == 'update') {
            this.update_record(body);
          } else {
            this.save_record(body);
          }
        }
      });
    }
  }

  async save_record(body) {
    this.schoolindpracticeService.createinvidualdetails(body).subscribe(data => {
      //alert('Record save status: '+JSON.stringify(data));
      swal.fire(
        'Successful',
        'Data saved successfully',
        'success'
      );

      this.load_record();
    },
      error => { },
      () => { }
    );
    this.addContent_div = false;
    this.backContent_div = true;
  }

  updateId: string;
  async update(detail) {
    this.hideContent_div = false;
    this.addContent_div = true;
    this.backContent_div = false;
    this.save_operation = "update";
    this.content_value = detail.content;
    this.selected_level = detail.level;
    this.worksheet_value = detail.worksheet;
    this.selected_language = detail.language;
    this.updateId = detail._id;
  }

  async update_record(body) {
    this.schoolindpracticeService.updateindividualdetails(this.updateId, body).subscribe(data => {
      //alert('Record update status: '+JSON.stringify(data));
      // this.modalReference.close();
      swal.fire(
        'Successful',
        'Data updated successfully',
        'success'
      );
      this.load_record();
    },
      error => { },
      () => { }
    );
    this.addContent_div = false;
    this.backContent_div = true;
  }

  add_content() {
    this.selected_level = '';
    this.content_value = '';
    this.worksheet_value = '';
    this.selected_language = '';
    this.hideContent_div = false;
    this.addContent_div = true;
    this.backContent_div = false;
    this.listContent_div = true;
    this.save_operation = "save";
  }

  back_content() {
    this.selected_level = '';
    this.worksheet_value = '';
    this.content_value = '';
    this.selected_language = '';
    this.hideContent_div = true;
    this.addContent_div = false;
    this.backContent_div = true;
    this.listContent_div = false;
    this.save_operation = "save";
  }

}
