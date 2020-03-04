import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;


@Injectable({
  providedIn: 'root'
})
export class CenterlocationService {
	constructor(private http: HttpClient) { }

	getallmanager(){				
		return this.http.get(baseUrl+'getallmanager',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
	
	getgeolocationbyuserid(userid){				
		return this.http.get(baseUrl+'getgeolocationbyuserid/'+userid,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
}