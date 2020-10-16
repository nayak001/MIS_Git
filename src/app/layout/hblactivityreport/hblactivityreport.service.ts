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

	getallhblmanagers(){				
		return this.http.get(baseUrl+'getallhblmanagers',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
	
	gethblvolunteerbymanagerid(managerid){				
		return this.http.get(baseUrl+'gethblvolunteerbymanagerid/'+managerid,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	getallhblactivitiesandbaselines(managerid, volunteerid, week){				
		return this.http.get(baseUrl+'getallhblactivitiesandbaselines/'+managerid+'/'+volunteerid+'/'+week,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
}