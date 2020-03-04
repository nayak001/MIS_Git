import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UserfeedbackService {
	constructor(private http: HttpClient) { }

	getalluserfeedback() {
		return this.http.get(baseUrl+'getalluserfeedback',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			// responseType: 'text'
		});
	}
	
	deleteuserfeedbackbyid(id) {
		return this.http.delete(baseUrl+'deleteuserfeedbackbyid/' + id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			, responseType: 'text'
		});
	}
}
