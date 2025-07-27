// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../HighlightReadBitmap.glsl","../../shaderModules/glsl","../../shaderModules/Integer2BindUniform","../../shaderModules/IntegerBindUniform","../../shaderModules/Texture2DBindUniform","../../shaderModules/Texture2DUintBindUniform"],function(i,e,t,l,g,h,d){"use strict";i.OutputHighlight=function(i,u){const{fragment:o}=i,{output:n,draped:r,hasHighlightMixTexture:c}=u;8===n?(o.uniforms.add(new g.IntegerBindUniform("highlightLevel",i=>i.highlightLevel??0),new l.Integer2BindUniform("highlightMixOrigin",i=>i.highlightMixOrigin)),i.outputs.add("fragHighlight","uvec2",0),i.include(e.HighlightReadBitmap),c?o.uniforms.add(new d.Texture2DUintBindUniform("highlightMixTexture",i=>i.highlightMixTexture)).code.add(t.glsl`uvec2 getAccumulatedHighlight() {
return texelFetch(highlightMixTexture, ivec2(gl_FragCoord.xy) - highlightMixOrigin, 0).rg;
}
void outputHighlight(bool occluded) {
if (highlightLevel == 0) {
uint bits = occluded ? 3u : 1u;
fragHighlight = uvec2(bits, 0);
} else {
int ll = (highlightLevel & 3) << 1;
int li = (highlightLevel >> 2) & 3;
uint bits;
if (occluded) {
bits = 3u << ll;
} else {
bits = 1u << ll;
}
uvec2 combinedHighlight = getAccumulatedHighlight();
combinedHighlight[li] |= bits;
fragHighlight = combinedHighlight;
}
}`):o.code.add(t.glsl`void outputHighlight(bool occluded) {
uint bits = occluded ? 3u : 1u;
fragHighlight = uvec2(bits, 0);
}`),r?o.code.add(t.glsl`bool isHighlightOccluded() {
return false;
}`):o.uniforms.add(new h.Texture2DBindUniform("depthTexture",i=>i.mainDepth)).code.add(t.glsl`bool isHighlightOccluded() {
float sceneDepth = texelFetch(depthTexture, ivec2(gl_FragCoord.xy), 0).x;
return gl_FragCoord.z > sceneDepth + 5e-7;
}`),o.code.add(t.glsl`void calculateOcclusionAndOutputHighlight() {
outputHighlight(isHighlightOccluded());
}`)):o.code.add(t.glsl`void calculateOcclusionAndOutputHighlight() {}`)},Object.defineProperty(i,Symbol.toStringTag,{value:"Module"})});