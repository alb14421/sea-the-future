// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../core/mathUtils","../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/Gamma.glsl","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/3d/webgl-engine/effects/bloom/BloomPresets.glsl","../views/webgl/NoParameters","../views/webgl/ShaderBuilder"],function(e,s,r,l,o,t,i,a,n,u){"use strict";class c extends n.NoParameters{constructor(){super(...arguments),this.blurRadius=a.blurRadiusPresets.sunny}}function d(e){const a=new u.ShaderBuilder,n=a.fragment;a.include(r.ScreenSpacePass),n.include(l.Gamma),n.uniforms.add(new i.Texture2DPassUniform("colorTexture",e=>e.color),new o.FloatPassUniform("blurRadius",e=>e.blurRadius));let c="";for(let e=0;e<15;e++)c+=`locations1D[${e}] = ${(e/14*2-1).toFixed(3).toString()};`;let d="";for(let e=0;e<15;e++)d+=`locations1DWeights[${e}] = ${s.gauss(e-Math.floor(7.5),2).toFixed(7).toString()};`;const g=0===e.bloomStage;return n.code.add(t.glsl`
    float locations1D[${t.glsl.int(15)}];
    float locations1DWeights[${t.glsl.int(15)}];

    vec4 blurUniformSamples(sampler2D toBlur) {
      vec4 res = vec4(0.0);
      vec2 size = vec2(textureSize(toBlur, 0));
      vec2 aspectCorrection = vec2(1.0, size.x / size.y);
      vec2 uvInPixel = uv * size;

      ${c}
      ${d}
      vec2 pixelCenterShift = 0.5 / size;

      for(int i=0;i < ${t.glsl.int(15)}; i++) {
        float uv1D = locations1D[i] + ${g?"pixelCenterShift.x":"pixelCenterShift.y"};
        vec2 uvOffset = ${g?"vec2(uv1D, 0.0)":"vec2(0.0, uv1D)"};

        vec2 uvDistorted = uv + uvOffset * blurRadius * aspectCorrection;
        vec4 sampleColor = texture(toBlur, uvDistorted);
        res += sampleColor * locations1DWeights[i];
      }
      res.a = clamp(res.a, 0.0, 1.0);
      return res;
    }
  `).main.add(t.glsl`fragColor = blurUniformSamples(colorTexture);`),a}const g=Object.freeze(Object.defineProperty({__proto__:null,BloomBlurPassParameters:c,build:d},Symbol.toStringTag,{value:"Module"}));e.BloomBlur=g,e.BloomBlurPassParameters=c,e.build=d});