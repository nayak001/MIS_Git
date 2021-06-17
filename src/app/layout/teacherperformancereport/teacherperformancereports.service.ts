import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class Teacherreportperformanceservice {
	constructor(
		private http: HttpClient
	) { }
  
	getCenterDetails(data){
		return this.http.get(baseUrl+'centerDetails?center_type=' + data.center_type + '&distric=' + data.distric + '&block=' + data.block + '&program_type=' + data.program_type,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});	

	}


	TeacherEducatorDetail(data){
		return this.http.get(baseUrl+'getteacherprofilelist?center_type=' + data.center_type + 
		'&distric=' + data.distric + '&block=' + data.block + "&page_no=" + data.page_no +
		"&limit=" + data.limit + "&download_click=" + data.download_click, 
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});	
	}
	Teacherperformancedetails(data){
		return this.http.get(baseUrl+'teacherperformancedetails?page_no='+ data.page_no +"&limit=" + data.limit + "&download_click=" + data.download_click, 
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});	
	}
	getBlocks(){
		return this.http.get(baseUrl+'disticBlockDetails',
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
