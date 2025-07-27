// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/TerrainDepthTest.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/Float2PassUniform","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/shaders/OutputColorHighlightOID.glsl","../views/webgl/ShaderBuilder"],function(e,o,i,r,l,a,s,d,n,t){"use strict";function c(e){const c=new t.ShaderBuilder,{vertex:g,fragment:u,varyings:v}=c;return c.fragment.include(o.SliceDraw,e),c.include(i.terrainDepthTest,e),c.include(n.outputColorHighlightOID,e),l.addProjViewLocalOrigin(g,e),c.attributes.add("position","vec3"),c.attributes.add("uv0","vec2"),v.add("vUV","vec2"),v.add("vpos","vec3"),g.main.add(d.glsl`vUV = uv0;
vpos = position;
forwardViewPosDepth((view * vec4(position, 1.0)).xyz);
gl_Position = proj * view * vec4(position, 1.0);`),u.uniforms.add(new a.Float2PassUniform("size",e=>e.size)),u.uniforms.add(new s.Float4PassUniform("color1",e=>e.color1)),u.uniforms.add(new s.Float4PassUniform("color2",e=>e.color2)),u.include(r.ColorConversion),u.main.add(d.glsl`discardByTerrainDepth();
vec2 uvScaled = vUV / (2.0 * size);
vec2 uv = fract(uvScaled - 0.25);
vec2 ab = clamp((abs(uv - 0.5) - 0.25) / fwidth(uvScaled), -0.5, 0.5);
float fade = smoothstep(0.25, 0.5, max(fwidth(uvScaled.x), fwidth(uvScaled.y)));
float t = mix(abs(ab.x + ab.y), 0.5, fade);
fragColor = mix(color2, color1, t);
outputColorHighlightOID(fragColor, vpos, fragColor.rgb);`),c}const g=Object.freeze(Object.defineProperty({__proto__:null,build:c},Symbol.toStringTag,{value:"Module"}));e.CheckerBoard=g,e.build=c});