(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{"3L+T":function(l,n,e){"use strict";e.r(n);var t=e("CcnG"),o=function(){return function(){}}(),u=e("pMnS"),a=e("Ip0R"),i=e("gIcY"),r=e("1BOH"),d=e("B233"),c=e("PSD3"),s=e.n(c),p=e("+z1p"),g=e("t/Na"),f=e("cxbk").a.baseUrl,h=function(){function l(l){this.http=l}return l.prototype.getworkshopdetails=function(l,n){return this.http.get(f+"getworkshopdetails/school_readiness/group_task/"+l+"/"+n,{headers:(new g.h).set("Content-Type","application/json")})},l.prototype.createworkshopdetails=function(l){return this.http.post(f+"createworkshopdetails",l,{headers:(new g.h).set("Content-Type","application/json"),responseType:"text"})},l.prototype.updateworkshopdetails=function(l,n){return this.http.put(f+"updateworkshopdetails/"+l,n,{headers:(new g.h).set("Content-Type","application/json"),responseType:"text"})},l.ngInjectableDef=t.defineInjectable({factory:function(){return new l(t.inject(g.c))},token:l,providedIn:"root"}),l}(),v=function(l,n,e,t){return new(e||(e=Promise))(function(o,u){function a(l){try{r(t.next(l))}catch(n){u(n)}}function i(l){try{r(t.throw(l))}catch(n){u(n)}}function r(l){l.done?o(l.value):new e(function(n){n(l.value)}).then(a,i)}r((t=t.apply(l,n||[])).next())})},_=function(l,n){var e,t,o,u,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return u={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u;function i(u){return function(i){return function(u){if(e)throw new TypeError("Generator is already executing.");for(;a;)try{if(e=1,t&&(o=2&u[0]?t.return:u[0]?t.throw||((o=t.return)&&o.call(t),0):t.next)&&!(o=o.call(t,u[1])).done)return o;switch(t=0,o&&(u=[2&u[0],o.value]),u[0]){case 0:case 1:o=u;break;case 4:return a.label++,{value:u[1],done:!1};case 5:a.label++,t=u[1],u=[0];continue;case 7:u=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===u[0]||2===u[0])){a=0;continue}if(3===u[0]&&(!o||u[1]>o[0]&&u[1]<o[3])){a.label=u[1];break}if(6===u[0]&&a.label<o[1]){a.label=o[1],o=u;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(u);break}o[2]&&a.ops.pop(),a.trys.pop();continue}u=n.call(l,a)}catch(i){u=[6,i],t=0}finally{e=o=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,i])}}},b=function(){function l(l,n,e){this.modalService=l,this.router=n,this.schoolgrouptaskService=e,this.content_value="",this.save_operation="save",this.record_id="",this.selected_language="",this.selected_prefLanguage="",this.Editor=p,this.content_value="",this.selected_language="",this.selected_prefLanguage="en",this.hideContent_div=!0,this.addContent_div=!1,this.backContent_div=!0}return l.prototype.prefLanguage_select_onchange=function(l){var n=l.target.options,e=n.selectedIndex,t=n[e].value;console.log("--\x3eSelected Opt Value= "+t+"   Text= "+n[e].text),this.selected_prefLanguage=t,this.load_record()},l.prototype.language_select_onchange=function(l){var n=l.target.options,e=n.selectedIndex,t=n[e].value;console.log("--\x3eSelected Opt Value= "+t+"   Text= "+n[e].text),this.selected_language=t},l.prototype.ngOnInit=function(){this.load_record()},l.prototype.load_record=function(){return v(this,void 0,void 0,function(){var l=this;return _(this,function(n){return this.schoolgrouptaskService.getworkshopdetails(this.selected_prefLanguage,"null").subscribe(function(n){console.log("### data: "+JSON.stringify(n)),l.workshopDetails=n,0!==Object.entries(n).length?(l.content_value=n[0].content,l.selected_language=n[0].language,l.record_id=n[0]._id,l.save_operation="update"):(l.content_value="No Contents",l.save_operation="save")},function(l){},function(){}),[2]})})},l.prototype.save_btn_click=function(){return v(this,void 0,void 0,function(){var l=this;return _(this,function(n){return null==this.content_value||null==this.content_value||""==this.content_value?s.a.fire("Data insufficient","Please add some text contents.","warning"):s.a.fire({title:"Are you sure?",text:"Do you want to save changes?",type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes"}).then(function(n){if(n.value){var e={wtype:"school_readiness",action:"group_task",language:l.selected_language,subject:"null",content:l.content_value};console.log("### this.save_operation: "+l.save_operation),"update"==l.save_operation?l.update_record(e):l.save_record(e)}}),[2]})})},l.prototype.save_record=function(l){return v(this,void 0,void 0,function(){var n=this;return _(this,function(e){return this.schoolgrouptaskService.createworkshopdetails(l).subscribe(function(l){console.log("###1 save data: "+JSON.stringify(l)),s.a.fire("Successful","Data saved successfully","success"),n.load_record()},function(l){},function(){}),[2]})})},l.prototype.update_record=function(l){return v(this,void 0,void 0,function(){var n=this;return _(this,function(e){return this.schoolgrouptaskService.updateworkshopdetails(this.record_id,l).subscribe(function(l){console.log("###1 update data: "+JSON.stringify(l)),s.a.fire("Successful","Data updated successfully","success"),n.load_record()},function(l){},function(){}),this.hideContent_div=!0,[2]})})},l}(),m=e("4GxJ"),x=e("ZYCi"),w=t["\u0275crt"]({encapsulation:0,styles:[["[_nghost-%COMP%]     .ck-editor__editable_inline{height:300px!important}[_nghost-%COMP%]     .tabset1 a.nav-link{color:green}[_nghost-%COMP%]     .tabset1 a.nav-link.active{color:#fff;background-color:#8a8aa9}.tab_content[_ngcontent-%COMP%]{padding:20px;border:1px solid #d7cece;-webkit-box-shadow:inset 1px 1px 0 0;box-shadow:inset 1px 1px 0 0;height:450px;overflow:auto}.pad25[_ngcontent-%COMP%]{padding:0 25px}.table-striped[_ngcontent-%COMP%]{font-size:12px!important;color:#2e2ef9;font-family:Arial}.table-striped[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{font-size:11px!important;font-weight:700;color:#636161;font-family:'Arial black'}.bold-font[_ngcontent-%COMP%]{font-weight:700;color:#2e2ef9;font-family:Arial}.modal-footer[_ngcontent-%COMP%]{border-top:1px solid #848484;background-color:#c3c3c3}.btn[_ngcontent-%COMP%]{border-radius:1.25rem}.modal-text[_ngcontent-%COMP%]{font-size:22px;color:#505050}.warning-icon[_ngcontent-%COMP%]{width:40px;height:40px;margin-left:40px}.validation-error-message[_ngcontent-%COMP%]{color:red;font-size:10px;font-weight:700}.delete-button[_ngcontent-%COMP%]{background-color:#ffffff00;color:red;font-size:20px;padding:0;border:none}.edit-button[_ngcontent-%COMP%]{background-color:#ffffff00;color:#00f;font-size:20px;padding:0;border:none}.area-width[_ngcontent-%COMP%]{width:100%;height:250px}.xbtn[_ngcontent-%COMP%]{float:right;font-weight:700;color:#fff;background:red;padding:1px 8px;border:1px solid #a5a4a4;border-radius:50%;cursor:pointer}.margintop30[_ngcontent-%COMP%]{margin-top:30px}.addbtn[_ngcontent-%COMP%]{color:#5bae5a;font-size:20px;padding:5px;text-align:center}.delbtn[_ngcontent-%COMP%]{color:#d97c6c;font-size:20px;padding:5px;text-align:center}.editbtn[_ngcontent-%COMP%]{color:#5bae5a;font-size:20px;padding:5px;text-align:center}.table50[_ngcontent-%COMP%]{width:100%}.image_preview_container[_ngcontent-%COMP%]{width:100%;height:300px;overflow:auto;white-space:nowrap}.image_preview[_ngcontent-%COMP%]{height:170px;width:140px;padding:10px;border:1px solid #bab3b3;display:inline-block;vertical-align:top;margin-right:20px;white-space:normal;-webkit-box-shadow:0 0 1px 1px grey;box-shadow:0 0 1px 1px grey}.image[_ngcontent-%COMP%]{height:150px;width:120px;cursor:pointer}"]],data:{animation:[{type:7,name:"routerTransition",definitions:[],options:{}}]}});function C(l){return t["\u0275vid"](0,[t["\u0275pid"](0,a.TitleCasePipe,[]),(l()(),t["\u0275eld"](1,0,null,null,61,"div",[],[[24,"@routerTransition",0]],null,null,null,null)),(l()(),t["\u0275eld"](2,0,null,null,60,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](3,0,null,null,59,"div",[["class","col col-xl-12 col-lg-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](4,0,null,null,58,"div",[["class","card mb-3"],["style","height: 600px;"]],null,null,null,null,null)),(l()(),t["\u0275eld"](5,0,null,null,5,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),t["\u0275eld"](6,0,null,null,4,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](7,0,null,null,2,"div",[["class","col col-xl-8 col-lg-8"]],null,null,null,null,null)),(l()(),t["\u0275eld"](8,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["School Readiness Group Task"])),(l()(),t["\u0275eld"](10,0,null,null,0,"div",[["class","col col-xl-4 col-lg-4"]],null,null,null,null,null)),(l()(),t["\u0275eld"](11,0,null,null,51,"div",[["class","card-body table-responsive"]],null,null,null,null,null)),(l()(),t["\u0275eld"](12,0,null,null,50,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](13,0,null,null,16,"div",[["class","col col-lg-3 col-xl-3"]],null,null,null,null,null)),(l()(),t["\u0275eld"](14,0,null,null,1,"span",[["class","bold-font"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Language"])),(l()(),t["\u0275eld"](16,0,null,null,13,"span",[],null,null,null,null,null)),(l()(),t["\u0275eld"](17,0,null,null,12,"select",[["class","form-control"],["id","selected_prefLanguage"]],[[8,"value",0]],[[null,"change"]],function(l,n,e){var t=!0;return"change"===n&&(t=!1!==l.component.prefLanguage_select_onchange(e)&&t),t},null,null)),(l()(),t["\u0275eld"](18,0,null,null,3,"option",[["value",""]],null,null,null,null,null)),t["\u0275did"](19,147456,null,0,i.o,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),t["\u0275did"](20,147456,null,0,i.x,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](-1,null,["Select"])),(l()(),t["\u0275eld"](22,0,null,null,3,"option",[["value","od"]],null,null,null,null,null)),t["\u0275did"](23,147456,null,0,i.o,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),t["\u0275did"](24,147456,null,0,i.x,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](-1,null,["Odia"])),(l()(),t["\u0275eld"](26,0,null,null,3,"option",[["value","en"]],null,null,null,null,null)),t["\u0275did"](27,147456,null,0,i.o,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),t["\u0275did"](28,147456,null,0,i.x,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](-1,null,["English"])),(l()(),t["\u0275eld"](30,0,null,null,32,"div",[["class","col col-lg-9 col-xl-9"]],null,null,null,null,null)),(l()(),t["\u0275eld"](31,0,null,null,31,"div",[["id","content_div"]],null,null,null,null,null)),(l()(),t["\u0275eld"](32,0,null,null,30,"div",[["class","pad25"]],null,null,null,null,null)),(l()(),t["\u0275eld"](33,0,null,null,16,"div",[],null,null,null,null,null)),(l()(),t["\u0275eld"](34,0,null,null,1,"span",[["class","bold-font"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Language"])),(l()(),t["\u0275eld"](36,0,null,null,13,"span",[],null,null,null,null,null)),(l()(),t["\u0275eld"](37,0,null,null,12,"select",[["class","form-control"],["id","selected_language"]],[[8,"value",0]],[[null,"change"]],function(l,n,e){var t=!0;return"change"===n&&(t=!1!==l.component.language_select_onchange(e)&&t),t},null,null)),(l()(),t["\u0275eld"](38,0,null,null,3,"option",[["value",""]],null,null,null,null,null)),t["\u0275did"](39,147456,null,0,i.o,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),t["\u0275did"](40,147456,null,0,i.x,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](-1,null,["Select"])),(l()(),t["\u0275eld"](42,0,null,null,3,"option",[["value","od"]],null,null,null,null,null)),t["\u0275did"](43,147456,null,0,i.o,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),t["\u0275did"](44,147456,null,0,i.x,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](-1,null,["Odia"])),(l()(),t["\u0275eld"](46,0,null,null,3,"option",[["value","en"]],null,null,null,null,null)),t["\u0275did"](47,147456,null,0,i.o,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),t["\u0275did"](48,147456,null,0,i.x,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](-1,null,["English"])),(l()(),t["\u0275eld"](50,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t["\u0275eld"](51,0,null,null,6,"div",[],null,null,null,null,null)),(l()(),t["\u0275eld"](52,0,null,null,5,"ckeditor",[],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"]],function(l,n,e){var t=!0;return"ngModelChange"===n&&(t=!1!==(l.component.content_value=e)&&t),t},r.b,r.a)),t["\u0275did"](53,4374528,null,0,d.a,[t.ElementRef,t.NgZone],{editor:[0,"editor"],data:[1,"data"]},null),t["\u0275prd"](1024,null,i.i,function(l){return[l]},[d.a]),t["\u0275did"](55,671744,null,0,i.n,[[8,null],[8,null],[8,null],[6,i.i]],{model:[0,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,i.j,null,[i.n]),t["\u0275did"](57,16384,null,0,i.k,[[4,i.j]],null,null),(l()(),t["\u0275eld"](58,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t["\u0275eld"](59,0,null,null,3,"div",[],null,null,null,null,null)),(l()(),t["\u0275eld"](60,0,null,null,2,"button",[["class","btn btn-primary float-right"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.save_btn_click()&&t),t},null,null)),(l()(),t["\u0275ted"](61,null,["\xa0\xa0\xa0","\xa0\xa0\xa0"])),t["\u0275ppd"](62,1)],function(l,n){var e=n.component;l(n,19,0,""),l(n,20,0,""),l(n,23,0,"od"),l(n,24,0,"od"),l(n,27,0,"en"),l(n,28,0,"en"),l(n,39,0,""),l(n,40,0,""),l(n,43,0,"od"),l(n,44,0,"od"),l(n,47,0,"en"),l(n,48,0,"en"),l(n,53,0,e.Editor,t["\u0275inlineInterpolate"](1,"",e.content_value,"")),l(n,55,0,e.content_value)},function(l,n){var e=n.component;l(n,1,0,void 0),l(n,17,0,t["\u0275inlineInterpolate"](1,"",e.selected_prefLanguage,"")),l(n,37,0,t["\u0275inlineInterpolate"](1,"",e.selected_language,"")),l(n,52,0,t["\u0275nov"](n,57).ngClassUntouched,t["\u0275nov"](n,57).ngClassTouched,t["\u0275nov"](n,57).ngClassPristine,t["\u0275nov"](n,57).ngClassDirty,t["\u0275nov"](n,57).ngClassValid,t["\u0275nov"](n,57).ngClassInvalid,t["\u0275nov"](n,57).ngClassPending);var o=t["\u0275unv"](n,61,0,l(n,62,0,t["\u0275nov"](n,0),e.save_operation));l(n,61,0,o)})}function y(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"app-schoolgrouptask",[],null,null,null,C,w)),t["\u0275did"](1,114688,null,0,b,[m.z,x.l,h],null,null)],function(l,n){l(n,1,0)},null)}var k=t["\u0275ccf"]("app-schoolgrouptask",b,y,{},{},[]),O=function(){return function(){}}(),M=e("+Sv0"),P=e("kahr"),R=e("5rxC");e.d(n,"SchoolgrouptaskModuleNgFactory",function(){return S});var S=t["\u0275cmf"](o,[],function(l){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[u.a,k]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,a.NgLocalization,a.NgLocaleLocalization,[t.LOCALE_ID,[2,a["\u0275angular_packages_common_common_a"]]]),t["\u0275mpd"](4608,i.v,i.v,[]),t["\u0275mpd"](4608,i.d,i.d,[]),t["\u0275mpd"](1073742336,a.CommonModule,a.CommonModule,[]),t["\u0275mpd"](1073742336,x.o,x.o,[[2,x.u],[2,x.l]]),t["\u0275mpd"](1073742336,O,O,[]),t["\u0275mpd"](1073742336,M.a,M.a,[]),t["\u0275mpd"](1073742336,P.DataTableModule,P.DataTableModule,[]),t["\u0275mpd"](1073742336,m.l,m.l,[]),t["\u0275mpd"](1073742336,m.W,m.W,[]),t["\u0275mpd"](1073742336,i.s,i.s,[]),t["\u0275mpd"](1073742336,i.g,i.g,[]),t["\u0275mpd"](1073742336,i.p,i.p,[]),t["\u0275mpd"](1073742336,d.b,d.b,[]),t["\u0275mpd"](1073742336,R.b,R.b,[]),t["\u0275mpd"](1073742336,o,o,[]),t["\u0275mpd"](1024,x.j,function(){return[[{path:"",component:b}]]},[])])})}}]);