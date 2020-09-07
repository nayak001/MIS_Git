import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommunityvisitService } from  './communityvisit.service';

@Component({
    selector: 'app-communityvisit',
    templateUrl: './communityvisit.component.html',
    styleUrls: ['./communityvisit.component.scss'],
    animations: [routerTransition()]
})
export class CommunityvisitComponent implements OnInit {
	usersubmitaction: string;
    public data : any;
    submitted = false;
	closeResult: string;
	model: any;
	hideLoading_indicator: boolean;
	modalReference: any;

	add_globalCommunityvisitFormGroup: FormGroup;
	editCommunityvisitFormGroup: FormGroup;

	add_globalmodal_communityvisit_desc: string;
	editmodal_communityvisit_id: string;
	editmodal_communityvisit_desc: string;

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
		private communityvisitService: CommunityvisitService
	) {
		this.add_globalCommunityvisitFormGroup = this.formBuilder.group({
			add_globalmodal_communityvisit_desc: ['', Validators.required]
		});

		this.editCommunityvisitFormGroup = this.formBuilder.group({
			editmodal_communityvisit_desc: ['', Validators.required]
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
		this.getallcommunityvisit();
    this.reset();
	}

	open(content,param) {
		if(param != null || param != undefined){
			this.editmodal_communityvisit_id = param.id;
			this.editmodal_communityvisit_desc = param.community;
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

	getallcommunityvisit(){
		this.hideLoading_indicator = false;
		this.communityvisitService.getallcommunityvisit().subscribe(data => {
				this.data = data;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}
	add_globalFormSubmitAction(){
    let com = this.add_globalmodal_communityvisit_desc;
    let typ = this.selected_type;
    let mod = this.select_mode;
    let opt = this.all_options_arr;

    if(com.length <= 0){alert('Please enter Community visit Desc. !!!')}
    else if(typ.length <= 0){alert('Please enter selection type!!!')}
    else if(typ == 'select' && mod.length <= 0){alert('Please enter Selection mode !!!')}
    else if(typ == 'select' && opt.length <= 0){alert('Please enter Options !!!')}
    else{
      let obj = {
        "id": (new Date).getTime(),
        "community": com,
        "type" : typ,
        "selection_mode" : mod,
        "options" : opt
      };
      this.communityvisitService.createcommunityvisit(obj).subscribe(data => {
        },
        error => {},
        () => {
          this.modalReference.close();
          this.hideLoading_indicator = true;
          this.getallcommunityvisit();
        }
      );
    }
	}
	editFormSubmitAction(id){
		this.submitted = true;
		let obj = {
			//"id": this.editmodal_issue_id,
			"community": this.editmodal_communityvisit_desc
		};
		this.communityvisitService.updatecommunityvisit(id, obj).subscribe(data => {
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {
				this.modalReference.close();
				this.getallcommunityvisit();
        this.reset();
			}
		);
	}
	deleteFormSubmitAction(id){
		this.communityvisitService.deletecommunityvisit(id).subscribe(data => {
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {
				this.modalReference.close();
				this.getallcommunityvisit();
			}
		);
	}

  reset(){
    this.add_globalmodal_communityvisit_desc = '';
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
    this.selected_type = selectedOptionValue;

    if(this.selected_type == 'select') this.isSelectType = true;
    else this.isSelectType = false;
  }

  selectmode_on_change(val){
    this.select_mode = val;
  }

  txt_add_options_change(val){
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
