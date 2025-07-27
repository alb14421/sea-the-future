// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/compilerUtils","../../../core/shaderModules/FloatDrawUniform","../../../core/shaderModules/glsl","./UnpackAttributes.glsl"],function(e,t,r,a,u){"use strict";e.LineAmplitude=function(e,l){const s=e.vertex;switch(e.include(u.UnpackAttributes,l),l.type){case 0:s.code.add(a.glsl`float calculateLineAmplitude(UnpackedAttributes unpackedAttributes) {
return 0.0;
}`);break;case 1:s.uniforms.add(new r.FloatDrawUniform("strokesAmplitude",e=>e.strokesTexture.amplitude)).code.add(a.glsl`float calculateLineAmplitude(UnpackedAttributes unpackedAttributes) {
return strokesAmplitude;
}`);break;case 2:s.uniforms.add(new r.FloatDrawUniform("strokesAmplitude",e=>e.strokesTexture.amplitude)).code.add(a.glsl`float calculateLineAmplitude(UnpackedAttributes unpackedAttributes) {
float type = unpackedAttributes.type;
if (type <= 0.0) {
return strokesAmplitude;
}
return 0.0;
}`);break;case 3:break;default:t.neverReached(l.type)}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});