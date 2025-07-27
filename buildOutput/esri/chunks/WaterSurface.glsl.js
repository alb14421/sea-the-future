// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/ObjectAndLayerIdColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlight.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateAmbientLighting.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/MainLighting.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/NormalUtils.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/ReadShadowMap.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/TerrainDepthTest.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/Water.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/WaterDistortion.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/shaders/OutputColorHighlightOID.glsl","../views/webgl/ShaderBuilder","../webscene/support/AlphaCutoff"],function(e,i,a,r,o,l,t,n,s,d,g,c,v,u,w,m,h,p,f,b,y){"use strict";function C(e){const C=new b.ShaderBuilder,{vertex:L,fragment:P,varyings:D}=C,{output:S,draped:O,receiveShadows:x}=e;w.addProjViewLocalOrigin(L,e),C.include(r.Transform,e),C.attributes.add("position","vec3"),C.attributes.add("uv0","vec2");const M=new m.Float4PassUniform("waterColor",e=>e.color);if(D.add("vpos","vec3",{invariant:!0}),L.uniforms.add(M),i.isColorOrColorEmission(S)){if(O)return L.main.add(p.glsl`
      if (waterColor.a < ${p.glsl.float(y.alphaCutoff)}) {
        // Discard this vertex
        gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
        return;
      }

      vpos = position;
      gl_Position = transformPosition(proj, view, vpos);`),P.uniforms.add(M),P.main.add(p.glsl`fragColor = waterColor;`),C;C.include(s.NormalUtils,e),D.add("vuv","vec2"),D.add("vnormal","vec3"),D.add("vtbnMatrix","mat3"),L.main.add(p.glsl`
      if (waterColor.a < ${p.glsl.float(y.alphaCutoff)}) {
        // Discard this vertex
        gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
        return;
      }

      vuv = uv0;
      vpos = position;

      vnormal = getLocalUp(vpos, localOrigin);
      vtbnMatrix = getTBNMatrix(vnormal);
      forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);

      gl_Position = transformPosition(proj, view, vpos);
      forwardLinearDepthToReadShadowMap();`)}switch(C.include(d.ReadShadowMapDraw,e),C.include(g.terrainDepthTest,e),S){case 0:case 1:C.include(t.EvaluateAmbientLighting,{pbrMode:0,lightingSphericalHarmonicsOrder:2}),C.include(v.WaterDistortion),C.include(c.Water,e),P.include(a.SliceDraw,e),C.include(f.outputColorHighlightOID,e),P.include(u.ColorConversion),w.addCameraPosition(P,e),n.addMainLightDirection(P),n.addMainLightIntensity(P),P.uniforms.add(M,new h.FloatPassUniform("timeElapsed",({timeElapsed:e})=>e),L.uniforms.get("view"),L.uniforms.get("localOrigin")).main.add(p.glsl`
        discardBySlice(vpos);
        discardByTerrainDepth();
        vec3 localUp = vnormal;
        // the created normal is in tangent space
        vec4 tangentNormalFoam = getSurfaceNormalAndFoam(vuv, timeElapsed);

        // we rotate the normal according to the tangent-bitangent-normal-Matrix
        vec3 n = normalize(vtbnMatrix * tangentNormalFoam.xyz);
        vec3 v = -normalize(vpos - cameraPosition);
        float shadow = ${x?p.glsl`1.0 - readShadowMap(vpos, linearDepth)`:"1.0"};
        vec4 vPosView = view * vec4(vpos, 1.0);
        vec4 final = vec4(getSeaColor(n, v, mainLightDirection, waterColor.rgb, mainLightIntensity, localUp, shadow, tangentNormalFoam.w, vPosView.xyz, vpos + localOrigin), waterColor.w);

        // gamma correction
        fragColor = delinearizeGamma(final);
        outputColorHighlightOID(fragColor, vpos, final.rgb);`);break;case 3:C.include(s.NormalUtils,e),C.include(v.WaterDistortion,e),P.include(a.SliceDraw,e),D.add("vuv","vec2"),L.main.add(p.glsl`
        if (waterColor.a < ${p.glsl.float(y.alphaCutoff)}) {
          // Discard this vertex
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          return;
        }

        vuv = uv0;
        vpos = position;

        gl_Position = transformPosition(proj, view, vpos);`),P.uniforms.add(new h.FloatPassUniform("timeElapsed",({timeElapsed:e})=>e)).main.add(p.glsl`discardBySlice(vpos);
vec4 tangentNormalFoam = getSurfaceNormalAndFoam(vuv, timeElapsed);
tangentNormalFoam.xyz = normalize(tangentNormalFoam.xyz);
fragColor = vec4((tangentNormalFoam.xyz + vec3(1.0)) * 0.5, tangentNormalFoam.w);`);break;case 8:C.include(l.OutputHighlight,e),L.main.add(p.glsl`
        if (waterColor.a < ${p.glsl.float(y.alphaCutoff)}) {
          // Discard this vertex
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          return;
        }

        vpos = position;
        gl_Position = transformPosition(proj, view, vpos);`),P.include(a.SliceDraw,e),P.main.add(p.glsl`discardBySlice(vpos);
calculateOcclusionAndOutputHighlight();`);break;case 9:C.include(o.ObjectAndLayerIdColor,e),L.main.add(p.glsl`
        if (waterColor.a < ${p.glsl.float(y.alphaCutoff)}) {
          // Discard this vertex
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          return;
        }

        vpos = position;
        gl_Position = transformPosition(proj, view, vpos);
        forwardObjectAndLayerIdColor();`),P.include(a.SliceDraw,e),P.main.add(p.glsl`discardBySlice(vpos);
outputObjectAndLayerIdColor();`)}return C}const L=Object.freeze(Object.defineProperty({__proto__:null,build:C},Symbol.toStringTag,{value:"Module"}));e.WaterSurface=L,e.build=C});