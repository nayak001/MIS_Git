import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationExtras } from '@angular/router';
import { Mastermanagertraining1Service } from './mastermanagertraining1.service';

@Component({
    selector: 'app-mastermanagertraining1',
    templateUrl: './mastermanagertraining1.component.html',
    styleUrls: ['./mastermanagertraining1.component.scss'],
    animations: [routerTransition()]
})
export class Mastermanagertraining1Component implements OnInit {
	// module
	public allmodules_list : any;
	module_id: string = '';
	moduleid: string = '';
	modulename_tosave: string ='';
	modulename_toupdate: string ='';
	modulename_todelete: string ='';

	// sub-modules
	public allsubmodules_list : any;
	submodule_id: string = '';
	submodule_moduleid: string = '';
	submodule_modulename: string ='';
	submoduleid: string ='';
	submodulename_tosave: string ='';
	submodulename_toupdate: string ='';
	submodulename_todelete: string ='';
	selected_submodule_moduleid: string = '';
	selected_submodule_modulename: string ='';

	public data : any;
	closeResult: string;
	hideLoading_indicator1: boolean;
	hideLoading_indicator2: boolean;
	modalReference: any;

    constructor(
		private modalService: NgbModal,
        public router: Router,
		private mastermanagertraining1Service: Mastermanagertraining1Service
	) {
		this.hideLoading_indicator1 = true;
		this.hideLoading_indicator2 = true;
		
		this.load_allmodules_list();
	}
	
	ngOnInit() {}

	// modules part
	load_allmodules_list(){
		this.hideLoading_indicator1 = false;
		this.mastermanagertraining1Service.getallmanagertrainingmodules().subscribe(data => {
				this.allmodules_list = data;
				this.hideLoading_indicator1 = true;
			},
			error => {},
			() => {}
		);
	}

	savemodule_btnclick(){
		this.modulename_tosave = this.modulename_tosave.toUpperCase().toLowerCase();
		if(this.modulename_tosave == undefined || this.modulename_tosave == null || this.modulename_tosave == ''){
			alert('Module name can not be empty');
		}else{
			this.hideLoading_indicator1 = false;
			this.mastermanagertraining1Service.findmanagertrainingmodulebyname(this.modulename_tosave).subscribe(data => {
					this.hideLoading_indicator1 = true;

					if(Object.keys(data).length > 0){
						alert('Module name already exists.')
					}else{
						let curr_date = new Date();
						let modulebody = {
							moduleid: curr_date.getTime(),
							modulename: this.modulename_tosave
						}
						this.mastermanagertraining1Service.createnewmanagertrainingmodule(modulebody).subscribe(data => {
								this.modalReference.close();
								this.hideLoading_indicator1 = true;
								this.load_allmodules_list();
								this.modulename_tosave ='';
							},
							error => {},
							() => {}
						);
					}
				},
				error => {},
				() => {}
			);
		}
	}

	updatemodule_btnclick(){
		this.modulename_toupdate = this.modulename_toupdate.toUpperCase().toLowerCase();
		if(this.modulename_toupdate == undefined || this.modulename_toupdate == null || this.modulename_toupdate == ''){
			alert('Module name can not be empty');
		}else{
			this.hideLoading_indicator1 = false;
			this.mastermanagertraining1Service.findmanagertrainingmodulebyname(this.modulename_toupdate).subscribe(data => {
					this.hideLoading_indicator1 = true;

					if(Object.keys(data).length > 0){
						alert('Module name already exists.')
					}else{
						let modulebody = {
							moduleid: this.moduleid,
							modulename: this.modulename_toupdate
						}
						this.mastermanagertraining1Service.updatemanagertrainingmodulebyid(this.module_id, modulebody).subscribe(data => {
								this.modalReference.close();
								this.hideLoading_indicator1 = true;
								this.load_allmodules_list();
								this.modulename_toupdate ='';
							},
							error => {},
							() => {}
						);
					}
				},
				error => {},
				() => {}
			);
		}
	}

	deletemodule_btnclick(){
		this.mastermanagertraining1Service.deletemanagertrainingmodulebyid(this.module_id).subscribe(data => {
				// delete sub module records
				this.mastermanagertraining1Service.deletemanagertrainingsubmodulebymoduleid(this.selected_submodule_moduleid).subscribe(data => {
				},error => {},() => {});

				this.modalReference.close();
				this.hideLoading_indicator1 = true;
				this.load_allmodules_list();
				this.load_allsubmodules_list("");
				this.modulename_todelete ='';
			},
			error => {},
			() => {}
		);
	}

	// sub modules part
	onselect_modules_select(event: Event){
    	let selectedOptions = event.target['options'];
		let selectedIndex = selectedOptions.selectedIndex;
		let selectedOptionValue = selectedOptions[selectedIndex].value;
		let selectElementText = selectedOptions[selectedIndex].text;
		this.selected_submodule_moduleid = selectedOptionValue;
		this.selected_submodule_modulename = selectElementText;
		this.load_allsubmodules_list(this.selected_submodule_moduleid);
	}

