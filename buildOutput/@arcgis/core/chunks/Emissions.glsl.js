/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{q as e}from"../core/lang.js";import{g as s,I as t}from"./glsl.js";import{d as r}from"./colorUtils.js";import"../core/Error.js";import"./Logger.js";function o(e){return 4===e||5===e||6===e||7===e}function i(e){return f(e)||3===e}function a(e){return 8===e||9===e}function n(e){return c(e)||a(e)}function c(e){return 0===e}function u(e){return c(e)||g(e)}function v(e){return c(e)||9===e}function m(e){return u(e)||9===e}function d(e){return function(e){return c(e)||8===e}(e)||x(e)}function l(e){return u(e)||a(e)}function f(e){return l(e)||x(e)}function x(e){return 2===e}function g(e){return 1===e}function p(e){switch(e){case 2:case 4:case 5:case 6:case 7:return!0}return!1}function b(t,r){switch(r.textureCoordinateType){case 1:return t.attributes.add("uv0","vec2"),t.varyings.add("vuv0","vec2"),void t.vertex.code.add(s`void forwardTextureCoordinates() { vuv0 = uv0; }`);case 2:return t.attributes.add("uv0","vec2"),t.attributes.add("uvRegion","vec4"),t.varyings.add("vuv0","vec2"),t.varyings.add("vuvRegion","vec4"),void t.vertex.code.add(s`void forwardTextureCoordinates() {
vuv0 = uv0;
vuvRegion = uvRegion;
}`);default:e(r.textureCoordinateType);case 0:return void t.vertex.code.add(s`void forwardTextureCoordinates() {}`);case 3:return}}function y(e){e.fragment.code.add(s`vec4 textureAtlasLookup(sampler2D tex, vec2 textureCoordinates, vec4 atlasRegion) {
vec2 atlasScale = atlasRegion.zw - atlasRegion.xy;
vec2 uvAtlas = fract(textureCoordinates) * atlasScale + atlasRegion.xy;
float maxdUV = 0.125;
vec2 dUVdx = clamp(dFdx(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
vec2 dUVdy = clamp(dFdy(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
return textureGrad(tex, uvAtlas, dUVdx, dUVdy);
}`)}function h(e,t){const{textureCoordinateType:r}=t;if(0===r||3===r)return;e.include(b,t);const o=2===r;o&&e.include(y),e.fragment.code.add(s`
    vec4 textureLookup(sampler2D tex, vec2 uv) {
      return ${o?"textureAtlasLookup(tex, uv, vuvRegion)":"texture(tex, uv)"};
    }
  `)}function C(e){e.code.add(s`
    const float GAMMA = ${s.float(r)};
    const float INV_GAMMA = ${s.float(1/r)};

    vec4 delinearizeGamma(vec4 color) {
      return vec4(pow(color.rgb, vec3(INV_GAMMA)), color.a);
    }

    vec3 linearizeGamma(vec3 color) {
      return pow(color, vec3(GAMMA));
    }
  `)}class T{constructor(e,s,t,r,o=null){if(this.name=e,this.type=s,this.arraySize=o,this.bind={0:null,1:null,2:null},r)switch(t){case void 0:break;case 0:this.bind[0]=r;break;case 1:this.bind[1]=r;break;case 2:this.bind[2]=r}}equals(e){return this.type===e.type&&this.name===e.name&&this.arraySize===e.arraySize}}class w extends T{constructor(e,s,t){super(e,"vec3",2,(r,o,i,a)=>r.setUniform3fv(e,s(o,i,a),t))}}class U extends T{constructor(e,s,t){super(e,"vec3",1,(r,o,i)=>r.setUniform3fv(e,s(o,i),t))}}class S extends T{constructor(e,s,t){super(e,"float",2,(r,o,i)=>r.setUniform1f(e,s(o,i),t))}}class V extends T{constructor(e,s,t){super(e,"float",1,(r,o,i)=>r.setUniform1f(e,s(o,i),t))}}class G extends T{constructor(e,s){super(e,"sampler2D",2,(t,r,o)=>t.bindTexture(e,s(r,o)))}}class A extends T{constructor(e,s){super(e,"sampler2D",1,(t,r,o)=>t.bindTexture(e,s(r,o)))}}const z=1;function E(e,r){if(!u(r.output))return;e.fragment.include(C);const{emissionSource:o,hasEmissiveTextureTransform:i,bindType:a}=r,n=3===o||4===o||5===o;n&&(e.include(h,r),e.fragment.uniforms.add(1===a?new A("texEmission",e=>e.textureEmissive):new G("texEmission",e=>e.textureEmissive)));const c=2===o||n;c&&e.fragment.uniforms.add(1===a?new U("emissiveBaseColor",e=>e.emissiveBaseColor):new w("emissiveBaseColor",e=>e.emissiveBaseColor));const v=0!==o;v&&7!==o&&6!==o&&4!==o&&5!==o&&e.fragment.uniforms.add(1===a?new V("emissiveStrength",e=>e.emissiveStrength):new S("emissiveStrength",e=>e.emissiveStrength));const m=7===o,d=5===o,l=1===o||6===o||m;e.fragment.code.add(s`
    vec4 getEmissions(vec3 symbolColor) {
      vec4 emissions = ${c?d?"emissiveSource == 0 ? vec4(emissiveBaseColor, 1.0): vec4(linearizeGamma(symbolColor), 1.0)":"vec4(emissiveBaseColor, 1.0)":l?m?"emissiveSource == 0 ? vec4(0.0): vec4(linearizeGamma(symbolColor), 1.0)":"vec4(linearizeGamma(symbolColor), 1.0)":"vec4(0.0)"};
      ${t(n,`${t(d,`if(emissiveSource == 0) {\n              vec4 emissiveFromTex = textureLookup(texEmission, ${i?"emissiveUV":"vuv0"});\n              emissions *= vec4(linearizeGamma(emissiveFromTex.rgb), emissiveFromTex.a);\n           }`,`vec4 emissiveFromTex = textureLookup(texEmission, ${i?"emissiveUV":"vuv0"});\n           emissions *= vec4(linearizeGamma(emissiveFromTex.rgb), emissiveFromTex.a);`)}\n         emissions.w = emissions.rgb == vec3(0.0) ? 0.0: emissions.w;`)}
      ${t(v,"emissions.rgb *= emissiveStrength;")}
      return emissions;
    }
  `)}export{E,V as F,C as G,A as T,T as U,h as V,m as a,x as b,n as c,U as d,z as e,c as f,d as g,a as h,u as i,l as j,v as k,w as l,o as m,f as n,G as o,S as p,b as q,i as r,g as s,p as t};
