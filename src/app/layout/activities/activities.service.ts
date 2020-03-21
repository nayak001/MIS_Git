import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  constructor(private http: HttpClient) { }

  getmasteractivitiydetails(preferedlanguage, program, subject, month, week, level) {
    return this.http.get(baseUrl + 'getmasteractivitiydetails/' + preferedlanguage + '/' + program + '/' + subject + '/' + month + '/' + week + '/' + level,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
        //responseType: 'text'
      });
  }

  gettchassessment(preferedlanguage, program, level, stage, subject) {
    let url = baseUrl + 'gettchassessment/' + preferedlanguage + '/' + program + '/' + level + '/' + stage + '/' + subject;
    return this.http.get(url,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
        //responseType: 'text'
      });
  }

  createmasteractivities(body) {
    return this.http.post(baseUrl + 'createmasteractivities',
      body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
      , responseType: 'text'
    });
  }

  updatemasteractivities(id, body) {
    return this.http.put(baseUrl + 'updatemasteractivities/' + id,
      body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
      , responseType: 'text'
    });
  }

  getalluser() {
    return this.http.get(baseUrl + 'getalluser',
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
        //responseType: 'text'
      });
  }

  createnewuser(user) {
    return this.http.post(baseUrl + 'createnewuser',
      user, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
      , responseType: 'text'
    });
  }

  updateuser(id, user) {
    return this.http.put(baseUrl + 'updateuser/' + id,
      user, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
      , responseType: 'text'
    });
  }

  deleteuser(id) {
    return this.http.delete(baseUrl + 'deleteuser/' + id,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
        , responseType: 'text'
      });
  }
}

export class ValidationService {
  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }
  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }
  static checkLimit(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
        return { 'range': true };
      }
      return null;
    };
  }
}
