// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../core/shaderModules/FloatPassUniform","../core/shaderModules/glsl"],function(t,e,a){"use strict";t.AnimatedLine=function(t,i){if(!i.hasAnimation)return;const{attributes:r,varyings:o,vertex:l,fragment:n}=t;r.add("timeStamps","vec3"),o.add("vTimeStamp","float"),o.add("vFirstTime","float"),o.add("vLastTime","float"),l.main.add(a.glsl`vTimeStamp = timeStamps.x;
vFirstTime = timeStamps.y;
vLastTime = timeStamps.z;`);const{animation:m}=i;3===m&&n.constants.add("decayRate","float",2.3),n.code.add(a.glsl`
    float getTrailOpacity(float x) {
      ${function(t){switch(t){case 2:return"return x >= 0.0 && x <= 1.0 ? 1.0 : 0.0;";case 3:return"float cutOff = exp(-decayRate);\n        return (exp(-decayRate * x) - cutOff) / (1.0 - cutOff);";default:return"return 1.0;"}}(m)}
    }`),n.uniforms.add(new e.FloatPassUniform("timeElapsed",t=>t.timeElapsed),new e.FloatPassUniform("trailLength",t=>t.trailLength)).code.add(a.glsl`vec4 animate(vec4 color) {
float totalTimeWithTrail = vLastTime - vFirstTime + trailLength;
float timeAtHead = mod(timeElapsed - vFirstTime, totalTimeWithTrail) + vFirstTime;
float t = timeAtHead - vTimeStamp;
vec4 animatedColor = color * step(0.0, t);
animatedColor.a *= getTrailOpacity(t / trailLength);
return animatedColor;
}`)},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})});