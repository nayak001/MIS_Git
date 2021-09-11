import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})

export class AnganwadimanagerService {
	constructor(private http: HttpClient) { }

	getallanganwadilist(){				
		return this.http.get(baseUrl+'getallanganwadilist',{headers: new HttpHeaders().set('Content-Type', 'application/json')});			
	}
	
	checkanganwadiexistance(udisecode){				
		return this.http.get(baseUrl+'checkudisecodeexistance/'+udisecode,{headers: new HttpHeaders().set('Content-Type', 'application/json')});			
	}
	
	saveanganwadi(body){
		return this.http.post(baseUrl+'saveanganwadi',body,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}
	
	updateanganwadi(id,body){
		return this.http.put(baseUrl+'updateudisecode/'+id,body,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}
	
	deleteanganwadi(id){
		return this.http.delete(baseUrl+'deleteanganwadi/'+id,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}
}