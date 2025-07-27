// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../shaderModules/FloatDrawUniform","../../shaderModules/FloatPassUniform","../../shaderModules/glsl","../../../../../../webscene/support/AlphaCutoff"],function(o,a,t,e,r){"use strict";function l(o,a,t){const l=o.fragment,s=a.alphaDiscardMode,f=0===s;2!==s&&3!==s||l.uniforms.add(t),l.code.add(e.glsl`
    void discardOrAdjustAlpha(inout vec4 color) {
      ${1===s?"color.a = 1.0;":`if (color.a < ${f?e.glsl.float(r.alphaCutoff):"textureAlphaCutoff"}) {\n              discard;\n             } ${e.If(2===s,"else { color.a = 1.0; }")}`}
    }
  `)}o.DiscardOrAdjustAlphaDraw=function(o,t){l(o,t,new a.FloatDrawUniform("textureAlphaCutoff",o=>o.textureAlphaCutoff))},o.DiscardOrAdjustAlphaPass=function(o,a){l(o,a,new t.FloatPassUniform("textureAlphaCutoff",o=>o.textureAlphaCutoff))},Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});