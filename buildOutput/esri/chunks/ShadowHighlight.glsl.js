// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","./vec32","../core/libs/gl-matrix-2/factories/vec3f64","../views/3d/webgl-engine/core/shaderLibrary/NormalFromDepth.glsl","../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/calculateUVZShadowFromDepth.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/ShadowmapFiltering.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/RgbaFloatEncoding.glsl","../views/3d/webgl-engine/core/shaderModules/Float3BindUniform","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DBindUniform","../views/3d/webgl-engine/core/shaderModules/Texture2DShadowBindUniform","../views/3d/webgl-engine/core/shaderModules/Texture2DUintPassUniform","../views/webgl/ShaderBuilder"],function(e,i,a,o,r,t,l,n,h,d,g,s,c,u,w,m){"use strict";function p(){const e=new m.ShaderBuilder;e.include(t.calculateUVZShadowFromDepthPass),e.include(l.ShadowmapFiltering),e.include(r.ScreenSpacePass),e.include(o.NormalFromDepth);const a=e.fragment;return a.include(n.RgbaFloatEncoding),a.uniforms.add(new u.Texture2DShadowBindUniform("shadowMapExcludingHighlight",e=>e.shadowMap.getSnapshot(1)),new u.Texture2DShadowBindUniform("shadowMapHighlight",e=>e.shadowMap.getSnapshot(0)),new c.Texture2DBindUniform("depthMap",e=>e.depth?.attachment),new w.Texture2DUintPassUniform("highlightTexture",e=>e.highlightTexture),new d.Float4PassUniform("uColor",e=>e.shadowColor),new g.FloatPassUniform("opacity",e=>e.shadowOpacity),new g.FloatPassUniform("occludedOpacity",e=>e.occludedShadowOpacity),new g.FloatPassUniform("terminationFactor",e=>e.opacityElevation*e.dayNightTerminator),new h.Float3BindUniform("lightingMainDirectionView",({lighting:e,camera:a})=>i.normalize(f,i.transformMat4(f,e.mainLight.direction,a.viewInverseTransposeMatrix)))),a.main.add(s.glsl`
    ivec2 highlightTextureSize = textureSize(highlightTexture, 0);
    ivec2 highlightIUV = ivec2(uv * vec2(highlightTextureSize));
    uvec2 highlightInfo = texelFetch(highlightTexture, highlightIUV, 0).rg;

    fragColor = vec4(0.0);

    // Calculate bit mask to check if pixel is highlit unoccluded at any level
    uint ored = (highlightInfo.r << 0) | (highlightInfo.g << 8);

    bool visiblyHighlighted = ((ored & ~(ored >> 1)) & (1u+4u+16u+64u)) != 0u;
    if (visiblyHighlighted) {
      return;
    }

    vec4 currentPixelPos;
    vec3 uvzShadow = calculateUVZShadowAndPixelPosFromDepth(uv, textureSize(shadowMapHighlight,0), depthMap, currentPixelPos);
    if (uvzShadow.z < 0.0) {
      return;
    }

    float shadowHighlightFactor = readShadowMapUVZ(uvzShadow, shadowMapHighlight);
    if (shadowHighlightFactor == 0.0) {
      return;
    }

    float shadowExcludingHighlightFactor = readShadowMapUVZ(uvzShadow, shadowMapExcludingHighlight);

    vec3 normal = normalFromDepth(depthMap, currentPixelPos.xyz, gl_FragCoord.xy, uv);
    bool shaded = dot(normal, lightingMainDirectionView) < ${s.glsl.float(.025)};

    float occludedFactor = max(shadowExcludingHighlightFactor, shaded ? 1.0 : 0.0);
    float fragOpacity = mix(opacity, occludedOpacity, occludedFactor);
    fragColor = vec4(uColor.rgb, uColor.a * fragOpacity * terminationFactor);
  `),e}const f=a.create(),v=Object.freeze(Object.defineProperty({__proto__:null,build:p},Symbol.toStringTag,{value:"Module"}));e.ShadowHighlight=v,e.build=p});