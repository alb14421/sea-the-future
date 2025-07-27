/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{t as e,b as t}from"../core/lang.js";import{g as i}from"./watch.js";import{m as a,c as r,D as s}from"./mat4.js";import{c as o,I as n}from"./mat4f64.js";import{m as l,t as c,x as d,k as p,j as h,g as m,e as u,h as f,d as v,i as g,l as S}from"./vec3.js";import{c as b,f as y}from"./vec3f64.js";import{g as _,b as x}from"./sphere.js";import{m as D}from"./mathUtils2.js";import{aq as w,ar as L,O as P,as as C,V as T,b as A,c as z,e as O,i as j,at as V,h as R,t as W,a as F,E,B as M,F as k,S as N,o as B,C as I,j as U,k as $,R as H,af as J,s as G,m as X,p as q,q as K,r as Q,u as Y,v as Z,w as ee,I as te,J as ie,K as ae,L as re,P as se,x as oe,D as ne,M as le,z as ce,A as de,Q as pe}from"./Matrix4PassUniform.js";import{D as he,S as me,m as ue}from"./BufferView.js";import{EventEmitter as fe}from"../core/Evented.js";import ve from"../core/Handles.js";import{d as ge}from"./maybe.js";import{O as Se}from"./Octree.js";import{L as be}from"./Logger.js";import{c as ye}from"./mathUtils.js";import{g as _e}from"./screenUtils.js";import{s as xe}from"../core/scheduling.js";import{c as De}from"./vec2.js";import{Z as we,c as Le,O as Pe}from"./vec4f64.js";import{c as Ce,d as Te,f as Ae,i as ze}from"./lineSegment.js";import{c as Oe,l as je,o as Ve,g as Re}from"./plane.js";import{F as We,d as Fe,T as Ee,i as Me,h as ke,b as Ne,n as Be,c as Ie}from"./Emissions.glsl.js";import{g as Ue,I as $e}from"./glsl.js";import{R as He,b as Je}from"./sdfPrimitives.js";import{p as Ge}from"./floatRGBA.js";import{a as Xe,T as qe}from"./Texture.js";import{s as Ke}from"./vec4.js";import{S as Qe}from"./ShaderBuilder.js";import{a as Ye}from"./AlphaCutoff.js";import{n as Ze}from"./InterleavedLayout.js";import{a as et}from"./enums.js";import{m as tt,d as it,u as at}from"./renderState.js";import{_ as rt}from"./tslib.es6.js";function st(e){return"position"===e}function ot(e,t){return null==e&&(e=[]),e.push(t),e}function nt(e,t){if(null==e)return null;const i=e.filter(e=>e!==t);return 0===i.length?null:i}function lt(e,t,i,a,r){ct[0]=e.get(t,0),ct[1]=e.get(t,1),ct[2]=e.get(t,2),w(ct,dt,3),i.set(r,0,dt[0]),a.set(r,0,dt[1]),i.set(r,1,dt[2]),a.set(r,1,dt[3]),i.set(r,2,dt[4]),a.set(r,2,dt[5])}const ct=b(),dt=new Float32Array(6);class pt{constructor(e={}){this.id=i(),this._highlightIds=new Set,this._shaderTransformation=null,this._visible=!0,this.castShadow=e.castShadow??!0,this.usesVerticalDistanceToGround=e.usesVerticalDistanceToGround??!1,this.graphicUid=e.graphicUid,this.layerViewUid=e.layerViewUid,e.isElevationSource&&(this.lastValidElevationBB=new ht),this._geometries=e.geometries?Array.from(e.geometries):new Array}dispose(){this._geometries.length=0}get layer(){return this._layer}set layer(e){he(null==this._layer||null==e,"Object3D can only be added to a single Layer"),this._layer=e}addGeometry(e){e.visible=this._visible,this._geometries.push(e);for(const t of this._highlightIds)e.addHighlight(t);this._emit("geometryAdded",{object:this,geometry:e}),this._highlightIds.size&&this._emit("highlightChanged",this),this._invalidateBoundingVolume()}removeGeometry(e){const t=this._geometries.splice(e,1)[0];if(t){for(const e of this._highlightIds)t.removeHighlight(e);this._emit("geometryRemoved",{object:this,geometry:t}),this._highlightIds.size&&this._emit("highlightChanged",this),this._invalidateBoundingVolume()}}removeAllGeometries(){for(;this._geometries.length>0;)this.removeGeometry(0)}geometryVertexAttributeUpdated(e,t,i=!1){this._emit("attributesChanged",{object:this,geometry:e,attribute:t,sync:i}),st(t)&&this._invalidateBoundingVolume()}get visible(){return this._visible}set visible(e){if(this._visible!==e){this._visible=e;for(const e of this._geometries)e.visible=this._visible;this._emit("visibilityChanged",this)}}maskOccludee(){const e=new L;for(const t of this._geometries)t.occludees=ot(t.occludees,e);return this._emit("occlusionChanged",this),e}removeOcclude(e){for(const t of this._geometries)t.occludees=nt(t.occludees,e);this._emit("occlusionChanged",this)}highlight(e){const t=new P(e);for(const e of this._geometries)e.addHighlight(t);return this._emit("highlightChanged",this),this._highlightIds.add(t),t}removeHighlight(e){this._highlightIds.delete(e);for(const t of this._geometries)t.removeHighlight(e);this._emit("highlightChanged",this)}removeStateID(e){0===e.channel?this.removeHighlight(e):this.removeOcclude(e)}getCombinedStaticTransformation(e,t){return a(t,this.transformation,e.transformation)}getCombinedShaderTransformation(e,t=o()){return a(t,this.effectiveTransformation,e.transformation)}get boundingVolumeWorldSpace(){return this._bvWorldSpace||(this._bvWorldSpace=this._bvWorldSpace||new mt,this._validateBoundingVolume(this._bvWorldSpace,0)),this._bvWorldSpace}get boundingVolumeObjectSpace(){return this._bvObjectSpace||(this._bvObjectSpace=this._bvObjectSpace||new mt,this._validateBoundingVolume(this._bvObjectSpace,1)),this._bvObjectSpace}_validateBoundingVolume(e,t){const i=1===t;for(const t of this._geometries){const a=t.boundingInfo;a&&ut(a,e,i?t.transformation:this.getCombinedShaderTransformation(t))}l(_(e.bounds),e.min,e.max,.5);for(const t of this._geometries){const a=t.boundingInfo;if(null==a)continue;const r=i?t.transformation:this.getCombinedShaderTransformation(t),s=D(r);c(St,a.center,r);const o=d(St,_(e.bounds)),n=a.radius*s;e.bounds[3]=Math.max(e.bounds[3],o+n)}}_invalidateBoundingVolume(){const e=this._bvWorldSpace?.bounds;this._bvObjectSpace=this._bvWorldSpace=void 0,this.layer&&e&&this.layer.notifyObjectBBChanged(this,e)}_emit(e,t){this.layer?.events.emit(e,t)}get geometries(){return this._geometries}get transformation(){return this._transformation??n}set transformation(e){this._transformation=r(this._transformation??o(),e),this._invalidateBoundingVolume(),this._emit("transformationChanged",this)}get shaderTransformation(){return this._shaderTransformation}set shaderTransformation(e){this._shaderTransformation=e?r(this._shaderTransformation??o(),e):null,this._invalidateBoundingVolume(),this._emit("shaderTransformationChanged",this)}get effectiveTransformation(){return this.shaderTransformation??this.transformation}get test(){}}class ht{constructor(){this._data=[Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE]}get min(){return y(this._data[0],this._data[1],this._data[2])}get max(){return y(this._data[3],this._data[4],this._data[5])}minWith(e){const{_data:t}=this;t[0]=Math.min(t[0],e[0]),t[1]=Math.min(t[1],e[1]),t[2]=Math.min(t[2],e[2])}maxWith(e){const{_data:t}=this;t[3]=Math.max(t[3],e[0]),t[4]=Math.max(t[4],e[1]),t[5]=Math.max(t[5],e[2])}assignMinMax(e,t){for(let i=0;i<3;++i)this._data[0+i]=e[i],this._data[3+i]=t[i]}isEmpty(){return this._data[3]<this._data[0]&&this._data[4]<this._data[1]&&this._data[5]<this._data[2]}}class mt extends ht{constructor(){super(...arguments),this.bounds=x()}}function ut(e,t,i){const a=e.bbMin,r=e.bbMax;if(s(i)){const e=p(ft,i[12],i[13],i[14]);return h(vt,a,e),h(gt,r,e),t.minWith(vt),void t.maxWith(gt)}if(c(vt,a,i),m(a,r))return t.minWith(vt),void t.maxWith(vt);c(gt,r,i),t.minWith(vt),t.minWith(gt),t.maxWith(vt),t.maxWith(gt);for(let e=0;e<3;++e)u(vt,a),u(gt,r),vt[e]=r[e],gt[e]=a[e],c(vt,vt,i),c(gt,gt,i),t.minWith(vt),t.minWith(gt),t.maxWith(vt),t.maxWith(gt)}const ft=b(),vt=b(),gt=b(),St=b(),bt=["layerObjectAdded","layerObjectRemoved","layerObjectsAdded","layerObjectsRemoved","transformationChanged","shaderTransformationChanged","visibilityChanged","occlusionChanged","highlightChanged","geometryAdded","geometryRemoved","attributesChanged"];class yt{constructor(e,t,a=""){this.stage=e,this.apiLayerViewUid=a,this.id=i(),this.events=new fe,this.visible=!0,this.sliceable=!1,this._objectsAdded=new Array,this._handles=new ve,this._objects=new Map,this._pickable=!0,this.visible=t?.visible??!0,this._pickable=t?.pickable??!0,this.updatePolicy=t?.updatePolicy??0,e.addLayer(this);for(const t of bt)this._handles.add(this.events.on(t,i=>e.handleEvent(t,i)))}destroy(){this._handles.size&&(this._handles.destroy(),this.stage.removeLayer(this),this.invalidateSpatialQueryAccelerator())}get objects(){return this._objects}getObject(t){return e(this._objects.get(t))}set pickable(e){this._pickable=e}get pickable(){return this._pickable&&this.visible}add(e){this._objects.set(e.id,e),e.layer=this,this.events.emit("layerObjectAdded",e),null!=this._octree&&this._objectsAdded.push(e)}remove(e){this._objects.delete(e.id)&&(this.events.emit("layerObjectRemoved",e),e.layer=null,null!=this._octree&&(t(this._objectsAdded,e)||this._octree.remove([e])))}addMany(e){for(const t of e)this._objects.set(t.id,t),t.layer=this;this.events.emit("layerObjectsAdded",e),null!=this._octree&&this._objectsAdded.push(...e)}removeMany(e){const i=new Array;for(const t of e)this._objects.delete(t.id)&&i.push(t);if(0!==i.length&&(this.events.emit("layerObjectsRemoved",i),i.forEach(e=>e.layer=null),null!=this._octree)){for(let e=0;e<i.length;)t(this._objectsAdded,i[e])?(i[e]=i[i.length-1],i.length-=1):++e;this._octree.remove(i)}}sync(){1!==this.updatePolicy&&this.stage.syncLayer(this.id)}notifyObjectBBChanged(e,t){null==this._octree||this._objectsAdded.includes(e)||this._octree.update(e,t)}getSpatialQueryAccelerator(){return null==this._octree&&this._objects.size>50?(this._octree=new Se(e=>e.boundingVolumeWorldSpace.bounds),this._octree.add(this._objects.values())):null!=this._octree&&this._objectsAdded.length>0&&(this._octree.add(this._objectsAdded),this._objectsAdded.length=0),this._octree}invalidateSpatialQueryAccelerator(){this._octree=ge(this._octree),this._objectsAdded.length=0}get test(){}}function _t(e,t){const{vertex:i,attributes:a}=e;i.uniforms.add(new We("intrinsicWidth",e=>e.width)),t.hasVVSize?(a.add("sizeFeatureAttribute","float"),i.uniforms.add(new Fe("vvSizeMinSize",e=>e.vvSize.minSize),new Fe("vvSizeMaxSize",e=>e.vvSize.maxSize),new Fe("vvSizeOffset",e=>e.vvSize.offset),new Fe("vvSizeFactor",e=>e.vvSize.factor),new Fe("vvSizeFallback",e=>e.vvSize.fallback)),i.code.add(Ue`float getSize() {
if (isnan(sizeFeatureAttribute)) {
return vvSizeFallback.x;
}
return intrinsicWidth * clamp(vvSizeOffset + sizeFeatureAttribute * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).x;
}`)):(a.add("size","float"),i.code.add(Ue`float getSize(){
return intrinsicWidth * size;
}`)),t.hasVVOpacity?(a.add("opacityFeatureAttribute","float"),i.constants.add("vvOpacityNumber","int",8),i.uniforms.add(new C("vvOpacityValues",e=>e.vvOpacity.values,8),new C("vvOpacityOpacities",e=>e.vvOpacity.opacityValues,8),new We("vvOpacityFallback",e=>e.vvOpacity.fallback,{supportsNaN:!0})),i.code.add(Ue`
    float interpolateOpacity(float value) {
      if (value <= vvOpacityValues[0]) {
        return vvOpacityOpacities[0];
      }

      for (int i = 1; i < vvOpacityNumber; ++i) {
        if (vvOpacityValues[i] >= value) {
          float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);
          return mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f);
        }
      }

      return vvOpacityOpacities[vvOpacityNumber - 1];
    }

    vec4 applyOpacity(vec4 color) {
      if (isnan(opacityFeatureAttribute)) {
        // If there is a color vv then it will already have taken care of applying the fallback
        return ${$e(t.hasVVColor,"color","vec4(color.rgb, vvOpacityFallback)")};
      }

      return vec4(color.rgb, interpolateOpacity(opacityFeatureAttribute));
    }
    `)):i.code.add(Ue`vec4 applyOpacity(vec4 color) {
return color;
}`),t.hasVVColor?(e.include(T,t),a.add("colorFeatureAttribute","float"),i.code.add(Ue`vec4 getColor() {
vec4 color = interpolateVVColor(colorFeatureAttribute);
if (isnan(color.r)) {
return vec4(0);
}
return applyOpacity(color);
}`)):(a.add("color","vec4"),i.code.add(Ue`vec4 getColor() {
return applyOpacity(color);
}`))}class xt{constructor(e,t,a){this._createTexture=e,this._parametersKey=t,this._repository=new Map,this._orphanCache=a.newCache(`procedural-texture-repository:${i()}`,e=>e.dispose())}destroy(){for(const{texture:e}of this._repository.values())e.dispose();this._repository.clear(),this._orphanCache.destroy()}swap(e,t=null){const i=this._acquire(e);return this.release(t),i}release(e){if(null==e)return;const t=this._parametersKey(e),i=this._repository.get(t);if(i&&(i.refCount--,0===i.refCount)){this._repository.delete(t);const{texture:e}=i;this._orphanCache.put(t,e)}}_acquire(e){if(null==e)return null;const t=this._parametersKey(e),i=this._repository.get(t);if(i)return i.refCount++,i.texture;const a=this._orphanCache.pop(t)??this._createTexture(e),r=new Dt(a);return this._repository.set(t,r),a}}class Dt{constructor(e){this.texture=e,this.refCount=1}}function wt(e,t){return new xt(t=>{const{encodedData:i,textureSize:a}=function(e){const t=Lt(e),i=1/e.pixelRatio,a=Pt(e),r=Ct(e),s=(Math.floor(.5*(r-1))+.5)*i,o=[];let n=1;for(const e of t){for(let t=0;t<e;t++){const a=n*(Math.min(t,e-1-t)+.5)*i/s*.5+.5;o.push(a)}n=-n}const l=Math.round(t[0]/2),c=[...o.slice(l),...o.slice(0,l)],d=new Uint8Array(4*a);let p=0;for(const e of c)Ge(e,d,p),p+=4;return{encodedData:d,textureSize:a}}(t),r=new Xe(a,1);return r.internalFormat=6408,r.wrapMode=10497,new qe(e,r,i)},e=>`${e.pattern.join(",")}-r${e.pixelRatio}`,t)}function Lt(e){return e.pattern.map(t=>Math.round(t*e.pixelRatio))}function Pt(e){if(null==e)return 1;const t=Lt(e);return Math.floor(t.reduce((e,t)=>e+t))}function Ct(e){return Lt(e).reduce((e,t)=>Math.max(e,t))}const Tt=Le();function At(e,t){if(!t.stippleEnabled)return void e.fragment.code.add(Ue`float getStippleAlpha() { return 1.0; }
void discardByStippleAlpha(float stippleAlpha, float threshold) {}
vec4 blendStipple(vec4 color, float stippleAlpha) { return color; }`);const i=!(t.draped&&t.stipplePreferContinuous),{vertex:a,fragment:r}=e;r.include(He),t.draped||(A(a,t),a.uniforms.add(new z("worldToScreenPerDistanceRatio",({camera:e})=>1/e.perScreenPixelRatio)).code.add(Ue`float computeWorldToScreenRatio(vec3 segmentCenter) {
float segmentDistanceToCamera = length(segmentCenter - cameraPosition);
return worldToScreenPerDistanceRatio / segmentDistanceToCamera;
}`)),e.varyings.add("vStippleDistance","float"),e.varyings.add("vStippleDistanceLimits","vec2"),e.varyings.add("vStipplePatternStretch","float"),a.code.add(Ue`
    float discretizeWorldToScreenRatio(float worldToScreenRatio) {
      float step = ${Ue.float(Ot)};

      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);
      return discreteWorldToScreenRatio;
    }
  `),a.code.add(Ue`vec2 computeStippleDistanceLimits(float startPseudoScreen, float segmentLengthPseudoScreen, float segmentLengthScreen, float patternLength) {`),a.code.add(Ue`
    if (segmentLengthPseudoScreen >= ${i?"patternLength":"1e4"}) {
  `),O(a),a.code.add(Ue`float repetitions = segmentLengthScreen / (patternLength * pixelRatio);
float flooredRepetitions = max(1.0, floor(repetitions + 0.5));
float segmentLengthScreenRounded = flooredRepetitions * patternLength;
float stretch = repetitions / flooredRepetitions;
vStipplePatternStretch = max(0.75, stretch);
return vec2(0.0, segmentLengthScreenRounded);
}
return vec2(startPseudoScreen, startPseudoScreen + segmentLengthPseudoScreen);
}`),r.uniforms.add(new Ee("stipplePatternTexture",e=>e.stippleTexture),new We("stipplePatternSDFNormalizer",e=>{return(t=e.stipplePattern)?(Math.floor(.5*(Ct(t)-1))+.5)/t.pixelRatio:1;var t}),new We("stipplePatternPixelSizeInv",e=>1/zt(e))),t.stippleOffColorEnabled&&r.uniforms.add(new j("stippleOffColor",e=>{return null==(t=e.stippleOffColor)?we:4===t.length?t:Ke(Tt,t[0],t[1],t[2],1);var t})),r.code.add(Ue`float getStippleSDF(out bool isClamped) {
float stippleDistanceClamped = clamp(vStippleDistance, vStippleDistanceLimits.x, vStippleDistanceLimits.y);
vec2 aaCorrectedLimits = vStippleDistanceLimits + vec2(1.0, -1.0) / gl_FragCoord.w;
isClamped = vStippleDistance < aaCorrectedLimits.x || vStippleDistance > aaCorrectedLimits.y;
float u = stippleDistanceClamped * gl_FragCoord.w * stipplePatternPixelSizeInv * vLineSizeInv;
u = fract(u);
float encodedSDF = rgbaTofloat(texture(stipplePatternTexture, vec2(u, 0.5)));
float sdf = (encodedSDF * 2.0 - 1.0) * stipplePatternSDFNormalizer;
return (sdf - 0.5) * vStipplePatternStretch + 0.5;
}
float getStippleSDF() {
bool ignored;
return getStippleSDF(ignored);
}
float getStippleAlpha() {
bool isClamped;
float stippleSDF = getStippleSDF(isClamped);
float antiAliasedResult = clamp(stippleSDF * vLineWidth + 0.5, 0.0, 1.0);
return isClamped ? floor(antiAliasedResult + 0.5) : antiAliasedResult;
}`),r.code.add(Ue`
    void discardByStippleAlpha(float stippleAlpha, float threshold) {
     ${$e(!t.stippleOffColorEnabled,"if (stippleAlpha < threshold) { discard; }")}
    }

    vec4 blendStipple(vec4 color, float stippleAlpha) {
      return ${t.stippleOffColorEnabled?"mix(color, stippleOffColor, stippleAlpha)":"vec4(color.rgb, color.a * stippleAlpha)"};
    }
  `)}function zt(e){const t=e.stipplePattern;return t?Pt(e.stipplePattern)/t.pixelRatio:1}const Ot=.4,jt=64,Vt=32,Rt=10,Wt=.25;function Ft(e,t){const i=Je(e,64,32,6.4),a=new Xe(64);return a.internalFormat=6408,a.wrapMode=33071,new qe(t,a,i)}function Et(e,t){const i=e.vertex;O(i),null==i.uniforms.get("markerScale")&&i.constants.add("markerScale","float",1),i.constants.add("markerSizePerLineWidth","float",10).code.add(Ue`float getLineWidth() {
return max(getSize(), 1.0) * pixelRatio;
}
float getScreenMarkerSize() {
return markerSizePerLineWidth * markerScale * getLineWidth();
}`),2===t.space&&(i.constants.add("maxSegmentLengthFraction","float",.45),i.uniforms.add(new z("perRenderPixelRatio",e=>e.camera.perRenderPixelRatio)),i.code.add(Ue`bool areWorldMarkersHidden(vec4 pos, vec4 other) {
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
}`))}function Mt(e,t){if(!t.hasAnimation)return;const{attributes:i,varyings:a,vertex:r,fragment:s}=e;i.add("timeStamps","vec3"),a.add("vTimeStamp","float"),a.add("vFirstTime","float"),a.add("vLastTime","float"),r.main.add(Ue`vTimeStamp = timeStamps.x;
vFirstTime = timeStamps.y;
vLastTime = timeStamps.z;`);const{animation:o}=t;3===o&&s.constants.add("decayRate","float",2.3),s.code.add(Ue`
    float getTrailOpacity(float x) {
      ${function(e){switch(e){case 2:return"return x >= 0.0 && x <= 1.0 ? 1.0 : 0.0;";case 3:return"float cutOff = exp(-decayRate);\n        return (exp(-decayRate * x) - cutOff) / (1.0 - cutOff);";default:return"return 1.0;"}}(o)}
    }`),s.uniforms.add(new We("timeElapsed",e=>e.timeElapsed),new We("trailLength",e=>e.trailLength)).code.add(Ue`vec4 animate(vec4 color) {
float totalTimeWithTrail = vLastTime - vFirstTime + trailLength;
float timeAtHead = mod(timeElapsed - vFirstTime, totalTimeWithTrail) + vFirstTime;
float t = timeAtHead - vTimeStamp;
vec4 animatedColor = color * step(0.0, t);
animatedColor.a *= getTrailOpacity(t / trailLength);
return animatedColor;
}`)}const kt=Object.freeze(Object.defineProperty({__proto__:null,build:function(e){const t=new Qe,{attributes:i,varyings:a,vertex:r,fragment:s}=t,{applyMarkerOffset:o,draped:n,output:l,capType:c,stippleEnabled:d,falloffEnabled:p,roundJoins:h,wireframe:m,innerColorEnabled:u,hasAnimation:f}=e;s.include(V),t.include(_t,e),t.include(At,e),t.include(R,e),t.include(W,e),t.include(Mt,e);const v=o&&!n;v&&(r.uniforms.add(new We("markerScale",e=>e.markerScale)),t.include(Et,{space:2})),F(r,e),r.uniforms.add(new E("inverseProjectionMatrix",e=>e.camera.inverseProjectionMatrix),new M("nearFar",e=>e.camera.nearFar),new We("miterLimit",e=>"miter"!==e.join?0:e.miterLimit),new k("viewport",e=>e.camera.fullViewport)),r.constants.add("LARGE_HALF_FLOAT","float",65500),i.add("position","vec3"),i.add("previousDelta","vec4"),i.add("nextDelta","vec4"),i.add("lineParameters","vec2"),i.add("u0","float"),a.add("vColor","vec4"),a.add("vpos","vec3",{invariant:!0}),a.add("vLineDistance","float"),a.add("vLineWidth","float");const g=d;g&&a.add("vLineSizeInv","float");const S=2===c,b=d&&S,y=p||b;y&&a.add("vLineDistanceNorm","float"),S&&(a.add("vSegmentSDF","float"),a.add("vReverseSegmentSDF","float")),r.code.add(Ue`vec2 perpendicular(vec2 v) {
return vec2(v.y, -v.x);
}
float interp(float ncp, vec4 a, vec4 b) {
return (-ncp - a.z) / (b.z - a.z);
}
vec2 rotate(vec2 v, float a) {
float s = sin(a);
float c = cos(a);
mat2 m = mat2(c, -s, s, c);
return m * v;
}`),r.code.add(Ue`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`),r.code.add(Ue`void clipAndTransform(inout vec4 pos, inout vec4 prev, inout vec4 next, in bool isStartVertex) {
float vnp = nearFar[0] * 0.99;
if(pos.z > -nearFar[0]) {
if (!isStartVertex) {
if(prev.z < -nearFar[0]) {
pos = mix(prev, pos, interp(vnp, prev, pos));
next = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
} else {
if(next.z < -nearFar[0]) {
pos = mix(pos, next, interp(vnp, pos, next));
prev = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
}
} else {
if (prev.z > -nearFar[0]) {
prev = mix(pos, prev, interp(vnp, pos, prev));
}
if (next.z > -nearFar[0]) {
next = mix(next, pos, interp(vnp, next, pos));
}
}
forwardViewPosDepth(pos.xyz);
pos = projectAndScale(pos);
next = projectAndScale(next);
prev = projectAndScale(prev);
}`),O(r),r.constants.add("aaWidth","float",d?0:1).main.add(Ue`
    // unpack values from vertex type
    bool isStartVertex = abs(abs(lineParameters.y)-3.0) == 1.0;
    vec3 prevPosition = position + previousDelta.xyz * previousDelta.w;
    vec3 nextPosition = position + nextDelta.xyz * nextDelta.w;

    float coverage = 1.0;

    // Check for special value of lineParameters.y which is used by the Renderer when graphics are removed before the
    // VBO is recompacted. If this is the case, then we just project outside of clip space.
    if (lineParameters.y == 0.0) {
      // Project out of clip space
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
    }
    else {
      bool isJoin = abs(lineParameters.y) < 3.0;
      float lineSize = getSize();

      if (lineSize < 1.0) {
        coverage = lineSize; // convert sub-pixel coverage to alpha
        lineSize = 1.0;
      }
      lineSize += aaWidth;

      float lineWidth = lineSize * pixelRatio;
      vLineWidth = lineWidth;
      ${g?Ue`vLineSizeInv = 1.0 / lineSize;`:""}

      vec4 pos  = view * vec4(position, 1.0);
      vec4 prev = view * vec4(prevPosition, 1.0);
      vec4 next = view * vec4(nextPosition, 1.0);
  `),v&&r.main.add(Ue`vec4 other = isStartVertex ? next : prev;
bool markersHidden = areWorldMarkersHidden(pos, other);
if(!isJoin && !markersHidden) {
pos.xyz += normalize(other.xyz - pos.xyz) * getWorldMarkerSize(pos) * 0.5;
}`),r.main.add(Ue`clipAndTransform(pos, prev, next, isStartVertex);
vec2 left = (pos.xy - prev.xy);
vec2 right = (next.xy - pos.xy);
float leftLen = length(left);
float rightLen = length(right);`),(d||S)&&r.main.add(Ue`
      float isEndVertex = float(!isStartVertex);
      vec2 segmentOrigin = mix(pos.xy, prev.xy, isEndVertex);
      vec2 segment = mix(right, left, isEndVertex);
      ${S?Ue`vec2 segmentEnd = mix(next.xy, pos.xy, isEndVertex);`:""}
    `),r.main.add(Ue`left = (leftLen > 0.001) ? left/leftLen : vec2(0.0, 0.0);
right = (rightLen > 0.001) ? right/rightLen : vec2(0.0, 0.0);
vec2 capDisplacementDir = vec2(0, 0);
vec2 joinDisplacementDir = vec2(0, 0);
float displacementLen = lineWidth;
if (isJoin) {
bool isOutside = (left.x * right.y - left.y * right.x) * lineParameters.y > 0.0;
joinDisplacementDir = normalize(left + right);
joinDisplacementDir = perpendicular(joinDisplacementDir);
if (leftLen > 0.001 && rightLen > 0.001) {
float nDotSeg = dot(joinDisplacementDir, left);
displacementLen /= length(nDotSeg * left - joinDisplacementDir);
if (!isOutside) {
displacementLen = min(displacementLen, min(leftLen, rightLen)/abs(nDotSeg));
}
}
float subdivisionFactor = lineParameters.x;
if (isOutside && (displacementLen > miterLimit * lineWidth)) {`),h?r.main.add(Ue`
        vec2 startDir = leftLen < 0.001 ? right : left;
        startDir = perpendicular(startDir);

        vec2 endDir = rightLen < 0.001 ? left : right;
        endDir = perpendicular(endDir);

        float factor = ${d?Ue`min(1.0, subdivisionFactor * ${Ue.float(1.5)})`:Ue`subdivisionFactor`};

        float rotationAngle = acos(clamp(dot(startDir, endDir), -1.0, 1.0));
        joinDisplacementDir = rotate(startDir, -sign(lineParameters.y) * factor * rotationAngle);
      `):r.main.add(Ue`if (leftLen < 0.001) {
joinDisplacementDir = right;
}
else if (rightLen < 0.001) {
joinDisplacementDir = left;
}
else {
joinDisplacementDir = (isStartVertex || subdivisionFactor > 0.0) ? right : left;
}
joinDisplacementDir = perpendicular(joinDisplacementDir);`);const _=0!==c;return r.main.add(Ue`
        displacementLen = lineWidth;
      }
    } else {
      // CAP handling ---------------------------------------------------
      joinDisplacementDir = isStartVertex ? right : left;
      joinDisplacementDir = perpendicular(joinDisplacementDir);

      ${_?Ue`capDisplacementDir = isStartVertex ? -right : left;`:""}
    }
  `),r.main.add(Ue`
    // Displacement (in pixels) caused by join/or cap
    vec2 dpos = joinDisplacementDir * sign(lineParameters.y) * displacementLen + capDisplacementDir * displacementLen;
    float lineDistNorm = sign(lineParameters.y) * pos.w;

    vLineDistance =  lineWidth * lineDistNorm;
    ${y?Ue`vLineDistanceNorm = lineDistNorm;`:""}

    pos.xy += dpos;
  `),S&&r.main.add(Ue`vec2 segmentDir = normalize(segment);
vSegmentSDF = (isJoin && isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentOrigin, segmentDir) * pos.w) ;
vReverseSegmentSDF = (isJoin && !isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentEnd, -segmentDir) * pos.w);`),d&&(n?r.uniforms.add(new z("worldToScreenRatio",e=>1/e.screenToPCSRatio)):r.main.add(Ue`vec3 segmentCenter = mix((nextPosition + position) * 0.5, (position + prevPosition) * 0.5, isEndVertex);
float worldToScreenRatio = computeWorldToScreenRatio(segmentCenter);`),r.main.add(Ue`float segmentLengthScreenDouble = length(segment);
float segmentLengthScreen = segmentLengthScreenDouble * 0.5;
float discreteWorldToScreenRatio = discretizeWorldToScreenRatio(worldToScreenRatio);
float segmentLengthRender = length(mix(nextPosition - position, position - prevPosition, isEndVertex));
vStipplePatternStretch = worldToScreenRatio / discreteWorldToScreenRatio;`),n?r.main.add(Ue`float segmentLengthPseudoScreen = segmentLengthScreen / pixelRatio * discreteWorldToScreenRatio / worldToScreenRatio;
float startPseudoScreen = u0 * discreteWorldToScreenRatio - mix(0.0, segmentLengthPseudoScreen, isEndVertex);`):r.main.add(Ue`float startPseudoScreen = mix(u0, u0 - segmentLengthRender, isEndVertex) * discreteWorldToScreenRatio;
float segmentLengthPseudoScreen = segmentLengthRender * discreteWorldToScreenRatio;`),r.uniforms.add(new We("stipplePatternPixelSize",e=>zt(e))),r.main.add(Ue`float patternLength = lineSize * stipplePatternPixelSize;
vStippleDistanceLimits = computeStippleDistanceLimits(startPseudoScreen, segmentLengthPseudoScreen, segmentLengthScreen, patternLength);
vStippleDistance = mix(vStippleDistanceLimits.x, vStippleDistanceLimits.y, isEndVertex);
if (segmentLengthScreenDouble >= 0.001) {
vec2 stippleDisplacement = pos.xy - segmentOrigin;
float stippleDisplacementFactor = dot(segment, stippleDisplacement) / (segmentLengthScreenDouble * segmentLengthScreenDouble);
vStippleDistance += (stippleDisplacementFactor - isEndVertex) * (vStippleDistanceLimits.y - vStippleDistanceLimits.x);
}
vStippleDistanceLimits *= pos.w;
vStippleDistance *= pos.w;
vStippleDistanceLimits = isJoin ?
vStippleDistanceLimits :
isStartVertex ?
vec2(-1e34, vStippleDistanceLimits.y) :
vec2(vStippleDistanceLimits.x, 1e34);`)),r.main.add(Ue`
      // Convert back into NDC
      pos.xy = (pos.xy / viewport.zw) * pos.w;

      vColor = getColor();
      vColor.a *= coverage;

      ${m&&!n?"pos.z -= 0.001 * pos.w;":""}

      // transform final position to camera space for slicing
      vpos = (inverseProjectionMatrix * pos).xyz;
      gl_Position = pos;
      forwardObjectAndLayerIdColor();
    }`),t.fragment.include(N,e),t.include(B,e),s.include(I),s.main.add(Ue`discardBySlice(vpos);
discardByTerrainDepth();`),m?s.main.add(Ue`vec4 finalColor = vec4(1.0, 0.0, 1.0, 1.0);`):(S&&s.main.add(Ue`
        float sdf = min(vSegmentSDF, vReverseSegmentSDF);
        vec2 fragmentPosition = vec2(
          min(sdf, 0.0),
          vLineDistance
        ) * gl_FragCoord.w;

        float fragmentRadius = length(fragmentPosition);
        float fragmentCapSDF = (fragmentRadius - vLineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
        float capCoverage = clamp(0.5 - fragmentCapSDF, 0.0, 1.0);

        if (capCoverage < ${Ue.float(Ye)}) {
          discard;
        }
      `),b?s.main.add(Ue`
      vec2 stipplePosition = vec2(
        min(getStippleSDF() * 2.0 - 1.0, 0.0),
        vLineDistanceNorm * gl_FragCoord.w
      );
      float stippleRadius = length(stipplePosition * vLineWidth);
      float stippleCapSDF = (stippleRadius - vLineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
      float stippleCoverage = clamp(0.5 - stippleCapSDF, 0.0, 1.0);
      float stippleAlpha = step(${Ue.float(Ye)}, stippleCoverage);
      `):s.main.add(Ue`float stippleAlpha = getStippleAlpha();`),9!==l&&s.main.add(Ue`discardByStippleAlpha(stippleAlpha, ${Ue.float(Ye)});`),s.uniforms.add(new j("intrinsicColor",e=>e.color)),s.main.add(Ue`vec4 color = intrinsicColor * vColor;`),u&&(s.uniforms.add(new j("innerColor",e=>e.innerColor??e.color),new We("innerWidth",(e,t)=>e.innerWidth*t.camera.pixelRatio)),s.main.add(Ue`float distToInner = abs(vLineDistance * gl_FragCoord.w) - innerWidth;
float innerAA = clamp(0.5 - distToInner, 0.0, 1.0);
float innerAlpha = innerColor.a + color.a * (1.0 - innerColor.a);
color = mix(color, vec4(innerColor.rgb, innerAlpha), innerAA);`)),s.main.add(Ue`vec4 finalColor = blendStipple(color, stippleAlpha);`),p&&(s.uniforms.add(new We("falloff",e=>e.falloff)),s.main.add(Ue`finalColor.a *= pow(max(0.0, 1.0 - abs(vLineDistanceNorm * gl_FragCoord.w)), falloff);`)),d||s.main.add(Ue`float featherStartDistance = max(vLineWidth - 2.0, 0.0);
float value = abs(vLineDistance) * gl_FragCoord.w;
float feather = (value - featherStartDistance) / (vLineWidth - featherStartDistance);
finalColor.a *= 1.0 - clamp(feather, 0.0, 1.0);`),f&&s.main.add(Ue`
        finalColor = animate(finalColor);

        ${$e(9!==l,Ue`
            if (finalColor.a <= ${Ue.float(Ye)}) {
              discard;
            }`)}
      `)),s.main.add(Ue`outputColorHighlightOID(finalColor, vpos, finalColor.rgb);`),t},ribbonlineNumRoundJoinSubdivisions:1},Symbol.toStringTag,{value:"Module"}));class Nt extends ${constructor(e,t){super(e,t,new H(kt,()=>Promise.resolve().then(()=>kt)),It(t).locations),this.primitiveType=t.wireframe?et.LINES:et.TRIANGLE_STRIP}_makePipelineState(e,t){const{oitPass:i,output:a,hasOccludees:r,hasPolygonOffset:s}=e,o=0===i,n=2===i;return tt({blending:Me(a)?Z(i):null,depthTest:{func:Y(i)},depthWrite:Q(e),drawBuffers:K(a,ee(i,a)),colorWrite:it,stencilWrite:r?q:null,stencilTest:r?t?G:X:null,polygonOffset:o||n?s?Bt:null:J})}initializePipeline(e){if(e.occluder){const t=e.hasPolygonOffset?Bt:null,{output:i,hasOccludees:a}=e;this._occluderPipelineTransparent=tt({blending:at,polygonOffset:t,depthTest:ie,depthWrite:null,colorWrite:it,stencilWrite:null,stencilTest:a?te:null,drawBuffers:K(i)}),this._occluderPipelineOpaque=tt({blending:at,polygonOffset:t,depthTest:a?ie:se,depthWrite:null,colorWrite:it,stencilWrite:a?re:null,stencilTest:a?ae:null,drawBuffers:K(i)}),this._occluderPipelineMaskWrite=tt({blending:null,polygonOffset:t,depthTest:se,depthWrite:null,colorWrite:null,stencilWrite:a?q:null,stencilTest:a?G:null,drawBuffers:K(i)})}return this._occludeePipeline=this._makePipelineState(e,!0),this._makePipelineState(e,!1)}getPipeline(e,t){if(e)return this._occludeePipeline;switch(t){case 11:return this._occluderPipelineTransparent??super.getPipeline();case 10:return this._occluderPipelineOpaque??super.getPipeline();default:return this._occluderPipelineMaskWrite??super.getPipeline()}}}const Bt={factor:0,units:-4};function It(e){const t=Ze().vec3f("position").vec4f16("previousDelta").vec4f16("nextDelta").f32("u0").vec2f16("lineParameters");return e.hasVVColor?t.f32("colorFeatureAttribute"):t.vec4u8("color",{glNormalized:!0}),e.hasVVSize?t.f32("sizeFeatureAttribute"):t.f32("size"),e.hasVVOpacity&&t.f32("opacityFeatureAttribute"),U()&&t.vec4u8("olidColor"),e.hasAnimation&&t.vec3f16("timeStamps"),t}class Ut extends ne{constructor(){super(...arguments),this.capType=0,this.emissionSource=0,this.hasPolygonOffset=!1,this.writeDepth=!1,this.draped=!1,this.stippleEnabled=!1,this.stippleOffColorEnabled=!1,this.stipplePreferContinuous=!0,this.roundJoins=!1,this.applyMarkerOffset=!1,this.hasVVSize=!1,this.hasVVColor=!1,this.hasVVOpacity=!1,this.falloffEnabled=!1,this.innerColorEnabled=!1,this.hasOccludees=!1,this.occluder=!1,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.wireframe=!1,this.discardInvisibleFragments=!1,this.animation=2,this.textureCoordinateType=0,this.occlusionPass=!1,this.hasVVInstancing=!1,this.hasSliceTranslatedView=!0,this.overlayEnabled=!1,this.snowCover=!1}get hasAnimation(){return 0!==this.animation}}rt([oe({count:3})],Ut.prototype,"capType",void 0),rt([oe({count:8})],Ut.prototype,"emissionSource",void 0),rt([oe()],Ut.prototype,"hasPolygonOffset",void 0),rt([oe()],Ut.prototype,"writeDepth",void 0),rt([oe()],Ut.prototype,"draped",void 0),rt([oe()],Ut.prototype,"stippleEnabled",void 0),rt([oe()],Ut.prototype,"stippleOffColorEnabled",void 0),rt([oe()],Ut.prototype,"stipplePreferContinuous",void 0),rt([oe()],Ut.prototype,"roundJoins",void 0),rt([oe()],Ut.prototype,"applyMarkerOffset",void 0),rt([oe()],Ut.prototype,"hasVVSize",void 0),rt([oe()],Ut.prototype,"hasVVColor",void 0),rt([oe()],Ut.prototype,"hasVVOpacity",void 0),rt([oe()],Ut.prototype,"falloffEnabled",void 0),rt([oe()],Ut.prototype,"innerColorEnabled",void 0),rt([oe()],Ut.prototype,"hasOccludees",void 0),rt([oe()],Ut.prototype,"occluder",void 0),rt([oe()],Ut.prototype,"terrainDepthTest",void 0),rt([oe()],Ut.prototype,"cullAboveTerrain",void 0),rt([oe()],Ut.prototype,"wireframe",void 0),rt([oe()],Ut.prototype,"discardInvisibleFragments",void 0),rt([oe({count:4})],Ut.prototype,"animation",void 0);class $t extends le{constructor(e){super(e,Jt),this._configuration=new Ut,this.produces=new Map([[2,e=>ke(e)||Me(e)&&8===this.parameters.renderOccluded],[3,e=>Ne(e)],[10,e=>Be(e)&&8===this.parameters.renderOccluded],[11,e=>Be(e)&&8===this.parameters.renderOccluded],[4,e=>Me(e)&&this.parameters.writeDepth&&8!==this.parameters.renderOccluded],[8,e=>Me(e)&&!this.parameters.writeDepth&&8!==this.parameters.renderOccluded],[18,e=>Ie(e)]])}getConfiguration(e,t){super.getConfiguration(e,t,this._configuration),this._configuration.oitPass=t.oitPass,this._configuration.draped=18===t.slot;const i=null!=this.parameters.stipplePattern&&8!==e;var a;return this._configuration.stippleEnabled=i,this._configuration.stippleOffColorEnabled=i&&null!=this.parameters.stippleOffColor,this._configuration.stipplePreferContinuous=i&&this.parameters.stipplePreferContinuous,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.roundJoins="round"===this.parameters.join,this._configuration.capType=this.parameters.cap,this._configuration.applyMarkerOffset=null!=this.parameters.markerParameters&&1===(a=this.parameters.markerParameters).anchor&&a.hideOnShortSegments&&"begin-end"===a.placement&&a.worldSpace,this._configuration.hasPolygonOffset=this.parameters.hasPolygonOffset,this._configuration.writeDepth=this.parameters.writeDepth,this._configuration.hasVVSize=this.parameters.hasVVSize,this._configuration.hasVVColor=this.parameters.hasVVColor,this._configuration.hasVVOpacity=this.parameters.hasVVOpacity,this._configuration.innerColorEnabled=this.parameters.innerWidth>0&&null!=this.parameters.innerColor,this._configuration.falloffEnabled=this.parameters.falloff>0,this._configuration.hasOccludees=t.hasOccludees,this._configuration.occluder=8===this.parameters.renderOccluded,this._configuration.terrainDepthTest=t.terrainDepthTest&&Me(e),this._configuration.cullAboveTerrain=t.cullAboveTerrain,this._configuration.wireframe=this.parameters.wireframe,this._configuration.animation=this.parameters.animation,this._configuration.emissionSource=this.hasEmissions?1:0,this._configuration}get visible(){return this.parameters.color[3]>=Ye||null!=this.parameters.stipplePattern&&(this.parameters.stippleOffColor?.[3]??0)>Ye}setParameters(e,t){e.animation=this.parameters.animation,super.setParameters(e,t)}intersectDraped({attributes:e,screenToWorldRatio:t},i,a,r,s){if(!i.options.selectionMode)return;const o=e.get("size");let n=this.parameters.width;if(this.parameters.vvSize){const t=e.get("sizeFeatureAttribute").data[0];Number.isNaN(t)?n*=this.parameters.vvSize.fallback[0]:n*=ye(this.parameters.vvSize.offset[0]+t*this.parameters.vvSize.factor[0],this.parameters.vvSize.minSize[0],this.parameters.vvSize.maxSize[0])}else o&&(n*=o.data[0]);const l=a[0],c=a[1],d=(n/2+4)*t;let p=Number.MAX_VALUE,h=0;const m=e.get("position").data,u=qt(this.parameters,e)?m.length-2:m.length-5;for(let e=0;e<u;e+=3){const t=m[e],i=m[e+1],a=(e+3)%m.length,r=l-t,s=c-i,o=m[a]-t,n=m[a+1]-i,d=ye((o*r+n*s)/(o*o+n*n),0,1),u=o*d-r,f=n*d-s,v=u*u+f*f;v<p&&(p=v,h=e/3)}p<d*d&&r(s.distance,s.normal,h)}intersect(e,t,i,a,r,s){const{options:o,camera:n,rayBegin:l,rayEnd:c}=i;if(!o.selectionMode||!e.visible||!n)return;if(!me(t))return void be.getLogger("esri.views.3d.webgl-engine.materials.RibbonLineMaterial").error("intersection assumes a translation-only matrix");const m=e.attributes,b=m.get("position").data;let y=this.parameters.width;if(this.parameters.vvSize){const e=m.get("sizeFeatureAttribute").data[0];Number.isNaN(e)||(y*=ye(this.parameters.vvSize.offset[0]+e*this.parameters.vvSize.factor[0],this.parameters.vvSize.minSize[0],this.parameters.vvSize.maxSize[0]))}else m.has("size")&&(y*=m.get("size").data[0]);const _=ei;De(_,i.point);const x=y*n.pixelRatio/2+4*n.pixelRatio;p(pi[0],_[0]-x,_[1]+x,0),p(pi[1],_[0]+x,_[1]+x,0),p(pi[2],_[0]+x,_[1]-x,0),p(pi[3],_[0]-x,_[1]-x,0);for(let e=0;e<4;e++)if(!n.unprojectFromRenderScreen(pi[e],hi[e]))return;je(n.eye,hi[0],hi[1],mi),je(n.eye,hi[1],hi[2],ui),je(n.eye,hi[2],hi[3],fi),je(n.eye,hi[3],hi[0],vi);let D=Number.MAX_VALUE,w=0;const L=qt(this.parameters,m)?b.length-2:b.length-5;for(let e=0;e<L;e+=3){Kt[0]=b[e]+t[12],Kt[1]=b[e+1]+t[13],Kt[2]=b[e+2]+t[14];const i=(e+3)%b.length;if(Qt[0]=b[i]+t[12],Qt[1]=b[i+1]+t[13],Qt[2]=b[i+2]+t[14],Ve(mi,Kt)<0&&Ve(mi,Qt)<0||Ve(ui,Kt)<0&&Ve(ui,Qt)<0||Ve(fi,Kt)<0&&Ve(fi,Qt)<0||Ve(vi,Kt)<0&&Ve(vi,Qt)<0)continue;if(n.projectToRenderScreen(Kt,ti),n.projectToRenderScreen(Qt,ii),ti[2]<0&&ii[2]>0){f(Yt,Kt,Qt);const e=n.frustum,t=-Ve(e[4],Kt)/v(Yt,Re(e[4]));g(Yt,Yt,t),h(Kt,Kt,Yt),n.projectToRenderScreen(Kt,ti)}else if(ti[2]>0&&ii[2]<0){f(Yt,Qt,Kt);const e=n.frustum,t=-Ve(e[4],Qt)/v(Yt,Re(e[4]));g(Yt,Yt,t),h(Qt,Qt,Yt),n.projectToRenderScreen(Qt,ii)}else if(ti[2]<0&&ii[2]<0)continue;ti[2]=0,ii[2]=0;const a=Te(Ae(ti,ii,si),_);a<D&&(D=a,u(ai,Kt),u(ri,Qt),w=e/3)}if(D<x*x){let e=Number.MAX_VALUE;if(ze(Ae(ai,ri,si),Ae(l,c,oi),Zt)){f(Zt,Zt,l);const t=S(Zt);g(Zt,Zt,1/t),e=t/d(l,c)}s(e,Zt,w)}}get hasEmissions(){return this.parameters.emissiveStrength>0}createBufferWriter(){return new Gt(It(this.parameters),this.parameters)}createGLMaterial(e){return new Ht(e)}validateParameters(e){"miter"!==e.join&&(e.miterLimit=0),null!=e.markerParameters&&(e.markerScale=e.markerParameters.width/e.width)}update(e){const{hasAnimation:t,animationSpeed:i}=this.parameters;return!!t&&(this.setParameters({timeElapsed:xe(e.time)*i},!1),0!==e.dt)}}class Ht extends de{constructor(){super(...arguments),this._stipplePattern=null}dispose(){super.dispose(),this._stippleTextures?.release(this._stipplePattern),this._stipplePattern=null}beginSlot(e){const t=this._material.parameters.stipplePattern;return this._stipplePattern!==t&&(this._material.setParameters({stippleTexture:this._stippleTextures.swap(t,this._stipplePattern)}),this._stipplePattern=t),this.getTechnique(Nt,e)}}class Jt extends ce{constructor(){super(...arguments),this.width=0,this.color=Pe,this.join="miter",this.cap=0,this.miterLimit=5,this.writeDepth=!0,this.hasPolygonOffset=!1,this.stippleTexture=null,this.stipplePreferContinuous=!0,this.markerParameters=null,this.markerScale=1,this.hasSlicePlane=!1,this.vvFastUpdate=!1,this.isClosed=!1,this.falloff=0,this.innerWidth=0,this.wireframe=!1,this.timeElapsed=0,this.animation=0,this.animationSpeed=1,this.trailLength=1,this.emissiveStrength=0}get transparent(){return this.color[3]<1||this.hasAnimation||null!=this.stipplePattern&&(this.stippleOffColor?.[3]??0)<1}get hasAnimation(){return 0!==this.animation}}class Gt{constructor(e,t){this.layout=e,this._parameters=t;const i=t.stipplePattern?1:0;switch(this._parameters.join){case"miter":case"bevel":this.numJoinSubdivisions=i;break;case"round":this.numJoinSubdivisions=1+i}}_isClosed(e){return qt(this._parameters,e)}allocate(e){return this.layout.createBuffer(e)}elementCount(e){const t=e.get("position").indices.length/2+1,i=this._isClosed(e);let a=i?2:4;return a+=((i?t:t-1)-(i?0:1))*(2*this.numJoinSubdivisions+4),a+=2,this._parameters.wireframe&&(a=2+4*(a-2)),a}write(e,t,i,a,r,s){const o=i.get("position"),n=o.indices,l=o.data.length/3,h=i.get("distanceToStart")?.data;n&&n.length!==2*(l-1)&&console.warn("RibbonLineMaterial does not support indices");const m=(this.layout.fields.has("sizeFeatureAttribute")?i.get("sizeFeatureAttribute")?.data[0]:i.get("size")?.data[0])??1;let f=[1,1,1,1],v=0;const g=this.layout.fields.has("colorFeatureAttribute");g?v=i.get("colorFeatureAttribute").data[0]:i.has("color")&&(f=i.get("color").data);const S=i.get("timeStamps")?.data,b=S&&this.layout.fields.has("timeStamps"),y=this.layout.fields.has("opacityFeatureAttribute"),_=y?i.get("opacityFeatureAttribute").data[0]:0,x=new Float32Array(r.buffer),D=ue(r.buffer),w=new Uint8Array(r.buffer),L=this.layout.stride/4;let P=s*L;const C=P;let T=0;const A=h?(e,t,i)=>T=h[i]:(e,t,i)=>T+=d(e,t),z=x.BYTES_PER_ELEMENT/D.BYTES_PER_ELEMENT,O=4/z,j=(e,t,i,r,s,o,n,l)=>{x[P++]=t[0],x[P++]=t[1],x[P++]=t[2],pe(e,t,D,P*z),P+=O,pe(i,t,D,P*z),P+=O,x[P++]=l;let c=P*z;if(D[c++]=s,D[c++]=o,P=Math.ceil(c/z),g)x[P]=v;else{const e=Math.min(4*n,f.length-4),t=4*P;w[t]=255*f[e],w[t+1]=255*f[e+1],w[t+2]=255*f[e+2],w[t+3]=255*f[e+3]}if(P++,x[P++]=m,y&&(x[P++]=_),U()){let e=4*P;a?(w[e++]=a[0],w[e++]=a[1],w[e++]=a[2],w[e++]=a[3]):(w[e++]=0,w[e++]=0,w[e++]=0,w[e++]=0),P=Math.ceil(.25*e)}b&&(c=P*z,D[c++]=r[0],D[c++]=r[1],D[c++]=r[2],P=Math.ceil(c/z))};P+=L,p(li,o.data[0],o.data[1],o.data[2]),b&&p(di,S[0],S[1],S[2]),e&&c(li,li,e);const V=this._isClosed(i);if(V){const t=o.data.length-3;p(ni,o.data[t],o.data[t+1],o.data[t+2]),e&&c(ni,ni,e)}else p(ci,o.data[3],o.data[4],o.data[5]),e&&c(ci,ci,e),j(li,li,ci,di,1,-4,0,0),j(li,li,ci,di,1,4,0,0),u(ni,li),u(li,ci),b&&p(di,S[3],S[4],S[5]);const R=V?0:1,W=V?l:l-1;for(let t=R;t<W;t++){const i=(t+1)%l*3;p(ci,o.data[i],o.data[i+1],o.data[i+2]),e&&c(ci,ci,e),A(ni,li,t),j(ni,li,ci,di,0,-1,t,T),j(ni,li,ci,di,0,1,t,T);const a=this.numJoinSubdivisions;for(let e=0;e<a;++e){const i=(e+1)/(a+1);j(ni,li,ci,di,i,-1,t,T),j(ni,li,ci,di,i,1,t,T)}j(ni,li,ci,di,1,-2,t,T),j(ni,li,ci,di,1,2,t,T),u(ni,li),u(li,ci),b&&p(di,S[i],S[i+1],S[i+2])}return V?(p(ci,o.data[3],o.data[4],o.data[5]),e&&c(ci,ci,e),T=A(ni,li,W),j(ni,li,ci,di,0,-1,R,T),j(ni,li,ci,di,0,1,R,T)):(T=A(ni,li,W),j(ni,li,li,di,0,-5,W,T),j(ni,li,li,di,0,5,W,T)),Xt(x,C+L,x,C,L),P=Xt(x,P-L,x,P,L),this._parameters.wireframe&&this._addWireframeVertices(r,C,P,L),null}_addWireframeVertices(e,t,i,a){const r=new Float32Array(e.buffer,i*Float32Array.BYTES_PER_ELEMENT),s=new Float32Array(e.buffer,t*Float32Array.BYTES_PER_ELEMENT,i-t);let o=0;const n=e=>o=Xt(s,e,r,o,a);for(let e=0;e<s.length-1;e+=2*a)n(e),n(e+2*a),n(e+1*a),n(e+2*a),n(e+1*a),n(e+3*a)}}function Xt(e,t,i,a,r){for(let s=0;s<r;s++)i[a++]=e[t++];return a}function qt(e,t){return!!e.isClosed&&t.get("position").indices.length>2}const Kt=b(),Qt=b(),Yt=b(),Zt=b(),ei=b(),ti=_e(),ii=_e(),ai=b(),ri=b(),si=Ce(),oi=Ce(),ni=b(),li=b(),ci=b(),di=b(),pi=[_e(),_e(),_e(),_e()],hi=[b(),b(),b(),b()],mi=Oe(),ui=Oe(),fi=Oe(),vi=Oe();export{mt as B,Et as M,pt as O,xt as P,$t as R,yt as W,_t as a,Vt as b,Wt as c,st as d,lt as e,Rt as f,Ft as g,wt as h,jt as m};
