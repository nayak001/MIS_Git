import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { BaselinetestService, ValidationService } from  './baselinetest.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-users',
    templateUrl: './baselinetest.component.html',
    styleUrls: ['./baselinetest.component.scss'],
    animations: [routerTransition()]
})
export class BaselinetestComponent implements OnInit {
	public data : any = [];
	level_list: any = [];
	baseline_list: any = [];
	questionset : any =[];
	
	record_id:string = '';
	id: string = '';
	selected_preflanguage = '';
	selected_program:string ='';
	selected_class: string = '';
	selected_subject:string = '';
	selected_level: string = '';
	question: string ='';

	current_index: number;

	save_operation:string = '';
	hideLoading_indicator: boolean;
	hideContent_div: boolean;
	hideClass_select: boolean;
	hideSubject_select: boolean;

	modalReference: any;
	closeResult: string;
	
    constructor(
        public router: Router,
		private baselinetestService: BaselinetestService,
		private modalService: NgbModal
	) {
		this.selected_program = '';
		this.selected_class = '';
		this.selected_subject = '';
		this.selected_level = '';

		this.question = '';
		
		this.hideLoading_indicator = true;
		this.hideContent_div = true;
		this.hideSubject_select = false;
	}
	
	ngOnInit() {}

	async load_record(preflanguage, program, subject, level){
		if(	
			preflanguage != undefined && preflanguage != null && preflanguage != '' 
			&& program != undefined && program != null && program != ''
		  	//&& clas != undefined && clas != null && clas != ''
		  	&& subject != undefined && subject != null && subject != ''
		  	&& level != undefined && level != null && level != ''){
			let obj = {
				preferedlanguage: preflanguage,
				program: program,
				subject: subject,
				level: level
			}
			this.hideLoading_indicator = false;
			this.hideContent_div = true;
			this.baselinetestService.getbaselinetestquestionset(obj).subscribe(data => {
					console.log('### data: '+JSON.stringify(data));
					this.baseline_list = data;

					if(Object.keys(data).length > 0){
						this.save_operation = 'update';
						this.record_id = data[0]['_id'];
						this.questionset = data[0]['questionset'];
						this.questionset = (this.questionset == null || this.questionset == undefined) ? [] : this.questionset;
					}else{
						this.save_operation = 'save';
						this.questionset = [];
					}
					this.data = data;
					this.hideLoading_indicator = true;
					this.hideContent_div = false;
				},
				error => {},
				() => {}
			);
		} else {
			this.question = '';
			this.hideLoading_indicator = true;
			this.hideContent_div = true;
		}
	}

	preflanguage_select_onchange(event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= '+selectedOptionValue + '   Text= '+selectElementText);
		this.selected_preflanguage = selectedOptionValue;

		this.load_record(this.selected_preflanguage, this.selected_program, this.selected_subject,  this.selected_level);
	}

	program_select_onchange(event){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= '+selectedOptionValue + '   Text= '+selectElementText);
		this.selected_program = selectedOptionValue;

		if(this.selected_program == 'ece'){
			this.selected_subject = 'na';
			this.level_list = ["1","2","3"];

			this.hideClass_select = true;
			this.hideSubject_select = true;
			this.hideContent_div = true;
		}else{
			this.selected_subject = '';
			this.level_list = ["1","2","3","4","5"];
			
			this.hideClass_select = false;
			this.hideSubject_select = false;
			this.hideContent_div = false;
		}
		this.selected_level = '';
		this.load_record(this.selected_preflanguage, this.selected_program, this.selected_subject,  this.selected_level);
	}

	class_select_onchange(value){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= '+selectedOptionValue + '   Text= '+selectElementText);
		this.selected_class = selectedOptionValue;
		this.load_record(this.selected_preflanguage, this.selected_program, this.selected_subject,  this.selected_level);
	}

	subject_select_onchange(value){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= '+selectedOptionValue + '   Text= '+selectElementText);
		this.selected_subject = selectedOptionValue;
		this.load_record(this.selected_preflanguage, this.selected_program, this.selected_subject,  this.selected_level);
	}

	level_select_onchange(value){
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		console.log('-->Selected Opt Value= '+selectedOptionValue + '   Text= '+selectElementText);
		this.selected_level = selectedOptionValue;
		this.load_record(this.selected_preflanguage, this.selected_program, this.selected_subject,  this.selected_level);
	}

	go_btn_click(){
		this.load_record(this.selected_preflanguage, this.selected_program, this.selected_subject,  this.selected_level);
	}

	async save_btn_click(){
		if(this.questionset.length <= 0) {
			//alert('Please add some Questions !!!');
			swal.fire(
				'Data insufficient',
				'Please add some baseline records.',
				'warning'
			);
		} else {
			console.log('### this.save_operation: '+this.save_operation);
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
					if(this.save_operation == 'update'){
						this.update_baseline(this.record_id);
					}else{
						this.save_baseline();
					}
				}
			});
		}
	}
	

	async save_baseline(){
		const body = {
			preferedlanguage: this.selected_preflanguage,
			program: this.selected_program,
			subject: this.selected_subject,
			level : this.selected_level,
			questionset : this.questionset,
		};
		console.log('###data to save: '+JSON.stringify(body));
		this.baselinetestService.createnewbaselinetest(body).subscribe(data => {
				console.log('###1 save data: '+JSON.stringify(data));
				this.modalReference.close();
				swal.fire(
					'Successful',
					'Data saved successfully',
					'success'
				);
				//alert('Record save status: '+JSON.stringify(data['status']));
				this.load_record(this.selected_preflanguage, this.selected_program, this.selected_subject, this.selected_level);
			},
			error => {},
			() => {}
		);
	}

	async update_baseline(record_id){
		const body = {
			preferedlanguage: this.selected_preflanguage,
			program: this.selected_program,
			level : this.selected_level,
			subject: this.selected_subject,
			questionset : this.questionset,
		};
		console.log('###data to save: '+JSON.stringify(body));
		this.baselinetestService.updatebaselinetestquestionset(record_id, body).subscribe(data => {
				console.log('###1 update data: '+JSON.stringify(data));
				this.modalReference.close();
				//alert('Record save status: '+JSON.stringify(data));
				swal.fire(
					'Successful',
					'Data updated successfully',
					'success'
				);
				this.load_record(this.selected_preflanguage, this.selected_program, this.selected_subject, this.selected_level);
			},
			error => {},
			() => {}
		);
	}

	add_record(){
		if(this.question == null || this.question == undefined || this.question.trim() == ''){
			//alert('Please add baseline question !!!')
			swal.fire(
				'Data insufficient',
				'Please add some baseline records.',
				'warning'
			);
		}else{
			let obj = {
				id : new Date().getTime(),
				question : this.question
			}
			console.log('###Question obj: '+JSON.stringify(obj)+'    Question set: '+JSON.stringify(this.questionset));
			this.questionset.push(obj);
			this.modalReference.close();
		}

	}

	async update_record(){
		let obj = this.questionset[this.current_index];
		let newobj = {
			id: obj.id,
			question: this.question
		}
		this.questionset.splice(this.current_index, 1, newobj);
		this.modalReference.close();
	}

	async delete_record(){
		this.questionset.splice(this.current_index, 1);
		this.modalReference.close();
	}

	open(content, flag, i) {
		if(flag == 'add'){
			this.question = '';
		}else if(flag == 'edit'){
			this.current_index = i;
			this.question = this.questionset[this.current_index].question;
		}else if(flag == 'delete'){
			this.current_index = i;
		}
		
		this.modalReference = this.modalService.open(content, {backdrop  : 'static',keyboard  : false});
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
