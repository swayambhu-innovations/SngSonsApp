"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1362],{1362:(O,p,r)=>{r.r(p),r.d(p,{AddVendorPageModule:()=>Z});var m=r(6814),o=r(95),d=r(6458),f=r(9599),s=r(5861),g=r(3467),n=r(6689),v=r(1014),P=r(5472),h=r(6725);function C(t,a){if(1&t&&(n.TgZ(0,"ion-select-option",36),n._uU(1),n.qZA()),2&t){const c=a.$implicit;n.Q6J("value",c),n.xp6(1),n.Oqu(c)}}function b(t,a){if(1&t&&(n.TgZ(0,"ion-select-option",36),n._uU(1),n.qZA()),2&t){const c=a.$implicit;n.Q6J("value",c),n.xp6(1),n.Oqu(c)}}const _=[{path:"",component:(()=>{var t;class a{constructor(e,i,l,u){this.vendorMasterService=e,this.loadingController=i,this.navCtrl=l,this.notificationService=u,this.config=g.D,this.vendorForm=new o.cw({WSName:new o.NI("",[o.kI.required]),WSCode:new o.NI("",[o.kI.required]),postalCode:new o.NI(null,[o.kI.required]),WSTown:new o.NI("",[o.kI.required]),panNo:new o.NI("",[o.kI.required]),phoneNO:new o.NI("",[o.kI.required]),GSTNo:new o.NI("",[o.kI.required]),shippingType:new o.NI(null,[o.kI.required]),distance:new o.NI("",[o.kI.required]),maxCreditLimit:new o.NI("",[o.kI.required]),vendorProfileImg:new o.NI,active:new o.NI(!0,[]),pending:new o.NI(!1,[]),createdAt:new o.NI(new Date,[]),id:new o.NI("")}),this.postalCode=[...g.D.hardData.postalCode],this.shippingType=[...g.D.hardData.shippingType],this.vendorPicSrc=g.D.url.defaultProfile}ngOnInit(){var e=this;return(0,s.Z)(function*(){e.loader=yield e.loadingController.create({message:g.D.messages.pleaseWait}),history.state.vendor&&(e.vendorData=JSON.parse(history.state.vendor),e.vendorData&&e.vendorForm.setValue(e.vendorData),e.vendorPicSrc=e.vendorForm.controls.vendorProfileImg.value)})()}get f(){return this.vendorForm.controls}uploadPic(e){var i=this;return(0,s.Z)(function*(){i.file=e.target.files[0];const l=new FileReader;l.readAsDataURL(i.file),l.onload=()=>{i.vendorPicSrc=l.result}})()}removePic(){this.vendorPicSrc=g.D.url.defaultProfile}goBack(){this.navCtrl.navigateForward(["main/settings/vendor-master"]),this.vendorForm.reset(),this.removePic()}onSubmit(){var e=this;return(0,s.Z)(function*(){if(e.vendorForm.invalid)e.vendorForm.markAllAsTouched();else try{if(e.loader.present(),e.file){const i=yield e.vendorMasterService.uploadFile(e.file);e.vendorForm.patchValue({vendorProfileImg:i})}else e.vendorForm.patchValue({vendorProfileImg:e.vendorPicSrc});e.vendorForm.patchValue({pending:!1}),yield e.vendorMasterService.addVendor(e.vendorForm.value),e.vendorForm.reset(),e.removePic(),e.notificationService.showSuccess(""==e.vendorForm.controls.id.value?e.config.messages.addedSuccessfully:e.config.messages.updatedSuccessfully),e.loader.dismiss(),e.goBack()}catch{return void e.notificationService.showError("Something Went Wrong")}})()}}return(t=a).\u0275fac=function(e){return new(e||t)(n.Y36(v.y),n.Y36(d.HT),n.Y36(P.SH),n.Y36(h.g))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-add-vendor"]],decls:54,vars:5,consts:[[3,"fullscreen"],[1,"ion-padding-vertical"],[1,"header"],[1,"img",3,"click"],["src","assets/icon/back-button.svg","alt",""],[1,"head"],[3,"formGroup","ngSubmit"],[1,"container"],["lines","none",1,"Variable"],["lines","none","label","W/S Name","formControlName","WSName","labelPlacement","floating","required","",1,"custom"],["lines","none","label","W/S Code","formControlName","WSCode","labelPlacement","floating","required","",1,"custom"],[1,"dropdown"],["formControlName","postalCode","label","Postal Code"],[3,"value",4,"ngFor","ngForOf"],["lines","none","label","W/S Town","formControlName","WSTown","labelPlacement","floating","required","",1,"custom"],["lines","none","label","PAN Number","formControlName","panNo","labelPlacement","floating","required","",1,"custom"],["lines","none","label","Phone Number","formControlName","phoneNO","labelPlacement","floating","required","",1,"custom"],["lines","none","label","GST Number","formControlName","GSTNo","labelPlacement","floating","required","",1,"custom"],["formControlName","shippingType","label","Shipping Type"],["lines","none","label","Distance in km","formControlName","distance","labelPlacement","floating","required","",1,"custom"],["lines","none","label","Max Credit Limit","formControlName","maxCreditLimit","labelPlacement","floating","required","",1,"custom"],[1,"import-container"],[1,"import"],["shape","round"],["for","uploadVendorPic"],["xmlns","http://www.w3.org/2000/svg","width","20","height","20","viewBox","0 0 20 20","fill","none"],["d","M3.33268 15.8333H16.666V10H18.3327V16.6667C18.3327 17.1269 17.9596 17.5 17.4993 17.5H2.49935C2.03912 17.5 1.66602 17.1269 1.66602 16.6667V10H3.33268V15.8333ZM10.8327 7.5V13.3333H9.16602V7.5H4.99935L9.99935 2.5L14.9993 7.5H10.8327Z","fill","#1540BD"],["type","file","id","uploadVendorPic","accept","image/x-png,image/gif,image/jpeg",2,"display","none",3,"change"],[1,"export"],["shape","round",3,"click"],["src","assets/icon/enable-delete-button.svg","alt",""],[1,"preview-box"],["alt","vendor-pic-png",3,"src"],[1,"tab-bar"],["type","submit","shape","round",1,"active-btn"],[1,"below-space"],[3,"value"]],template:function(e,i){1&e&&(n.TgZ(0,"ion-content",0)(1,"section")(2,"header",1)(3,"div",2)(4,"div",3),n.NdJ("click",function(){return i.goBack()}),n._UZ(5,"img",4),n.qZA(),n.TgZ(6,"div",5),n._uU(7,"Add New Vendor"),n.qZA()()(),n.TgZ(8,"form",6),n.NdJ("ngSubmit",function(){return i.onSubmit()}),n.TgZ(9,"div",7)(10,"ion-item",8),n._UZ(11,"ion-input",9),n.qZA(),n.TgZ(12,"ion-item",8),n._UZ(13,"ion-input",10),n.qZA(),n.TgZ(14,"ion-item",11)(15,"ion-select",12),n.YNc(16,C,2,2,"ion-select-option",13),n.qZA()(),n.TgZ(17,"ion-item",8),n._UZ(18,"ion-input",14),n.qZA(),n.TgZ(19,"ion-item",8),n._UZ(20,"ion-input",15),n.qZA(),n.TgZ(21,"ion-item",8),n._UZ(22,"ion-input",16),n.qZA(),n.TgZ(23,"ion-item",8),n._UZ(24,"ion-input",17),n.qZA(),n.TgZ(25,"ion-item",11)(26,"ion-select",18),n.YNc(27,b,2,2,"ion-select-option",13),n.qZA()(),n.TgZ(28,"ion-item",8),n._UZ(29,"ion-input",19),n.qZA(),n.TgZ(30,"ion-item",8),n._UZ(31,"ion-input",20),n.qZA()(),n.TgZ(32,"div",21)(33,"div",22)(34,"ion-button",23)(35,"label",24),n._uU(36," Upload Photo or Logo "),n.O4$(),n.TgZ(37,"svg",25),n._UZ(38,"path",26),n.qZA()()(),n.kcU(),n.TgZ(39,"input",27),n.NdJ("change",function(u){return i.uploadPic(u)}),n.qZA()(),n.TgZ(40,"div",28)(41,"ion-button",29),n.NdJ("click",function(){return i.removePic()}),n.TgZ(42,"label"),n._uU(43," Remove "),n._UZ(44,"img",30),n.qZA()()()(),n.TgZ(45,"div",31),n._UZ(46,"img",32),n.qZA(),n.TgZ(47,"div",33)(48,"div")(49,"ion-button",34),n._uU(50,"Submit"),n.qZA(),n.TgZ(51,"ion-button",29),n.NdJ("click",function(){return i.goBack()}),n._uU(52,"Cancel"),n.qZA()()()(),n._UZ(53,"div",35),n.qZA()()),2&e&&(n.Q6J("fullscreen",!0),n.xp6(8),n.Q6J("formGroup",i.vendorForm),n.xp6(8),n.Q6J("ngForOf",i.postalCode),n.xp6(11),n.Q6J("ngForOf",i.shippingType),n.xp6(19),n.Q6J("src",i.vendorPicSrc,n.LSH))},dependencies:[m.sg,o._Y,o.JJ,o.JL,o.Q7,o.sg,o.u,d.YG,d.W2,d.pK,d.Ie,d.t9,d.n0,d.QI,d.j9],styles:["ion-content[_ngcontent-%COMP%]{--ion-background-color: linear-gradient( 180deg, #d5e6ff -8.94%, #fff 27.36%, #fff 61.93%, #c9deff 101.69% );z-index:100}ion-content[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]{padding:15px;height:100vh}ion-content[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{display:flex;padding:0 10px 10px}ion-content[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .head[_ngcontent-%COMP%]{color:var(--Primary, #1540bd);font-size:20px;font-weight:400;padding-top:3px;padding-left:10px}ion-content[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   ion-input.custom[_ngcontent-%COMP%]{--background: transparent;--color: var(--Text3, #9fa7b2);--placeholder-color: #ddd;--placeholder-opacity: .8}ion-content[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .Variable[_ngcontent-%COMP%]{margin-bottom:15px}ion-content[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]{border-radius:12px;--background: #fff;border:1px solid rgba(206,211,241,.62)}ion-content[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]   .dropdown[_ngcontent-%COMP%]{margin-bottom:15px;height:48px}ion-content[_ngcontent-%COMP%]   .import-container[_ngcontent-%COMP%]{display:flex;justify-content:space-between}ion-content[_ngcontent-%COMP%]   .import-container[_ngcontent-%COMP%]   .import[_ngcontent-%COMP%]{width:61%}ion-content[_ngcontent-%COMP%]   .import-container[_ngcontent-%COMP%]   .export[_ngcontent-%COMP%]{width:35%}ion-content[_ngcontent-%COMP%]   .import-container[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{width:100%;height:-moz-fit-content;height:fit-content;color:#1540bd;--background: white;--box-shadow: 0 2px 6px 0 rgb(0, 0, 0, .25);--ripple-color: #c9deff;--padding-top: 16px;--padding-bottom: 16px}ion-content[_ngcontent-%COMP%]   .import-container[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{cursor:pointer;display:flex;align-items:center;text-transform:none}ion-content[_ngcontent-%COMP%]   .import-container[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{margin-left:6px}ion-content[_ngcontent-%COMP%]   .tab-bar[_ngcontent-%COMP%]{width:calc(100% - 20px)}ion-content[_ngcontent-%COMP%]   .tab-bar[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:flex;justify-content:center;background:rgba(168,205,255,.29);align-items:center;width:-moz-fit-content;width:fit-content;height:56px;padding:8px;margin-inline:auto;-webkit-backdrop-filter:blur(15px);backdrop-filter:blur(15px);margin-top:20px;border-radius:60px}ion-content[_ngcontent-%COMP%]   .tab-bar[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{display:flex;width:-moz-fit-content;width:fit-content;font-size:14px;height:40px;justify-content:center;align-items:center;--border-radius: 50px;--background: #fff;--color: #1540bd}ion-content[_ngcontent-%COMP%]   .tab-bar[_ngcontent-%COMP%]   .active-btn[_ngcontent-%COMP%]{--background: #1540bd !important;--color: #fff !important;margin-right:10px}"]}),a})()}];let M=(()=>{var t;class a{}return(t=a).\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[f.Bz.forChild(_),f.Bz]}),a})(),Z=(()=>{var t;class a{}return(t=a).\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[m.ez,o.u5,o.UX,d.Pc,M]}),a})()}}]);