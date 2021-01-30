import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class StudentDetailsPageService {
	constructor(
		private http: HttpClient
	) { }
  
	getCenterDetails(){
		return this.http.get(baseUrl+'centerDetails',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});	
	}

	getalStudents(data){
		return this.http.get(baseUrl + 'getalStudents?userType=' + data.userType + 
				'&distric=' + data.distric + '&block=' + data.block + '&program_type=' + data.program_type +
				'&baseline=' + data.baseline + '&sex=' + data.sex  + '&avg_attendance=' + data.avg_attendance+
				'&seventyece=' + data.seventyece + '&enrolldate=' + data.enrolldate,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});	
	}

	getallDetailsStudents(data){
		return this.http.post(baseUrl + 'getallDetailsStudents',data,{headers: new HttpHeaders().set('Content-Type', 'application/json'),});	
	}

	// getallDetailsStudents(data){
	// 	debugger
	// 	return this.http.get(baseUrl + 'getallDetailsStudents?centertype=' + data.centertype + 
	// 	'&distric=' + data.distric + '&block=' + data.block + '&program_type=' + data.program_type +
	// 	 "&baseline=" + data.baseline + "&sex=" + data.sex  + "&avg_attendance=" + data.avg_attendance
	// 	 +"&seventyece=" + data.seventyece + "&enrolldate=" + data.enrolldate +"&page_no=" + data.page_no + 
	// 	 "&limit=" + data.limit + "&downloadclick=" + data.downloadclick,
	// 	{
	// 		headers: new HttpHeaders().set('Content-Type', 'application/json')
	// 		//responseType: 'text' 
	// 	});	
	// }
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
