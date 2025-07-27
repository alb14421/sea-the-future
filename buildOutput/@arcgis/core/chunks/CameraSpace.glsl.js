/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{U as o}from"./Emissions.glsl.js";import{g as s}from"./glsl.js";import{D as t}from"./enums.js";import{b as r}from"./VertexAttributeLocations.js";import{V as e}from"./VertexElementDescriptor.js";import{s as i}from"./vec2.js";import{c as a}from"./vec2f64.js";import{s as n}from"./vec4.js";import{c}from"./vec4f64.js";import{F as f,B as m}from"./Matrix4PassUniform.js";class p extends o{constructor(o,s,t){super(o,"vec2",1,(r,e,i)=>r.setUniform2fv(o,s(e,i),t))}}function d(o,t=!0){o.attributes.add("position","vec2"),t&&o.varyings.add("uv","vec2"),o.vertex.main.add(s`
      gl_Position = vec4(position, 0.0, 1.0);
      ${t?s`uv = position * 0.5 + vec2(0.5);`:""}
  `)}const u=[],l=[new e("position",3,t.FLOAT,0,12)],v=[new e("position",2,t.FLOAT,0,8)],j=r(v),g=[new e("position",2,t.FLOAT,0,12),new e("uv0",2,t.HALF_FLOAT,8,12)],x=[new e("position",2,t.FLOAT,0,16),new e("uv0",2,t.FLOAT,8,16)];function w(o){o.fragment.uniforms.add(new f("projInfo",o=>function(o){const s=o.projectionMatrix;return 0===s[11]?n(F,2/(o.fullWidth*s[0]),2/(o.fullHeight*s[5]),(1+s[12])/s[0],(1+s[13])/s[5]):n(F,-2/(o.fullWidth*s[0]),-2/(o.fullHeight*s[5]),(1-s[8])/s[0],(1-s[9])/s[5])}(o.camera))),o.fragment.uniforms.add(new m("zScale",o=>0===o.camera.projectionMatrix[11]?i(A,0,1):i(A,1,0))),o.fragment.code.add(s`vec3 reconstructPosition(vec2 fragCoord, float depth) {
return vec3((fragCoord * projInfo.xy + projInfo.zw) * (zScale.x * depth + zScale.y), depth);
}`)}const F=c(),A=a();export{w as C,p as F,u as N,j as P,d as S,l as a,g as b,x as c,v as d};
