/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{_ as e}from"./tslib.es6.js";import{property as r}from"../core/accessorSupport/decorators/property.js";import"../core/lang.js";import"./Logger.js";import{subclass as o}from"../core/accessorSupport/decorators/subclass.js";const t=t=>{const s=t;let p=class extends s{constructor(...e){super(...e)}get updateSuspended(){const e=this.parent?.dynamicGroupLayerView;return this.suspended&&(!e||!0===e.suspended)}queryAggregates(){throw new Error("Not implemented")}};return e([r()],p.prototype,"layer",void 0),e([r()],p.prototype,"parent",void 0),e([r()],p.prototype,"highlightOptions",void 0),e([r()],p.prototype,"updateSuspended",null),p=e([o("esri.views.layers.CatalogFootprintLayerView")],p),p};export{t as C};
