/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{clone as r}from"../core/lang.js";import{L as t}from"./Logger.js";import{urlToObject as o,join as e}from"../core/urlUtils.js";import{w as n,a}from"../request.js";import{u as l}from"./commonProperties.js";function s(o){const{nonStandardUrlAllowed:e=!1,separator:s}=o??{},i=r(l),u=i.json?.write;return"object"==typeof u&&u&&(u.writer=function(r,t,o,e){n(this,r,s,t,e)}),{...i,set:function(r){if(null==r)return void this._set("url",r);const o=a({layer:this,url:r,nonStandardUrlAllowed:e,logger:t.getLogger(this)});this._set("url",o.url),null!=o.layerId&&this._set("layerId",o.layerId)}}}function i(r,t){const{separator:n}=t??{},a=o(r.url);return null!=a&&(null!=r.dynamicDataSource?a.path=e(a.path,"dynamicLayer"):null!=r.layerId&&(a.path=e(a.path,n??"",r.layerId.toString()))),a}export{i as n,s as u};
