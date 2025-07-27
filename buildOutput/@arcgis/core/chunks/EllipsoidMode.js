/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{c as t}from"./maybe.js";import{isPromiseLike as s}from"../core/promiseUtils.js";import{a3 as e,a4 as i}from"./unitUtils.js";class r{constructor(e,i){this._textures=e,this.loadPromise=null,this._disposed=!1;const r=this._textures.acquire(i);s(r)?(r.then(s=>{this._disposed?t(s):this._textureRef=s}),this.loadPromise=r):this._textureRef=r}dispose(){this._textureRef=t(this._textureRef),this._disposed=!0}get glTexture(){return this._textureRef?.glTexture}}function o(t){return t&&e(t)?2:t&&i(t)?3:1}export{r as R,o as g};
