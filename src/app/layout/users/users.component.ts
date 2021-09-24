import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router, NavigationExtras } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { UsersService } from './users.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    animations: [routerTransition()]
})

export class UsersComponent implements OnInit {
	public data : any;
	page: any = 1;
	totalPage: any= 0;
	page_no: any = 1;
	public filterData : any;
	hideLoading_indicator: boolean;
	modalReference: any;
	closeResult: string;

	userdetail_username: string = '';
	userdetail_userid: string = '';
	userdetail_password: string = '';
	userdetail_usertype: string = '';
	userdetail_gender: string = '';
	userdetail_emailid: string = '';
	userdetail_phone: string = '';
	userdetail_address: string = '';
	userdetail_status: string = '';
	userdetail_centername: string = '';
	userdetail_centerid: string = '';
	userdetail_managername: string = '';
	userdetail_managerid: string = '';
	userdetail_statecode: string = '';
	userdetail_statevalue: string = '';
	userdetail_districtid: string = '';
	userdetail_districtvalue: string = '';
	userdetail_block: string = '';
	userdetail_userimage: string = '';
	userdetail_createdon: string = '';

	selected_searchfilter: string = 'username';

  //-------------
  usertypelist: any = ['admin', 'anganwadi', 'fellow', 'manager', 'school'];
  selected_usertype: any = 'manager';

  constructor(
		private modalService: NgbModal,
		private changeDetectorRef: ChangeDetectorRef,
		public router: Router, private usersService: UsersService
    ) {
      this.selected_usertype = 'manager';
      this.hideLoading_indicator = true;
      this.getallUsers();
      //this.getalluserCount()
	}

	ngOnInit() {}

