(window.webpackJsonp=window.webpackJsonp||[]).push([[71],{vOR1:function(l,n,e){"use strict";e.r(n);var t=e("CcnG"),u=function(){return function(){}}(),s=e("pMnS"),i=e("gIcY"),o=e("Ip0R"),a=e("U0Oa"),r=e("ERWf"),d=e("0km3"),c=e("oaor"),p=e("q56F"),h=e("FcHb"),f=e("V5lK"),g=e("t/Na"),m=e("cxbk").a.baseUrl,y=function(){function l(l){this.http=l}return l.prototype.getallusers=function(){return this.http.get(m+"getalluser/",{headers:(new g.h).set("Content-Type","application/json")})},l.prototype.getallusersession=function(){return this.http.get(m+"getallusersession",{headers:(new g.h).set("Content-Type","application/json")})},l.prototype.getusersessionbyuserid=function(l){return this.http.get(m+"getusersessionbyuserid/"+l,{headers:(new g.h).set("Content-Type","application/json")})},l.prototype.getusersessionbydate=function(l){return this.http.get(m+"getusersessionbydate/"+l,{headers:(new g.h).set("Content-Type","application/json")})},l.prototype.getusersessionbyuseriddate=function(l,n){return this.http.get(m+"getusersessionbyuseriddate/"+l+"/"+n,{headers:(new g.h).set("Content-Type","application/json")})},l.ngInjectableDef=t.defineInjectable({factory:function(){return new l(t.inject(g.c))},token:l,providedIn:"root"}),l}(),v=function(){function l(l,n,e,t,u){this.modalService=l,this.formBuilder=n,this.translate=e,this.router=t,this.usersessionService=u,this.minDate=new Date("01/01/2015"),this.maxDate=new Date,this.dateValue=new Date,this.selected_date=new Date,this.all_usersessions=[],this.selected_userid="",this.selected_username="",this.hide_datefield=!1,this.hideLoading_indicator=!0}return l.prototype.ngOnInit=function(){this.hideLoading_indicator=!1,this.getAllUsers(),this.getAllUserSessions()},l.prototype.getAllUsers=function(){var l=this;this.hideLoading_indicator=!1,this.usersessionService.getallusers().subscribe(function(n){l.all_users=n,l.hideLoading_indicator=!0},function(l){},function(){})},l.prototype.onselect_usrs_select=function(l){var n=l.target.options,e=n.selectedIndex,t=n[e].text;this.selected_userid=n[e].value,this.selected_username=t,console.log("--\x3eSelected userid= "+this.selected_userid+"   username= "+this.selected_username)},l.prototype.datepicker_onchange=function(l){this.selected_date=new Date(l.value),console.log("###selected_date: "+this.selected_date)},l.prototype.checkbox_onchange=function(l){console.log("###Checkbox checked: "+l),this.hide_datefield=!l},l.prototype.getusersessionbyuseriddate=function(){null==this.selected_userid||null==this.selected_userid||""==this.selected_userid?this.hide_datefield?this.getAllUserSessions():this.getUserSessionsByDate():this.hide_datefield?this.getUserSessionsByUserid():this.getAllUserSessionsByUseridDate()},l.prototype.getAllUserSessions=function(){var l=this;this.usersessionService.getallusersession().subscribe(function(n){l.filterData(n),l.data=l.all_usersessions,l.hideLoading_indicator=!0},function(l){},function(){})},l.prototype.getUserSessionsByUserid=function(){var l=this;this.usersessionService.getusersessionbyuserid(this.selected_userid).subscribe(function(n){l.filterData(n),l.data=l.all_usersessions,l.hideLoading_indicator=!0},function(l){},function(){})},l.prototype.getUserSessionsByDate=function(){var l=this;this.usersessionService.getusersessionbydate(this.selected_date).subscribe(function(n){l.filterData(n),l.data=l.all_usersessions,l.hideLoading_indicator=!0},function(l){},function(){})},l.prototype.getAllUserSessionsByUseridDate=function(){var l=this;this.usersessionService.getusersessionbyuseriddate(this.selected_userid,this.selected_date).subscribe(function(n){l.filterData(n),l.data=l.all_usersessions,l.hideLoading_indicator=!0},function(l){},function(){})},l.prototype.filterData=function(l){var n=this;this.all_usersessions=[],Object.keys(l).forEach(function(e){var t=l[e].userid,u=l[e].username,s=l[e].checkintime,i=l[e].checkouttime,o=n.calculateDuration(new Date(s),new Date(i));n.all_usersessions.push({userid:t,username:u,checkintime:s,checkouttime:i,duration:o,currentdate:l[e].currentdate})}),console.log("all user session: "+JSON.stringify(this.all_usersessions))},l.prototype.calculateDuration=function(l,n){n<l&&n.setDate(n.getDate()+1);var e=n-l,t=Math.floor(e/1e3/60/60);e-=1e3*t*60*60;var u=Math.floor(e/1e3/60);e-=1e3*u*60;var s=Math.floor(e/1e3);return e-=1e3*s,t+" Hour(s): "+u+" Min(s): "+s+" Sec(s)"},l}(),b=e("4GxJ"),_=e("A7o+"),D=e("ZYCi"),x=t["\u0275crt"]({encapsulation:0,styles:[[".table[_ngcontent-%COMP%]{width:100%}.table-striped[_ngcontent-%COMP%]{font-size:12px!important;color:#2e2ef9;font-family:Arial}.table-striped[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{font-size:11px!important;font-weight:700;color:#636161;font-family:'Arial black'}.bold-font[_ngcontent-%COMP%]{font-size:11px!important;font-weight:700;color:#2e2ef9;font-family:Arial}.grey-font[_ngcontent-%COMP%]{color:#6b6a6a;font-size:10px}.modal-footer[_ngcontent-%COMP%]{border-top:1px solid #848484;background-color:#c3c3c3}.btn[_ngcontent-%COMP%]{border-radius:1.25rem}.modal-text[_ngcontent-%COMP%]{font-size:22px;color:#505050}.warning-icon[_ngcontent-%COMP%]{width:40px;height:40px;margin-left:40px}.validation-error-message[_ngcontent-%COMP%]{color:red;font-size:10px;font-weight:700}.div_scroll[_ngcontent-%COMP%]{height:250px;overflow-y:scroll;overflow-x:hidden}.chk[_ngcontent-%COMP%]{margin-top:5px;width:30px;height:30px}"]],data:{animation:[{type:7,name:"routerTransition",definitions:[],options:{}}]}});function C(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,3,"option",[],null,null,null,null,null)),t["\u0275did"](1,147456,null,0,i.o,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),t["\u0275did"](2,147456,null,0,i.x,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](3,null,["",""]))],function(l,n){l(n,1,0,t["\u0275inlineInterpolate"](1,"",n.context.$implicit.userid,"")),l(n,2,0,t["\u0275inlineInterpolate"](1,"",n.context.$implicit.userid,""))},function(l,n){l(n,3,0,n.context.$implicit.username)})}function w(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,18,"tr",[],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),t["\u0275eld"](2,0,null,null,1,"span",[["class","bold-font"]],null,null,null,null,null)),(l()(),t["\u0275ted"](3,null,["",""])),(l()(),t["\u0275eld"](4,0,null,null,3,"td",[],null,null,null,null,null)),(l()(),t["\u0275eld"](5,0,null,null,2,"span",[["class","grey-font"]],null,null,null,null,null)),(l()(),t["\u0275ted"](6,null,["",""])),t["\u0275ppd"](7,2),(l()(),t["\u0275eld"](8,0,null,null,3,"td",[],null,null,null,null,null)),(l()(),t["\u0275eld"](9,0,null,null,2,"span",[["class","grey-font"]],null,null,null,null,null)),(l()(),t["\u0275ted"](10,null,["",""])),t["\u0275ppd"](11,2),(l()(),t["\u0275eld"](12,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),t["\u0275eld"](13,0,null,null,1,"span",[["class","grey-font"]],null,null,null,null,null)),(l()(),t["\u0275ted"](14,null,["",""])),(l()(),t["\u0275eld"](15,0,null,null,3,"td",[],null,null,null,null,null)),(l()(),t["\u0275eld"](16,0,null,null,2,"span",[["class","grey-font"]],null,null,null,null,null)),(l()(),t["\u0275ted"](17,null,["",""])),t["\u0275ppd"](18,2)],null,function(l,n){l(n,3,0,n.context.$implicit.username);var e=t["\u0275unv"](n,6,0,l(n,7,0,t["\u0275nov"](n.parent,0),n.context.$implicit.checkintime,"hh:mm a"));l(n,6,0,e);var u=t["\u0275unv"](n,10,0,l(n,11,0,t["\u0275nov"](n.parent,0),n.context.$implicit.checkouttime,"hh:mm a"));l(n,10,0,u),l(n,14,0,n.context.$implicit.duration);var s=t["\u0275unv"](n,17,0,l(n,18,0,t["\u0275nov"](n.parent,0),n.context.$implicit.currentdate,"dd/MM/yyyy"));l(n,17,0,s)})}function M(l){return t["\u0275vid"](0,[t["\u0275pid"](0,o.DatePipe,[t.LOCALE_ID]),(l()(),t["\u0275eld"](1,0,null,null,67,"div",[],[[24,"@routerTransition",0]],null,null,null,null)),(l()(),t["\u0275eld"](2,0,null,null,66,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](3,0,null,null,65,"div",[["class","col col-xl-12 col-lg-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](4,0,null,null,64,"div",[["class","card mb-3"]],null,null,null,null,null)),(l()(),t["\u0275eld"](5,0,null,null,27,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),t["\u0275eld"](6,0,null,null,3,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](7,0,null,null,2,"div",[["class","col col-xl-4 col-lg-4"]],null,null,null,null,null)),(l()(),t["\u0275eld"](8,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["USER SESSION"])),(l()(),t["\u0275eld"](10,0,null,null,22,"div",[["class","col"]],null,null,null,null,null)),(l()(),t["\u0275eld"](11,0,null,null,21,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](12,0,null,null,7,"div",[["class","col col-xl-3 col-lg-3"]],null,null,null,null,null)),(l()(),t["\u0275eld"](13,0,null,null,6,"select",[["class","form-control"],["placeholder","Manager"],["value",""]],null,[[null,"change"]],function(l,n,e){var t=!0;return"change"===n&&(t=!1!==l.component.onselect_usrs_select(e)&&t),t},null,null)),(l()(),t["\u0275eld"](14,0,null,null,3,"option",[["value",""]],null,null,null,null,null)),t["\u0275did"](15,147456,null,0,i.o,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),t["\u0275did"](16,147456,null,0,i.x,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](-1,null,["-- Select User --"])),(l()(),t["\u0275and"](16777216,null,null,1,null,C)),t["\u0275did"](19,278528,null,0,o.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),t["\u0275eld"](20,0,null,null,2,"div",[["class","col col-xl-2 col-lg-2"]],null,null,null,null,null)),(l()(),t["\u0275eld"](21,0,null,null,0,"input",[["checked",""],["class","chk"],["type","checkbox"]],null,[[null,"change"]],function(l,n,e){var t=!0;return"change"===n&&(t=!1!==l.component.checkbox_onchange(e.target.checked)&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["Date "])),(l()(),t["\u0275eld"](23,0,null,null,6,"div",[["class","col col-xl-3 col-lg-3"]],[[8,"hidden",0]],null,null,null,null)),(l()(),t["\u0275eld"](24,16777216,null,null,5,"ejs-datepicker",[["format","dd-MM-yyyy"],["id","datepicker"],["placeholder","Select a date"],["strictMode","true"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"change"],[null,"ngModelChange"]],function(l,n,e){var t=!0,u=l.component;return"change"===n&&(t=!1!==u.datepicker_onchange(e)&&t),"ngModelChange"===n&&(t=!1!==(u.selected_date=e)&&t),t},a.b,a.a)),t["\u0275did"](25,6537216,null,0,r.e,[t.ElementRef,t.Renderer2,t.ViewContainerRef,t.Injector],{format:[0,"format"],max:[1,"max"],min:[2,"min"],placeholder:[3,"placeholder"],strictMode:[4,"strictMode"],value:[5,"value"]},{change:"change"}),t["\u0275prd"](1024,null,i.i,function(l){return[l]},[r.e]),t["\u0275did"](27,671744,null,0,i.n,[[8,null],[8,null],[8,null],[6,i.i]],{model:[0,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,i.j,null,[i.n]),t["\u0275did"](29,16384,null,0,i.k,[[4,i.j]],null,null),(l()(),t["\u0275eld"](30,0,null,null,2,"div",[["class","col col-xl-4 col-lg-4"]],null,null,null,null,null)),(l()(),t["\u0275eld"](31,0,null,null,1,"button",[["class","btn btn-sm btn-primary"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.getusersessionbyuseriddate()&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["\xa0\xa0\xa0Filter\xa0\xa0\xa0"])),(l()(),t["\u0275eld"](33,0,null,null,35,"div",[["class","card-body table-responsive"]],null,null,null,null,null)),(l()(),t["\u0275eld"](34,0,null,null,2,"div",[["class","loading_indicator"],["id","loading_indicator"]],[[8,"hidden",0]],null,null,null,null)),(l()(),t["\u0275eld"](35,0,null,null,1,"span",[["class",""]],null,null,null,null,null)),(l()(),t["\u0275eld"](36,0,null,null,0,"img",[["alt","Loading. Please wait..."],["src","assets/images/loader3.gif"]],null,null,null,null,null)),(l()(),t["\u0275eld"](37,0,null,null,31,"table",[["class","table table-striped"]],null,null,null,null,null)),t["\u0275did"](38,802816,[["mf",4]],0,d.DataTable,[t.IterableDiffers],{inputData:[0,"inputData"],rowsOnPage:[1,"rowsOnPage"]},null),(l()(),t["\u0275eld"](39,0,null,null,21,"thead",[],null,null,null,null,null)),(l()(),t["\u0275eld"](40,0,null,null,20,"tr",[],null,null,null,null,null)),(l()(),t["\u0275eld"](41,0,null,null,3,"th",[["style","width: 20%"]],null,null,null,null,null)),(l()(),t["\u0275eld"](42,0,null,null,2,"mfDefaultSorter",[["by","Message"]],null,null,null,c.b,c.a)),t["\u0275did"](43,114688,null,0,p.DefaultSorter,[d.DataTable],{sortBy:[0,"sortBy"]},null),(l()(),t["\u0275ted"](-1,0,["User"])),(l()(),t["\u0275eld"](45,0,null,null,3,"th",[["style","width: 20%"]],null,null,null,null,null)),(l()(),t["\u0275eld"](46,0,null,null,2,"mfDefaultSorter",[["by","checkintime"]],null,null,null,c.b,c.a)),t["\u0275did"](47,114688,null,0,p.DefaultSorter,[d.DataTable],{sortBy:[0,"sortBy"]},null),(l()(),t["\u0275ted"](-1,0,["Checkin Time"])),(l()(),t["\u0275eld"](49,0,null,null,3,"th",[["style","width: 20%"]],null,null,null,null,null)),(l()(),t["\u0275eld"](50,0,null,null,2,"mfDefaultSorter",[["by","checkouttime"]],null,null,null,c.b,c.a)),t["\u0275did"](51,114688,null,0,p.DefaultSorter,[d.DataTable],{sortBy:[0,"sortBy"]},null),(l()(),t["\u0275ted"](-1,0,["Checkout Time"])),(l()(),t["\u0275eld"](53,0,null,null,3,"th",[["style","width: 20%"]],null,null,null,null,null)),(l()(),t["\u0275eld"](54,0,null,null,2,"mfDefaultSorter",[["by","Recipients"]],null,null,null,c.b,c.a)),t["\u0275did"](55,114688,null,0,p.DefaultSorter,[d.DataTable],{sortBy:[0,"sortBy"]},null),(l()(),t["\u0275ted"](-1,0,["Duration"])),(l()(),t["\u0275eld"](57,0,null,null,3,"th",[["style","width: 20%"]],null,null,null,null,null)),(l()(),t["\u0275eld"](58,0,null,null,2,"mfDefaultSorter",[["by","Recipients"]],null,null,null,c.b,c.a)),t["\u0275did"](59,114688,null,0,p.DefaultSorter,[d.DataTable],{sortBy:[0,"sortBy"]},null),(l()(),t["\u0275ted"](-1,0,["Date"])),(l()(),t["\u0275eld"](61,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,w)),t["\u0275did"](63,278528,null,0,o.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),t["\u0275eld"](64,0,null,null,4,"tfoot",[],null,null,null,null,null)),(l()(),t["\u0275eld"](65,0,null,null,3,"tr",[],null,null,null,null,null)),(l()(),t["\u0275eld"](66,0,null,null,2,"td",[["colspan","4"]],null,null,null,null,null)),(l()(),t["\u0275eld"](67,0,null,null,1,"mfBootstrapPaginator",[],null,null,null,h.b,h.a)),t["\u0275did"](68,573440,null,0,f.BootstrapPaginator,[],null,null)],function(l,n){var e=n.component;l(n,15,0,""),l(n,16,0,""),l(n,19,0,e.all_users),l(n,25,0,"dd-MM-yyyy",e.maxDate,e.minDate,"Select a date","true",e.dateValue),l(n,27,0,e.selected_date),l(n,38,0,e.data,4),l(n,43,0,"Message"),l(n,47,0,"checkintime"),l(n,51,0,"checkouttime"),l(n,55,0,"Recipients"),l(n,59,0,"Recipients"),l(n,63,0,t["\u0275nov"](n,38).data)},function(l,n){var e=n.component;l(n,1,0,void 0),l(n,23,0,e.hide_datefield),l(n,24,0,t["\u0275nov"](n,29).ngClassUntouched,t["\u0275nov"](n,29).ngClassTouched,t["\u0275nov"](n,29).ngClassPristine,t["\u0275nov"](n,29).ngClassDirty,t["\u0275nov"](n,29).ngClassValid,t["\u0275nov"](n,29).ngClassInvalid,t["\u0275nov"](n,29).ngClassPending),l(n,34,0,e.hideLoading_indicator)})}function k(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"app-usersession",[],null,null,null,M,x)),t["\u0275did"](1,114688,null,0,v,[b.z,i.d,_.j,D.l,y],null,null)],function(l,n){l(n,1,0)},null)}var S=t["\u0275ccf"]("app-usersession",v,k,{},{},[]),O=function(){return function(){}}(),R=e("+Sv0"),U=e("kahr");e.d(n,"UsersessionModuleNgFactory",function(){return P});var P=t["\u0275cmf"](u,[],function(l){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[s.a,S]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,o.NgLocalization,o.NgLocaleLocalization,[t.LOCALE_ID,[2,o["\u0275angular_packages_common_common_a"]]]),t["\u0275mpd"](4608,i.v,i.v,[]),t["\u0275mpd"](4608,i.d,i.d,[]),t["\u0275mpd"](4608,y,y,[g.c]),t["\u0275mpd"](1073742336,o.CommonModule,o.CommonModule,[]),t["\u0275mpd"](1073742336,D.o,D.o,[[2,D.u],[2,D.l]]),t["\u0275mpd"](1073742336,O,O,[]),t["\u0275mpd"](1073742336,R.a,R.a,[]),t["\u0275mpd"](1073742336,U.DataTableModule,U.DataTableModule,[]),t["\u0275mpd"](1073742336,i.s,i.s,[]),t["\u0275mpd"](1073742336,i.g,i.g,[]),t["\u0275mpd"](1073742336,i.p,i.p,[]),t["\u0275mpd"](1073742336,r.f,r.f,[]),t["\u0275mpd"](1073742336,u,u,[]),t["\u0275mpd"](1024,D.j,function(){return[[{path:"",component:v}]]},[])])})}}]);