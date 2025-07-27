// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/compilerUtils","../../shaderModules/glsl"],function(e,r,o){"use strict";e.NormalAttribute=function(e,a){switch(a.normalType){case 1:e.attributes.add("normalCompressed","vec2"),e.vertex.code.add(o.glsl`vec3 decompressNormal(vec2 normal) {
float z = 1.0 - abs(normal.x) - abs(normal.y);
return vec3(normal + sign(normal) * min(z, 0.0), z);
}
vec3 normalModel() {
return decompressNormal(normalCompressed);
}`);break;case 0:e.attributes.add("normal","vec3"),e.vertex.code.add(o.glsl`vec3 normalModel() {
return normal;
}`);break;case 2:e.fragment.code.add(o.glsl`vec3 screenDerivativeNormal(vec3 positionView) {
return normalize(cross(dFdx(positionView), dFdy(positionView)));
}`);break;default:r.neverReached(a.normalType);case 3:}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});