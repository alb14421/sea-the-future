// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/compilerUtils","../../shaderModules/glsl"],function(e,r,t){"use strict";e.TextureCoordinateAttribute=function(e,d){switch(d.textureCoordinateType){case 1:return e.attributes.add("uv0","vec2"),e.varyings.add("vuv0","vec2"),void e.vertex.code.add(t.glsl`void forwardTextureCoordinates() { vuv0 = uv0; }`);case 2:return e.attributes.add("uv0","vec2"),e.attributes.add("uvRegion","vec4"),e.varyings.add("vuv0","vec2"),e.varyings.add("vuvRegion","vec4"),void e.vertex.code.add(t.glsl`void forwardTextureCoordinates() {
vuv0 = uv0;
vuvRegion = uvRegion;
}`);default:r.neverReached(d.textureCoordinateType);case 0:return void e.vertex.code.add(t.glsl`void forwardTextureCoordinates() {}`);case 3:return}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});