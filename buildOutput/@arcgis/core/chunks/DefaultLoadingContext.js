/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import r from"../request.js";import{r as e}from"./asyncUtils.js";import t from"../core/Error.js";import{throwIfAborted as s,throwIfAbortError as a}from"../core/promiseUtils.js";import{isDataProtocol as o,dataToArrayBuffer as i}from"../core/urlUtils.js";class l{constructor(r){this._streamDataRequester=r}async loadJSON(r,e){return this._load(0,r,e)}async loadBinary(r,e){return o(r)?(s(e),i(r)):this._load(1,r,e)}async loadImage(r,e){return this._load(2,r,e)}async _load(s,o,i){if(null==this._streamDataRequester)return(await r(o,{responseType:n[s]})).data;const l=await e(this._streamDataRequester.request(o,s,i));if(!0===l.ok)return l.value;throw a(l.error),new t("glt-loader-request-error",`Request for resource failed: ${l.error}`)}}const n={2:"image",1:"array-buffer",0:"json",3:void 0};export{l as D};
