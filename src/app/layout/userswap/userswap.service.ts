import { Injectable } from "@angular/core";
import { AbstractControl, ValidatorFn } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "./../../../environments/environment.prod";

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: "root",
})
export class UserswapService {
  constructor(private http: HttpClient) {}
  gettotalusersbyusertype(usertype) {
    return this.http.get(baseUrl + "gettotalusersbyusertype/" + usertype, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    });
  }

  getdistrictsofstate(stateid) {
    return this.http.get(baseUrl + "getdistrictsofstate/" + stateid, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    });
  }

  getblocksofdistricts(stateid, districtid) {
    return this.http.get(
      baseUrl + "getblocksofdistricts/" + stateid + "/" + districtid,
      { headers: new HttpHeaders().set("Content-Type", "application/json") }
    );
  }

  getuserbyuserid(userid) {
    return this.http.get(baseUrl + "getuserbyuserid/" + userid, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    });
  }

  getallprimarypasscodes(userid) {
    return this.http.get(baseUrl + "getallprimarypasscodes/" + userid, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    });
  }

  getallschoolsregistered() {
    return this.http.get(baseUrl + "getallschoolsregisteredgroupbypasscode", {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    });
  }

  createnewuser(user) {
    return this.http.post(baseUrl + "createnewuser", user, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      responseType: "text",
    });
  }

  updateuser(id, body) {
    return this.http.put(baseUrl + "updateuser/" + id, body, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      responseType: "text",
    });
  }

  swapnewuser(data) {
    return this.http.post(baseUrl + "transferuserownership", data, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      responseType: "text",
    });
  }

  swapolduser(data) {
    return this.http.post(baseUrl + "transferolduserownership", data, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      responseType: "text",
    });
  }

  deleteuser(id) {
    return this.http.delete(baseUrl + "deleteuser/" + id, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      responseType: "text",
    });
  }
}

export class ValidationService {
  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (
      control.value.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    ) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }
  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }
  static checkLimit(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
        return { range: true };
      }
      return null;
    };
  }
}
