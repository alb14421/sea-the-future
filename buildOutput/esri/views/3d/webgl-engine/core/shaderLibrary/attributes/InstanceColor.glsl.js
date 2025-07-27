// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","./MaskedColor.glsl","../../shaderModules/glsl"],function(o,e,l){"use strict";o.InstanceColor=function(o,r){r.instancedColor?(o.attributes.add("instanceColor","vec4"),o.vertex.include(e.MaskedColorDefinition),o.vertex.include(e.CreateMaskedFromUInt8NaNColor),o.vertex.include(e.MultiplyMaskedColors),o.vertex.code.add(l.glsl`
      MaskedColor applyInstanceColor(MaskedColor color) {
        return multiplyMaskedColors( color, createMaskedFromUInt8NaNColor(${"instanceColor"}));
      }
    `)):o.vertex.code.add(l.glsl`MaskedColor applyInstanceColor(MaskedColor color) {
return color;
}`)},Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});