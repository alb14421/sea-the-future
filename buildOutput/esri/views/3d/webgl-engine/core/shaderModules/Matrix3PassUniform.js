// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../../webgl/Uniform"],function(e,t){"use strict";class r extends t.Uniform{constructor(e,t,r){super(e,"mat3",1,(o,i,n)=>o.setUniformMatrix3fv(e,t(i,n),r))}}e.Matrix3PassUniform=r,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});