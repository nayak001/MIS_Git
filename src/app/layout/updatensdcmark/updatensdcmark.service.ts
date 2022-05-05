import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment.prod";

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: "root",
})
export class UpdatensdcmarkService {
  constructor(private http: HttpClient) {}
  getupdatensdcusers() {
    return this.http.get(baseUrl + "/getupdatensdcusers", {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      //responseType: 'text'
    });
  }

  getansfromuser(userid) {
    return this.http.get(baseUrl + "getansfromuser/" + userid, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      //responseType: 'text'
    });
  }
  updateuserstatus(formData) {
    return this.http.post(baseUrl + "updateuserstatus", formData, {
      headers: new HttpHeaders()
        .set("enctype", "multipart/form-data")
        .set("Accept", "application/json"),
      //,responseType: 'text'
    });
  }
}
