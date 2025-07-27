// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../../webgl/Uniform"],function(e,r){"use strict";class t extends r.Uniform{constructor(e,r,t,o){super(e,"mat4",2,(t,i,n,s)=>t.setUniformMatrix4fv(e,r(i,n,s),o),t)}}e.Matrix4sDrawUniform=t,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});