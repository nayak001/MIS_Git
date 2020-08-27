import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class TrainingmiscService {
	constructor(private http: HttpClient) { }

	getallpasscode(){				
		return this.http.get(baseUrl+'/getallapasscode',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
	getpasscode(passcode){				
		return this.http.get(baseUrl+'checkpasscode/'+passcode,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
	
	createnewpasscode(body){
		return this.http.post(baseUrl+'savepasscode',
		body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
	
	
}