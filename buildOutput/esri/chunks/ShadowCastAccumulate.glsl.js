// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/calculateUVZShadowFromDepth.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/ShadowmapFiltering.glsl","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DBindUniform","../views/3d/webgl-engine/core/shaderModules/Texture2DShadowBindUniform","../views/webgl/ShaderBuilder"],function(e,a,d,o,s,t,n,l){"use strict";const r=1/255;function i(e){const i=new l.ShaderBuilder,{fragment:u}=i;i.include(a.ScreenSpacePass),i.include(d.calculateUVZShadowFromDepthPass),i.include(o.ShadowmapFiltering),u.uniforms.add(new n.Texture2DShadowBindUniform("shadowMap",e=>e.shadowMap.depthTexture),new t.Texture2DBindUniform("depthMap",e=>e.depth?.attachment)),u.constants.add("sampleValue","float",r);const h=1===e.index?"vec2":"float";return i.outputs.add("sampleCount",h),u.main.add(s.glsl`
    sampleCount = ${h}(0.0);

    vec3 uvzShadow = calculateUVZShadowFromDepth(uv, textureSize(shadowMap,0), depthMap);
    if (uvzShadow.z < 0.0) {
      return;
    }

    // The shadow map sampler returns a value between 0 and 1, we take the midpoint as we count discrete samples
    bool shadow = readShadowMapUVZ(uvzShadow, shadowMap) > 0.5;

    if (shadow) {
      sampleCount = ${h}(sampleValue); // Add 1 to the sample count
    }
  `),i}const u=Object.freeze(Object.defineProperty({__proto__:null,ShadowCastMaxSamples:255,build:i},Symbol.toStringTag,{value:"Module"}));e.ShadowCastAccumulate=u,e.ShadowCastMaxSamples=255,e.build=i});