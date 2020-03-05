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
  
	getManagerDetails(id, type){
		
		return this.http.get(baseUrl + 'indivisualManagerDetails/' + id + "?userType=" + type,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});	

	}
	
}


