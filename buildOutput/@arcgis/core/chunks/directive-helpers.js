/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{Z as e}from"./componentsUtils.js";const{I:o}=e,t=e=>void 0===e.strings,n=()=>document.createComment(""),A=(e,t,A)=>{const i=e._$AA.parentNode,$=void 0===t?e._$AB:t._$AA;if(void 0===A){const t=i.insertBefore(n(),$),_=i.insertBefore(n(),$);A=new o(t,_,e,e.options)}else{const o=A._$AB.nextSibling,t=A._$AM,n=t!==e;if(n){let o;A._$AQ?.(e),A._$AM=e,void 0!==A._$AP&&(o=e._$AU)!==t._$AU&&A._$AP(o)}if(o!==$||n){let e=A._$AA;for(;e!==o;){const o=e.nextSibling;i.insertBefore(e,$),e=o}}}return A},i=(e,o,t=e)=>(e._$AI(o,t),e),$={},_=(e,o=$)=>e._$AH=o,r=e=>e._$AH,s=e=>{e._$AR(),e._$AA.remove()};export{s as M,t as f,_ as m,r as p,A as s,i as v};
