import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PasscodemanagerService {
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
	
	updatepasscode(id,body){
		return this.http.put(baseUrl+'updatepasscode/'+id,
		body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
	
	deletepasscode(id){
		return this.http.delete(baseUrl+'deletepasscode/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
}