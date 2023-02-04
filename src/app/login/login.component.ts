import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { routerTransition } from "../router.animations";

import { LoginService, ValidationService } from "./login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hideLoading_indicator: boolean;
  invalidCredentials: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    public router: Router,
    private loginService: LoginService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, ValidationService.emailValidator]],
      password: ["", [Validators.required, ValidationService.passwordValidator]]
    });
    this.translate.addLangs([
      "en",
      "fr",
      "ur",
      "es",
      "it",
      "fa",
      "de",
      "zh-CHS"
    ]);
    this.translate.setDefaultLang("en");
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(
      browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : "en"
    );
    this.hideLoading_indicator = true;
    this.invalidCredentials = false;
  }

  ngOnInit() {
    if (
      localStorage.getItem("_currentuser_emailid") &&
      localStorage.getItem("_currentuser_password") &&
      localStorage.getItem("_currentuser_type") === "admin"
    ) {
      this.router.navigate(["dashboard"]);
    } else {
      this.router.navigate(["/login"]);
    }
  }

  onLoggedin() {
    this.invalidCredentials = false;
    this.hideLoading_indicator = false;
    var param = {
      userid: this.loginForm.value.email,
      password: this.loginForm.value.password,
      usertype: "admin"
    };
    this.loginService.doLogin(param).subscribe(
      data => {
     
        // Data which is returned by call
        if (data["success"] == "success") {
          console.log("data-->",data)
          //if(1){
          localStorage.setItem("_currentuser_userid", data["userid"]);
          localStorage.setItem("_currentuser_username", data["username"]);
          localStorage.setItem(
            "_currentuser_emailid",
            this.loginForm.value.email
          );
          localStorage.setItem(
            "_currentuser_password",
            this.loginForm.value.password
          );
          localStorage.setItem("_currentuser_type", "admin");

          localStorage.setItem("isLoggedin", "true");
          this.hideLoading_indicator = false;
          this.router.navigate(["dashboard"]);
          this.invalidCredentials = false;
        } else {
          /*this.dialog.open(ErrorComponent,{
						data: {
							message: "Your login information are incorrect!"
						}
					});
					*/
          this.invalidCredentials = true;
          localStorage.clear();
          localStorage.setItem("isLoggedin", "false");
          this.hideLoading_indicator = true;
        }
      },
      error => {
        // Error if any
        /*
				this.dialog.open(ErrorComponent,{
					data: {
						message: "There is error in Network connection !"
					}
				});
				*/
        this.invalidCredentials = true;
        localStorage.clear();
        localStorage.setItem("isLoggedin", "false");
        this.hideLoading_indicator = true;
      },
      () => {
        // Here call is completed. If you wish to do something
        // after call is completed(since this is an asynchronous call),
        // this is the right place to do. ex: call another function
      }
    );
  }
}
