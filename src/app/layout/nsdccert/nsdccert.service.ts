import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment.prod";

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: "root",
})
export class NsdccertService {
  constructor(private http: HttpClient) {}

  getmanagerwisensdcreport(year, managerid, passcode) {
    return this.http.get(
      baseUrl +
        "getmanagerwisensdcreport/" +
        year +
        "/" +
        managerid +
        "/" +
        passcode,
      {
        headers: new HttpHeaders().set("Content-Type", "application/json"),
      }
    );
  }

  getallapasscode() {
    return this.http.get(baseUrl + "getallapasscode_report", {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    });
  }

  getallmanagers() {
    return this.http.get(baseUrl + "getallmanagers", {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    });
  }

  getnsdcappearedusers(managerid) {
    return this.http.get(baseUrl + "getnsdcappearedusers/" + managerid, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    });
  }

  addnsdccert(id, body) {
    return this.http.put(baseUrl + "addnsdccert/" + id, body, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    });
  }

  deletensdccert(id) {
    return this.http.put(baseUrl + "deletensdccert/" + id, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    });
  }
}
