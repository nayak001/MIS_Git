import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class SendSMSService {
	constructor(private http: HttpClient) { }
	
	// Contacts
	//--------------------------
	getallcontacts(){				
		return this.http.get(baseUrl+'getallcontacts',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	findcontactbynmber(contactnumber){				
		return this.http.get(baseUrl+'findcontactbynmber/'+contactnumber,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	createnewcontact(body){
		return this.http.post(baseUrl+'createnewcontact',
		body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

	updatecontactbyid(id){
		return this.http.put(baseUrl+'updatecontactbyid/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}
	
	deletecontactbyid(id){
		return this.http.delete(baseUrl+'deletecontactbyid/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}

	//--------------------------

	// SMS
	//--------------------------
	sendSMS(smstonumbers, smsmessage){		
		return this.http.get(baseUrl+'sendsms/'+smstonumbers+'/'+smsmessage,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	getallsms(){		
		return this.http.get(baseUrl+'getallsmsdetails',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}

	saveSMS(body){
		return this.http.post(baseUrl+'savesmsdetails',
		body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

	importContacts(body){
		return this.http.post(baseUrl+'insertbulkcontact',
		body,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//,responseType: 'text' 
		});
	}

}
