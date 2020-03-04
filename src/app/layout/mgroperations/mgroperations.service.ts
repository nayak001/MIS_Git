import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;


@Injectable({
  providedIn: 'root'
})
export class MgroperationsService {
	constructor(private http: HttpClient) { }

	getallmanager(){				
		return this.http.get(baseUrl+'getallmanager',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
	
	getoperationbyuserid(userid, operation){				
		//return this.http.get(baseUrl+'getcenterimagebyuserid/'+userid,
		return this.http.get(baseUrl+'getall'+operation+'mgrbyuserid/'+userid,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'blob' 
		});			
	}
	
	downloadcenterimage(filename){		
		return this.http.get(baseUrl+'downloadcenterimage/'+filename,
		{
			responseType: 'blob'
			//headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	deletecenterimage(id){				
		return this.http.delete(baseUrl+'deletecenterimage/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json'),
			responseType: 'text' 
		});			
	}	
}