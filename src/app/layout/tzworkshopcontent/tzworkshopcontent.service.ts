import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class TzworkshopcontentService {
	constructor(private http: HttpClient) { }

	getwslevel(language, wtype, subject, day){				
		return this.http.get(baseUrl+'getwslevel/'+language+'/'+wtype+'/'+subject+'/'+day,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
	
	getwscontent(language, wtype, subject, action, level, day){				
		return this.http.get(baseUrl+'getwscontent/'+language+'/'+wtype+'/'+subject+'/'+action+'/'+level+'/'+day,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	createwscontent(body){
		return this.http.post(baseUrl+'createwscontent',
		body, {
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
	
	updatewscontent(id, body){
		return this.http.put(baseUrl+'updatewscontent/'+id,
		body, {
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

	deletewscontent(id){
		return this.http.delete(baseUrl+'deletewscontent/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
}