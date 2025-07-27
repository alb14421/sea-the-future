// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/ReadDepth.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/Gamma.glsl","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/FloatsPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/IntegerPassUniform","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/3d/webgl-engine/effects/bloom/BloomPresets.glsl","../views/3d/webgl-engine/shaders/ToneMapping.glsl","../views/webgl/NoParameters","../views/webgl/ShaderBuilder"],function(e,o,s,r,l,t,n,i,a,d,m,u,c){"use strict";class b extends u.NoParameters{constructor(e=d.defaultExposure,o=d.lodFactorsPresets.sunny.far,s=d.lodFactorsPresets.sunny.near){super(),this.exposure=e,this.lodFactors=o,this.lodFactorsFront=s}}const g=new b;class x extends b{constructor(){super(...arguments),this.bloomLod=-1}}function w(){const e=new c.ShaderBuilder,d=e.fragment;return e.include(o.ScreenSpacePass),d.include(r.Gamma),d.include(s.ReadDepth),d.include(m.ToneMapping),d.uniforms.add(new a.Texture2DPassUniform("colorTexture",e=>e.color),new a.Texture2DPassUniform("emissionTexture",e=>e.emission),new a.Texture2DPassUniform("bloomTexture0",e=>e.bloomTexture0),new a.Texture2DPassUniform("bloomTexture1",e=>e.bloomTexture1),new a.Texture2DPassUniform("bloomTexture2",e=>e.bloomTexture2),new a.Texture2DPassUniform("bloomTexture3",e=>e.bloomTexture3),new a.Texture2DPassUniform("bloomTexture4",e=>e.bloomTexture4),new l.FloatPassUniform("exposure",e=>e.exposure),new i.IntegerPassUniform("bloomLod",e=>e.bloomLod),new t.FloatsPassUniform("lodFactors",e=>e.lodFactors,6),new t.FloatsPassUniform("lodFactorsFront",e=>e.lodFactorsFront,6)).main.add(n.glsl`vec4 color = texture(colorTexture, uv);
color = vec4(linearizeGamma(color.rgb), color.a);
vec4 lod0 = texture(emissionTexture, uv);
vec4 lod1 = texture(bloomTexture0, uv);
vec4 lod2 = texture(bloomTexture1, uv);
vec4 lod3 = texture(bloomTexture2, uv);
vec4 lod4 = texture(bloomTexture3, uv);
vec4 lod5 = texture(bloomTexture4, uv);
vec4 emission = lodFactors[0] * lod0;
emission += lodFactors[1] * lod1;
emission += lodFactors[2] * lod2;
emission += lodFactors[3] * lod3;
emission += lodFactors[4] * lod4;
emission += lodFactors[5] * lod5;
emission = bloomLod == 0 ? lodFactors[0] * lod0 : bloomLod == 1 ? lodFactors[1] * lod1 : bloomLod == 2 ? lodFactors[2] * lod2 : bloomLod == 3 ? lodFactors[3] * lod3 : bloomLod == 4 ? lodFactors[4] * lod4 : bloomLod == 5 ? lodFactors[5] * lod5 : emission;
emission = vec4(tonemapACES(emission.rgb), emission.a);
fragColor = emission + color;
fragColor = delinearizeGamma(fragColor);`),e}const f=Object.freeze(Object.defineProperty({__proto__:null,BloomCompositionPassParameters:x,build:w,defaultCompositionParameters:g},Symbol.toStringTag,{value:"Module"}));e.BloomComposition=f,e.BloomCompositionPassParameters=x,e.build=w,e.defaultCompositionParameters=g});