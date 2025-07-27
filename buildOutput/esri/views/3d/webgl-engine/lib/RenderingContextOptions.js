// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../webgl/RenderingContextOptions"],function(e,t){"use strict";class n extends t.RenderingContextOptions{constructor(e){super(e.options.deactivatedWebGLExtensions||{},e.options.debugWebGLExtensions||{},8,e.view.qualitySettings.maxTexturePixels),this.newCache=(t,n)=>e.view.resourceController.memoryController.newCache(t,n)}}e.RenderingContextOptions=n,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});