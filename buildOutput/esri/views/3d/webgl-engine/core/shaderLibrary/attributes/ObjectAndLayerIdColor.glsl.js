// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../shaderModules/glsl"],function(o,d){"use strict";o.ObjectAndLayerIdColor=function(o,e){if(9!==e.output)return o.vertex.code.add(d.glsl`void forwardObjectAndLayerIdColor() {}`),void o.fragment.code.add(d.glsl`void outputObjectAndLayerIdColor() {}`);const r=e.instanced;o.varyings.add("objectAndLayerIdColorVarying","vec4");const t=r?"instanceOlidColor":"olidColor";o.attributes.add(t,"vec4"),o.vertex.code.add(d.glsl`
    void forwardObjectAndLayerIdColor() {
      objectAndLayerIdColorVarying = ${t} * 0.003921568627451;
    }`),o.fragment.code.add(d.glsl`void outputObjectAndLayerIdColor() {
fragColor = objectAndLayerIdColorVarying;
}`)},Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});