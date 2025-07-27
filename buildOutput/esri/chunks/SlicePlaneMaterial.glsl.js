// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/webgl/ShaderBuilder"],function(e,r,d,i,o,a){"use strict";function l(e){const l=new a.ShaderBuilder,{vertex:g,fragment:t,attributes:n,varyings:s}=l;return r.addProjViewLocalOrigin(g,e),n.add("position","vec3"),n.add("uv0","vec2"),s.add("vUV","vec2"),g.main.add(o.glsl`vUV = uv0;
gl_Position = proj * view * vec4(position, 1.0);`),t.uniforms.add(new d.Float4PassUniform("backgroundColor",e=>e.backgroundColor),new d.Float4PassUniform("gridColor",e=>e.gridColor),new i.FloatPassUniform("gridWidth",e=>e.gridWidth)).main.add(o.glsl`const float LINE_WIDTH = 1.0;
vec2 uvScaled = vUV * gridWidth;
vec2 gridUV = (fract(uvScaled + 0.5) - 0.5) / (LINE_WIDTH * fwidth(uvScaled));
vec2 grid = (1.0 - step(0.5, gridUV)) * step(-0.5, gridUV);
grid.x *= step(0.5, uvScaled.x) * step(uvScaled.x, gridWidth - 0.5);
grid.y *= step(0.5, uvScaled.y) * step(uvScaled.y, gridWidth - 0.5);
float gridFade = max(grid.x, grid.y);
float gridAlpha = gridColor.a * gridFade;
fragColor =
vec4(backgroundColor.rgb * backgroundColor.a, backgroundColor.a) * (1.0 - gridAlpha) +
vec4(gridColor.rgb, 1.0) * gridAlpha;`),l}const g=Object.freeze(Object.defineProperty({__proto__:null,build:l},Symbol.toStringTag,{value:"Module"}));e.SlicePlaneMaterial=g,e.build=l});