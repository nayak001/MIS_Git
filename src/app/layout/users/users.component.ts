import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router, NavigationExtras } from '@angular/router';
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

    constructor(public router: Router, private usersService: UsersService) {
		this.hideLoading_indicator = true;
		this.getallUsers();
		//this.getalluserCount()
	}
	
	ngOnInit() {}

	// get all users
	getallUsers() {
		this.hideLoading_indicator = false;
		let limit = 10
		
		this.usersService.gettotalusers().subscribe(data => {
		//this.usersService.getalluser(this.page_no, limit).subscribe(data => {
				console.log('### data: '+JSON.stringify(data));
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
			console.log('@@@totalPage= '+JSON.stringify(data));
			this.totalPage = data || 0
		})
	}
	
	getPageNo(event) {
		const page = event.target.text.match(/\d+/)[0]
		this.page_no = page;
		this.getallUsers();
	}

	search(term: string) {
		term = (term == undefined || term == null) ? '' : term;
		if(!term) {
		  this.filterData = this.data;
		} else {
		  this.filterData = this.data.filter(element => 
			element.emailid.toLowerCase().includes(term.trim().toLowerCase())
		  );
		}
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
        this.router.navigate(["/usersregistration"], navigationExtras);
	}

	// delete user
	deleteFormSubmitAction(id) {
		console.log('### id: ' + id);
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
						console.log('### res data: ' + JSON.stringify(data));
						this.getallUsers();
					},
					error => {console.log('###2 error: ' + JSON.stringify(error)); },
					() => {}
				);
			}
		  });
	}
}
