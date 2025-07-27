/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import r from"../Color.js";import{t as e}from"./screenUtils.js";import{I as t}from"./ensureType.js";import{o as n,t as o}from"./opacityUtils.js";function s(e,t){const n=null!=t.transparency?o(t.transparency):1,s=t.color;return s&&Array.isArray(s)?new r([s[0]||0,s[1]||0,s[2]||0,n]):null}function a(r,e){e.color=r.toJSON().slice(0,3);const t=n(r.a);0!==t&&(e.transparency=t)}function c(e){return{type:r,nonNullable:e?.nonNullable,json:{type:[t],default:null,read:{source:["color","transparency"],reader:s},write:{target:{color:{type:[t],isRequired:e?.colorRequiredOnWrite},transparency:{type:t}},writer:a}}}}const i={type:Number,cast:e,json:{write:!0}};function l(r){return"emissive"===r?0:1}export{c,l as g,i as s};
