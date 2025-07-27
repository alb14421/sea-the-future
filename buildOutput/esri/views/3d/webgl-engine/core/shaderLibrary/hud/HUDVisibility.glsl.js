// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","./AlignPixel.glsl","../../shaderModules/Float4BindUniform","../../shaderModules/FloatBindUniform","../../shaderModules/glsl","../../shaderModules/Texture2DBindUniform"],function(e,i,r,l,o,n){"use strict";e.HUDVisibility=function(e){e.vertex.uniforms.add(new l.FloatBindUniform("renderTransparentlyOccludedHUD",e=>0===e.hudRenderStyle?1:1===e.hudRenderStyle?0:.75),new r.Float4BindUniform("viewport",e=>e.camera.fullViewport),new n.Texture2DBindUniform("hudVisibilityTexture",e=>e.hudVisibility?.getTexture())),e.vertex.include(i.AlignPixel),e.vertex.code.add(o.glsl`bool testHUDVisibility(vec4 posProj) {
vec4 posProjCenter = alignToPixelCenter(posProj, viewport.zw);
vec4 occlusionPixel = texture(hudVisibilityTexture, .5 + .5 * posProjCenter.xy / posProjCenter.w);
if (renderTransparentlyOccludedHUD > 0.5) {
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g * renderTransparentlyOccludedHUD < 1.0;
}
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g == 1.0;
}`)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});