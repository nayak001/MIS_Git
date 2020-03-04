import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CommunityvisitService {
	constructor(private http: HttpClient) { }
	getallcommunityvisit(){				
		return this.http.get(baseUrl+'getallcommunityvisit',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
	
	createcommunityvisit(community){
		return this.http.post(baseUrl+'createcommunityvisit',
		community,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
	
	updatecommunityvisit(id,community){
		return this.http.put(baseUrl+'updatecommunityvisit/'+id,
		community,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
	
	deletecommunityvisit(id){
		return this.http.delete(baseUrl+'deletecommunityvisit/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
}