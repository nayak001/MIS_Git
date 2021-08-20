import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class offlinetrainingService {
	constructor(private http: HttpClient) { }
	// this
	getallteachers(){
		return this.http.get(baseUrl+'getallteachers',{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			
		});
	}
	saveteachertrainingstatus(body){
		return this.http.post(baseUrl+'saveteachertrainingstatus',
		body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
	saveofflinepptmark(body){
		return this.http.post(baseUrl+'saveofflinepptmark',
		body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
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
	}
}
