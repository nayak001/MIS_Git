import { Injectable } from "@angular/core";
import { AbstractControl, ValidatorFn } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "./../../../environments/environment.prod";

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: "root",
})
export class WhatsappbotService {
  constructor(private http: HttpClient) {}

  getallmobilenos() {
    return this.http.get(baseUrl + "getallmobilenos", {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      //responseType: 'text'
    });
  }

  filterwhatsappnos(allcontacts) {
    return this.http.post(baseUrl + "filterwhatsappnos/", allcontacts, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      //responseType: 'text'
    });
  }

  sendtemplatedmediamessage(contact) {
    return this.http
      .get(baseUrl + "sendtemplatedmediamessage/" + contact, {
        headers: new HttpHeaders().set("Content-Type", "application/json"),
        //,responseType: 'text'
      })
      .toPromise();
  }

  sendtemplatedmediamessages(allcontacts) {
    return this.http.post(baseUrl + "sendtemplatedmediamessages", allcontacts, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      //,responseType: 'text'
    });
  }
}
