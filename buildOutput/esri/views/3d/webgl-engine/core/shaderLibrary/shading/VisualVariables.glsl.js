// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../attributes/MaskedColor.glsl","../../shaderModules/Float3PassUniform","../../shaderModules/Float4PassUniform","../../shaderModules/Float4sPassUniform","../../shaderModules/FloatsPassUniform","../../shaderModules/glsl","../../shaderModules/Matrix3PassUniform","../../../materials/VisualVariablePassParameters"],function(o,e,r,a,l,t,v,s,i){"use strict";o.VisualVariables=function(o,n){const{vertex:u,attributes:c}=o;n.hasVVInstancing&&(n.hasVVSize||n.hasVVColor)&&c.add("instanceFeatureAttribute","vec4"),n.hasVVSize?(u.uniforms.add(new r.Float3PassUniform("vvSizeMinSize",o=>o.vvSize.minSize)),u.uniforms.add(new r.Float3PassUniform("vvSizeMaxSize",o=>o.vvSize.maxSize)),u.uniforms.add(new r.Float3PassUniform("vvSizeOffset",o=>o.vvSize.offset)),u.uniforms.add(new r.Float3PassUniform("vvSizeFactor",o=>o.vvSize.factor)),u.uniforms.add(new r.Float3PassUniform("vvSizeFallback",o=>o.vvSize.fallback)),u.uniforms.add(new s.Matrix3PassUniform("vvSymbolRotationMatrix",o=>o.vvSymbolRotationMatrix)),u.uniforms.add(new r.Float3PassUniform("vvSymbolAnchor",o=>o.vvSymbolAnchor)),u.code.add(v.glsl`vec3 vvScale(vec4 _featureAttribute) {
if (isnan(_featureAttribute.x)) {
return vvSizeFallback;
}
return clamp(vvSizeOffset + _featureAttribute.x * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize);
}
vec4 vvTransformPosition(vec3 position, vec4 _featureAttribute) {
return vec4(vvSymbolRotationMatrix * ( vvScale(_featureAttribute) * (position + vvSymbolAnchor)), 1.0);
}`),u.code.add(v.glsl`
      const float eps = 1.192092896e-07;
      vec4 vvTransformNormal(vec3 _normal, vec4 _featureAttribute) {
        vec3 scale = max(vvScale(_featureAttribute), eps);
        return vec4(vvSymbolRotationMatrix * _normal / scale, 1.0);
      }

      ${n.hasVVInstancing?v.glsl`
      vec4 vvLocalNormal(vec3 _normal) {
        return vvTransformNormal(_normal, instanceFeatureAttribute);
      }

      vec4 localPosition() {
        return vvTransformPosition(position, instanceFeatureAttribute);
      }`:""}
    `)):u.code.add(v.glsl`vec4 localPosition() { return vec4(position, 1.0); }
vec4 vvLocalNormal(vec3 _normal) { return vec4(_normal, 1.0); }`),o.vertex.include(e.MaskedColorDefinition),n.hasVVColor?(u.constants.add("vvColorNumber","int",i.vvColorNumber),u.uniforms.add(new t.FloatsPassUniform("vvColorValues",o=>o.vvColor.values,i.vvColorNumber),new l.Float4sPassUniform("vvColorColors",o=>o.vvColor.colors,i.vvColorNumber),new a.Float4PassUniform("vvColorFallback",o=>o.vvColor.fallback,{supportsNaN:!0})),n.hasVVInstancing&&(o.vertex.include(e.MultiplyMaskedColors),o.vertex.include(e.CreateMaskedFromNaNColor)),u.code.add(v.glsl`
      vec4 interpolateVVColor(float value) {
        if (isnan(value)) {
          return vvColorFallback;
        }

        if (value <= vvColorValues[0]) {
          return vvColorColors[0];
        }

        for (int i = 1; i < vvColorNumber; ++i) {
          if (vvColorValues[i] >= value) {
            float f = (value - vvColorValues[i-1]) / (vvColorValues[i] - vvColorValues[i-1]);
            return mix(vvColorColors[i-1], vvColorColors[i], f);
          }
        }
        return vvColorColors[vvColorNumber - 1];
      }

      vec4 vvGetColor(vec4 featureAttribute) {
        return interpolateVVColor(featureAttribute.y);
      }

      ${n.hasVVInstancing?v.glsl`
            vec4 vvColor() {
              return vvGetColor(instanceFeatureAttribute);
            }

            MaskedColor applyVVColor(MaskedColor color) {
              return multiplyMaskedColors(color, createMaskedFromNaNColor(vvColor()));
            }
            `:v.glsl`
            vec4 vvColor() {
              return vec4(1.0);
            }

            MaskedColor applyVVColor(MaskedColor color) {
              return color;
            }
            `}
    `)):u.code.add(v.glsl`vec4 vvColor() {
return vec4(1.0);
}
MaskedColor applyVVColor(MaskedColor color) {
return color;
}`)},Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});