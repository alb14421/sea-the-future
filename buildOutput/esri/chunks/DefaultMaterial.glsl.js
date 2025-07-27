// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/Offset.glsl","../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/InstanceColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/InstancedDoublePrecision.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/MaskedColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/NormalAttribute.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/SymbolColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/TextureCoordinateAttribute.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexNormal.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/VerticalOffset.glsl","../views/3d/webgl-engine/core/shaderLibrary/default/DefaultMaterialAuxiliaryPasses.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/ComputeNormalTexture.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateAmbientOcclusion.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateSceneLighting.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/MainLighting.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/Normals.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/PhysicallyBasedRendering.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/PhysicallyBasedRenderingParameters.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/ReadShadowMap.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/TerrainDepthTest.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/TextureTransformUV.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/VisualVariables.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/DiscardOrAdjustAlpha.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/MixExternalColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/Float3PassUniform","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/3d/webgl-engine/effects/weather/SnowCover.glsl","../views/3d/webgl-engine/materials/internal/MaterialUtil","../views/3d/webgl-engine/shaders/OutputColorHighlightOID.glsl","../views/webgl/ShaderBuilder","../webscene/support/AlphaCutoff"],function(e,a,r,o,i,l,s,n,t,d,c,g,u,m,v,w,b,h,f,p,y,x,C,L,P,M,T,V,N,O,S,A,D,I,U,$,E,F,B){"use strict";function R(e){const R=new F.ShaderBuilder,{attributes:k,vertex:_,fragment:j,varyings:z}=R,{output:W,normalType:G,offsetBackfaces:H,spherical:q,snowCover:J,pbrMode:K,textureAlphaPremultiplied:Q,instancedDoublePrecision:X,hasVertexColors:Y,hasVertexTangents:Z,hasColorTexture:ee,hasNormalTexture:ae,hasNormalTextureTransform:re,hasColorTextureTransform:oe,hasBloom:ie}=e;if(N.addProjViewLocalOrigin(_,e),k.add("position","vec3"),z.add("vpos","vec3",{invariant:!0}),R.include(M.VisualVariables,e),R.include(s.InstancedDoublePrecision,e),R.include(m.VerticalOffset,e),R.include(P.colorTextureUV,e),!r.isColorOrColorEmission(W))return R.include(v.DefaultMaterialAuxiliaryPasses,e),R;R.include(P.normalTextureUV,e),R.include(P.emissiveTextureUV,e),R.include(P.occlusionTextureUV,e),R.include(P.metallicRoughnessTextureUV,e),N.addCameraPosition(_,e),R.include(t.NormalAttribute,e),R.include(i.Transform,e);const le=0===G||1===G;return le&&H&&R.include(a.Offset),R.include(w.ComputeNormalTexture,e),R.include(u.VertexNormal,e),R.include(l.InstanceColor,e),z.add("vPositionLocal","vec3"),R.include(c.TextureCoordinateAttribute,e),R.include(d.SymbolColor,e),R.include(g.VertexColor,e),_.uniforms.add(new S.Float4PassUniform("externalColor",e=>e.externalColor,{supportsNaN:!0})),z.add("vcolorExt","vec4"),R.include(L.terrainDepthTest,e),_.include(n.MaskedColorDefinition),_.include(n.CreateMaskedFromNaNColor),R.include(X?C.ReadShadowMapPass:C.ReadShadowMapDraw,e),_.main.add(D.glsl`
    forwardNormalizedVertexColor();

    MaskedColor maskedColor =
      applySymbolColor(applyVVColor(applyInstanceColor(createMaskedFromNaNColor(externalColor))));

    vcolorExt = maskedColor.color;
    forwardColorMixMode(maskedColor.mask);

    vpos = getVertexInLocalOriginSpace();
    vPositionLocal = vpos - view[3].xyz;
    vpos = subtractOrigin(vpos);
    ${D.If(le,"vNormalWorld = dpNormal(vvLocalNormal(normalModel()));")}
    vpos = addVerticalOffset(vpos, localOrigin);
    ${D.If(Z,"vTangent = dpTransformVertexTangent(tangent);")}
    gl_Position = transformPosition(proj, view, vpos);
    ${D.If(le&&H,"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);")}

    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    forwardTextureCoordinates();
    forwardColorUV();
    forwardNormalUV();
    forwardEmissiveUV();
    forwardOcclusionUV();
    forwardMetallicRoughnessUV();

    if (opacityMixMode != ${D.glsl.int($.colorMixModes.ignore)} && vcolorExt.a < ${D.glsl.float(B.alphaCutoff)}) {
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
    }
    forwardLinearDepthToReadShadowMap();
  `),R.include(h.EvaluateSceneLighting,e),j.include(b.EvaluateAmbientOcclusion,e),R.include(T.DiscardOrAdjustAlphaPass,e),j.include(o.SliceDraw,e),R.include(E.outputColorHighlightOID,e),N.addCameraPosition(j,e),j.uniforms.add(_.uniforms.get("localOrigin"),new O.Float3PassUniform("ambient",e=>e.ambient),new O.Float3PassUniform("diffuse",e=>e.diffuse),new A.FloatPassUniform("opacity",e=>e.opacity),new A.FloatPassUniform("layerOpacity",e=>e.layerOpacity)),ee&&j.uniforms.add(new I.Texture2DPassUniform("tex",e=>e.texture)),R.include(x.PhysicallyBasedRenderingParameters,e),j.include(y.PhysicallyBasedRendering,e),j.include(V.MixExternalColor),R.include(p.Normals,e),j.include(U.SnowCover,e),h.addAmbientBoostFactor(j),h.addLightingGlobalFactor(j),f.addMainLightIntensity(j),j.main.add(D.glsl`
    discardBySlice(vpos);
    discardByTerrainDepth();
    ${ee?D.glsl`
            vec4 texColor = texture(tex, ${oe?"colorUV":"vuv0"});
            ${D.If(Q,"texColor.rgb /= texColor.a;")}
            discardOrAdjustAlpha(texColor);`:D.glsl`vec4 texColor = vec4(1.0);`}
    shadingParams.viewDirection = normalize(vpos - cameraPosition);
    ${2===G?D.glsl`vec3 normal = screenDerivativeNormal(vPositionLocal);`:D.glsl`shadingParams.normalView = vNormalWorld;
                vec3 normal = shadingNormal(shadingParams);`}
    applyPBRFactors();
    float ssao = evaluateAmbientOcclusionInverse() * getBakedOcclusion();

    vec3 posWorld = vpos + localOrigin;

    float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
    float shadow = readShadow(additionalAmbientScale, vpos);

    vec3 matColor = max(ambient, diffuse);
    vec3 albedo = mixExternalColor(${D.If(Y,"vColor.rgb *")} matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
    float opacity_ = layerOpacity * mixExternalOpacity(${D.If(Y,"vColor.a * ")} opacity, texColor.a, vcolorExt.a, opacityMixMode);

    ${ae?`mat3 tangentSpace = computeTangentSpace(${Z?"normal":"normal, vpos, vuv0"});\n            vec3 shadingNormal = computeTextureNormal(tangentSpace, ${re?"normalUV":"vuv0"});`:"vec3 shadingNormal = normal;"}
    vec3 normalGround = ${q?"normalize(posWorld);":"vec3(0.0, 0.0, 1.0);"}

    ${D.If(J,D.glsl`
          float snow = getSnow(normal, normalGround);
          albedo = mix(albedo, vec3(1), snow);
          shadingNormal = mix(shadingNormal, normal, snow);
          ssao = mix(ssao, 1.0, snow);`)}

    vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

    ${1===K||2===K?D.glsl`
            float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
            vec4 emission = ${ie?"vec4(0.0)":"getEmissions(albedo)"};
            ${D.If(J,"mrr = applySnowToMRR(mrr, snow);\n               emission = snowCoverForEmissions(emission, snow);")}
            vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:D.glsl`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
    vec4 finalColor = vec4(shadedColor, opacity_);
    outputColorHighlightOID(finalColor, vpos, albedo ${D.If(J,", snow")});
  `),R}const k=Object.freeze(Object.defineProperty({__proto__:null,build:R},Symbol.toStringTag,{value:"Module"}));e.DefaultMaterial=k,e.build=R});