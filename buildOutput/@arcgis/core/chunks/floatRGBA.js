/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{c as t}from"./mathUtils.js";function o(o,n,r=0){const e=t(o,0,f);for(let t=0;t<4;t++)n[r+t]=Math.floor(256*s(e*a[t]))}function n(o,n,r=0){const e=t(o,0,l);for(let t=0;t<3;t++)n[r+t]=Math.floor(256*s(e*a[t]))}function r(t,o=0){let n=0;for(let r=0;r<4;r++)n+=t[o+r]*e[r];return n}const a=[1,256,65536,16777216],e=[1/256,1/65536,1/16777216,1/4294967296],f=r(new Uint8ClampedArray([255,255,255,255])),l=r(new Uint8ClampedArray([255,255,255,0]));function s(t){return t-Math.floor(t)}export{n as a,o as p,r as u};
