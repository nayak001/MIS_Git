import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})

export class SupervisorcontrollerService {
    constructor(private http: HttpClient) { }


    savesupervisordetails(body){
      return this.http.post(baseUrl+'savesupervisordetails',body,{headers: new HttpHeaders().set('Content-Type', 'application/json')});
    }

    checkanganwadinameexistance(anganwadiname){				
      return this.http.get(baseUrl+'checkanganwadinameexistance/'+anganwadiname,{headers: new HttpHeaders().set('Content-Type', 'application/json')});			
    }
    getallsupervisordetails(){				
      return this.http.get(baseUrl+'getallsupervisordetails',{headers: new HttpHeaders().set('Content-Type', 'application/json')});			
    }

}