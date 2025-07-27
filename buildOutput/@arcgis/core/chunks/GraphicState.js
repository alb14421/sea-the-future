/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{_ as r}from"./tslib.es6.js";import{EventedAccessor as o}from"../core/Evented.js";import{property as t}from"../core/accessorSupport/decorators/property.js";import"../core/lang.js";import"./Logger.js";import{subclass as s}from"../core/accessorSupport/decorators/subclass.js";let e=class extends o{constructor(r){super(r),this.tracking=!1,this.displaying=!1,this.error=null,this.isDraped=!1}};r([t({constructOnly:!0})],e.prototype,"graphic",void 0),r([t()],e.prototype,"tracking",void 0),r([t()],e.prototype,"displaying",void 0),r([t()],e.prototype,"error",void 0),r([t()],e.prototype,"isDraped",void 0),e=r([s("esri.views.3d.layers.graphics.GraphicState")],e);export{e as G};
