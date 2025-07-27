// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../shaderModules/glsl"],function(o,r){"use strict";o.VertexColor=function(o,e){e.hasVertexColors?(o.attributes.add("color","vec4"),o.varyings.add("vColor","vec4"),o.vertex.code.add(r.glsl`void forwardVertexColor() { vColor = color; }`),o.vertex.code.add(r.glsl`
      void forwardNormalizedVertexColor() { vColor = color * ${r.glsl.float(1/255)}; }
    `)):o.vertex.code.add(r.glsl`void forwardVertexColor() {}
void forwardNormalizedVertexColor() {}`)},Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});