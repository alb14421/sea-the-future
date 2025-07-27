// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../../webgl/Uniform"],function(e,t){"use strict";class r extends t.Uniform{constructor(e,t,r){super(e,"mat4",0,(i,n)=>i.setUniformMatrix4fv(e,t(n),r))}}e.Matrix4BindUniform=r,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});