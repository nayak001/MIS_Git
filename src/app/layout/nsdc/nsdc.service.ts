import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment.prod";

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: "root",
})
export class NsdcService {
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
}
