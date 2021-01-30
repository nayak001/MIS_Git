import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class AllocatedcentersService {
	constructor(private http: HttpClient) { }

	allocatedcenter_getalldetails(){				
		return this.http.get(baseUrl+'allocatedcenter_getalldetails', { headers: new HttpHeaders().set('Content-Type', 'application/json') });			
	}
}