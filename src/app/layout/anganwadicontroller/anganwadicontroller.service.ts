import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class AnganwadicontrollerService {
	constructor(private http: HttpClient) { }
  getusercode(){				
		return this.http.get(baseUrl+'getusercode',{headers: new HttpHeaders().set('Content-Type', 'application/json')});			
	}
	
	checkanganwadicodeexistance(usercode){				
		return this.http.get(baseUrl+'checkanganwadicodeexistance/'+usercode,{headers: new HttpHeaders().set('Content-Type', 'application/json')});			
	}

	addusercode(body){
		return this.http.post(baseUrl+'addusercode',body,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}
	
	updateusercode(id,body){
		return this.http.put(baseUrl+'updateusercode/'+id,body,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}
	
	deleteusercode(id){
		return this.http.delete(baseUrl+'deleteusercode/'+id,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}
	getdistrictsofstate(stateid){
		return this.http.get(baseUrl+'getdistrictsofstate/'+stateid,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}

	getblocksofdistricts(stateid, districtid){
		return this.http.get(baseUrl+'getblocksofdistricts/'+stateid+'/'+districtid,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
	}

}


