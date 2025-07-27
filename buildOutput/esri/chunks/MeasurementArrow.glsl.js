// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/webgl/ShaderBuilder","../webscene/support/AlphaCutoff"],function(e,t,o,r,i,l,n){"use strict";function a(e){const a=new l.ShaderBuilder,{vertex:s,fragment:d}=a;t.addProjViewLocalOrigin(s,e),s.uniforms.add(new r.FloatPassUniform("width",e=>e.width)),a.attributes.add("position","vec3"),a.attributes.add("normal","vec3"),a.attributes.add("uv0","vec2"),a.attributes.add("length","float"),a.varyings.add("vtc","vec2"),a.varyings.add("vlength","float"),a.varyings.add("vradius","float"),s.main.add(i.glsl`vec3 bitangent = normal;
vtc = uv0;
vlength = length;
vradius = 0.5 * width;
vec4 pos = view * vec4(position + vradius * bitangent * uv0.y, 1.0);
gl_Position = proj * pos;`),d.uniforms.add(new r.FloatPassUniform("outlineSize",e=>e.outlineSize),new o.Float4PassUniform("outlineColor",e=>e.outlineColor),new r.FloatPassUniform("stripeLength",e=>e.stripeLength),new o.Float4PassUniform("stripeEvenColor",e=>e.stripeEvenColor),new o.Float4PassUniform("stripeOddColor",e=>e.stripeOddColor));const c=1/Math.sqrt(2);return d.code.add(i.glsl`
    const float INV_SQRT2 = ${i.glsl.float(c)};

    vec4 arrowColor(vec2 tc, float len) {
      float d = INV_SQRT2 * (tc.x - abs(tc.y));
      d = min(d, INV_SQRT2 * (len - tc.x - abs(tc.y)));
      d = min(d, 1.0 - abs(tc.y));

      if (d < 0.0) {
        return vec4(0.0);
      }
      if (d < outlineSize) {
        return outlineColor;
      }
      return fract(0.5 / stripeLength * tc.x * vradius) >= 0.5 ? stripeOddColor : stripeEvenColor;
    }`),d.main.add(i.glsl`
    vec2 ntc = vec2(vtc.x / vradius, vtc.y);
    vec4 color = arrowColor(ntc, vlength / vradius);
    if (color.a < ${i.glsl.float(n.alphaCutoff)}) {
      discard;
    }
    fragColor = color;`),a}const s=Object.freeze(Object.defineProperty({__proto__:null,build:a},Symbol.toStringTag,{value:"Module"}));e.MeasurementArrow=s,e.build=a});