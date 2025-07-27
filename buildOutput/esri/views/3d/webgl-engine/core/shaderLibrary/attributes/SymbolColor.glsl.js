// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","./MaskedColor.glsl","../../shaderModules/glsl","../../shaderModules/IntegerPassUniform","../../../materials/internal/MaterialUtil"],function(o,e,l,r,d){"use strict";o.SymbolColor=function(o,s){o.varyings.add("colorMixMode","int"),o.varyings.add("opacityMixMode","int"),o.vertex.uniforms.add(new r.IntegerPassUniform("symbolColorMixMode",o=>d.colorMixModes[o.colorMixMode])),s.hasSymbolColors?(o.vertex.include(e.MaskedColorDefinition),o.vertex.include(e.CreateMaskedFromUInt8NaNColor),o.vertex.include(e.MultiplyMaskedColors),o.attributes.add("symbolColor","vec4"),o.vertex.code.add(l.glsl`
    MaskedColor applySymbolColor(MaskedColor color) {
      return multiplyMaskedColors(color, createMaskedFromUInt8NaNColor(${"symbolColor"}));
    }
  `)):o.vertex.code.add(l.glsl`MaskedColor applySymbolColor(MaskedColor color) {
return color;
}`),o.vertex.code.add(l.glsl`
    void forwardColorMixMode(bvec4 mask) {
      colorMixMode = mask.r ? ${l.glsl.int(d.colorMixModes.ignore)} : symbolColorMixMode;
      opacityMixMode = mask.a ? ${l.glsl.int(d.colorMixModes.ignore)} : symbolColorMixMode;
    }
  `)},Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});