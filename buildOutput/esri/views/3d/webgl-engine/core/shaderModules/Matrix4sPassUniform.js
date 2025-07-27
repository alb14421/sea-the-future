// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../../webgl/Uniform"],function(e,t){"use strict";class r extends t.Uniform{constructor(e,t,r,o){super(e,"mat4",1,(r,s,i)=>r.setUniformMatrix4fv(e,t(s,i),o),r)}}e.Matrix4sPassUniform=r,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});