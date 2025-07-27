/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{_ as r}from"./tslib.es6.js";import{ClonableMixin as o}from"../core/Clonable.js";import{s as e}from"./jsonMap.js";import{JSONSupport as s}from"../core/JSONSupport.js";import{property as t}from"../core/accessorSupport/decorators/property.js";import{b as p}from"./ensureType.js";import"../core/lang.js";import{e as n}from"./enumeration.js";import{subclass as i}from"../core/accessorSupport/decorators/subclass.js";var a;const c=e()({ascendingValues:"ascending-values",descendingValues:"descending-values"});let m=a=class extends(o(s)){static from(r){return p(a,r)}constructor(r){super(r),this.title=null,this.order=null}};r([t({type:String,json:{write:!0}})],m.prototype,"title",void 0),r([n(c)],m.prototype,"order",void 0),m=a=r([i("esri.renderers.support.RendererLegendOptions")],m);const l=m;export{l as R};
