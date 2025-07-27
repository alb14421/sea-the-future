/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import s from"../request.js";import r from"../core/Error.js";import{p as t,a as o,e as i}from"./utils9.js";import"../config.js";import"../core/lang.js";import"./object.js";import"../kernel.js";import"../core/urlUtils.js";import"./Logger.js";import"./string.js";import"./jsonUtils.js";import"./MapUtils.js";import"../core/promiseUtils.js";import"./handleUtils.js";import"./events.js";import"./maybe.js";import"./persistableUrlUtils.js";async function e(e,m,p,j){if(!m)throw new r("post:missing-guid","guid for version is missing");const n=t(e),a=p.toJSON(),l=o(n.query,{query:i({...a,f:"json"}),...j,method:"post"});m.startsWith("{")&&(m=m.slice(1,-1));const c=`${n.path}/versions/${m}/deleteForwardEdits`,{data:g}=await s(c,l);return g}export{e as deleteForwardEdits};
