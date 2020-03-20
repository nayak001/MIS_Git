import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router, NavigationExtras } from '@angular/router';
import { UsersService } from './users.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    animations: [routerTransition()]
})

export class UsersComponent implements OnInit {
	public data : any;
	public filterData : any;
	hideLoading_indicator: boolean;
	modalReference: any;
	closeResult: string;

    constructor(public router: Router, private usersService: UsersService) {
		this.hideLoading_indicator = true;
		this.getallUsers();
	}
	
	ngOnInit() {}

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

	// get all users
	getallUsers() {
		this.hideLoading_indicator = false;
		this.usersService.getalluser().subscribe(data => {
				console.log('### data: '+JSON.stringify(data));
				this.data = data;
				this.filterData = data;
				this.hideLoading_indicator = true;
			},
			error => {},
			() => {}
		);
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

	// delete user
	deleteFormSubmitAction(id) {
		console.log('### id: ' + id);
		this.usersService.deleteuser(id).subscribe(data => {
				console.log('### res data: ' + JSON.stringify(data));
				this.modalReference.close();
				location.reload();
			},
			error => {console.log('###2 error: ' + JSON.stringify(error)); },
			() => {}
		);
	}
}
