import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class BlockdistrictService {
	constructor(private http: HttpClient) { }

	getallblocksanddistricts() {
		return this.http.get(baseUrl+'getallblocksanddistricts',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			// responseType: 'text'
		});
	}

	getidbydistrict(district) {
		return this.http.get(baseUrl+'getidbydistrict/' + district,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			// responseType: 'text'
		});
	}

	getalldistrict() {
		return this.http.get(baseUrl+'getalldistrict',
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			// responseType: 'text'
		});
	}

	createnewblockdistrict(center) {
		return this.http.post(baseUrl+'createnewblockdistrict',
		center, {
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			, responseType: 'text'
		});
	}

	updateblockdistrictbyid(id, center) {
		return this.http.put(baseUrl+'updateblockdistrictbyid/' + id,
		center, {
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			, responseType: 'text'
		});
	}

	deleteblockdistrictbyid(id) {
		return this.http.delete(baseUrl+'deleteblockdistrictbyid/' + id,
		{
			headers: new HttpHeaders().set('Content-Type', 'application/json')
			, responseType: 'text'
		});
	}
}

