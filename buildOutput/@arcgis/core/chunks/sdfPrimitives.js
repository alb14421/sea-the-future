/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{g as t}from"./glsl.js";import"../core/lang.js";import{p as r}from"./floatRGBA.js";import{b as a}from"./vec4f64.js";import{T as n}from"./Matrix4PassUniform.js";function o(r){r.code.add(t`const float MAX_RGBA_FLOAT =
255.0 / 256.0 +
255.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 / 256.0;
const vec4 FIXED_POINT_FACTORS = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);
vec4 float2rgba(const float value) {
float valueInValidDomain = clamp(value, 0.0, MAX_RGBA_FLOAT);
vec4 fixedPointU8 = floor(fract(valueInValidDomain * FIXED_POINT_FACTORS) * 256.0);
const float toU8AsFloat = 1.0 / 255.0;
return fixedPointU8 * toU8AsFloat;
}`),r.code.add(t`const vec4 RGBA_TO_FLOAT_FACTORS = vec4(
255.0 / (256.0),
255.0 / (256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0 * 256.0)
);
float rgbaTofloat(vec4 rgba) {
return dot(rgba, RGBA_TO_FLOAT_FACTORS);
}`),r.code.add(t`const vec4 uninterpolatedRGBAToFloatFactors = vec4(
1.0 / 256.0,
1.0 / 256.0 / 256.0,
1.0 / 256.0 / 256.0 / 256.0,
1.0 / 256.0 / 256.0 / 256.0 / 256.0
);
float uninterpolatedRGBAToFloat(vec4 rgba) {
return (dot(round(rgba * 255.0), uninterpolatedRGBAToFloatFactors) - 0.5) * 2.0;
}`),r.code.add(t`const vec3 uninterpolatedRGBToFloatFactors = vec3(
1.0 / 256.0,
1.0 / 256.0 / 256.0,
1.0 / 256.0 / 256.0 / 256.0
);
float uninterpolatedRGBToFloat(vec3 rgb) {
return (dot(round(rgb * 255.0), uninterpolatedRGBToFloatFactors) - 0.5) * 2.0;
}`)}const e=128,c=.5,s=a(.25,.25,.75,.75);function u(t){return"cross"===t||"x"===t}function i(t,r=128,a=r*c,o=0){const{data:e,parameters:s}=l(t,r,a,o);return new n(e,s)}function l(t,r=128,a=r*c,n=0){return{data:f(t,r,a,n),parameters:{mipmap:!1,wrap:{s:33071,t:33071},width:r,height:r,components:4,noUnpackFlip:!0,reloadable:!0}}}function f(t,r=128,a=r*c,n=0){switch(t){case"circle":default:return function(t,r){const a=t/2-.5;return p(t,h(a,a,r/2))}(r,a);case"square":return function(t,r){return d(t,r,!1)}(r,a);case"cross":return function(t,r,a=0){return T(t,r,!1,a)}(r,a,n);case"x":return function(t,r,a=0){return T(t,r,!0,a)}(r,a,n);case"kite":return function(t,r){return d(t,r,!0)}(r,a);case"triangle":return function(t,r){return p(t,F(t/2,r,r/2))}(r,a);case"arrow":return function(t,r){const a=r,n=r/2,o=t/2,e=.8*a,c=h(o,(t-r)/2-e,Math.sqrt(e*e+n*n)),s=F(o,a,n);return p(t,(t,r)=>Math.max(s(t,r),-c(t,r)))}(r,a)}}function d(t,r,a){return a&&(r/=Math.SQRT2),p(t,(n,o)=>{let e=n-.5*t+.25,c=.5*t-o-.75;if(a){const t=(e+c)/Math.SQRT2;c=(c-e)/Math.SQRT2,e=t}return Math.max(Math.abs(e),Math.abs(c))-.5*r})}function T(t,r,a,n=0){r-=n,a&&(r*=Math.SQRT2);const o=.5*r;return p(t,(r,e)=>{let c,s=r-.5*t,u=.5*t-e-1;if(a){const t=(s+u)/Math.SQRT2;u=(u-s)/Math.SQRT2,s=t}return s=Math.abs(s),u=Math.abs(u),c=s>u?s>o?Math.sqrt((s-o)*(s-o)+u*u):u:u>o?Math.sqrt(s*s+(u-o)*(u-o)):s,c-=n/2,c})}function h(t,r,a){return(n,o)=>{const e=n-t,c=o-r;return Math.sqrt(e*e+c*c)-a}}function F(t,r,a){const n=Math.sqrt(r*r+a*a);return(o,e)=>{const c=Math.abs(o-t)-a,s=e-t+r/2+.75,u=(r*c+a*s)/n,i=-s;return Math.max(u,i)}}function p(t,a){const n=new Uint8Array(4*t*t);for(let o=0;o<t;o++)for(let e=0;e<t;e++){const c=e+t*o;let s=a(e,o);s=s/t+.5,r(s,n,4*c)}return n}export{o as R,c as a,f as b,i as c,s as d,l as e,e as f,u as r};
