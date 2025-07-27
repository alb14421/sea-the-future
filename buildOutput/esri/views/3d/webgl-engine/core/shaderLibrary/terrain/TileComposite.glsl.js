// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/libs/gl-matrix-2/factories/vec2f64","../../shaderModules/Float2PassUniform","../../shaderModules/FloatPassUniform","../../shaderModules/glsl","../../../../../webgl/NoParameters"],function(e,s,o,t,a,i){"use strict";class r extends i.NoParameters{constructor(){super(...arguments),this.scale=1,this.offset=s.ZEROS}}e.TileComposite=function(e){e.attributes.add("position","vec2"),e.attributes.add("uv0","vec2"),e.varyings.add("uv","vec2"),e.varyings.add("vuv","vec2"),e.vertex.uniforms.add(new t.FloatPassUniform("scale",e=>e.scale),new o.Float2PassUniform("offset",e=>e.offset)).main.add(a.glsl`gl_Position = vec4(position, 0.0, 1.0);
uv = uv0 * scale + offset;
vuv = uv0;`)},e.TileCompositePassParameters=r,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});