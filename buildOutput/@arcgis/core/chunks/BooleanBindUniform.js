/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{c as e}from"./maybe.js";import{isPromiseLike as t}from"../core/promiseUtils.js";import{A as s,N as r,b as i,i as a}from"./Matrix4PassUniform.js";import{p as c}from"./screenUtils.js";import{s as o}from"./vec4.js";import{c as l}from"./vec4f64.js";import{k as n}from"./vec3.js";import{c as u}from"./vec3f64.js";import{d,U as f}from"./Emissions.glsl.js";import{g as m}from"./glsl.js";class v extends s{constructor(e){super(e),this._numLoading=0,this._disposed=!1,this._textures=e.textures,this.updateTexture(e.textureId),this._acquire(e.normalTextureId,e=>this._textureNormal=e),this._acquire(e.emissiveTextureId,e=>this._textureEmissive=e),this._acquire(e.occlusionTextureId,e=>this._textureOcclusion=e),this._acquire(e.metallicRoughnessTextureId,e=>this._textureMetallicRoughness=e)}dispose(){super.dispose(),this._texture=e(this._texture),this._textureNormal=e(this._textureNormal),this._textureEmissive=e(this._textureEmissive),this._textureOcclusion=e(this._textureOcclusion),this._textureMetallicRoughness=e(this._textureMetallicRoughness),this._disposed=!0}ensureResources(e){return 0===this._numLoading?2:1}get textureBindParameters(){return new x(this._texture?.glTexture??null,this._textureNormal?.glTexture??null,this._textureEmissive?.glTexture??null,this._textureOcclusion?.glTexture??null,this._textureMetallicRoughness?.glTexture??null)}updateTexture(t){null!=this._texture&&t===this._texture.id||(this._texture=e(this._texture),this._acquire(t,e=>this._texture=e))}_acquire(s,r){if(null==s)return void r(null);const i=this._textures.acquire(s);if(t(i))return++this._numLoading,void i.then(t=>{if(this._disposed)return e(t),void r(null);r(t)}).finally(()=>--this._numLoading);r(i)}}class h extends r{constructor(e=null){super(),this.textureEmissive=e}}class x extends h{constructor(e,t,s,r,i,a,c){super(s),this.texture=e,this.textureNormal=t,this.textureOcclusion=r,this.textureMetallicRoughness=i,this.scale=a,this.normalTextureTransformMatrix=c}}function p(e){e.vertex.code.add(m`float screenSizePerspectiveViewAngleDependentFactor(float absCosAngle) {
return absCosAngle * absCosAngle * absCosAngle;
}`),e.vertex.code.add(m`vec3 screenSizePerspectiveScaleFactor(float absCosAngle, float distanceToCamera, vec3 params) {
return vec3(
min(params.x / (distanceToCamera - params.y), 1.0),
screenSizePerspectiveViewAngleDependentFactor(absCosAngle),
params.z
);
}`),e.vertex.code.add(m`float applyScreenSizePerspectiveScaleFactorFloat(float size, vec3 factor) {
return mix(size * clamp(factor.x, factor.z, 1.0), size, factor.y);
}`),e.vertex.code.add(m`float screenSizePerspectiveScaleFloat(float size, float absCosAngle, float distanceToCamera, vec3 params) {
return applyScreenSizePerspectiveScaleFactorFloat(
size,
screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params)
);
}`),e.vertex.code.add(m`vec2 applyScreenSizePerspectiveScaleFactorVec2(vec2 size, vec3 factor) {
return mix(size * clamp(factor.x, factor.z, 1.0), size, factor.y);
}`),e.vertex.code.add(m`vec2 screenSizePerspectiveScaleVec2(vec2 size, float absCosAngle, float distanceToCamera, vec3 params) {
return applyScreenSizePerspectiveScaleFactorVec2(size, screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params));
}`)}function g(e){e.uniforms.add(new d("screenSizePerspective",e=>_(e.screenSizePerspective)))}function S(e){e.uniforms.add(new d("screenSizePerspectiveAlignment",e=>_(e.screenSizePerspectiveAlignment||e.screenSizePerspective)))}function _(e){return n(z,e.parameters.divisor,e.parameters.offset,e.minScaleFactor)}const z=u();class P{constructor(e){this.screenLength=c(e.screenLength),this.minWorldLength=e.minWorldLength??0,this.maxWorldLength=e.maxWorldLength??1/0}}function w(e,t){const s=e.vertex;t.hasVerticalOffset?(T(s),t.hasScreenSizePerspective&&(e.include(p),S(s),i(e.vertex,t)),s.code.add(m`
      vec3 calculateVerticalOffset(vec3 worldPos, vec3 localOrigin) {
        float viewDistance = length((view * vec4(worldPos, 1.0)).xyz);
        ${t.spherical?m`vec3 worldNormal = normalize(worldPos + localOrigin);`:m`vec3 worldNormal = vec3(0.0, 0.0, 1.0);`}
        ${t.hasScreenSizePerspective?m`
            float cosAngle = dot(worldNormal, normalize(worldPos - cameraPosition));
            float verticalOffsetScreenHeight = screenSizePerspectiveScaleFloat(verticalOffset.x, abs(cosAngle), viewDistance, screenSizePerspectiveAlignment);`:m`
            float verticalOffsetScreenHeight = verticalOffset.x;`}
        // Screen sized offset in world space, used for example for line callouts
        float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * viewDistance, verticalOffset.z, verticalOffset.w);
        return worldNormal * worldOffset;
      }

      vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) {
        return worldPos + calculateVerticalOffset(worldPos, localOrigin);
      }
    `)):s.code.add(m`vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) { return worldPos; }`)}const O=l();function T(e){e.uniforms.add(new a("verticalOffset",(e,t)=>{const{minWorldLength:s,maxWorldLength:r,screenLength:i}=e.verticalOffset,a=Math.tan(.5*t.camera.fovY)/(.5*t.camera.fullViewport[3]),c=t.camera.pixelRatio||1;return o(O,i*c,a,s,r)}))}class A extends f{constructor(e,t){super(e,"bool",0,(s,r)=>s.setUniform1b(e,t(r)))}}export{A as B,x as G,p as S,w as V,T as a,S as b,g as c,v as d,P as e};
