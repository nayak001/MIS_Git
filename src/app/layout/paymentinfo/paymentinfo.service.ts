import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PaymentinfoService {
	constructor(private http: HttpClient) { }
	getallpaymentinfo(){				
		return this.http.get(baseUrl+'getallpaymentinfo',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			//responseType: 'text' 
		});			
	}
	
	createpaymentinfo(payment){
		return this.http.post(baseUrl+'createpaymentinfo',
		payment,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
	
	updatepaymentinfo(id,payment){
		return this.http.put(baseUrl+'updatepaymentinfo/'+id,
		payment,{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
	
	deletepaymentinfo(id){
		return this.http.delete(baseUrl+'deletepaymentinfo/'+id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			,responseType: 'text' 
		});
	}
}