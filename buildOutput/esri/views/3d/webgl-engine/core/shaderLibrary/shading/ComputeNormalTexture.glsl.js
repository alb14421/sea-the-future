// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/libs/gl-matrix-2/factories/mat3f64","../../../../../../core/libs/gl-matrix-2/factories/vec2f64","../attributes/VertexTextureCoordinates.glsl","../../shaderModules/Float2PassUniform","../../shaderModules/glsl","../../shaderModules/Matrix3PassUniform","../../shaderModules/Texture2DDrawUniform","../../shaderModules/Texture2DPassUniform"],function(e,a,t,r,n,o,s,l,m){"use strict";e.ComputeNormalTexture=function(e,d){const c=e.fragment,{hasVertexTangents:i,doubleSidedMode:u,hasNormalTexture:T,textureCoordinateType:x,bindType:g,hasNormalTextureTransform:v}=d;i?(e.attributes.add("tangent","vec4"),e.varyings.add("vTangent","vec4"),2===u?c.code.add(o.glsl`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = gl_FrontFacing ? vTangent.w : -vTangent.w;
vec3 tangent = normalize(gl_FrontFacing ? vTangent.xyz : -vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`):c.code.add(o.glsl`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = vTangent.w;
vec3 tangent = normalize(vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`)):c.code.add(o.glsl`mat3 computeTangentSpace(vec3 normal, vec3 pos, vec2 st) {
vec3 Q1 = dFdx(pos);
vec3 Q2 = dFdy(pos);
vec2 stx = dFdx(st);
vec2 sty = dFdy(st);
float det = stx.t * sty.s - sty.t * stx.s;
vec3 T = stx.t * Q2 - sty.t * Q1;
T = T - normal * dot(normal, T);
T *= inversesqrt(max(dot(T,T), 1.e-10));
vec3 B = sign(det) * cross(normal, T);
return mat3(T, B, normal);
}`),T&&0!==x&&(e.include(r.VertexTextureCoordinates,d),c.uniforms.add(1===g?new m.Texture2DPassUniform("normalTexture",e=>e.textureNormal):new l.Texture2DDrawUniform("normalTexture",e=>e.textureNormal)),v&&(c.uniforms.add(new n.Float2PassUniform("scale",e=>e.scale??t.ONES)),c.uniforms.add(new s.Matrix3PassUniform("normalTextureTransformMatrix",e=>e.normalTextureTransformMatrix??a.IDENTITY))),c.code.add(o.glsl`vec3 computeTextureNormal(mat3 tangentSpace, vec2 uv) {
vec3 rawNormal = textureLookup(normalTexture, uv).rgb * 2.0 - 1.0;`),v&&c.code.add(o.glsl`mat3 normalRotation = mat3(normalTextureTransformMatrix[0][0]/scale[0], normalTextureTransformMatrix[0][1]/scale[1], 0.0,
normalTextureTransformMatrix[1][0]/scale[0], normalTextureTransformMatrix[1][1]/scale[1], 0.0,
0.0, 0.0, 0.0 );
rawNormal.xy = (normalRotation * vec3(rawNormal.x, rawNormal.y, 1.0)).xy;`),c.code.add(o.glsl`return tangentSpace * rawNormal;
}`))},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});