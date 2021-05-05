import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders  } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { Observable } from 'rxjs';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class HomebaseService {
	constructor(private http: HttpClient) { }

	getallteacherassesment(type,language){
		return this.http.get(baseUrl+'gethomebasedmasterdata/'+type +'/'+ language,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			
		});
	}

	
	createhomebasemasterdata(formData){
		return this.http.post(baseUrl+'savehomebasedmasterdata',
		formData,{
			headers: new HttpHeaders().set('enctype', 'multipart/form-data').set('Accept', 'application/json')
			//,responseType: 'text' 
		});
	}
	updatehomebasedmasterdata(id,body) {
		return this.http.put(baseUrl+'updatehblmasterdata/'+id,
		body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text'
		  });
	}
	
	
	updatetrainingcontentsbyid(id,body){
		return this.http.put(baseUrl+'ppt_updatecontentbyid/'+id,
		body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
	updatetrainingcontents(id,body){
		return this.http.put(baseUrl+'updatetrainingcontentsbyid/'+id,
		body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
	deletecontent(id,body){
		return this.http.put(baseUrl+'delete_homebasecontent/'+id,body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

	//to store files in server
	pushFileToStorage(file: File, s3name): Observable<HttpEvent<{}>> {
		const formdata: FormData = new FormData();
		formdata.append('file', file);
		const req = new HttpRequest('POST', baseUrl+'s3api/upload/'+s3name, formdata, {
			reportProgress: true,
			//responseType: 'text'
		});
		return this.http.request(req);
	}
	









	getmasteractivitiydetails(program, subject, month, week, level){				
		return this.http.get(baseUrl+'getmasteractivitiydetails/'+program+'/'+subject+'/'+month+'/'+week+'/'+level,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
	
	

	
}

export class ValidationService {
	static emailValidator(control) {
		// RFC 2822 compliant regex
		if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
			return null;
		} else {
			return { 'invalidEmailAddress': true };
		}
	}
	static passwordValidator(control) {
		// {6,100}           - Assert password is between 6 and 100 characters
		// (?=.*[0-9])       - Assert a string has at least one number
		if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
			return null;
		} else {
			return { 'invalidPassword': true };
		}
	}
	static checkLimit(min: number, max: number): ValidatorFn {
		return (c: AbstractControl): { [key: string]: boolean } | null => {
			if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
				return { 'range': true };
			}
			return null;
		};
	}
}
