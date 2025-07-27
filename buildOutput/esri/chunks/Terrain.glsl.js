// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../core/libs/gl-matrix-2/math/mat4","../core/libs/gl-matrix-2/factories/mat4f64","./vec32","../core/libs/gl-matrix-2/factories/vec3f64","../views/3d/webgl-engine/core/shaderLibrary/ForwardLinearDepth.glsl","../views/3d/webgl-engine/core/shaderLibrary/ForwardLinearDepthToWriteShadowMap.glsl","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/NormalAttribute.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/TextureCoordinateAttribute.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexTangent.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/OutputDepth.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlight.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlightOverlay","../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateAmbientOcclusion.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/EvaluateSceneLighting.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/MainLighting.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/NormalUtils.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/ReadShadowMap.glsl","../views/3d/webgl-engine/core/shaderLibrary/terrain/Overlay.glsl","../views/3d/webgl-engine/core/shaderLibrary/terrain/TerrainTexture.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/Float3BindUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Matrix4DrawUniform","../views/3d/webgl-engine/core/shaderModules/Texture2DBindUniform","../views/webgl/ShaderBuilder","../webscene/support/AlphaCutoff"],function(e,a,r,o,i,l,t,n,s,d,c,g,v,m,u,p,f,w,h,b,C,y,O,x,L,T,S,z,P){"use strict";class M extends y.OverlayTerrainPassParameters{}function $(e){const r=new z.ShaderBuilder,{attributes:i,vertex:M,fragment:$,varyings:I}=r;i.add("position","vec3"),r.include(d.NormalAttribute,e),r.include(c.TextureCoordinateAttribute,e);const A=()=>{r.include(h.NormalUtils,e),M.code.add(L.glsl`vec3 getNormal() {
float z = 1.0 - abs(normalCompressed.x) - abs(normalCompressed.y);
vec3 n = vec3(normalCompressed + vec2(normalCompressed.x >= 0.0 ? 1.0 : -1.0,
normalCompressed.y >= 0.0 ? 1.0 : -1.0) * min(z, 0.0), z);
return normalize(n);
}`)};O.addProjViewLocalOrigin(M,e),r.include(s.Transform,e);const{output:F,pbrMode:V,overlayMode:U,tileBorders:B,spherical:_,transparencyMode:j,screenSizePerspective:W,overlayEnabled:k}=e,E=2===j||3===j,H=k&&E;switch(F){case 1:case 0:{r.include(y.TerrainTexture,e),r.include(f.EvaluateSceneLighting,e),k&&(e.pbrMode=5===V?6:3,r.include(C.OverlayTerrain,e),e.pbrMode=V);const i=2===U;i&&r.include(g.VertexTangent,e),I.add("vnormal","vec3"),I.add("vpos","vec3",{invariant:!0}),I.add("vup","vec3"),A(),W&&O.addViewNormal(M),W&&(I.add("screenSizeDistanceToCamera","float"),I.add("screenSizeCosAngle","float")),M.main.add(L.glsl`
          vpos = position;
          vec3 positionWorld = position + localOrigin;
          gl_Position = transformPosition(proj, view, vpos);
          vnormal = getNormal();
          vup = getLocalUp(position, localOrigin);
          ${L.If(i,L.glsl`forwardVertexTangent(vnormal);`)}

          forwardTextureCoordinatesWithTransform(uv0);
          ${L.If(k,"setOverlayVTC(uv0);")}
          ${L.If(B,"forwardTextureCoordinates();")}
          ${L.If(W,L.glsl`vec3 viewPos = (view * vec4(vpos, 1.0)).xyz;
                 screenSizeDistanceToCamera = length(viewPos);
                 vec3 viewSpaceNormal = (viewNormal * vec4(normalize(positionWorld), 1.0)).xyz;
                 screenSizeCosAngle = abs(viewSpaceNormal.z);`)}
          forwardLinearDepthToReadShadowMap();`),r.include(b.ReadShadowMapDraw,e),$.include(n.SliceDraw,e),r.include(f.EvaluateSceneLighting,e),$.include(p.EvaluateAmbientOcclusion,e),O.addCameraPosition($,e),f.addAmbientBoostFactor($),f.addLightingGlobalFactor($),$.uniforms.add(M.uniforms.get("localOrigin"),new x.Float3BindUniform("viewDirection",({camera:e})=>o.normalize(D,o.set(D,e.viewMatrix[12],e.viewMatrix[13],e.viewMatrix[14])))),i&&$.uniforms.add(new S.Texture2DBindUniform("ovWaterTex",e=>e.overlay?.getTexture(3)),new T.Matrix4DrawUniform("view",({origin:e},{camera:r})=>a.translate(N,r.viewMatrix,e)));const l=.2;$.code.add(L.glsl`float lum(vec3 c) {
return (min(min(c.r, c.g), c.b) + max(max(c.r, c.g), c.b)) * 0.5;
}`),w.addMainLightDirection($),w.addMainLightIntensity($),$.main.add(L.glsl`
          vec3 normal = normalize(vnormal);
          float vndl = dot(normal, mainLightDirection);

          float additionalAmbientScale = smoothstep(0.0, 1.0, clamp(vndl*2.5, 0.0, 1.0));
          float shadow = readShadow(additionalAmbientScale, vpos);
          float ssao = evaluateAmbientOcclusionInverse();
          vec4 tileColor = getTileColor();

          ${L.If(k,L.glsl`vec4 overlayColorOpaque = getOverlayColor(ovColorTex, vtcOverlay);
                   vec4 overlayColor = overlayOpacity * overlayColorOpaque;
                   ${L.If(E,`if (overlayColor.a < ${L.glsl.float(P.alphaCutoff)}) { discard; }`)}
                   vec4 groundColor = tileColor;
                   tileColor = tileColor * (1.0 - overlayColor.a) + overlayColor;`)}

          // If combined alpha is 0 we can discard pixel. The performance impact by having a discard here
          // is neglectable because terrain typically renders first into the framebuffer.
          if(tileColor.a < ${L.glsl.float(P.alphaCutoff)}) {
            discard;
          }

          bool sliced = rejectBySlice(vpos);
          if (sliced) {
            tileColor *= ${L.glsl.float(l)};
          }

          vec3 albedo = tileColor.rgb;

          // heuristic shading function used in the old terrain, now used to add ambient lighting

          vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

          ${5===V||6===V?L.glsl`fragColor = vec4(evaluatePBRSimplifiedLighting(normal, albedo, shadow, 1.0 - ssao, additionalLight, normalize(vpos - cameraPosition), vup), tileColor.a);`:L.glsl`fragColor = vec4(evaluateSceneLighting(normal, albedo, shadow, 1.0 - ssao, additionalLight), tileColor.a);`}
          ${L.If(i,L.glsl`vec4 overlayWaterMask = getOverlayColor(ovWaterTex, vtcOverlay);
                   float waterNormalLength = length(overlayWaterMask);
                   if (waterNormalLength > 0.95) {
                     mat3 tbnMatrix = mat3(tbnTangent, tbnBiTangent, vnormal);
                     vec4 waterOverlayColor = vec4(overlayColor.w > 0.0 ? overlayColorOpaque.xyz/overlayColor.w : vec3(1.0), overlayColor.w);
                     vec4 viewPosition = view*vec4(vpos, 1.0);
                     vec4 waterColorLinear = getOverlayWaterColor(overlayWaterMask, waterOverlayColor, -normalize(vpos - cameraPosition), shadow, vnormal, tbnMatrix, viewPosition.xyz,  vpos + localOrigin);
                     vec4 waterColorNonLinear = delinearizeGamma(vec4(waterColorLinear.xyz, 1.0));
                     float opacity = sliced ? ${L.glsl.float(l)} : 1.0;
                     // un-gamma the ground color to mix in linear space
                     fragColor = mix(groundColor, waterColorNonLinear, waterColorLinear.w) * opacity;
                   }`)}
          ${L.If(W,L.glsl`float perspectiveScale = screenSizePerspectiveScaleFloat(1.0, screenSizeCosAngle, screenSizeDistanceToCamera, vec4(0.0));
                   if (perspectiveScale <= 0.25) {
                     fragColor = mix(fragColor, vec4(1.0, 0.0, 0.0, 1.0), perspectiveScale * 4.0);
                   } else if (perspectiveScale <= 0.5) {
                     fragColor = mix(fragColor, vec4(0.0, 0.0, 1.0, 1.0), (perspectiveScale - 0.25) * 4.0);
                   } else if (perspectiveScale >= 0.99) {
                     fragColor = mix(fragColor, vec4(0.0, 1.0, 0.0, 1.0), 0.2);
                   } else {
                     fragColor = mix(fragColor, vec4(1.0, 0.0, 1.0, 1.0), (perspectiveScale - 0.5) * 2.0);
                   }`)}
          ${L.If(e.visualizeNormals,_?L.glsl`
                  vec3 localUp = normalize(vpos + localOrigin);
                  vec3 right = normalize(cross(vec3(0.0, 0.0, 1.0), localUp));
                  vec3 forward = normalize(cross(localUp, right));
                  mat3 tbn = mat3(right, forward, localUp);
                  vec3 tNormal = normalize(normal * tbn);
                  fragColor = vec4(vec3(0.5) + 0.5 * tNormal, 0.0);`:L.glsl`
                  vec3 tNormal = normalize(normal);
                  fragColor = vec4(vec3(0.5) + 0.5 * tNormal, 0.0);`)}
          ${L.If(B,L.glsl`vec2 dVuv = fwidth(vuv0);
                 vec2 edgeFactors = smoothstep(vec2(0.0), 1.5 * dVuv, min(vuv0, 1.0 - vuv0));
                 float edgeFactor = 1.0 - min(edgeFactors.x, edgeFactors.y);
                 fragColor = mix(fragColor, vec4(1.0, 0.0, 0.0, 1.0), edgeFactor);`)}
          fragColor = applySlice(fragColor, vpos);`)}break;case 2:H&&r.include(C.OverlayTerrain,e),M.main.add(L.glsl`
        ${L.If(H,"setOverlayVTC(uv0);")}
        gl_Position = transformPosition(proj, view, position);`),$.main.add(`${L.If(H,`if (getCombinedOverlayColor().a < ${L.glsl.float(P.alphaCutoff)}) discard;`)}`);break;case 4:case 5:case 6:case 7:r.include(v.OutputDepth,e),l.addLinearDepth(r),t.addNearFar(r),M.main.add(L.glsl`gl_Position = transformPositionWithDepth(proj, view, position, nearFar, linearDepth);`),$.main.add(L.glsl`outputDepth(linearDepth);`);break;case 3:H&&r.include(C.OverlayTerrain,e),I.add("vnormal","vec3"),O.addViewNormal(M),A(),M.main.add(L.glsl`
        ${L.If(H,"setOverlayVTC(uv0);")}
        gl_Position = transformPosition(proj, view, position);
        vnormal = normalize((viewNormal * vec4(getNormal(), 1.0)).xyz);`),$.main.add(L.glsl`
        ${L.If(H,`if (getCombinedOverlayColor().a < ${L.glsl.float(P.alphaCutoff)}) discard;`)}
        vec3 normal = normalize(vnormal);
        if (gl_FrontFacing == false) {
          normal = -normal;
        }
        fragColor = vec4(vec3(0.5) + 0.5 * normal, 1.0);`);break;case 8:k&&(r.include(C.OverlayTerrain,e),r.include(u.OutputHighlightOverlay,e)),M.main.add(L.glsl`
        ${L.If(k,"setOverlayVTC(uv0);")}
        gl_Position = transformPosition(proj, view, position);`),r.include(m.OutputHighlight,e),$.main.add(L.glsl`
        ${L.If(k,L.glsl`
           calculateOcclusionAndOutputHighlight(getAllOverlayHighlightValuesEncoded());`,"calculateOcclusionAndOutputHighlight();")}
      `)}if(9===F)if(k)e.pbrMode=0,r.include(C.OverlayTerrain,e),e.pbrMode=V,M.main.add(L.glsl`gl_Position = transformPosition(proj, view, position);
setOverlayVTC(uv0);`),$.main.add(L.glsl`fragColor = getOverlayColorTexel();`);else{const e=0===j;M.main.add(L.glsl`${L.If(e,"gl_Position = transformPosition(proj, view, position);")}`),$.main.add(L.glsl`fragColor = vec4(0.0);`)}return r}const N=r.create(),D=i.create(),I=Object.freeze(Object.defineProperty({__proto__:null,TerrainPassParameters:M,build:$},Symbol.toStringTag,{value:"Module"}));e.Terrain=I,e.TerrainPassParameters=M,e.build=$});