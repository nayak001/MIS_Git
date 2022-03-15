import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment.prod";

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: "root",
})
export class AdminEraseDataService {
  constructor(private http: HttpClient) {}

  updateUserData(id, body) {
    return this.http.put(baseUrl + "deleteuserrecord/" + id, body, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    });
  }
}
