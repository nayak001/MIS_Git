import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class HblmasterService {
	constructor(private http: HttpClient) { }

	// Manager
	getallhblmanagers(){				
		return this.http.get(baseUrl+'getallhblmanagers',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
	
	createnewhblmanager(body){
		return this.http.post(baseUrl+'createnewhblmanager', body,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
	
	updatehblmanager(id,body){
		return this.http.put(baseUrl+'updatehblmanager/'+id, body,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
	
	deletehblmanager(id){
		return this.http.delete(baseUrl+'deletehblmanager/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
	
	// Volunteer
	getallhblvolunteers(){				
		return this.http.get(baseUrl+'getallhblvolunteers',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
	
	createnewhblvolunteer(body){
		return this.http.post(baseUrl+'createnewhblvolunteer', body,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
	
	updatehblvolunteer(id,body){
		return this.http.put(baseUrl+'updatehblvolunteer/'+id, body,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
	
	deletehblvolunteer(id){
		return this.http.delete(baseUrl+'deletehblvolunteer/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

	// School
	getallhblschools(){				
		return this.http.get(baseUrl+'getallhblschools',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	createnewhblschool(body){
		return this.http.post(baseUrl+'createnewhblschool', body,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

	updatehblschool(id,body){
		return this.http.put(baseUrl+'updatehblschool/'+id, body,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

	deletehblschool(id){
		return this.http.delete(baseUrl+'deletehblschool/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

	// Level
	getallhbllevels(){				
		return this.http.get(baseUrl+'getallhbllevels',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	createnewhbllevel(body){
		return this.http.post(baseUrl+'createnewhbllevel', body,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

	updatehbllevel(id,body){
		return this.http.put(baseUrl+'updatehbllevel/'+id, body,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

	deletehbllevel(id){
		return this.http.delete(baseUrl+'deletehbllevel/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

	// Response
	getallhblresponses(){				
		return this.http.get(baseUrl+'getallhblresponses',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	createnewhblresponse(body){
		return this.http.post(baseUrl+'createnewhblresponse', body,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

	updatehblresponse(id,body){
		return this.http.put(baseUrl+'updatehblresponse/'+id, body,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

	deletehblresponse(id){
		return this.http.delete(baseUrl+'deletehblresponse/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

	// Student
	getallhblstudents(){				
		return this.http.get(baseUrl+'getallhblstudents',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	createnewhblstudent(body){
		return this.http.post(baseUrl+'createnewhblstudent', body,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

	updatehblstudent(id,body){
		return this.http.put(baseUrl+'updatehblstudent/'+id, body,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

	deletehblstudent(id){
		return this.http.delete(baseUrl+'deletehblstudent/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

}