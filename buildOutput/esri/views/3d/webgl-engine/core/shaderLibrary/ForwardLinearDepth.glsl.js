// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../shaderModules/glsl"],function(e,t){"use strict";function a(e){e.varyings.add("linearDepth","float",{invariant:!0})}e.ForwardLinearDepth=function(e,r){r&&a(e),e.vertex.code.add(t.glsl`
    void forwardLinearDepth(float _linearDepth) { ${t.If(r,"linearDepth = _linearDepth;")} }
  `)},e.addLinearDepth=a,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});