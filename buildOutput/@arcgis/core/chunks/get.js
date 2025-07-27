/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{p as t,g as n,i as r}from"./utils.js";function i(t,i){const s=t.endsWith("?")?t.slice(0,-1):t;if(null!=i.getItemAt||Array.isArray(i)){const t=parseInt(s,10);if(!isNaN(t))return Array.isArray(i)?i[t]:i.at(t)}const e=n(i);return r(e,s)?e.get(s):i[s]}function s(t,n,r){if(null==t)return t;const e=i(n[r],t);return!e&&r<n.length-1?void 0:r===n.length-1?e:s(e,n,r+1)}function e(n,r,e=0){return"string"!=typeof r||r.includes(".")?s(n,t(r),e):i(r,n)}function u(t,n){return e(t,n)}function o(t,n){return void 0!==e(n,t)}export{o as e,u as g,e as v};
