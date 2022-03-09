import { Injectable } from "@angular/core";
import { AbstractControl, ValidatorFn } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "./../../../environments/environment.prod";

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: "root",
})
export class PasscodemanagerService {
  constructor(private http: HttpClient) {}

  getallpasscode() {
    return this.http.get(baseUrl + "/getallapasscode", {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    });
  }

  createnewpasscode(body) {
    return this.http.post(baseUrl + "savepasscode", body, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    });
  }

  deletepasscode(id, userid, passcode) {
    return this.http.delete(
      baseUrl + "deletepasscode/" + id + "/" + userid + "/" + passcode,
      {
        headers: new HttpHeaders().set("Content-Type", "application/json"),
      }
    );
  }

  checkpasscodeexistance(passcode) {
    return this.http.get(baseUrl + "checkpasscodeexistance/" + passcode, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    });
  }

  checkpasscodeusability(passcode) {
    return this.http.get(baseUrl + "checkpasscodeusability/" + passcode, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    });
  }
}
