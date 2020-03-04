import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UsersessionService {
	constructor(private http: HttpClient) { }

	
	getallusers(){				
		return this.http.get(baseUrl+'getalluser/',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	getallusersession() {
		return this.http.get(baseUrl+'getallusersession',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			// responseType: 'text'
		});
	}

	
	getusersessionbyuserid(userid){
		return this.http.get(baseUrl+'getusersessionbyuserid/'+userid,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			// responseType: 'text'
		});
	}

	getusersessionbydate(currentdate){
		return this.http.get(baseUrl+'getusersessionbydate/'+currentdate,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			// responseType: 'text'
		});
	}

	getusersessionbyuseriddate(userid, currentdate){
		return this.http.get(baseUrl+'getusersessionbyuseriddate/'+userid+'/'+currentdate,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			// responseType: 'text'
		});
	}
}
