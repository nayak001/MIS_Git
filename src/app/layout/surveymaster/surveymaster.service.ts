import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class SurveymasterService {
	constructor(private http: HttpClient) { }

	getallmastermanagersurveys(){				
		return this.http.get(baseUrl+'getallmastermanagersurveys',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
	
	savemastermanagersurvey(body){
		return this.http.post(baseUrl+'savemastermanagersurvey',
		body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
	
	updatemastermanagersurvey(id,body){
		return this.http.put(baseUrl+'updatemastermanagersurvey/'+id,
		body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
	
	deletemastermanagersurvey(id){
		return this.http.delete(baseUrl+'deletemastermanagersurvey/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
}