import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AssessmentinfoService } from  './assessmentinfo.service';

@Component({
    selector: 'app-assessmentinfo',
    templateUrl: './assessmentinfo.component.html',
    styleUrls: ['./assessmentinfo.component.scss'],
    animations: [routerTransition()]
})
export class AssessmentinfoComponent implements OnInit {
	usersubmitaction: string;
    public data : any;
    submitted = false;
	closeResult: string;
	model: any;
	hideLoading_indicator: boolean;
	modalReference: any;

	add_globalAssessmentinfoFormGroup: FormGroup;
	editAssessmentinfoFormGroup: FormGroup;

	add_globalmodal_assessmentinfo_desc: string;
	editmodal_assessmentinfo_id: string;
	editmodal_assessmentinfo_desc: string;

  all_options_arr: any=[];
  isSelectType: boolean=true;
  selected_type: string='';
  select_mode: string='single';
  optionval: string='';

    constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder,
        private translate: TranslateService,
        public router: Router,
		private assessmentinfoService: AssessmentinfoService
	) {
		this.add_globalAssessmentinfoFormGroup = this.formBuilder.group({
			add_globalmodal_assessmentinfo_desc: ['', Validators.required]
		});

		this.editAssessmentinfoFormGroup = this.formBuilder.group({
			editmodal_assessmentinfo_desc: ['', Validators.required]
		});

		this.hideLoading_indicator = true;
	}

	ngOnInit() {
		/*if (localStorage.getItem('_currentuser_emailid') &&
			localStorage.getItem('_currentuser_password') &&
			localStorage.getItem('_currentuser_type') === 'admin') {
			this.router.navigate(['dashboard']);
		}else{
			this.router.navigate(['/']);
		}
		*/
		this.hideLoading_indicator = false;
		this.getallassessment();
    this.reset();
	}

	open(content,param) {
		console.log('#### param: '+JSON.stringify(param));
		if(param != null || param != undefined){
			this.editmodal_assessmentinfo_id = param.id;
			this.editmodal_assessmentinfo_desc = param.assessment;
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

	getallassessment(){
		this.hideLoading_indicator = false;
		this.assessmentinfoService.getallassessment().subscribe(data => {
				console.log('@@@data: '+JSON.stringify(data));
				this.data = data;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}
	add_globalFormSubmitAction(){
		console.log('--> add_globalFormSubmitAction');
    let ass = this.add_globalmodal_assessmentinfo_desc;
    let typ = this.selected_type;
    let mod = this.select_mode;
    let opt = this.all_options_arr;

    if(ass.length <= 0){alert('Please enter Assessment !!!')}
    else if(typ.length <= 0){alert('Please enter Assessment type!!!')}
    else if(typ == 'select' && mod.length <= 0){alert('Please enter Selection mode !!!')}
    else if(typ == 'select' && opt.length <= 0){alert('Please enter Options !!!')}
    else{
      let obj = {
        "id": (new Date).getTime(),
        "assessment": ass,
        "type" : typ,
        "selection_mode" : mod,
        "options" : opt
      };
      this.assessmentinfoService.createassessment(obj).subscribe(data => {
          console.log('@@@data: '+JSON.stringify(data));
        },
        error => {},
        () => {
          this.modalReference.close();
          this.hideLoading_indicator = true;
          this.getallassessment();
          this.reset();
        }
      );
    }
	}
	editFormSubmitAction(id){
		console.log('### id: '+JSON.stringify(id));
		this.submitted = true;
		let obj = {
			//"id": this.editmodal_issue_id,
			"assessment": this.editmodal_assessmentinfo_desc
		};
		this.assessmentinfoService.updateassessment(id, obj).subscribe(data => {
				console.log('@@@update data: '+JSON.stringify(data));
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {
				this.modalReference.close();
				this.getallassessment();
			}
		);
	}
	deleteFormSubmitAction(id){
		console.log('### id: '+JSON.stringify(id));
		this.assessmentinfoService.deleteassessment(id).subscribe(data => {
				console.log('@@@update data: '+JSON.stringify(data));
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {
				this.modalReference.close();
				this.getallassessment();
			}
		);
	}

  reset(){
    this.add_globalmodal_assessmentinfo_desc = '';
    this.select_mode = 'single';
    this.selected_type = 'select';
    this.optionval = '';
    this.all_options_arr = [];
  }

  type_onchange(event: Event){
    const selectedOptions = event.target['options'];
    const selectedIndex = selectedOptions.selectedIndex;
    const selectedOptionValue = selectedOptions[selectedIndex].value;
    const selectElementText = selectedOptions[selectedIndex].text;
    console.log('-->Selected Opt Value= ' + selectedOptionValue + '   Text= ' + selectElementText);
    this.selected_type = selectedOptionValue;

    if(this.selected_type == 'select') this.isSelectType = true;
    else this.isSelectType = false;
  }

  selectmode_on_change(val){
    //console.log('val: '+val)
    this.select_mode = val;
  }

  txt_add_options_change(val){
    //console.log('val: '+val)
    this.optionval = val;
  }

  add_option_clicked(){
    if(this.optionval.length > 0) this.all_options_arr.push(this.optionval);
    this.optionval = '';
  }

  delete_option_clicked(i){
    this.all_options_arr.splice(i,1);
  }
}
