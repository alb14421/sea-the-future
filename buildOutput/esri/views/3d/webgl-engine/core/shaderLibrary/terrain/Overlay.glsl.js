// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/libs/gl-matrix-2/factories/vec4f64","../../../../../../geometry/support/aaBoundingRect","../ShaderOutput","../shading/MainLighting.glsl","../shading/Water.glsl","../../shaderModules/Float4DrawUniform","../../shaderModules/FloatPassUniform","../../shaderModules/glsl","../../shaderModules/Texture2DPassUniform","../../shaderModules/Texture2DUintPassUniform","../../../../../webgl/Uniform"],function(e,o,t,r,a,l,i,n,c,s,v,d){"use strict";function u(e,o){return 0===e.identifier&&r.isColorOrColorEmission(e.output)?e.occludedGround?o.overlay?.allSourcesOccluders?o.overlay?.getTexture(1):o.overlay?.getTexture(4):o.overlay?.getTexture(1):0===e.identifier&&9===e.output?o.overlay?.getTexture(5):2===e.identifier?o.overlay?.getTexture(2):null}function x(e,o){const t=3===o.pbrMode||4===o.pbrMode||6===o.pbrMode;t&&e.include(l.Water,o);const{vertex:r,fragment:i,varyings:n}=e;n.add("vtcOverlay","vec4");const{output:s}=o,d=8===s;r.code.add(c.glsl`void setOverlayVTC(in vec2 uv) {
vtcOverlay = vec4(uv, uv) * overlayTexScale + overlayTexOffset;
}`),i.code.add(c.glsl`bool isValid(vec2 uv, vec2 dxdy) {
return (uv.x >= 0.0 + dxdy.x) && (uv.x <= 1.0 - dxdy.x) && (uv.y >= 0.0 + dxdy.y) && (uv.y <= 1.0 - dxdy.y);
}
vec4 getOverlayColor(sampler2D ov0Tex, vec4 texCoords) {
vec4 color0 = texture(ov0Tex, vec2(texCoords.x * 0.5, texCoords.y));
vec4 color1 = texture(ov0Tex, vec2(texCoords.z * 0.5 + 0.5, texCoords.w));
bool isValid0 = isValid(texCoords.xy, fwidth(texCoords.xy));
bool isValid1 = isValid(texCoords.zw, vec2(0.0, 0.0));
return mix(color1 * float(isValid1), color0, float(isValid0));
}`),d?i.uniforms.add(new v.Texture2DUintPassUniform("overlayHighlightTexture",(e,o)=>o.overlay?.getTexture(2))).code.add(c.glsl`uvec2 getAllOverlayHighlightValuesEncoded() {
vec4 texCoords = vtcOverlay;
vec2 uvInner = texCoords.xy;
vec2 uvOuter = texCoords.zw;
bool isValidInner = isValid(uvInner, fwidth(uvInner));
bool isValidOuter = isValid(uvOuter, vec2(0.0, 0.0));
vec2 texelCoordInner = uvInner * vec2(0.5, 1.0);
vec2 texelCoordOuter = uvOuter * vec2(0.5, 1.0) + vec2(0.5,0.0);
vec2 texDim =  vec2(textureSize(overlayHighlightTexture, 0));
uvec2 texelValueInner = texelFetch(overlayHighlightTexture, ivec2(texelCoordInner * texDim), 0).rg;
uvec2 texelValueOuter = texelFetch(overlayHighlightTexture, ivec2(texelCoordOuter * texDim), 0).rg;
return
isValidInner ? texelValueInner :
isValidOuter ? texelValueOuter :
uvec2(0);
}`):(i.code.add(c.glsl`vec4 getCombinedOverlayColor() {
return overlayOpacity * getOverlayColor(ovColorTex, vtcOverlay);
}`),i.code.add(c.glsl`vec4 getOverlayColorTexel() {
vec4 texCoords = vtcOverlay;
vec2 texDim =  vec2(textureSize(ovColorTex, 0));
vec4 color0 = texelFetch(ovColorTex, ivec2(vec2(texCoords.x * 0.5, texCoords.y) * texDim), 0);
vec4 color1 = texelFetch(ovColorTex, ivec2(vec2(texCoords.z * 0.5 + 0.5, texCoords.w) * texDim), 0);
bool isValid0 = isValid(texCoords.xy, fwidth(texCoords.xy));
bool isValid1 = isValid(texCoords.zw, vec2(0.0, 0.0));
return mix(color1 * float(isValid1), color0, float(isValid0));
}`)),t&&(a.addMainLightDirection(i),a.addMainLightIntensity(i),i.code.add(c.glsl`vec4 getOverlayWaterColor(vec4 maskInput, vec4 colorInput, vec3 vposEyeDir,
float shadow, vec3 localUp, mat3 tbn, vec3 position, vec3 positionWorld) {
vec3 n = normalize(tbn *  (2.0 * maskInput.rgb - vec3(1.0)));
vec3 v = vposEyeDir;
vec3 final = getSeaColor(n, v, mainLightDirection, colorInput.rgb, mainLightIntensity, localUp, 1.0 - shadow, maskInput.w, position, positionWorld);
return vec4(final, colorInput.w);
}`))}const y=o.create();class g extends d.Uniform{constructor(e){super(e,"vec4")}}e.OverlayIM=function(e,o){const{vertex:r,fragment:a}=e;r.uniforms.add(new i.Float4DrawUniform("overlayTexOffset",(e,o)=>function(e,o){const r=o.overlay?.overlays[0]?.extent;t.hasArea(r)&&(y[0]=e.toMapSpace[0]/t.width(r)-r[0]/t.width(r),y[1]=e.toMapSpace[1]/t.height(r)-r[1]/t.height(r));const a=o.overlay?.overlays[1]?.extent;return t.hasArea(a)&&(y[2]=e.toMapSpace[0]/t.width(a)-a[0]/t.width(a),y[3]=e.toMapSpace[1]/t.height(a)-a[1]/t.height(a)),y}(e,o)),new i.Float4DrawUniform("overlayTexScale",(e,o)=>function(e,o){const r=o.overlay?.overlays[0]?.extent;t.hasArea(r)&&(y[0]=e.toMapSpace[2]/t.width(r),y[1]=e.toMapSpace[3]/t.height(r));const a=o.overlay?.overlays[1]?.extent;return t.hasArea(a)&&(y[2]=e.toMapSpace[2]/t.width(a),y[3]=e.toMapSpace[3]/t.height(a)),y}(e,o))),a.constants.add("overlayOpacity","float",1),a.uniforms.add(new s.Texture2DPassUniform("ovColorTex",(e,o)=>u(e,o))),x(e,o)},e.OverlayTerrain=function(e,o){const{vertex:t,fragment:r}=e,{output:a}=o;t.uniforms.add(new g("overlayTexOffset"),new g("overlayTexScale")),r.uniforms.add(new n.FloatPassUniform("overlayOpacity",e=>e.overlayOpacity)),8!==a&&r.uniforms.add(new s.Texture2DPassUniform("ovColorTex",(e,o)=>o.overlay?.getTexture(e.overlayContent))),x(e,o)},e.getIMColorTexture=u,e.getOverlayContentForOutputTerrain=function(e,o){switch(e){case 0:case 1:return 9!==o.slot||o.overlay?.allSourcesOccluders?0:4;case 2:case 3:return 0;case 8:return 2;case 4:case 6:case 7:return null;case 9:return 5}return null},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});