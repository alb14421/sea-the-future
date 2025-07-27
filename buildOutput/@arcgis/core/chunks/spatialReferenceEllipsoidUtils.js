/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{S as e,r as t,s,W as n,t as a,v as o}from"./unitUtils.js";import r from"../geometry/SpatialReference.js";const i=new r(e),c=new r(t),l=new r(s),f=new r(n);function p(e){const t=w.get(e);if(t)return t;let s=i;if(e)if(e===c)s=c;else if(e===l)s=l;else{const t=e.wkid,n=e.latestWkid;if(null!=t||null!=n)a(t)||a(n)?s=c:(o(t)||o(n))&&(s=l);else{const t=e.wkt2??e.wkt;if(t){const e=t.toUpperCase();e===k?s=c:e===m&&(s=l)}}}return w.set(e,s),s}const w=new Map;function u(){w.clear()}const k=c.wkt.toUpperCase(),m=l.wkt.toUpperCase();export{c as S,f as W,l as a,u as c,p as g};
