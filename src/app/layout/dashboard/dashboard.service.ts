import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
	constructor(
		private http: HttpClient
	) { }
  
	getallstudents(){
		return this.http.get( baseUrl+'dboard_getalldashboardcountdata', { headers:new HttpHeaders().set('Content-Type', 'application/json') });
	}

	getdashboarddetails(apiurl){
		console.log('--> calling api: '+(baseUrl+''+apiurl));
		return this.http.get( baseUrl+''+apiurl, { headers:new HttpHeaders().set('Content-Type', 'application/json') });
	}

	// getCenterDetails(){
	// 	return this.http.get(baseUrl+'centerDetails', {
	// 		headers: new HttpHeaders().set('Content-Type', 'application/json')
	// 		//responseType: 'text' 
	// 	});	
	// }

	// 	getBlocks(){
	// 		return this.http.get(baseUrl+'disticBlockDetails', {
	// 			headers: new HttpHeaders().set('Content-Type', 'application/json')
	// 			//responseType: 'text' 
	// 		});	
	// 	}
	// }
}
