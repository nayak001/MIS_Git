import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class AssessmentinfoService {
	constructor(private http: HttpClient) { }
	getallassessment(){				
		return this.http.get(baseUrl+'getallassessment',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
	
	createassessment(assessment){
		return this.http.post(baseUrl+'createassessment',
		assessment,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
	
	updateassessment(id,assessment){
		return this.http.put(baseUrl+'updateassessment/'+id,
		assessment,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
	
	deleteassessment(id){
		return this.http.delete(baseUrl+'deleteassessment/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
}