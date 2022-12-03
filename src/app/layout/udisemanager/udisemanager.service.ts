import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})

export class UdisemanagerService {
	constructor(private http: HttpClient) { }

	getalludisecodes(){				
		return this.http.get(baseUrl+'getalludisecodes',{headers: new HttpHeaders().set('Content-Type', 'application/json')});			
	}
	
	checkudisecodeexistance(udisecode){				
		return this.http.get(baseUrl+'checkudisecodeexistance/'+udisecode,{headers: new HttpHeaders().set('Content-Type', 'application/json')});			
	}
	
	saveudisecode(body){ 
		return this.http.post(baseUrl+'saveudisecode',body,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}
	
	updateudisecode(id,body){
		return this.http.put(baseUrl+'updateudisecode/'+id,body,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}
	
	deleteudisecode(id){
		return this.http.delete(baseUrl+'deleteudisecode/'+id,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}
}