// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/libs/gl-matrix-2/factories/vec3f64","../ForwardLinearDepthToReadShadowMap.glsl","./calculateUVZShadow.glsl","./ShadowmapFiltering.glsl","../../shaderModules/FloatBindUniform","../../shaderModules/glsl","../../shaderModules/Texture2DShadowBindUniform","../../../../../webgl/NoParameters"],function(a,e,o,d,r,t,l,i,n){"use strict";class s extends d.ReadShadowMapOrigin{}class c extends n.NoParameters{constructor(){super(...arguments),this.origin=e.create()}}function h(a,e){a.fragment.uniforms.add(new t.FloatBindUniform("lightingGlobalFactor",a=>a.lighting.globalFactor));const{receiveShadows:d,spherical:n}=e;a.include(o.ForwardLinearDepthToReadShadowMap,e),d&&function(a){a.include(r.ShadowmapFiltering),a.fragment.uniforms.add(new i.Texture2DShadowBindUniform("shadowMap",({shadowMap:a})=>a.depthTexture)).code.add(l.glsl`float readShadowMap(const in vec3 _worldPos, float _linearDepth) {
vec3 uvzShadow = calculateUVZShadow(_worldPos, _linearDepth, textureSize(shadowMap,0));
if (uvzShadow.z < 0.0) {
return 0.0;
}
return readShadowMapUVZ(uvzShadow, shadowMap);
}`)}(a),a.fragment.code.add(l.glsl`
    float readShadow(float additionalAmbientScale, vec3 vpos) {
      return ${d?"max(lightingGlobalFactor * (1.0 - additionalAmbientScale), readShadowMap(vpos, linearDepth))":l.If(n,"lightingGlobalFactor * (1.0 - additionalAmbientScale)","0.0")};
    }
  `)}a.ReadShadowMapDraw=function(a,e){e.receiveShadows&&a.include(d.calculateUVZShadowDraw),h(a,e)},a.ReadShadowMapDrawParameters=s,a.ReadShadowMapPass=function(a,e){e.receiveShadows&&a.include(d.calculateUVZShadowPass),h(a,e)},a.ReadShadowMapPassParameters=c,Object.defineProperty(a,Symbol.toStringTag,{value:"Module"})});