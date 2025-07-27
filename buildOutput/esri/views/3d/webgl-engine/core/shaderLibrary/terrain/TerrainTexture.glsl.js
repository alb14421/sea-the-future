// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../shading/ReadShadowMap.glsl","./BackgroundGrid.glsl","../../shaderModules/glsl","../../../../../webgl/Uniform"],function(e,t,r,o,c){"use strict";class n extends t.ReadShadowMapPassParameters{constructor(){super(...arguments),this.overlayOpacity=1}}class a extends c.Uniform{constructor(e){super(e,"float")}}class s extends c.Uniform{constructor(e){super(e,"vec3")}}class d extends c.Uniform{constructor(e){super(e,"vec4")}}class l extends c.Uniform{constructor(e){super(e,"sampler2D")}}e.Float3Uniform=s,e.OverlayTerrainPassParameters=n,e.TerrainTexture=function(e,t){const{vertex:c,fragment:n,varyings:i}=e;i.add("vtc","vec2"),c.uniforms.add(new d("texOffsetAndScale")),n.uniforms.add(new l("tex")),n.uniforms.add(new s("textureOpacities"));const u=t.textureFadingEnabled&&!t.renderOccluded;u&&(c.uniforms.add(new d("nextTexOffsetAndScale")),i.add("nvtc","vec2"),n.uniforms.add(new l("texNext")),n.uniforms.add(new s("nextTexOpacities")),n.uniforms.add(new a("fadeFactor")));const x=1===t.tileBlendInput,f=2===t.tileBlendInput;f&&n.include(r.BackgroundGrid),x&&n.uniforms.add(new s("backgroundColor")),c.code.add(o.glsl`
  void forwardTextureCoordinatesWithTransform(in vec2 uv) {
    vtc = texOffsetAndScale.xy + uv * texOffsetAndScale.zw;
    ${o.If(u,"nvtc = nextTexOffsetAndScale.xy + uv * nextTexOffsetAndScale.zw;")}
  }`),n.code.add(o.glsl`
    vec4 getColor(vec4 color, vec2 uv, vec3 opacities) {
      ${o.If(f||x,o.glsl`if (opacities.y <= 0.0) {
           return color * opacities.z * opacities.x;
         }
         vec4 bg = vec4(${x?o.glsl`backgroundColor`:o.glsl`gridColor(uv)`} * opacities.y, opacities.y);
         vec4 layer = color * opacities.z;
         return (bg * (1.0 - layer.a) + layer) * opacities.x;`,"return color;")}
    }`),u?n.code.add(o.glsl`vec4 getTileColor() {
vec4 color = getColor(texture(tex, vtc), vtc, textureOpacities);
if (fadeFactor >= 1.0) {
return color;
}
vec4 nextColor = getColor(texture(texNext, nvtc), nvtc, nextTexOpacities);
return mix(nextColor, color, fadeFactor);
}`):n.code.add(o.glsl`vec4 getTileColor() {
return getColor(texture(tex, vtc), vtc, textureOpacities);
}`)},e.Texture2DUniform=l,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});