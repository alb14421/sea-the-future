/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import r from"../request.js";import{p as t,a as o,e as s}from"./utils9.js";import"../config.js";import"../core/lang.js";import"./object.js";import"../kernel.js";import"../core/urlUtils.js";import"../core/Error.js";import"./Logger.js";import"./string.js";import"./jsonUtils.js";import"./MapUtils.js";import"../core/promiseUtils.js";import"./handleUtils.js";import"./events.js";import"./maybe.js";import"./persistableUrlUtils.js";async function i(i,e,m){const p=t(i),a=e.toJSON(),j=o(p.query,{query:s({...a,f:"json"}),...m,authMode:"immediate",method:"post"}),n=`${p.path}/create`,{data:l}=await r(n,j),{versionName:c,versionGuid:u,...d}=l.versionInfo;return{...d,versionIdentifier:{name:c,guid:u}}}export{i as createVersion};
