// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../../core/libs/gl-matrix-2/math/mat4","../../../../core/libs/gl-matrix-2/factories/mat4f64","../core/shaderModules/glsl","../core/shaderModules/Matrix4BindUniform"],function(e,i,r,t,n){"use strict";const o=r.create();e.ScreenSpacePassAtmosphere=function(e,r={needUVs:!0,needEyeDirection:!0}){e.attributes.add("position","vec2"),e.varyings.add("worldRay","vec3");const{needUVs:a,needEyeDirection:s}=r;a&&e.varyings.add("uv","vec2"),s&&e.varyings.add("eyeDir","vec3"),e.vertex.uniforms.add(new n.Matrix4BindUniform("inverseProjectionMatrix",e=>e.camera.inverseProjectionMatrix),new n.Matrix4BindUniform("inverseViewMatrix",e=>i.invertOrIdentity(o,e.camera.viewMatrix))),e.vertex.main.add(t.glsl`
    vec3 posViewNear = (inverseProjectionMatrix * vec4(position, -1.0, 1.0)).xyz;
    ${t.If(s,"eyeDir = posViewNear;")}
    worldRay = (inverseViewMatrix * vec4(posViewNear, 0)).xyz;
    ${t.If(a,"uv = position * 0.5 + vec2(0.5);")}
    gl_Position = vec4(position, 1, 1);
  `)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});