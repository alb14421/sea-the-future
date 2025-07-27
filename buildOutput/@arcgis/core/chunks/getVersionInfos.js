/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import r from"../request.js";import{p as s,a as o,e as t}from"./utils9.js";import"../config.js";import"../core/lang.js";import"./object.js";import"../kernel.js";import"../core/urlUtils.js";import"../core/Error.js";import"./Logger.js";import"./string.js";import"./jsonUtils.js";import"./MapUtils.js";import"../core/promiseUtils.js";import"./handleUtils.js";import"./events.js";import"./maybe.js";import"./persistableUrlUtils.js";async function i(i,e,m){const p=s(i),n=e.toJSON(),j=o(p.query,{query:t({...n,f:"json"}),...m}),a=`${p.path}/versionInfos`,{data:l}=await r(a,j);return l.versions.map(r=>{const{versionName:s,versionGuid:o,...t}=r;return{...t,versionIdentifier:{name:s,guid:o}}})}export{i as getVersionInfos};
