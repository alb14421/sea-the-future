/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{k as e,g as t,e as a,n as o,h as i,l as r,i as n,d as s,q as l}from"./vec3.js";import{c,g as d,Z as u,f as h}from"./vec3f64.js";import{F as m,p,q as f,T as v,V as g,o as x,d as b,l as w,i as y,U as M,r as T,m as S,s as _}from"./Emissions.glsl.js";import{B as C,V as z,d as F}from"./BooleanBindUniform.js";import{ah as I,j as O,az as N,aA as j,aB as V,ai as E,ak as L,aC as P,aD as R,d as G,a0 as A,a as D,V as B,S as H,H as U,h as W,_ as k,k as Y,R as q,N as J,c as Z,B as $,g as X,F as K,at as Q,aE as ee,C as te,b as ae,i as oe,t as ie,aF as re,o as ne,l as se,r as le,s as ce,m as de,p as ue,q as he,u as me,v as pe,w as fe,D as ve,x as ge,M as xe,y as be,a5 as we}from"./Matrix4PassUniform.js";import{a as ye,c as Me,b as Te,d as Se,T as _e,e as Ce,F as ze,V as Fe,i as Ie,D as Oe}from"./VertexColor.glsl.js";import{a as Ne}from"./Intersector2.js";import{c as je,f as Ve}from"./vec4f64.js";import{g as Ee,n as Le}from"./InterleavedLayout.js";import{q as Pe,Q as Re,S as Ge,T as Ae}from"../core/lang.js";import{c as De,I as Be}from"./mat3f64.js";import{g as He,I as Ue}from"./glsl.js";import{D as We,g as ke,o as Ye,t as qe}from"./BufferView.js";import{V as Je}from"./VertexBuffer.js";import{_ as Ze}from"./tslib.es6.js";import $e from"../core/Accessor.js";import{EventEmitter as Xe}from"../core/Evented.js";import{property as Ke}from"../core/accessorSupport/decorators/property.js";import"./Logger.js";import{subclass as Qe}from"../core/accessorSupport/decorators/subclass.js";import{f as et,i as tt,t as at,n as ot}from"./mat3.js";import{m as it}from"./mat4.js";import{c as rt,I as nt}from"./mat4f64.js";import{e as st}from"./mathUtils2.js";import{I as lt,F as ct,a as dt}from"./SceneLighting.js";import{a as ut}from"./AlphaCutoff.js";import{O as ht,c as mt}from"./vec2f64.js";import{F as pt,S as ft,P as vt,C as gt}from"./CameraSpace.glsl.js";import{c as xt}from"./mathUtils.js";import{f as bt}from"./maybe.js";import{watch as wt}from"../core/reactiveUtils.js";import{M as yt}from"../core/scheduling.js";import{s as Mt}from"./vec2.js";import{InternalRenderCategory as Tt}from"../views/3d/webgl.js";import St from"../views/3d/webgl/RenderNode.js";import{S as _t}from"./ShaderBuilder.js";import{m as Ct,d as zt,c as Ft}from"./renderState.js";import{d as It}from"./enums.js";import{a as Ot,T as Nt}from"./Texture.js";import{d as jt}from"./colorUtils.js";import{s as Vt}from"./vec4.js";import{M as Et}from"./Matrix4sPassUniform.js";import{a as Lt}from"./VertexAttributeLocations.js";function Pt(e,t){switch(t.normalType){case 1:e.attributes.add("normalCompressed","vec2"),e.vertex.code.add(He`vec3 decompressNormal(vec2 normal) {
float z = 1.0 - abs(normal.x) - abs(normal.y);
return vec3(normal + sign(normal) * min(z, 0.0), z);
}
vec3 normalModel() {
return decompressNormal(normalCompressed);
}`);break;case 0:e.attributes.add("normal","vec3"),e.vertex.code.add(He`vec3 normalModel() {
return normal;
}`);break;case 2:e.fragment.code.add(He`vec3 screenDerivativeNormal(vec3 positionView) {
return normalize(cross(dFdx(positionView), dFdy(positionView)));
}`);break;default:Pe(t.normalType);case 3:}}function Rt(e,t){switch(t.normalType){case 0:case 1:e.include(Pt,t),e.varyings.add("vNormalWorld","vec3"),e.varyings.add("vNormalView","vec3"),e.vertex.uniforms.add(new Me("transformNormalGlobalFromModel",e=>e.transformNormalGlobalFromModel),new I("transformNormalViewFromGlobal",e=>e.transformNormalViewFromGlobal)).code.add(He`void forwardNormal() {
vNormalWorld = transformNormalGlobalFromModel * normalModel();
vNormalView = transformNormalViewFromGlobal * vNormalWorld;
}`);break;case 2:e.vertex.code.add(He`void forwardNormal() {}`);break;default:Pe(t.normalType);case 3:}}class Gt extends ye{constructor(){super(...arguments),this.transformNormalViewFromGlobal=De()}}class At extends Te{constructor(){super(...arguments),this.transformNormalGlobalFromModel=De(),this.toMapSpace=je()}}class Dt{constructor(e,t,a){this.elementSize=t.stride,this._buffer=new Je(e,Ee(t,1)),this.resize(a)}destroy(){this._buffer.dispose()}get capacity(){return this._capacity}get array(){return this._array}get buffer(){return this._buffer}get usedMemory(){return this._array.byteLength+this._buffer.usedMemory}copyRange(e,t,a,o=0){const i=new Uint8Array(this.array,e*this.elementSize,(t-e)*this.elementSize);new Uint8Array(a.array,o*this.elementSize).set(i)}transferAll(){this._buffer.setData(this._array)}transferRange(e,t){const a=e*this.elementSize,o=t*this.elementSize;this._buffer.setSubData(new Uint8Array(this._array),a,a,o)}resize(e){const t=e*this.elementSize,a=new ArrayBuffer(t);this._array&&(e>=this._capacity?new Uint8Array(a).set(new Uint8Array(this._array)):new Uint8Array(a).set(new Uint8Array(this._array).subarray(0,e*this.elementSize))),this._array=a,this._buffer.setSize(t),this._capacity=e}}class Bt{constructor(e){this.localTransform=e.localTransform,this.globalTransform=e.globalTransform,this.modelOrigin=e.modelOrigin,this.model=e.instanceModel,this.modelNormal=e.instanceModelNormal,this.modelScaleFactors=e.modelScaleFactors,this.boundingSphere=e.boundingSphere,this.featureAttribute=e.getField("instanceFeatureAttribute",ke),this.color=e.getField("instanceColor",Ye),this.olidColor=e.getField("instanceOlidColor",Ye),this.state=e.getField("state",qe),this.lodLevel=e.getField("lodLevel",qe)}}let Ht=class extends $e{constructor(e,t){super(e),this.events=new Xe,this._capacity=0,this._size=0,this._next=0,this._highlightOptionsMap=new Map,this._highlightOptionsMapPrev=new Map,this._layout=function(e){return Wt(Ut.clone(),e).u8("state").u8("lodLevel")}(t),this._capacity=Zt,this._buffer=this._layout.createBuffer(this._capacity),this._view=new Bt(this._buffer)}get capacity(){return this._capacity}get size(){return this._size}get view(){return this._view}addInstance(){this._size+1>this._capacity&&this._grow();const e=this._findSlot();return this._view.state.set(e,1),this._size++,this.events.emit("instances-changed"),e}removeInstance(e){const t=this._view.state;We(e>=0&&e<this._capacity&&!!(1&t.get(e)),"invalid instance handle"),this._getStateFlag(e,18)?this._setStateFlags(e,32):this.freeInstance(e),this.events.emit("instances-changed")}freeInstance(e){const t=this._view.state;We(e>=0&&e<this._capacity&&!!(1&t.get(e)),"invalid instance handle"),t.set(e,0),this._size--}setLocalTransform(e,t,a=!0){this._view.localTransform.setMat(e,t),a&&this.updateModelTransform(e)}getLocalTransform(e,t){this._view.localTransform.getMat(e,t)}setGlobalTransform(e,t,a=!0){this._view.globalTransform.setMat(e,t),a&&this.updateModelTransform(e)}getGlobalTransform(e,t){this._view.globalTransform.getMat(e,t)}updateModelTransform(t){const a=this._view,o=kt,i=Yt;a.localTransform.getMat(t,qt),a.globalTransform.getMat(t,Jt);const r=it(Jt,Jt,qt);e(o,r[12],r[13],r[14]),a.modelOrigin.setVec(t,o),et(i,r),a.model.setMat(t,i);const n=st(kt,r);n.sort(),a.modelScaleFactors.set(t,0,n[1]),a.modelScaleFactors.set(t,1,n[2]),tt(i,i),at(i,i),a.modelNormal.setMat(t,i),this._setStateFlags(t,64),this.events.emit("instance-transform-changed",{index:t})}getModelTransform(e,t){const a=this._view;a.model.getMat(e,Yt),a.modelOrigin.getVec(e,kt),t[0]=Yt[0],t[1]=Yt[1],t[2]=Yt[2],t[3]=0,t[4]=Yt[3],t[5]=Yt[4],t[6]=Yt[5],t[7]=0,t[8]=Yt[6],t[9]=Yt[7],t[10]=Yt[8],t[11]=0,t[12]=kt[0],t[13]=kt[1],t[14]=kt[2],t[15]=1}applyShaderTransformation(e,t){null!=this.shaderTransformation&&this.shaderTransformation.applyTransform(this,e,t)}getCombinedModelTransform(e,t){return this.getModelTransform(e,t),null!=this.shaderTransformation&&this.shaderTransformation.applyTransform(this,e,t),t}getCombinedLocalTransform(e,t){this._view.localTransform.getMat(e,t),null!=this.shaderTransformation&&this.shaderTransformation.applyTransform(this,e,t)}getCombinedMaxScaleFactor(e){let t=this._view.modelScaleFactors.get(e,1);return null!=this.shaderTransformation&&(this.shaderTransformation.scaleFactor(kt,this,e),t*=Math.max(kt[0],kt[1],kt[2])),t}getCombinedMedianScaleFactor(e){let t=this._view.modelScaleFactors.get(e,0);var a,o,i;return null!=this.shaderTransformation&&(this.shaderTransformation.scaleFactor(kt,this,e),t*=(a=kt[0],o=kt[1],i=kt[2],Math.max(Math.min(a,o),Math.min(Math.max(a,o),i)))),t}getModel(e,t){this._view.model.getMat(e,t)}setFeatureAttribute(e,t){this._view.featureAttribute?.setVec(e,t)}getFeatureAttribute(e,t){this._view.featureAttribute?.getVec(e,t)}setColor(e,t){this._view.color?.setVec(e,t)}setObjectAndLayerIdColor(e,t){this._view.olidColor?.setVec(e,t)}setVisible(e,t){t!==this.getVisible(e)&&(this._setStateFlag(e,4,t),this.events.emit("instance-visibility-changed",{index:e}))}getVisible(e){return this._getStateFlag(e,4)}setHighlight(e,t){const{_highlightOptionsMap:a}=this,o=a.get(e);t?t!==o&&(a.set(e,t),this._setStateFlag(e,8,!0),this.events.emit("instance-highlight-changed")):o&&(a.delete(e),this._setStateFlag(e,8,!1),this.events.emit("instance-highlight-changed"))}get highlightOptionsMap(){return this._highlightOptionsMap}getHighlightStateFlag(e){return this._getStateFlag(e,8)}geHighlightOptionsPrev(e){const t=this._highlightOptionsMapPrev.get(e)??null;return this._highlightOptionsMapPrev.delete(e),t}getHighlightName(e){const t=this.highlightOptionsMap.get(e)??null;return t?this._highlightOptionsMapPrev.set(e,t):this._highlightOptionsMapPrev.delete(e),t}getState(e){return this._view.state.get(e)}getLodLevel(e){return this._view.lodLevel.get(e)}countFlags(e){let t=0;for(let a=0;a<this._capacity;++a)this.getState(a)&e&&++t;return t}_setStateFlags(e,t){const a=this._view.state;t=a.get(e)|t,a.set(e,t)}_clearStateFlags(e,t){const a=this._view.state;t=a.get(e)&~t,a.set(e,t)}_setStateFlag(e,t,a){a?this._setStateFlags(e,t):this._clearStateFlags(e,t)}_getStateFlag(e,t){return!!(this._view.state.get(e)&t)}_grow(){this._capacity=Math.max(Zt,Math.floor(this._capacity*Re)),this._buffer=this._layout.createBuffer(this._capacity).copyFrom(this._buffer),this._view=new Bt(this._buffer)}_findSlot(){const e=this._view.state;let t=this._next;for(;1&e.get(t);)t=t+1===this._capacity?0:t+1;return this._next=t+1===this._capacity?0:t+1,t}};Ze([Ke({constructOnly:!0})],Ht.prototype,"shaderTransformation",void 0),Ze([Ke()],Ht.prototype,"_size",void 0),Ze([Ke({readOnly:!0})],Ht.prototype,"size",null),Ht=Ze([Qe("esri.views.3d.webgl-engine.lib.lodRendering.InstanceData")],Ht);const Ut=Le().mat4f64("localTransform").mat4f64("globalTransform").vec4f64("boundingSphere").vec3f64("modelOrigin").mat3f("instanceModel").mat3f("instanceModelNormal").vec2f("modelScaleFactors");function Wt(e,t){return t.instancedFeatureAttribute&&e.vec4f("instanceFeatureAttribute"),t.instancedColor&&e.vec4u8("instanceColor"),O()&&e.vec4u8("instanceOlidColor"),e}const kt=c(),Yt=De(),qt=rt(),Jt=rt(),Zt=64;class $t{constructor(e){this.model=e.instanceModel,this.modelNormal=e.instanceModelNormal,this.modelOriginHi=e.instanceModelOriginHi,this.modelOriginLo=e.instanceModelOriginLo,this.featureAttribute=e.getField("instanceFeatureAttribute",ke),this.color=e.getField("instanceColor",Ye),this.olidColor=e.getField("instanceOlidColor",Ye)}}class Xt{constructor(e,t){this._rctx=e,this._layout=t,this._headIndex=0,this._tailIndex=0,this._firstIndex=null,this._captureFirstIndex=!0,this._updating=!1,this._prevHeadIndex=0,this._resized=!1,this._capacity=1}destroy(){this._buffer&&this._buffer.destroy()}get buffer(){return this._buffer.buffer}get view(){return this._view}get capacity(){return this._capacity}get size(){const e=this._headIndex,t=this._tailIndex;return e>=t?e-t:e+this._capacity-t}get isEmpty(){return this._headIndex===this._tailIndex}get isFull(){return this._tailIndex===(this._headIndex+1)%this._capacity}get headIndex(){return this._headIndex}get tailIndex(){return this._tailIndex}get firstIndex(){return this._firstIndex}get usedMemory(){return this._buffer?.usedMemory??0}reset(){this._headIndex=0,this._tailIndex=0,this._firstIndex=null}startUpdateCycle(){this._captureFirstIndex=!0}beginUpdate(){We(!this._updating,"already updating"),this._updating=!0,this._prevHeadIndex=this._headIndex}endUpdate(){We(this._updating,"not updating"),this.size<Ge*this.capacity&&this._shrink(),this._resized?(this._buffer.transferAll(),this._resized=!1):this._transferRange(this._prevHeadIndex,this._headIndex),this._updating=!1}allocateHead(){We(this._updating,"not updating"),this.isFull&&this._grow();const e=this.headIndex;return this._captureFirstIndex&&(this._firstIndex=e,this._captureFirstIndex=!1),this._incrementHead(),We(this._headIndex!==this._tailIndex,"invalid pointers"),e}freeTail(){We(this._updating,"not updating"),We(this.size>0,"invalid size");const e=this._tailIndex===this._firstIndex;this._incrementTail(),e&&(this._firstIndex=this._tailIndex)}_grow(){const e=Math.max(Zt,Math.floor(this._capacity*Re));this._resize(e)}_shrink(){const e=Math.max(Zt,Math.floor(this._capacity*Ae));this._resize(e)}_resize(e){if(We(this._updating,"not updating"),e===this._capacity)return;const t=new Dt(this._rctx,this._layout,e);if(this._buffer){this._firstIndex&&(this._firstIndex=(this._firstIndex+this._capacity-this._tailIndex)%this._capacity);const e=this.size,a=this._compactInstances(t);We(a===e,"invalid compaction"),this._buffer.destroy(),this._tailIndex=0,this._headIndex=a,this._prevHeadIndex=0}this._resized=!0,this._capacity=e,this._buffer=t,this._view=new $t(this._layout.createView(this._buffer.array))}_compactInstances(e){const t=this._headIndex,a=this._tailIndex;return a<t?(this._buffer.copyRange(a,t,e),t-a):a>t?(this._buffer.copyRange(a,this._capacity,e),t>0&&this._buffer.copyRange(0,t,e,this._capacity-a),t+(this._capacity-a)):0}_incrementHead(e=1){this._headIndex=(this._headIndex+e)%this._capacity}_incrementTail(e=1){this._tailIndex=(this._tailIndex+e)%this._capacity}_transferRange(e,t){e<t?this._buffer.transferRange(e,t):e>t&&(t>0&&this._buffer.transferRange(0,t),this._buffer.transferRange(e,this._capacity))}}const Kt=Le().vec3f("instanceModelOriginHi").vec3f("instanceModelOriginLo").mat3f("instanceModel").mat3f("instanceModelNormal");function Qt(e){return Wt(Kt.clone(),e)}function ea({normalTexture:e,metallicRoughnessTexture:a,metallicFactor:o,roughnessFactor:i,emissiveTexture:r,emissiveFactor:n,occlusionTexture:s}){return null==e&&null==a&&null==r&&(null==n||t(n,u))&&null==s&&(null==i||1===i)&&(null==o||1===o)}function ta({normalTexture:e,metallicRoughnessTexture:a,metallicFactor:o,roughnessFactor:i,emissiveTexture:r,emissiveFactor:n,occlusionTexture:s}){return null==e&&null==a&&null==r&&(null==n||t(n,u))&&null==s&&(null==i||1===i)&&(null==o||1===o||0===o)}const aa=d(1,1,.5),oa=d(0,.6,.2),ia=d(0,1,.2);function ra(e){e.vertex.code.add(He`vec4 offsetBackfacingClipPosition(vec4 posClip, vec3 posWorld, vec3 normalWorld, vec3 camPosWorld) {
vec3 camToVert = posWorld - camPosWorld;
bool isBackface = dot(camToVert, normalWorld) > 0.0;
if (isBackface) {
posClip.z += 0.0000003 * posClip.w;
}
return posClip;
}`)}function na(e,t){t.instancedColor?(e.attributes.add("instanceColor","vec4"),e.vertex.include(N),e.vertex.include(j),e.vertex.include(V),e.vertex.code.add(He`
      MaskedColor applyInstanceColor(MaskedColor color) {
        return multiplyMaskedColors( color, createMaskedFromUInt8NaNColor(${"instanceColor"}));
      }
    `)):e.vertex.code.add(He`MaskedColor applyInstanceColor(MaskedColor color) {
return color;
}`)}const sa=De();function la(t,a){const{hasModelTransformation:o,instancedDoublePrecision:i,instanced:r,output:n,hasVertexTangents:s}=a;o&&(t.vertex.uniforms.add(new E("model",e=>e.modelTransformation??nt)),t.vertex.uniforms.add(new I("normalLocalOriginFromModel",e=>(ot(sa,e.modelTransformation??nt),sa)))),r&&i&&(t.attributes.add("instanceModelOriginHi","vec3"),t.attributes.add("instanceModelOriginLo","vec3"),t.attributes.add("instanceModel","mat3"),t.attributes.add("instanceModelNormal","mat3"));const l=t.vertex;i&&(l.include(Se,a),l.uniforms.add(new L("viewOriginHi",t=>P(e(ca,t.camera.viewInverseTransposeMatrix[3],t.camera.viewInverseTransposeMatrix[7],t.camera.viewInverseTransposeMatrix[11]),ca)),new L("viewOriginLo",t=>R(e(ca,t.camera.viewInverseTransposeMatrix[3],t.camera.viewInverseTransposeMatrix[7],t.camera.viewInverseTransposeMatrix[11]),ca)))),l.code.add(He`
    vec3 getVertexInLocalOriginSpace() {
      return ${o?i?"(model * vec4(instanceModel * localPosition().xyz, 1.0)).xyz":"(model * localPosition()).xyz":i?"instanceModel * localPosition().xyz":"localPosition().xyz"};
    }

    vec3 subtractOrigin(vec3 _pos) {
      ${i?He`
          // Issue: (should be resolved now with invariant position) https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/56280
          vec3 originDelta = dpAdd(viewOriginHi, viewOriginLo, -instanceModelOriginHi, -instanceModelOriginLo);
          return _pos - originDelta;`:"return vpos;"}
    }
    `),l.code.add(He`
    vec3 dpNormal(vec4 _normal) {
      return normalize(${o?i?"normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz)":"normalLocalOriginFromModel * _normal.xyz":i?"instanceModelNormal * _normal.xyz":"_normal.xyz"});
    }
    `),3===n&&(G(l),l.code.add(He`
    vec3 dpNormalView(vec4 _normal) {
      return normalize((viewNormal * ${o?i?"vec4(normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz), 1.0)":"vec4(normalLocalOriginFromModel * _normal.xyz, 1.0)":i?"vec4(instanceModelNormal * _normal.xyz, 1.0)":"_normal"}).xyz);
    }
    `)),s&&l.code.add(He`
    vec4 dpTransformVertexTangent(vec4 _tangent) {
      ${o?i?"return vec4(normalLocalOriginFromModel * (instanceModelNormal * _tangent.xyz), _tangent.w);":"return vec4(normalLocalOriginFromModel * _tangent.xyz, _tangent.w);":i?"return vec4(instanceModelNormal * _tangent.xyz, _tangent.w);":"return _tangent;"}
    }`)}const ca=c();function da(e,t){e.varyings.add("colorMixMode","int"),e.varyings.add("opacityMixMode","int"),e.vertex.uniforms.add(new lt("symbolColorMixMode",e=>A[e.colorMixMode])),t.hasSymbolColors?(e.vertex.include(N),e.vertex.include(j),e.vertex.include(V),e.attributes.add("symbolColor","vec4"),e.vertex.code.add(He`
    MaskedColor applySymbolColor(MaskedColor color) {
      return multiplyMaskedColors(color, createMaskedFromUInt8NaNColor(${"symbolColor"}));
    }
  `)):e.vertex.code.add(He`MaskedColor applySymbolColor(MaskedColor color) {
return color;
}`),e.vertex.code.add(He`
    void forwardColorMixMode(bvec4 mask) {
      colorMixMode = mask.r ? ${He.int(A.ignore)} : symbolColorMixMode;
      opacityMixMode = mask.a ? ${He.int(A.ignore)} : symbolColorMixMode;
    }
  `)}function ua(e,t){switch(t.output){case 4:case 5:case 6:case 7:e.fragment.code.add(He`float _calculateFragDepth(const in float depth) {
const float SLOPE_SCALE = 2.0;
const float BIAS = 20.0 * .000015259;
float m = max(abs(dFdx(depth)), abs(dFdy(depth)));
return depth + SLOPE_SCALE * m + BIAS;
}
void outputDepth(float _linearDepth){
float fragDepth = _calculateFragDepth(_linearDepth);
gl_FragDepth = fragDepth;
}`)}}function ha(e,t){pa(e,t,new m("textureAlphaCutoff",e=>e.textureAlphaCutoff))}function ma(e,t){pa(e,t,new p("textureAlphaCutoff",e=>e.textureAlphaCutoff))}function pa(e,t,a){const o=e.fragment,i=t.alphaDiscardMode,r=0===i;2!==i&&3!==i||o.uniforms.add(a),o.code.add(He`
    void discardOrAdjustAlpha(inout vec4 color) {
      ${1===i?"color.a = 1.0;":`if (color.a < ${r?He.float(ut):"textureAlphaCutoff"}) {\n              discard;\n             } ${Ue(2===i,"else { color.a = 1.0; }")}`}
    }
  `)}function fa(e,t){const{vertex:a,fragment:o,varyings:i}=e,{hasColorTexture:r,alphaDiscardMode:n}=t,s=r&&1!==n,{output:l,normalType:c,hasColorTextureTransform:d}=t;switch(l){case 2:D(a,t),e.include(_e,t),o.include(H,t),e.include(f,t),s&&o.uniforms.add(new v("tex",e=>e.texture)),a.main.add(He`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();`),e.include(ha,t),o.main.add(He`
        discardBySlice(vpos);
        ${Ue(s,He`vec4 texColor = texture(tex, ${d?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}`);break;case 4:case 5:case 6:case 7:case 9:D(a,t),e.include(_e,t),e.include(f,t),e.include(B,t),e.include(ua,t),o.include(H,t),e.include(W,t),Ce(e),i.add("depth","float",{invariant:!0}),s&&o.uniforms.add(new v("tex",e=>e.texture)),a.main.add(He`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);
forwardTextureCoordinates();
forwardObjectAndLayerIdColor();`),e.include(ha,t),o.main.add(He`
        discardBySlice(vpos);
        ${Ue(s,He`vec4 texColor = texture(tex, ${d?"colorUV":"vuv0"});
               discardOrAdjustAlpha(texColor);`)}
        ${9===l?He`outputObjectAndLayerIdColor();`:He`outputDepth(depth);`}`);break;case 3:{D(a,t),e.include(_e,t),e.include(Pt,t),e.include(Rt,t),e.include(f,t),e.include(B,t),s&&o.uniforms.add(new v("tex",e=>e.texture)),2===c&&i.add("vPositionView","vec3",{invariant:!0});const r=0===c||1===c;a.main.add(He`
        vpos = getVertexInLocalOriginSpace();
        ${r?He`vNormalWorld = dpNormalView(vvLocalNormal(normalModel()));`:He`vPositionView = (view * vec4(vpos, 1.0)).xyz;`}
        vpos = subtractOrigin(vpos);
        vpos = addVerticalOffset(vpos, localOrigin);
        gl_Position = transformPosition(proj, view, vpos);
        forwardTextureCoordinates();`),o.include(H,t),e.include(ha,t),o.main.add(He`
        discardBySlice(vpos);
        ${Ue(s,He`vec4 texColor = texture(tex, ${d?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}

        ${2===c?He`vec3 normal = screenDerivativeNormal(vPositionView);`:He`vec3 normal = normalize(vNormalWorld);
                    if (gl_FrontFacing == false){
                      normal = -normal;
                    }`}
        fragColor = vec4(0.5 + 0.5 * normal, 1.0);`);break}case 8:D(a,t),e.include(_e,t),e.include(f,t),e.include(B,t),s&&o.uniforms.add(new v("tex",e=>e.texture)),a.main.add(He`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();`),o.include(H,t),e.include(ha,t),e.include(U,t),o.main.add(He`
        discardBySlice(vpos);
        ${Ue(s,He`vec4 texColor = texture(tex, ${d?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}
        calculateOcclusionAndOutputHighlight();`)}}function va(e,t){const a=e.fragment,{hasVertexTangents:o,doubleSidedMode:i,hasNormalTexture:r,textureCoordinateType:n,bindType:s,hasNormalTextureTransform:l}=t;o?(e.attributes.add("tangent","vec4"),e.varyings.add("vTangent","vec4"),2===i?a.code.add(He`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = gl_FrontFacing ? vTangent.w : -vTangent.w;
vec3 tangent = normalize(gl_FrontFacing ? vTangent.xyz : -vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`):a.code.add(He`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = vTangent.w;
vec3 tangent = normalize(vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`)):a.code.add(He`mat3 computeTangentSpace(vec3 normal, vec3 pos, vec2 st) {
vec3 Q1 = dFdx(pos);
vec3 Q2 = dFdy(pos);
vec2 stx = dFdx(st);
vec2 sty = dFdy(st);
float det = stx.t * sty.s - sty.t * stx.s;
vec3 T = stx.t * Q2 - sty.t * Q1;
T = T - normal * dot(normal, T);
T *= inversesqrt(max(dot(T,T), 1.e-10));
vec3 B = sign(det) * cross(normal, T);
return mat3(T, B, normal);
}`),r&&0!==n&&(e.include(g,t),a.uniforms.add(1===s?new v("normalTexture",e=>e.textureNormal):new x("normalTexture",e=>e.textureNormal)),l&&(a.uniforms.add(new pt("scale",e=>e.scale??ht)),a.uniforms.add(new I("normalTextureTransformMatrix",e=>e.normalTextureTransformMatrix??Be))),a.code.add(He`vec3 computeTextureNormal(mat3 tangentSpace, vec2 uv) {
vec3 rawNormal = textureLookup(normalTexture, uv).rgb * 2.0 - 1.0;`),l&&a.code.add(He`mat3 normalRotation = mat3(normalTextureTransformMatrix[0][0]/scale[0], normalTextureTransformMatrix[0][1]/scale[1], 0.0,
normalTextureTransformMatrix[1][0]/scale[0], normalTextureTransformMatrix[1][1]/scale[1], 0.0,
0.0, 0.0, 0.0 );
rawNormal.xy = (normalRotation * vec3(rawNormal.x, rawNormal.y, 1.0)).xy;`),a.code.add(He`return tangentSpace * rawNormal;
}`))}const ga=3e5,xa=5e5,ba=Object.freeze(Object.defineProperty({__proto__:null,build:function(){const e=new _t,t=e.fragment;return e.include(ft),t.include(k),t.uniforms.add(new v("depthMap",e=>e.depthTexture),new x("tex",e=>e.colorTexture),new ct("blurSize",e=>e.blurSize),new m("projScale",(e,t)=>{const a=t.camera.distance;return a>5e4?Math.max(0,e.projScale-(a-5e4)):e.projScale})),t.code.add(He`
    void blurFunction(vec2 uv, float r, float center_d, float sharpness, inout float wTotal, inout float bTotal) {
      float c = texture(tex, uv).r;
      float d = linearDepthFromTexture(depthMap, uv);

      float ddiff = d - center_d;

      float w = exp(-r * r * ${He.float(.08)} - ddiff * ddiff * sharpness);
      wTotal += w;
      bTotal += w * c;
    }
  `),e.outputs.add("fragBlur","float"),t.main.add(He`
    float b = 0.0;
    float w_total = 0.0;

    float center_d = linearDepthFromTexture(depthMap, uv);

    float sharpness = -0.05 * projScale / center_d;
    for (int r = -${He.int(4)}; r <= ${He.int(4)}; ++r) {
      float rf = float(r);
      vec2 uvOffset = uv + rf * blurSize;
      blurFunction(uvOffset, rf, center_d, sharpness, w_total, b);
    }
    fragBlur = b / w_total;`),e}},Symbol.toStringTag,{value:"Module"}));class wa extends Y{constructor(e,t){super(e,t,new q(ba,()=>Promise.resolve().then(()=>ba)),vt)}initializePipeline(){return Ct({colorWrite:zt})}}class ya extends J{constructor(){super(...arguments),this.projScale=1}}class Ma extends ya{constructor(){super(...arguments),this.intensity=1}}class Ta extends J{}class Sa extends Ta{constructor(){super(...arguments),this.blurSize=mt()}}function _a(e){return Math.max(10,20*e.computeScreenPixelSizeAtDist(Math.abs(4*e.relativeElevation)))}const Ca=mt(),za=Object.freeze(Object.defineProperty({__proto__:null,build:function(){const e=new _t,t=e.fragment;return e.include(ft),e.include(gt),t.include(k),t.uniforms.add(new Z("radius",e=>_a(e.camera))).code.add(He`vec3 sphere[16] = vec3[16](
vec3(0.186937, 0.0, 0.0),
vec3(0.700542, 0.0, 0.0),
vec3(-0.864858, -0.481795, -0.111713),
vec3(-0.624773, 0.102853, -0.730153),
vec3(-0.387172, 0.260319, 0.007229),
vec3(-0.222367, -0.642631, -0.707697),
vec3(-0.01336, -0.014956, 0.169662),
vec3(0.122575, 0.1544, -0.456944),
vec3(-0.177141, 0.85997, -0.42346),
vec3(-0.131631, 0.814545, 0.524355),
vec3(-0.779469, 0.007991, 0.624833),
vec3(0.308092, 0.209288,0.35969),
vec3(0.359331, -0.184533, -0.377458),
vec3(0.192633, -0.482999, -0.065284),
vec3(0.233538, 0.293706, -0.055139),
vec3(0.417709, -0.386701, 0.442449)
);
float fallOffFunction(float vv, float vn, float bias) {
float f = max(radius * radius - vv, 0.0);
return f * f * f * max(vn - bias, 0.0);
}`),t.code.add(He`float aoValueFromPositionsAndNormal(vec3 C, vec3 n_C, vec3 Q) {
vec3 v = Q - C;
float vv = dot(v, v);
float vn = dot(normalize(v), n_C);
return fallOffFunction(vv, vn, 0.1);
}`),e.outputs.add("fragOcclusion","float"),t.uniforms.add(new v("normalMap",e=>e.normalTexture),new v("depthMap",e=>e.depthTexture),new m("projScale",e=>e.projScale),new v("rnm",e=>e.noiseTexture),new pt("rnmScale",(e,t)=>Mt(Ca,t.camera.fullWidth/e.noiseTexture.descriptor.width,t.camera.fullHeight/e.noiseTexture.descriptor.height)),new m("intensity",e=>e.intensity),new $("screenSize",e=>Mt(Ca,e.camera.fullWidth,e.camera.fullHeight))).main.add(He`
    float depth = depthFromTexture(depthMap, uv);

    // Early out if depth is out of range, such as in the sky
    if (depth >= 1.0 || depth <= 0.0) {
      fragOcclusion = 1.0;
      return;
    }

    // get the normal of current fragment
    ivec2 iuv = ivec2(uv * vec2(textureSize(normalMap, 0)));
    vec4 norm4 = texelFetch(normalMap, iuv, 0);
    if(norm4.a != 1.0) {
      fragOcclusion = 1.0;
      return;
    }
    vec3 norm = normalize(norm4.xyz * 2.0 - 1.0);

    float currentPixelDepth = linearizeDepth(depth);
    vec3 currentPixelPos = reconstructPosition(gl_FragCoord.xy, currentPixelDepth);

    float sum = 0.0;
    vec3 tapPixelPos;

    vec3 fres = normalize(2.0 * texture(rnm, uv * rnmScale).xyz - 1.0);

    // note: the factor 2.0 should not be necessary, but makes ssao much nicer.
    // bug or deviation from CE somewhere else?
    float ps = projScale / (2.0 * currentPixelPos.z * zScale.x + zScale.y);

    for(int i = 0; i < ${He.int(16)}; ++i) {
      vec2 unitOffset = reflect(sphere[i], fres).xy;
      vec2 offset = vec2(-unitOffset * radius * ps);

      // don't use current or very nearby samples
      if( abs(offset.x) < 2.0 || abs(offset.y) < 2.0){
        continue;
      }

      vec2 tc = vec2(gl_FragCoord.xy + offset);
      if (tc.x < 0.0 || tc.y < 0.0 || tc.x > screenSize.x || tc.y > screenSize.y) continue;
      vec2 tcTap = tc / screenSize;
      float occluderFragmentDepth = linearDepthFromTexture(depthMap, tcTap);

      tapPixelPos = reconstructPosition(tc, occluderFragmentDepth);

      sum += aoValueFromPositionsAndNormal(currentPixelPos, norm, tapPixelPos);
    }

    // output the result
    float A = max(1.0 - sum * intensity / float(${He.int(16)}), 0.0);

    // Anti-tone map to reduce contrast and drag dark region farther: (x^0.2 + 1.2 * x^4) / 2.2
    A = (pow(A, 0.2) + 1.2 * A * A * A * A) / 2.2;

    fragOcclusion = A;
  `),e},getRadius:_a},Symbol.toStringTag,{value:"Module"}));class Fa extends Y{constructor(e,t){super(e,t,new q(za,()=>Promise.resolve().then(()=>za)),vt)}initializePipeline(){return Ct({colorWrite:zt})}}let Ia=class extends St{constructor(e){super(e),this.consumes={required:["normals"]},this.produces=Tt.SSAO,this.isEnabled=()=>!1,this._enableTime=yt(0),this._passParameters=new Ma,this._drawParameters=new Sa}initialize(){const e=Uint8Array.from(atob("eXKEvZaUc66cjIKElE1jlJ6MjJ6Ufkl+jn2fcXp5jBx7c6KEflSGiXuXeW6OWs+tfqZ2Yot2Y7Zzfo2BhniEj3xoiXuXj4eGZpqEaHKDWjSMe7palFlzc3BziYOGlFVzg6Zzg7CUY5JrjFF7eYJ4jIKEcyyEonSXe7qUfqZ7j3xofqZ2c4R5lFZ5Y0WUbppoe1l2cIh2ezyUho+BcHN2cG6DbpqJhqp2e1GcezhrdldzjFGUcyxjc3aRjDyEc1h7Sl17c6aMjH92pb6Mjpd4dnqBjMOEhqZleIOBYzB7gYx+fnqGjJuEkWlwnCx7fGl+c4hjfGyRe5qMlNOMfnqGhIWHc6OMi4GDc6aMfqZuc6aMzqJzlKZ+lJ6Me3qRfoFue0WUhoR5UraEa6qMkXiPjMOMlJOGe7JrUqKMjK6MeYRzdod+Sl17boiPc6qEeYBlcIh2c1WEe7GDiWCDa0WMjEmMdod+Y0WcdntzhmN8WjyMjKJjiXtzgYxYaGd+a89zlEV7e2GJfnd+lF1rcK5zc4p5cHuBhL6EcXp5eYB7fnh8iX6HjIKEeaxuiYOGc66RfG2Ja5hzjlGMjEmMe9OEgXuPfHyGhPeEdl6JY02McGuMfnqGhFiMa3WJfnx2l4hwcG1uhmN8c0WMc39og1GBbrCEjE2EZY+JcIh2cIuGhIWHe0mEhIVrc09+gY5+eYBlnCyMhGCDl3drfmmMgX15aGd+gYx+fnuRfnhzY1SMsluJfnd+hm98WtNrcIuGh4SEj0qPdkqOjFF7jNNjdnqBgaqUjMt7boeBhnZ4jDR7c5pze4GGjEFrhLqMjHyMc0mUhKZze4WEa117kWlwbpqJjHZ2eX2Bc09zeId+e0V7WlF7jHJ2l72BfId8l3eBgXyBe897jGl7c66cgW+Xc76EjKNbgaSEjGx4fId8jFFjgZB8cG6DhlFziZhrcIh2fH6HgUqBgXiPY8dahGFzjEmMhEFre2dxhoBzc5SGfleGe6alc7aUeYBlhKqUdlp+cH5za4OEczxza0Gcc4J2jHZ5iXuXjH2Jh5yRjH2JcFx+hImBjH+MpddCl3dreZeJjIt8ZW18bm1zjoSEeIOBlF9oh3N7hlqBY4+UeYFwhLJjeYFwaGd+gUqBYxiEYot2fqZ2ondzhL6EYyiEY02Ea0VjgZB8doaGjHxoc66cjEGEiXuXiXWMiZhreHx8frGMe75rY02Ec5pzfnhzlEp4a3VzjM+EhFFza3mUY7Zza1V5e2iMfGyRcziEhDyEkXZ2Y4OBnCx7g5t2eyBjgV6EhEFrcIh2dod+c4Z+nJ5zjm15jEmUeYxijJp7nL6clIpjhoR5WrZraGd+fnuRa6pzlIiMg6ZzfHx5foh+eX1ufnB5eX1ufnB5aJt7UqKMjIh+e3aBfm5lbYSBhGFze6J4c39oc0mUc4Z+e0V7fKFVe0WEdoaGY02Ec4Z+Y02EZYWBfH6HgU1+gY5+hIWUgW+XjJ57ebWRhFVScHuBfJ6PhBx7WqJzlM+Ujpd4gHZziX6HjHmEgZN+lJt5boiPe2GJgX+GjIGJgHZzeaxufnB5hF2JtdN7jJ57hp57hK6ElFVzg6ZzbmiEbndzhIWHe3uJfoFue3qRhJd2j3xoc65zlE1jc3p8lE1jhniEgXJ7e657vZaUc3qBh52BhIF4aHKDa9drgY5+c52GWqZzbpqJe8tjnM+UhIeMfo2BfGl+hG1zSmmMjKJjZVaGgX15c1lze0mEp4OHa3mUhIWHhDyclJ6MeYOJkXiPc0VzhFiMlKaEboSJa5Jze41re3qRhn+HZYWBe0mEc4p5fnORbox5lEp4hGFjhGGEjJuEc1WEhLZjeHeGa7KlfHx2hLaMeX1ugY5+hIWHhKGPjMN7c1WEho1zhoBzZYx7fnhzlJt5exyUhFFziXtzfmmMa6qMYyiEiXxweV12kZSMeWqXSl17fnhzxmmMrVGEe1mcc4p5eHeGjK6MgY5+doaGa6pzlGV7g1qBh4KHkXiPeW6OaKqafqZ2eXZ5e1V7jGd7boSJc3BzhJd2e0mcYot2h1RoY8dahK6EQmWEWjx7e1l2lL6UgXyBdnR4eU9zc0VreX1umqaBhld7fo2Bc6KEc5Z+hDyEcIeBWtNrfHyGe5qMhMuMe5qMhEGEbVVupcNzg3aHhIF4boeBe0mEdlptc39ofFl5Y8uUlJOGiYt2UmGEcyxjjGx4jFF7a657ZYWBnElzhp57iXtrgZN+tfOEhIOBjE2HgU1+e8tjjKNbiWCDhE15gUqBgYN7fnqGc66ce9d7iYSBj0qPcG6DnGGcT3eGa6qMZY+JlIiMl4hwc3aRdnqBlGV7eHJ2hLZjfnuRhDyEeX6MSk17g6Z+c6aUjHmEhIF4gXyBc76EZW18fGl+fkl+jCxrhoVwhDyUhIqGlL2DlI6EhJd2tdN7eYORhEGMa2Faa6pzc3Bzc4R5lIRznM+UY9eMhDycc5Z+c4p5c4iGY117pb6MgXuPrbJafnx2eYOJeXZ5e657hDyEcziElKZjfoB5eHeGj4WRhGGEe6KGeX1utTStc76EhFGJnCyMa5hzfH6HnNeceYB7hmN8gYuMhIVrczSMgYF8h3N7c5pza5hzjJqEYIRdgYuMlL2DeYRzhGGEeX1uhLaEc4iGeZ1zdl6JhrVteX6Me2iMfm5lWqJzSpqEa6pzdnmchHx2c6OMhNdrhoR5g3aHczxzeW52gV6Ejm15frGMc0Vzc4Z+l3drfniJe+9rWq5rlF1rhGGEhoVwe9OEfoh+e7pac09+c3qBY0lrhDycdnp2lJ6MiYOGhGCDc3aRlL2DlJt5doaGdnp2gYF8gWeOjF2Uc4R5c5Z+jEmMe7KEc4mEeYJ4dmyBe0mcgXiPbqJ7eYB7fmGGiYSJjICGlF1reZ2PnElzbpqJfH6Hc39oe4WEc5eJhK6EhqyJc3qBgZB8c09+hEmEaHKDhFGJc5SGiXWMUpaEa89zc6OMnCyMiXtrho+Be5qMc7KEjJ57dmN+hKGPjICGbmiEe7prdod+hGCDdnmchBx7eX6MkXZ2hGGEa657hm98jFFjY5JreYOJgY2EjHZ2a295Y3FajJ6Mc1J+YzB7e4WBjF2Uc4R5eV12gYxzg1qBeId+c9OUc5pzjFFjgY5+hFiMlIaPhoR5lIpjjIKBlNdSe7KEeX2BfrGMhIqGc65zjE2UhK6EklZ+QmWEeziMWqZza3VzdnR4foh+gYF8n3iJiZhrnKp7gYF8eId+lJ6Me1lrcIuGjKJjhmN8c66MjFF7a6prjJ6UnJ5zezyUfruRWlF7nI5zfHyGe657h4SEe8tjhBx7jFFjc09+c39ojICMeZeJeXt+YzRzjHZ2c0WEcIeBeXZ5onSXkVR+gYJ+eYFwdldzgYF7eX2BjJ6UiXuXlE1jh4SEe1mchLJjc4Z+hqZ7eXZ5bm1zlL6Ue5p7iWeGhKqUY5pzjKJjcIeBe8t7gXyBYIRdlEp4a3mGnK6EfmmMZpqEfFl5gYxzjKZuhGFjhoKGhHx2fnx2eXuMe3aBiWeGvbKMe6KGa5hzYzB7gZOBlGV7hmN8hqZlYot2Y117a6pzc6KEfId8foB5rctrfneJfJ6PcHN2hFiMc5pzjH92c0VzgY2EcElzdmCBlFVzg1GBc65zY4OBboeBcHiBeYJ4ewxzfHx5lIRzlEmEnLKEbk1zfJ6PhmN8eYBljBiEnMOEiXxwezyUcIeBe76EdsKEeX2BdnR4jGWUrXWMjGd7fkl+j4WRlEGMa5Jzho+BhDyEfnqMeXt+g3aHlE1jczClhNN7ZW18eHx8hGFjZW18iXWMjKJjhH57gYuMcIuGWjyMe4ZtjJuExmmMj4WRdntzi4GDhFFzYIRdnGGcjJp7Y0F7e4WEkbCGiX57fnSHa657a6prhBCMe3Z+SmmMjH92eHJ2hK6EY1FzexhrvbKMnI5za4OEfnd+eXuMhImBe897hLaMjN+EfG+BeIOBhF1+eZeJi4GDkXZ2eXKEgZ6Ejpd4c2GHa1V5e5KUfqZuhCx7jKp7lLZrg11+hHx2hFWUoot2nI5zgbh5mo9zvZaUe3qRbqKMfqZ2kbCGhFiM"),e=>e.charCodeAt(0)),t=new Ot(32);t.wrapMode=33071,t.pixelFormat=6407,t.wrapMode=10497,t.hasMipmap=!0,this._passParameters.noiseTexture=new Nt(this.renderingContext,t,e),this.techniques.precompile(Fa),this.techniques.precompile(wa),this.addHandles(wt(()=>this.isEnabled(),()=>this._enableTime=yt(0)))}destroy(){this._passParameters.noiseTexture=bt(this._passParameters.noiseTexture)}render(e){const t=e.find(({name:e})=>"normals"===e),a=t?.getTexture(),o=t?.getTexture(It);if(!a||!o)return;const i=this.techniques.get(Fa),r=this.techniques.get(wa);if(!i.compiled||!r.compiled)return this._enableTime=yt(performance.now()),void this.requestRender(1);0===this._enableTime&&(this._enableTime=yt(performance.now()));const n=this.renderingContext,s=this.view.qualitySettings.fadeDuration,l=this.bindParameters,c=l.camera,d=c.relativeElevation,u=xt((xa-d)/2e5,0,1),h=s>0?Math.min(s,performance.now()-this._enableTime)/s:1,m=h*u;this._passParameters.normalTexture=a,this._passParameters.depthTexture=o,this._passParameters.projScale=1/c.computeScreenPixelSizeAtDist(1),this._passParameters.intensity=4*Oa/_a(c)**6*m;const p=c.fullViewport[2],f=c.fullViewport[3],v=this.fboCache.acquire(p,f,"ssao input",2);n.bindFramebuffer(v.fbo),n.setViewport(0,0,p,f),n.bindTechnique(i,l,this._passParameters,this._drawParameters),n.screen.draw();const g=Math.round(p/2),x=Math.round(f/2),b=this.fboCache.acquire(g,x,"ssao blur",0);n.bindFramebuffer(b.fbo),this._drawParameters.colorTexture=v.getTexture(),Mt(this._drawParameters.blurSize,0,2/f),n.bindTechnique(r,l,this._passParameters,this._drawParameters),n.setViewport(0,0,g,x),n.screen.draw(),v.release();const w=this.fboCache.acquire(g,x,Tt.SSAO,0);return n.bindFramebuffer(w.fbo),n.setViewport(0,0,p,f),n.setClearColor(1,1,1,0),n.clear(16384),this._drawParameters.colorTexture=b.getTexture(),Mt(this._drawParameters.blurSize,2/p,0),n.bindTechnique(r,l,this._passParameters,this._drawParameters),n.setViewport(0,0,g,x),n.screen.draw(),n.setViewport4fv(c.fullViewport),b.release(),h<1&&this.requestRender(1),w}};Ze([Ke()],Ia.prototype,"consumes",void 0),Ze([Ke()],Ia.prototype,"produces",void 0),Ze([Ke({constructOnly:!0})],Ia.prototype,"isEnabled",void 0),Ia=Ze([Qe("esri.views.3d.webgl-engine.effects.ssao.SSAO")],Ia);const Oa=.5;function Na(e,t){t.receiveAmbientOcclusion?(e.uniforms.add(new X("ssaoTex",e=>e.ssao?.getTexture())),e.constants.add("blurSizePixelsInverse","float",.5),e.code.add(He`float evaluateAmbientOcclusionInverse() {
vec2 ssaoTextureSizeInverse = 1.0 / vec2(textureSize(ssaoTex, 0));
return texture(ssaoTex, gl_FragCoord.xy * blurSizePixelsInverse * ssaoTextureSizeInverse).r;
}
float evaluateAmbientOcclusion() {
return 1.0 - evaluateAmbientOcclusionInverse();
}`)):e.code.add(He`float evaluateAmbientOcclusionInverse() { return 1.0; }
float evaluateAmbientOcclusion() { return 0.0; }`)}function ja(t,a){const o=t.fragment,i=void 0!==a.lightingSphericalHarmonicsOrder?a.lightingSphericalHarmonicsOrder:2;0===i?(o.uniforms.add(new L("lightingAmbientSH0",({lighting:t})=>e(Va,t.sh.r[0],t.sh.g[0],t.sh.b[0]))),o.code.add(He`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
return ambientLight * (1.0 - ambientOcclusion);
}`)):1===i?(o.uniforms.add(new K("lightingAmbientSH_R",({lighting:e})=>Vt(Ea,e.sh.r[0],e.sh.r[1],e.sh.r[2],e.sh.r[3])),new K("lightingAmbientSH_G",({lighting:e})=>Vt(Ea,e.sh.g[0],e.sh.g[1],e.sh.g[2],e.sh.g[3])),new K("lightingAmbientSH_B",({lighting:e})=>Vt(Ea,e.sh.b[0],e.sh.b[1],e.sh.b[2],e.sh.b[3]))),o.code.add(He`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec4 sh0 = vec4(
0.282095,
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y
);
vec3 ambientLight = vec3(
dot(lightingAmbientSH_R, sh0),
dot(lightingAmbientSH_G, sh0),
dot(lightingAmbientSH_B, sh0)
);
return ambientLight * (1.0 - ambientOcclusion);
}`)):2===i&&(o.uniforms.add(new L("lightingAmbientSH0",({lighting:t})=>e(Va,t.sh.r[0],t.sh.g[0],t.sh.b[0])),new K("lightingAmbientSH_R1",({lighting:e})=>Vt(Ea,e.sh.r[1],e.sh.r[2],e.sh.r[3],e.sh.r[4])),new K("lightingAmbientSH_G1",({lighting:e})=>Vt(Ea,e.sh.g[1],e.sh.g[2],e.sh.g[3],e.sh.g[4])),new K("lightingAmbientSH_B1",({lighting:e})=>Vt(Ea,e.sh.b[1],e.sh.b[2],e.sh.b[3],e.sh.b[4])),new K("lightingAmbientSH_R2",({lighting:e})=>Vt(Ea,e.sh.r[5],e.sh.r[6],e.sh.r[7],e.sh.r[8])),new K("lightingAmbientSH_G2",({lighting:e})=>Vt(Ea,e.sh.g[5],e.sh.g[6],e.sh.g[7],e.sh.g[8])),new K("lightingAmbientSH_B2",({lighting:e})=>Vt(Ea,e.sh.b[5],e.sh.b[6],e.sh.b[7],e.sh.b[8]))),o.code.add(He`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
vec4 sh1 = vec4(
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y,
1.092548 * normal.x * normal.y
);
vec4 sh2 = vec4(
1.092548 * normal.y * normal.z,
0.315392 * (3.0 * normal.z * normal.z - 1.0),
1.092548 * normal.x * normal.z,
0.546274 * (normal.x * normal.x - normal.y * normal.y)
);
ambientLight += vec3(
dot(lightingAmbientSH_R1, sh1),
dot(lightingAmbientSH_G1, sh1),
dot(lightingAmbientSH_B1, sh1)
);
ambientLight += vec3(
dot(lightingAmbientSH_R2, sh2),
dot(lightingAmbientSH_G2, sh2),
dot(lightingAmbientSH_B2, sh2)
);
return ambientLight * (1.0 - ambientOcclusion);
}`),1!==a.pbrMode&&2!==a.pbrMode||o.code.add(He`const vec3 skyTransmittance = vec3(0.9, 0.9, 1.0);
vec3 calculateAmbientRadiance(float ambientOcclusion)
{
vec3 ambientLight = 1.2 * (0.282095 * lightingAmbientSH0) - 0.2;
return ambientLight *= (1.0 - ambientOcclusion) * skyTransmittance;
}`))}const Va=c(),Ea=je();function La(e){e.uniforms.add(new L("mainLightDirection",e=>e.lighting.mainLight.direction))}function Pa(e){e.uniforms.add(new L("mainLightIntensity",e=>e.lighting.mainLight.intensity))}function Ra(e){La(e.fragment),Pa(e.fragment),e.fragment.code.add(He`vec3 applyShading(vec3 shadingNormal, float shadow) {
float dotVal = clamp(dot(shadingNormal, mainLightDirection), 0.0, 1.0);
return mainLightIntensity * ((1.0 - shadow) * dotVal);
}`)}function Ga(e){e.code.add(He`vec3 evaluateDiffuseIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float NdotNG) {
return ((1.0 - NdotNG) * ambientGround + (1.0 + NdotNG) * ambientSky) * 0.5;
}`),e.code.add(He`float integratedRadiance(float cosTheta2, float roughness) {
return (cosTheta2 - 1.0) / (cosTheta2 * (1.0 - roughness * roughness) - 1.0);
}`),e.code.add(He`vec3 evaluateSpecularIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float RdotNG, float roughness) {
float cosTheta2 = 1.0 - RdotNG * RdotNG;
float intRadTheta = integratedRadiance(cosTheta2, roughness);
float ground = RdotNG < 0.0 ? 1.0 - intRadTheta : 1.0 + intRadTheta;
float sky = 2.0 - ground;
return (ground * ambientGround + sky * ambientSky) * 0.5;
}`)}function Aa(e,t){e.include(Q),1!==t.pbrMode&&2!==t.pbrMode&&5!==t.pbrMode&&6!==t.pbrMode||(e.code.add(He`float normalDistribution(float NdotH, float roughness)
{
float a = NdotH * roughness;
float b = roughness / (1.0 - NdotH * NdotH + a * a);
return b * b * INV_PI;
}`),e.code.add(He`const vec4 c0 = vec4(-1.0, -0.0275, -0.572,  0.022);
const vec4 c1 = vec4( 1.0,  0.0425,  1.040, -0.040);
const vec2 c2 = vec2(-1.04, 1.04);
vec2 prefilteredDFGAnalytical(float roughness, float NdotV) {
vec4 r = roughness * c0 + c1;
float a004 = min(r.x * r.x, exp2(-9.28 * NdotV)) * r.x + r.y;
return c2 * a004 + r.zw;
}`)),1!==t.pbrMode&&2!==t.pbrMode||(e.include(Ga),e.code.add(He`struct PBRShadingInfo
{
float NdotV;
float LdotH;
float NdotNG;
float RdotNG;
float NdotAmbDir;
float NdotH_Horizon;
vec3 skyRadianceToSurface;
vec3 groundRadianceToSurface;
vec3 skyIrradianceToSurface;
vec3 groundIrradianceToSurface;
float averageAmbientRadiance;
float ssao;
vec3 albedoLinear;
vec3 f0;
vec3 f90;
vec3 diffuseColor;
float metalness;
float roughness;
};`),e.code.add(He`vec3 evaluateEnvironmentIllumination(PBRShadingInfo inputs) {
vec3 indirectDiffuse = evaluateDiffuseIlluminationHemisphere(inputs.groundIrradianceToSurface, inputs.skyIrradianceToSurface, inputs.NdotNG);
vec3 indirectSpecular = evaluateSpecularIlluminationHemisphere(inputs.groundRadianceToSurface, inputs.skyRadianceToSurface, inputs.RdotNG, inputs.roughness);
vec3 diffuseComponent = inputs.diffuseColor * indirectDiffuse * INV_PI;
vec2 dfg = prefilteredDFGAnalytical(inputs.roughness, inputs.NdotV);
vec3 specularColor = inputs.f0 * dfg.x + inputs.f90 * dfg.y;
vec3 specularComponent = specularColor * indirectSpecular;
return (diffuseComponent + specularComponent);
}`))}function Da(e,t){e.include(Q),e.code.add(He`
  struct PBRShadingWater {
      float NdotL;   // cos angle between normal and light direction
      float NdotV;   // cos angle between normal and view direction
      float NdotH;   // cos angle between normal and half vector
      float VdotH;   // cos angle between view direction and half vector
      float LdotH;   // cos angle between light direction and half vector
      float VdotN;   // cos angle between view direction and normal vector
  };

  float dtrExponent = ${t.useCustomDTRExponentForWater?"2.2":"2.0"};
  `),e.code.add(He`vec3 fresnelReflection(float angle, vec3 f0, float f90) {
return f0 + (f90 - f0) * pow(1.0 - angle, 5.0);
}`),e.code.add(He`float normalDistributionWater(float NdotH, float roughness) {
float r2 = roughness * roughness;
float NdotH2 = NdotH * NdotH;
float denom = pow((NdotH2 * (r2 - 1.0) + 1.0), dtrExponent) * PI;
return r2 / denom;
}`),e.code.add(He`float geometricOcclusionKelemen(float LoH) {
return 0.25 / (LoH * LoH);
}`),e.code.add(He`vec3 brdfSpecularWater(in PBRShadingWater props, float roughness, vec3 F0, float F0Max) {
vec3  F = fresnelReflection(props.VdotH, F0, F0Max);
float dSun = normalDistributionWater(props.NdotH, roughness);
float V = geometricOcclusionKelemen(props.LdotH);
float diffusionSunHaze = mix(roughness + 0.045, roughness + 0.385, 1.0 - props.VdotH);
float strengthSunHaze  = 1.2;
float dSunHaze = normalDistributionWater(props.NdotH, diffusionSunHaze) * strengthSunHaze;
return ((dSun + dSunHaze) * V) * F;
}`)}function Ba(e){e.code.add(He`float mapChannel(float x, vec2 p) {
return (x < p.x) ? mix(0.0, p.y, x/p.x) : mix(p.y, 1.0, (x - p.x) / (1.0 - p.x) );
}`),e.code.add(He`vec3 blackLevelSoftCompression(vec3 color, float averageAmbientRadiance) {
vec2 p = vec2(0.02, 0.0075) * averageAmbientRadiance;
return vec3(mapChannel(color.x, p), mapChannel(color.y, p), mapChannel(color.z, p));
}`)}function Ha(e){e.code.add(He`vec3 tonemapACES(vec3 x) {
return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}`)}function Ua(e){e.constants.add("ambientBoostFactor","float",dt)}function Wa(e){e.uniforms.add(new Z("lightingGlobalFactor",e=>e.lighting.globalFactor))}function ka(e,t){const a=e.fragment,{pbrMode:o,spherical:i,hasColorTexture:r}=t;a.include(Na,t),0!==o&&a.include(Aa,t),e.include(ja,t),a.include(Q),a.include(Ha,t);const n=!(2===o&&!r);switch(n&&a.include(Ba),a.code.add(He`
    const float GAMMA_SRGB = ${He.float(jt)};
    const float INV_GAMMA_SRGB = 0.4761904;
    ${Ue(0!==o,"const float GROUND_REFLECTANCE = 0.2;")}
  `),Ua(a),Wa(a),La(a),a.code.add(He`
    float additionalDirectedAmbientLight(vec3 vPosWorld) {
      float vndl = dot(${i?He`normalize(vPosWorld)`:He`vec3(0.0, 0.0, 1.0)`}, mainLightDirection);
      return smoothstep(0.0, 1.0, clamp(vndl * 2.5, 0.0, 1.0));
    }
  `),Pa(a),a.code.add(He`vec3 evaluateAdditionalLighting(float ambientOcclusion, vec3 vPosWorld) {
float additionalAmbientScale = additionalDirectedAmbientLight(vPosWorld);
return (1.0 - ambientOcclusion) * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor * mainLightIntensity;
}`),o){case 0:case 4:case 3:e.include(Ra),a.code.add(He`vec3 evaluateSceneLighting(vec3 normalWorld, vec3 albedo, float shadow, float ssao, vec3 additionalLight) {
vec3 mainLighting = applyShading(normalWorld, shadow);
vec3 ambientLighting = calculateAmbientIrradiance(normalWorld, ssao);
vec3 albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
vec3 totalLight = mainLighting + ambientLighting + additionalLight;
totalLight = min(totalLight, vec3(PI));
vec3 outColor = vec3((albedoLinear / PI) * totalLight);
return pow(outColor, vec3(INV_GAMMA_SRGB));
}`);break;case 1:case 2:a.code.add(He`const float fillLightIntensity = 0.25;
const float horizonLightDiffusion = 0.4;
const float additionalAmbientIrradianceFactor = 0.02;
vec3 evaluateSceneLightingPBR(vec3 normal, vec3 albedo, float shadow, float ssao, vec3 additionalLight,
vec3 viewDir, vec3 groundNormal, vec3 mrr, vec4 _emission,
float additionalAmbientIrradiance) {
vec3 viewDirection = -viewDir;
vec3 h = normalize(viewDirection + mainLightDirection);
PBRShadingInfo inputs;
inputs.NdotV = clamp(abs(dot(normal, viewDirection)), 0.001, 1.0);
inputs.NdotNG = clamp(dot(normal, groundNormal), -1.0, 1.0);
vec3 reflectedView = normalize(reflect(viewDirection, normal));
inputs.RdotNG = clamp(dot(reflectedView, groundNormal), -1.0, 1.0);
inputs.albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
inputs.ssao = ssao;
inputs.metalness = mrr[0];
inputs.roughness = clamp(mrr[1] * mrr[1], 0.001, 0.99);`),a.code.add(He`inputs.f0 = (0.16 * mrr[2] * mrr[2]) * (1.0 - inputs.metalness) + inputs.albedoLinear * inputs.metalness;
inputs.f90 = vec3(clamp(dot(inputs.f0, vec3(50.0 * 0.33)), 0.0, 1.0));
inputs.diffuseColor = inputs.albedoLinear * (vec3(1.0) - inputs.f0) * (1.0 - inputs.metalness);`),t.useFillLights?a.uniforms.add(new C("hasFillLights",e=>e.enableFillLights)):a.constants.add("hasFillLights","bool",!1),a.code.add(He`vec3 ambientDir = vec3(5.0 * groundNormal[1] - groundNormal[0] * groundNormal[2], - 5.0 * groundNormal[0] - groundNormal[2] * groundNormal[1], groundNormal[1] * groundNormal[1] + groundNormal[0] * groundNormal[0]);
ambientDir = ambientDir != vec3(0.0) ? normalize(ambientDir) : normalize(vec3(5.0, -1.0, 0.0));
inputs.NdotAmbDir = hasFillLights ? abs(dot(normal, ambientDir)) : 1.0;
float NdotL = clamp(dot(normal, mainLightDirection), 0.001, 1.0);
vec3 mainLightIrradianceComponent = NdotL * (1.0 - shadow) * mainLightIntensity;
vec3 fillLightsIrradianceComponent = inputs.NdotAmbDir * mainLightIntensity * fillLightIntensity;
vec3 ambientLightIrradianceComponent = calculateAmbientIrradiance(normal, ssao) + additionalLight;
inputs.skyIrradianceToSurface = ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;
inputs.groundIrradianceToSurface = GROUND_REFLECTANCE * ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;`),a.uniforms.add(new Z("lightingSpecularStrength",e=>e.lighting.mainLight.specularStrength),new Z("lightingEnvironmentStrength",e=>e.lighting.mainLight.environmentStrength)).code.add(He`vec3 horizonRingDir = inputs.RdotNG * groundNormal - reflectedView;
vec3 horizonRingH = normalize(viewDirection + horizonRingDir);
inputs.NdotH_Horizon = dot(normal, horizonRingH);
float NdotH = clamp(dot(normal, h), 0.0, 1.0);
vec3 mainLightRadianceComponent = lightingSpecularStrength * normalDistribution(NdotH, inputs.roughness) * mainLightIntensity * (1.0 - shadow);
vec3 horizonLightRadianceComponent = lightingEnvironmentStrength * normalDistribution(inputs.NdotH_Horizon, min(inputs.roughness + horizonLightDiffusion, 1.0)) * mainLightIntensity * fillLightIntensity;
vec3 ambientLightRadianceComponent = lightingEnvironmentStrength * calculateAmbientRadiance(ssao) + additionalLight;
float normalDirectionModifier = mix(1., min(mix(0.1, 2.0, (inputs.NdotNG + 1.) * 0.5), 1.0), clamp(inputs.roughness * 5.0, 0.0 , 1.0));
inputs.skyRadianceToSurface = (ambientLightRadianceComponent + horizonLightRadianceComponent) * normalDirectionModifier + mainLightRadianceComponent;
inputs.groundRadianceToSurface = 0.5 * GROUND_REFLECTANCE * (ambientLightRadianceComponent + horizonLightRadianceComponent) * normalDirectionModifier + mainLightRadianceComponent;
inputs.averageAmbientRadiance = ambientLightIrradianceComponent[1] * (1.0 + GROUND_REFLECTANCE);`),a.code.add(He`
        vec3 reflectedColorComponent = evaluateEnvironmentIllumination(inputs);
        vec3 additionalMaterialReflectanceComponent = inputs.albedoLinear * additionalAmbientIrradiance;
        vec3 emissionComponent = _emission.rgb == vec3(0.0) ? _emission.rgb : tonemapACES(pow(_emission.rgb, vec3(GAMMA_SRGB)));
        vec3 outColorLinear = reflectedColorComponent + additionalMaterialReflectanceComponent + emissionComponent;
        ${n?He`vec3 outColor = pow(blackLevelSoftCompression(outColorLinear, inputs.averageAmbientRadiance), vec3(INV_GAMMA_SRGB));`:He`vec3 outColor = pow(max(vec3(0.0), outColorLinear - 0.005 * inputs.averageAmbientRadiance), vec3(INV_GAMMA_SRGB));`}
        return outColor;
      }
    `);break;case 5:case 6:La(a),Pa(a),a.code.add(He`const float roughnessTerrain = 0.5;
const float specularityTerrain = 0.5;
const vec3 fresnelReflectionTerrain = vec3(0.04);
vec3 evaluatePBRSimplifiedLighting(vec3 n, vec3 c, float shadow, float ssao, vec3 al, vec3 vd, vec3 nup) {
vec3 viewDirection = -vd;
vec3 h = normalize(viewDirection + mainLightDirection);
float NdotL = clamp(dot(n, mainLightDirection), 0.001, 1.0);
float NdotV = clamp(abs(dot(n, viewDirection)), 0.001, 1.0);
float NdotH = clamp(dot(n, h), 0.0, 1.0);
float NdotNG = clamp(dot(n, nup), -1.0, 1.0);
vec3 albedoLinear = pow(c, vec3(GAMMA_SRGB));
float lightness = 0.3 * albedoLinear[0] + 0.5 * albedoLinear[1] + 0.2 * albedoLinear[2];
vec3 f0 = (0.85 * lightness + 0.15) * fresnelReflectionTerrain;
vec3 f90 =  vec3(clamp(dot(f0, vec3(50.0 * 0.33)), 0.0, 1.0));
vec3 mainLightIrradianceComponent = (1. - shadow) * NdotL * mainLightIntensity;
vec3 ambientLightIrradianceComponent = calculateAmbientIrradiance(n, ssao) + al;
vec3 ambientSky = ambientLightIrradianceComponent + mainLightIrradianceComponent;
vec3 indirectDiffuse = ((1.0 - NdotNG) * mainLightIrradianceComponent + (1.0 + NdotNG ) * ambientSky) * 0.5;
vec3 outDiffColor = albedoLinear * (1.0 - f0) * indirectDiffuse / PI;
vec3 mainLightRadianceComponent = normalDistribution(NdotH, roughnessTerrain) * mainLightIntensity;
vec2 dfg = prefilteredDFGAnalytical(roughnessTerrain, NdotV);
vec3 specularColor = f0 * dfg.x + f90 * dfg.y;
vec3 specularComponent = specularityTerrain * specularColor * mainLightRadianceComponent;
vec3 outColorLinear = outDiffColor + specularComponent;
vec3 outColor = pow(outColorLinear, vec3(INV_GAMMA_SRGB));
return outColor;
}`)}}function Ya(e,t){const a=e.fragment;switch(a.code.add(He`struct ShadingNormalParameters {
vec3 normalView;
vec3 viewDirection;
} shadingParams;`),t.doubleSidedMode){case 0:a.code.add(He`vec3 shadingNormal(ShadingNormalParameters params) {
return normalize(params.normalView);
}`);break;case 1:a.code.add(He`vec3 shadingNormal(ShadingNormalParameters params) {
return dot(params.normalView, params.viewDirection) > 0.0 ? normalize(-params.normalView) : normalize(params.normalView);
}`);break;case 2:a.code.add(He`vec3 shadingNormal(ShadingNormalParameters params) {
return gl_FrontFacing ? normalize(params.normalView) : normalize(-params.normalView);
}`);break;default:Pe(t.doubleSidedMode);case 3:}}function qa(e,t){const a=t.pbrMode,o=e.fragment;if(2!==a&&0!==a&&1!==a)return void o.code.add(He`void applyPBRFactors() {}`);if(0===a)return void o.code.add(He`void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`);if(2===a)return void o.code.add(He`vec3 mrr = vec3(0.0, 0.6, 0.2);
float occlusion = 1.0;
void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`);const{hasMetallicRoughnessTexture:i,hasMetallicRoughnessTextureTransform:r,hasOcclusionTexture:n,hasOcclusionTextureTransform:s,bindType:l}=t;(i||n)&&e.include(g,t),o.code.add(He`vec3 mrr;
float occlusion;`),i&&o.uniforms.add(1===l?new v("texMetallicRoughness",e=>e.textureMetallicRoughness):new x("texMetallicRoughness",e=>e.textureMetallicRoughness)),n&&o.uniforms.add(1===l?new v("texOcclusion",e=>e.textureOcclusion):new x("texOcclusion",e=>e.textureOcclusion)),o.uniforms.add(1===l?new b("mrrFactors",e=>e.mrrFactors):new w("mrrFactors",e=>e.mrrFactors)),o.code.add(He`
    ${Ue(i,He`void applyMetallicRoughness(vec2 uv) {
            vec3 metallicRoughness = textureLookup(texMetallicRoughness, uv).rgb;
            mrr[0] *= metallicRoughness.b;
            mrr[1] *= metallicRoughness.g;
          }`)}

    ${Ue(n,"void applyOcclusion(vec2 uv) { occlusion *= textureLookup(texOcclusion, uv).r; }")}

    float getBakedOcclusion() {
      return ${n?"occlusion":"1.0"};
    }

    void applyPBRFactors() {
      mrr = mrrFactors;
      occlusion = 1.0;

      ${Ue(i,`applyMetallicRoughness(${r?"metallicRoughnessUV":"vuv0"});`)}
      ${Ue(n,`applyOcclusion(${s?"occlusionUV":"vuv0"});`)}
    }
  `)}function Ja(e,t){const a=y(t.output)&&t.receiveShadows;a&&ze(e,!0),e.vertex.code.add(He`
    void forwardLinearDepthToReadShadowMap() { ${Ue(a,"forwardLinearDepth(gl_Position.w);")} }
  `)}class Za extends M{constructor(e,t,a,o){super(e,"mat4",2,(a,i,r,n)=>a.setUniformMatrix4fv(e,t(i,r,n),o),a)}}function $a(e){e.fragment.uniforms.add(new Et("shadowMapMatrix",(e,t)=>t.shadowMap.getShadowMapMatrices(e.origin),4)),Ka(e)}function Xa(e){e.fragment.uniforms.add(new Za("shadowMapMatrix",(e,t)=>t.shadowMap.getShadowMapMatrices(e.origin),4)),Ka(e)}function Ka(e){const{fragment:t}=e;t.uniforms.add(new K("cascadeDistances",e=>e.shadowMap.cascadeDistances),new ee("numCascades",e=>e.shadowMap.numCascades)),t.code.add(He`const vec3 invalidShadowmapUVZ = vec3(0.0, 0.0, -1.0);
vec3 lightSpacePosition(vec3 _vpos, mat4 mat) {
vec4 lv = mat * vec4(_vpos, 1.0);
lv.xy /= lv.w;
return 0.5 * lv.xyz + vec3(0.5);
}
vec2 cascadeCoordinates(int i, ivec2 textureSize, vec3 lvpos) {
float xScale = float(textureSize.y) / float(textureSize.x);
return vec2((float(i) + lvpos.x) * xScale, lvpos.y);
}
vec3 calculateUVZShadow(in vec3 _worldPos, in float _linearDepth, in ivec2 shadowMapSize) {
int i = _linearDepth < cascadeDistances[1] ? 0 : _linearDepth < cascadeDistances[2] ? 1 : _linearDepth < cascadeDistances[3] ? 2 : 3;
if (i >= numCascades) {
return invalidShadowmapUVZ;
}
mat4 shadowMatrix = i == 0 ? shadowMapMatrix[0] : i == 1 ? shadowMapMatrix[1] : i == 2 ? shadowMapMatrix[2] : shadowMapMatrix[3];
vec3 lvpos = lightSpacePosition(_worldPos, shadowMatrix);
if (lvpos.z >= 1.0 || lvpos.x < 0.0 || lvpos.x > 1.0 || lvpos.y < 0.0 || lvpos.y > 1.0) {
return invalidShadowmapUVZ;
}
vec2 uvShadow = cascadeCoordinates(i, shadowMapSize, lvpos);
return vec3(uvShadow, lvpos.z);
}`)}function Qa(e){e.fragment.code.add(He`float readShadowMapUVZ(vec3 uvzShadow, sampler2DShadow _shadowMap) {
return texture(_shadowMap, uvzShadow);
}`)}class eo extends M{constructor(e,t){super(e,"sampler2DShadow",0,(a,o)=>a.bindTexture(e,t(o)))}}class to extends J{constructor(){super(...arguments),this.origin=c()}}function ao(e,t){t.receiveShadows&&e.include($a),io(e,t)}function oo(e,t){t.receiveShadows&&e.include(Xa),io(e,t)}function io(e,t){e.fragment.uniforms.add(new Z("lightingGlobalFactor",e=>e.lighting.globalFactor));const{receiveShadows:a,spherical:o}=t;e.include(Ja,t),a&&function(e){e.include(Qa),e.fragment.uniforms.add(new eo("shadowMap",({shadowMap:e})=>e.depthTexture)).code.add(He`float readShadowMap(const in vec3 _worldPos, float _linearDepth) {
vec3 uvzShadow = calculateUVZShadow(_worldPos, _linearDepth, textureSize(shadowMap,0));
if (uvzShadow.z < 0.0) {
return 0.0;
}
return readShadowMapUVZ(uvzShadow, shadowMap);
}`)}(e),e.fragment.code.add(He`
    float readShadow(float additionalAmbientScale, vec3 vpos) {
      return ${a?"max(lightingGlobalFactor * (1.0 - additionalAmbientScale), readShadowMap(vpos, linearDepth))":Ue(o,"lightingGlobalFactor * (1.0 - additionalAmbientScale)","0.0")};
    }
  `)}function ro(e,t){t.hasColorTextureTransform?(e.varyings.add("colorUV","vec2"),e.vertex.uniforms.add(new I("colorTextureTransformMatrix",e=>e.colorTextureTransformMatrix??Be)).code.add(He`void forwardColorUV(){
colorUV = (colorTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(He`void forwardColorUV(){}`)}function no(e,t){t.hasNormalTextureTransform&&0!==t.textureCoordinateType?(e.varyings.add("normalUV","vec2"),e.vertex.uniforms.add(new I("normalTextureTransformMatrix",e=>e.normalTextureTransformMatrix??Be)).code.add(He`void forwardNormalUV(){
normalUV = (normalTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(He`void forwardNormalUV(){}`)}function so(e,t){t.hasEmissionTextureTransform&&0!==t.textureCoordinateType?(e.varyings.add("emissiveUV","vec2"),e.vertex.uniforms.add(new I("emissiveTextureTransformMatrix",e=>e.emissiveTextureTransformMatrix??Be)).code.add(He`void forwardEmissiveUV(){
emissiveUV = (emissiveTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(He`void forwardEmissiveUV(){}`)}function lo(e,t){t.hasOcclusionTextureTransform&&0!==t.textureCoordinateType?(e.varyings.add("occlusionUV","vec2"),e.vertex.uniforms.add(new I("occlusionTextureTransformMatrix",e=>e.occlusionTextureTransformMatrix??Be)).code.add(He`void forwardOcclusionUV(){
occlusionUV = (occlusionTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(He`void forwardOcclusionUV(){}`)}function co(e,t){t.hasMetallicRoughnessTextureTransform&&0!==t.textureCoordinateType?(e.varyings.add("metallicRoughnessUV","vec2"),e.vertex.uniforms.add(new I("metallicRoughnessTextureTransformMatrix",e=>e.metallicRoughnessTextureTransformMatrix??Be)).code.add(He`void forwardMetallicRoughnessUV(){
metallicRoughnessUV = (metallicRoughnessTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(He`void forwardMetallicRoughnessUV(){}`)}function uo(e){e.include(te),e.code.add(He`
    vec3 mixExternalColor(vec3 internalColor, vec3 textureColor, vec3 externalColor, int mode) {
      // workaround for artifacts in macOS using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      vec3 internalMixed = internalColor * textureColor;
      vec3 allMixed = internalMixed * externalColor;

      if (mode == ${He.int(1)}) {
        return allMixed;
      }
      if (mode == ${He.int(2)}) {
        return internalMixed;
      }
      if (mode == ${He.int(3)}) {
        return externalColor;
      }

      // tint (or something invalid)
      float vIn = rgb2v(internalMixed);
      vec3 hsvTint = rgb2hsv(externalColor);
      vec3 hsvOut = vec3(hsvTint.x, hsvTint.y, vIn * hsvTint.z);
      return hsv2rgb(hsvOut);
    }

    float mixExternalOpacity(float internalOpacity, float textureOpacity, float externalOpacity, int mode) {
      // workaround for artifacts in macOS using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      float internalMixed = internalOpacity * textureOpacity;
      float allMixed = internalMixed * externalOpacity;

      if (mode == ${He.int(2)}) {
        return internalMixed;
      }
      if (mode == ${He.int(3)}) {
        return externalOpacity;
      }

      // multiply or tint (or something invalid)
      return allMixed;
    }
  `)}function ho(e,t){t.snowCover&&(e.code.add(He`float getSnow(vec3 normal, vec3 normalGround) {
return smoothstep(0.5, 0.55, dot(normal, normalGround));
}`),e.code.add(He`vec3 applySnowToMRR(vec3 mrr, float snow) {
return mix(mrr, vec3(0.0, 1.0, 0.04), snow);
}
vec4 snowCoverForEmissions(vec4 emission, float snow) {
return mix(emission, vec4(0.0), snow);
}`))}const mo=Object.freeze(Object.defineProperty({__proto__:null,build:function(e){const t=new _t,{attributes:a,vertex:o,fragment:i,varyings:r}=t,{output:n,normalType:s,offsetBackfaces:l,spherical:c,snowCover:d,pbrMode:u,textureAlphaPremultiplied:h,instancedDoublePrecision:p,hasVertexColors:g,hasVertexTangents:x,hasColorTexture:w,hasNormalTexture:M,hasNormalTextureTransform:T,hasColorTextureTransform:S,hasBloom:_}=e;if(D(o,e),a.add("position","vec3"),r.add("vpos","vec3",{invariant:!0}),t.include(B,e),t.include(la,e),t.include(z,e),t.include(ro,e),!y(n))return t.include(fa,e),t;t.include(no,e),t.include(so,e),t.include(lo,e),t.include(co,e),ae(o,e),t.include(Pt,e),t.include(_e,e);const C=0===s||1===s;return C&&l&&t.include(ra),t.include(va,e),t.include(Rt,e),t.include(na,e),r.add("vPositionLocal","vec3"),t.include(f,e),t.include(da,e),t.include(Fe,e),o.uniforms.add(new oe("externalColor",e=>e.externalColor,{supportsNaN:!0})),r.add("vcolorExt","vec4"),t.include(ie,e),o.include(N),o.include(re),t.include(p?ao:oo,e),o.main.add(He`
    forwardNormalizedVertexColor();

    MaskedColor maskedColor =
      applySymbolColor(applyVVColor(applyInstanceColor(createMaskedFromNaNColor(externalColor))));

    vcolorExt = maskedColor.color;
    forwardColorMixMode(maskedColor.mask);

    vpos = getVertexInLocalOriginSpace();
    vPositionLocal = vpos - view[3].xyz;
    vpos = subtractOrigin(vpos);
    ${Ue(C,"vNormalWorld = dpNormal(vvLocalNormal(normalModel()));")}
    vpos = addVerticalOffset(vpos, localOrigin);
    ${Ue(x,"vTangent = dpTransformVertexTangent(tangent);")}
    gl_Position = transformPosition(proj, view, vpos);
    ${Ue(C&&l,"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);")}

    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    forwardTextureCoordinates();
    forwardColorUV();
    forwardNormalUV();
    forwardEmissiveUV();
    forwardOcclusionUV();
    forwardMetallicRoughnessUV();

    if (opacityMixMode != ${He.int(A.ignore)} && vcolorExt.a < ${He.float(ut)}) {
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
    }
    forwardLinearDepthToReadShadowMap();
  `),t.include(ka,e),i.include(Na,e),t.include(ha,e),i.include(H,e),t.include(ne,e),ae(i,e),i.uniforms.add(o.uniforms.get("localOrigin"),new b("ambient",e=>e.ambient),new b("diffuse",e=>e.diffuse),new m("opacity",e=>e.opacity),new m("layerOpacity",e=>e.layerOpacity)),w&&i.uniforms.add(new v("tex",e=>e.texture)),t.include(qa,e),i.include(Aa,e),i.include(uo),t.include(Ya,e),i.include(ho,e),Ua(i),Wa(i),Pa(i),i.main.add(He`
    discardBySlice(vpos);
    discardByTerrainDepth();
    ${w?He`
            vec4 texColor = texture(tex, ${S?"colorUV":"vuv0"});
            ${Ue(h,"texColor.rgb /= texColor.a;")}
            discardOrAdjustAlpha(texColor);`:He`vec4 texColor = vec4(1.0);`}
    shadingParams.viewDirection = normalize(vpos - cameraPosition);
    ${2===s?He`vec3 normal = screenDerivativeNormal(vPositionLocal);`:He`shadingParams.normalView = vNormalWorld;
                vec3 normal = shadingNormal(shadingParams);`}
    applyPBRFactors();
    float ssao = evaluateAmbientOcclusionInverse() * getBakedOcclusion();

    vec3 posWorld = vpos + localOrigin;

    float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
    float shadow = readShadow(additionalAmbientScale, vpos);

    vec3 matColor = max(ambient, diffuse);
    vec3 albedo = mixExternalColor(${Ue(g,"vColor.rgb *")} matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
    float opacity_ = layerOpacity * mixExternalOpacity(${Ue(g,"vColor.a * ")} opacity, texColor.a, vcolorExt.a, opacityMixMode);

    ${M?`mat3 tangentSpace = computeTangentSpace(${x?"normal":"normal, vpos, vuv0"});\n            vec3 shadingNormal = computeTextureNormal(tangentSpace, ${T?"normalUV":"vuv0"});`:"vec3 shadingNormal = normal;"}
    vec3 normalGround = ${c?"normalize(posWorld);":"vec3(0.0, 0.0, 1.0);"}

    ${Ue(d,He`
          float snow = getSnow(normal, normalGround);
          albedo = mix(albedo, vec3(1), snow);
          shadingNormal = mix(shadingNormal, normal, snow);
          ssao = mix(ssao, 1.0, snow);`)}

    vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

    ${1===u||2===u?He`
            float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
            vec4 emission = ${_?"vec4(0.0)":"getEmissions(albedo)"};
            ${Ue(d,"mrr = applySnowToMRR(mrr, snow);\n               emission = snowCoverForEmissions(emission, snow);")}
            vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:He`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
    vec4 finalColor = vec4(shadedColor, opacity_);
    outputColorHighlightOID(finalColor, vpos, albedo ${Ue(d,", snow")});
  `),t}},Symbol.toStringTag,{value:"Module"}));class po extends Gt{constructor(){super(...arguments),this.isSchematic=!1,this.usePBR=!1,this.mrrFactors=aa,this.hasVertexColors=!1,this.hasSymbolColors=!1,this.doubleSided=!1,this.doubleSidedType="normal",this.cullFace=2,this.instanced=!1,this.instancedFeatureAttribute=!1,this.instancedColor=!1,this.instanceColorEncodesAlphaIgnore=!1,this.emissiveStrength=0,this.emissiveSource=1,this.emissiveBaseColor=u,this.instancedDoublePrecision=!1,this.normalType=0,this.receiveShadows=!0,this.receiveAmbientOcclusion=!0,this.castShadows=!0,this.ambient=d(.2,.2,.2),this.diffuse=d(.8,.8,.8),this.externalColor=Ve(1,1,1,1),this.colorMixMode="multiply",this.opacity=1,this.layerOpacity=1,this.origin=c(),this.hasSlicePlane=!1,this.offsetTransparentBackfaces=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.vvSymbolAnchor=null,this.vvSymbolRotationMatrix=null,this.modelTransformation=null,this.drivenOpacity=!1,this.writeDepth=!0,this.customDepthTest=0,this.textureAlphaMode=0,this.textureAlphaCutoff=ut,this.textureAlphaPremultiplied=!1,this.renderOccluded=1,this.isDecoration=!1}get hasVVSize(){return!!this.vvSize}get hasVVColor(){return!!this.vvColor}get hasVVOpacity(){return!!this.vvOpacity}}class fo extends At{constructor(){super(...arguments),this.origin=c(),this.slicePlaneLocalOrigin=this.origin}}class vo extends Y{constructor(e,t,a=new q(mo,()=>Promise.resolve().then(()=>mo))){const o=[Ee(go(t))];t.instanced&&t.instancedDoublePrecision&&o.push(Ee(Qt(t))),super(e,t,a,Lt(o))}_makePipeline(e,t){const{oitPass:a,output:o,transparent:i,cullFace:r,customDepthTest:n,hasOccludees:s}=e;return Ct({blending:y(o)&&i?pe(a):null,culling:(l=e,0===l.cullFace&&(l.hasSlicePlane||l.transparent||l.doubleSidedMode)?null:Ft(r)),depthTest:{func:me(a,(c=n,1===c?515:513))},depthWrite:le(e),drawBuffers:he(o,fe(a,o)),colorWrite:zt,stencilWrite:s?ue:null,stencilTest:s?t?ce:de:null,polygonOffset:se(e)});var l,c}initializePipeline(e){return this._occludeePipelineState=this._makePipeline(e,!0),this._makePipeline(e,!1)}getPipeline(e){return e?this._occludeePipelineState:super.getPipeline()}}function go(e){const t=Le().vec3f("position");return 1===e.normalType?t.vec2i16("normalCompressed",{glNormalized:!0}):t.vec3f("normal"),e.hasVertexTangents&&t.vec4f("tangent"),e.hasTextures&&t.vec2f16("uv0"),e.hasVertexColors&&t.vec4u8("color"),e.hasSymbolColors&&t.vec4u8("symbolColor"),!e.instanced&&O()&&t.vec4u8("olidColor"),t}class xo extends ve{constructor(e){super(),this.spherical=e,this.alphaDiscardMode=1,this.doubleSidedMode=0,this.pbrMode=0,this.cullFace=0,this.normalType=0,this.customDepthTest=0,this.emissionSource=0,this.hasVertexColors=!1,this.hasSymbolColors=!1,this.hasVerticalOffset=!1,this.hasColorTexture=!1,this.hasMetallicRoughnessTexture=!1,this.hasOcclusionTexture=!1,this.hasNormalTexture=!1,this.hasScreenSizePerspective=!1,this.hasVertexTangents=!1,this.hasOccludees=!1,this.instanced=!1,this.instancedDoublePrecision=!1,this.hasModelTransformation=!1,this.offsetBackfaces=!1,this.hasVVSize=!1,this.hasVVColor=!1,this.receiveShadows=!1,this.receiveAmbientOcclusion=!1,this.textureAlphaPremultiplied=!1,this.instancedFeatureAttribute=!1,this.instancedColor=!1,this.writeDepth=!0,this.transparent=!1,this.enableOffset=!0,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.snowCover=!1,this.hasBloom=!1,this.hasColorTextureTransform=!1,this.hasEmissionTextureTransform=!1,this.hasNormalTextureTransform=!1,this.hasOcclusionTextureTransform=!1,this.hasMetallicRoughnessTextureTransform=!1,this.occlusionPass=!1,this.useCustomDTRExponentForWater=!1,this.useFillLights=!0,this.draped=!1}get textureCoordinateType(){return this.hasTextures?1:0}get hasTextures(){return this.hasColorTexture||this.hasNormalTexture||this.hasMetallicRoughnessTexture||3===this.emissionSource||this.hasOcclusionTexture}get hasVVInstancing(){return this.instanced}get discardInvisibleFragments(){return this.transparent}}Ze([ge({count:4})],xo.prototype,"alphaDiscardMode",void 0),Ze([ge({count:3})],xo.prototype,"doubleSidedMode",void 0),Ze([ge({count:7})],xo.prototype,"pbrMode",void 0),Ze([ge({count:3})],xo.prototype,"cullFace",void 0),Ze([ge({count:3})],xo.prototype,"normalType",void 0),Ze([ge({count:2})],xo.prototype,"customDepthTest",void 0),Ze([ge({count:8})],xo.prototype,"emissionSource",void 0),Ze([ge()],xo.prototype,"hasVertexColors",void 0),Ze([ge()],xo.prototype,"hasSymbolColors",void 0),Ze([ge()],xo.prototype,"hasVerticalOffset",void 0),Ze([ge()],xo.prototype,"hasColorTexture",void 0),Ze([ge()],xo.prototype,"hasMetallicRoughnessTexture",void 0),Ze([ge()],xo.prototype,"hasOcclusionTexture",void 0),Ze([ge()],xo.prototype,"hasNormalTexture",void 0),Ze([ge()],xo.prototype,"hasScreenSizePerspective",void 0),Ze([ge()],xo.prototype,"hasVertexTangents",void 0),Ze([ge()],xo.prototype,"hasOccludees",void 0),Ze([ge()],xo.prototype,"instanced",void 0),Ze([ge()],xo.prototype,"instancedDoublePrecision",void 0),Ze([ge()],xo.prototype,"hasModelTransformation",void 0),Ze([ge()],xo.prototype,"offsetBackfaces",void 0),Ze([ge()],xo.prototype,"hasVVSize",void 0),Ze([ge()],xo.prototype,"hasVVColor",void 0),Ze([ge()],xo.prototype,"receiveShadows",void 0),Ze([ge()],xo.prototype,"receiveAmbientOcclusion",void 0),Ze([ge()],xo.prototype,"textureAlphaPremultiplied",void 0),Ze([ge()],xo.prototype,"instancedFeatureAttribute",void 0),Ze([ge()],xo.prototype,"instancedColor",void 0),Ze([ge()],xo.prototype,"writeDepth",void 0),Ze([ge()],xo.prototype,"transparent",void 0),Ze([ge()],xo.prototype,"enableOffset",void 0),Ze([ge()],xo.prototype,"terrainDepthTest",void 0),Ze([ge()],xo.prototype,"cullAboveTerrain",void 0),Ze([ge()],xo.prototype,"snowCover",void 0),Ze([ge()],xo.prototype,"hasBloom",void 0),Ze([ge()],xo.prototype,"hasColorTextureTransform",void 0),Ze([ge()],xo.prototype,"hasEmissionTextureTransform",void 0),Ze([ge()],xo.prototype,"hasNormalTextureTransform",void 0),Ze([ge()],xo.prototype,"hasOcclusionTextureTransform",void 0),Ze([ge()],xo.prototype,"hasMetallicRoughnessTextureTransform",void 0);const bo=Object.freeze(Object.defineProperty({__proto__:null,build:function(e){const t=new _t,{attributes:a,vertex:o,fragment:i,varyings:r}=t,{output:n,offsetBackfaces:s,pbrMode:l,snowCover:c,spherical:d,hasBloom:u}=e,h=1===l||2===l;if(D(o,e),a.add("position","vec3"),r.add("vpos","vec3",{invariant:!0}),t.include(B,e),t.include(la,e),t.include(z,e),t.include(ie,e),!y(n))return t.include(fa,e),t;ae(t.vertex,e),t.include(Pt,e),t.include(_e,e),s&&t.include(ra),r.add("vNormalWorld","vec3"),r.add("localvpos","vec3",{invariant:!0}),t.include(f,e),t.include(da,e),t.include(na,e),t.include(Fe,e),o.include(N),o.include(re),o.uniforms.add(new oe("externalColor",e=>e.externalColor,{supportsNaN:!0})),r.add("vcolorExt","vec4"),t.include(e.instancedDoublePrecision?ao:oo,e),o.main.add(He`
      forwardNormalizedVertexColor();

      MaskedColor maskedColorExt =
        applySymbolColor(applyVVColor(applyInstanceColor(createMaskedFromNaNColor(externalColor))));

      vcolorExt = maskedColorExt.color;
      forwardColorMixMode(maskedColorExt.mask);

      bool alphaCut = opacityMixMode != ${He.int(A.ignore)} && vcolorExt.a < ${He.float(ut)};
      vpos = getVertexInLocalOriginSpace();
      localvpos = vpos - view[3].xyz;
      vpos = subtractOrigin(vpos);
      vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
      vpos = addVerticalOffset(vpos, localOrigin);
      vec4 basePosition = transformPosition(proj, view, vpos);

      forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
      forwardTextureCoordinates();
      forwardLinearDepthToReadShadowMap();
      gl_Position = alphaCut ? vec4(1e38, 1e38, 1e38, 1.0) :
      ${Ue(s,"offsetBackfacingClipPosition(basePosition, vpos, vNormalWorld, cameraPosition);","basePosition;")}
    `);const{hasColorTexture:p,hasColorTextureTransform:g}=e;return t.include(ka,e),i.include(Na,e),t.include(ha,e),i.include(H,e),t.include(ne,e),ae(i,e),La(i),Ua(i),Wa(i),i.uniforms.add(o.uniforms.get("localOrigin"),o.uniforms.get("view"),new b("ambient",e=>e.ambient),new b("diffuse",e=>e.diffuse),new m("opacity",e=>e.opacity),new m("layerOpacity",e=>e.layerOpacity)),p&&i.uniforms.add(new v("tex",e=>e.texture)),t.include(qa,e),i.include(Aa,e),i.include(uo),Pa(i),i.main.add(He`
      discardBySlice(vpos);
      discardByTerrainDepth();
      vec4 texColor = ${p?`texture(tex, ${g?"colorUV":"vuv0"})`:" vec4(1.0)"};
      ${Ue(p,`${Ue(e.textureAlphaPremultiplied,"texColor.rgb /= texColor.a;")}\n        discardOrAdjustAlpha(texColor);`)}
      vec3 viewDirection = normalize(vpos - cameraPosition);
      applyPBRFactors();
      float ssao = evaluateAmbientOcclusionInverse();
      ssao *= getBakedOcclusion();

      float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
      vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
      float shadow = readShadow(additionalAmbientScale, vpos);
      vec3 matColor = max(ambient, diffuse);
      ${e.hasVertexColors?He`vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
             float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, opacityMixMode);`:He`vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
             float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, opacityMixMode);`}

      ${Ue(c,"albedo = mix(albedo, vec3(1), 0.9);")}
      ${He`vec3 shadingNormal = normalize(vNormalWorld);
             albedo *= 1.2;
             vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
             float alignmentLightView = clamp(dot(viewForward, -mainLightDirection), 0.0, 1.0);
             float transmittance = 1.0 - clamp(dot(viewForward, shadingNormal), 0.0, 1.0);
             float treeRadialFalloff = vColor.r;
             float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
             additionalLight += backLightFactor * mainLightIntensity;`}
      ${Ue(h,`vec3 normalGround = ${d?"normalize(vpos + localOrigin)":"vec3(0.0, 0.0, 1.0)"};`)}
      ${h?He`float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
                 ${Ue(c,He`mrr = applySnowToMRR(mrr, 1.0)`)}
            vec4 emission = ${c||u?"vec4(0.0)":"getEmissions(albedo)"};
            vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:He`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
      vec4 finalColor = vec4(shadedColor, opacity_);
      outputColorHighlightOID(finalColor, vpos, albedo ${Ue(c,", 1.0")});`),t}},Symbol.toStringTag,{value:"Module"}));class wo extends vo{constructor(e,t){super(e,t,new q(bo,()=>Promise.resolve().then(()=>bo)))}}class yo extends xe{constructor(e,t){super(e,To),this.materialType="default",this.supportsEdges=!0,this.intersectDraped=void 0,this.produces=new Map([[2,e=>(T(e)||S(e))&&!this.transparent],[4,e=>(T(e)||S(e))&&this.transparent&&this.parameters.writeDepth],[8,e=>(T(e)||S(e))&&this.transparent&&!this.parameters.writeDepth]]),this._layout=go(this.parameters),this._configuration=new xo(t.spherical)}isVisibleForOutput(e){return 4!==e&&6!==e&&5!==e||this.parameters.castShadows}get visible(){const{layerOpacity:e,colorMixMode:t,opacity:a,externalColor:o}=this.parameters;return e*("replace"===t?1:a)*("ignore"===t||isNaN(o[3])?1:o[3])>=ut}get _hasEmissiveBase(){return!!this.parameters.emissiveTextureId||!t(this.parameters.emissiveBaseColor,u)}get hasEmissions(){return this.parameters.emissiveStrength>0&&(0===this.parameters.emissiveSource&&this._hasEmissiveBase||1===this.parameters.emissiveSource)}getConfiguration(e,t){const{parameters:a,_configuration:o}=this,{treeRendering:i,doubleSided:r,doubleSidedType:n}=a;return super.getConfiguration(e,t,this._configuration),o.hasNormalTexture=a.hasNormalTexture,o.hasColorTexture=a.hasColorTexture,o.hasMetallicRoughnessTexture=a.hasMetallicRoughnessTexture,o.hasOcclusionTexture=a.hasOcclusionTexture,o.hasVertexTangents=!i&&a.hasVertexTangents,o.instanced=a.instanced,o.instancedDoublePrecision=a.instancedDoublePrecision,o.hasVVColor=!!a.vvColor,o.hasVVSize=!!a.vvSize,o.hasVerticalOffset=null!=a.verticalOffset,o.hasScreenSizePerspective=null!=a.screenSizePerspective,o.hasSlicePlane=a.hasSlicePlane,o.alphaDiscardMode=a.textureAlphaMode,o.normalType=i?0:a.normalType,o.transparent=this.transparent,o.writeDepth=a.writeDepth,o.customDepthTest=a.customDepthTest??0,o.hasOccludees=t.hasOccludees,o.cullFace=a.hasSlicePlane?0:a.cullFace,o.cullAboveTerrain=t.cullAboveTerrain,o.hasModelTransformation=!i&&null!=a.modelTransformation,o.hasVertexColors=a.hasVertexColors,o.hasSymbolColors=a.hasSymbolColors,o.doubleSidedMode=i?2:r&&"normal"===n?1:r&&"winding-order"===n?2:0,o.instancedFeatureAttribute=a.instancedFeatureAttribute,o.instancedColor=a.instancedColor,y(e)?(o.terrainDepthTest=t.terrainDepthTest,o.receiveShadows=a.receiveShadows,o.receiveAmbientOcclusion=a.receiveAmbientOcclusion&&null!=t.ssao):(o.terrainDepthTest=!1,o.receiveShadows=o.receiveAmbientOcclusion=!1),o.textureAlphaPremultiplied=!!a.textureAlphaPremultiplied,o.pbrMode=a.usePBR?a.isSchematic?2:1:0,o.emissionSource=a.emissionSource,o.offsetBackfaces=!(!this.transparent||!a.offsetTransparentBackfaces),o.oitPass=t.oitPass,o.enableOffset=t.camera.relativeElevation<be,o.snowCover=t.snowCover,o.hasBloom=_(e),o.hasColorTextureTransform=!!a.colorTextureTransformMatrix,o.hasNormalTextureTransform=!!a.normalTextureTransformMatrix,o.hasEmissionTextureTransform=!!a.emissiveTextureTransformMatrix,o.hasOcclusionTextureTransform=!!a.occlusionTextureTransformMatrix,o.hasMetallicRoughnessTextureTransform=!!a.metallicRoughnessTextureTransformMatrix,o}intersect(t,c,d,u,h,m){if(null!=this.parameters.verticalOffset){const t=d.camera;e(Oo,c[12],c[13],c[14]);let m=null;switch(d.viewingMode){case 1:m=o(Fo,Oo);break;case 2:m=a(Fo,zo)}let p=0;const f=i(No,Oo,t.eye),v=r(f),g=n(f,f,1/v);let x=null;this.parameters.screenSizePerspective&&(x=s(m,g)),p+=we(t,v,this.parameters.verticalOffset,x??0,this.parameters.screenSizePerspective),n(m,m,p),l(Io,m,d.transform.inverseRotation),u=i(_o,u,Io),h=i(Co,h,Io)}Ie(t,d,u,h,Ne(d.verticalOffset),m)}createGLMaterial(e){return new Mo(e)}createBufferWriter(){return new Oe(this._layout)}get transparent(){return So(this.parameters)}}class Mo extends F{constructor(e){super({...e,...e.material.parameters})}beginSlot(t){this._material.setParameters({receiveShadows:t.shadowMap.enabled});const a=this._material.parameters;this.updateTexture(a.textureId);const o=t.camera.viewInverseTransposeMatrix;return e(a.origin,o[3],o[7],o[11]),this._material.setParameters(this.textureBindParameters),this.getTechnique(a.treeRendering?wo:vo,t)}}class To extends po{constructor(){super(...arguments),this.treeRendering=!1,this.hasVertexTangents=!1}get hasNormalTexture(){return!this.treeRendering&&!!this.normalTextureId}get hasColorTexture(){return!!this.textureId}get hasMetallicRoughnessTexture(){return!this.treeRendering&&!!this.metallicRoughnessTextureId}get hasOcclusionTexture(){return!this.treeRendering&&!!this.occlusionTextureId}get emissionSource(){return this.treeRendering?0:null!=this.emissiveTextureId&&0===this.emissiveSource?3:this.usePBR?0===this.emissiveSource?2:1:0}get hasTextures(){return this.hasColorTexture||this.hasNormalTexture||this.hasMetallicRoughnessTexture||3===this.emissionSource||this.hasOcclusionTexture}}function So(e){const{drivenOpacity:t,opacity:a,externalColor:o,layerOpacity:i,texture:r,textureId:n,textureAlphaMode:s,colorMixMode:l}=e,c=o[3];return t||a<1&&"replace"!==l||c<1&&"ignore"!==l||i<1||(null!=r||null!=n)&&1!==s&&2!==s&&"replace"!==l}const _o=c(),Co=c(),zo=h(0,0,1),Fo=c(),Io=c(),Oo=c(),No=c();export{eo as A,Gt as B,va as C,yo as D,ka as E,Ia as F,Ht as I,uo as M,Pt as N,ua as O,Da as P,Xt as R,ho as S,Ha as T,At as V,aa as a,fo as b,La as c,Pa as d,ia as e,ga as f,Qt as g,xa as h,ta as i,To as j,So as k,oo as l,qa as m,Na as n,Ya as o,Ua as p,Wa as q,ja as r,oa as s,to as t,ea as u,Rt as v,ma as w,ao as x,$a as y,Qa as z};
