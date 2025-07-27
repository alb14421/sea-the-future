/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{g as t}from"./object.js";const e=/\{([^}]+)\}/g;function n(t){return t??""}function r(r,o){return o?r.replaceAll(e,"object"==typeof o?(e,r)=>n(t(r,o)):(t,e)=>n(o(e))):r}function o(t,e){return t.replaceAll(/([.$?*|{}()[\]\\/+\-^])/g,t=>e?.includes(t)?t:`\\${t}`)}function l(t){let e=0;for(let n=0;n<t.length;n++)e=(e<<5)-e+t.charCodeAt(n),e|=0;return e}let u;function c(t){return u??=new DOMParser,u.parseFromString(t||"","text/html").body.innerText||""}function s(t,e){return new RegExp(`{${e}}`,"ig").test(t)}function a(t,...e){let n=t[0];for(let r=0;r<e.length;++r)n+=e[r]+t[r+1];return n}export{a,o as e,l as n,r,c as s,s as t};
