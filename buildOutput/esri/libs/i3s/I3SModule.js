// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["require","exports","../../assets"],function(e,t,n){"use strict";let i;t.cleanup=function(){i=null},t.get=function(){return i??=(async()=>{const t=await new Promise((t,n)=>e(["../../chunks/i3s"],t,n));return await t.default({locateFile:e=>n.getAssetUrl(`esri/libs/i3s/${e}`)})})(),i},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})});