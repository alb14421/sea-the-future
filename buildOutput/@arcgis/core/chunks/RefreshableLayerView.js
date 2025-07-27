/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{_ as r}from"./tslib.es6.js";import{L as e}from"./Logger.js";import{isAbortError as s}from"../core/promiseUtils.js";import{on as o}from"../core/reactiveUtils.js";import"../core/lang.js";import"../core/Error.js";import{subclass as t}from"../core/accessorSupport/decorators/subclass.js";const i=i=>{const a=i;let c=class extends a{initialize(){this.addHandles(o(()=>this.layer,"refresh",r=>{this.doRefresh(r.dataChanged).catch(r=>{s(r)||e.getLogger(this).error(r)})}),"RefreshableLayerView")}};return c=r([t("esri.views.layers.RefreshableLayerView")],c),c};export{i as R};
