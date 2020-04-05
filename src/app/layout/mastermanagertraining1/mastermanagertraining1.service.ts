import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})

export class Mastermanagertraining1Service {
	constructor(private http: HttpClient) { }

	// modules part
	getallmanagertrainingmodules(){				
		return this.http.get(baseUrl+'getallmanagertrainingmodules/',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	findmanagertrainingmodulebyname(modulename){
		return this.http.get(baseUrl+'findmanagertrainingmodulebyname/'+modulename,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});	
	}
	
	createnewmanagertrainingmodule(modulebody){
		return this.http.post(baseUrl+'createnewmanagertrainingmodule',
		modulebody,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
	
	updatemanagertrainingmodulebyid(id,modulebody){
		return this.http.put(baseUrl+'updatemanagertrainingmodulebyid/'+id,
		modulebody,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
	
	deletemanagertrainingmodulebyid(id){
		return this.http.delete(baseUrl+'deletemanagertrainingmodulebyid/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}

	// sub modules part
	getallmanagertrainingsubmodules(moduleid){				
		return this.http.get(baseUrl+'getallmanagertrainingsubmodules/'+moduleid,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	findmanagertrainingsubmodulebyname(moduleid, submodulename){
		return this.http.get(baseUrl+'findmanagertrainingsubmodulebyname/'+moduleid+'/'+submodulename,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});	
	}
	
	createnewmanagertrainingsubmodule(modulebody){
		return this.http.post(baseUrl+'createnewmanagertrainingsubmodule',
		modulebody,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
	
	updatemanagertrainingsubmodulebyid(id,modulebody){
		return this.http.put(baseUrl+'updatemanagertrainingsubmodulebyid/'+id,
		modulebody,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
	
	deletemanagertrainingsubmodulebyid(id){
		return this.http.delete(baseUrl+'deletemanagertrainingsubmodulebyid/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}

	deletemanagertrainingsubmodulebymoduleid(moduleid){
		return this.http.delete(baseUrl+'deletemanagertrainingsubmodulebymoduleid/'+moduleid,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}

}
