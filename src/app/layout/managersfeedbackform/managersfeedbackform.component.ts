import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { ManagersfeedbackformService } from  './managersfeedbackform.service';

@Component({
    selector: 'app-users',
    templateUrl: './managersfeedbackform.component.html',
    styleUrls: ['./managersfeedbackform.component.scss'],
    animations: [routerTransition()]
})
export class ManagersfeedbackformComponent implements OnInit {
  data : any;
  submitted = false;
	closeResult: string;
	hideLoading_indicator: boolean;
	modalReference: any;

	add_FormGroup: FormGroup;
	edit_FormGroup: FormGroup;

	add_globalmodal_issue_desc: string;
	editmodal_issue_id: string;
	editmodal_issue_desc: string;

  all_options_arr: any=[];
  isSelectType: boolean=true;
  selected_usertype: string='';
  selected_type: string='';
  select_mode: string='single';
  optionval: string='';

  selected_filter_usertype: string = '';

    constructor(
		    private modalService: NgbModal,
		    private formBuilder: FormBuilder,
        public router: Router,
		    private managersfeedbackformService: ManagersfeedbackformService
	) {
		this.add_FormGroup = this.formBuilder.group({
			add_globalmodal_issue_desc: ['', Validators.required]
		});

		this.edit_FormGroup = this.formBuilder.group({
			editmodal_issue_desc: ['', Validators.required]
    });
    
    this.reset();
		this.hideLoading_indicator = false;
		this.getallmanagersfeedbacks(this.selected_filter_usertype);
	}

  ngOnInit() {}

  reset(){
    this.add_globalmodal_issue_desc = '';
    this.select_mode = 'single';
    this.selected_type = 'select';
    this.selected_usertype = 'anganwadi';
    this.selected_filter_usertype = 'anganwadi';
    this.optionval = '';
    this.all_options_arr = [];
  }
  
	getallmanagersfeedbacks(filter_usertype){
		this.hideLoading_indicator = false;
		this.managersfeedbackformService.getallmanagersfeedbacks(filter_usertype).subscribe(data => {
				this.data = data;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}

	add_FormSubmit(){
    let usr = this.selected_usertype;
    let fed = this.add_globalmodal_issue_desc;
    let typ = this.selected_type;
    let mod = this.select_mode;
    let opt = this.all_options_arr;

    if(fed.length <= 0){alert('Please enter feedback. !!!')}
    else if(typ.length <= 0){alert('Please select type!!!')}
    else if(typ == 'select' && mod.length <= 0){alert('Please enter selection mode !!!')}
    else if(typ == 'select' && opt.length <= 0){alert('Please enter options !!!')}
    else{
      let obj = {
        "usertype": usr,
        "feedback": fed,
        "type" : typ,
        "selection_mode" : mod,
        "options" : opt
      };
      this.managersfeedbackformService.createmanagersfeedbacks(obj).subscribe(data => {
        },
        error => {},
        () => {
          this.modalReference.close();
          this.hideLoading_indicator = true;
          this.getallmanagersfeedbacks(this.selected_filter_usertype);
          this.reset();
        }
      );
    }
  }
  
	edit_FormSubmit(id){
		this.submitted = true;
		let obj = {
			"feedback": this.editmodal_issue_desc
		};
		this.managersfeedbackformService.updatemanagersfeedbacks(id, obj).subscribe(data => {
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {
				this.modalReference.close();
				this.getallmanagersfeedbacks(this.selected_filter_usertype);
			}
		);
  }
  
	delete_FormSubmit(id){
		this.managersfeedbackformService.deletemanagersfeedbacks(id).subscribe(data => {
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {
				this.modalReference.close();
				this.getallmanagersfeedbacks(this.selected_filter_usertype);
			}
		);
	}

  type_onchange(event: Event){
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_type = selectedOptionValue;

    if(this.selected_type == 'select') this.isSelectType = true;
    else this.isSelectType = false;
  }

  usertype_onchange(event: Event){
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_usertype = selectedOptionValue;
  }

  filter_usertype_onchange(event: Event){
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    this.selected_filter_usertype = selectedOptionValue;

    this.getallmanagersfeedbacks(this.selected_filter_usertype);
  }

  selectmode_on_change(val){
    this.select_mode = val;
  }

  txt_add_options_change(val){
    this.optionval = val;
  }

  add_option_clicked(){
    if(this.optionval.length > 0) 
      this.all_options_arr.push(this.optionval);
    this.optionval = '';
  }

  delete_option_clicked(i){
    this.all_options_arr.splice(i,1);
  }

	open(content,param) {
		if(param != null || param != undefined){
			this.editmodal_issue_id = param.id;
			this.editmodal_issue_desc = param.feedback;
		}
		this.modalReference = this.modalService.open(content,param);
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
