(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{ZkvP:function(l,n,u){"use strict";u.r(n);var e=u("CcnG"),t=function(){return function(){}}(),o=u("pMnS"),a=u("gIcY"),i=u("U0Oa"),d=u("ERWf"),r=u("Ip0R"),s=u("0km3"),c=u("oaor"),p=u("q56F"),g=u("FcHb"),m=u("V5lK"),f=u("4GxJ"),v=u("PSD3"),h=u.n(v),_=u("t/Na"),b=u("cxbk").a.baseUrl,y=function(){function l(l){this.http=l}return l.prototype.getallteacherprofiles=function(){return this.http.get(b+"getallteacherprofiles/",{headers:(new _.h).set("Content-Type","application/json")})},l.prototype.createnewteacherprofile=function(l){return this.http.post(b+"createnewteacherprofile",l,{headers:(new _.h).set("Content-Type","application/json"),responseType:"text"})},l.prototype.updateteacherprofile=function(l,n){return this.http.put(b+"updateteacherprofile/"+l,n,{headers:(new _.h).set("Content-Type","application/json"),responseType:"text"})},l.prototype.deleteuser=function(l){return this.http.delete(b+"deleteuser/"+l,{headers:(new _.h).set("Content-Type","application/json"),responseType:"text"})},l.ngInjectableDef=e.defineInjectable({factory:function(){return new l(e.inject(_.c))},token:l,providedIn:"root"}),l}(),C=function(){function l(l,n,u){this.modalService=l,this.router=n,this.teacherprofileService=u,this.allteacherprofile_data=[],this.modal_pretrainingmark="",this.teacherprofile_status="",this.minDate=new Date("01/01/2015"),this.maxDate=new Date,this.dateValue=new Date,this.modal_startdate=new Date,this.button_action="",this.hideLoading_indicator=!0,this.getallteacherprofiles()}return l.prototype.ngOnInit=function(){},l.prototype.getallteacherprofiles=function(){var l=this;this.hideLoading_indicator=!1,this.teacherprofileService.getallteacherprofiles().subscribe(function(n){console.log("### allteacherprofile_data: "+JSON.stringify(n)),l.data=n,l.allteacherprofile_data=n,l.hideLoading_indicator=!0},function(l){},function(){})},l.prototype.search=function(l){this.filterData=(l=null==l||null==l?"":l)?this.data.filter(function(n){return n.emailid.toLowerCase().includes(l.trim().toLowerCase())}):this.data},l.prototype.onSelect_modal_qualification=function(l){var n=l.target.options,u=n.selectedIndex,e=n[u].value;console.log("--\x3eSelected Opt Value= "+e+"   Text= "+n[u].text),this.modal_qualification=e},l.prototype.datepicker_onchange=function(l){this.modal_startdate=new Date(l.value),console.log("###selected_date: "+this.modal_startdate)},l.prototype.save_button_click=function(){if(null==this.modal_teachername||null==this.modal_teachername||""==this.modal_teachername)h.a.fire("Data insufficient","Please mention teacher name.","warning");else if(null==this.modal_contactno||null==this.modal_contactno||""==this.modal_contactno)h.a.fire("Data insufficient","Please mention contact no.","warning");else{var l={teachername:this.modal_teachername,qualification:this.modal_qualification,contactno:this.modal_contactno,address:this.modal_address,special_initiatives:this.modal_specialinitiatives,aspirations:this.modal_aspirations,center_start_date:this.modal_startdate,preprogram_training_mark:this.modal_pretrainingmark,status:this.teacherprofile_status};"new"===this.button_action?this.save(l):"edit"===this.button_action?this.update(l):h.a.fire("Success","Data saved successfully.","success")}},l.prototype.save=function(l){var n=this;this.teacherprofileService.createnewteacherprofile(l).subscribe(function(l){console.log("### res data: "+JSON.stringify(l)),n.modalReference.close(),n.getallteacherprofiles()},function(l){console.log("###2 error: "+JSON.stringify(l))},function(){}),h.a.fire("Success","Data saved successfully.","success")},l.prototype.update=function(l){var n=this;console.log("### inside elseif"),this.teacherprofileService.updateteacherprofile(this.modal_id,l).subscribe(function(l){console.log("### res data: "+JSON.stringify(l)),n.modalReference.close(),n.getallteacherprofiles()},function(l){},function(){}),h.a.fire("Success","Data updated successfully.","success")},l.prototype.disable_button_click=function(l,n){var u=this,e=l._id,t={status:n};this.hideLoading_indicator=!1,this.teacherprofileService.updateteacherprofile(e,t).subscribe(function(l){console.log("### res data: "+JSON.stringify(l)),u.getallteacherprofiles()},function(l){},function(){})},l.prototype.open=function(l,n){var u=this;null!=n||null!=n?(this.button_action="edit",this.modal_id=n._id,this.modal_teachername=n.teachername,this.modal_qualification=n.qualification,this.modal_contactno=n.contactno,this.modal_address=n.address,this.modal_specialinitiatives=n.special_initiatives,this.modal_aspirations=n.aspirations,this.modal_startdate=n.center_start_date,this.modal_pretrainingmark=n.preprogram_training_mark,this.teacherprofile_status=n.status):(this.button_action="new",this.modal_id="",this.modal_teachername="",this.modal_qualification="matric",this.modal_contactno="",this.modal_address="",this.modal_specialinitiatives="",this.modal_aspirations="",this.modal_startdate=new Date,this.modal_pretrainingmark="",this.teacherprofile_status="active"),this.modalReference=this.modalService.open(l,{backdrop:"static",keyboard:!1}),this.modalReference.result.then(function(l){u.closeResult="Closed with: "+l},function(l){u.closeResult="Dismissed "+u.getDismissReason(l)})},l.prototype.getDismissReason=function(l){return l===f.a.ESC?"by pressing ESC":l===f.a.BACKDROP_CLICK?"by clicking on a backdrop":"with: "+l},l}(),x=u("ZYCi"),D=e["\u0275crt"]({encapsulation:0,styles:[[".largewidth[_ngcontent-%COMP%]{min-width:1100px;margin-left:-270px;background-color:#fff}.table-striped[_ngcontent-%COMP%]{font-size:12px!important;color:#2e2ef9;font-family:Arial}.table-striped[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{font-size:11px!important;font-weight:700;color:#636161;font-family:'Arial black'}.bold-font[_ngcontent-%COMP%]{font-size:11px!important;font-weight:700;color:#2e2ef9;font-family:Arial}.modal-footer[_ngcontent-%COMP%]{border-top:1px solid #848484;background-color:#c3c3c3}.btn[_ngcontent-%COMP%]{border-radius:1.25rem}.modal-text[_ngcontent-%COMP%]{font-size:22px;color:#505050}.warning-icon[_ngcontent-%COMP%]{width:40px;height:40px;margin-left:40px}.validation-error-message[_ngcontent-%COMP%]{color:red;font-size:10px;font-weight:700}.delete-button[_ngcontent-%COMP%]{background-color:#ffffff00;color:red;font-size:20px;padding:0;border:none}.edit-button[_ngcontent-%COMP%]{background-color:#ffffff00;color:#00f;font-size:20px;padding:0;border:none}"]],data:{animation:[{type:7,name:"routerTransition",definitions:[],options:{}}]}});function k(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,114,"div",[["class","modal-body largewidth"]],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,113,"div",[["class","form-content"]],null,null,null,null,null)),(l()(),e["\u0275eld"](2,0,null,null,9,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](3,0,null,null,0,"div",[["class","col col-xl-3 col-lg-3"]],null,null,null,null,null)),(l()(),e["\u0275eld"](4,0,null,null,7,"div",[["class","col col-xl-6 col-lg-6"]],null,null,null,null,null)),(l()(),e["\u0275eld"](5,0,null,null,6,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](6,0,null,null,5,"input",[["type","hidden"]],[[8,"value",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var t=!0,o=l.component;return"input"===n&&(t=!1!==e["\u0275nov"](l,7)._handleInput(u.target.value)&&t),"blur"===n&&(t=!1!==e["\u0275nov"](l,7).onTouched()&&t),"compositionstart"===n&&(t=!1!==e["\u0275nov"](l,7)._compositionStart()&&t),"compositionend"===n&&(t=!1!==e["\u0275nov"](l,7)._compositionEnd(u.target.value)&&t),"ngModelChange"===n&&(t=!1!==(o.modal_id=u)&&t),t},null,null)),e["\u0275did"](7,16384,null,0,a.c,[e.Renderer2,e.ElementRef,[2,a.a]],null,null),e["\u0275prd"](1024,null,a.i,function(l){return[l]},[a.c]),e["\u0275did"](9,671744,null,0,a.n,[[8,null],[8,null],[8,null],[6,a.i]],{model:[0,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,a.j,null,[a.n]),e["\u0275did"](11,16384,null,0,a.k,[[4,a.j]],null,null),(l()(),e["\u0275eld"](12,0,null,null,20,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](13,0,null,null,1,"div",[["class","col col-xl-2 col-lg-2"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" Name "])),(l()(),e["\u0275eld"](15,0,null,null,7,"div",[["class","col col-xl-4 col-lg-4"]],null,null,null,null,null)),(l()(),e["\u0275eld"](16,0,null,null,6,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](17,0,null,null,5,"input",[["class","form-control input-underline input-lg"],["placeholder","Teacher name"],["type","text"]],[[8,"value",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var t=!0,o=l.component;return"input"===n&&(t=!1!==e["\u0275nov"](l,18)._handleInput(u.target.value)&&t),"blur"===n&&(t=!1!==e["\u0275nov"](l,18).onTouched()&&t),"compositionstart"===n&&(t=!1!==e["\u0275nov"](l,18)._compositionStart()&&t),"compositionend"===n&&(t=!1!==e["\u0275nov"](l,18)._compositionEnd(u.target.value)&&t),"ngModelChange"===n&&(t=!1!==(o.modal_teachername=u)&&t),t},null,null)),e["\u0275did"](18,16384,null,0,a.c,[e.Renderer2,e.ElementRef,[2,a.a]],null,null),e["\u0275prd"](1024,null,a.i,function(l){return[l]},[a.c]),e["\u0275did"](20,671744,null,0,a.n,[[8,null],[8,null],[8,null],[6,a.i]],{model:[0,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,a.j,null,[a.n]),e["\u0275did"](22,16384,null,0,a.k,[[4,a.j]],null,null),(l()(),e["\u0275eld"](23,0,null,null,1,"div",[["class","col col-xl-2 col-lg-2"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" Contact number "])),(l()(),e["\u0275eld"](25,0,null,null,7,"div",[["class","col col-xl-4 col-lg-4"]],null,null,null,null,null)),(l()(),e["\u0275eld"](26,0,null,null,6,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](27,0,null,null,5,"input",[["class","form-control input-underline input-lg"],["placeholder","Contact Number"],["type","text"]],[[8,"value",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var t=!0,o=l.component;return"input"===n&&(t=!1!==e["\u0275nov"](l,28)._handleInput(u.target.value)&&t),"blur"===n&&(t=!1!==e["\u0275nov"](l,28).onTouched()&&t),"compositionstart"===n&&(t=!1!==e["\u0275nov"](l,28)._compositionStart()&&t),"compositionend"===n&&(t=!1!==e["\u0275nov"](l,28)._compositionEnd(u.target.value)&&t),"ngModelChange"===n&&(t=!1!==(o.modal_contactno=u)&&t),t},null,null)),e["\u0275did"](28,16384,null,0,a.c,[e.Renderer2,e.ElementRef,[2,a.a]],null,null),e["\u0275prd"](1024,null,a.i,function(l){return[l]},[a.c]),e["\u0275did"](30,671744,null,0,a.n,[[8,null],[8,null],[8,null],[6,a.i]],{model:[0,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,a.j,null,[a.n]),e["\u0275did"](32,16384,null,0,a.k,[[4,a.j]],null,null),(l()(),e["\u0275eld"](33,0,null,null,39,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](34,0,null,null,1,"div",[["class","col col-xl-2 col-lg-2"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" Qualification "])),(l()(),e["\u0275eld"](36,0,null,null,26,"div",[["class","col col-xl-4 col-lg-4"]],null,null,null,null,null)),(l()(),e["\u0275eld"](37,0,null,null,25,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](38,0,null,null,24,"select",[["class","form-control"]],[[8,"value",0]],[[null,"change"]],function(l,n,u){var e=!0;return"change"===n&&(e=!1!==l.component.onSelect_modal_qualification(u)&&e),e},null,null)),(l()(),e["\u0275eld"](39,0,null,null,3,"option",[["value","matric"]],null,null,null,null,null)),e["\u0275did"](40,147456,null,0,a.o,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),e["\u0275did"](41,147456,null,0,a.x,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),e["\u0275ted"](-1,null,["Matric"])),(l()(),e["\u0275eld"](43,0,null,null,3,"option",[["value","intermediate"]],null,null,null,null,null)),e["\u0275did"](44,147456,null,0,a.o,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),e["\u0275did"](45,147456,null,0,a.x,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),e["\u0275ted"](-1,null,["Intermediate"])),(l()(),e["\u0275eld"](47,0,null,null,3,"option",[["value","graduate"]],null,null,null,null,null)),e["\u0275did"](48,147456,null,0,a.o,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),e["\u0275did"](49,147456,null,0,a.x,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),e["\u0275ted"](-1,null,["Graduate"])),(l()(),e["\u0275eld"](51,0,null,null,3,"option",[["value","masters"]],null,null,null,null,null)),e["\u0275did"](52,147456,null,0,a.o,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),e["\u0275did"](53,147456,null,0,a.x,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),e["\u0275ted"](-1,null,["Masters"])),(l()(),e["\u0275eld"](55,0,null,null,3,"option",[["value","doctorate"]],null,null,null,null,null)),e["\u0275did"](56,147456,null,0,a.o,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),e["\u0275did"](57,147456,null,0,a.x,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),e["\u0275ted"](-1,null,["Doctorate"])),(l()(),e["\u0275eld"](59,0,null,null,3,"option",[["value","other"]],null,null,null,null,null)),e["\u0275did"](60,147456,null,0,a.o,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),e["\u0275did"](61,147456,null,0,a.x,[e.ElementRef,e.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),e["\u0275ted"](-1,null,["Others"])),(l()(),e["\u0275eld"](63,0,null,null,1,"div",[["class","col col-xl-2 col-lg-2"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" Address "])),(l()(),e["\u0275eld"](65,0,null,null,7,"div",[["class","col col-xl-4 col-lg-4"]],null,null,null,null,null)),(l()(),e["\u0275eld"](66,0,null,null,6,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](67,0,null,null,5,"input",[["class","form-control input-underline input-lg"],["placeholder","Teacher Address"],["type","text"]],[[8,"value",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var t=!0,o=l.component;return"input"===n&&(t=!1!==e["\u0275nov"](l,68)._handleInput(u.target.value)&&t),"blur"===n&&(t=!1!==e["\u0275nov"](l,68).onTouched()&&t),"compositionstart"===n&&(t=!1!==e["\u0275nov"](l,68)._compositionStart()&&t),"compositionend"===n&&(t=!1!==e["\u0275nov"](l,68)._compositionEnd(u.target.value)&&t),"ngModelChange"===n&&(t=!1!==(o.modal_address=u)&&t),t},null,null)),e["\u0275did"](68,16384,null,0,a.c,[e.Renderer2,e.ElementRef,[2,a.a]],null,null),e["\u0275prd"](1024,null,a.i,function(l){return[l]},[a.c]),e["\u0275did"](70,671744,null,0,a.n,[[8,null],[8,null],[8,null],[6,a.i]],{model:[0,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,a.j,null,[a.n]),e["\u0275did"](72,16384,null,0,a.k,[[4,a.j]],null,null),(l()(),e["\u0275eld"](73,0,null,null,20,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](74,0,null,null,1,"div",[["class","col col-xl-2 col-lg-2"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" Special initiatives "])),(l()(),e["\u0275eld"](76,0,null,null,7,"div",[["class","col col-xl-4 col-lg-4"]],null,null,null,null,null)),(l()(),e["\u0275eld"](77,0,null,null,6,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](78,0,null,null,5,"input",[["class","form-control input-underline input-lg"],["placeholder","Special Initiatives"],["type","text"]],[[8,"value",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var t=!0,o=l.component;return"input"===n&&(t=!1!==e["\u0275nov"](l,79)._handleInput(u.target.value)&&t),"blur"===n&&(t=!1!==e["\u0275nov"](l,79).onTouched()&&t),"compositionstart"===n&&(t=!1!==e["\u0275nov"](l,79)._compositionStart()&&t),"compositionend"===n&&(t=!1!==e["\u0275nov"](l,79)._compositionEnd(u.target.value)&&t),"ngModelChange"===n&&(t=!1!==(o.modal_specialinitiatives=u)&&t),t},null,null)),e["\u0275did"](79,16384,null,0,a.c,[e.Renderer2,e.ElementRef,[2,a.a]],null,null),e["\u0275prd"](1024,null,a.i,function(l){return[l]},[a.c]),e["\u0275did"](81,671744,null,0,a.n,[[8,null],[8,null],[8,null],[6,a.i]],{model:[0,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,a.j,null,[a.n]),e["\u0275did"](83,16384,null,0,a.k,[[4,a.j]],null,null),(l()(),e["\u0275eld"](84,0,null,null,1,"div",[["class","col col-xl-2 col-lg-2"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" Aspirations "])),(l()(),e["\u0275eld"](86,0,null,null,7,"div",[["class","col col-xl-4 col-lg-4"]],null,null,null,null,null)),(l()(),e["\u0275eld"](87,0,null,null,6,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](88,0,null,null,5,"input",[["class","form-control input-underline input-lg"],["placeholder","Aspirations"],["type","text"]],[[8,"value",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var t=!0,o=l.component;return"input"===n&&(t=!1!==e["\u0275nov"](l,89)._handleInput(u.target.value)&&t),"blur"===n&&(t=!1!==e["\u0275nov"](l,89).onTouched()&&t),"compositionstart"===n&&(t=!1!==e["\u0275nov"](l,89)._compositionStart()&&t),"compositionend"===n&&(t=!1!==e["\u0275nov"](l,89)._compositionEnd(u.target.value)&&t),"ngModelChange"===n&&(t=!1!==(o.modal_aspirations=u)&&t),t},null,null)),e["\u0275did"](89,16384,null,0,a.c,[e.Renderer2,e.ElementRef,[2,a.a]],null,null),e["\u0275prd"](1024,null,a.i,function(l){return[l]},[a.c]),e["\u0275did"](91,671744,null,0,a.n,[[8,null],[8,null],[8,null],[6,a.i]],{model:[0,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,a.j,null,[a.n]),e["\u0275did"](93,16384,null,0,a.k,[[4,a.j]],null,null),(l()(),e["\u0275eld"](94,0,null,null,20,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](95,0,null,null,1,"div",[["class","col col-xl-2 col-lg-2"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" Centre start date "])),(l()(),e["\u0275eld"](97,0,null,null,7,"div",[["class","col col-xl-4 col-lg-4"]],null,null,null,null,null)),(l()(),e["\u0275eld"](98,0,null,null,6,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](99,16777216,null,null,5,"ejs-datepicker",[["format","dd-MM-yyyy"],["id","datepicker"],["placeholder","Select a date"],["strictMode","true"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"change"],[null,"ngModelChange"]],function(l,n,u){var e=!0,t=l.component;return"change"===n&&(e=!1!==t.datepicker_onchange(u)&&e),"ngModelChange"===n&&(e=!1!==(t.modal_startdate=u)&&e),e},i.b,i.a)),e["\u0275did"](100,6537216,null,0,d.e,[e.ElementRef,e.Renderer2,e.ViewContainerRef,e.Injector],{format:[0,"format"],max:[1,"max"],min:[2,"min"],placeholder:[3,"placeholder"],strictMode:[4,"strictMode"],value:[5,"value"]},{change:"change"}),e["\u0275prd"](1024,null,a.i,function(l){return[l]},[d.e]),e["\u0275did"](102,671744,null,0,a.n,[[8,null],[8,null],[8,null],[6,a.i]],{model:[0,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,a.j,null,[a.n]),e["\u0275did"](104,16384,null,0,a.k,[[4,a.j]],null,null),(l()(),e["\u0275eld"](105,0,null,null,1,"div",[["class","col col-xl-2 col-lg-2"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" Pre-program training marks secured "])),(l()(),e["\u0275eld"](107,0,null,null,7,"div",[["class","col col-xl-4 col-lg-4"]],null,null,null,null,null)),(l()(),e["\u0275eld"](108,0,null,null,6,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](109,0,null,null,5,"input",[["class","form-control input-underline input-lg"],["placeholder","Pre-program Training Mark"],["type","text"]],[[8,"value",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var t=!0,o=l.component;return"input"===n&&(t=!1!==e["\u0275nov"](l,110)._handleInput(u.target.value)&&t),"blur"===n&&(t=!1!==e["\u0275nov"](l,110).onTouched()&&t),"compositionstart"===n&&(t=!1!==e["\u0275nov"](l,110)._compositionStart()&&t),"compositionend"===n&&(t=!1!==e["\u0275nov"](l,110)._compositionEnd(u.target.value)&&t),"ngModelChange"===n&&(t=!1!==(o.modal_pretrainingmark=u)&&t),t},null,null)),e["\u0275did"](110,16384,null,0,a.c,[e.Renderer2,e.ElementRef,[2,a.a]],null,null),e["\u0275prd"](1024,null,a.i,function(l){return[l]},[a.c]),e["\u0275did"](112,671744,null,0,a.n,[[8,null],[8,null],[8,null],[6,a.i]],{model:[0,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,a.j,null,[a.n]),e["\u0275did"](114,16384,null,0,a.k,[[4,a.j]],null,null),(l()(),e["\u0275eld"](115,0,null,null,4,"div",[["class","modal-footer largewidth"]],null,null,null,null,null)),(l()(),e["\u0275eld"](116,0,null,null,1,"button",[["class","btn btn-danger"],["type","button"]],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.context.close("Close click")&&e),e},null,null)),(l()(),e["\u0275ted"](-1,null,["Cancel"])),(l()(),e["\u0275eld"](118,0,null,null,1,"button",[["class","btn btn-success"],["type","button"]],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.save_button_click()&&e),e},null,null)),(l()(),e["\u0275ted"](-1,null,["\xa0\xa0\xa0Save\xa0\xa0\xa0"]))],function(l,n){var u=n.component;l(n,9,0,u.modal_id),l(n,20,0,u.modal_teachername),l(n,30,0,u.modal_contactno),l(n,40,0,"matric"),l(n,41,0,"matric"),l(n,44,0,"intermediate"),l(n,45,0,"intermediate"),l(n,48,0,"graduate"),l(n,49,0,"graduate"),l(n,52,0,"masters"),l(n,53,0,"masters"),l(n,56,0,"doctorate"),l(n,57,0,"doctorate"),l(n,60,0,"other"),l(n,61,0,"other"),l(n,70,0,u.modal_address),l(n,81,0,u.modal_specialinitiatives),l(n,91,0,u.modal_aspirations),l(n,100,0,"dd-MM-yyyy",u.maxDate,u.minDate,"Select a date","true",u.dateValue),l(n,102,0,u.modal_startdate),l(n,112,0,u.modal_pretrainingmark)},function(l,n){var u=n.component;l(n,6,0,e["\u0275inlineInterpolate"](1,"",u.modal_id,""),e["\u0275nov"](n,11).ngClassUntouched,e["\u0275nov"](n,11).ngClassTouched,e["\u0275nov"](n,11).ngClassPristine,e["\u0275nov"](n,11).ngClassDirty,e["\u0275nov"](n,11).ngClassValid,e["\u0275nov"](n,11).ngClassInvalid,e["\u0275nov"](n,11).ngClassPending),l(n,17,0,e["\u0275inlineInterpolate"](1,"",u.modal_teachername,""),e["\u0275nov"](n,22).ngClassUntouched,e["\u0275nov"](n,22).ngClassTouched,e["\u0275nov"](n,22).ngClassPristine,e["\u0275nov"](n,22).ngClassDirty,e["\u0275nov"](n,22).ngClassValid,e["\u0275nov"](n,22).ngClassInvalid,e["\u0275nov"](n,22).ngClassPending),l(n,27,0,e["\u0275inlineInterpolate"](1,"",u.modal_contactno,""),e["\u0275nov"](n,32).ngClassUntouched,e["\u0275nov"](n,32).ngClassTouched,e["\u0275nov"](n,32).ngClassPristine,e["\u0275nov"](n,32).ngClassDirty,e["\u0275nov"](n,32).ngClassValid,e["\u0275nov"](n,32).ngClassInvalid,e["\u0275nov"](n,32).ngClassPending),l(n,38,0,e["\u0275inlineInterpolate"](1,"",u.modal_qualification,"")),l(n,67,0,e["\u0275inlineInterpolate"](1,"",u.modal_address,""),e["\u0275nov"](n,72).ngClassUntouched,e["\u0275nov"](n,72).ngClassTouched,e["\u0275nov"](n,72).ngClassPristine,e["\u0275nov"](n,72).ngClassDirty,e["\u0275nov"](n,72).ngClassValid,e["\u0275nov"](n,72).ngClassInvalid,e["\u0275nov"](n,72).ngClassPending),l(n,78,0,e["\u0275inlineInterpolate"](1,"",u.modal_specialinitiatives,""),e["\u0275nov"](n,83).ngClassUntouched,e["\u0275nov"](n,83).ngClassTouched,e["\u0275nov"](n,83).ngClassPristine,e["\u0275nov"](n,83).ngClassDirty,e["\u0275nov"](n,83).ngClassValid,e["\u0275nov"](n,83).ngClassInvalid,e["\u0275nov"](n,83).ngClassPending),l(n,88,0,e["\u0275inlineInterpolate"](1,"",u.modal_aspirations,""),e["\u0275nov"](n,93).ngClassUntouched,e["\u0275nov"](n,93).ngClassTouched,e["\u0275nov"](n,93).ngClassPristine,e["\u0275nov"](n,93).ngClassDirty,e["\u0275nov"](n,93).ngClassValid,e["\u0275nov"](n,93).ngClassInvalid,e["\u0275nov"](n,93).ngClassPending),l(n,99,0,e["\u0275nov"](n,104).ngClassUntouched,e["\u0275nov"](n,104).ngClassTouched,e["\u0275nov"](n,104).ngClassPristine,e["\u0275nov"](n,104).ngClassDirty,e["\u0275nov"](n,104).ngClassValid,e["\u0275nov"](n,104).ngClassInvalid,e["\u0275nov"](n,104).ngClassPending),l(n,109,0,e["\u0275inlineInterpolate"](1,"",u.modal_pretrainingmark,""),e["\u0275nov"](n,114).ngClassUntouched,e["\u0275nov"](n,114).ngClassTouched,e["\u0275nov"](n,114).ngClassPristine,e["\u0275nov"](n,114).ngClassDirty,e["\u0275nov"](n,114).ngClassValid,e["\u0275nov"](n,114).ngClassInvalid,e["\u0275nov"](n,114).ngClassPending)})}function R(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,4,"span",[["class","grey-font"]],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,1,"button",[["class","btn btn-primary input-block-level form-control edit-button"],["type","button"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.open(e["\u0275nov"](l.parent.parent,14),l.parent.context.$implicit)&&t),t},null,null)),(l()(),e["\u0275eld"](2,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-pencil"]],null,null,null,null,null)),(l()(),e["\u0275eld"](3,0,null,null,1,"button",[["class","btn btn-danger"],["type","button"]],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.disable_button_click(l.parent.context.$implicit,"disabled")&&e),e},null,null)),(l()(),e["\u0275ted"](-1,null,["Disable"]))],null,null)}function w(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,2,"span",[["class","grey-font"]],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,1,"button",[["class","btn btn-primary"],["type","button"]],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.disable_button_click(l.parent.context.$implicit,"active")&&e),e},null,null)),(l()(),e["\u0275ted"](-1,null,["Enable"]))],null,null)}function S(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,26,"tr",[],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),e["\u0275eld"](2,0,null,null,1,"span",[["class","bold-font"]],null,null,null,null,null)),(l()(),e["\u0275ted"](3,null,["",""])),(l()(),e["\u0275eld"](4,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e["\u0275ted"](5,null,["",""])),(l()(),e["\u0275eld"](6,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e["\u0275ted"](7,null,["",""])),(l()(),e["\u0275eld"](8,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e["\u0275ted"](9,null,["",""])),(l()(),e["\u0275eld"](10,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e["\u0275ted"](11,null,["",""])),(l()(),e["\u0275eld"](12,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e["\u0275ted"](13,null,["",""])),(l()(),e["\u0275eld"](14,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),e["\u0275ted"](15,null,["",""])),e["\u0275ppd"](16,2),(l()(),e["\u0275eld"](17,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e["\u0275ted"](18,null,["",""])),(l()(),e["\u0275eld"](19,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e["\u0275ted"](20,null,["",""])),(l()(),e["\u0275eld"](21,0,null,null,5,"td",[],null,null,null,null,null)),(l()(),e["\u0275eld"](22,0,null,null,4,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](23,0,null,null,3,"div",[],null,null,null,null,null)),(l()(),e["\u0275and"](16777216,null,null,1,null,R)),e["\u0275did"](25,16384,null,0,r.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"],ngIfElse:[1,"ngIfElse"]},null),(l()(),e["\u0275and"](0,[["disabledUsertype",2]],null,0,null,w))],function(l,n){l(n,25,0,"active"==n.context.$implicit.status,e["\u0275nov"](n,26))},function(l,n){l(n,3,0,n.context.$implicit.teachername),l(n,5,0,n.context.$implicit.qualification),l(n,7,0,n.context.$implicit.contactno),l(n,9,0,n.context.$implicit.address),l(n,11,0,n.context.$implicit.special_initiatives),l(n,13,0,n.context.$implicit.aspirations);var u=e["\u0275unv"](n,15,0,l(n,16,0,e["\u0275nov"](n.parent,0),n.context.$implicit.center_start_date,"mediumDate"));l(n,15,0,u),l(n,18,0,n.context.$implicit.preprogram_training_mark),l(n,20,0,n.context.$implicit.status)})}function M(l){return e["\u0275vid"](0,[e["\u0275pid"](0,r.DatePipe,[e.LOCALE_ID]),(l()(),e["\u0275eld"](1,0,null,null,68,"div",[],[[24,"@routerTransition",0]],null,null,null,null)),(l()(),e["\u0275eld"](2,0,null,null,67,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](3,0,null,null,66,"div",[["class","col col-xl-12 col-lg-12"]],null,null,null,null,null)),(l()(),e["\u0275eld"](4,0,null,null,65,"div",[["class","card mb-3"]],null,null,null,null,null)),(l()(),e["\u0275eld"](5,0,null,null,9,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),e["\u0275eld"](6,0,null,null,8,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](7,0,null,null,2,"div",[["class","col col-xl-4 col-lg-4"]],null,null,null,null,null)),(l()(),e["\u0275eld"](8,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["TEACHER PROFILE"])),(l()(),e["\u0275eld"](10,0,null,null,4,"div",[["class","col"]],null,null,null,null,null)),(l()(),e["\u0275eld"](11,0,null,null,2,"button",[["class","btn btn-sm btn-primary float-right"],["type","button"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.open(e["\u0275nov"](l,14),null)&&t),t},null,null)),(l()(),e["\u0275eld"](12,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-user-plus"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\xa0\xa0\xa0Add Teacher Profile"])),(l()(),e["\u0275and"](0,[["content",2]],null,0,null,k)),(l()(),e["\u0275eld"](15,0,null,null,54,"div",[["class","card-body table-responsive"]],null,null,null,null,null)),(l()(),e["\u0275eld"](16,0,null,null,2,"div",[["class","loading_indicator"],["id","loading_indicator"]],[[8,"hidden",0]],null,null,null,null)),(l()(),e["\u0275eld"](17,0,null,null,1,"span",[["class",""]],null,null,null,null,null)),(l()(),e["\u0275eld"](18,0,null,null,0,"img",[["alt","Loading. Please wait..."],["src","assets/images/loader3.gif"]],null,null,null,null,null)),(l()(),e["\u0275eld"](19,0,null,null,50,"table",[["class","table table-striped"]],null,null,null,null,null)),e["\u0275did"](20,802816,[["mf",4]],0,s.DataTable,[e.IterableDiffers],{inputData:[0,"inputData"],rowsOnPage:[1,"rowsOnPage"]},null),(l()(),e["\u0275eld"](21,0,null,null,40,"thead",[],null,null,null,null,null)),(l()(),e["\u0275eld"](22,0,null,null,39,"tr",[],null,null,null,null,null)),(l()(),e["\u0275eld"](23,0,null,null,4,"th",[["style","width: 20%"]],null,null,null,null,null)),(l()(),e["\u0275eld"](24,0,null,null,0,"input",[["type","text"]],null,[[null,"keyup"]],function(l,n,u){var e=!0;return"keyup"===n&&(e=!1!==l.component.search(u.target.value)&&e),e},null,null)),(l()(),e["\u0275eld"](25,0,null,null,2,"mfDefaultSorter",[["by","teachername"]],null,null,null,c.b,c.a)),e["\u0275did"](26,114688,null,0,p.DefaultSorter,[s.DataTable],{sortBy:[0,"sortBy"]},null),(l()(),e["\u0275ted"](-1,0,["Teacher Name"])),(l()(),e["\u0275eld"](28,0,null,null,3,"th",[["style","width: 5%"]],null,null,null,null,null)),(l()(),e["\u0275eld"](29,0,null,null,2,"mfDefaultSorter",[["by","qualification"]],null,null,null,c.b,c.a)),e["\u0275did"](30,114688,null,0,p.DefaultSorter,[s.DataTable],{sortBy:[0,"sortBy"]},null),(l()(),e["\u0275ted"](-1,0,["Qualification"])),(l()(),e["\u0275eld"](32,0,null,null,3,"th",[["style","width: 10%"]],null,null,null,null,null)),(l()(),e["\u0275eld"](33,0,null,null,2,"mfDefaultSorter",[["by",""]],null,null,null,c.b,c.a)),e["\u0275did"](34,114688,null,0,p.DefaultSorter,[s.DataTable],{sortBy:[0,"sortBy"]},null),(l()(),e["\u0275ted"](-1,0,["Contact No."])),(l()(),e["\u0275eld"](36,0,null,null,3,"th",[["style","width: 10%"]],null,null,null,null,null)),(l()(),e["\u0275eld"](37,0,null,null,2,"mfDefaultSorter",[["by","address"]],null,null,null,c.b,c.a)),e["\u0275did"](38,114688,null,0,p.DefaultSorter,[s.DataTable],{sortBy:[0,"sortBy"]},null),(l()(),e["\u0275ted"](-1,0,["Address"])),(l()(),e["\u0275eld"](40,0,null,null,3,"th",[["style","width: 10%"]],null,null,null,null,null)),(l()(),e["\u0275eld"](41,0,null,null,2,"mfDefaultSorter",[["by",""]],null,null,null,c.b,c.a)),e["\u0275did"](42,114688,null,0,p.DefaultSorter,[s.DataTable],{sortBy:[0,"sortBy"]},null),(l()(),e["\u0275ted"](-1,0,["Sp. initiatives"])),(l()(),e["\u0275eld"](44,0,null,null,3,"th",[["style","width: 10%"]],null,null,null,null,null)),(l()(),e["\u0275eld"](45,0,null,null,2,"mfDefaultSorter",[["by",""]],null,null,null,c.b,c.a)),e["\u0275did"](46,114688,null,0,p.DefaultSorter,[s.DataTable],{sortBy:[0,"sortBy"]},null),(l()(),e["\u0275ted"](-1,0,["Aspirations"])),(l()(),e["\u0275eld"](48,0,null,null,3,"th",[["style","width: 10%"]],null,null,null,null,null)),(l()(),e["\u0275eld"](49,0,null,null,2,"mfDefaultSorter",[["by","center_start_date"]],null,null,null,c.b,c.a)),e["\u0275did"](50,114688,null,0,p.DefaultSorter,[s.DataTable],{sortBy:[0,"sortBy"]},null),(l()(),e["\u0275ted"](-1,0,["Start date"])),(l()(),e["\u0275eld"](52,0,null,null,3,"th",[["style","width: 5%"]],null,null,null,null,null)),(l()(),e["\u0275eld"](53,0,null,null,2,"mfDefaultSorter",[["by","preprogram_training_mark"]],null,null,null,c.b,c.a)),e["\u0275did"](54,114688,null,0,p.DefaultSorter,[s.DataTable],{sortBy:[0,"sortBy"]},null),(l()(),e["\u0275ted"](-1,0,["Pre-training mark"])),(l()(),e["\u0275eld"](56,0,null,null,3,"th",[["style","width: 5%"]],null,null,null,null,null)),(l()(),e["\u0275eld"](57,0,null,null,2,"mfDefaultSorter",[["by","status"]],null,null,null,c.b,c.a)),e["\u0275did"](58,114688,null,0,p.DefaultSorter,[s.DataTable],{sortBy:[0,"sortBy"]},null),(l()(),e["\u0275ted"](-1,0,["Status"])),(l()(),e["\u0275eld"](60,0,null,null,1,"th",[["style","width: 15%"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" Action "])),(l()(),e["\u0275eld"](62,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),e["\u0275and"](16777216,null,null,1,null,S)),e["\u0275did"](64,278528,null,0,r.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),e["\u0275eld"](65,0,null,null,4,"tfoot",[],null,null,null,null,null)),(l()(),e["\u0275eld"](66,0,null,null,3,"tr",[],null,null,null,null,null)),(l()(),e["\u0275eld"](67,0,null,null,2,"td",[["colspan","4"]],null,null,null,null,null)),(l()(),e["\u0275eld"](68,0,null,null,1,"mfBootstrapPaginator",[],null,null,null,g.b,g.a)),e["\u0275did"](69,573440,null,0,m.BootstrapPaginator,[],null,null)],function(l,n){l(n,20,0,n.component.data,4),l(n,26,0,"teachername"),l(n,30,0,"qualification"),l(n,34,0,""),l(n,38,0,"address"),l(n,42,0,""),l(n,46,0,""),l(n,50,0,"center_start_date"),l(n,54,0,"preprogram_training_mark"),l(n,58,0,"status"),l(n,64,0,e["\u0275nov"](n,20).data)},function(l,n){var u=n.component;l(n,1,0,void 0),l(n,16,0,u.hideLoading_indicator)})}function T(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"app-teacherprofile",[],null,null,null,M,D)),e["\u0275did"](1,114688,null,0,C,[f.z,x.l,y],null,null)],function(l,n){l(n,1,0)},null)}var I=e["\u0275ccf"]("app-teacherprofile",C,T,{},{},[]),P=function(){return function(){}}(),E=u("+Sv0"),O=u("kahr");u.d(n,"TeacherprofileModuleNgFactory",function(){return j});var j=e["\u0275cmf"](t,[],function(l){return e["\u0275mod"]([e["\u0275mpd"](512,e.ComponentFactoryResolver,e["\u0275CodegenComponentFactoryResolver"],[[8,[o.a,I]],[3,e.ComponentFactoryResolver],e.NgModuleRef]),e["\u0275mpd"](4608,r.NgLocalization,r.NgLocaleLocalization,[e.LOCALE_ID,[2,r["\u0275angular_packages_common_common_a"]]]),e["\u0275mpd"](4608,a.v,a.v,[]),e["\u0275mpd"](4608,a.d,a.d,[]),e["\u0275mpd"](4608,y,y,[_.c]),e["\u0275mpd"](1073742336,r.CommonModule,r.CommonModule,[]),e["\u0275mpd"](1073742336,x.o,x.o,[[2,x.u],[2,x.l]]),e["\u0275mpd"](1073742336,P,P,[]),e["\u0275mpd"](1073742336,E.a,E.a,[]),e["\u0275mpd"](1073742336,O.DataTableModule,O.DataTableModule,[]),e["\u0275mpd"](1073742336,a.s,a.s,[]),e["\u0275mpd"](1073742336,a.g,a.g,[]),e["\u0275mpd"](1073742336,a.p,a.p,[]),e["\u0275mpd"](1073742336,d.f,d.f,[]),e["\u0275mpd"](1073742336,t,t,[]),e["\u0275mpd"](1024,x.j,function(){return[[{path:"",component:C}]]},[])])})}}]);