import { Injectable } from "@angular/core";
import { AbstractControl, ValidatorFn } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "./../../../environments/environment.prod";

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: "root",
})
export class SupervisorcontrollerService {
  constructor(private http: HttpClient) {}

  savesupervisordetails(body) {
    return this.http.post(baseUrl + "savesupervisordetails", body, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    });
  }

  checkanganwadinameexistance(anganwadiname) {
    return this.http.get(
      baseUrl + "checkanganwadinameexistance/" + anganwadiname,
      { headers: new HttpHeaders().set("Content-Type", "application/json") }
    );
  }
  getallsupervisordetails() {
    return this.http.get(baseUrl + "getallsupervisordetails", {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    });
  }
  getanganwadinamebysearch(anganwadiname) {
    return this.http.get(
      baseUrl + "getanganwadinamebysearch/" + anganwadiname,
      { headers: new HttpHeaders().set("Content-Type", "application/json") }
    );
  }
  getallstateanddistricts() {
    return this.http.get(baseUrl + "getallstateanddistricts", {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      // responseType: 'text'
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

  getallunassignedanganwadis(stateid, districtid, blockid) {
    return this.http.get(
      baseUrl +
        "getallunassignedanganwadis/" +
        stateid +
        "/" +
        districtid +
        "/" +
        blockid,
      { headers: new HttpHeaders().set("Content-Type", "application/json") }
    );
  }

  updatesupervisordetails(body) {
    return this.http.put(baseUrl + "updatesupervisordetails/", body, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    });
  }
  updateByAnganwadiCode(body){
    return this.http.put(baseUrl + "updateByAnganwadiCode/", body, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    });
  }
}