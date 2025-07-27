/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import s from"../request.js";import t from"../core/Error.js";import{p as i,a as r,e as o}from"./utils9.js";import"../config.js";import"../core/lang.js";import"./object.js";import"../kernel.js";import"../core/urlUtils.js";import"./Logger.js";import"./string.js";import"./jsonUtils.js";import"./MapUtils.js";import"../core/promiseUtils.js";import"./handleUtils.js";import"./events.js";import"./maybe.js";import"./persistableUrlUtils.js";async function e(e,m,p,n){if(!m)throw new t("start-editing:missing-guid","guid for version is missing");const j=i(e),a=r(j.query,{query:o({sessionId:p,f:"json"}),...n,method:"post"});m.startsWith("{")&&(m=m.slice(1,-1));const l=`${j.path}/versions/${m}/startEditing`,{data:c}=await s(l,a);return c||{success:!1}}export{e as startEditing};
