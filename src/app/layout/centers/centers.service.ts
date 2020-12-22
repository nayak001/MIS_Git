import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CentersService {
	constructor(private http: HttpClient) { }

	getallcreatedcenters() {
		return this.http.get(baseUrl+'getallcreatedcenters', { headers: new HttpHeaders().set('Content-Type', 'application/json') });
	}

	getallstates() {
		//return this.http.get(baseUrl+'getallstates', { headers: new HttpHeaders().set('Content-Type', 'application/json') });
		return this.http.get(baseUrl+'getallstateanddistricts', { headers: new HttpHeaders().set('Content-Type', 'application/json') });
	}

	createnewcenter(center) {
		return this.http.post(baseUrl+'createnewcenter', center, { headers: new HttpHeaders().set('Content-Type', 'application/json') , responseType: 'text' });
	}

	updatecenter(id, center) {
		return this.http.put(baseUrl+'updatecenter/' + id, center, { headers: new HttpHeaders().set('Content-Type', 'application/json') , responseType: 'text' });
	}

	deletecenter(id) {
		return this.http.delete(baseUrl+'deletecenter/' + id, { headers: new HttpHeaders().set('Content-Type', 'application/json') , responseType: 'text' });
	}

	


	// Unused
	getallcenter() {
		return this.http.get(baseUrl+'getallcenter', { headers: new HttpHeaders().set('Content-Type', 'application/json') });
	}

	getidbydistrict(district) {
		return this.http.get(baseUrl+'getidbydistrict/' + district, { headers: new HttpHeaders().set('Content-Type', 'application/json') });
	}

	getallblocksbydistrict(district){
		return this.http.get(baseUrl+'getallblocksbydistrict/' + district, { headers: new HttpHeaders().set('Content-Type', 'application/json') });
	}
	
	getalldistrict(statecode) {
		//return this.http.get(baseUrl+'getalldistrict/'+statecode, { headers: new HttpHeaders().set('Content-Type', 'application/json') });
		return this.http.get(baseUrl+'userreg_getdistricts/'+statecode, { headers: new HttpHeaders().set('Content-Type', 'application/json') });
	}

	getallteachers() {
		return this.http.get(baseUrl+'getallteachers', { headers: new HttpHeaders().set('Content-Type', 'application/json') });
	}
	getallactiveusertypes(){				
		return this.http.get(baseUrl+'getallactiveusertypes/', { headers: new HttpHeaders().set('Content-Type', 'application/json') });			
	}

	getaddress(pincode) {
		return this.http.get(baseUrl+'getarea/' + pincode, { headers: new HttpHeaders().set('Content-Type', 'application/json') });
	}
}
