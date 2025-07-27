// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","./ForwardLinearDepth.glsl","./ShaderOutput","./attributes/VertexPosition.glsl","../shaderModules/Float2BindUniform","../shaderModules/glsl"],function(e,a,r,t,o,n){"use strict";function i(e){e.vertex.uniforms.add(new o.Float2BindUniform("nearFar",e=>e.camera.nearFar))}function d(e){e.vertex.code.add(n.glsl`float calculateLinearDepth(vec2 nearFar,float z) {
return (-z - nearFar[0]) / (nearFar[1] - nearFar[0]);
}`)}e.ForwardLinearDepthToWriteShadowMap=function(e,o){const{vertex:l}=e,u=r.isShadowRelatedOutput(o.output);u&&(e.include(t.VertexPosition,o),a.ForwardLinearDepth(e,!0),i(e),d(e)),l.code.add(n.glsl`
    void forwardLinearDepthToWriteShadowMap() {
      ${n.If(u,"forwardLinearDepth(calculateLinearDepth(nearFar, vPosition_view.z));")}
    }
  `)},e.addCalculateLinearDepth=d,e.addNearFar=i,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});