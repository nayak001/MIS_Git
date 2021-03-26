import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PptreportService {
	constructor(private http: HttpClient) { }

	getallteachers(){				
		return this.http.get(baseUrl+'getallteachers',{headers: new HttpHeaders().set('Content-Type', 'application/json')});			
	}

	ppt_trans_getoveralldata(language){
		return this.http.get(baseUrl+'ppt_trans_getoveralldata/'+language, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}

	ppt_trans_getoveralldatabyuserid(userid, language){				
		return this.http.get(baseUrl+'ppt_trans_getoveralldatabyuserid/'+userid+'/'+language,{headers: new HttpHeaders().set('Content-Type', 'application/json')});			
	}

	// =================================================
	getdistincthbldistricts(){				
		return this.http.get(baseUrl+'getdistincthbldistricts',
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

	gethblreportdatabyschools_csv(schoolsarray){
		return this.http.post(baseUrl+'gethblreportdatabyschools_csv', schoolsarray,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

	gethblreportdatabymanagers_csv(managersarray){
		return this.http.post(baseUrl+'gethblreportdatabymanagers_csv', managersarray,
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