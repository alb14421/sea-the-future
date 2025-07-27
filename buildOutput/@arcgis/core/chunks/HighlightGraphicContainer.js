/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{_ as r}from"./tslib.es6.js";import"./Logger.js";import"../core/lang.js";import"../core/Error.js";import{subclass as s}from"../core/accessorSupport/decorators/subclass.js";import{A as e}from"./AGraphicContainer.js";import{r as t}from"./util.js";let i=class extends e{get hasHighlight(){return this.children.some(r=>r.hasData)}renderChildren(r){this.attributeView.update(),16===r.drawPhase&&this.children.some(r=>r.hasData)&&(super.renderChildren(r),r.context.setColorMask(!0,!0,!0,!0),t(r,!1,r=>{this._renderChildren(r,1)}))}};i=r([s("esri.views.2d.layers.graphics.HighlightGraphicContainer")],i);export{i as H};
