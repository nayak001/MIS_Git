import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class HblactivityreportService {
	constructor(private http: HttpClient) { }

	getdistincthbldistricts(){				
		return this.http.get(baseUrl+'getdistincthbldistricts',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	getdistincthblmanagers(){				
		return this.http.get(baseUrl+'getdistincthblmanagers',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
	getdistincthblschoolsbydistrictsarray(districtsarray){
		return this.http.post(baseUrl+'getdistincthblschoolsbydistrictsarray', districtsarray,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

	gethblreportdatabyschools(schoolsarray){
		return this.http.post(baseUrl+'gethblreportdatabyschools', schoolsarray,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

	gethblreportdatabymanagers(managersarray){
		return this.http.post(baseUrl+'gethblreportdatabymanagers', managersarray,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

	getallhblreportdata(){				
		return this.http.get(baseUrl+'getallhblreportdata',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
}