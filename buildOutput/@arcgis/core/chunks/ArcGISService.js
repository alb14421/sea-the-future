/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{_ as t}from"./tslib.es6.js";import{L as r}from"./Logger.js";import{property as e}from"../core/accessorSupport/decorators/property.js";import"../core/lang.js";import{subclass as s}from"../core/accessorSupport/decorators/subclass.js";import{p as i,s as o}from"../request.js";const l=l=>{const p=l;let c=class extends p{get title(){if(this._get("title")&&"defaults"!==this.originOf("title"))return this._get("title");if(this.url){const t=i(this.url);if(t?.title)return t.title}return this._get("title")||""}set title(t){this._set("title",t)}set url(t){this._set("url",o(t,r.getLogger(this)))}};return t([e()],c.prototype,"title",null),t([e({type:String})],c.prototype,"url",null),c=t([s("esri.layers.mixins.ArcGISService")],c),c};export{l as A};
