/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import r from"../request.js";import{join as s}from"../core/urlUtils.js";import{p as t,a as i,e as o}from"./utils9.js";import"../config.js";import"../core/lang.js";import"./object.js";import"../kernel.js";import"../core/Error.js";import"./Logger.js";import"./string.js";import"./MapUtils.js";import"../core/promiseUtils.js";import"./handleUtils.js";import"./events.js";import"./maybe.js";import"./persistableUrlUtils.js";import"./jsonUtils.js";async function e(e,m,p){const j=t(e),n=i(j.query,{query:o({f:"json"}),...p});m.startsWith("{")&&(m=m.slice(1,-1));const a=s(j.path,"versions",m),{data:l}=await r(a,n),{versionName:c,versionGuid:u,...f}=l;return{...f,versionIdentifier:{name:c,guid:u}}}export{e as getVersion};
