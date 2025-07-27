// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/ObjectAndLayerIdColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/TerrainDepthTest.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/3d/webgl-engine/shaders/OutputColorHighlightOID.glsl","../views/webgl/NoParameters","../views/webgl/ShaderBuilder"],function(e,r,i,o,s,a,t,l,n,d,g,c,v){"use strict";class u extends c.NoParameters{}function w(e){const c=new v.ShaderBuilder,{vertex:u,fragment:w,varyings:b}=c,{output:p,perspectiveInterpolation:f}=e;return t.addProjViewLocalOrigin(u,e),c.include(i.Transform,e),c.include(s.terrainDepthTest,e),c.fragment.include(r.SliceDraw,e),c.include(o.ObjectAndLayerIdColor,e),c.include(g.outputColorHighlightOID,e),c.attributes.add("position","vec3"),c.attributes.add("uv0","vec2"),f&&c.attributes.add("perspectiveDivide","float"),u.main.add(n.glsl`
    vpos = position;
    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    vTexCoord = uv0;
    gl_Position = transformPosition(proj, view, vpos);
    ${n.If(f,"gl_Position *= perspectiveDivide;")}`),b.add("vpos","vec3",{invariant:!0}),b.add("vTexCoord","vec2"),w.include(a.ColorConversion),w.uniforms.add(new l.FloatPassUniform("opacity",e=>e.opacity),new d.Texture2DPassUniform("tex",e=>e.glTexture)).main.add(n.glsl`
    discardBySlice(vpos);
    discardByTerrainDepth();
    ${n.If(9===p,"fragColor = vec4(0, 0, 0, 1); return;")}
    vec4 finalColor = texture(tex, vTexCoord) * opacity;
    outputColorHighlightOID(finalColor, vpos, finalColor.rgb);`),c}const b=Object.freeze(Object.defineProperty({__proto__:null,ImageMaterialPassParameters:u,build:w},Symbol.toStringTag,{value:"Module"}));e.ImageMaterial=b,e.ImageMaterialPassParameters=u,e.build=w});