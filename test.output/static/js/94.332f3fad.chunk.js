"use strict";(self.webpackChunkpet_logger=self.webpackChunkpet_logger||[]).push([[94,863],{8863:function(e,n,r){r.r(n),r.d(n,{default:function(){return i}});r(2791);var t=r(4294),o=r(8880),a=r(184),s=function(){var e=(0,o.D3)(),n=e.logout,r=e.isAuthenticated;return(0,a.jsx)(a.Fragment,{children:r?(0,a.jsxs)("button",{style:{padding:"5px",paddingLeft:"10px",paddingRight:"10px",cursor:"pointer",fontSize:"14px",backgroundColor:"gold",borderRadius:"50%",marginLeft:"20px"},onClick:n,children:["Log",(0,a.jsx)("br",{}),"out"]}):(0,a.jsxs)("button",{style:{padding:"5px",paddingLeft:"10px",paddingRight:"10px",cursor:"pointer",fontSize:"14px",backgroundColor:"gold",borderRadius:"50%",marginLeft:"20px"},onClick:function(){window.location.href="".concat(window.location.origin)},children:["Log ",(0,a.jsx)("br",{}),"in"]})})};var i=function(){return(0,a.jsx)("nav",{className:"navbar",children:(0,a.jsxs)("div",{className:"navbar-container",children:[(0,a.jsx)("a",{href:"/home",className:"navbar-logo",children:(0,a.jsx)("h2",{children:"Pet Logger"})}),(0,a.jsxs)("ul",{className:"nav-menu",children:[(0,a.jsx)("li",{className:"nav-item",children:(0,a.jsx)(t.Z,{style:{color:"white"},href:"/Checklist",className:"nav-links",children:"Pet Errands todo"})}),(0,a.jsx)("li",{className:"nav-item",children:(0,a.jsx)(t.Z,{style:{color:"white"},href:"/VetFinder",className:"nav-links",children:"Find Vets Near You"})}),(0,a.jsx)("li",{className:"nav-item",children:(0,a.jsx)(t.Z,{style:{color:"white"},href:"/aboutUs",className:"nav-links",children:"About Us"})}),(0,a.jsx)("li",{children:(0,a.jsx)(s,{})})]})]})})}},4094:function(e,n,r){r.r(n);var t=r(4942),o=r(1413),a=r(4165),s=r(5861),i=r(9439),c=r(2791),l=r(890),u=r(6362),g=r(1582),h=r(9437),d=r(5523),x=r(97),f=r(2477),v=r(4294),p=r(1243),j=r(8863),m=(r(6451),r(7689)),b=r(8880),Z=r(1087),y=r(184);n.default=function(){var e=(0,c.useState)({selectedPetId:"",aggression:"no",aggressionExplanation:"",selectedSymptomId:""}),n=(0,i.Z)(e,2),r=n[0],w=n[1],O=(0,c.useState)("active"),k=(0,i.Z)(O,2),C=k[0],E=k[1],P=(0,c.useState)("routine change"),N=(0,i.Z)(P,2),I=N[0],L=N[1],S=(0,m.UO)(),D=S.logsID,A=S.petID,B=(0,b.D3)(),_=B.user,F=B.getIdTokenClaims,R=(0,c.useState)(null),U=(0,i.Z)(R,2),z=U[0],G=U[1];(0,c.useEffect)((function(){var e=function(){var e=(0,s.Z)((0,a.Z)().mark((function e(){var n;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!_){e.next=6;break}return e.next=4,F();case 4:n=e.sent,G(n["https://example.com/userId"]);case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.error("Error fetching user ID:",e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}();e()}),[F,_]),(0,c.useEffect)((function(){p.Z.get("http://localhost:4000/GetAllSymptoms").then((function(e){Array.isArray(e.data.symptoms)||console.error("Symptoms data is not an array:",e.data)})).catch((function(e){console.error("Error fetching symptoms:",e)}))}),[]),(0,c.useEffect)((function(){p.Z.get("http://localhost:4000/GetAllPets").then((function(e){})).catch((function(e){console.error("Error fetching pets:",e)}))}),[]);var V=function(e){var n=e.target,r=n.name,a=n.value;w((function(e){return(0,o.Z)((0,o.Z)({},e),{},(0,t.Z)({},r,a))}))};return(0,y.jsxs)("div",{children:[(0,y.jsx)(j.default,{}),(0,y.jsx)("div",{className:"form-container",children:(0,y.jsxs)("div",{className:"form",children:[(0,y.jsx)(l.Z,{variant:"h6",children:"Behavior"}),(0,y.jsx)("br",{}),(0,y.jsx)("br",{}),(0,y.jsx)(u.Z,{children:"Activity Level?"}),(0,y.jsx)("br",{}),(0,y.jsx)("br",{}),(0,y.jsx)(g.Z,{spacing:3,direction:"row",sx:{marginBottom:4},children:(0,y.jsxs)(h.Z,{value:C,onChange:function(e){return E(e.target.value)},children:[(0,y.jsx)(d.Z,{value:"active",control:(0,y.jsx)(x.Z,{}),label:"Active"}),(0,y.jsx)(d.Z,{value:"lazy",control:(0,y.jsx)(x.Z,{}),label:"Lazy"}),(0,y.jsx)(d.Z,{value:"both",control:(0,y.jsx)(x.Z,{}),label:"Both"})]})}),(0,y.jsx)(u.Z,{children:"Any Behavior Changes?"}),(0,y.jsx)(g.Z,{spacing:3,direction:"row",sx:{marginBottom:4},children:(0,y.jsxs)(h.Z,{value:I,onChange:function(e){return L(e.target.value)},children:[(0,y.jsx)(d.Z,{value:"routine change",control:(0,y.jsx)(x.Z,{}),label:"Routine Change"}),(0,y.jsx)(d.Z,{value:"other behavioral change",control:(0,y.jsx)(x.Z,{}),label:"Other Behavioral Change"}),(0,y.jsx)(d.Z,{value:"no behavioral change",control:(0,y.jsx)(x.Z,{}),label:"No Behavioral Change"})]})}),(0,y.jsx)("br",{}),(0,y.jsx)(u.Z,{children:"Any aggression observed?"}),(0,y.jsxs)(h.Z,{value:r.aggression,onChange:function(e){return V({target:{name:"aggression",value:e.target.value}})},children:[(0,y.jsx)(d.Z,{value:"no",control:(0,y.jsx)(x.Z,{}),label:"No"}),(0,y.jsx)(d.Z,{value:"yes",control:(0,y.jsx)(x.Z,{}),label:"Yes"})]}),"yes"===r.aggression&&(0,y.jsxs)("div",{children:[(0,y.jsx)(u.Z,{children:"Explain aggression:"}),(0,y.jsx)("br",{}),(0,y.jsx)("br",{}),(0,y.jsx)(f.Z,{type:"text",value:r.aggressionExplanation,onChange:function(e){return V({target:{name:"aggressionExplanation",value:e.target.value}})}})]}),(0,y.jsx)("br",{}),(0,y.jsx)(Z.rU,{to:"/LoggingForms/".concat(D,"/").concat(A),children:(0,y.jsx)(v.Z,{variant:"contained",color:"primary",onClick:function(){var e="";e="yes"===r.aggression&&""!==r.aggressionExplanation.trim()?r.aggressionExplanation.trim():"No signs of aggression";var n={selectedPetId:r.selectedPetId,aggression:r.aggression,aggressionExplanation:e,selectedSymptomId:r.selectedSymptomId,activity:C,behaviorChanges:I,Logs_logsID:D,Logs_Pet_petID:A,Logs_Pet_User_userID:z};p.Z.post("http://localhost:4000/InsertPetBehavior",n).then((function(){console.log("Behavior info added successfully")})).catch((function(e){console.error("Error adding behavior info:",e)}))},children:"Finish"})})]})})]})}},6451:function(){},1413:function(e,n,r){r.d(n,{Z:function(){return a}});var t=r(4942);function o(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function a(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?o(Object(r),!0).forEach((function(n){(0,t.Z)(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}}}]);
//# sourceMappingURL=94.332f3fad.chunk.js.map