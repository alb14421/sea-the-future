// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../core/shaderModules/glsl"],function(e,t){"use strict";e.UnpackAttributes=function(e,n){const s=2===n.type,i=0===n.type;e.attributes.add("sideness","vec2"),e.vertex.code.add(t.glsl`
    struct UnpackedAttributes {
      vec2 sideness;
      vec2 sidenessNorm;
      float lineWidthPixels;
      float extensionLengthPixels;
      ${t.If(s,"float type;")}
    };
  `).code.add(t.glsl`
    UnpackedAttributes unpackAttributes(ComponentData component) {
      vec2 sidenessNorm = sideness;
      vec2 sideness = sidenessNorm * 2.0 - 1.0;
      float extensionLengthPixels = component.extensionLength;
      float lineWidth = component.lineWidth;
      ${t.If(s,"if (component.type <= 0.0) {")}
      ${t.If(!i,"extensionLengthPixels *= variantExtension * 2.0 - 1.0;")}
      ${t.If(s,"}")}
      return UnpackedAttributes(sideness, sidenessNorm, lineWidth, extensionLengthPixels ${t.If(s,", component.type")});
    }
  `)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});