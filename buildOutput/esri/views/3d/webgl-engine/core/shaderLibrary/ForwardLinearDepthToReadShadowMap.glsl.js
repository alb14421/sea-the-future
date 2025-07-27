// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","./ForwardLinearDepth.glsl","./ShaderOutput","../shaderModules/glsl"],function(e,o,r,a){"use strict";e.ForwardLinearDepthToReadShadowMap=function(e,t){const d=r.isColorOrColorEmission(t.output)&&t.receiveShadows;d&&o.ForwardLinearDepth(e,!0),e.vertex.code.add(a.glsl`
    void forwardLinearDepthToReadShadowMap() { ${a.If(d,"forwardLinearDepth(gl_Position.w);")} }
  `)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});