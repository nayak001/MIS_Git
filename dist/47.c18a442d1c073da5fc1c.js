(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{I0r9:function(l,n,e){"use strict";e.r(n);var u=e("CcnG"),t=function(){return function(){}}(),i=e("pMnS"),o=e("gIcY"),a=e("Ip0R"),d=e("4GxJ"),s=e("Iab2"),r=e("t/Na"),c=e("cxbk").a.baseUrl,p=function(){function l(l){this.http=l}return l.prototype.getallmanager=function(){return this.http.get(c+"getallmanager",{headers:(new r.h).set("Content-Type","application/json")})},l.prototype.getoperationbyuserid=function(l,n){return this.http.get(c+"getall"+n+"mgrbyuserid/"+l,{headers:(new r.h).set("Content-Type","application/json")})},l.prototype.downloadcenterimage=function(l){return this.http.get(c+"downloadcenterimage/"+l,{responseType:"blob"})},l.prototype.deletecenterimage=function(l){return this.http.delete(c+"deletecenterimage/"+l,{headers:(new r.h).set("Content-Type","application/json"),responseType:"text"})},l.ngInjectableDef=u.defineInjectable({factory:function(){return new l(u.inject(r.c))},token:l,providedIn:"root"}),l}(),m=function(){function l(l,n,e,u,t,i){this.modalService=l,this.formBuilder=n,this.translate=e,this.router=u,this.mgroperationsService=t,this.domSanitizer=i,this.submitted=!1,this.selected_operation="",this.sliders=[],this.centerimageFormGroup=this.formBuilder.group({}),this.hideLoading_indicator=!0,this.hideNo_results_div=!0,this.hide_gmap_div=!0}return l.prototype.ngOnInit=function(){this.hideLoading_indicator=!1,this.getallmanager()},l.prototype.getallmanager=function(){var l=this;this.hideLoading_indicator=!1,this.mgroperationsService.getallmanager().subscribe(function(n){l.managers=n,l.hideLoading_indicator=!0},function(l){},function(){})},l.prototype.showOnMap=function(l,n){this.hide_gmap_div=!1;var e={lat:l,lng:n},u={center:e,zoom:15,mapTypeId:google.maps.MapTypeId.ROADMAP};this.map=new google.maps.Map(this.gmapElement.nativeElement,u),this.marker=new google.maps.Marker({position:e,map:this.map,title:"Hello World!"})},l.prototype.showmap=function(l,n){console.log("showmap() invoked"),this.hide_gmap_div=!1;var e={lat:l,lng:n},u={center:e,zoom:15,mapTypeId:google.maps.MapTypeId.ROADMAP};this.map=new google.maps.Map(this.gmapElement.nativeElement,u),this.marker=new google.maps.Marker({position:e,map:this.map,title:"Hello World!"})},l.prototype.closemap=function(){this.hide_gmap_div=!0,this.map=null,this.marker=null},l.prototype.locate=function(l,n){var e,u;console.log("@@@_lat: "+l+"    @@@_lng: "+n),e=null!=l&&null!=l&&""!=l?parseFloat(l):18.5793,u=null!=n&&null!=n&&""!=n?parseFloat(n):73.8143;var t=new google.maps.LatLng(e,u);this.marker.setPosition(t),this.map.setCenter(t)},l.prototype.open=function(l,n,e){var u=this;console.log("#### flag: "+e),"view"==e?(this.sliders=[],this.sliders.push({imagePath:n,label:"",text:""})):"locate"==e&&this.showOnMap(n.lat,n.lng),this.modalReference=this.modalService.open(l,n),this.modalReference.result.then(function(l){u.closeResult="Closed with: "+l},function(l){u.closeResult="Dismissed "+u.getDismissReason(l)})},l.prototype.getDismissReason=function(l){return l===d.a.ESC?"by pressing ESC":l===d.a.BACKDROP_CLICK?"by clicking on a backdrop":"with: "+l},l.prototype.onselect_centerimage_user_select=function(l){var n=l.target.options,e=n.selectedIndex,u=n[e].text;this.selected_userid=n[e].value,this.selected_username=u,console.log("--\x3eSelected userid= "+this.selected_userid+"   username= "+this.selected_username)},l.prototype.onselect_operation_select=function(l){var n=l.target.options;this.selected_operation=n[n.selectedIndex].value,console.log("--\x3eSelected operation= "+this.selected_operation)},l.prototype.getoperationbyuserid=function(l,n){var e=this;this.hideLoading_indicator=!1,this.mgroperationsService.getoperationbyuserid(l,n).subscribe(function(l){e.operation_list=l,e.hideLoading_indicator=!0},function(l){},function(){})},l.prototype.FormSubmitAction=function(){null==this.selected_userid||null==this.selected_userid||""==this.selected_userid?alert("Please select user !!!"):null==this.selected_operation||null==this.selected_operation||""==this.selected_operation?alert("Please select operation !!!"):this.getoperationbyuserid(this.selected_userid,this.selected_operation.trim())},l.prototype.downloadimage=function(l){console.log("@@@ image object: "+JSON.stringify(l));var n=l.imageurl;n=null!=n||null!=n||""!=n?n.replace("assets/images/uploads/",""):"",console.log("@@@ image to be download: "+n),this.mgroperationsService.downloadcenterimage(n).subscribe(function(l){Object(s.saveAs)(l,n)},function(l){},function(){})},l.prototype.deleteimage=function(l){var n=this;console.log("@@@ image object: "+JSON.stringify(l));var e=l._id,u=l.userid;console.log("@@@ image to be deleted: "+e),this.mgroperationsService.deletecenterimage(e).subscribe(function(l){n.getoperationbyuserid(u,n.selected_operation),n.modalReference.close()},function(l){},function(){})},l.prototype.createslider=function(l){var n=this;l.forEach(function(l){console.log("@@@v : "+JSON.stringify(l)),n.sliders.push({imagePath:l.imageurl,label:"",text:""})})},l}(),g=e("A7o+"),f=e("ZYCi"),v=e("ZYjt"),h=u["\u0275crt"]({encapsulation:0,styles:[[".table-striped[_ngcontent-%COMP%]{font-size:12px!important;color:#2e2ef9;font-family:Arial}.table-striped[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{font-size:11px!important;font-weight:700;color:#636161;font-family:'Arial black'}.bold-font[_ngcontent-%COMP%]{font-size:11px!important;font-weight:700;color:#2e2ef9;font-family:Arial}.modal-footer[_ngcontent-%COMP%]{border-top:1px solid #848484;background-color:#c3c3c3}.btn[_ngcontent-%COMP%]{border-radius:1.25rem}.modal-text[_ngcontent-%COMP%]{font-size:22px;color:#505050}.warning-icon[_ngcontent-%COMP%]{width:40px;height:40px;margin-left:40px}.validation-error-message[_ngcontent-%COMP%]{color:red;font-size:10px;font-weight:700}.modal_textbox[_ngcontent-%COMP%]{width:100%;border:none;border-bottom:1px solid #b7b7b7;margin-bottom:30px;font-family:arial;font-size:12px}.modal_textbox[_ngcontent-%COMP%]:focus{outline-width:0}.div_img[_ngcontent-%COMP%]{border:10px solid #fff;margin:15px;padding:15px;width:98%;background-color:#fff;box-shadow:-1px 2px 4px;position:relative}.div_img[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{position:absolute;bottom:0;width:85%}.img_[_ngcontent-%COMP%]{padding-bottom:0;background-image:url(/assets/images/default.jpg);background-repeat:no-repeat;background-size:contain;float:right;cursor:pointer}.no_results_div[_ngcontent-%COMP%]{width:100%}.no_results_span[_ngcontent-%COMP%]{background-color:#fff;padding:20px;margin-left:40%}.transperentbg[_ngcontent-%COMP%]{background:#00000082;color:#fff}.tbl[_ngcontent-%COMP%]{width:100%}.scrolldiv[_ngcontent-%COMP%]{height:300px;overflow-x:hidden;overflow-y:auto}.vltd[_ngcontent-%COMP%]{vertical-align:top!important;text-align:left;width:100%}.vrtd[_ngcontent-%COMP%]{vertical-align:top;text-align:right}.headingtr[_ngcontent-%COMP%]{background:#e9e9fc;text-align:center;line-height:50px}.labelhead[_ngcontent-%COMP%]{font-weight:700}.ansdiv[_ngcontent-%COMP%]{margin-left:20px;color:#2b2bb6}.alwaysontop[_ngcontent-%COMP%]{width:100%;height:100%;background:rgba(0,0,0,.5);position:fixed;top:0;left:0;z-index:9999999;padding:30px}.closemap_button_div[_ngcontent-%COMP%]{background:#fff;text-align:center;padding:15px}"]],data:{animation:[{type:7,name:"routerTransition",definitions:[],options:{}}]}});function _(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,3,"option",[],null,null,null,null,null)),u["\u0275did"](1,147456,null,0,o.o,[u.ElementRef,u.Renderer2,[8,null]],{value:[0,"value"]},null),u["\u0275did"](2,147456,null,0,o.x,[u.ElementRef,u.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),u["\u0275ted"](3,null,["",""]))],function(l,n){l(n,1,0,u["\u0275inlineInterpolate"](1,"",n.context.$implicit.userid,"")),l(n,2,0,u["\u0275inlineInterpolate"](1,"",n.context.$implicit.userid,""))},function(l,n){l(n,3,0,n.context.$implicit.username)})}function b(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,4,"div",[["class",""]],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,1,"div",[["class","labelhead"]],null,null,null,null,null)),(l()(),u["\u0275ted"](2,null,[""," ) ",""])),(l()(),u["\u0275eld"](3,0,null,null,1,"div",[["class","ansdiv"]],null,null,null,null,null)),(l()(),u["\u0275ted"](4,null,[" ",""]))],null,function(l,n){l(n,2,0,n.context.index+1,n.context.$implicit.assessment_q),l(n,4,0,n.context.$implicit.assessment_a)})}function x(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,5,"div",[],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,1,"div",[["class","labelhead"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Assessment"])),(l()(),u["\u0275eld"](3,0,null,null,2,"div",[["class","scrolldiv"]],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,b)),u["\u0275did"](5,278528,null,0,a.NgForOf,[u.ViewContainerRef,u.TemplateRef,u.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,5,0,n.parent.context.$implicit.assessmentinfo)},null)}function y(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,4,"div",[["class",""]],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,1,"div",[["class","labelhead"]],null,null,null,null,null)),(l()(),u["\u0275ted"](2,null,[""," ) ",""])),(l()(),u["\u0275eld"](3,0,null,null,1,"div",[["class","ansdiv"]],null,null,null,null,null)),(l()(),u["\u0275ted"](4,null,[" ",""]))],null,function(l,n){l(n,2,0,n.context.index+1,n.context.$implicit.issue_q),l(n,4,0,n.context.$implicit.issue_a)})}function C(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,5,"div",[],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,1,"div",[["class","labelhead"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Issues"])),(l()(),u["\u0275eld"](3,0,null,null,2,"div",[["class","scrolldiv"]],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,y)),u["\u0275did"](5,278528,null,0,a.NgForOf,[u.ViewContainerRef,u.TemplateRef,u.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,5,0,n.parent.context.$implicit.issues)},null)}function R(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,4,"div",[["class",""]],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,1,"div",[["class","labelhead"]],null,null,null,null,null)),(l()(),u["\u0275ted"](2,null,[""," ) ",""])),(l()(),u["\u0275eld"](3,0,null,null,1,"div",[["class","ansdiv"]],null,null,null,null,null)),(l()(),u["\u0275ted"](4,null,[" ",""]))],null,function(l,n){l(n,2,0,n.context.index+1,n.context.$implicit.community_q),l(n,4,0,n.context.$implicit.community_a)})}function w(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,5,"div",[],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,1,"div",[["class","labelhead"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Community Visit"])),(l()(),u["\u0275eld"](3,0,null,null,2,"div",[["class","scrolldiv"]],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,R)),u["\u0275did"](5,278528,null,0,a.NgForOf,[u.ViewContainerRef,u.TemplateRef,u.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,5,0,n.parent.context.$implicit.community)},null)}function O(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,4,"div",[["class",""]],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,1,"div",[["class","labelhead"]],null,null,null,null,null)),(l()(),u["\u0275ted"](2,null,[""," ) ",""])),(l()(),u["\u0275eld"](3,0,null,null,1,"div",[["class","ansdiv"]],null,null,null,null,null)),(l()(),u["\u0275ted"](4,null,[" ",""]))],null,function(l,n){l(n,2,0,n.context.index+1,n.context.$implicit.payment_q),l(n,4,0,n.context.$implicit.payment_a)})}function M(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,5,"div",[],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,1,"div",[["class","labelhead"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Payment Info"])),(l()(),u["\u0275eld"](3,0,null,null,2,"div",[["class","scrolldiv"]],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,O)),u["\u0275did"](5,278528,null,0,a.NgForOf,[u.ViewContainerRef,u.TemplateRef,u.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,5,0,n.parent.context.$implicit.paymentinfo)},null)}function I(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,16,"div",[["class","div_img"]],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,15,"table",[["class","tbl"]],null,null,null,null,null)),(l()(),u["\u0275eld"](2,0,null,null,14,"tbody",[],null,null,null,null,null)),(l()(),u["\u0275eld"](3,0,null,null,3,"tr",[["class","headingtr"]],null,null,null,null,null)),(l()(),u["\u0275eld"](4,0,null,null,2,"th",[],null,null,null,null,null)),(l()(),u["\u0275ted"](5,null,[" "," (Center: "," ) "])),u["\u0275ppd"](6,2),(l()(),u["\u0275eld"](7,0,null,null,9,"tr",[],null,null,null,null,null)),(l()(),u["\u0275eld"](8,0,null,null,8,"td",[["class","vltd"]],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,x)),u["\u0275did"](10,16384,null,0,a.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275and"](16777216,null,null,1,null,C)),u["\u0275did"](12,16384,null,0,a.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275and"](16777216,null,null,1,null,w)),u["\u0275did"](14,16384,null,0,a.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275and"](16777216,null,null,1,null,M)),u["\u0275did"](16,16384,null,0,a.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(l,n){var e=n.component;l(n,10,0,"assessment"==e.selected_operation),l(n,12,0,"issues"==e.selected_operation),l(n,14,0,"community"==e.selected_operation),l(n,16,0,"paymentinfo"==e.selected_operation)},function(l,n){var e=u["\u0275unv"](n,5,0,l(n,6,0,u["\u0275nov"](n.parent,0),n.context.$implicit.createdon,"EEEE, MMMM d, y"));l(n,5,0,e,n.context.$implicit.centername)})}function P(l){return u["\u0275vid"](0,[u["\u0275pid"](0,a.DatePipe,[u.LOCALE_ID]),u["\u0275qud"](402653184,1,{gmapElement:0}),(l()(),u["\u0275eld"](2,0,null,null,59,"div",[],[[24,"@routerTransition",0]],null,null,null,null)),(l()(),u["\u0275eld"](3,0,null,null,58,"div",[["class","row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](4,0,null,null,57,"div",[["class","col col-xl-12 col-lg-12"]],null,null,null,null,null)),(l()(),u["\u0275eld"](5,0,null,null,56,"div",[["class","card mb-3"]],null,null,null,null,null)),(l()(),u["\u0275eld"](6,0,null,null,44,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),u["\u0275eld"](7,0,null,null,43,"div",[["class","row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](8,0,null,null,2,"div",[["class","col col-xl-4 col-lg-4"]],null,null,null,null,null)),(l()(),u["\u0275eld"](9,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["OPERATIONS"])),(l()(),u["\u0275eld"](11,0,null,null,39,"div",[["class","col"]],null,null,null,null,null)),(l()(),u["\u0275eld"](12,0,null,null,38,"form",[["novalidate",""],["role","form"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngSubmit"],[null,"submit"],[null,"reset"]],function(l,n,e){var t=!0,i=l.component;return"submit"===n&&(t=!1!==u["\u0275nov"](l,14).onSubmit(e)&&t),"reset"===n&&(t=!1!==u["\u0275nov"](l,14).onReset()&&t),"ngSubmit"===n&&(t=!1!==i.FormSubmitAction()&&t),t},null,null)),u["\u0275did"](13,16384,null,0,o.u,[],null,null),u["\u0275did"](14,540672,null,0,o.f,[[8,null],[8,null]],{form:[0,"form"]},{ngSubmit:"ngSubmit"}),u["\u0275prd"](2048,null,o.b,null,[o.f]),u["\u0275did"](16,16384,null,0,o.l,[[4,o.b]],null,null),(l()(),u["\u0275eld"](17,0,null,null,33,"div",[["class","row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](18,0,null,null,7,"div",[["class","col col-xl-4 col-lg-4"]],null,null,null,null,null)),(l()(),u["\u0275eld"](19,0,null,null,6,"select",[["class","form-control"],["placeholder","Manager"],["value",""]],null,[[null,"change"]],function(l,n,e){var u=!0;return"change"===n&&(u=!1!==l.component.onselect_centerimage_user_select(e)&&u),u},null,null)),(l()(),u["\u0275eld"](20,0,null,null,3,"option",[["value",""]],null,null,null,null,null)),u["\u0275did"](21,147456,null,0,o.o,[u.ElementRef,u.Renderer2,[8,null]],{value:[0,"value"]},null),u["\u0275did"](22,147456,null,0,o.x,[u.ElementRef,u.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),u["\u0275ted"](-1,null,["-- Select User --"])),(l()(),u["\u0275and"](16777216,null,null,1,null,_)),u["\u0275did"](25,278528,null,0,a.NgForOf,[u.ViewContainerRef,u.TemplateRef,u.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),u["\u0275eld"](26,0,null,null,21,"div",[["class","col col-xl-4 col-lg-4"]],null,null,null,null,null)),(l()(),u["\u0275eld"](27,0,null,null,20,"select",[["class","form-control"],["placeholder","Manager"],["value",""]],null,[[null,"change"]],function(l,n,e){var u=!0;return"change"===n&&(u=!1!==l.component.onselect_operation_select(e)&&u),u},null,null)),(l()(),u["\u0275eld"](28,0,null,null,3,"option",[["value",""]],null,null,null,null,null)),u["\u0275did"](29,147456,null,0,o.o,[u.ElementRef,u.Renderer2,[8,null]],{value:[0,"value"]},null),u["\u0275did"](30,147456,null,0,o.x,[u.ElementRef,u.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),u["\u0275ted"](-1,null,["-- Select Operation --"])),(l()(),u["\u0275eld"](32,0,null,null,3,"option",[["value","assessment"]],null,null,null,null,null)),u["\u0275did"](33,147456,null,0,o.o,[u.ElementRef,u.Renderer2,[8,null]],{value:[0,"value"]},null),u["\u0275did"](34,147456,null,0,o.x,[u.ElementRef,u.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),u["\u0275ted"](-1,null,["Assessment"])),(l()(),u["\u0275eld"](36,0,null,null,3,"option",[["value","issues"]],null,null,null,null,null)),u["\u0275did"](37,147456,null,0,o.o,[u.ElementRef,u.Renderer2,[8,null]],{value:[0,"value"]},null),u["\u0275did"](38,147456,null,0,o.x,[u.ElementRef,u.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),u["\u0275ted"](-1,null,["Issues"])),(l()(),u["\u0275eld"](40,0,null,null,3,"option",[["value","community"]],null,null,null,null,null)),u["\u0275did"](41,147456,null,0,o.o,[u.ElementRef,u.Renderer2,[8,null]],{value:[0,"value"]},null),u["\u0275did"](42,147456,null,0,o.x,[u.ElementRef,u.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),u["\u0275ted"](-1,null,["Community Visit"])),(l()(),u["\u0275eld"](44,0,null,null,3,"option",[["value","paymentinfo"]],null,null,null,null,null)),u["\u0275did"](45,147456,null,0,o.o,[u.ElementRef,u.Renderer2,[8,null]],{value:[0,"value"]},null),u["\u0275did"](46,147456,null,0,o.x,[u.ElementRef,u.Renderer2,[8,null]],{value:[0,"value"]},null),(l()(),u["\u0275ted"](-1,null,["Payment"])),(l()(),u["\u0275eld"](48,0,null,null,2,"div",[["class","col col-xl-4 col-lg-4"]],null,null,null,null,null)),(l()(),u["\u0275eld"](49,0,null,null,1,"button",[["class","btn btn-sm btn-primary"],["type","submit"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\xa0\xa0\xa0Get Info\xa0\xa0\xa0"])),(l()(),u["\u0275eld"](51,0,null,null,10,"div",[["class","card-body table-responsive"]],null,null,null,null,null)),(l()(),u["\u0275eld"](52,0,null,null,2,"div",[["class","loading_indicator"],["id","loading_indicator"]],[[8,"hidden",0]],null,null,null,null)),(l()(),u["\u0275eld"](53,0,null,null,1,"span",[["class",""]],null,null,null,null,null)),(l()(),u["\u0275eld"](54,0,null,null,0,"img",[["alt","Loading. Please wait..."],["src","assets/images/loader3.gif"]],null,null,null,null,null)),(l()(),u["\u0275eld"](55,0,null,null,6,"div",[["class","div_img_container"]],null,null,null,null,null)),(l()(),u["\u0275eld"](56,0,null,null,5,"div",[["class","row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](57,0,null,null,2,"div",[["class","no_results_div"],["id","no_results_div"]],[[8,"hidden",0]],null,null,null,null)),(l()(),u["\u0275eld"](58,0,null,null,1,"span",[["class","no_results_span"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["No results found ..."])),(l()(),u["\u0275and"](16777216,null,null,1,null,I)),u["\u0275did"](61,278528,null,0,a.NgForOf,[u.ViewContainerRef,u.TemplateRef,u.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(l,n){var e=n.component;l(n,14,0,e.centerimageFormGroup),l(n,21,0,""),l(n,22,0,""),l(n,25,0,e.managers),l(n,29,0,""),l(n,30,0,""),l(n,33,0,"assessment"),l(n,34,0,"assessment"),l(n,37,0,"issues"),l(n,38,0,"issues"),l(n,41,0,"community"),l(n,42,0,"community"),l(n,45,0,"paymentinfo"),l(n,46,0,"paymentinfo"),l(n,61,0,e.operation_list)},function(l,n){var e=n.component;l(n,2,0,void 0),l(n,12,0,u["\u0275nov"](n,16).ngClassUntouched,u["\u0275nov"](n,16).ngClassTouched,u["\u0275nov"](n,16).ngClassPristine,u["\u0275nov"](n,16).ngClassDirty,u["\u0275nov"](n,16).ngClassValid,u["\u0275nov"](n,16).ngClassInvalid,u["\u0275nov"](n,16).ngClassPending),l(n,52,0,e.hideLoading_indicator),l(n,57,0,e.hideNo_results_div)})}function E(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"app-mgroperations",[],null,null,null,P,h)),u["\u0275did"](1,114688,null,0,m,[d.z,o.d,g.j,f.l,p,v.c],null,null)],function(l,n){l(n,1,0)},null)}var F=u["\u0275ccf"]("app-mgroperations",m,E,{},{},[]),S=function(){return function(){}}(),k=e("+Sv0"),T=e("kahr");e.d(n,"MgroperationsModuleNgFactory",function(){return N});var N=u["\u0275cmf"](t,[],function(l){return u["\u0275mod"]([u["\u0275mpd"](512,u.ComponentFactoryResolver,u["\u0275CodegenComponentFactoryResolver"],[[8,[i.a,F]],[3,u.ComponentFactoryResolver],u.NgModuleRef]),u["\u0275mpd"](4608,a.NgLocalization,a.NgLocaleLocalization,[u.LOCALE_ID,[2,a["\u0275angular_packages_common_common_a"]]]),u["\u0275mpd"](4608,o.v,o.v,[]),u["\u0275mpd"](4608,o.d,o.d,[]),u["\u0275mpd"](4608,p,p,[r.c]),u["\u0275mpd"](1073742336,a.CommonModule,a.CommonModule,[]),u["\u0275mpd"](1073742336,f.o,f.o,[[2,f.u],[2,f.l]]),u["\u0275mpd"](1073742336,S,S,[]),u["\u0275mpd"](1073742336,d.l,d.l,[]),u["\u0275mpd"](1073742336,k.a,k.a,[]),u["\u0275mpd"](1073742336,T.DataTableModule,T.DataTableModule,[]),u["\u0275mpd"](1073742336,o.s,o.s,[]),u["\u0275mpd"](1073742336,o.g,o.g,[]),u["\u0275mpd"](1073742336,o.p,o.p,[]),u["\u0275mpd"](1073742336,t,t,[]),u["\u0275mpd"](1024,f.j,function(){return[[{path:"",component:m}]]},[])])})}}]);