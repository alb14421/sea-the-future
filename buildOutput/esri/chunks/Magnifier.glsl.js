// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../core/screenUtils","./vec42","../core/libs/gl-matrix-2/factories/vec4f64","../views/3d/webgl-engine/core/shaderModules/BooleanPassUniform","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/webgl/NoParameters","../views/webgl/ShaderBuilder"],function(e,r,a,n,t,o,s,i,l,u){"use strict";class d extends l.NoParameters{constructor(){super(...arguments),this.mask=null,this.overlay=null,this.input=null,this.size=0}}function c(){const e=new u.ShaderBuilder;return e.attributes.add("position","vec2"),e.vertex.uniforms.add(new o.Float4PassUniform("drawPosition",(e,n)=>function(e,n){const t=n.camera.pixelRatio,o=e.magnifier.offset.x*t,s=e.magnifier.offset.y*t;r.screenPointObjectToArray(e.magnifier.position,f);const i=n.camera.screenToRender(f,v),l=Math.ceil(t*e.magnifier.size),{fullWidth:u,fullHeight:d}=n.camera;return a.set(m,(i[0]+o)/u*2-1,(i[1]-s)/d*2-1,l/u*2,l/d*2)}(e,n))),e.varyings.add("vUV","vec2"),e.vertex.main.add(s.glsl`vUV = position;
gl_Position = vec4(drawPosition.xy + vec2(position - 0.5) * drawPosition.zw, 0.0, 1.0);`),e.fragment.uniforms.add(new i.Texture2DPassUniform("textureInput",e=>e.input)),e.fragment.uniforms.add(new i.Texture2DPassUniform("textureMask",e=>e.mask)),e.fragment.uniforms.add(new i.Texture2DPassUniform("textureOverlay",e=>e.overlay)),e.fragment.uniforms.add(new t.BooleanPassUniform("maskEnabled",e=>e.magnifier.maskEnabled)),e.fragment.uniforms.add(new t.BooleanPassUniform("overlayEnabled",e=>e.magnifier.overlayEnabled)),e.fragment.code.add(s.glsl`const float barrelFactor = 1.1;
vec2 barrel(vec2 uv) {
vec2 uvn = uv * 2.0 - 1.0;
if (uvn.x == 0.0 && uvn.y == 0.0) {
return vec2(0.5, 0.5);
}
float theta = atan(uvn.y, uvn.x);
float r = pow(length(uvn), barrelFactor);
return r * vec2(cos(theta), sin(theta)) * 0.5 + 0.5;
}`),e.fragment.main.add(s.glsl`float mask = maskEnabled ? texture(textureMask, vUV).a : 1.0;
vec4 inputColor = texture(textureInput, barrel(vUV)) * mask;
vec4 overlayColor = overlayEnabled ? texture(textureOverlay, vUV) : vec4(0);
fragColor = overlayColor + (1.0 - overlayColor.a) * inputColor;`),e}const f=r.createScreenPointArray(),v=r.createRenderScreenPointArray(),m=n.create(),g=Object.freeze(Object.defineProperty({__proto__:null,MagnifierPassParameters:d,build:c},Symbol.toStringTag,{value:"Module"}));e.Magnifier=g,e.MagnifierPassParameters=d,e.build=c});