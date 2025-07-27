// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../shaderModules/glsl"],function(o,e){"use strict";function l(o){o.code.add(e.glsl`struct MaskedColor {
vec4 color;
bvec4 mask;
};`)}o.CreateMaskedFromNaNColor=function(o){o.include(l),o.code.add(e.glsl`MaskedColor createMaskedFromNaNColor(vec4 color) {
return MaskedColor(color, isnan(color));
}`)},o.CreateMaskedFromUInt8NaNColor=function(o){o.include(l),o.code.add(e.glsl`
    MaskedColor createMaskedFromUInt8NaNColor(vec4 color) {
      return MaskedColor(color * ${e.glsl.float(1/254)}, equal(color, vec4(255)));
    }
  `)},o.MaskedColorDefinition=l,o.MultiplyMaskedColors=function(o){o.include(l),o.code.add(e.glsl`MaskedColor multiplyMaskedColors(MaskedColor color1, MaskedColor color2) {
vec4 masked1 = mix(color1.color, vec4(1), color1.mask);
vec4 masked2 = mix(color2.color, vec4(1), color2.mask);
return MaskedColor(masked1 * masked2, bvec4(ivec4(color1.mask) & ivec4(color2.mask)));
}`)},Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});