// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../core/libs/gl-matrix-2/factories/vec4f64","../views/3d/webgl-engine/core/shaderLibrary/ScreenSizeScaling.glsl","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/TerrainDepthTest.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/Float3PassUniform","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/shaders/OutputColorHighlightOID.glsl","../views/webgl/ShaderBuilder"],function(e,i,o,r,l,n,a,s,d,t,g,c,v){"use strict";function w(e){const i=new v.ShaderBuilder;i.include(l.Transform,e),i.include(o.ScreenSizeScaling,e),i.fragment.include(r.SliceDraw,e),i.include(c.outputColorHighlightOID,e),i.include(n.terrainDepthTest,e);const{vertex:w,fragment:h}=i;return h.include(a.ColorConversion),s.addProjViewLocalOrigin(w,e),h.uniforms.add(new t.Float4PassUniform("uColor",e=>e.color)),i.attributes.add("position","vec3"),i.varyings.add("vWorldPosition","vec3"),e.screenSizeEnabled&&i.attributes.add("offset","vec3"),e.shadingEnabled&&(s.addViewNormal(w),i.attributes.add("normal","vec3"),i.varyings.add("vViewNormal","vec3"),h.uniforms.add(new d.Float3PassUniform("shadingDirection",e=>e.shadingDirection)),h.uniforms.add(new t.Float4PassUniform("shadedColor",e=>function(e,i){const o=1-e[3],r=e[3]+i[3]*o;return 0===r?(u[3]=r,u):(u[0]=(e[0]*e[3]+i[0]*i[3]*o)/r,u[1]=(e[1]*e[3]+i[1]*i[3]*o)/r,u[2]=(e[2]*e[3]+i[2]*i[3]*o)/r,u[3]=i[3],u)}(e.shadingTint,e.color)))),w.main.add(g.glsl`
      vWorldPosition = ${e.screenSizeEnabled?g.glsl`screenSizeScaling(offset, position)`:g.glsl`position`};
      ${e.shadingEnabled?g.glsl`vec3 worldNormal = normal;
                 vViewNormal = (viewNormal * vec4(worldNormal, 1)).xyz;`:""}
      forwardViewPosDepth((view * vec4(vWorldPosition, 1.0)).xyz);
      gl_Position = transformPosition(proj, view, vWorldPosition);
  `),h.main.add(g.glsl`
      discardBySlice(vWorldPosition);
      discardByTerrainDepth();
      ${e.shadingEnabled?g.glsl`vec3 viewNormalNorm = normalize(vViewNormal);
             float shadingFactor = 1.0 - clamp(-dot(viewNormalNorm, shadingDirection), 0.0, 1.0);
             vec4 finalColor = mix(uColor, shadedColor, shadingFactor);`:g.glsl`vec4 finalColor = uColor;`}
      outputColorHighlightOID(finalColor, vWorldPosition, finalColor.rgb);`),i}const u=i.create(),h=Object.freeze(Object.defineProperty({__proto__:null,build:w},Symbol.toStringTag,{value:"Module"}));e.ShadedColorMaterial=h,e.build=w});