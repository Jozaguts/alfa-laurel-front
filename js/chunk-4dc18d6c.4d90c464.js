(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4dc18d6c"],{"09d3":function(e,t,r){},"6bcd":function(e,t,r){"use strict";r.d(t,"a",(function(){return s})),r.d(t,"b",(function(){return o})),r.d(t,"c",(function(){return l})),r.d(t,"d",(function(){return f})),r.d(t,"e",(function(){return m}));var n=r("1da1"),a=r("d4ec"),u=r("bee2"),c=(r("96cf"),r("bc3a")),i=r.n(c),s=function(){function e(){Object(a["a"])(this,e)}return Object(u["a"])(e,[{key:"store",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.userData,e.next=3,i.a.post("/api/users",r);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"all",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i.a.get("/api/users");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},{key:"delete",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.userId,e.next=3,i.a.delete("/api/users/".concat(r));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"get",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.userId,e.next=3,i.a.get("/api/users/".concat(r));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"update",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.userId,n=t.data,e.next=3,i.a.post("/api/users/".concat(r),{data:n,_method:"PUT"});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()}]),e}();function o(){return p.apply(this,arguments)}function p(){return p=Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i.a.get("/api/users");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),p.apply(this,arguments)}function l(e){return d.apply(this,arguments)}function d(){return d=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.userId,e.next=3,i.a.delete("/api/users/".concat(r));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)}))),d.apply(this,arguments)}function f(e){return h.apply(this,arguments)}function h(){return h=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.userId,e.next=3,i.a.get("/api/users/".concat(r));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)}))),h.apply(this,arguments)}function m(){return b.apply(this,arguments)}function b(){return b=Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i.a.get("/api/users?role=teachers");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),b.apply(this,arguments)}},"76bf":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-sheet",[r("table-component",{attrs:{headers:e.headers,items:e.desserts,search:e.search,plural_name:"Usuarios",singular_name:"Usuario",loading:e.loading},on:{init:e.init}})],1)},a=[],u=r("1da1"),c=(r("96cf"),r("d3b7"),r("3ca3"),r("ddb0"),r("a15b"),r("d81d"),r("b0c0"),r("6bcd")),i=new c["a"],s={components:{"table-component":function(){return Promise.all([r.e("chunk-70c67224"),r.e("chunk-9f5bf25e"),r.e("chunk-12a31540"),r.e("chunk-2d216f0c")]).then(r.bind(null,"c537"))}},filters:{rolesFilter:function(e){return e.map((function(e){return e.name})).join(" | ")}},name:"usuarios",data:function(){return{formTitle:"Añadir Usuario",user_id:null,loading:!0,dialog:!1,search:null,headers:[{text:"Nombre",align:"start",filterable:!0,value:"name"},{text:"Correo Electrónico",filterable:!0,value:"email"},{text:"Rol",filterable:!0,value:"roles"},{text:"Acciones",value:"actions",sortable:!1}],desserts:[],roles:[]}},created:function(){this.init()},methods:{init:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,i.all();case 3:r=t.sent,n=r.data,e.desserts=n,e.loading=!1,e.user_id=null;case 8:case"end":return t.stop()}}),t)})))()}}},o=s,p=(r("c3d8"),r("2877")),l=r("6544"),d=r.n(l),f=r("8dd9"),h=Object(p["a"])(o,n,a,!1,null,null,null);t["default"]=h.exports;d()(h,{VSheet:f["a"]})},c3d8:function(e,t,r){"use strict";r("09d3")}}]);
//# sourceMappingURL=chunk-4dc18d6c.4d90c464.js.map