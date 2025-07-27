/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import s from"../request.js";import i from"../core/Error.js";import{p as t,a as r,e as o}from"./utils9.js";import"../config.js";import"../core/lang.js";import"./object.js";import"../kernel.js";import"../core/urlUtils.js";import"./Logger.js";import"./string.js";import"./jsonUtils.js";import"./MapUtils.js";import"../core/promiseUtils.js";import"./handleUtils.js";import"./events.js";import"./maybe.js";import"./persistableUrlUtils.js";async function e(e,p,m,n,j){if(!p)throw new i("stop-editing:missing-guid","guid for version is missing");const a=t(e),l=r(a.query,{query:o({sessionId:m,saveEdits:n,f:"json"}),...j,method:"post"});p.startsWith("{")&&(p=p.slice(1,-1));const c=`${a.path}/versions/${p}/stopEditing`,{data:g}=await s(c,l);return g||{success:!1}}export{e as stopEditing};
