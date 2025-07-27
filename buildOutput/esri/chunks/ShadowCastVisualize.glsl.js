// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../core/libs/gl-matrix-2/factories/vec2f64","../core/libs/gl-matrix-2/factories/vec4f64","../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/BlendColorsPremultiplied.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/CameraSpace.glsl","../views/3d/webgl-engine/core/shaderModules/Float2PassUniform","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","./ShadowCastAccumulate.glsl","../views/webgl/NoParameters","../views/webgl/ShaderBuilder"],function(e,a,o,s,t,r,l,n,i,d,h,c,u,m){"use strict";class g extends u.NoParameters{constructor(e){super(),this._data=e,this.sampleScale=a.create(),this.opacityFromElevation=1,this.gradientColor=o.clone(w),this.thresholdColor=o.clone(f),this.bandedGradientColor=o.clone(S),this.bandSize=.1,this.threshold=.5}get shadowCastMap(){return this._data.shadowCastTexture}}const p=50/255,w=o.fromValues(0,0,1,.7),f=o.fromValues(1,0,0,.7),S=o.fromValues(p,p,p,.7);function b(e){const a=new m.ShaderBuilder,o=a.fragment;a.include(r.CameraSpace),a.include(s.ScreenSpacePass);const{visualization:u}=e;o.constants.add("inverseSampleValue","float",c.ShadowCastMaxSamples),o.uniforms.add(new h.Texture2DPassUniform("shadowCastMap",e=>e.shadowCastMap),new l.Float2PassUniform("sampleScale",e=>e.sampleScale),new i.FloatPassUniform("opacityFromElevation",e=>e.opacityFromElevation));const g=2===u,p=3===u,w=1===u;switch(p&&o.include(t.BlendColorsPremultiplied),u){case 0:o.uniforms.add(new n.Float4PassUniform("uColor",e=>t.premultiplyAlpha(C,e.gradientColor)));break;case 1:o.uniforms.add(new n.Float4PassUniform("uColor",e=>t.premultiplyAlpha(C,e.bandedGradientColor)),new i.FloatPassUniform("bandSize",e=>e.bandSize));break;case 3:o.uniforms.add(new n.Float4PassUniform("uColor",e=>t.premultiplyAlpha(C,e.thresholdColor)),new n.Float4PassUniform("gradientColor",e=>t.premultiplyAlpha(C,e.gradientColor)),new i.FloatPassUniform("threshold",e=>e.threshold));break;case 2:o.uniforms.add(new n.Float4PassUniform("uColor",e=>t.premultiplyAlpha(C,e.thresholdColor)),new i.FloatPassUniform("threshold",e=>e.threshold))}const{type:f,selector:S,thresholdStrengthSelector:b}=p?{type:"vec2",selector:"rg",thresholdStrengthSelector:"strength.x"}:{type:"float",selector:"r",thresholdStrengthSelector:"strength"};return o.main.add(d.glsl`
    ${f} numSamples = texture(shadowCastMap, uv).${S} * inverseSampleValue;

    fragColor = vec4(0.0);

    // early out if we do not have any samples in one or more channels
    if (dot(numSamples, ${f}(1)) < 1.0) {
      return;
    }

    // sampleScale is the number of total samples taken, so this brings strength to a 0-1 range.
    // note that sampleScale is always a vec2 even if we have only the primary channel.
    ${f} strength = numSamples * sampleScale.${S};

    // in threshold mode, step the strength to 0 if we are at or below the threshold, 1 otherwise.
    ${d.If(g||p,d.glsl`
      ${b} = 1.0 - step(${b}, threshold);
    `)}

    // bail out if we are below the threshold
    ${d.If(g,d.glsl`if (${b} == 0.0) { return; }`)}

    ${d.If(w,d.glsl`strength = ceil(strength / bandSize) * bandSize;`)}

    ${f} attenuation = opacityFromElevation * strength;

    // in ThresholdAndGradient mode we blend the threshold color on top of the gradient color
    fragColor = ${d.If(p,d.glsl`blendColorsPremultiplied(uColor * attenuation.r, gradientColor * attenuation.g)`,d.glsl`uColor * attenuation`)};
  `),a}const C=o.create(),v=Object.freeze(Object.defineProperty({__proto__:null,ShadowCastVisualizePassParameters:g,build:b},Symbol.toStringTag,{value:"Module"}));e.ShadowCastVisualize=v,e.ShadowCastVisualizePassParameters=g,e.build=b});