	load_allsubmodules_list(moduleid){
		if(moduleid != undefined && moduleid != null && moduleid != ''){
			this.hideLoading_indicator2 = false;
			this.mastermanagertraining1Service.getallmanagertrainingsubmodules(moduleid).subscribe(data => {
					this.allsubmodules_list = data;
					this.hideLoading_indicator2 = true;
				},
				error => {},
				() => {}
			);
		}else{
			this.allsubmodules_list = [];
		}
	}

	savesubmodule_btnclick(){
		this.submodulename_tosave = this.submodulename_tosave.toUpperCase().toLowerCase();
		if(this.submodulename_tosave == undefined || this.submodulename_tosave == null || this.submodulename_tosave == ''){
			alert('Sub-module name can not be empty');
		}else{
			this.hideLoading_indicator2 = false;
			this.mastermanagertraining1Service.findmanagertrainingsubmodulebyname(this.selected_submodule_moduleid, this.submodulename_tosave).subscribe(data => {
					this.hideLoading_indicator2 = true;

					if(Object.keys(data).length > 0){
						alert('Sub-module name already exists.')
					}else{
						let curr_date = new Date();
						let submodulebody = {
							moduleid: this.selected_submodule_moduleid,
							modulename: this.selected_submodule_modulename,
							submoduleid: curr_date.getTime(),
							submodulename: this.submodulename_tosave
						}
						this.mastermanagertraining1Service.createnewmanagertrainingsubmodule(submodulebody).subscribe(data => {
								this.modalReference.close();
								this.hideLoading_indicator2 = true;
								this.load_allsubmodules_list(this.selected_submodule_moduleid);
								this.submodulename_tosave ='';
							},
							error => {},
							() => {}
						);
					}
				},
				error => {},
				() => {}
			);
		}
	}

	updatesubmodule_btnclick(){
		this.submodulename_toupdate = this.submodulename_toupdate.toUpperCase().toLowerCase();
		if(this.submodulename_toupdate == undefined || this.submodulename_toupdate == null || this.submodulename_toupdate == ''){
			alert('Sub-module name can not be empty');
		}else{
			this.hideLoading_indicator2 = false;
			this.mastermanagertraining1Service.findmanagertrainingsubmodulebyname(this.selected_submodule_moduleid, this.submodulename_toupdate).subscribe(data => {
					this.hideLoading_indicator2 = true;

					if(Object.keys(data).length > 0){
						alert('Sub-module name already exists.')
					}else{
						let modulebody = {
							moduleid: this.submodule_moduleid,
							modulename: this.submodule_modulename,
							submoduleid: this.submoduleid,
							submodulename: this.submodulename_toupdate
						}
						this.mastermanagertraining1Service.updatemanagertrainingsubmodulebyid(this.submodule_id, modulebody).subscribe(data => {
								this.modalReference.close();
								this.hideLoading_indicator2 = true;
								this.load_allsubmodules_list(this.selected_submodule_moduleid);
								this.submodulename_toupdate ='';
							},
							error => {},
							() => {}
						);
					}
				},
				error => {},
				() => {}
			);
		}
	}

	deletesubmodule_btnclick(){
		this.mastermanagertraining1Service.deletemanagertrainingsubmodulebyid(this.submodule_id).subscribe(data => {
				this.modalReference.close();
				this.hideLoading_indicator2 = true;
				this.load_allsubmodules_list(this.selected_submodule_moduleid);
				this.submodulename_todelete ='';
			},
			error => {},
			() => {}
		);
	}

	go_to_content(submodule){
		const navigationExtras: NavigationExtras = {
			queryParams: {
				paramiters: JSON.stringify(submodule)
			}
		};
		this.router.navigate(['mastermanagertraining2'], navigationExtras);
	}

	// ----------------------------------------------
	open(content,module, flag) {
		if(flag == 'add_module'){
			this.module_id = '';
			this.moduleid= '';
			this.modulename_tosave = '';
		}else if(flag == 'edit_module'){
			this.module_id = module._id;
			this.moduleid= module.moduleid;
			this.modulename_toupdate = module.modulename;
		}else if(flag == 'delete_module'){ 
			this.module_id = module._id;
			this.modulename_todelete = module.modulename;
		}else if(flag == 'add_submodule'){
			if(this.selected_submodule_moduleid == null || this.selected_submodule_moduleid == undefined || this.selected_submodule_moduleid == ''){
				alert('Please select a module first.');
				return;
			}else{
				this.submodule_id = '';
				this.submoduleid = '';
				this.submodulename_tosave = '';
			}
		}else if(flag == 'edit_submodule'){
			this.submodule_id = module._id;
			this.submodule_moduleid = module.moduleid;
			this.submodule_modulename = module.modulename;
			this.submoduleid = module.submoduleid;
			this.submodulename_toupdate = module.submodulename;
		}else if(flag == 'delete_submodule'){ 
			this.submodule_id = module._id;
			this.submodulename_todelete = module.submodulename;
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
