import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})

export class Mastermanagertraining2Service {
	constructor(private http: HttpClient) { }
	
	//------------------------------
	managertrainingcontentsuploads(formData){
		return this.http.post(baseUrl+'managertrainingcontentsuploads',
		formData,{
			headers: new HttpHeaders().set('enctype', 'multipart/form-data').set('Accept', 'application/json')
			//,responseType: 'text' 
		});
	}
	//-------------------------------

	getallmanagertrainingcontents(moduleid, submoduleid){				
		return this.http.get(baseUrl+'getallmanagertrainingcontents/'+moduleid+'/'+submoduleid,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	createnewmanagertrainingcontents(body){
		return this.http.post(baseUrl+'createnewmanagertrainingcontents',
		body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

	updatemanagertrainingcontentsbyid(id,body){
		return this.http.put(baseUrl+'updatemanagertrainingcontentsbyid/'+id,
		body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
}
