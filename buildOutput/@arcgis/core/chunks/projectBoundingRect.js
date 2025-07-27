/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{c as o}from"./vec3f64.js";import{p as r}from"./projectBuffer.js";import{h as t}from"./aaBoundingRect.js";import{p as s}from"./unitUtils.js";function p(o,p,i,m){return!(null==o||(s(p,m)?(t(i,o),0):(f[0]=o[0],f[1]=o[1],f[2]=0,!r(f,p,0,f,m,0)||(i[0]=f[0],i[1]=f[1],f[0]=o[2],f[1]=o[3],f[2]=0,!r(f,p,0,f,m,0)||(i[2]=f[0],i[3]=f[1],0)))))}const f=o();export{p};
