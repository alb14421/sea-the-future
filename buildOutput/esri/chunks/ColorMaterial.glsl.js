// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/ObjectAndLayerIdColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/TerrainDepthTest.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/VisualVariables.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/shaders/OutputColorHighlightOID.glsl","../views/webgl/ShaderBuilder"],function(e,r,o,i,l,s,a,d,n,t,g,u,c){"use strict";function b(e){const b=new c.ShaderBuilder,{vertex:v,fragment:w,attributes:h,varyings:C}=b,{hasVVColor:p,hasVertexColors:y}=e;return n.addProjViewLocalOrigin(v,e),b.include(o.Transform,e),b.include(l.VertexColor,e),b.include(a.VisualVariables,e),b.include(i.ObjectAndLayerIdColor,e),w.include(r.SliceDraw,e),b.include(u.outputColorHighlightOID,e),b.include(s.terrainDepthTest,e),h.add("position","vec3"),p&&h.add("colorFeatureAttribute","float"),y||C.add("vColor","vec4"),C.add("vpos","vec3",{invariant:!0}),v.uniforms.add(new t.Float4PassUniform("uColor",e=>e.color)),v.main.add(g.glsl`
      vpos = position;
      forwardNormalizedVertexColor();
      forwardObjectAndLayerIdColor();

      ${y?"vColor *= uColor;":p?"vColor = uColor * interpolateVVColor(colorFeatureAttribute);":"vColor = uColor;"}
      forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
      gl_Position = transformPosition(proj, view, vpos);`),w.include(d.ColorConversion),w.main.add(g.glsl`discardBySlice(vpos);
discardByTerrainDepth();
outputColorHighlightOID(vColor, vpos, vColor.rgb);`),b}const v=Object.freeze(Object.defineProperty({__proto__:null,build:b},Symbol.toStringTag,{value:"Module"}));e.ColorMaterial=v,e.build=b});