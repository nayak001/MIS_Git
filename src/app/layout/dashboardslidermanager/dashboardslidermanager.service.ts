import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class DashboardslidermanagerService {
	constructor(private http: HttpClient) { }

	getalldashboardslides(){				
		return this.http.get(baseUrl+'getalldashboardslides',{headers: new HttpHeaders().set('Content-Type', 'application/json')});			
	}
	
	savedashboardslides(body){
		return this.http.post(baseUrl+'savedashboardslides',body,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}
	
	updatedashboardslides(id,body){
		return this.http.put(baseUrl+'updatedashboardslides/'+id,body,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}
	
	deletedashboardslides(id){
		return this.http.delete(baseUrl+'deletedashboardslides/'+id,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}
}