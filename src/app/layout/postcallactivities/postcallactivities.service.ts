import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PostcallactivitiesService {
  constructor(private http: HttpClient) { }

	getmasterpostcallactivities(preferedlanguage, program){				
		return this.http.get(baseUrl+'getmasterpostcallactivities/'+preferedlanguage+'/'+program,{headers: new HttpHeaders().set('Content-Type', 'application/json')});			
	}
	
	savemasterpostcallactivity(body){
		return this.http.post(baseUrl+'savemasterpostcallactivity',body,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}
	
	updatemasterpostcallactivity(id,body){
		return this.http.put(baseUrl+'updatemasterpostcallactivity/'+id,body,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}
	
	deletemasterpostcallactivity(id){
		return this.http.delete(baseUrl+'deletemasterpostcallactivity/'+id,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}
}
