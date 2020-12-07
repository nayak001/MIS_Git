import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class Masterteachertraining2Service {
	constructor(private http: HttpClient) { }

	getalltrainingtopics(submoduleid,language){
		return this.http.get(baseUrl+'getalltrainingtopics/'+submoduleid +'/'+ language,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			
		});
	}

	getalltrainingmodules(language){				
		return this.http.get(baseUrl+'getalltrainingmodules/' + language,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	getalltrainingsubmodules(moduleid,language){				
		return this.http.get(baseUrl+'getalltrainingsubmodules/'+moduleid +'/'+ language,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	getalltrainingcontents(moduleid, submoduleid,topicid,language){				
		return this.http.get(baseUrl+'getalltrainingcontents/'+moduleid+'/'+submoduleid+'/'+topicid +'/'+ language,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	uploadImage(formData){
		return this.http.post(baseUrl+'trainingcontentsuploads',
		formData,{
			headers: new HttpHeaders().set('enctype', 'multipart/form-data').set('Accept', 'application/json')
			//,responseType: 'text' 
		});
	}
	createnewtrainingcontents(body){
		return this.http.post(baseUrl+'createnewtrainingcontents',
		body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
	updatetchtrainingpercentage(moduleid,submoduleid,topicid) {
		return this.http.put(baseUrl+'updatetopicpercentage/'+moduleid+'/'+submoduleid+'/'+topicid,
		  {
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text'
		  });
	}
	updatetrainingcontentsbyid(id,body){
		return this.http.put(baseUrl+'updatetrainingcontentsbyid/'+id,
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
		return this.http.put(baseUrl+'deletetrainingcontentsbyid/'+id,body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
	









	getmasteractivitiydetails(program, subject, month, week, level){				
		return this.http.get(baseUrl+'getmasteractivitiydetails/'+program+'/'+subject+'/'+month+'/'+week+'/'+level,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
	
	

	getalluser(){				
		return this.http.get(baseUrl+'getalluser',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
	
	createnewuser(user){
		return this.http.post(baseUrl+'createnewuser',
		user,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
	
	updateuser(id,user){
		return this.http.put(baseUrl+'updateuser/'+id,
		user,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
	
	deleteuser(id){
		return this.http.delete(baseUrl+'deleteuser/'+id,
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
