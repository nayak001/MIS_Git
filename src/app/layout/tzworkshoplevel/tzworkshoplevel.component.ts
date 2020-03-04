import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { TzworkshoplevelService } from  './tzworkshoplevel.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-tzworkshoplevel',
    templateUrl: './tzworkshoplevel.component.html',
    styleUrls: ['./tzworkshoplevel.component.scss'],
    animations: [routerTransition()]
})
export class TzworkshoplevelComponent implements OnInit {
  selected_preferredlanguage: string = 'en';
  selected_workshopday: string = '1';
  selected_workshoptype: string = 'sr';
  selected_subject: string = 'na';
  selected_level: string = '';
  selected_levelname: string = '';
  next_level: string = '';
  next_levelname: string = '';

  record_id: string = '';
  days: any= ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50'];
  levels: any = [];

  hide_subject_dropdown: boolean = true;
	hideLoading_indicator: boolean = true;

  constructor(
		private modalService: NgbModal,
    public router: Router,
		private tzworkshoplevelService: TzworkshoplevelService
	) {
    this.hideLoading_indicator = true;
    this.hide_subject_dropdown = true;
    this.selected_preferredlanguage = 'en';
    this.selected_workshopday = '1';
    this.selected_workshoptype = 'sr';
    this.selected_subject = 'na';
    this.show_data()
  }

  ngOnInit() {}
  
  preferredlanguage_onchange(event: Event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= '+selectedOptionValue + '   Text= '+selectElementText);
    this.selected_preferredlanguage = selectedOptionValue;
    this.show_data();
  }
  
  workshopday_onchange(event: Event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= '+selectedOptionValue + '   Text= '+selectElementText);
		this.selected_workshopday = selectedOptionValue;
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
    this.show_data();
  }
  
  subject_onchange(event: Event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= '+selectedOptionValue + '   Text= '+selectElementText);
		this.selected_subject = selectedOptionValue;
    this.show_data();
  }
  
  show_data(){
    if(
      this.selected_preferredlanguage == undefined || this.selected_preferredlanguage == null || this.selected_preferredlanguage == '' ||
      this.selected_workshopday == undefined || this.selected_workshopday == null || this.selected_workshopday == '' ||
      this.selected_workshoptype == undefined || this.selected_workshoptype == null || this.selected_workshoptype == '' ||
      this.selected_subject == undefined || this.selected_subject == null || this.selected_subject == ''
    ){
      return;
    }else{
      this.hideLoading_indicator = false;
      this.tzworkshoplevelService.getwslevel(this.selected_preferredlanguage, this.selected_workshoptype, this.selected_subject, this.selected_workshopday).subscribe(data => {
          console.log('@@@data: '+JSON.stringify(data));
          if(Object.keys(data).length > 0){
            this.levels = data;
            this.record_id = this.levels[this.levels.length-1]['_id'];
            this.selected_level = this.levels[this.levels.length-1]['level'];
            this.selected_levelname = this.levels[this.levels.length-1]['levelname'];
          }else{
            this.levels = [];
            this.record_id = '';
            this.selected_level = '0';
            this.selected_levelname = 'Level 0';
          }
          this.next_level = ''+(parseInt(this.selected_level)+1)
          this.next_levelname = 'Level '+this.next_level;
          console.log('@@@record_id: '+this.record_id+'    level: '+this.selected_level+'    levelname: '+this.selected_levelname+'    next level: '+this.next_level+'    next level name: '+this.next_levelname);
          this.hideLoading_indicator = true;
        },
        error => {},
        () => {}
      );
    }
  }

  add_level(){
    swal.fire({
      title: 'Are you sure?',
      text: "Do you want to add "+this.next_levelname+" ?",
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.add_new_level();
      }
    });
  }

  add_new_level(){
    let body = {
      language : this.selected_preferredlanguage,
      subject : this.selected_subject,
      level : this.next_level,
      levelname : this.next_levelname,
      wtype : this.selected_workshoptype,
      day : this.selected_workshopday,
    }
    this.hideLoading_indicator = false;
    this.tzworkshoplevelService.createwslevel(body).subscribe(data => {
        console.log('@@@checking for package: '+JSON.stringify(data));
        swal.fire(
          'Save',
          'Level added '+data['status'],
          'success'
        );
        this.hideLoading_indicator = true;
        this.show_data();
      },
      error => {},
      () => {}
    );
  }

  delete_level(){
    if(this.record_id == undefined || this.record_id == null || this.record_id == ''){
      swal.fire(
        'Data insufficient',
        'Nothing to delete!',
        'warning'
      );
    }else{
      swal.fire({
        title: 'Are you sure?',
        text: "Do you want to delete "+this.selected_levelname+" ?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.delete_last_level();
        }
      });
    }
  }

  delete_last_level(){
    this.hideLoading_indicator = false;
    this.tzworkshoplevelService.deletewslevel(this.record_id).subscribe(data => {
        console.log('@@@data: '+JSON.stringify(data));
        swal.fire(
          'Save',
          'Level deletion '+data['status'],
          'success'
        );
        this.hideLoading_indicator = true;
        this.show_data();
      },
      error => {},
      () => {}
    );
  }
}
