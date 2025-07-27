// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/libs/gl-matrix-2/factories/vec2f64","../../shaderModules/Float2PassUniform","../../shaderModules/Float3PassUniform","../../shaderModules/Float4PassUniform","../../shaderModules/Float4sPassUniform","../../shaderModules/FloatPassUniform","../../shaderModules/FloatsPassUniform","../../shaderModules/glsl","../../../materials/VisualVariablePassParameters"],function(e,a,o,r,i,t,l,s,v,c){"use strict";class n extends c.VisualVariablePassParameters{constructor(){super(...arguments),this.size=a.fromValues(1,1)}}e.PathVertexPosition=function(e,a){const{attributes:n,vertex:f}=e;n.add("position","vec3"),n.add("profileVertexAndNormal","vec4"),n.add("profileAuxData","vec3"),n.add("profileRight","vec2"),n.add("profileUp","vec2"),f.code.add(v.glsl`bool isCapVertex() {
return profileAuxData.z == 1.0;
}`),f.uniforms.add(new o.Float2PassUniform("size",e=>e.size));const{hasVVSize:u,hasVVColor:p,hasVVOpacity:d}=a;u?(n.add("sizeFeatureAttribute","float"),f.uniforms.add(new r.Float3PassUniform("vvSizeMinSize",e=>e.vvSize.minSize),new r.Float3PassUniform("vvSizeMaxSize",e=>e.vvSize.maxSize),new r.Float3PassUniform("vvSizeOffset",e=>e.vvSize.offset),new r.Float3PassUniform("vvSizeFactor",e=>e.vvSize.factor),new r.Float3PassUniform("vvSizeFallback",e=>e.vvSize.fallback)),f.code.add(v.glsl`vec2 getSize() {
float value = sizeFeatureAttribute;
if (isnan(value)) {
return vvSizeFallback.xz;
}
return size * clamp(vvSizeOffset + value * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).xz;
}`)):f.code.add(v.glsl`vec2 getSize(){
return size;
}`),d?(n.add("opacityFeatureAttribute","float"),f.constants.add("vvOpacityNumber","int",8),f.uniforms.add(new s.FloatsPassUniform("vvOpacityValues",e=>e.vvOpacity.values,8),new s.FloatsPassUniform("vvOpacityOpacities",e=>e.vvOpacity.opacityValues,8),new l.FloatPassUniform("vvOpacityFallback",e=>e.vvOpacity.fallback,{supportsNaN:!0})),f.code.add(v.glsl`
    vec4 applyOpacity(vec4 color) {
      // if we encounter NaN in the color it means the color is in the fallback case where the symbol color
      // is not defined and there is no valid color visual variable override. In this case just return a fully
      // transparent color
      if (isnan(color.r)) {
        return vec4(0);
      }

      float value = opacityFeatureAttribute;

      if (isnan(value)) {
        // If there is a color vv then it will already have taken care of applying the fallback
        return ${v.If(p,"color","vec4(color.rgb, vvOpacityFallback)")};
      }

      if (value <= vvOpacityValues[0]) {
        return vec4(color.rgb, vvOpacityOpacities[0]);
      }

      for (int i = 1; i < vvOpacityNumber; ++i) {
        if (vvOpacityValues[i] >= value) {
          float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);
          return vec4(color.rgb, mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f));
        }
      }

      return vec4( color.rgb, vvOpacityOpacities[vvOpacityNumber - 1]);
    }
    `)):f.code.add(v.glsl`vec4 applyOpacity(vec4 color){
return color;
}`),p?(n.add("colorFeatureAttribute","float"),f.constants.add("vvColorNumber","int",c.vvColorNumber),f.uniforms.add(new s.FloatsPassUniform("vvColorValues",e=>e.vvColor.values,c.vvColorNumber),new t.Float4sPassUniform("vvColorColors",e=>e.vvColor.colors,c.vvColorNumber),new i.Float4PassUniform("vvColorFallback",e=>e.vvColor.fallback)),f.code.add(v.glsl`vec4 getColor() {
float value = colorFeatureAttribute;
if (isnan(value)) {
return applyOpacity(vvColorFallback);
}
if (value <= vvColorValues[0]) {
return applyOpacity(vvColorColors[0]);
}
for (int i = 1; i < vvColorNumber; ++i) {
if (vvColorValues[i] >= value) {
float f = (value - vvColorValues[i-1]) / (vvColorValues[i] - vvColorValues[i-1]);
return applyOpacity(mix(vvColorColors[i-1], vvColorColors[i], f));
}
}
return applyOpacity(vvColorColors[vvColorNumber - 1]);
}`)):f.code.add(v.glsl`vec4 getColor(){
return applyOpacity(vec4(1, 1, 1, 1));
}`),f.code.add(v.glsl`vec3 decompressAxis(vec2 axis) {
float z = 1.0 - abs(axis.x) - abs(axis.y);
return normalize(vec3(axis + sign(axis) * min(z, 0.0), z));
}
vec3 calculateVPos() {
vec2 size = getSize();
vec3 origin = position;
vec3 right = decompressAxis(profileRight);
vec3 up = decompressAxis(profileUp);
vec2 profileVertex = profileVertexAndNormal.xy * size;`),f.code.add(v.glsl`if(isCapVertex()) {
float positionOffsetAlongProfilePlaneNormal = profileAuxData.x * size[0];
vec3 forward = cross(up, right);
vec3 offset = right * profileVertex.x + up * profileVertex.y + forward * positionOffsetAlongProfilePlaneNormal;
return origin + offset;
}
vec2 rotationRight = vec2(profileAuxData.x, profileAuxData.y);
float maxDistance = length(rotationRight);`),f.code.add(v.glsl`rotationRight = maxDistance > 0.0 ? normalize(rotationRight) : vec2(0, 0);
float rx = dot(profileVertex, rotationRight);
if (abs(rx) > maxDistance) {
vec2 rotationUp = vec2(-rotationRight.y, rotationRight.x);
float ry = dot(profileVertex, rotationUp);
profileVertex = rotationRight * maxDistance * sign(rx) + rotationUp * ry;
}
vec3 offset = right * profileVertex.x + up * profileVertex.y;
return origin + offset;
}`),f.code.add(v.glsl`vec3 localNormal() {
vec3 right = decompressAxis(profileRight);
vec3 up = decompressAxis(profileUp);
vec3 normal = right * profileVertexAndNormal.z + up * profileVertexAndNormal.w;
if(isCapVertex()) {
vec3 forward = cross(up, right);
normal += forward * profileAuxData.y;
}
return normal;
}`)},e.PathVertexPositionPassParameters=n,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});