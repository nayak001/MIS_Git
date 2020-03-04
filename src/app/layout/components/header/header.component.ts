import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from './../../users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public pushRightClass: string;
  dbid: string = '';
  currentuser_userid: string = '';
  currentuser_password: string = '';
  currentuser_username: string = '';
  currentuser_type: string = '';

  hide_span_username: boolean = false;
  hide_span_password: boolean = false;
  hide_btn_edit: boolean = false;

  hide_txt_username: boolean = true;
  hide_txt_password: boolean = true;
  hide_btn_save: boolean = true;

  modalReference: any;
  closeResult: string;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private modalService: NgbModal,
    private usersService: UsersService
  ) {
    //console.log('@@@ Local Storage: '+JSON.stringify(localStorage));
    this.currentuser_userid = localStorage.getItem('_currentuser_userid');
    this.currentuser_password = localStorage.getItem('_currentuser_password');
    this.currentuser_username = localStorage.getItem('_currentuser_username');
    this.currentuser_type = localStorage.getItem('_currentuser_type');
    this.getuserdbid();

    this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

    this.router.events.subscribe(val => {
      if (
        val instanceof NavigationEnd &&
        window.innerWidth <= 992 &&
        this.isToggled()
      ) {
        this.toggleSidebar();
      }
    });
  }

  ngOnInit() {
    this.pushRightClass = 'push-right';
    this.reset();
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
  }

  onLoggedout() {
    console.log('logged out.');
    localStorage.clear();
    this.router.navigate(['login']);
  }

  changeLang(language: string) {
    this.translate.use(language);
  }

  getuserdbid() {
    this.usersService.getuserbyuserid(this.currentuser_userid).subscribe(data => {
      //console.log('###DB id res data: ' + JSON.stringify(data));
      this.dbid = data[0]['_id'];
    },
      error => { },
      () => { }
    );
  }

  btn_edit_click() {
    this.save_mode();
  }

  btn_save_click() {
    let obj = {
      username: this.currentuser_username,
      password: this.currentuser_password
    }
    console.log('### obj: ' + JSON.stringify(obj));
    this.usersService.updateuser(this.dbid, obj).subscribe(data => {
      console.log('### res data: ' + JSON.stringify(data));
      this.modalReference.close();
      alert('Profile save ' + data);
      //location.reload();
      this.onLoggedout();
    },
      error => { },
      () => { }
    );
    this.reset();
  }

  reset() {
    this.hide_span_username = false;
    this.hide_span_password = false;
    this.hide_btn_edit = false;

    this.hide_txt_username = true;
    this.hide_txt_password = true;
    this.hide_btn_save = true;
  }

  save_mode() {
    this.hide_span_username = true;
    this.hide_span_password = true;
    this.hide_btn_edit = true;

    this.hide_txt_username = false;
    this.hide_txt_password = false;
    this.hide_btn_save = false;
  }

  open(content) {
    this.reset();
    this.modalReference = this.modalService.open(content, { backdrop: 'static', keyboard: false });
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
