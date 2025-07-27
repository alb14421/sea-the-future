/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{e as t,r as n}from"./mathUtils.js";import{g as r}from"./mat4.js";import{s,m as a,g as o}from"./quat.js";import{c as u}from"./quatf64.js";import{e as f,c,n as e,f as i}from"./vec3.js";import{U as m,d as p,e as j}from"./vec3f64.js";function g(t=w){return[t[0],t[1],t[2],t[3]]}function d(t,n,r=g()){return f(r,t),r[3]=n,r}function h(t,n,r){return c(r,t,n),e(r,r),r[3]=-i(t,n),r}function q(t,s=g()){const a=r(y,t);return k(s,n(o(s,a))),s}function v(t,r,u=g()){return s(y,t,x(t)),s(z,r,x(r)),a(y,z,y),k(u,n(o(u,y)))}function U(t,n,r,s=g()){return d(m,t,A),d(p,n,B),d(j,r,C),v(A,B,A),v(A,C,s),s}function b(t){return t}function l(t){return t[3]}function x(n){return t(n[3])}function k(t,n){return t[3]=n,t}const w=[0,0,1,0],y=u(),z=u();g();const A=g(),B=g(),C=g();export{b as a,l as b,x as c,q as d,g as e,d as f,U as g,h,w as u};
