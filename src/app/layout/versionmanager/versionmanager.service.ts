import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class VersionmanagerService {
	constructor(private http: HttpClient) { }

	getallappversion(){				
		return this.http.get(baseUrl+'getallappversion',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	getappversion(app_package){				
		return this.http.get(baseUrl+'getappversion/'+app_package,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
	
	createnewappversion(body){
		return this.http.post(baseUrl+'createnewappversion',
		body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
	
	updateappversion(id,body){
		return this.http.put(baseUrl+'updateappversion/'+id,
		body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
	
	deleteappversion(id){
		return this.http.delete(baseUrl+'deleteappversion/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
}