import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class IndividualUserPageService {
	constructor(
		private http: HttpClient
	) { }
  
	getManagerDetails(id){
		
		return this.http.get(baseUrl + 'indivisualManagerDetails/' + id ,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});	

	}
	getManagers(){
		return this.http.get(baseUrl + 'getAllManagersDetails/',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});	

	}
	
}


