// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/Offset.glsl","../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/InstanceColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/InstancedDoublePrecision.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/MaskedColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/NormalAttribute.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/SymbolColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/TextureCoordinateAttribute.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/VerticalOffset.glsl","../views/3d/webgl-engine/core/shaderLibrary/default/DefaultMaterialAuxiliaryPasses.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateAmbientOcclusion.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateSceneLighting.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/MainLighting.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/PhysicallyBasedRendering.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/PhysicallyBasedRenderingParameters.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/ReadShadowMap.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/TerrainDepthTest.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/VisualVariables.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/DiscardOrAdjustAlpha.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/MixExternalColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/Float3PassUniform","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/3d/webgl-engine/materials/internal/MaterialUtil","../views/3d/webgl-engine/shaders/OutputColorHighlightOID.glsl","../views/webgl/ShaderBuilder","../webscene/support/AlphaCutoff"],function(e,a,i,o,r,l,t,s,n,d,c,g,b,v,u,w,h,m,f,p,y,x,C,L,M,P,O,A,D,S,I,F,E,V){"use strict";function N(e){const N=new E.ShaderBuilder,{attributes:T,vertex:B,fragment:$,varyings:R}=N,{output:k,offsetBackfaces:U,pbrMode:_,snowCover:j,spherical:z,hasBloom:G}=e,W=1===_||2===_;if(M.addProjViewLocalOrigin(B,e),T.add("position","vec3"),R.add("vpos","vec3",{invariant:!0}),N.include(x.VisualVariables,e),N.include(t.InstancedDoublePrecision,e),N.include(b.VerticalOffset,e),N.include(y.terrainDepthTest,e),!i.isColorOrColorEmission(k))return N.include(v.DefaultMaterialAuxiliaryPasses,e),N;M.addCameraPosition(N.vertex,e),N.include(n.NormalAttribute,e),N.include(r.Transform,e),U&&N.include(a.Offset),R.add("vNormalWorld","vec3"),R.add("localvpos","vec3",{invariant:!0}),N.include(c.TextureCoordinateAttribute,e),N.include(d.SymbolColor,e),N.include(l.InstanceColor,e),N.include(g.VertexColor,e),B.include(s.MaskedColorDefinition),B.include(s.CreateMaskedFromNaNColor),B.uniforms.add(new O.Float4PassUniform("externalColor",e=>e.externalColor,{supportsNaN:!0})),R.add("vcolorExt","vec4"),N.include(e.instancedDoublePrecision?p.ReadShadowMapPass:p.ReadShadowMapDraw,e),B.main.add(D.glsl`
      forwardNormalizedVertexColor();

      MaskedColor maskedColorExt =
        applySymbolColor(applyVVColor(applyInstanceColor(createMaskedFromNaNColor(externalColor))));

      vcolorExt = maskedColorExt.color;
      forwardColorMixMode(maskedColorExt.mask);

      bool alphaCut = opacityMixMode != ${D.glsl.int(I.colorMixModes.ignore)} && vcolorExt.a < ${D.glsl.float(V.alphaCutoff)};
      vpos = getVertexInLocalOriginSpace();
      localvpos = vpos - view[3].xyz;
      vpos = subtractOrigin(vpos);
      vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
      vpos = addVerticalOffset(vpos, localOrigin);
      vec4 basePosition = transformPosition(proj, view, vpos);

      forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
      forwardTextureCoordinates();
      forwardLinearDepthToReadShadowMap();
      gl_Position = alphaCut ? vec4(1e38, 1e38, 1e38, 1.0) :
      ${D.If(U,"offsetBackfacingClipPosition(basePosition, vpos, vNormalWorld, cameraPosition);","basePosition;")}
    `);const{hasColorTexture:H,hasColorTextureTransform:q}=e;return N.include(w.EvaluateSceneLighting,e),$.include(u.EvaluateAmbientOcclusion,e),N.include(C.DiscardOrAdjustAlphaPass,e),$.include(o.SliceDraw,e),N.include(F.outputColorHighlightOID,e),M.addCameraPosition($,e),h.addMainLightDirection($),w.addAmbientBoostFactor($),w.addLightingGlobalFactor($),$.uniforms.add(B.uniforms.get("localOrigin"),B.uniforms.get("view"),new P.Float3PassUniform("ambient",e=>e.ambient),new P.Float3PassUniform("diffuse",e=>e.diffuse),new A.FloatPassUniform("opacity",e=>e.opacity),new A.FloatPassUniform("layerOpacity",e=>e.layerOpacity)),H&&$.uniforms.add(new S.Texture2DPassUniform("tex",e=>e.texture)),N.include(f.PhysicallyBasedRenderingParameters,e),$.include(m.PhysicallyBasedRendering,e),$.include(L.MixExternalColor),h.addMainLightIntensity($),$.main.add(D.glsl`
      discardBySlice(vpos);
      discardByTerrainDepth();
      vec4 texColor = ${H?`texture(tex, ${q?"colorUV":"vuv0"})`:" vec4(1.0)"};
      ${D.If(H,`${D.If(e.textureAlphaPremultiplied,"texColor.rgb /= texColor.a;")}\n        discardOrAdjustAlpha(texColor);`)}
      vec3 viewDirection = normalize(vpos - cameraPosition);
      applyPBRFactors();
      float ssao = evaluateAmbientOcclusionInverse();
      ssao *= getBakedOcclusion();

      float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
      vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
      float shadow = readShadow(additionalAmbientScale, vpos);
      vec3 matColor = max(ambient, diffuse);
      ${e.hasVertexColors?D.glsl`vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
             float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, opacityMixMode);`:D.glsl`vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
             float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, opacityMixMode);`}

      ${D.If(j,"albedo = mix(albedo, vec3(1), 0.9);")}
      ${D.glsl`vec3 shadingNormal = normalize(vNormalWorld);
             albedo *= 1.2;
             vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
             float alignmentLightView = clamp(dot(viewForward, -mainLightDirection), 0.0, 1.0);
             float transmittance = 1.0 - clamp(dot(viewForward, shadingNormal), 0.0, 1.0);
             float treeRadialFalloff = vColor.r;
             float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
             additionalLight += backLightFactor * mainLightIntensity;`}
      ${D.If(W,`vec3 normalGround = ${z?"normalize(vpos + localOrigin)":"vec3(0.0, 0.0, 1.0)"};`)}
      ${W?D.glsl`float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
                 ${D.If(j,D.glsl`mrr = applySnowToMRR(mrr, 1.0)`)}
            vec4 emission = ${j||G?"vec4(0.0)":"getEmissions(albedo)"};
            vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:D.glsl`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
      vec4 finalColor = vec4(shadedColor, opacity_);
      outputColorHighlightOID(finalColor, vpos, albedo ${D.If(j,", 1.0")});`),N}const T=Object.freeze(Object.defineProperty({__proto__:null,build:N},Symbol.toStringTag,{value:"Module"}));e.RealisticTree=T,e.build=N});