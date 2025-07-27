// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["require","exports","../../assets"],function(e,t,n){"use strict";let r;t.destroyDXTEncoder=function(){r=null},t.getDXTEncoder=function(){return r??=(async()=>{const t=await new Promise((t,n)=>e(["../../chunks/dxt_encoder"],t,n));return await t.default({locateFile:e=>n.getAssetUrl(`esri/libs/dxtEncoder/${e}`)})})(),r},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})});