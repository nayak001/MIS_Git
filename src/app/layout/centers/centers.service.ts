import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CentersService {
	constructor(private http: HttpClient) { }


	getallactiveusertypes(){				
		return this.http.get(baseUrl+'getallactiveusertypes/',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
	
	getalldistrict() {
		return this.http.get(baseUrl+'getalldistrict',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			// responseType: 'text'
		});
	}

	getidbydistrict(district) {
		return this.http.get(baseUrl+'getidbydistrict/' + district,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			// responseType: 'text'
		});
	}

	getallblocksbydistrict(district){
		return this.http.get(baseUrl+'getallblocksbydistrict/' + district,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			// responseType: 'text'
		});
	}

	getallteachers() {
		return this.http.get(baseUrl+'getallteachers',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			// responseType: 'text'
		});
	}

	getallcreatedcenters() {
		return this.http.get(baseUrl+'getallcreatedcenters',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			// responseType: 'text'
		});
	}

	getallcenter() {
		return this.http.get(baseUrl+'getallcenter',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			// responseType: 'text'
		});
	}

	getaddress(pincode) {
		return this.http.get(baseUrl+'getarea/' + pincode,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			// responseType: 'text'
		});
	}

	createnewcenter(center) {
		return this.http.post(baseUrl+'createnewcenter',
		center, {
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			, responseType: 'text'
		});
	}

	updatecenter(id, center) {
		return this.http.put(baseUrl+'updatecenter/' + id,
		center, {
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			, responseType: 'text'
		});
	}

	deletecenter(id) {
		return this.http.delete(baseUrl+'deletecenter/' + id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			, responseType: 'text'
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
	static pinValidator(control) {
		// {6,100}           - Assert password is between 6 and 100 characters
		// (?=.*[0-9])       - Assert a string has at least one number
		if (control.value.match(/^[0-9]{6,6}$/)) {
			return null;
		} else {
			return { 'invalidPin': true };
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
