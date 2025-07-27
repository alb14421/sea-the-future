/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{_ as e}from"./tslib.es6.js";import{property as r}from"../core/accessorSupport/decorators/property.js";import"../core/lang.js";import"./Logger.js";import{subclass as s}from"../core/accessorSupport/decorators/subclass.js";const o=o=>{const t=o;let a=class extends t{get availableFields(){return this.layer.fieldsIndex.fields.map(e=>e.name)}};return e([r()],a.prototype,"layer",void 0),e([r({readOnly:!0})],a.prototype,"availableFields",null),a=e([s("esri.views.layers.OGCFeatureLayerView")],a),a};export{o as O};
