/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{l as e}from"./fontUtils.js";import{g as t}from"./imageUtils.js";class i{constructor(){this._resourceMap=new Map,this._inFlightResourceMap=new Map}destroy(){this._inFlightResourceMap.clear(),this._resourceMap.clear()}getResource(e){return this._resourceMap.get(e)??null}async fetchResource(e,i){const h=this._resourceMap.get(e);if(h)return{width:h.width,height:h.height};let s=this._inFlightResourceMap.get(e);return s?s.then(e=>({width:e.width,height:e.height})):(s=t(e,i),this._inFlightResourceMap.set(e,s),s.then(t=>(this._inFlightResourceMap.delete(e),this._resourceMap.set(e,t),{width:t.width,height:t.height}),()=>({width:0,height:0})))}deleteResource(e){this._inFlightResourceMap.delete(e),this._resourceMap.delete(e)}loadFont(t){return e(t)}}export{i as C};
