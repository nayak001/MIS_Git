import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SchoolgrouptaskService } from './schoolgrouptask.service';

// ng2-file-uploader components
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-schoolgrouptask',
  templateUrl: './schoolgrouptask.component.html',
  styleUrls: ['./schoolgrouptask.component.scss'],
  animations: [routerTransition()]
})
export class SchoolgrouptaskComponent implements OnInit {

  content_value: string = '';
  save_operation: string = 'save';
  record_id: string = '';
  workshopDetails: any;
  selected_language: string = '';
  selected_prefLanguage: string = '';

  hideContent_div: boolean;
  addContent_div: boolean;
  backContent_div: boolean;

  public Editor = ClassicEditor;
  constructor(
    private modalService: NgbModal,
    public router: Router,
    private schoolgrouptaskService: SchoolgrouptaskService
  ) {
    this.content_value = '';
    this.selected_language = '';
    this.selected_prefLanguage = 'en';
    this.hideContent_div = true;
    this.addContent_div = false;
    this.backContent_div = true;

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

  language_select_onchange(event) {
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    console.log('-->Selected Opt Value= ' + selectedOptionValue + '   Text= ' + selectElementText);
    this.selected_language = selectedOptionValue;

  }

  ngOnInit() {
    this.load_record();
  }

  async load_record() {

    this.schoolgrouptaskService.getworkshopdetails(this.selected_prefLanguage, 'null')
      .subscribe(data => {
        console.log('### data: ' + JSON.stringify(data));
        // this.dataLength = Object.keys(data).length;
        this.workshopDetails = data;
        if (Object.entries(data).length !== 0) {
          this.content_value = data[0]['content'];
          this.selected_language = data[0]['language'];
          this.record_id = data[0]['_id'];
          this.save_operation = 'update';
        } else {
          this.content_value = "No Contents";
          this.save_operation = 'save';
        }
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
            wtype: 'school_readiness',
            action: 'group_task',
            language: this.selected_language,
            subject: 'null',
            content: this.content_value
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
    this.schoolgrouptaskService.createworkshopdetails(body).subscribe(data => {
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

  // updateId: string;
  // async update(detail) {
  //   this.hideContent_div = false;
  //   this.save_operation = "update";
  //   console.log(detail);
  //   this.content_value = detail.content;
  //   this.updateId = detail._id;
  //   // console.log('update   id ----  ', this.updateId);
  // }

  async update_record(body) {
    this.schoolgrouptaskService.updateworkshopdetails(this.record_id, body).subscribe(data => {
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

  // add_content() {
  //   this.content_value = '';
  //   this.hideContent_div = false;
  //   this.addContent_div = true;
  //   this.backContent_div = false;
  //   this.save_operation = "save";
  // }

  // back_content() {
  //   this.content_value = '';
  //   this.hideContent_div = true;
  //   this.addContent_div = false;
  //   this.backContent_div = true;
  //   this.save_operation = "save";
  // }

}
