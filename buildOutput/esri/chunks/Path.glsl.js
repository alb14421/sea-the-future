// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/ForwardLinearDepthToWriteShadowMap.glsl","../views/3d/webgl-engine/core/shaderLibrary/ShaderOutput","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/ObjectAndLayerIdColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/PathVertexPosition.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/OutputDepth.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlight.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateAmbientOcclusion.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateSceneLighting.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/MainLighting.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/Normals.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/NormalUtils.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/PhysicallyBasedRenderingParameters.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/ReadShadowMap.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/TerrainDepthTest.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/Float3PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/effects/weather/SnowCover.glsl","../views/3d/webgl-engine/shaders/OutputColorHighlightOID.glsl","../views/webgl/ShaderBuilder"],function(e,a,i,o,r,l,n,s,d,t,c,g,m,v,w,h,u,b,p,f,y,P,L,S,O){"use strict";function C(e){const C=new O.ShaderBuilder,{vertex:D,fragment:I,varyings:A}=C;p.addProjViewLocalOrigin(D,e),A.add("vpos","vec3",{invariant:!0}),C.include(n.PathVertexPosition,e);const{output:F,spherical:B,pbrMode:T,hasBloom:j,snowCover:M}=e;switch((i.isColorOrColorEmission(F)||9===F)&&(C.include(r.Transform,e),C.include(h.ReadShadowMapDraw,e),C.include(l.ObjectAndLayerIdColor,e),C.include(u.terrainDepthTest,e),A.add("vnormal","vec3"),A.add("vcolor","vec4"),D.main.add(P.glsl`vpos = calculateVPos();
vnormal = normalize(localNormal());
forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
gl_Position = transformPosition(proj, view, vpos);
forwardObjectAndLayerIdColor();
vcolor = getColor();
forwardLinearDepthToReadShadowMap();`)),F){case 1:case 0:C.include(w.PhysicallyBasedRenderingParameters,e),C.include(c.EvaluateSceneLighting,e),I.include(t.EvaluateAmbientOcclusion,e),C.include(m.Normals,e),I.include(o.SliceDraw,e),C.include(S.outputColorHighlightOID,e),p.addCameraPosition(I,e),c.addAmbientBoostFactor(I),c.addLightingGlobalFactor(I),I.uniforms.add(D.uniforms.get("localOrigin"),new f.Float3PassUniform("ambient",e=>e.ambient),new f.Float3PassUniform("diffuse",e=>e.diffuse),new y.FloatPassUniform("opacity",e=>e.opacity)),I.include(b.ColorConversion),I.include(L.SnowCover,e),g.addMainLightIntensity(I),I.main.add(P.glsl`
        discardBySlice(vpos);
        discardByTerrainDepth();

        shadingParams.viewDirection = normalize(vpos - cameraPosition);
        shadingParams.normalView = vnormal;
        vec3 normal = shadingNormal(shadingParams);
        float ssao = evaluateAmbientOcclusionInverse();

        vec3 posWorld = vpos + localOrigin;
        vec3 normalGround = ${B?"normalize(posWorld);":"vec3(0.0, 0.0, 1.0);"}

        vec3 albedo = vcolor.rgb * max(ambient, diffuse); // combine the old material parameters into a single one
        float combinedOpacity = vcolor.a * opacity;

        ${P.If(M,P.glsl`float snow = getSnow(normal, normalGround);
                 albedo = mix(albedo, vec3(1), snow);
                 ssao = mix(ssao, 1.0, snow);`)}

        float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
        vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
        float shadow = readShadow(additionalAmbientScale, vpos);

        ${P.If(2===T,`float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];\n           vec4 emission = ${j?"vec4(0.0)":"getEmissions(albedo)"};\n           ${P.If(M,"mrr = applySnowToMRR(mrr, snow);\n              emission = snowCoverForEmissions(emission, snow);")}`)}

        vec3 shadedColor = ${2===T?"evaluateSceneLightingPBR(normal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);":"evaluateSceneLighting(normal, albedo, shadow, 1.0 - ssao, additionalLight);"}
        vec4 finalColor = vec4(shadedColor, combinedOpacity);
        outputColorHighlightOID(finalColor, vpos, albedo ${P.If(M,", snow")});`);break;case 2:C.include(r.Transform,e),D.main.add(P.glsl`vpos = calculateVPos();
gl_Position = transformPosition(proj, view, vpos);`),C.fragment.include(o.SliceDraw,e),I.main.add(P.glsl`discardBySlice(vpos);`);break;case 4:case 5:case 6:case 7:C.include(r.Transform,e),a.addNearFar(C),A.add("depth","float"),D.main.add(P.glsl`vpos = calculateVPos();
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);`),C.fragment.include(o.SliceDraw,e),C.include(s.OutputDepth,e),I.main.add(P.glsl`discardBySlice(vpos);
outputDepth(depth);`);break;case 9:C.fragment.include(o.SliceDraw,e),I.main.add(P.glsl`discardBySlice(vpos);
outputObjectAndLayerIdColor();`);break;case 3:C.include(r.Transform,e),C.include(v.NormalUtils,e),p.addViewNormal(D),A.add("vnormal","vec3"),D.main.add(P.glsl`vpos = calculateVPos();
vnormal = normalize((viewNormal * vec4(localNormal(), 1.0)).xyz);
gl_Position = transformPosition(proj, view, vpos);`),C.fragment.include(o.SliceDraw,e),I.main.add(P.glsl`discardBySlice(vpos);
vec3 normal = normalize(vnormal);
if (gl_FrontFacing == false) normal = -normal;
fragColor = vec4(vec3(0.5) + 0.5 * normal, 1.0);`);break;case 8:C.include(r.Transform,e),C.include(v.NormalUtils,e),A.add("vnormal","vec3"),D.main.add(P.glsl`vpos = calculateVPos();
gl_Position = transformPosition(proj, view, vpos);`),C.fragment.include(o.SliceDraw,e),C.include(d.OutputHighlight,e),I.main.add(P.glsl`discardBySlice(vpos);
calculateOcclusionAndOutputHighlight();`)}return C}const D=Object.freeze(Object.defineProperty({__proto__:null,build:C},Symbol.toStringTag,{value:"Module"}));e.Path=D,e.build=C});