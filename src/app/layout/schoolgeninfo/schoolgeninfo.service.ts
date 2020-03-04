import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class SchoolgeninfoService {

  constructor(private http: HttpClient) { }

  getworkshopdetails(language, subject) {
    return this.http.get(baseUrl + 'getworkshopdetails/school_readiness/general_info/' + language + "/" + subject,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
        //responseType: 'text'
      });
  }

  createworkshopdetails(body) {
    return this.http.post(baseUrl + 'createworkshopdetails',
      body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
      , responseType: 'text'
    });
  }

  updateworkshopdetails(id, body) {
    return this.http.put(baseUrl + 'updateworkshopdetails/' + id,
      body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
      , responseType: 'text'
    });
  }
}
