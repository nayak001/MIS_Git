import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { SurveymasterService } from  './surveymaster.service';

@Component({
    selector: 'app-surveymaster',
    templateUrl: './surveymaster.component.html',
    styleUrls: ['./surveymaster.component.scss'],
    animations: [routerTransition()]
})
export class SurveymasterComponent implements OnInit {
  // Page Variables
  _id: string = '';
  survey: string = '';
  input_type: string = '';
  select_mode: string = '';
  options: any = [];

  action: string = '';
  txt_optionval: string = '';
  isSelectType: boolean = true;
	hideLoading_indicator: boolean = true;

  // Data
  allMasterSurveys: any = [];

  // Modal
  modalReference: any;
	closeResult: string;

  

  constructor(
		private modalService: NgbModal,
    public router: Router,
		private surveymasterService: SurveymasterService
	) {}

	ngOnInit() {
    this.reset();
		this.hideLoading_indicator = false;
		this.getallmastersurveys();
  }

  reset(){
    this.action = '';
    this.survey = '';
    this.select_mode = 'single';
    this.input_type = 'select';
    this.txt_optionval = '';
    this.options = [];
  }

  async getallmastersurveys(){
    this.hideLoading_indicator = false;
		await this.surveymasterService.getallmastermanagersurveys().subscribe(data => {
				this.allMasterSurveys = data;
				this.hideLoading_indicator = true;
			},error => {},() => {});
  }

  inputtype_onchange(event){
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.input_type = selectedOptionValue;

    if(this.input_type == 'select') this.isSelectType = true;
    else this.isSelectType = false;
  }

  selectmode_on_change(value){
    this.select_mode = value;
  }

  txt_add_options_change(value){
    this.txt_optionval = value;
  }

  add_option_btn_click(){
    if(this.txt_optionval.length > 0) 
      this.options.push(this.txt_optionval);
    this.txt_optionval = '';
  }

  delete_option_clicked(idx){
    this.options.splice(idx,1);
  }

  add_survey_btn_click(){
    // set default
    this.survey = (this.survey == undefined || this.survey == null) ? '' : this.survey;
    this.input_type = (this.input_type == undefined || this.input_type == null) ? '' : this.input_type;
    this.select_mode = (this.select_mode == undefined || this.select_mode == null) ? '' : this.select_mode;
    this.options = (this.options == undefined || this.options == null) ? [] : this.options;

    // validation
    if(this.survey.length <= 0){swal.fire('Info','Please enter survey description.', 'warning')}
    else if(this.input_type.length <= 0){swal.fire('Info','Please select input type.', 'warning')}
    else if(this.input_type == 'select' && this.select_mode.length <= 0){swal.fire('Info','Please select mode.', 'warning')}
    else if(this.input_type == 'select' && this.options.length <= 0){swal.fire('Info','Please enter some option values.', 'warning')}
    else{
    // action
      let obj = {
        survey : this.survey,
        type : this.input_type,
        selection_mode : this.select_mode,
        options : this.options
      };
      if(this.action == 'save') this.save(obj);
      else if(this.action == 'update') this.update(this._id, obj); 
    }
  }

  save(obj){
    this.surveymasterService.savemastermanagersurvey(obj).subscribe(data => {
      },error => {},() => {
        this.hideLoading_indicator = true;
        this.modalReference.close();
        this.reset();
        this.getallmastersurveys();
      }
    );
  }

  update(_id, obj){
    this.surveymasterService.updatemastermanagersurvey(_id, obj).subscribe(data => {
      },error => {},() => {
        this.hideLoading_indicator = true;
        this.modalReference.close();
        this.reset();
        this.getallmastersurveys();
      }
    );
  }

  delete(_id){
    this.hideLoading_indicator = false;
    this.surveymasterService.deletemastermanagersurvey(_id).subscribe(data => {
      },error => {},() => {
        this.hideLoading_indicator = true;
        this.reset();
        this.getallmastersurveys();
      }
    );
  }

  delete_survey_btn_click(surveyObj){
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
        this.action = 'delete';
        this.delete(surveyObj._id);
      }
    });
  }

	open(content,action, obj) {
    this.reset();
		if(action == 'save'){
      this.action = 'save';
		}else if(action == 'update'){
      this.action = 'update';
      this._id = obj._id;
      this.survey = obj.survey;
      this.input_type = obj.type;
      this.select_mode = obj.selection_mode;
      this.options = obj.options;
      this.txt_optionval = '';
      this.isSelectType = (obj.type=='select')?true:false;
		}
		this.modalReference = this.modalService.open(content,obj);
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
