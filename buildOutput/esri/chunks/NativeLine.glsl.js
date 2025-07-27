// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/shaders/OutputColorHighlightOID.glsl","../views/webgl/ShaderBuilder"],function(e,o,r,i,l,s,n,t,a){"use strict";function d(e){const d=new a.ShaderBuilder,{vertex:g,fragment:c,varyings:u}=d;return d.fragment.include(o.SliceDraw,e),d.include(r.Transform,e),d.include(i.VertexColor,e),d.include(t.outputColorHighlightOID,e),l.addProjViewLocalOrigin(g,e),d.attributes.add("position","vec3"),u.add("vpos","vec3",{invariant:!0}),g.main.add(n.glsl`vpos = position;
forwardNormalizedVertexColor();
gl_Position = transformPosition(proj, view, vpos);`),e.hasVertexColors||c.uniforms.add(new s.Float4PassUniform("constantColor",e=>e.color)),c.main.add(n.glsl`
    discardBySlice(vpos);
    vec4 color = ${e.hasVertexColors?"vColor":"constantColor"};
    outputColorHighlightOID(color, vpos, color.rgb);
  `),d}const g=Object.freeze(Object.defineProperty({__proto__:null,build:d},Symbol.toStringTag,{value:"Module"}));e.NativeLine=g,e.build=d});