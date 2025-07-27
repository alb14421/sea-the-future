// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../geometry/support/Ellipsoid","../views/3d/webgl-engine/collections/Component/Material/shader/ComponentData.glsl","../views/3d/webgl-engine/core/shaderLibrary/ForwardLinearDepthToWriteShadowMap.glsl","../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/TextureCoordinateAttribute.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexNormal.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexPosition.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/OutputDepth.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlight.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlightOverlay","../views/3d/webgl-engine/core/shaderLibrary/shading/ComputeFragmentNormals.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/ComputeMaterialColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/ComputeNormalTexture.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateSceneLighting.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/MainLighting.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/PhysicallyBasedRenderingParameters.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/ReadBaseColorTexture.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/ReadShadowMap.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/TerrainDepthTest.glsl","../views/3d/webgl-engine/core/shaderLibrary/terrain/Overlay.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/DiscardOrAdjustAlpha.glsl","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DBindUniform","../views/3d/webgl-engine/effects/weather/SnowCover.glsl","../views/3d/webgl-engine/shaders/OutputColorHighlightOID.glsl","../views/webgl/ShaderBuilder","../webscene/support/AlphaCutoff"],function(e,a,o,r,l,i,t,n,d,s,g,c,u,h,v,m,w,b,C,p,f,y,x,L,S,O,N,T,I,$){"use strict";function M(e){const M=new I.ShaderBuilder,{vertex:D,fragment:A}=M;M.include(s.VertexPosition,e),M.include(d.VertexNormal,e),M.include(n.VertexColor,e),M.include(t.TextureCoordinateAttribute,e),M.include(o.ComponentData,e),M.include(L.DiscardOrAdjustAlphaDraw,e),A.include(i.SlicePass,e),M.include(p.ReadBaseColorTexture,e),M.include(y.terrainDepthTest,e);const{output:P,pbrMode:W,hasNormalTexture:B,snowCover:F,receiveShadows:R,shadeNormals:E,spherical:z,ellipsoidMode:H,overlayEnabled:V,componentData:j,vertexDiscardMode:_,hasBloom:G,renderOccluded:k}=e,U=1===W||2===W;U&&(M.include(C.PhysicallyBasedRenderingParameters,e),B&&M.include(m.ComputeNormalTexture,e));const q=4===P||5===P||6===P,J=q&&1===j;if(V){M.include(w.EvaluateSceneLighting,e),M.include(x.OverlayIM,e);const o=1===H,r=1===H?a.earth.radius:o?a.mars.radius:a.moon.radius;D.code.add(`\n      ${S.If(z,`const float invRadius = ${S.glsl.float(1/r)};`)}\n      vec2 projectOverlay(vec3 pos) { return pos.xy ${S.If(z,"/ (1.0 + invRadius * pos.z);")}; }`)}const K=V&&l.isColorOrColorEmission(P)&&4===W;K&&(M.varyings.add("tbnTangent","vec3"),M.varyings.add("tbnBiTangent","vec3"),M.varyings.add("groundNormal","vec3"));const Q=0===_,X=2===_;if(M.include(f.ReadShadowMapPass,e),M.include(r.ForwardLinearDepthToWriteShadowMap,e),D.main.add(S.glsl`
    bool castShadows;
    vec4 externalColor = forwardExternalColor(castShadows);
    ${S.If(J,"if(!castShadows) { gl_Position = vec4(vec3(1e38), 1.0); return; }")}

    ${S.If(!Q,`{ if (externalColor.a ${X?">":"<="} ${S.glsl.float(1-1/255)}) { gl_Position = vec4(vec3(1e38), 1.0); return; } }`)}

    ${S.If(9===P,"externalColor.a = 1.0;")}

    forwardPosition(readElevationOffset());
    forwardViewPosDepth(vPosition_view);
    forwardNormal();
    forwardTextureCoordinates();
    forwardVertexColor();
    forwardLinearDepthToReadShadowMap();
    forwardLinearDepthToWriteShadowMap();
    forwardEmissiveStrength();
    forwardObjectAndLayerIdColor();
    ${S.If(K,z?S.glsl`
            groundNormal = normalize(positionWorld());
            tbnTangent = normalize(cross(vec3(0.0, 0.0, 1.0), groundNormal));
            tbnBiTangent = normalize(cross(groundNormal, tbnTangent));`:S.glsl`
            groundNormal = vec3(0.0, 0.0, 1.0);
            tbnTangent = vec3(1.0, 0.0, 0.0);
            tbnBiTangent = vec3(0.0, 1.0, 0.0);`)}
    ${S.If(V,"setOverlayVTC(projectOverlay(position));")}

    if (externalColor.a < ${S.glsl.float($.alphaCutoff)}) {
      // Discard this vertex
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    }
  `),l.isColorOrColorEmission(P))return M.include(v.ComputeMaterialColor,e),M.include(h.computeFragmentNormals,e),M.include(w.EvaluateSceneLighting,e),M.include(T.outputColorHighlightOID,e),A.include(N.SnowCover,e),A.code.add(S.glsl`
      float evaluateShadow() {
        return ${R?"readShadowMap(vPositionWorldCameraRelative, linearDepth)":"0.0"};
      }`),A.main.add(S.glsl`
      discardBySlice(vPositionWorldCameraRelative);
      discardByTerrainDepth();

      vec4 textureColor = readBaseColorTexture();
      discardOrAdjustAlpha(textureColor);

      /* When rendering the occluded overlay, we still need to read the base color texture
       * because we need to use the same discard logic. However after that to render only the
       * draped overlay, we simply set the base texture color to zero. */
      ${S.If(k,S.glsl`textureColor = vec4(0);`)}

      ${S.If(V,S.glsl`vec4 overlayColor = getOverlayColor(ovColorTex, vtcOverlay);`)}

      /* Early discard to only emit when we have overlay */
      ${S.If(V&&k,S.glsl`if (overlayColor.a < ${S.glsl.float($.alphaCutoff)}) { discard; }`)}

      vec4 externalColor;
      int externalColorMixMode;
      readExternalColor(externalColor, externalColorMixMode);

      vec4 materialColor = computeMaterialColor(textureColor, externalColor, externalColorMixMode);
    `),U?(b.addMainLightIntensity(A),z&&w.addLightingGlobalFactor(A),A.main.add(S.glsl`
        applyPBRFactors();
        ${S.If(1===W,S.glsl`if (externalColorMixMode == 3) {
              mrr = vec3(0.0, 0.6, 0.2);
            }`)}
        float additionalIrradiance = 0.02 * mainLightIntensity[2];
        ${S.If(B,"mat3 tangentSpace = computeTangentSpace(fragmentFaceNormal, vPositionWorldCameraRelative, vuv0);")}
        vec3 shadingNormal = ${B?"computeTextureNormal(tangentSpace, vuv0)":"fragmentShadingNormal"};
        vec3 groundNormal = ${z?S.glsl`normalize(positionWorld())`:S.glsl`vec3(0.0, 0.0, 1.0)`};

        vec3 viewDir = normalize(vPositionWorldCameraRelative);
        float ssao = 1.0 - occlusion * evaluateAmbientOcclusionInverse();
        ${S.If(F,S.glsl`float snow = getSnow(fragmentFaceNormal, normalize(positionWorld()));
                 materialColor.rgb = mix(materialColor.rgb, vec3(1.1), snow);
                 ssao = mix(ssao, 0.5 * ssao, snow);
                 shadingNormal = mix(shadingNormal, fragmentFaceNormal, snow);`)}
        ${S.If(V,"materialColor = materialColor * (1.0 - overlayColor.a) + overlayColor;")}

        vec3 additionalLight = evaluateAdditionalLighting(ssao, positionWorld());
        vec4 emission = ${G?"vec4(0.0)":"getEmissions(materialColor.rgb)"};
        ${S.If(z,"float additionalAmbientScale = additionalDirectedAmbientLight(positionWorld());")}
        ${z?S.glsl`float shadow = max(lightingGlobalFactor * (1.0 - additionalAmbientScale), evaluateShadow());`:"float shadow = evaluateShadow();"}
        vec4 shadedColor = vec4(evaluateSceneLightingPBR(shadingNormal, materialColor.rgb, shadow, ssao, additionalLight, viewDir, groundNormal, mrr, emission, additionalIrradiance), materialColor.a);
        `)):(b.addMainLightDirection(A),z&&w.addLightingGlobalFactor(A),K&&A.uniforms.add(new O.Texture2DBindUniform("ovNormalTex",e=>e.overlay?.getTexture(3))),A.main.add(S.glsl`
        ${S.If(z,"float additionalAmbientScale = additionalDirectedAmbientLight(positionWorld());")}
        float shadow = ${R?z?"max(lightingGlobalFactor * (1.0 - additionalAmbientScale), evaluateShadow())":"evaluateShadow()":z?"lightingGlobalFactor * (1.0 - additionalAmbientScale)":"0.0"};

        ${S.If(R&&!E,S.glsl`
            float dotFL = dot(fragmentFaceNormal, mainLightDirection);
            if( dotFL <= 0.0) shadow = 1.0;
        `)}
        ${S.If(F,S.glsl`float snow = getSnow(fragmentFaceNormal, normalize(positionWorld()));
               materialColor.rgb = mix(materialColor.rgb, vec3(1), snow);`)}

        // At global scale we create some additional ambient light based on the main light to simulate global illumination
        float ssao = evaluateAmbientOcclusion();
        vec3 additionalLight = evaluateAdditionalLighting(ssao, positionWorld());

        ${S.If(V,"materialColor = materialColor * (1.0 - overlayColor.a) + overlayColor;")}

        vec4 shadedColor = vec4(evaluateSceneLighting(fragmentShadingNormal, materialColor.rgb, shadow, ssao, additionalLight), materialColor.a);
        ${S.If(K,S.glsl`vec4 overlayWaterMask = getOverlayColor(ovNormalTex, vtcOverlay);
                 float waterNormalLength = length(overlayWaterMask);
                 if (waterNormalLength > 0.95) {
                   mat3 tbnMatrix = mat3(tbnTangent, tbnBiTangent, groundNormal);
                   vec4 waterColorLinear = getOverlayWaterColor(overlayWaterMask, overlayColor, -normalize(vPositionWorldCameraRelative), shadow, groundNormal, tbnMatrix, vPosition_view, positionWorld());
                   vec4 waterColorNonLinear = delinearizeGamma(vec4(waterColorLinear.xyz, 1.0));
                   // un-gamma the ground color to mix in linear space
                   shadedColor = mix(shadedColor, waterColorNonLinear, waterColorLinear.w);
                 }`)}
      `)),A.main.add(`outputColorHighlightOID(shadedColor, vPositionWorldCameraRelative, materialColor.rgb ${S.If(F,", snow")});`),M;const Y=3===P,Z=9===P,ee=8===P,ae=q||7===P;return ae&&M.include(g.OutputDepth,e),Y&&M.include(h.computeFragmentNormals,e),V&&M.include(u.OutputHighlightOverlay,e),M.include(c.OutputHighlight,e),A.main.add(S.glsl`
    discardBySlice(vPositionWorldCameraRelative);

    vec4 textureColor = readBaseColorTexture();
    discardOrAdjustAlpha(textureColor);

    ${S.If(ae,"outputDepth(linearDepth);")}
    ${S.If(Y,S.glsl`fragColor = vec4(vec3(0.5) + 0.5 * fragmentFaceNormalView, 1.0);`)}
    ${S.If(Z,V?"fragColor = getOverlayColorTexel();":"outputObjectAndLayerIdColor();")}
    ${S.If(ee,S.If(V,S.glsl`calculateOcclusionAndOutputHighlight(getAllOverlayHighlightValuesEncoded());`,S.glsl`calculateOcclusionAndOutputHighlight();`))}`),M}const D=Object.freeze(Object.defineProperty({__proto__:null,build:M},Symbol.toStringTag,{value:"Module"}));e.ComponentShader=D,e.build=M});