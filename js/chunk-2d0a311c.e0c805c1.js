(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0a311c"],{"0138":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-btn",{attrs:{plain:""},on:{click:function(t){e.dialog=!e.dialog}}},[a("v-icon",[e._v(" mdi-delete ")]),a("v-dialog",{attrs:{"max-width":"450px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-card",[a("v-card-title",{staticClass:"title grey--text text--darken-1"},[e._v("Se eliminara el examen ¿Estas de acuerdo?")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"primary",outlined:"",text:""},on:{click:function(t){e.dialog=!1}}},[e._v("Cancelar")]),a("v-btn",{attrs:{color:"primary",loading:e.loading},on:{click:e.destroy}},[e._v("Aceptar")])],1)],1)],1)],1)},r=[],i=a("1da1"),c=(a("96cf"),a("63c8")),o={name:"DeleteButton",props:["id"],data:function(){return{loading:!1,dialog:!1}},methods:{destroy:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.loading=!0,t.next=4,Object(c["c"])({examenId:e.id});case 4:e.$store.commit("settings/SHOW_SNACKBAR",{text:"Examen eliminado correctamente",color:"success"},{root:!0}),e.$emit("submitted",{success:!0}),t.next=12;break;case 8:t.prev=8,t.t0=t["catch"](0),e.$store.commit("settings/SHOW_SNACKBAR",{text:"No se pudo eliminar el examen"},{root:!0}),e.$emit("submitted",{success:!1});case 12:return t.prev=12,e.loading=!1,e.dialog=!1,t.finish(12);case 16:case"end":return t.stop()}}),t,null,[[0,8,12,16]])})))()}}},s=o,l=a("2877"),d=a("6544"),u=a.n(d),m=a("8336"),p=a("b0af"),v=a("99d9"),g=a("169a"),x=a("132d"),f=a("2fa4"),b=Object(l["a"])(s,n,r,!1,null,"240b47c5",null);t["default"]=b.exports;u()(b,{VBtn:m["a"],VCard:p["a"],VCardActions:v["a"],VCardTitle:v["d"],VDialog:g["a"],VIcon:x["a"],VSpacer:f["a"]})}}]);
//# sourceMappingURL=chunk-2d0a311c.e0c805c1.js.map