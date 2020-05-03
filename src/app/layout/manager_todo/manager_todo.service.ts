import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class Manager_todoService {
	constructor(private http: HttpClient) { }
	getallmanager(){				
		return this.http.get(baseUrl+'getallmanager',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	getManagerTask(id, date, gtdata){				
		return this.http.post(baseUrl+'getManagerTask', { user_id: id, date: date, gtdata: gtdata },
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	deleteManagerTask(id){
		return this.http.delete(baseUrl+'deleteManagerTask/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
}