(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{MPAC:function(l,n,e){"use strict";e.r(n);var t=e("CcnG"),u=function(){return function(){}}(),o=e("pMnS"),i=e("gIcY"),s=e("Ip0R"),d=e("0km3"),a=e("4GxJ"),r=e("t/Na"),c=e("cxbk").a.baseUrl,p=function(){function l(l){this.http=l}return l.prototype.getbaselinetestquestionset=function(l){return this.http.post(c+"getbaselinetestquestionset",l,{headers:(new r.h).set("Content-Type","application/json")})},l.prototype.createnewbaselinetest=function(l){return this.http.post(c+"createnewbaselinetest",l,{headers:(new r.h).set("Content-Type","application/json")})},l.prototype.updatebaselinetestquestionset=function(l,n){return this.http.put(c+"updatebaselinetestquestionset/"+l,n,{headers:(new r.h).set("Content-Type","application/json")})},l.prototype.addbaselinetestquestionset=function(l){return this.http.put(c+"addbaselinetestquestionset",l,{headers:(new r.h).set("Content-Type","application/json")})},l.prototype.deletetchassessment=function(l){return this.http.delete(c+"updatebaselinetestquestionset/"+l,{headers:(new r.h).set("Content-Type","application/json")})},l.ngInjectableDef=t.defineInjectable({factory:function(){return new l(t.inject(r.c))},token:l,providedIn:"root"}),l}(),h=e("PSD3"),f=e.n(h),g=function(l,n,e,t){return new(e||(e=Promise))(function(u,o){function i(l){try{d(t.next(l))}catch(n){o(n)}}function s(l){try{d(t.throw(l))}catch(n){o(n)}}function d(l){l.done?u(l.value):new e(function(n){n(l.value)}).then(i,s)}d((t=t.apply(l,n||[])).next())})},v=function(l,n){var e,t,u,o,i={label:0,sent:function(){if(1&u[0])throw u[1];return u[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(e)throw new TypeError("Generator is already executing.");for(;i;)try{if(e=1,t&&(u=2&o[0]?t.return:o[0]?t.throw||((u=t.return)&&u.call(t),0):t.next)&&!(u=u.call(t,o[1])).done)return u;switch(t=0,u&&(o=[2&o[0],u.value]),o[0]){case 0:case 1:u=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,t=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(u=(u=i.trys).length>0&&u[u.length-1])&&(6===o[0]||2===o[0])){i=0;continue}if(3===o[0]&&(!u||o[1]>u[0]&&o[1]<u[3])){i.label=o[1];break}if(6===o[0]&&i.label<u[1]){i.label=u[1],u=o;break}if(u&&i.label<u[2]){i.label=u[2],i.ops.push(o);break}u[2]&&i.ops.pop(),i.trys.pop();continue}o=n.call(l,i)}catch(s){o=[6,s],t=0}finally{e=u=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}},_=function(){function l(l,n,e){this.router=l,this.baselinetestService=n,this.modalService=e,this.data=[],this.level_list=[],this.baseline_list=[],this.questionset=[],this.record_id="",this.id="",this.selected_preflanguage="",this.selected_program="",this.selected_class="",this.selected_subject="",this.selected_level="",this.question="",this.save_operation="",this.selected_program="",this.selected_class="",this.selected_subject="",this.selected_level="",this.question="",this.hideLoading_indicator=!0,this.hideContent_div=!0,this.hideSubject_select=!1}return l.prototype.ngOnInit=function(){},l.prototype.load_record=function(l,n,e,t){return g(this,void 0,void 0,function(){var u,o=this;return v(this,function(i){return null!=l&&null!=l&&""!=l&&null!=n&&null!=n&&""!=n&&null!=e&&null!=e&&""!=e&&null!=t&&null!=t&&""!=t?(u={preferedlanguage:l,program:n,subject:e,level:t},this.hideLoading_indicator=!1,this.hideContent_div=!0,this.baselinetestService.getbaselinetestquestionset(u).subscribe(function(l){console.log("### data: "+JSON.stringify(l)),o.baseline_list=l,Object.keys(l).length>0?(o.save_operation="update",o.record_id=l[0]._id,o.questionset=l[0].questionset,o.questionset=null==o.questionset||null==o.questionset?[]:o.questionset):(o.save_operation="save",o.questionset=[]),o.data=l,o.hideLoading_indicator=!0,o.hideContent_div=!1},function(l){},function(){})):(this.question="",this.hideLoading_indicator=!0,this.hideContent_div=!0),[2]})})},l.prototype.preflanguage_select_onchange=function(l){var n=l.target.options,e=n.selectedIndex,t=n[e].value;console.log("--\x3eSelected Opt Value= "+t+"   Text= "+n[e].text),this.selected_preflanguage=t,this.load_record(this.selected_preflanguage,this.selected_program,this.selected_subject,this.selected_level)},l.prototype.program_select_onchange=function(l){var n=l.target.options,e=n.selectedIndex,t=n[e].value;console.log("--\x3eSelected Opt Value= "+t+"   Text= "+n[e].text),this.selected_program=t,"ece"==this.selected_program?(this.selected_subject="na",this.level_list=["1","2","3"],this.hideClass_select=!0,this.hideSubject_select=!0,this.hideContent_div=!0):(this.selected_subject="",this.level_list=["1","2","3","4","5"],this.hideClass_select=!1,this.hideSubject_select=!1,this.hideContent_div=!1),this.selected_level="",this.load_record(this.selected_preflanguage,this.selected_program,this.selected_subject,this.selected_level)},l.prototype.class_select_onchange=function(l){var n=event.target.options,e=n.selectedIndex,t=n[e].value;console.log("--\x3eSelected Opt Value= "+t+"   Text= "+n[e].text),this.selected_class=t,this.load_record(this.selected_preflanguage,this.selected_program,this.selected_subject,this.selected_level)},l.prototype.subject_select_onchange=function(l){var n=event.target.options,e=n.selectedIndex,t=n[e].value;console.log("--\x3eSelected Opt Value= "+t+"   Text= "+n[e].text),this.selected_subject=t,this.load_record(this.selected_preflanguage,this.selected_program,this.selected_subject,this.selected_level)},l.prototype.level_select_onchange=function(l){var n=event.target.options,e=n.selectedIndex,t=n[e].value;console.log("--\x3eSelected Opt Value= "+t+"   Text= "+n[e].text),this.selected_level=t,this.load_record(this.selected_preflanguage,this.selected_program,this.selected_subject,this.selected_level)},l.prototype.go_btn_click=function(){this.load_record(this.selected_preflanguage,this.selected_program,this.selected_subject,this.selected_level)},l.prototype.save_btn_click=function(){return g(this,void 0,void 0,function(){var l=this;return v(this,function(n){return this.questionset.length<=0?f.a.fire("Data insufficient","Please add some baseline records.","warning"):(console.log("### this.save_operation: "+this.save_operation),f.a.fire({title:"Are you sure?",text:"Do you want to save changes?",type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes"}).then(function(n){n.value&&("update"==l.save_operation?l.update_baseline(l.record_id):l.save_baseline())})),[2]})})},l.prototype.save_baseline=function(){return g(this,void 0,void 0,function(){var l,n=this;return v(this,function(e){return l={preferedlanguage:this.selected_preflanguage,program:this.selected_program,subject:this.selected_subject,level:this.selected_level,questionset:this.questionset},console.log("###data to save: "+JSON.stringify(l)),this.baselinetestService.createnewbaselinetest(l).subscribe(function(l){console.log("###1 save data: "+JSON.stringify(l)),n.modalReference.close(),f.a.fire("Successful","Data saved successfully","success"),n.load_record(n.selected_preflanguage,n.selected_program,n.selected_subject,n.selected_level)},function(l){},function(){}),[2]})})},l.prototype.update_baseline=function(l){return g(this,void 0,void 0,function(){var n,e=this;return v(this,function(t){return n={preferedlanguage:this.selected_preflanguage,program:this.selected_program,level:this.selected_level,subject:this.selected_subject,questionset:this.questionset},console.log("###data to save: "+JSON.stringify(n)),this.baselinetestService.updatebaselinetestquestionset(l,n).subscribe(function(l){console.log("###1 update data: "+JSON.stringify(l)),e.modalReference.close(),f.a.fire("Successful","Data updated successfully","success"),e.load_record(e.selected_preflanguage,e.selected_program,e.selected_subject,e.selected_level)},function(l){},function(){}),[2]})})},l.prototype.add_record=function(){if(null==this.question||null==this.question||""==this.question.trim())f.a.fire("Data insufficient","Please add some baseline records.","warning");else{var l={id:(new Date).getTime(),question:this.question};console.log("###Question obj: "+JSON.stringify(l)+"    Question set: "+JSON.stringify(this.questionset)),this.questionset.push(l),this.modalReference.close()}},l.prototype.update_record=function(){return g(this,void 0,void 0,function(){return v(this,function(l){return this.questionset.splice(this.current_index,1,{id:this.questionset[this.current_index].id,question:this.question}),this.modalReference.close(),[2]})})},l.prototype.delete_record=function(){return g(this,void 0,void 0,function(){return v(this,function(l){return this.questionset.splice(this.current_index,1),this.modalReference.close(),[2]})})},l.prototype.open=function(l,n,e){var t=this;"add"==n?this.question="":"edit"==n?(this.current_index=e,this.question=this.questionset[this.current_index].question):"delete"==n&&(this.current_index=e),this.modalReference=this.modalService.open(l,{backdrop:"static",keyboard:!1}),this.modalReference.result.then(function(l){t.closeResult="Closed with: "+l},function(l){t.closeResult="Dismissed "+t.getDismissReason(l)})},l.prototype.getDismissReason=function(l){return l===a.a.ESC?"by pressing ESC":l===a.a.BACKDROP_CLICK?"by clicking on a backdrop":"with: "+l},l}(),m=e("ZYCi"),b=t["\u0275crt"]({encapsulation:0,styles:[[".table-striped[_ngcontent-%COMP%]{font-size:12px!important;color:#2e2ef9;font-family:Arial}.table-striped[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{font-size:11px!important;font-weight:700;color:#636161;font-family:'Arial black'}.bold-font[_ngcontent-%COMP%]{font-weight:700;color:#2e2ef9;font-family:Arial}.modal-footer[_ngcontent-%COMP%]{border-top:1px solid #848484;background-color:#c3c3c3}.btn[_ngcontent-%COMP%]{border-radius:1.25rem}.modal-text[_ngcontent-%COMP%]{font-size:22px;color:#505050}.warning-icon[_ngcontent-%COMP%]{width:40px;height:40px;margin-left:40px}.validation-error-message[_ngcontent-%COMP%]{color:red;font-size:10px;font-weight:700}.delete-button[_ngcontent-%COMP%]{background-color:#ffffff00;color:red;font-size:20px;padding:0;border:none}.edit-button[_ngcontent-%COMP%]{background-color:#ffffff00;color:#00f;font-size:20px;padding:0;border:none}.area-width[_ngcontent-%COMP%]{width:100%;height:80px}.pad25[_ngcontent-%COMP%]{padding:25px}.xbtn[_ngcontent-%COMP%]{float:right;font-weight:700;color:#fff;background:red;padding:1px 8px;border:1px solid #a5a4a4;border-radius:50%;cursor:pointer}.margintop30[_ngcontent-%COMP%]{margin-top:30px}.editbtn[_ngcontent-%COMP%]{color:#5bae5a;font-size:20px;padding:5px;float:right}.delbtn[_ngcontent-%COMP%]{color:#d97c6c;font-size:20px;padding:5px;float:right}.table50[_ngcontent-%COMP%]{width:50%}.baseline_table[_ngcontent-%COMP%]{width:100%}.baseline_table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]{padding:10px;border-bottom:1px solid gray}.first_td_width[_ngcontent-%COMP%]{width:50px}.second_td_width[_ngcontent-%COMP%]{width:500px;word-wrap:break-word}.third_td_width[_ngcontent-%COMP%]{width:150px}.vscroll[_ngcontent-%COMP%]{height:300px;overflow-x:hidden;overflow-y:auto}.margintop-40[_ngcontent-%COMP%]{margin-top:-40px}"]],data:{animation:[{type:7,name:"routerTransition",definitions:[],options:{}}]}});function x(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,3,"option",[],null,null,null,null,null)),t["\u0275did"](1,147456,null,0,i.o,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),t["\u0275did"](2,147456,null,0,i.x,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](3,null,["",""]))],function(l,n){l(n,1,0,t["\u0275inlineInterpolate"](1,"",n.context.$implicit,"")),l(n,2,0,t["\u0275inlineInterpolate"](1,"",n.context.$implicit,""))},function(l,n){l(n,3,0,n.context.$implicit)})}function y(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,11,"tr",[],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,1,"td",[["class","first_td_width"]],null,null,null,null,null)),(l()(),t["\u0275ted"](2,null,["",""])),(l()(),t["\u0275eld"](3,0,null,null,2,"td",[["class","second_td_width"]],null,null,null,null,null)),(l()(),t["\u0275eld"](4,0,null,null,1,"div",[],null,null,null,null,null)),(l()(),t["\u0275ted"](5,null,["",""])),(l()(),t["\u0275eld"](6,0,null,null,5,"td",[["class","third_td_width"]],null,null,null,null,null)),(l()(),t["\u0275eld"](7,0,null,null,4,"div",[],null,null,null,null,null)),(l()(),t["\u0275eld"](8,0,null,null,1,"span",[["class","delbtn"]],null,[[null,"click"]],function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.open(t["\u0275nov"](l.parent,101),"delete",l.context.index)&&u),u},null,null)),(l()(),t["\u0275eld"](9,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-minus-square"]],null,null,null,null,null)),(l()(),t["\u0275eld"](10,0,null,null,1,"span",[["class","editbtn"]],null,[[null,"click"]],function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.open(t["\u0275nov"](l.parent,100),"edit",l.context.index)&&u),u},null,null)),(l()(),t["\u0275eld"](11,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-pencil-square-o"]],null,null,null,null,null))],null,function(l,n){l(n,2,0,n.context.index+1),l(n,5,0,n.context.$implicit.question)})}function C(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,9,"div",[["class","modal-body"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,8,"div",[],null,null,null,null,null)),(l()(),t["\u0275eld"](2,0,null,null,1,"span",[["class","bold-font"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Question:"])),(l()(),t["\u0275eld"](4,0,null,null,5,"textarea",[["class","area-width"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,e){var u=!0,o=l.component;return"input"===n&&(u=!1!==t["\u0275nov"](l,5)._handleInput(e.target.value)&&u),"blur"===n&&(u=!1!==t["\u0275nov"](l,5).onTouched()&&u),"compositionstart"===n&&(u=!1!==t["\u0275nov"](l,5)._compositionStart()&&u),"compositionend"===n&&(u=!1!==t["\u0275nov"](l,5)._compositionEnd(e.target.value)&&u),"ngModelChange"===n&&(u=!1!==(o.question=e)&&u),u},null,null)),t["\u0275did"](5,16384,null,0,i.c,[t.Renderer2,t.ElementRef,[2,i.a]],null,null),t["\u0275prd"](1024,null,i.i,function(l){return[l]},[i.c]),t["\u0275did"](7,671744,null,0,i.n,[[8,null],[8,null],[8,null],[6,i.i]],{model:[0,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,i.j,null,[i.n]),t["\u0275did"](9,16384,null,0,i.k,[[4,i.j]],null,null),(l()(),t["\u0275eld"](10,0,null,null,4,"div",[["class","modal-footer"]],null,null,null,null,null)),(l()(),t["\u0275eld"](11,0,null,null,1,"button",[["class","btn btn-default"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.context.close("Close click")&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["Cancel"])),(l()(),t["\u0275eld"](13,0,null,null,1,"button",[["class","btn btn-primary"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.add_record()&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["\xa0\xa0\xa0Add\xa0\xa0\xa0"]))],function(l,n){l(n,7,0,n.component.question)},function(l,n){l(n,4,0,t["\u0275nov"](n,9).ngClassUntouched,t["\u0275nov"](n,9).ngClassTouched,t["\u0275nov"](n,9).ngClassPristine,t["\u0275nov"](n,9).ngClassDirty,t["\u0275nov"](n,9).ngClassValid,t["\u0275nov"](n,9).ngClassInvalid,t["\u0275nov"](n,9).ngClassPending)})}function R(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,9,"div",[["class","modal-body"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,8,"div",[],null,null,null,null,null)),(l()(),t["\u0275eld"](2,0,null,null,1,"span",[["class","bold-font"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Question:"])),(l()(),t["\u0275eld"](4,0,null,null,5,"textarea",[["class","area-width"]],[[8,"value",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,e){var u=!0,o=l.component;return"input"===n&&(u=!1!==t["\u0275nov"](l,5)._handleInput(e.target.value)&&u),"blur"===n&&(u=!1!==t["\u0275nov"](l,5).onTouched()&&u),"compositionstart"===n&&(u=!1!==t["\u0275nov"](l,5)._compositionStart()&&u),"compositionend"===n&&(u=!1!==t["\u0275nov"](l,5)._compositionEnd(e.target.value)&&u),"ngModelChange"===n&&(u=!1!==(o.question=e)&&u),u},null,null)),t["\u0275did"](5,16384,null,0,i.c,[t.Renderer2,t.ElementRef,[2,i.a]],null,null),t["\u0275prd"](1024,null,i.i,function(l){return[l]},[i.c]),t["\u0275did"](7,671744,null,0,i.n,[[8,null],[8,null],[8,null],[6,i.i]],{model:[0,"model"]},{update:"ngModelChange"}),t["\u0275prd"](2048,null,i.j,null,[i.n]),t["\u0275did"](9,16384,null,0,i.k,[[4,i.j]],null,null),(l()(),t["\u0275eld"](10,0,null,null,4,"div",[["class","modal-footer"]],null,null,null,null,null)),(l()(),t["\u0275eld"](11,0,null,null,1,"button",[["class","btn btn-default"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.context.close("Close click")&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["Cancel"])),(l()(),t["\u0275eld"](13,0,null,null,1,"button",[["class","btn btn-primary"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.update_record()&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["\xa0\xa0\xa0Update\xa0\xa0\xa0"]))],function(l,n){l(n,7,0,n.component.question)},function(l,n){l(n,4,0,n.component.question,t["\u0275nov"](n,9).ngClassUntouched,t["\u0275nov"](n,9).ngClassTouched,t["\u0275nov"](n,9).ngClassPristine,t["\u0275nov"](n,9).ngClassDirty,t["\u0275nov"](n,9).ngClassValid,t["\u0275nov"](n,9).ngClassInvalid,t["\u0275nov"](n,9).ngClassPending)})}function w(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,4,"div",[["class","modal-body"]],null,null,null,null,null)),(l()(),t["\u0275eld"](1,0,null,null,3,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](2,0,null,null,0,"img",[["class","warning-icon"],["src","assets/images/warning.png"]],null,null,null,null,null)),(l()(),t["\u0275eld"](3,0,null,null,1,"span",[["class","col col-xl-9 col-lg-9"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Are you sure, you want to remove this record !"])),(l()(),t["\u0275eld"](5,0,null,null,4,"div",[["class","modal-footer"]],null,null,null,null,null)),(l()(),t["\u0275eld"](6,0,null,null,1,"button",[["class","btn btn-default"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.context.close("Close click")&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["Cancel"])),(l()(),t["\u0275eld"](8,0,null,null,1,"button",[["class","btn btn-danger"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.delete_record()&&t),t},null,null)),(l()(),t["\u0275ted"](-1,null,["\xa0\xa0\xa0Delete\xa0\xa0\xa0"]))],null,null)}function O(l){return t["\u0275vid"](0,[t["\u0275pid"](0,s.TitleCasePipe,[]),(l()(),t["\u0275eld"](1,0,null,null,104,"div",[],[[24,"@routerTransition",0]],null,null,null,null)),(l()(),t["\u0275eld"](2,0,null,null,103,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](3,0,null,null,102,"div",[["class","col col-xl-12 col-lg-12"]],null,null,null,null,null)),(l()(),t["\u0275eld"](4,0,null,null,101,"div",[["class","card mb-3"]],null,null,null,null,null)),(l()(),t["\u0275eld"](5,0,null,null,4,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),t["\u0275eld"](6,0,null,null,3,"div",[["class","row"]],null,null,null,null,null)),(l()(),t["\u0275eld"](7,0,null,null,2,"div",[["class","col col-xl-4 col-lg-4"]],null,null,null,null,null)),(l()(),t["\u0275eld"](8,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["BASELINE TEST"])),(l()(),t["\u0275eld"](10,0,null,null,73,"div",[["class","card-body table-responsive"]],null,null,null,null,null)),(l()(),t["\u0275eld"](11,0,null,null,72,"table",[["class","table table-striped"]],null,null,null,null,null)),t["\u0275did"](12,802816,[["mf",4]],0,d.DataTable,[t.IterableDiffers],{inputData:[0,"inputData"],rowsOnPage:[1,"rowsOnPage"]},null),(l()(),t["\u0275eld"](13,0,null,null,70,"thead",[],null,null,null,null,null)),(l()(),t["\u0275eld"](14,0,null,null,9,"tr",[],null,null,null,null,null)),(l()(),t["\u0275eld"](15,0,null,null,1,"th",[["style","width: 15%"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Prefered Language"])),(l()(),t["\u0275eld"](17,0,null,null,1,"th",[["style","width: 15%"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Program"])),(l()(),t["\u0275eld"](19,0,null,null,1,"th",[["style","width: 15%"]],null,null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Level"])),(l()(),t["\u0275eld"](21,0,null,null,1,"th",[["style","width: 15%"]],[[8,"hidden",0]],null,null,null,null)),(l()(),t["\u0275ted"](-1,null,["Subject"])),(l()(),t["\u0275eld"](23,0,null,null,0,"th",[["style","width: 15%"]],null,null,null,null,null)),(l()(),t["\u0275eld"](24,0,null,null,59,"tr",[],null,null,null,null,null)),(l()(),t["\u0275eld"](25,0,null,null,17,"td",[],null,null,null,null,null)),(l()(),t["\u0275eld"](26,0,null,null,16,"select",[["class","form-control"],["id","selected_preflanguage"]],[[8,"value",0]],[[null,"change"]],function(l,n,e){var t=!0;return"change"===n&&(t=!1!==l.component.preflanguage_select_onchange(e)&&t),t},null,null)),(l()(),t["\u0275eld"](27,0,null,null,3,"option",[["value",""]],null,null,null,null,null)),t["\u0275did"](28,147456,null,0,i.o,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),t["\u0275did"](29,147456,null,0,i.x,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](-1,null,["Select"])),(l()(),t["\u0275eld"](31,0,null,null,3,"option",[["value","en"]],null,null,null,null,null)),t["\u0275did"](32,147456,null,0,i.o,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),t["\u0275did"](33,147456,null,0,i.x,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](-1,null,["English"])),(l()(),t["\u0275eld"](35,0,null,null,3,"option",[["value","od"]],null,null,null,null,null)),t["\u0275did"](36,147456,null,0,i.o,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),t["\u0275did"](37,147456,null,0,i.x,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](-1,null,["\u0b13\u0b21\u0b3f\u0b06"])),(l()(),t["\u0275eld"](39,0,null,null,3,"option",[["value","hi"]],null,null,null,null,null)),t["\u0275did"](40,147456,null,0,i.o,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),t["\u0275did"](41,147456,null,0,i.x,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](-1,null,["\u0939\u093f\u0902\u0926\u0940"])),(l()(),t["\u0275eld"](43,0,null,null,13,"td",[],null,null,null,null,null)),(l()(),t["\u0275eld"](44,0,null,null,12,"select",[["class","form-control"],["id","select_program"]],[[8,"value",0]],[[null,"change"]],function(l,n,e){var t=!0;return"change"===n&&(t=!1!==l.component.program_select_onchange(e)&&t),t},null,null)),(l()(),t["\u0275eld"](45,0,null,null,3,"option",[["value",""]],null,null,null,null,null)),t["\u0275did"](46,147456,null,0,i.o,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),t["\u0275did"](47,147456,null,0,i.x,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](-1,null,["Select"])),(l()(),t["\u0275eld"](49,0,null,null,3,"option",[["value","ece"]],null,null,null,null,null)),t["\u0275did"](50,147456,null,0,i.o,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),t["\u0275did"](51,147456,null,0,i.x,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](-1,null,["ECE"])),(l()(),t["\u0275eld"](53,0,null,null,3,"option",[["value","pge"]],null,null,null,null,null)),t["\u0275did"](54,147456,null,0,i.o,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),t["\u0275did"](55,147456,null,0,i.x,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](-1,null,["PGE"])),(l()(),t["\u0275eld"](57,0,null,null,7,"td",[],null,null,null,null,null)),(l()(),t["\u0275eld"](58,0,null,null,6,"select",[["class","form-control"],["id","selected_level"]],[[8,"value",0]],[[null,"change"]],function(l,n,e){var t=!0;return"change"===n&&(t=!1!==l.component.level_select_onchange(e.target.value)&&t),t},null,null)),(l()(),t["\u0275eld"](59,0,null,null,3,"option",[["value",""]],null,null,null,null,null)),t["\u0275did"](60,147456,null,0,i.o,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),t["\u0275did"](61,147456,null,0,i.x,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](-1,null,["Select"])),(l()(),t["\u0275and"](16777216,null,null,1,null,x)),t["\u0275did"](64,278528,null,0,s.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),t["\u0275eld"](65,0,null,null,17,"td",[],[[8,"hidden",0]],null,null,null,null)),(l()(),t["\u0275eld"](66,0,null,null,16,"select",[["class","form-control"],["id","select_subject"]],[[8,"value",0]],[[null,"change"]],function(l,n,e){var t=!0;return"change"===n&&(t=!1!==l.component.subject_select_onchange(e)&&t),t},null,null)),(l()(),t["\u0275eld"](67,0,null,null,3,"option",[["value",""]],null,null,null,null,null)),t["\u0275did"](68,147456,null,0,i.o,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),t["\u0275did"](69,147456,null,0,i.x,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](-1,null,["Select"])),(l()(),t["\u0275eld"](71,0,null,null,3,"option",[["value","math"]],null,null,null,null,null)),t["\u0275did"](72,147456,null,0,i.o,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),t["\u0275did"](73,147456,null,0,i.x,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](-1,null,["Math"])),(l()(),t["\u0275eld"](75,0,null,null,3,"option",[["value","english"]],null,null,null,null,null)),t["\u0275did"](76,147456,null,0,i.o,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),t["\u0275did"](77,147456,null,0,i.x,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](-1,null,["English"])),(l()(),t["\u0275eld"](79,0,null,null,3,"option",[["value","odia"]],null,null,null,null,null)),t["\u0275did"](80,147456,null,0,i.o,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),t["\u0275did"](81,147456,null,0,i.x,[t.ElementRef,t.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),t["\u0275ted"](-1,null,["Odia"])),(l()(),t["\u0275eld"](83,0,null,null,0,"td",[],null,null,null,null,null)),(l()(),t["\u0275eld"](84,0,null,null,2,"div",[["class","loading_indicator"],["id","loading_indicator"]],[[8,"hidden",0]],null,null,null,null)),(l()(),t["\u0275eld"](85,0,null,null,1,"span",[["class",""]],null,null,null,null,null)),(l()(),t["\u0275eld"](86,0,null,null,0,"img",[["alt","Loading. Please wait..."],["src","assets/images/loader3.gif"]],null,null,null,null,null)),(l()(),t["\u0275eld"](87,0,null,null,18,"div",[["class","pad25"],["id","content_div"]],[[8,"hidden",0]],null,null,null,null)),(l()(),t["\u0275eld"](88,0,null,null,1,"button",[["class","btn btn-sm btn-primary float-right margintop-40"],["type","button"]],null,[[null,"click"]],function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.open(t["\u0275nov"](l,99),"add",null)&&u),u},null,null)),(l()(),t["\u0275eld"](89,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-plus"]],null,null,null,null,null)),(l()(),t["\u0275eld"](90,0,null,null,11,"div",[["class","vscroll"]],null,null,null,null,null)),(l()(),t["\u0275eld"](91,0,null,null,7,"table",[["class","baseline_table"]],null,null,null,null,null)),(l()(),t["\u0275eld"](92,0,null,null,6,"tbody",[],null,null,null,null,null)),(l()(),t["\u0275eld"](93,0,null,null,3,"tr",[],null,null,null,null,null)),(l()(),t["\u0275eld"](94,0,null,null,0,"th",[],null,null,null,null,null)),(l()(),t["\u0275eld"](95,0,null,null,0,"th",[],null,null,null,null,null)),(l()(),t["\u0275eld"](96,0,null,null,0,"th",[],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,y)),t["\u0275did"](98,278528,null,0,s.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),t["\u0275and"](0,[["addmodal",2]],null,0,null,C)),(l()(),t["\u0275and"](0,[["editmodal",2]],null,0,null,R)),(l()(),t["\u0275and"](0,[["deletemodal",2]],null,0,null,w)),(l()(),t["\u0275eld"](102,0,null,null,3,"div",[],null,null,null,null,null)),(l()(),t["\u0275eld"](103,0,null,null,2,"button",[["class","btn btn-primary float-right"],["type","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.save_btn_click()&&t),t},null,null)),(l()(),t["\u0275ted"](104,null,["\xa0\xa0\xa0","\xa0\xa0\xa0"])),t["\u0275ppd"](105,1)],function(l,n){var e=n.component;l(n,12,0,e.data,4),l(n,28,0,""),l(n,29,0,""),l(n,32,0,"en"),l(n,33,0,"en"),l(n,36,0,"od"),l(n,37,0,"od"),l(n,40,0,"hi"),l(n,41,0,"hi"),l(n,46,0,""),l(n,47,0,""),l(n,50,0,"ece"),l(n,51,0,"ece"),l(n,54,0,"pge"),l(n,55,0,"pge"),l(n,60,0,""),l(n,61,0,""),l(n,64,0,e.level_list),l(n,68,0,""),l(n,69,0,""),l(n,72,0,"math"),l(n,73,0,"math"),l(n,76,0,"english"),l(n,77,0,"english"),l(n,80,0,"odia"),l(n,81,0,"odia"),l(n,98,0,e.questionset)},function(l,n){var e=n.component;l(n,1,0,void 0),l(n,21,0,e.hideSubject_select),l(n,26,0,t["\u0275inlineInterpolate"](1,"",e.selected_preflanguage,"")),l(n,44,0,t["\u0275inlineInterpolate"](1,"",e.selected_program,"")),l(n,58,0,t["\u0275inlineInterpolate"](1,"",e.selected_level,"")),l(n,65,0,e.hideSubject_select),l(n,66,0,t["\u0275inlineInterpolate"](1,"",e.selected_subject,"")),l(n,84,0,e.hideLoading_indicator),l(n,87,0,e.hideContent_div);var u=t["\u0275unv"](n,104,0,l(n,105,0,t["\u0275nov"](n,0),e.save_operation));l(n,104,0,u)})}function k(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"app-users",[],null,null,null,O,b)),t["\u0275did"](1,114688,null,0,_,[m.l,p,a.z],null,null)],function(l,n){l(n,1,0)},null)}var q=t["\u0275ccf"]("app-users",_,k,{},{},[]),j=function(){return function(){}}(),P=e("+Sv0"),E=e("kahr");e.d(n,"BaselinetestModuleNgFactory",function(){return M});var M=t["\u0275cmf"](u,[],function(l){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[o.a,q]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,s.NgLocalization,s.NgLocaleLocalization,[t.LOCALE_ID,[2,s["\u0275angular_packages_common_common_a"]]]),t["\u0275mpd"](4608,i.v,i.v,[]),t["\u0275mpd"](4608,i.d,i.d,[]),t["\u0275mpd"](4608,p,p,[r.c]),t["\u0275mpd"](1073742336,s.CommonModule,s.CommonModule,[]),t["\u0275mpd"](1073742336,m.o,m.o,[[2,m.u],[2,m.l]]),t["\u0275mpd"](1073742336,j,j,[]),t["\u0275mpd"](1073742336,P.a,P.a,[]),t["\u0275mpd"](1073742336,E.DataTableModule,E.DataTableModule,[]),t["\u0275mpd"](1073742336,i.s,i.s,[]),t["\u0275mpd"](1073742336,i.g,i.g,[]),t["\u0275mpd"](1073742336,i.p,i.p,[]),t["\u0275mpd"](1073742336,u,u,[]),t["\u0275mpd"](1024,m.j,function(){return[[{path:"",component:_}]]},[])])})}}]);