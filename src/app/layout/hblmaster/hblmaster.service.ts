import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class HblmasterService {
	constructor(private http: HttpClient) { }
	getallcenterfeedback(){				
		return this.http.get(baseUrl+'getallcenterfeedback',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
	
	createcenterfeedback(feedback){
		return this.http.post(baseUrl+'createcenterfeedback',
		feedback,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
	
	updatecenterfeedback(id,feedback){
		return this.http.put(baseUrl+'updatecenterfeedback/'+id,
		feedback,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
	
	deletecenterfeedback(id){
		return this.http.delete(baseUrl+'deletecenterfeedback/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
}