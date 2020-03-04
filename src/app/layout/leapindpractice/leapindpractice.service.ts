import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class LeapindpracticeService {

  constructor(private http: HttpClient) { }

  getinvidualdetails(language, subject, level) {
    return this.http.get(baseUrl + 'getworkshopindividualdetails/leap/' + language + "/" + subject + "/" + level,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
        //responseType: 'text'
      });
  }

  createinvidualdetails(body) {
    return this.http.post(baseUrl + 'createworkshopindividual',
      body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
      , responseType: 'text'
    });
  }

  updateindividualdetails(id, body) {
    return this.http.put(baseUrl + 'updateworkshopindividual/' + id,
      body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
      , responseType: 'text'
    });
  }
}
