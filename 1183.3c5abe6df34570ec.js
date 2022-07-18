"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1183],{1183:(S,d,o)=>{o.r(d),o.d(d,{ListPageModule:()=>U});var m=o(6895),h=o(4719),a=o(4123),c=o(5012),u=o(5861),C=o(2817),P=o(8701),t=o(6738),p=o(4911),f=o(3071),M=o(5174),O=o(2468),v=o(3482),Z=o(6604);function A(e,r){if(1&e){const n=t.EpF();t.TgZ(0,"ion-item")(1,"ion-label"),t._uU(2),t.qZA(),t.TgZ(3,"ion-button",8),t._UZ(4,"ion-icon",9),t.qZA(),t.TgZ(5,"ion-button",10),t.NdJ("click",function(){const s=t.CHM(n).$implicit,g=t.oxw();return t.KtG(g.showConfirmAlert(s))}),t._UZ(6,"ion-icon",11),t.qZA(),t._UZ(7,"ion-reorder",12),t.qZA()}if(2&e){const n=r.$implicit;t.xp6(2),t.hij(" ",n.title," "),t.xp6(1),t.MGl("routerLink","/catalog/details/",n.id,"")}}const y=[{path:"",component:(()=>{class e{constructor(n,i,l,s,g,z,N,Y){this.catalogService=n,this.router=i,this.loadingCtrl=l,this.userService=s,this.tokenDecode=g,this.modalCtrl=z,this.alertCtrl=N,this.dataService=Y,this.currentPage=1,this.isNewCatalogModalOpen=!1,this.notifierSubscription=this.dataService.catalogListNotifier.subscribe(J=>{this.getAllCatalogs()}),this.mobileCheck(),this.modalAnimations=P.L.getModalAnimation()}reorderCatalogs(n){n.detail.complete()}mobileCheck(){this.mobile=!(window.innerWidth>768)}onResize(n){this.mobileCheck()}ngOnInit(){this.getAllCatalogs()}ionViewWillEnter(){this.getAllCatalogs()}getAllCatalogs(n){var i=this;return(0,u.Z)(function*(){const l=yield i.loadingCtrl.create({message:"Loading..",spinner:"bubbles"});yield l.present(),i.userService.getUser(i.tokenDecode.getId()).subscribe(s=>{l.dismiss(),i.catalogs=s.catalogs},s=>{console.log(s),l.dismiss()})})()}loadMore(n){this.currentPage++,this.getAllCatalogs(n)}delete(n){this.catalogService.deleteCatalog(n.id).subscribe(i=>{this.getAllCatalogs()})}ngOnDestroy(){this.modalCtrl.dismiss()}openNewCatalogModal(){var n=this;return(0,u.Z)(function*(){yield(yield n.modalCtrl.create({component:C.Z,cssClass:["namastest-modal","namastest-center-modal"],enterAnimation:n.modalAnimations.enterAnimation,leaveAnimation:n.modalAnimations.leaveAnimation})).present()})()}showConfirmAlert(n){this.alertCtrl.create({header:"!! Suppression !!",message:"Voulez-vous vraiment supprimer ce catalogue?",buttons:[{text:"Confirmer",handler:()=>{this.delete(n)}},{text:"Annuler"}]}).then(i=>{i.present()})}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(p.a),t.Y36(c.F0),t.Y36(a.HT),t.Y36(f.K),t.Y36(M.j),t.Y36(a.IN),t.Y36(a.Br),t.Y36(O.D))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-list"]],hostBindings:function(n,i){1&n&&t.NdJ("resize",function(s){return i.onResize(s)},!1,t.Jf7)},decls:23,vars:1,consts:[["placeholder","filtrer mes tests"],["size","medium","expand","block","color","primary"],["name","help-circle-outline"],["size","medium","expand","block","color","primary",3,"click"],["name","add-circle-outline"],[1,"ion-content-scroll-host"],["disabled","false",3,"ionItemReorder"],[4,"ngFor","ngForOf"],["slot","end",1,"eye",3,"routerLink"],["name","eye"],["slot","end","color","danger","size","small",1,"mt-3","trash",3,"click"],["name","trash"],["slot","end"]],template:function(n,i){1&n&&(t._UZ(0,"app-header"),t.TgZ(1,"ion-content")(2,"div")(3,"h1"),t._uU(4,"Vos catalogues"),t.qZA(),t.TgZ(5,"nav"),t._UZ(6,"ion-searchbar",0),t.TgZ(7,"ion-button",1)(8,"span")(9,"span"),t._uU(10,"Aide"),t.qZA(),t._UZ(11,"ion-icon",2),t.qZA()(),t.TgZ(12,"h2"),t._uU(13,"Options"),t.qZA(),t.TgZ(14,"ion-button",3),t.NdJ("click",function(){return i.openNewCatalogModal()}),t.TgZ(15,"span")(16,"span"),t._uU(17,"Nouveau catalogue"),t.qZA(),t._UZ(18,"ion-icon",4),t.qZA()()(),t.TgZ(19,"ion-virtual-scroll",5)(20,"ion-reorder-group",6),t.NdJ("ionItemReorder",function(s){return i.reorderCatalogs(s)}),t.YNc(21,A,8,2,"ion-item",7),t.qZA()()()(),t._UZ(22,"app-footer-menu")),2&n&&(t.xp6(21),t.Q6J("ngForOf",i.catalogs))},dependencies:[m.sg,a.YG,a.W2,a.gu,a.Ie,a.Q$,a.Nh,a.oz,a.VI,a.j9,a.YI,a.aJ,c.rH,v.G,Z.i],styles:["ion-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:2em auto 1em}ion-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-bottom:1em}ion-content[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%], ion-content[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%], ion-content[_ngcontent-%COMP%]   ion-searchbar[_ngcontent-%COMP%]{margin-bottom:20px}ion-content[_ngcontent-%COMP%]   .eye[_ngcontent-%COMP%]{margin-top:1rem;font-size:medium;--box-shadow: 0 ;color:#fff}ion-content[_ngcontent-%COMP%]   .trash[_ngcontent-%COMP%]{width:3rem}ion-content[_ngcontent-%COMP%]   .button-native[_ngcontent-%COMP%]{--background: red}ion-content[_ngcontent-%COMP%]   ion-searchbar[_ngcontent-%COMP%]{width:100%;padding:2px}ion-content[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{padding-left:2em}ion-content[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{flex:1;display:flex;justify-content:space-around}ion-content[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] > span[_ngcontent-%COMP%] > [_ngcontent-%COMP%]:first-child{flex:1}ion-content[_ngcontent-%COMP%]   ion-virtual-scroll[_ngcontent-%COMP%]{max-height:70vh;min-height:41vh;overflow-y:scroll}@media screen and (min-width: 768px){ion-content[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]:first-child{padding:2rem}ion-content[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:first-child{display:flex;flex-wrap:wrap}ion-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:1em auto 2em;width:100%}ion-content[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]{min-width:25%;margin-right:2rem}ion-content[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:space-between}ion-content[_ngcontent-%COMP%]   ion-virtual-scroll[_ngcontent-%COMP%]{flex:1;padding-left:1rem;border-left:1px solid #dee2e6}ion-content[_ngcontent-%COMP%]   ion-accordion-header[_ngcontent-%COMP%]{width:100%}}"]}),e})()}];let b=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[c.Bz.forChild(y),c.Bz]}),e})();var L=o(3189),x=o(4733),T=o(5721),_=o(677);let U=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[m.ez,h.u5,a.Pc,b,L.h,x.CreatePageCatalogModule,_.O,T.h]}),e})()}}]);