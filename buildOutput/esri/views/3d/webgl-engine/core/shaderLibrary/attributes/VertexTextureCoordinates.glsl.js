// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","./TextureCoordinateAttribute.glsl","../util/TextureAtlasLookup.glsl","../../shaderModules/glsl"],function(e,t,u,o){"use strict";e.VertexTextureCoordinates=function(e,r){const{textureCoordinateType:l}=r;if(0===l||3===l)return;e.include(t.TextureCoordinateAttribute,r);const n=2===l;n&&e.include(u.TextureAtlasLookup),e.fragment.code.add(o.glsl`
    vec4 textureLookup(sampler2D tex, vec2 uv) {
      return ${n?"textureAtlasLookup(tex, uv, vuvRegion)":"texture(tex, uv)"};
    }
  `)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});