import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ManagersfeedbackformService {
	constructor(private http: HttpClient) { }
	getallmanagersfeedbacks(usertype){				
		return this.http.get(baseUrl+'getallmanagersfeedbacks/'+usertype,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
	
	createmanagersfeedbacks(issue){
		return this.http.post(baseUrl+'createmanagersfeedbacks',
		issue,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
	
	updatemanagersfeedbacks(id,issue){
		return this.http.put(baseUrl+'updatemanagersfeedbacks/'+id,
		issue,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
	
	deletemanagersfeedbacks(id){
		return this.http.delete(baseUrl+'deletemanagersfeedbacks/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
}