/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
const n=/^-?(\d+(\.\d+)?)\s*((px)|(pt))?$/i;function t(n){return n?n/72*96:0}function r(n){return n?72*n/96:0}function u(t){if("string"==typeof t){const u=t.match(n);if(u){const n=Number(u[1]),e=u[3]&&u[3].toLowerCase(),o=t.startsWith("-"),s="px"===e?r(n):n;return o?-s:s}return console.warn("screenUtils.toPt: input not recognized!"),null}return t}function e(n=0,t=0){return{x:n,y:t}}function o(n){return n?e(n.x,n.y):null}function s(n=0,t=0){return[n,t]}function i(n=0,t=0){return[n,t]}function c(n=0,t=0,r=0){return[n,t,r]}function a(n){return n}function f(n){return n}function l(n){return n}function p(n,t){return t?(t[0]=n.x,t[1]=n.y,t.length>2&&(t[2]=0),t):[n.x,n.y]}export{r as a,s as b,e as c,l as d,f as e,i as f,c as g,a as h,o as i,t as p,p as s,u as t};
