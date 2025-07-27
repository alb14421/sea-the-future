// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../core/libs/gl-matrix-2/math/mat4","../core/libs/gl-matrix-2/factories/mat4f64","../views/3d/webgl-engine/core/shaderModules/Float4BindUniform","../views/3d/webgl-engine/core/shaderModules/FloatBindUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Matrix4PassUniform","../views/webgl/ShaderBuilder"],function(e,a,i,o,t,r,l,n){"use strict";function s(){const e=new n.ShaderBuilder;return e.attributes.add("position","vec3"),e.attributes.add("color","vec4"),e.attributes.add("size","float"),e.varyings.add("vcolor","vec4"),e.varyings.add("vsize","float"),e.vertex.uniforms.add(new l.Matrix4PassUniform("transform",(e,i)=>function(e,i){const o=24e-8;return a.copy(c,i.camera.projectionMatrix),c[10]=o-1,c[11]=-1,c[14]=(o-2)*i.camera.near,a.multiply(c,c,i.camera.viewMatrix),a.multiply(c,c,e.modelMatrix)}(e,i)),new o.Float4BindUniform("viewport",e=>e.camera.fullViewport),new t.FloatBindUniform("pixelRatio",e=>e.camera.pixelRatio)),e.vertex.main.add(r.glsl`gl_Position = transform * vec4(position, 0);
vcolor = color / 1.2;
vsize = size * 5.0 * pixelRatio;
gl_PointSize = vsize;`),e.fragment.main.add(r.glsl`float cap = 0.7;
float scale = 1.0 / cap;
float helper = clamp(length(abs(gl_PointCoord - vec2(0.5))), 0.0, cap);
float alpha = clamp((cap - helper) * scale, 0.0, 1.0);
float intensity = alpha * alpha * alpha;
if (vsize < 3.0) {
intensity *= 0.5;
}
fragColor = vec4(vcolor.xyz, intensity);`),e}const c=i.create(),d=Object.freeze(Object.defineProperty({__proto__:null,build:s},Symbol.toStringTag,{value:"Module"}));e.Stars=d,e.build=s});