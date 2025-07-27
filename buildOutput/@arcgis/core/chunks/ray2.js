/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{e,s as r}from"./screenUtils.js";import{c as n}from"./vec2.js";import{h as o,n as t,e as s,k as c}from"./vec3.js";import{c as i}from"./ray.js";import{s as u}from"./vector.js";function a(e,n,o=i()){return m(e,r(n),o),t(o.direction,o.direction),o}function m(r,n,o){return f(r,r.screenToRender(n,e(u.get())),o)}function f(r,t,s){const c=e(n(u.get(),t));if(c[2]=0,!r.unprojectFromRenderScreen(c,s.origin))return null;const i=e(n(u.get(),t));i[2]=1;const a=r.unprojectFromRenderScreen(i,u.get());return null==a?null:(o(s.direction,a,s.origin),s)}function g(r,n,o){return l(r,r.screenToRender(n,e(u.get())),o)}function l(e,r,n){s(n.origin,e.eye);const t=c(u.get(),r[0],r[1],1),i=e.unprojectFromRenderScreen(t,u.get());return null==i?null:(o(n.direction,i,n.origin),n)}export{a,f as b,g as c,l as d,m as f};
