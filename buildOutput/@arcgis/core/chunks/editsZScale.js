/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{E as n,p as i}from"./unitUtils.js";function s(n,i,s){if(null==n.hasM||n.hasZ)for(const n of i)for(const i of n)i.length>2&&(i[2]*=s)}function t(i,s,t){if(!i&&!s||!t)return;const f=n(t);e(i,t,f),e(s,t,f)}function e(n,i,s){if(n)for(const t of n)f(t.geometry,i,s)}function f(t,e,f){if(!t?.spatialReference||i(t.spatialReference,e))return;const o=n(t.spatialReference)/f;if(1!==o)if("x"in t)null!=t.z&&(t.z*=o);else if("rings"in t)s(t,t.rings,o);else if("paths"in t)s(t,t.paths,o);else if("points"in t&&(null==t.hasM||t.hasZ))for(const n of t.points)n.length>2&&(n[2]*=o)}export{t as u};
