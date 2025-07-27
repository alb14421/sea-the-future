// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/IntegerPassUniform","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/webgl/NoParameters","../views/webgl/ShaderBuilder"],function(e,r,o,s,a,l,c){"use strict";class t extends l.NoParameters{constructor(){super(...arguments),this.effect=0}}function u(){const e=new c.ShaderBuilder;return e.include(r.ScreenSpacePass),e.outputs.add("fragColor","vec4",0),e.fragment.uniforms.add(new a.Texture2DPassUniform("colorTexture",e=>e.color),new a.Texture2DPassUniform("focusArea",e=>e.focusArea),new s.IntegerPassUniform("focusAreaEffectMode",e=>e.effect)).main.add(o.glsl`
      float mask = texture( focusArea, uv, 0.0 ).r;
      vec4 color = texture( colorTexture, uv, 0.0 );
      vec4 colorDeSaturate = vec4(color.r * 0.25 + color.g * 0.5 + color.b * 0.25);
      if (focusAreaEffectMode == ${o.glsl.int(0)}) {
        fragColor = mask > 0.0 ? color : 0.55 * colorDeSaturate + 0.45;
      } else {
        fragColor = mask > 0.0 ? color : 0.33 * mix(color, colorDeSaturate, 0.);
      }
  `),e}const n=Object.freeze(Object.defineProperty({__proto__:null,FocusAreaColorPassParameters:t,build:u},Symbol.toStringTag,{value:"Module"}));e.FocusAreaColor=n,e.FocusAreaColorPassParameters=t,e.build=u});