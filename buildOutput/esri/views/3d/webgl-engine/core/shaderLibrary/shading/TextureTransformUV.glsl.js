// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/libs/gl-matrix-2/factories/mat3f64","../../shaderModules/glsl","../../shaderModules/Matrix3PassUniform"],function(r,e,o,a){"use strict";r.colorTextureUV=function(r,s){s.hasColorTextureTransform?(r.varyings.add("colorUV","vec2"),r.vertex.uniforms.add(new a.Matrix3PassUniform("colorTextureTransformMatrix",r=>r.colorTextureTransformMatrix??e.IDENTITY)).code.add(o.glsl`void forwardColorUV(){
colorUV = (colorTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):r.vertex.code.add(o.glsl`void forwardColorUV(){}`)},r.emissiveTextureUV=function(r,s){s.hasEmissionTextureTransform&&0!==s.textureCoordinateType?(r.varyings.add("emissiveUV","vec2"),r.vertex.uniforms.add(new a.Matrix3PassUniform("emissiveTextureTransformMatrix",r=>r.emissiveTextureTransformMatrix??e.IDENTITY)).code.add(o.glsl`void forwardEmissiveUV(){
emissiveUV = (emissiveTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):r.vertex.code.add(o.glsl`void forwardEmissiveUV(){}`)},r.metallicRoughnessTextureUV=function(r,s){s.hasMetallicRoughnessTextureTransform&&0!==s.textureCoordinateType?(r.varyings.add("metallicRoughnessUV","vec2"),r.vertex.uniforms.add(new a.Matrix3PassUniform("metallicRoughnessTextureTransformMatrix",r=>r.metallicRoughnessTextureTransformMatrix??e.IDENTITY)).code.add(o.glsl`void forwardMetallicRoughnessUV(){
metallicRoughnessUV = (metallicRoughnessTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):r.vertex.code.add(o.glsl`void forwardMetallicRoughnessUV(){}`)},r.normalTextureUV=function(r,s){s.hasNormalTextureTransform&&0!==s.textureCoordinateType?(r.varyings.add("normalUV","vec2"),r.vertex.uniforms.add(new a.Matrix3PassUniform("normalTextureTransformMatrix",r=>r.normalTextureTransformMatrix??e.IDENTITY)).code.add(o.glsl`void forwardNormalUV(){
normalUV = (normalTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):r.vertex.code.add(o.glsl`void forwardNormalUV(){}`)},r.occlusionTextureUV=function(r,s){s.hasOcclusionTextureTransform&&0!==s.textureCoordinateType?(r.varyings.add("occlusionUV","vec2"),r.vertex.uniforms.add(new a.Matrix3PassUniform("occlusionTextureTransformMatrix",r=>r.occlusionTextureTransformMatrix??e.IDENTITY)).code.add(o.glsl`void forwardOcclusionUV(){
occlusionUV = (occlusionTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):r.vertex.code.add(o.glsl`void forwardOcclusionUV(){}`)},Object.defineProperty(r,Symbol.toStringTag,{value:"Module"})});