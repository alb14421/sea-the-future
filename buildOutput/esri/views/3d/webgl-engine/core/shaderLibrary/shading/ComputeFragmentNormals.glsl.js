// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/compilerUtils","../attributes/VertexNormal.glsl","../attributes/VertexPosition.glsl","../../shaderModules/glsl"],function(e,a,o,l,r){"use strict";e.computeFragmentNormals=function(e,d){const i=e.fragment;switch(d.doubleSidedMode){case 0:i.code.add(r.glsl`vec3 _adjustDoublesided(vec3 normal) {
return normal;
}`);break;case 1:e.include(l.VertexPosition,d),i.code.add(r.glsl`vec3 _adjustDoublesided(vec3 normal) {
return dot(normal, vPositionWorldCameraRelative) > 0.0 ? -normal : normal;
}`);break;case 2:i.code.add(r.glsl`vec3 _adjustDoublesided(vec3 normal) {
return gl_FrontFacing ? normal : -normal;
}`);break;default:a.neverReached(d.doubleSidedMode);case 3:}switch(d.normalType){case 0:case 1:e.include(o.VertexNormal,d),i.main.add(r.glsl`vec3 fragmentFaceNormal = _adjustDoublesided(normalize(vNormalWorld));
vec3 fragmentFaceNormalView = gl_FrontFacing ? normalize(vNormalView) : -normalize(vNormalView);`);break;case 2:e.include(l.VertexPosition,d),i.main.add(r.glsl`vec3 fragmentFaceNormal = normalize(cross(dFdx(vPositionWorldCameraRelative), dFdy(vPositionWorldCameraRelative)));
vec3 fragmentFaceNormalView = normalize(cross(dFdx(vPosition_view), dFdy(vPosition_view)));`)}d.shadeNormals?i.main.add(r.glsl`vec3 fragmentShadingNormal = fragmentFaceNormal;`):d.spherical?(e.include(l.VertexPosition,d),i.main.add(r.glsl`vec3 fragmentShadingNormal = normalize(positionWorld());`)):i.main.add(r.glsl`vec3 fragmentShadingNormal = vec3(0.0, 0.0, 1.0);`)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});