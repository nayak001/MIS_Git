import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class Masterteachertraining1Service {
	constructor(private http: HttpClient) { }

	// modules part
	getalltrainingmodules(){				
		return this.http.get(baseUrl+'getalltrainingmodules/',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	findtrainingmodulebyname(modulename){
		return this.http.get(baseUrl+'findtrainingmodulebyname/'+modulename,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});	
	}
	
	createnewtrainingmodule(modulebody){
		return this.http.post(baseUrl+'createnewtrainingmodule',
		modulebody,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
	
	updatetrainingmodulebyid(id,modulebody){
		return this.http.put(baseUrl+'updatetrainingmodulebyid/'+id,
		modulebody,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
	
	deletetrainingmodulebyid(id){
		return this.http.delete(baseUrl+'deletetrainingmodulebyid/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}

	// sub modules part
	getalltrainingsubmodules(moduleid){				
		return this.http.get(baseUrl+'getalltrainingsubmodules/'+moduleid,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	findtrainingsubmodulebyname(moduleid, submodulename){
		return this.http.get(baseUrl+'findtrainingsubmodulebyname/'+moduleid+'/'+submodulename,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});	
	}
	
	createnewtrainingsubmodule(modulebody){
		return this.http.post(baseUrl+'createnewtrainingsubmodule',
		modulebody,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
	
	updatetrainingsubmodulebyid(id,modulebody){
		return this.http.put(baseUrl+'updatetrainingsubmodulebyid/'+id,
		modulebody,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
	
	deletetrainingsubmodulebyid(id){
		return this.http.delete(baseUrl+'deletetrainingsubmodulebyid/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}

	deletetrainingsubmodulebymoduleid(moduleid){
		return this.http.delete(baseUrl+'deletetrainingsubmodulebymoduleid/'+moduleid,
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
