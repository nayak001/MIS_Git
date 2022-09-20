import { Injectable } from "@angular/core";
import { AbstractControl, ValidatorFn } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "./../../../environments/environment.prod";

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: "root",
})
export class PreprogramtrainingService {
  constructor(private http: HttpClient) {}

  getallppttrainingtopics(submoduleid, language) {
    return this.http.get(
      baseUrl + "ppt_getalltopics/" + submoduleid + "/" + language,
      {
        headers: new HttpHeaders().set("Content-Type", "application/json"),
      }
    );
  }

  findppttrainingtopicbyname(submoduleid, subtopicname) {
    return this.http.get(
      baseUrl + "ppt_gettopicsbytopicname/" + submoduleid + "/" + subtopicname,
      {
        headers: new HttpHeaders().set("Content-Type", "application/json"),
        responseType: "text",
      }
    );
  }

  createnewppttrainingtopic(modulebody) {
    return this.http.post(baseUrl + "ppt_createtopic", modulebody, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      //responseType: "text",
    });
  }

  updateppttrainingtopicbyid(id, modulebody) {
    return this.http.put(baseUrl + "ppt_updatetopic/" + id, modulebody, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      //responseType: "text",
    });
  }
  deleteppttrainingtopicbyid(id) {
    return this.http.delete(baseUrl + "ppt_deletetopic/" + id, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      responseType: "text",
    });
  }
  // modules part
  getallppttrainingmodules(ln) {
    return this.http.get(baseUrl + "ppt_getallmaastermodulesdata/" + ln, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      //responseType: 'text'
    });
  }

  findppttrainingmodulebyname(modulename) {
    return this.http.get(
      baseUrl + "findppttrainingmodulebyname/" + modulename,
      {
        headers: new HttpHeaders().set("Content-Type", "application/json"),
        //responseType: 'text'
      }
    );
  }

  createnewppttrainingmodule(modulebody) {
    return this.http.post(baseUrl + "ppt_createmodule", modulebody, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      //   responseType: "text",
    });
  }

  updateppttrainingmodulebyid(id, modulebody) {
    return this.http.put(baseUrl + "ppt_updatemodule/" + id, modulebody, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      //   responseType: "text",
    });
  }

  deleteppttrainingmodulebyid(id) {
    return this.http.delete(baseUrl + "ppt_deletemodule/" + id, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      responseType: "text",
    });
  }

  // sub modules part
  getallppttrainingsubmodules(moduleid, language) {
    return this.http.get(
      baseUrl + "ppt_getallsubmodules/" + moduleid + "/" + language,
      {
        headers: new HttpHeaders().set("Content-Type", "application/json"),
        //responseType: 'text'
      }
    );
  }

  findppttrainingsubmodulebyname(moduleid, submodulename) {
    return this.http.get(
      baseUrl +
        "ppt_getsubmodulesbysubmodulename/" +
        moduleid +
        "/" +
        submodulename,
      {
        headers: new HttpHeaders().set("Content-Type", "application/json"),
        //responseType: 'text'
      }
    );
  }
  getalluser() {
    return this.http.get(baseUrl + "getalluser", {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      //responseType: 'text'
    });
  }

  //   createnewmessage(message) {
  //     return this.http.post(baseUrl + "createnewmessage", message, {
  //       headers: new HttpHeaders().set("Content-Type", "application/json"),
  //       responseType: "text",
  //     });
  //   }

  createpptnewtrainingsubmodule(modulebody) {
    return this.http.post(baseUrl + "ppt_createsubmodule", modulebody, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      //   responseType: "text",
    });
  }

  updateppttrainingsubmodulebyid(id, modulebody) {
    return this.http.put(baseUrl + "ppt_updatesubmodule/" + id, modulebody, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      //responseType: "text",
    });
  }

  deleteppttrainingsubmodulebyid(id) {
    return this.http.delete(baseUrl + "ppt_deletesubmodule/" + id, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      responseType: "text",
    });
  }

  deletetrainingsubmodulebymoduleid(moduleid) {
    return this.http.delete(
      baseUrl + "deletetrainingsubmodulebymoduleid/" + moduleid,
      {
        headers: new HttpHeaders().set("Content-Type", "application/json"),
        responseType: "text",
      }
    );
  }

  moduleAddNotification(trainintype, dataname, datatype) {
    return this.http.get(
      baseUrl +
        "teacherTrainingModuleAddNotification/" +
        trainintype +
        "/" +
        dataname +
        "/" +
        datatype,
      { headers: new HttpHeaders().set("Content-Type", "application/json") }
    );
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
