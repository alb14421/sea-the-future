// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../../support/engineContent/marker","../util/View.glsl","../../shaderModules/FloatBindUniform","../../shaderModules/glsl"],function(e,r,t,a,o){"use strict";e.MarkerSizing=function(e,n){const i=e.vertex;t.addPixelRatio(i),null==i.uniforms.get("markerScale")&&i.constants.add("markerScale","float",1),i.constants.add("markerSizePerLineWidth","float",r.markerSizePerLineWidth).code.add(o.glsl`float getLineWidth() {
return max(getSize(), 1.0) * pixelRatio;
}
float getScreenMarkerSize() {
return markerSizePerLineWidth * markerScale * getLineWidth();
}`),2===n.space&&(i.constants.add("maxSegmentLengthFraction","float",.45),i.uniforms.add(new a.FloatBindUniform("perRenderPixelRatio",e=>e.camera.perRenderPixelRatio)),i.code.add(o.glsl`bool areWorldMarkersHidden(vec4 pos, vec4 other) {
vec3 midPoint = mix(pos.xyz, other.xyz, 0.5);
float distanceToCamera = length(midPoint);
float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
float worldMarkerSize = getScreenMarkerSize() * screenToWorldRatio;
float segmentLen = length(pos.xyz - other.xyz);
return worldMarkerSize > maxSegmentLengthFraction * segmentLen;
}
float getWorldMarkerSize(vec4 pos) {
float distanceToCamera = length(pos.xyz);
float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
return getScreenMarkerSize() * screenToWorldRatio;
}`))},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});