	// get all users
	getallUsers() {
		this.hideLoading_indicator = false;
		let limit = 10

		this.usersService.gettotalusersbyusertype(this.selected_usertype).subscribe(data => {
		//this.usersService.gettotalusers().subscribe(data => {
				this.data = data;
				this.filterData = data;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
	}

	getalluserCount() {
		this.usersService.getalluserCount().subscribe(data => {
			this.totalPage = data || 0
		})
	}

	getPageNo(event) {
		const page = event.target.text.match(/\d+/)[0]
		this.page_no = page;
		this.getallUsers();
	}

  selected_usertype_onchange(event: Event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectedElementText = selectedOptions[selectedIndex].text;
		this.selected_usertype = selectedOptionValue;
    console.log('--> this.selected_usertype: ',this.selected_usertype);

    this.getallUsers();
  }

	searchfilter_select_onchange(event: Event) {
		const selectedOptions = event.target['options'];
		const selectedIndex = selectedOptions.selectedIndex;
		const selectedOptionValue = selectedOptions[selectedIndex].value;
		const selectElementText = selectedOptions[selectedIndex].text;
		this.selected_searchfilter = selectedOptionValue;
	}

	search(term: string) {
		term = (term == undefined || term == null) ? '' : term;
		if(!term) {
		  this.filterData = this.data;
		} else {
			if(this.selected_searchfilter == 'username') this.searchusername(term);
			else if(this.selected_searchfilter == 'centername') this.searchcentername(term);
		}
	}
	searchusername(term){
		this.filterData = this.data.filter(element =>
		  	element.username.toLowerCase().includes(term.trim().toLowerCase())
		);
	}
	searchcentername(term){
		this.filterData = this.data.filter(function(element){
			if(element.centername != undefined)
				return element.centername.toLowerCase().includes(term.trim().toLowerCase())
		});
	}

	// naviagte to registration page
	navigate_to_registrationpage(users_object){
		let navigationExtras: NavigationExtras;
		if(users_object == null || users_object == undefined || Object.keys(users_object).length <= 0){
			navigationExtras = {
				queryParams: {
					action: "new_user",
					userid: null
				}
			};
		}else{
			navigationExtras = {
				queryParams: {
					action: "edit_user",
					userid: users_object.userid
				}
			};
		}
        //this.router.navigate(["/usersregistration"], navigationExtras);
        this.router.navigate(["/usersregistrationpage"], navigationExtras);
	}

	// delete user
	deleteFormSubmitAction(id) {
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
				this.usersService.deleteuser(id).subscribe(data => {
						this.getallUsers();
					},
					error => { },
					() => {}
				);
			}
		  });
	}

	show_user_details(modal, user){
		this.reset_userdetails();
		this.set_userdetails(user);
		this.changeDetectorRef.detectChanges();
		this.modalReference = this.modalService.open(modal, {backdrop  : 'static',keyboard  : false});
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

	set_userdetails(user){
		this.userdetail_username = (user.username == undefined || user.username == null || user.username.trim() == '') ? 'Not Found' : user.username.trim().toLowerCase();
		this.userdetail_userid = (user.userid == undefined || user.userid == null || user.userid.trim() == '') ? 'Not Found' : user.userid.trim();
		this.userdetail_password = (user.password == undefined || user.password == null || user.password.trim() == '') ? 'Not Found' : user.password;
		this.userdetail_usertype = (user.usertype == undefined || user.usertype == null || user.usertype.trim() == '') ? 'Not Found' : user.usertype.trim().toLowerCase();
		this.userdetail_gender = (user.gender == undefined || user.gender == null || user.gender.trim() == '') ? 'Not Found' : user.gender.trim().toLowerCase();
		this.userdetail_emailid = (user.emailid == undefined || user.emailid == null || user.emailid.trim() == '') ? 'Not Found' : user.emailid.trim();
		this.userdetail_phone = (user.contactnumber == undefined || user.contactnumber == null || user.contactnumber.trim() == '') ? 'Not Found' : user.contactnumber.trim();
		this.userdetail_address = (user.permanentaddress == undefined || user.permanentaddress == null || user.permanentaddress.trim() == '') ? 'Not Found' : user.permanentaddress.trim().toLowerCase();
		this.userdetail_status = (user.status == undefined || user.status == null || user.status.trim() == '') ? 'Not Found' : user.status.trim().toLowerCase();
		this.userdetail_centerid = (user.centerid == undefined || user.centerid == null || user.centerid.trim() == '') ? 'Not Found' : user.centerid.trim();
		this.userdetail_centername = (user.centername == undefined || user.centername == null || user.centername.trim() == '') ? 'Not Found' : user.centername.trim().toLowerCase();
		this.userdetail_managerid = (user.managerid == undefined || user.managerid == null || user.managerid.trim() == '') ? 'Not Found' : user.managerid.trim().toLowerCase();
		this.userdetail_managername = (user.managername == undefined || user.managername == null || user.managername.trim() == '') ? 'Not Found' : user.managername.trim().toLowerCase();
		this.userdetail_statecode = (user.statecode == undefined || user.statecode == null || user.statecode.trim() == '') ? 'Not Found' : user.statecode.trim();
		this.userdetail_statevalue = (user.statevalue == undefined || user.statevalue == null || user.statevalue.trim() == '') ? 'Not Found' : user.statevalue.trim().toLowerCase();
		this.userdetail_districtid = (user.districtid == undefined || user.districtid == null || user.districtid.trim() == '') ? 'Not Found' : user.districtid.trim();
		this.userdetail_districtvalue = (user.districtvalue == undefined || user.districtvalue == null || user.districtvalue.trim() == '') ? 'Not Found' : user.districtvalue.trim().toLowerCase();
		this.userdetail_block = (user.block == undefined || user.block == null || user.block.trim() == '') ? 'Not Found' : user.block.trim().toLowerCase();
		this.userdetail_userimage = (user.image == undefined || user.image == null || user.image.trim() == '') ? 'Not Found' : user.image.trim();
		this.userdetail_createdon = (user.createdon == undefined || user.createdon == null || user.createdon.trim() == '') ? 'Not Found' : user.createdon.trim();
	}

	reset_userdetails(){
		this.userdetail_username = '';
		this.userdetail_userid = '';
		this.userdetail_password = '';
		this.userdetail_usertype = '';
		this.userdetail_gender = '';
		this.userdetail_emailid = '';
		this.userdetail_phone = '';
		this.userdetail_address = '';
		this.userdetail_status = '';
		this.userdetail_centername = '';
		this.userdetail_centerid = '';
		this.userdetail_managername = '';
		this.userdetail_managerid = '';
		this.userdetail_statecode = '';
		this.userdetail_statevalue = '';
		this.userdetail_districtid = '';
		this.userdetail_districtvalue = '';
		this.userdetail_block = '';
		this.userdetail_userimage = '';
		this.userdetail_createdon = '';
	}
}
