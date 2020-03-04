import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { LeapgeneralinfoService } from './leapgeneralinfo.service';

// ng2-file-uploader components
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-leapgeneralinfo',
  templateUrl: './leapgeneralinfo.component.html',
  styleUrls: ['./leapgeneralinfo.component.scss'],
  animations: [routerTransition()]
})
export class LeapgeneralinfoComponent implements OnInit {

  content_value: string = '';
  save_operation: string = '';
  selected_subject: string = '';
  selected_language: string = '';
  selected_prefLanguage: string = '';
  selected_prefSubject: string = '';

  record_id: string = '';
  workshopDetails = {};

  hideContent_div: boolean;
  addContent_div: boolean;
  backContent_div: boolean;

  public Editor = ClassicEditor;
  constructor(
    private modalService: NgbModal,
    public router: Router,
    private leapgeneralinfoService: LeapgeneralinfoService
  ) {
    this.content_value = '';
    this.selected_subject = '';
    this.selected_language = '';
    this.selected_prefLanguage = 'en';
    this.selected_prefSubject = 'english';
    this.hideContent_div = true;
    this.addContent_div = false;
    this.backContent_div = true;

  }

  ngOnInit() {
    this.load_record();
  }

  prefLanguage_select_onchange(event) {
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    console.log('-->Selected Opt Value= ' + selectedOptionValue + '   Text= ' + selectElementText);
    this.selected_prefLanguage = selectedOptionValue;

    this.load_record();

  }

  prefSubject_select_onchange(event) {
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    console.log('-->Selected Opt Value= ' + selectedOptionValue + '   Text= ' + selectElementText);
    this.selected_prefSubject = selectedOptionValue;

    this.load_record();

  }

  language_select_onchange(event) {
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    console.log('-->Selected Opt Value= ' + selectedOptionValue + '   Text= ' + selectElementText);
    this.selected_language = selectedOptionValue;

  }

  subject_select_onchange(event) {
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    console.log('-->Selected Opt Value= ' + selectedOptionValue + '   Text= ' + selectElementText);
    this.selected_subject = selectedOptionValue;

    this.leapgeneralinfoService.getworkshopdetails(this.selected_prefLanguage, this.selected_prefSubject).subscribe(data => {
      // console.log('### data: ' + JSON.stringify(data));
      for (let i = 0; i < Object.keys(data).length; i++) {
        if (this.selected_subject == data[i]['subject'] && this.selected_language == data[i]['language']) {
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

  }

  async load_record() {

    this.content_value = '';

    this.leapgeneralinfoService.getworkshopdetails(this.selected_prefLanguage, this.selected_prefSubject)
      .subscribe(data => {
        console.log('### data: ' + JSON.stringify(data));
        this.workshopDetails = data;
      },
        error => { },
        () => { }
      );

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
            wtype: 'leap',
            action: 'general_info',
            language: this.selected_language,
            subject: this.selected_subject,
            content: this.content_value,
            // image: this.flashcard_value,

          }
          console.log('### this.save_operation: ' + this.save_operation);
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
    this.leapgeneralinfoService.createworkshopdetails(body).subscribe(data => {
      console.log('###1 save data: ' + JSON.stringify(data));
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
  }

  updateId: string;
  async update(detail) {
    this.hideContent_div = false;
    this.save_operation = "update";
    console.log(detail);
    this.content_value = detail.content;
    this.updateId = detail._id;
    this.selected_subject = detail.subject;
    this.selected_language = detail.language;
    // console.log('update   id ----  ', this.updateId);
  }

  async update_record(body) {
    this.leapgeneralinfoService.updateworkshopdetails(this.updateId, body).subscribe(data => {
      console.log('###1 update data: ' + JSON.stringify(data));
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
    this.hideContent_div = true;
  }

  add_content() {
    this.content_value = '';
    this.selected_subject = '';
    this.selected_language = '';
    this.hideContent_div = false;
    this.addContent_div = true;
    this.backContent_div = false;
    this.save_operation = "save";
  }

  back_content() {
    this.content_value = '';
    this.selected_subject = '';
    this.selected_language = '';
    this.hideContent_div = true;
    this.addContent_div = false;
    this.backContent_div = true;
    this.save_operation = "save";
  }

}
