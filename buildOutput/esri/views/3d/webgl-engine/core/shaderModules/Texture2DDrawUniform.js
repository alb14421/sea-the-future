// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../../webgl/Uniform"],function(e,r){"use strict";class t extends r.Uniform{constructor(e,r){super(e,"sampler2D",2,(t,n,o)=>t.bindTexture(e,r(n,o)))}}e.Texture2DDrawUniform=t,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});