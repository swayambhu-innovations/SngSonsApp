"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7814],{7814:(H,O,p)=>{p.r(O),p.d(O,{ReportDetailsPageModule:()=>U});var _=p(6814),P=p(95),h=p(6458),m=p(9599),g=p(6676),t=p(6689),w=p(5472),x=p(9916);function b(e,d){if(1&e&&(t.TgZ(0,"th"),t._uU(1),t.qZA()),2&e){const a=d.$implicit;t.xp6(1),t.hij(" ",a.text," ")}}function Z(e,d){if(1&e&&(t.TgZ(0,"div",6),t._UZ(1,"img",7),t.qZA()),2&e){const a=t.oxw().index,n=t.oxw().$implicit,o=t.oxw();t.Q6J("routerLink",n[o.reportTableActiveColumns[a].identifier])}}function T(e,d){if(1&e&&(t.TgZ(0,"div",8),t._uU(1),t.qZA()),2&e){const a=t.oxw().index,n=t.oxw().$implicit,o=t.oxw();t.xp6(1),t.Oqu(n[o.reportTableActiveColumns[a].identifier])}}function D(e,d){if(1&e&&(t.TgZ(0,"td"),t.YNc(1,Z,2,1,"div",4),t.YNc(2,T,2,1,"div",5),t.qZA()),2&e){const a=d.$implicit;t.xp6(1),t.Q6J("ngIf",null==a?null:a.isUrl),t.xp6(1),t.Q6J("ngIf",!(null!=a&&a.isUrl))}}function A(e,d){if(1&e&&(t.TgZ(0,"tr"),t.YNc(1,D,3,2,"td",3),t.qZA()),2&e){const a=t.oxw();t.xp6(1),t.Q6J("ngForOf",a.reportTableActiveColumns)}}let S=(()=>{var e;class d{constructor(){}ngOnInit(){}ngOnChanges(n){var o,r;null!=n&&n.tableData&&(this.reportTableData=null===(o=n.tableData)||void 0===o||null===(o=o.currentValue)||void 0===o?void 0:o.tableData,this.reportTableActiveColumns=null===(r=n.tableData)||void 0===r||null===(r=r.currentValue)||void 0===r?void 0:r.activeColumns)}ionViewWillEnter(){}}return(e=d).\u0275fac=function(n){return new(n||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-report-table"]],inputs:{tableData:"tableData"},features:[t.TTD],decls:8,vars:2,consts:[[1,"container"],[1,"scrollable","is-scrollable"],["cellpadding","1","cellspacing","1"],[4,"ngFor","ngForOf"],["class","table-column",3,"routerLink",4,"ngIf"],["class","table-column",4,"ngIf"],[1,"table-column",3,"routerLink"],["src","assets/icon/forward-button.svg","alt","",1,"forward-button"],[1,"table-column"]],template:function(n,o){1&n&&(t.TgZ(0,"ion-card")(1,"div",0)(2,"div",1)(3,"div")(4,"table",2)(5,"tr"),t.YNc(6,b,2,1,"th",3),t.qZA(),t.YNc(7,A,2,1,"tr",3),t.qZA()()()()()),2&n&&(t.xp6(6),t.Q6J("ngForOf",o.reportTableActiveColumns),t.xp6(1),t.Q6J("ngForOf",o.reportTableData))},dependencies:[_.sg,_.O5,h.PM,h.YI,m.rH],styles:['ion-card[_ngcontent-%COMP%]{border-radius:16px;background:rgba(255,255,255,.62)}ion-card[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{color:#1540bd;cursor:pointer}ion-card[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]{overflow-x:scroll!important;overflow-y:hidden}ion-card[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   .disabled-row[_ngcontent-%COMP%]{color:var(--Text3, #9fa7b2);font-size:14px;font-weight:400}ion-card[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   .footer-row[_ngcontent-%COMP%]{color:#1540bd;font-size:14px;font-weight:400}ion-card[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   #view-more[_ngcontent-%COMP%]:hover{background-color:transparent!important;cursor:auto!important}ion-card[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]{color:var(--Text1, #505e86);font-size:14px;font-weight:400;cursor:pointer;border-bottom:1px solid #e0e8f8;flex-wrap:nowrap}ion-card[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]:hover{background-color:#e2e8ee}ion-card[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]{text-align:left;text-overflow:ellipsis;text-wrap:nowrap}ion-card[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   .table-column[_ngcontent-%COMP%]{width:100%;overflow:hidden;white-space:pre;text-overflow:ellipsis}ion-card[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   .forward-button[_ngcontent-%COMP%]{width:10px}.scrollable[_ngcontent-%COMP%]{overflow:hidden;position:relative;width:100%}.scrollable.is-scrollable[_ngcontent-%COMP%]:after{position:absolute;top:0;left:100%;width:50px;height:100%;border-radius:10px 0 0 10px/50% 0 0 50%;box-shadow:-5px 0 10px #00000040;content:""}.scrollable[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{overflow-x:auto}.scrollable[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   [_ngcontent-%COMP%]::-webkit-scrollbar{height:12px}.scrollable[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   [_ngcontent-%COMP%]::-webkit-scrollbar-track{background:#f0f0f0;box-shadow:0 0 2px #00000026 inset}.scrollable[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]   [_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background:#ccc;border-radius:6px}.scrollable[_ngcontent-%COMP%]   table[_ngcontent-%COMP%], .scrollable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .scrollable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border:1px solid #ccc}.scrollable[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]{border-spacing:0;border-collapse:collapse;width:auto}.scrollable[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .scrollable[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:6px 8px;vertical-align:top;white-space:nowrap}.scrollable[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]   .forward-button[_ngcontent-%COMP%], .scrollable[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   .forward-button[_ngcontent-%COMP%]{width:10px;max-width:10px}.scrollable[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background:#ddd;font-weight:900;text-align:left;white-space:nowrap}.scrollable[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-child(odd){background:#f3f3f3}']}),d})();function y(e,d){if(1&e){const a=t.EpF();t.ynx(0),t.TgZ(1,"ion-col",2),t._uU(2),t.qZA(),t.TgZ(3,"ion-col",2)(4,"label",37)(5,"input",38),t.NdJ("change",function(){t.CHM(a);const o=t.oxw().$implicit,r=t.oxw(2);return t.KtG(r.onChangeColumn(o))}),t.qZA(),t._UZ(6,"span",39),t.qZA()(),t.BQk()}if(2&e){const a=t.oxw().$implicit,n=t.oxw(2);t.xp6(2),t.hij(" ",a.text," "),t.xp6(3),t.Q6J("checked",a.isActive),t.uIk("disabled",!!(a.isActive&&n.finalColumnCount<=n.minimumActiveCount)||null)}}function Y(e,d){if(1&e&&(t.TgZ(0,"ion-row",1),t.YNc(1,y,7,3,"ng-container",36),t.qZA()),2&e){const a=d.$implicit;t.xp6(1),t.Q6J("ngIf",!a.isUrl)}}function k(e,d){if(1&e&&(t.TgZ(0,"div",33)(1,"p"),t._uU(2,"Enable Column Variables"),t.qZA(),t.TgZ(3,"div",34)(4,"ion-grid"),t.YNc(5,Y,2,1,"ion-row",35),t.qZA()()()),2&e){const a=t.oxw();t.xp6(5),t.Q6J("ngForOf",a.tableColumns)}}const L=function(){return[0,1]},V=[{path:"",component:(()=>{var e;class d{constructor(n,o,r){this.navCtrl=n,this.route=o,this.shipmentService=r,this.date1="",this.date2="",this.date1Text="",this.date2Text="",this.openColVariables=!1,this.activeColumnCount=0,this.minimumActiveCount=1}ngOnInit(){}ionViewWillEnter(){this.id=this.route.snapshot.paramMap.get("id"),this.date1=g(new Date).subtract(15,"days").format("YYYY-MM-DD"),this.date1Text=g(new Date).subtract(15,"days").format("DD/MM/YY"),this.date2=g(new Date).format("YYYY-MM-DD"),this.date2Text=g(new Date).format("DD/MM/YY"),this.getReport(this.id)}onChangeColumn(n){n&&this.tableColumns.map(r=>{r.identifier==n.identifier&&(r.isActive=!n.isActive)});const o=this.tableColumns.filter(r=>r.isActive);this.finalColumnCount=this.tableColumns.filter(r=>r.isActive&&!r.isUrl).length,this.activeColumnCount=o.length,this.tableData={activeColumns:o,tableData:this.reportData}}getReport(n){"vendor wise expenses report"==n.toLowerCase()?this.shipmentService.getShipmentsByDateRange(this.date1,this.date2).then(o=>{this.vendors=structuredClone(this.shipmentService.vendorsById),this.shipments=o.docs.map(l=>({...l.data(),id:l.id})),this.shipments=o.docs.map(l=>(l.data().vendorData.map(i=>{var C;if(i.vendor&&this.vendors[i.vendor])if(null!==(C=this.vendors[i.vendor])&&void 0!==C&&C.shipments){const s=this.vendors[i.vendor].shipments.length;if(this.vendors[i.vendor].shipments[s-1])this.vendors[i.vendor].shipments[s-1].vendorShipment.push(i);else{const c=[];c.push(i);const u={fullShipment:l.data(),vendorShipment:c};this.vendors[i.vendor].shipments.push(u)}}else{this.vendors[i.vendor].shipments=[];const s=[];s.push(i);const c={fullShipment:l.data(),vendorShipment:s};this.vendors[i.vendor].shipments.push(c)}}),{...l.data(),id:l.id})),this.tableColumns=[{text:"S No",identifier:"serialNo",isActive:!0,width:1},{text:"W/S code",identifier:"WSCode",isActive:!0,width:3},{text:"W/S name",identifier:"WSName",isActive:!0,width:5},{text:"Postal Code",identifier:"postalCode",isActive:!0,width:5},{text:"PAN No",identifier:"panNo",isActive:!0,width:5},{text:"Shipment Count",identifier:"shipmentCount",isActive:!0,width:3}],this.activeColumnCount=this.tableColumns.length;let r=0;Object.keys(this.vendors).map(l=>{var i;r++,this.vendors[l].serialNo=r,this.vendors[l].shipmentCount=(null===(i=this.vendors[l].shipments)||void 0===i?void 0:i.length)||0}),this.reportData=Object.keys(this.vendors).map(l=>this.vendors[l]),this.onChangeColumn()}):"vehicle wise expenses report"==n.toLowerCase()?this.shipmentService.getShipmentsByDateRange(this.date1,this.date2).then(o=>{const r={};this.shipments=o.docs.map(i=>(r[i.data().vehicle]||(r[i.data().vehicle]={dataArray:[],vehicle:{}}),r[i.data().vehicle]={...r[i.data().vehicle],...i.data()},r[i.data().vehicle].dataArray.push({...i.data()}),{...i.data(),id:i.id})),this.tableColumns=[{text:"S No",identifier:"serialNo",isActive:!0},{text:"Vehicle No",identifier:"vehicle",isActive:!0},{text:"Transporter Name",identifier:"TransporterName",isActive:!0},{text:"Ownership",identifier:"Ownership",isActive:!0},{text:"Order Count",identifier:"VendorCount",isActive:!0}],this.activeColumnCount=this.tableColumns.length;let l=0;Object.keys(r).map(i=>{var C;l++,r[i].serialNo=l,r[i].VendorCount=(null===(C=r[i].dataArray)||void 0===C?void 0:C.length)||0}),this.reportData=Object.keys(r).map(i=>r[i]),this.onChangeColumn()}):"area wise expenses report"==n.toLowerCase()?this.shipmentService.getShipmentsByDateRange(this.date1,this.date2).then(o=>{this.vendors=structuredClone(this.shipmentService.vendorsById),this.shipments=o.docs.map(s=>(s.data().vendorData.map(c=>{var u;if(c.vendor&&this.vendors[c.vendor])if(null!==(u=this.vendors[c.vendor])&&void 0!==u&&u.shipments){const v=this.vendors[c.vendor].shipments.length;if(this.vendors[c.vendor].shipments[v-1])this.vendors[c.vendor].shipments[v-1].vendorShipment.push(c);else{const f=[];f.push(c);const M={fullShipment:s.data(),vendorShipment:f};this.vendors[c.vendor].shipments.push(M)}}else{this.vendors[c.vendor].shipments=[];const v=[];v.push(c);const f={fullShipment:s.data(),vendorShipment:v};this.vendors[c.vendor].shipments.push(f)}}),{...s.data(),id:s.id})),this.tableColumns=[{text:"S No",identifier:"serialNo",isActive:!0},{text:"W/S Town",identifier:"WSTown",isActive:!0},{text:"Vendors Count",identifier:"VendorsCount",isActive:!0},{text:"Shipment Count",identifier:"TotalShipmentCount",isActive:!0}],this.activeColumnCount=this.tableColumns.length;let r=0;Object.keys(this.vendors).map(s=>{var c;r++,this.vendors[s].serialNo=r,this.vendors[s].shipmentCount=(null===(c=this.vendors[s].shipments)||void 0===c?void 0:c.length)||0});const l=Object.keys(this.vendors).map(s=>this.vendors[s]),i={};l.map(s=>{s.WSTown&&(i[s.WSTown]||(i[s.WSTown]={},i[s.WSTown].vendors=[]),i[s.WSTown].vendors.push(s),i[s.WSTown].WSTown=s.WSTown)});const C=Object.keys(i).map(s=>i[s]);C.map((s,c)=>{var u,v;s.VendorsCount=(null===(u=s.vendors)||void 0===u?void 0:u.length)||0;let f=0;null===(v=s.vendors)||void 0===v||v.map(M=>{f+=+M.shipmentCount}),s.TotalShipmentCount=f,s.serialNo=c+1}),this.reportData=C,this.onChangeColumn()}):"shipments wise expenses report"==n.toLowerCase()&&this.shipmentService.getShipmentsByDateRange(this.date1,this.date2).then(o=>{this.shipments=o.docs.map(l=>({...l.data(),id:l.id}));let r=0;this.shipments.map(l=>{var i;r++,l.serialNo=r,l.VendorsCount=(null===(i=l.vendorData)||void 0===i?void 0:i.length)||0,l.Url="/main/shipment/"+l.id}),this.tableColumns=[{text:"S No",identifier:"serialNo",isActive:!0},{text:"Shipment Number",identifier:"ShipmentNumber",isActive:!0},{text:"Vehicle",identifier:"vehicle",isActive:!0},{text:"Ownership",identifier:"Ownership",isActive:!0},{text:"Vendors Count",identifier:"VendorsCount",isActive:!0},{text:"",identifier:"Url",isActive:!0,isUrl:!0}],this.activeColumnCount=this.tableColumns.length,this.reportData=this.shipments,this.onChangeColumn()})}goBack(){this.navCtrl.back()}dispDate(n){const o=new _.uU("en-US").transform(n,"dd MMM");return null==o?void 0:o.toString()}startDate(n){this.date1=g(new Date(n.target.value)).format("YYYY-MM-DD"),this.date1Text=g(new Date(n.target.value)).format("DD/MM/YY"),g(this.date1).isSameOrBefore(this.date2)||(this.date2=g(new Date(n.target.value)).format("YYYY-MM-DD"),this.date2Text=g(new Date(n.target.value)).format("DD/MM/YY")),this.getReport(this.id)}endDate(n){this.date2=g(new Date(n.target.value)).format("YYYY-MM-DD"),this.date2Text=g(new Date(n.target.value)).format("DD/MM/YY"),g(this.date2).isSameOrAfter(this.date1)||(this.date1=g(new Date(n.target.value)).format("YYYY-MM-DD"),this.date1Text=g(new Date(n.target.value)).format("DD/MM/YY")),this.getReport(this.id)}}return(e=d).\u0275fac=function(n){return new(n||e)(t.Y36(w.SH),t.Y36(m.gz),t.Y36(x.N))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-report-details"]],decls:71,vars:10,consts:[[3,"fullscreen"],[1,"ion-justify-content-between","ion-align-items-center"],["size","auto"],[1,"ion-justify-content-center","ion-align-items-center"],["xmlns","http://www.w3.org/2000/svg","width","30","height","30","viewBox","0 0 26 26","fill","none",3,"click"],["d","M11.7301 13.0008L17.0924 18.3629L15.5603 19.895L8.66602 13.0008L15.5603 6.10645L17.0924 7.63851L11.7301 13.0008Z","fill","#1540BD"],[1,"heading-box"],["id","heading"],["xmlns","http://www.w3.org/2000/svg","width","26","height","26","viewBox","0 0 26 26","fill","none"],["d","M5.41667 4.33333H16.25V8.66666H20.5833V21.6667H5.41667V4.33333ZM4.33171 2.16666C3.73478 2.16666 3.25 2.64772 3.25 3.24111V22.7589C3.25 23.3401 3.73182 23.8333 4.32618 23.8333H21.6738C22.268 23.8333 22.75 23.3446 22.75 22.7419L22.7497 7.58333L17.3333 2.16666H4.33171ZM11.3749 8.125C11.3749 9.83394 10.8812 11.8487 10.0478 13.7078C9.21144 15.5737 8.08322 17.171 6.90651 18.1124L8.18419 19.8598C11.3556 17.7454 14.8669 16.2956 18.2634 16.7808L18.7592 14.6806C15.8638 13.7154 13.5416 10.8224 13.5416 8.125H11.3749ZM12.0249 14.5942C12.3146 13.9481 12.5712 13.2777 12.7873 12.5975C13.2982 13.3825 13.9266 14.103 14.6359 14.7282C13.5723 14.9187 12.5304 15.2312 11.5215 15.6299C11.6999 15.2905 11.868 14.9444 12.0249 14.5942Z","fill","#FD8C63"],["d","M3.09614 3.11709L16.7144 1.17162C17.0106 1.12932 17.2849 1.33509 17.3273 1.63125C17.3308 1.65662 17.3327 1.68222 17.3327 1.70785V24.2921C17.3327 24.5912 17.0901 24.8338 16.791 24.8338C16.7653 24.8338 16.7398 24.8319 16.7144 24.8283L3.09614 22.8828C2.56244 22.8065 2.16602 22.3495 2.16602 21.8104V4.18954C2.16602 3.65042 2.56244 3.19334 3.09614 3.11709ZM4.33268 5.12911V20.8708L15.166 22.4185V3.58148L4.33268 5.12911ZM18.416 20.5833H21.666V5.41663H18.416V3.24996H22.7493C23.3477 3.24996 23.8327 3.73499 23.8327 4.3333V21.6667C23.8327 22.265 23.3477 22.75 22.7493 22.75H18.416V20.5833ZM11.0493 13L14.0827 17.3333H11.4827L9.74935 14.8572L8.016 17.3333H5.41602L8.44935 13L5.41602 8.66663H8.016L9.74935 11.1428L11.4827 8.66663H14.0827L11.0493 13Z","fill","#2FBC50"],["xmlns","http://www.w3.org/2000/svg","width","25","height","22","viewBox","0 0 25 22","fill","none"],["d","M0 11.5583L2.94974 9.20389C3.08698 9.09344 3.25717 9.0333 3.43254 9.0333C3.6079 9.0333 3.77809 9.09344 3.91533 9.20389L6.86819 11.5583L5.90882 12.7969L4.15206 11.3975C4.2305 13.1056 4.81474 14.7504 5.82888 16.1182C6.84302 17.486 8.2402 18.5136 9.83895 19.0676C11.4377 19.6216 13.1641 19.6763 14.794 19.2246C16.4239 18.773 17.8819 17.8359 18.9786 16.535L20.1623 17.5562C18.8678 19.1033 17.1427 20.2198 15.2118 20.7601C13.2809 21.3004 11.234 21.2395 9.33786 20.5852C7.44174 19.9309 5.78447 18.7137 4.58217 17.0922C3.37987 15.4707 2.68834 13.5203 2.59776 11.4953L0.962481 12.7969L0 11.5583ZM18.3401 10.4426L21.2929 12.7969C21.4302 12.9074 21.6004 12.9675 21.7757 12.9675C21.9511 12.9675 22.1213 12.9074 22.2585 12.7969L25.2114 10.4426L24.2489 9.20389L22.5451 10.5623C22.4658 8.53178 21.7821 6.57285 20.5837 4.94221C19.3853 3.31156 17.728 2.08525 15.829 1.42396C13.93 0.762675 11.8779 0.697254 9.9416 1.23627C8.00525 1.77529 6.27498 2.8936 4.97749 4.44468L6.16112 5.46586C7.25461 4.16891 8.70724 3.23346 10.3314 2.78031C11.9556 2.32716 13.6768 2.37713 15.2726 2.92376C16.8685 3.47039 18.2657 4.48858 19.2839 5.84684C20.3021 7.2051 20.8945 8.84104 20.9846 10.5434L19.3026 9.20389L18.3401 10.4426Z","fill","#1540BD"],[1,"upload-text"],["shape","round"],["for","Date1"],["id","Date1","type","date","onfocus","this.showPicker()",3,"value","change"],["for","Date2"],["id","Date2","type","date","onfocus","this.showPicker()",3,"change"],["xmlns","http://www.w3.org/2000/svg","width","21","height","20","viewBox","0 0 21 20","fill","none"],["fill-rule","evenodd","clip-rule","evenodd","d","M6.33268 1.66667C6.79292 1.66667 7.16602 2.03977 7.16602 2.50001V3.33334H13.8327V2.50001C13.8327 2.03977 14.2058 1.66667 14.666 1.66667C15.1263 1.66667 15.4993 2.03977 15.4993 2.50001V3.33334H16.3327C17.7134 3.33334 18.8327 4.45263 18.8327 5.83334V15.8333C18.8327 17.2141 17.7134 18.3333 16.3327 18.3333H4.66602C3.2853 18.3333 2.16602 17.2141 2.16602 15.8333V5.83334C2.16602 4.45263 3.2853 3.33334 4.66602 3.33334H5.49935V2.50001C5.49935 2.03977 5.87244 1.66667 6.33268 1.66667ZM13.8327 5.00001V5.83334C13.8327 6.29358 14.2058 6.66667 14.666 6.66667C15.1263 6.66667 15.4993 6.29358 15.4993 5.83334V5.00001H16.3327C16.7929 5.00001 17.166 5.3731 17.166 5.83334V8.33334H3.83268V5.83334C3.83268 5.3731 4.20578 5.00001 4.66602 5.00001H5.49935V5.83334C5.49935 6.29358 5.87244 6.66667 6.33268 6.66667C6.79292 6.66667 7.16602 6.29358 7.16602 5.83334V5.00001H13.8327ZM3.83268 10V15.8333C3.83268 16.2936 4.20578 16.6667 4.66602 16.6667H16.3327C16.7929 16.6667 17.166 16.2936 17.166 15.8333V10H3.83268Z","fill","white"],["type","file","id","uploadZSD",2,"display","none"],["id","actions"],[1,"ion-justify-content-evenly","ion-align-items-center"],[3,"click"],["xmlns","http://www.w3.org/2000/svg","width","16","height","13","viewBox","0 0 16 13","fill","none"],["fill-rule","evenodd","clip-rule","evenodd","d","M8.29452 2.16667C8.57511 0.920669 9.56475 0 10.7425 0C11.9203 0 12.91 0.920669 13.1906 2.16667H14.5336C14.8828 2.16667 15.1659 2.48724 15.1659 2.88889C15.1659 3.28776 14.8832 3.61111 14.5336 3.61111H13.1906C12.91 4.85711 11.9203 5.77778 10.7425 5.77778C9.56475 5.77778 8.57511 4.85711 8.29452 3.61111H0.632353C0.283114 3.61111 0 3.29054 0 2.88889C0 2.49002 0.282762 2.16667 0.632353 2.16667H8.29452ZM1.97537 9.38889C2.25597 8.14289 3.24561 7.22222 4.4234 7.22222C5.60119 7.22222 6.59083 8.14289 6.87142 9.38889H14.5336C14.8828 9.38889 15.1659 9.70946 15.1659 10.1111C15.1659 10.51 14.8832 10.8333 14.5336 10.8333H6.87142C6.59083 12.0793 5.60119 13 4.4234 13C3.24561 13 2.25597 12.0793 1.97537 10.8333H0.632353C0.283114 10.8333 0 10.5128 0 10.1111C0 9.71224 0.282762 9.38889 0.632353 9.38889H1.97537ZM4.4234 11.5556C5.12139 11.5556 5.68723 10.9089 5.68723 10.1111C5.68723 9.31337 5.12139 8.66667 4.4234 8.66667C3.72541 8.66667 3.15957 9.31337 3.15957 10.1111C3.15957 10.9089 3.72541 11.5556 4.4234 11.5556ZM10.7425 4.33333C11.4405 4.33333 12.0064 3.68663 12.0064 2.88889C12.0064 2.09114 11.4405 1.44444 10.7425 1.44444C10.0445 1.44444 9.47871 2.09114 9.47871 2.88889C9.47871 3.68663 10.0445 4.33333 10.7425 4.33333Z","fill","#1540BD"],["xmlns","http://www.w3.org/2000/svg","width","24","height","24","viewBox","0 0 24 24","fill","none"],["d","M16 13.6364C16 13.7841 15.9505 13.9119 15.8516 14.0199L12.3516 17.8381C12.2526 17.946 12.1354 18 12 18C11.8646 18 11.7474 17.946 11.6484 17.8381L8.14844 14.0199C8.04948 13.9119 8 13.7841 8 13.6364C8 13.4886 8.04948 13.3608 8.14844 13.2528C8.24739 13.1449 8.36458 13.0909 8.5 13.0909H15.5C15.6354 13.0909 15.7526 13.1449 15.8516 13.2528C15.9505 13.3608 16 13.4886 16 13.6364ZM16 10.3636C16 10.5114 15.9505 10.6392 15.8516 10.7472C15.7526 10.8551 15.6354 10.9091 15.5 10.9091H8.5C8.36458 10.9091 8.24739 10.8551 8.14844 10.7472C8.04948 10.6392 8 10.5114 8 10.3636C8 10.2159 8.04948 10.0881 8.14844 9.98011L11.6484 6.16193C11.7474 6.05398 11.8646 6 12 6C12.1354 6 12.2526 6.05398 12.3516 6.16193L15.8516 9.98011C15.9505 10.0881 16 10.2159 16 10.3636Z","fill","#1540BD"],[3,"tableData"],[1,"below-space"],["trigger","set-mode-modal",3,"isOpen","initialBreakpoint","breakpoints"],["modal",""],[1,"ion-padding","wrapper"],[1,"col-list"],["class","ion-justify-content-between ion-align-items-center",4,"ngFor","ngForOf"],[4,"ngIf"],[1,"switch"],["type","checkbox",3,"checked","change"],[1,"slider","round"]],template:function(n,o){1&n&&(t.TgZ(0,"ion-content",0)(1,"ion-grid")(2,"ion-row",1)(3,"ion-col",2)(4,"ion-row",3)(5,"ion-col",2),t.O4$(),t.TgZ(6,"svg",4),t.NdJ("click",function(){return o.goBack()}),t._UZ(7,"path",5),t.qZA()(),t.kcU(),t.TgZ(8,"ion-col",2)(9,"div")(10,"span",6)(11,"ion-text",7),t._uU(12),t.qZA()(),t.TgZ(13,"ion-text"),t._uU(14," Synced 2 Min Ago "),t.qZA()()()()(),t.TgZ(15,"ion-col",2),t.O4$(),t.TgZ(16,"svg",8),t._UZ(17,"path",9),t.qZA(),t.TgZ(18,"svg",8),t._UZ(19,"path",10),t.qZA(),t.TgZ(20,"svg",11),t._UZ(21,"path",12),t.qZA()()()(),t.kcU(),t.TgZ(22,"ion-card")(23,"ion-grid")(24,"ion-row",1)(25,"ion-col",2)(26,"div",13)(27,"span"),t._uU(28,"Select A"),t.qZA(),t.TgZ(29,"span"),t._uU(30,"Date Range"),t.qZA()()(),t.TgZ(31,"ion-col",2)(32,"ion-button",14)(33,"span")(34,"label",15),t._uU(35),t.TgZ(36,"input",16),t.NdJ("change",function(l){return o.startDate(l)}),t.qZA()(),t._uU(37," - "),t.TgZ(38,"label",17),t._uU(39),t.TgZ(40,"input",18),t.NdJ("change",function(l){return o.endDate(l)}),t.qZA()()(),t.O4$(),t.TgZ(41,"svg",19),t._UZ(42,"path",20),t.qZA()(),t.kcU(),t._UZ(43,"input",21),t.qZA()()()(),t.TgZ(44,"ion-grid",22)(45,"ion-row",23)(46,"ion-col",2)(47,"ion-card",24),t.NdJ("click",function(){return o.openColVariables=!o.openColVariables}),t.TgZ(48,"ion-grid")(49,"ion-row",1)(50,"ion-col",2)(51,"span"),t._uU(52,"Variables"),t.qZA()(),t.TgZ(53,"ion-col",2),t.O4$(),t.TgZ(54,"svg",25),t._UZ(55,"path",26),t.qZA()()()()()(),t.kcU(),t.TgZ(56,"ion-col",2)(57,"ion-card")(58,"ion-grid")(59,"ion-row",1)(60,"ion-col",2)(61,"span"),t._uU(62,"Sort By"),t.qZA()(),t.TgZ(63,"ion-col",2),t.O4$(),t.TgZ(64,"svg",27),t._UZ(65,"path",28),t.qZA()()()()()()()(),t.kcU(),t._UZ(66,"app-report-table",29)(67,"div",30),t.qZA(),t.TgZ(68,"ion-modal",31,32),t.YNc(70,k,6,1,"ng-template"),t.qZA()),2&n&&(t.Q6J("fullscreen",!0),t.xp6(12),t.hij(" ",o.id," "),t.xp6(23),t.hij(" ",o.date1Text," "),t.xp6(1),t.Q6J("value",o.date1),t.xp6(3),t.hij("",o.date2Text," "),t.xp6(27),t.Q6J("tableData",o.tableData),t.xp6(2),t.Q6J("isOpen",o.openColVariables)("initialBreakpoint",1)("breakpoints",t.DdM(9,L)))},dependencies:[_.sg,_.O5,h.YG,h.PM,h.wI,h.W2,h.jY,h.Nd,h.yW,h.ki,S],styles:["*[_ngcontent-%COMP%]{font-family:NATS}ion-content[_ngcontent-%COMP%]{--background: linear-gradient( 180deg, #d5e6ff -8.94%, #fff 27.36%, #fff 61.93%, #c9deff 101.69% )}ion-content[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]{display:flex;align-items:center}ion-content[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start}ion-content[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{margin-left:7px;cursor:pointer}ion-content[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]:focus{border:none;outline:none}ion-content[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   .heading-box[_ngcontent-%COMP%]{width:11.43rem;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;white-space:pre-wrap;margin-left:-8px}ion-content[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   .heading-box[_ngcontent-%COMP%]   #heading[_ngcontent-%COMP%]{color:var(--Primary, #1540bd);font-size:20px;font-weight:400}ion-content[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]   ion-text[_ngcontent-%COMP%]{color:var(--Buttons, #1659be);text-align:right;font-size:12px;font-weight:400}ion-content[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]{border-radius:50px;height:-moz-fit-content;height:fit-content;box-shadow:2px 2px 5px 2px #357af81a}ion-content[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   .upload-text[_ngcontent-%COMP%]{display:flex;align-items:flex-start;margin-left:10px;flex-direction:column;color:var(--Primary, #1540bd);font-size:14px;font-weight:500}ion-content[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{width:-moz-fit-content;width:fit-content;height:-moz-fit-content;height:fit-content;color:#fff;font-size:14px;font-weight:400;--background: #1540bd;--box-shadow: 0 2px 6px 0 rgb(0, 0, 0, .25);--ripple-color: #c9deff;--padding-top: 16px;--padding-bottom: 16px}ion-content[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{position:relative}ion-content[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{margin-left:6px}ion-content[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]   input[type=date][_ngcontent-%COMP%]{position:absolute;opacity:0;top:0;left:0;width:100%;height:100%}ion-content[_ngcontent-%COMP%]   #actions[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]{width:145px;border-radius:50px;padding-inline:5px;height:-moz-fit-content;height:fit-content;box-shadow:2px 2px 5px 2px #357af81a}ion-content[_ngcontent-%COMP%]   #actions[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--Primary, #1540bd);font-size:14px;font-weight:400}ion-modal[_ngcontent-%COMP%]   ion-content[_ngcontent-%COMP%]{--border-radius: 24px 24px 0px 0px;--background: linear-gradient( 180deg, #e8f2ff -14.44%, #fff 13.92%, #fff 88.77%, #dbe9ff 110.22% )}ion-modal[_ngcontent-%COMP%]   ion-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:var(--Primary, #1540bd);font-size:20px;font-weight:400;line-height:100%;letter-spacing:-.22px;text-align:center}ion-modal[_ngcontent-%COMP%]   ion-content[_ngcontent-%COMP%]   .col-list[_ngcontent-%COMP%]{height:50vh;overflow:auto;margin-top:10px}ion-modal[_ngcontent-%COMP%]   ion-content[_ngcontent-%COMP%]   .col-list[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]{margin:5px 0;border-bottom:1px solid #e0e8f8}ion-modal[_ngcontent-%COMP%]   ion-content[_ngcontent-%COMP%]   .col-list[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]{color:var(--Text1, #505e86);font-size:14px;font-weight:400}.wrapper[_ngcontent-%COMP%]{height:200px}"]}),d})()}];let R=(()=>{var e;class d{}return(e=d).\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[m.Bz.forChild(V),m.Bz]}),d})();var N=p(6208);let U=(()=>{var e;class d{}return(e=d).\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[_.ez,P.u5,h.Pc,R,N.m]}),d})()}}]);