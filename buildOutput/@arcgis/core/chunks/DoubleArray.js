/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{n as r,c as n}from"../core/lang.js";function a(n,a=!1){return n<=r?a?new Array(n).fill(0):new Array(n):new Float64Array(n)}function e(a){return(n(a)?a.byteLength/8:a.length)<=r?Array.from(a):new Float64Array(a)}function t(r,n,a){return Array.isArray(r)?r.slice(n,n+a):r.subarray(n,n+a)}function o(r){return[...r]}export{e as a,t as d,o as e,a as n};
