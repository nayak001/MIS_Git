import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PasscodemanagerService {
	constructor(private http: HttpClient) { }

	getallmanager(){
		return this.http.get(baseUrl+'/getallmanager',{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}

	getallpasscode(){
		return this.http.get(baseUrl+'/getallapasscode',{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}

	checkpasscodeexistance(passcode){
		return this.http.get(baseUrl+'checkpasscodeexistance/'+passcode,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}

	checkpasscodeusability(passcode){
		return this.http.get(baseUrl+'checkpasscodeusability/'+passcode,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}

	setprimary(recordid, userid){
		return this.http.put(baseUrl+'setprimary/'+recordid+'/'+userid,{},{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}

	createnewpasscode(body){
		return this.http.post(baseUrl+'savepasscode',body,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}

	updatepasscode(id,body){
		return this.http.put(baseUrl+'updatepasscode/'+id,body,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}

	deletepasscode(id){
		return this.http.delete(baseUrl+'deletepasscode/'+id,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}

	createnewuser(body){
		return this.http.post(baseUrl+'createnewuser', body,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}

	checkemailavailability(emailid){
		return this.http.get(baseUrl+'checkemailavailability/'+emailid,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}
}
