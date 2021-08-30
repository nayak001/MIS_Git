import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class EceactivitiesService {
  constructor(private http: HttpClient) { }

  getmasteractivitiydetails(preferedlanguage, program, subject, clas, theme, skill) {
    let url = baseUrl + 'getmasterpgeactivitiydetails/' + preferedlanguage + '/' + program + '/' + subject + '/' + clas + '/' + theme + '/' + skill;
    return this.http.get(url,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  gettchassessment(preferedlanguage, program, level, stage, subject) {
    let url = baseUrl + 'gettchassessment/' + preferedlanguage + '/' + program + '/' + level + '/' + stage + '/' + subject;
    return this.http.get(url, {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  createmasteractivities(body) {
    return this.http.post(baseUrl + 'createmasterpgeactivities', body, {headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'text'});
  }

  updatemasteractivities(id, body) {
    return this.http.put(baseUrl + 'updatemasterpgeactivities/' + id, body, {headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'text'});
  }
}
