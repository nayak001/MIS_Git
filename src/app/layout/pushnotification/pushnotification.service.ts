import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PushnotificationService {
	constructor(private http: HttpClient) { }
	
	// get all manager
	getallmanager(){				
		return this.http.get(baseUrl+'getallmanager', {headers: new HttpHeaders().set('Content-Type', 'application/json')});			
	}

	// get all teachers
	getallteachers(){				
		return this.http.get(baseUrl+'getallteachers', {headers: new HttpHeaders().set('Content-Type', 'application/json')});			
	}
  
	// get all available devices
	getallavailabledevices(){				
		return this.http.get(baseUrl+'getallfcmtokenids', {headers: new HttpHeaders().set('Content-Type', 'application/json')});			
	}

	getfcmtokenidbymultipleuserid(body){
		return this.http.post(baseUrl+'getfcmtokenidbymultipleuserid', body,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}
	
	sendpushnotification(body, header){
		return this.http.post('https://fcm.googleapis.com/fcm/send', body,{headers: new HttpHeaders(header)});
	}

	// manager app send notification
	addusernotification(body){
		return this.http.post(baseUrl+'addusernotification', body,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}
	
	getallfcmtokenmessages(){
		return this.http.get(baseUrl+'getallfcmtokenmessages', {headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}

	createnewfcmtokenmessage(body){
		return this.http.post(baseUrl+'createnewfcmtokenmessage', body,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}
	
	deletefcmtokenmessage(id){
		return this.http.delete(baseUrl+'deletefcmtokenmessage/'+id, {headers: new HttpHeaders().set('Content-Type', 'application/json'),responseType: 'text'});
	}
}
