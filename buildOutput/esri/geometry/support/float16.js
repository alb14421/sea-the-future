// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports"],function(a){"use strict";let r=globalThis.Float16Array;a.hasNativeFloat16Array=!!r,a.disableNativeF16Array=function(){r=null,a.hasNativeFloat16Array=!1},a.getFloat16ArrayConstructor=function(){return r},a.makeFloat16Array=function(...a){return new(r??Float32Array)(...a)},a.resetNativeF16Array=function(){r=globalThis.Float16Array,a.hasNativeFloat16Array=!!r},Object.defineProperty(a,Symbol.toStringTag,{value:"Module"})});