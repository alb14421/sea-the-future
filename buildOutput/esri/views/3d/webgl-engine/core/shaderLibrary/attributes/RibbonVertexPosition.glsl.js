// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../shading/VisualVariables.glsl","../../shaderModules/Float3PassUniform","../../shaderModules/FloatPassUniform","../../shaderModules/FloatsPassUniform","../../shaderModules/glsl"],function(a,e,i,t,o,r){"use strict";a.RibbonVertexPosition=function(a,l){const{vertex:s,attributes:v}=a;s.uniforms.add(new t.FloatPassUniform("intrinsicWidth",a=>a.width)),l.hasVVSize?(v.add("sizeFeatureAttribute","float"),s.uniforms.add(new i.Float3PassUniform("vvSizeMinSize",a=>a.vvSize.minSize),new i.Float3PassUniform("vvSizeMaxSize",a=>a.vvSize.maxSize),new i.Float3PassUniform("vvSizeOffset",a=>a.vvSize.offset),new i.Float3PassUniform("vvSizeFactor",a=>a.vvSize.factor),new i.Float3PassUniform("vvSizeFallback",a=>a.vvSize.fallback)),s.code.add(r.glsl`float getSize() {
if (isnan(sizeFeatureAttribute)) {
return vvSizeFallback.x;
}
return intrinsicWidth * clamp(vvSizeOffset + sizeFeatureAttribute * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).x;
}`)):(v.add("size","float"),s.code.add(r.glsl`float getSize(){
return intrinsicWidth * size;
}`)),l.hasVVOpacity?(v.add("opacityFeatureAttribute","float"),s.constants.add("vvOpacityNumber","int",8),s.uniforms.add(new o.FloatsPassUniform("vvOpacityValues",a=>a.vvOpacity.values,8),new o.FloatsPassUniform("vvOpacityOpacities",a=>a.vvOpacity.opacityValues,8),new t.FloatPassUniform("vvOpacityFallback",a=>a.vvOpacity.fallback,{supportsNaN:!0})),s.code.add(r.glsl`
    float interpolateOpacity(float value) {
      if (value <= vvOpacityValues[0]) {
        return vvOpacityOpacities[0];
      }

      for (int i = 1; i < vvOpacityNumber; ++i) {
        if (vvOpacityValues[i] >= value) {
          float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);
          return mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f);
        }
      }

      return vvOpacityOpacities[vvOpacityNumber - 1];
    }

    vec4 applyOpacity(vec4 color) {
      if (isnan(opacityFeatureAttribute)) {
        // If there is a color vv then it will already have taken care of applying the fallback
        return ${r.If(l.hasVVColor,"color","vec4(color.rgb, vvOpacityFallback)")};
      }

      return vec4(color.rgb, interpolateOpacity(opacityFeatureAttribute));
    }
    `)):s.code.add(r.glsl`vec4 applyOpacity(vec4 color) {
return color;
}`),l.hasVVColor?(a.include(e.VisualVariables,l),v.add("colorFeatureAttribute","float"),s.code.add(r.glsl`vec4 getColor() {
vec4 color = interpolateVVColor(colorFeatureAttribute);
if (isnan(color.r)) {
return vec4(0);
}
return applyOpacity(color);
}`)):(v.add("color","vec4"),s.code.add(r.glsl`vec4 getColor() {
return applyOpacity(color);
}`))},Object.defineProperty(a,Symbol.toStringTag,{value:"Module"})});