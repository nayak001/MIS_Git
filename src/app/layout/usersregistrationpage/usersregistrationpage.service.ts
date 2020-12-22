import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UsersregistrationpageService {
	constructor(private http: HttpClient){}

	userreg_getuserbyuserid(userid){				
		return this.http.get(baseUrl+'userreg_getuserbyuserid/'+userid, { headers: new HttpHeaders().set('Content-Type', 'application/json') });			
	}
  
	userreg_getavailablecenters(){				
		return this.http.get(baseUrl+'userreg_getavailablecenters/',{ headers: new HttpHeaders().set('Content-Type', 'application/json') });			
	}

	userreg_getcenterbycenterid(centerid){				
		return this.http.get(baseUrl+'userreg_getcenterbycenterid/'+centerid,{ headers: new HttpHeaders().set('Content-Type', 'application/json') });			
	}
  
	userreg_getmanagers(){				
		return this.http.get(baseUrl+'userreg_getmanagers/',{ headers: new HttpHeaders().set('Content-Type', 'application/json') });			
	}

	userreg_getstates() {
		return this.http.get(baseUrl+'userreg_getstates',{ headers: new HttpHeaders().set('Content-Type', 'application/json') });
	}
	
	userreg_getdistricts(statecode) {
		return this.http.get(baseUrl+'userreg_getdistricts/'+statecode,{ headers: new HttpHeaders().set('Content-Type', 'application/json') });
	}
	
	userreg_createuser(body){
		return this.http.post(baseUrl+'userreg_createuser', body,{ headers: new HttpHeaders().set('Content-Type', 'application/json') });
	}
	
	userreg_updateuser(id, body){
		return this.http.put(baseUrl+'userreg_updateuser/'+id, body, { headers: new HttpHeaders().set('Content-Type', 'application/json') });
	}
	
	userreg_updatecenter(id, body){
		return this.http.put(baseUrl+'userreg_updatecenter/'+id, body, { headers: new HttpHeaders().set('Content-Type', 'application/json') });
	}
	
	userreg_deleteuser(id){
		return this.http.delete(baseUrl+'userreg_deleteuser/'+id, { headers: new HttpHeaders().set('Content-Type', 'application/json') });
	}
}

export class ValidationService {
	static emailValidator(control) {
		if(control.value == undefined || control.value == null) control.value = '';
		// RFC 2822 compliant regex
		if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
			return null;
		} else {
			return { 'invalidEmailAddress': true };
		}
	}
	static passwordValidator(control) {
		if(control.value == undefined || control.value == null) control.value = '';
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
