import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class TzworkshoplevelService {
	constructor(private http: HttpClient) { }

	getwslevel(language, wtype, subject, day){				
		return this.http.get(baseUrl+'getwslevel/'+language+'/'+wtype+'/'+subject+'/'+day,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
	
	createwslevel(body){
		return this.http.post(baseUrl+'createwslevel',
		body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
	
	deletewslevel(id){
		return this.http.delete(baseUrl+'deletewslevel/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
}