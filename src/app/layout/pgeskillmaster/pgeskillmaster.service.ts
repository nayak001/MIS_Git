import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PgskillmasterService {
	constructor(private http: HttpClient) { }

	getpgeactivityskills(preflanguage, program, subject, clas){
		return this.http.get(baseUrl+'getpgeactivityskill/'+preflanguage+'/'+program+'/'+subject+'/'+clas,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}

	createpgeskill(body){
		return this.http.post(baseUrl+'createpgeskill',
		body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text'
		});
	}

	updatepgeskillmaster(id,body){
		return this.http.put(baseUrl+'updatepgeskillmaster/'+id,
		body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text'
		});
	}

	updatemasterpgeactivitiesbyskillsetid(skillsetid,body){
		return this.http.put(baseUrl+'updatemasterpgeactivitiesbyskillsetid/'+skillsetid,
		body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text'
		});
	}

	deletetpgeskill(id){
		return this.http.delete(baseUrl+'deletetpgeskill/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text'
		});
	}

	deletemasterpgeactivitiesbyskillsetid(skillsetid){
		return this.http.delete(baseUrl+'deletemasterpgeactivitiesbyskillsetid/'+skillsetid,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text'
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
