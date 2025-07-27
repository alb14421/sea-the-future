// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../ShaderOutput","../attributes/VertexTextureCoordinates.glsl","../../shaderModules/glsl","../../shaderModules/Texture2DDrawUniform"],function(e,r,o,t,u){"use strict";e.ReadBaseColorTexture=function(e,a){const s=a.hasColorTexture&&(r.isColorOrColorEmission(a.output)||1!==a.alphaDiscardMode);s&&(e.include(o.VertexTextureCoordinates,a),e.fragment.uniforms.add(new u.Texture2DDrawUniform("baseColorTexture",e=>e.texture))),e.fragment.code.add(t.glsl`
    vec4 readBaseColorTexture() {
      return ${s?"textureLookup(baseColorTexture, vuv0)":"vec4(1.0)"};
    }
  `)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});