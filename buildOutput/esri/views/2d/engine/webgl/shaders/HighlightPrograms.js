// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","./sources/resolver"],function(e,r){"use strict";const t={vertexShader:r.resolveIncludes("highlight/textured.vert"),fragmentShader:r.resolveIncludes("highlight/highlight.frag")},h={vertexShader:r.resolveIncludes("highlight/textured.vert"),fragmentShader:r.resolveIncludes("highlight/blur.frag")};e.blur=h,e.highlight=t,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});