// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../shaderModules/glsl"],function(e,i){"use strict";e.ScreenSpacePass=function(e,t=!0){e.attributes.add("position","vec2"),t&&e.varyings.add("uv","vec2"),e.vertex.main.add(i.glsl`
      gl_Position = vec4(position, 0.0, 1.0);
      ${t?i.glsl`uv = position * 0.5 + vec2(0.5);`:""}
  `)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});