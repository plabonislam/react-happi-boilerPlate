(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{33:function(e,t,n){},34:function(e,t,n){},63:function(e,t,n){"use strict";n.r(t);var c=n(0),s=n.n(c),r=n(25),i=n.n(r),o=(n(33),n.p,n(34),n(10)),j=n(2),a=n(1);function l(){return Object(a.jsx)("h2",{children:"Home"})}var u=n(13),b=n.n(u),O=n(26),d=n(16),h=n(27),x=n.n(h),p="http://localhost:3001";function f(){var e=Object(c.useState)([]),t=Object(d.a)(e,2),n=t[0],s=t[1],r=Object(c.useState)(p),i=Object(d.a)(r,2),o=i[0];i[1];return console.log("".concat(o,"/people")),Object(c.useEffect)((function(){(function(){var e=Object(O.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.a.get("".concat(o,"/people")).then((function(e){console.log(e),s(e.data)}));case 2:e.sent;case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(a.jsx)("div",{children:n.map((function(e){return Object(a.jsxs)("li",{className:"list",children:[Object(a.jsxs)("span",{className:"repo-text",children:[e.firstname," "]}),Object(a.jsx)("span",{className:"repo-description",children:e.lastname})]},e._id)}))})}function _(){return Object(a.jsx)("h2",{children:"About"})}function E(){return Object(a.jsx)(o.a,{children:Object(a.jsxs)("div",{children:[Object(a.jsx)("nav",{children:Object(a.jsxs)("ul",{children:[Object(a.jsx)("li",{children:Object(a.jsx)(o.b,{to:"/",children:"Home"})}),Object(a.jsx)("li",{children:Object(a.jsx)(o.b,{to:"/about",children:"About"})}),Object(a.jsx)("li",{children:Object(a.jsx)(o.b,{to:"/users",children:"Users"})})]})}),Object(a.jsxs)(j.c,{children:[Object(a.jsx)(j.a,{path:"/about",children:Object(a.jsx)(_,{})}),Object(a.jsx)(j.a,{path:"/users",children:Object(a.jsx)(f,{})}),Object(a.jsx)(j.a,{path:"/",children:Object(a.jsx)(l,{})})]})]})})}console.log(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_NOT_SECRET_CODE:"production"}).REACT_APP_RUN_ENV);var S=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,64)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),c(e),s(e),r(e),i(e)}))};i.a.render(Object(a.jsx)(s.a.StrictMode,{children:Object(a.jsx)(E,{})}),document.getElementById("root")),S()}},[[63,1,2]]]);
//# sourceMappingURL=main.1d871c31.chunk.js.map