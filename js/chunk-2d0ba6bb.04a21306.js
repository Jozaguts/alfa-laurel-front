(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ba6bb"],{"36ac":function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-btn",{staticClass:"mx-3",attrs:{color:"grey lighten-2",tile:"",loading:t.statusButton},on:{click:t.cancel}},[t._v("Regresar")])},a=[],o={name:"CancelButton",data:function(){return{statusButton:!1}},methods:{cancel:function(){this.statusButton=!0,this.$store.state.examen.dialog?this.$store.commit("examen/CLOSE_CREATE_DIALOG"):this.$store.state.examen.dialogUpdate&&this.$store.commit("examen/CLOSE_UPDATE_DIALOG"),this.$store.commit("examen/RESET_FORM"),this.$store.commit("examen/SET_STEP",1),this.$emit("reset-form"),this.statusButton=!1}}},i=o,c=s("2877"),r=s("6544"),u=s.n(r),m=s("8336"),l=Object(c["a"])(i,n,a,!1,null,"16b9626a",null);e["default"]=l.exports;u()(l,{VBtn:m["a"]})}}]);
//# sourceMappingURL=chunk-2d0ba6bb.04a21306.js.map