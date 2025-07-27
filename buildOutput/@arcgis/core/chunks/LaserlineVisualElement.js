/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import"../core/lang.js";import{k as e,h as t,t as i,n,l as s,x as r,e as a,c as l,j as o}from"./vec3.js";import{c,f as h,b as d}from"./vec3f64.js";import{p,c as f,g as u,h as g}from"./lineSegment.js";import{V as m}from"./VisualElement.js";import{_}from"./tslib.es6.js";import{f as v}from"./maybe.js";import{property as P}from"../core/accessorSupport/decorators/property.js";import"./Logger.js";import{subclass as b}from"../core/accessorSupport/decorators/subclass.js";import{c as w,f as V,i as x,g as D,a as E}from"./frustum.js";import{w as y}from"./ray.js";import{InternalRenderCategory as S}from"../views/3d/webgl.js";import L from"../views/3d/webgl/RenderNode.js";import{B as C,a as M}from"./BlendColorsPremultiplied.glsl.js";import{n as A}from"./DoubleArray.js";import{n as j,g as R}from"./InterleavedLayout.js";import{V as T}from"./VertexArrayObject2.js";import{a as U}from"./enums.js";import{V as I}from"./VertexBuffer.js";import{_ as q,g as O,i as z,ak as N,c as W,k as B,R as F,N as H,ai as G,E as k,B as $,x as X,$ as Z,al as J}from"./Matrix4PassUniform.js";import{e as K}from"./mathUtils.js";import{C as Q,S as Y,F as ee,P as te}from"./CameraSpace.glsl.js";import{s as ie}from"./vec2.js";import{c as ne}from"./vec2f64.js";import{t as se}from"./vec4.js";import{c as re}from"./vec4f64.js";import{c as ae,f as le}from"./plane.js";import{g as oe,b as ce}from"./sphere.js";import{F as he,d as de,T as pe}from"./Emissions.glsl.js";import{g as fe,I as ue}from"./glsl.js";import{S as ge}from"./ShaderBuilder.js";import{v as me}from"./mat4.js";import{c as _e}from"./mat4f64.js";class ve{constructor(e){this._renderCoordsHelper=e,this._origin=c(),this._dirty=!1,this._count=0}set vertices(e){const t=A(3*e.length);let i=0;for(const n of e)t[i++]=n[0],t[i++]=n[1],t[i++]=n[2];this.buffers=[t]}set buffers(t){if(this._buffers=t,this._buffers.length>0){const t=this._buffers[0],i=3*Math.floor(t.length/3/2);e(this._origin,t[i],t[i+1],t[i+2])}else e(this._origin,0,0,0);this._dirty=!0}get origin(){return this._origin}draw(e){const t=this._ensureVAO(e);null!=t&&(e.bindVAO(t),e.drawArrays(U.TRIANGLES,0,this._count))}dispose(){null!=this._vao&&this._vao.dispose()}get _layout(){return 1===this._renderCoordsHelper.viewingMode?Ve:xe}_ensureVAO(e){return null==this._buffers?null:(this._vao??=this._createVAO(e,this._buffers),this._ensureVertexData(this._vao,this._buffers),this._vao)}_createVAO(e,t){const i=this._createDataBuffer(t);return this._dirty=!1,new T(e,new I(e,R(this._layout),i))}_ensureVertexData(e,t){if(!this._dirty)return;const i=this._createDataBuffer(t);e.buffer()?.setData(i),this._dirty=!1}_createDataBuffer(i){const n=i.reduce((e,t)=>e+Pe(t),0);this._count=n;const s=this._layout.createBuffer(n),r=this._origin;let a=0,l=0;const o="startUp"in s?this._setUpVectors.bind(this,s):void 0;for(const n of i){for(let i=0;i<n.length;i+=3){const c=e(we,n[i],n[i+1],n[i+2]);0===i?l=this._renderCoordsHelper.getAltitude(c):this._renderCoordsHelper.setAltitude(c,l);const h=a+2*i;o?.(i,h,n,c);const d=t(we,c,r);if(i<n.length-3){for(let e=0;e<6;e++)s.start.setVec(h+e,d);s.extrude.setValues(h,0,-1),s.extrude.setValues(h+1,1,-1),s.extrude.setValues(h+2,1,1),s.extrude.setValues(h+3,0,-1),s.extrude.setValues(h+4,1,1),s.extrude.setValues(h+5,0,1)}if(i>0)for(let e=-6;e<0;e++)s.end.setVec(h+e,d)}a+=Pe(n)}return s.buffer}_setUpVectors(e,t,i,n,s){const r=this._renderCoordsHelper.worldUpAtPosition(s,be);if(t<n.length-3)for(let t=0;t<6;t++)e.startUp.setVec(i+t,r);if(t>0)for(let t=-6;t<0;t++)e.endUp.setVec(i+t,r)}}function Pe(e){return 2*(e.length/3-1)*3}const be=c(),we=c(),Ve=j().vec3f("start").vec3f("end").vec2f("extrude").vec3f("startUp").vec3f("endUp"),xe=j().vec3f("start").vec3f("end").vec2f("extrude");function De(e,t){const i=e.fragment;i.include(q),e.include(Q),i.include(C),i.uniforms.add(new he("globalAlpha",e=>e.globalAlpha),new de("glowColor",e=>e.glowColor),new he("glowWidth",(e,t)=>e.glowWidth*t.camera.pixelRatio),new he("glowFalloff",e=>e.glowFalloff),new de("innerColor",e=>e.innerColor),new he("innerWidth",(e,t)=>e.innerWidth*t.camera.pixelRatio),new O("depthMap",e=>e.depth?.attachment),new pe("normalMap",e=>e.normals)),i.code.add(fe`vec4 premultipliedColor(vec3 rgb, float alpha) {
return vec4(rgb * alpha, alpha);
}`),i.code.add(fe`vec4 laserlineProfile(float dist) {
if (dist > glowWidth) {
return vec4(0.0);
}
float innerAlpha = (1.0 - smoothstep(0.0, innerWidth, dist));
float glowAlpha = pow(max(0.0, 1.0 - dist / glowWidth), glowFalloff);
return blendColorsPremultiplied(
premultipliedColor(innerColor, innerAlpha),
premultipliedColor(glowColor, glowAlpha)
);
}`),i.code.add(fe`bool laserlineReconstructFromDepth(out vec3 pos, out vec3 normal, out float angleCutoffAdjust, out float depthDiscontinuityAlpha) {
float depth = depthFromTexture(depthMap, uv);
if (depth == 1.0) {
return false;
}
float linearDepth = linearizeDepth(depth);
pos = reconstructPosition(gl_FragCoord.xy, linearDepth);
float minStep = 6e-8;
float depthStep = clamp(depth + minStep, 0.0, 1.0);
float linearDepthStep = linearizeDepth(depthStep);
float depthError = abs(linearDepthStep - linearDepth);
vec3 normalReconstructed = normalize(cross(dFdx(pos), dFdy(pos)));
vec3 normalFromTexture = normalize(texture(normalMap, uv).xyz * 2.0 - 1.0);
float blendFactor = smoothstep(0.15, 0.2, depthError);
normal = normalize(mix(normalReconstructed, normalFromTexture, blendFactor));
angleCutoffAdjust = mix(0.0, 0.004, blendFactor);
float ddepth = fwidth(linearDepth);
depthDiscontinuityAlpha = 1.0 - smoothstep(0.0, 0.01, -ddepth / linearDepth);
return true;
}`),t.contrastControlEnabled?i.uniforms.add(new pe("frameColor",(e,t)=>e.colors),new he("globalAlphaContrastBoost",e=>e.globalAlphaContrastBoost)).code.add(fe`float rgbToLuminance(vec3 color) {
return dot(vec3(0.2126, 0.7152, 0.0722), color);
}
vec4 laserlineOutput(vec4 color) {
float backgroundLuminance = rgbToLuminance(texture(frameColor, uv).rgb);
float alpha = clamp(globalAlpha * max(backgroundLuminance * globalAlphaContrastBoost, 1.0), 0.0, 1.0);
return color * alpha;
}`):i.code.add(fe`vec4 laserlineOutput(vec4 color) {
return color * globalAlpha;
}`)}const Ee=K(6);function ye(e){return ie(Le,Math.cos(e.angleCutoff),Math.cos(Math.max(0,e.angleCutoff-K(2))))}function Se(e,t,n){return i(Re,e,n),a(Me,t),Me[3]=0,se(Me,Me,n),le(Re,Me,Te)}const Le=ne(),Ce=c(),Me=re(),Ae=c(),je=c(),Re=c(),Te=ae(),Ue=ce(),Ie=Object.freeze(Object.defineProperty({__proto__:null,build:function(e){const c=new ge;c.include(Y),c.include(De,e);const h=c.fragment;if(e.lineVerticalPlaneEnabled||e.heightManifoldEnabled)if(h.uniforms.add(new he("maxPixelDistance",(t,i)=>e.heightManifoldEnabled?2*i.camera.computeScreenPixelSizeAt(t.heightManifoldTarget):2*i.camera.computeScreenPixelSizeAt(t.lineVerticalPlaneSegment.origin))),h.code.add(fe`float planeDistancePixels(vec4 plane, vec3 pos) {
float dist = dot(plane.xyz, pos) + plane.w;
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}`),e.spherical){const e=(e,t,n)=>i(e,t.heightManifoldTarget,n.camera.viewMatrix),a=(e,t)=>i(e,[0,0,0],t.camera.viewMatrix);h.uniforms.add(new z("heightManifoldOrigin",(i,r)=>(e(Ce,i,r),a(je,r),t(je,je,Ce),n(Me,je),Me[3]=s(je),Me)),new N("globalOrigin",e=>a(Ce,e)),new he("cosSphericalAngleThreshold",(e,t)=>1-Math.max(2,r(t.camera.eye,e.heightManifoldTarget)*t.camera.perRenderPixelRatio)/s(e.heightManifoldTarget))),h.code.add(fe`float globeDistancePixels(float posInGlobalOriginLength) {
float dist = abs(posInGlobalOriginLength - heightManifoldOrigin.w);
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}
float heightManifoldDistancePixels(vec4 heightPlane, vec3 pos) {
vec3 posInGlobalOriginNorm = normalize(globalOrigin - pos);
float cosAngle = dot(posInGlobalOriginNorm, heightManifoldOrigin.xyz);
vec3 posInGlobalOrigin = globalOrigin - pos;
float posInGlobalOriginLength = length(posInGlobalOrigin);
float sphericalDistance = globeDistancePixels(posInGlobalOriginLength);
float planarDistance = planeDistancePixels(heightPlane, pos);
return cosAngle < cosSphericalAngleThreshold ? sphericalDistance : planarDistance;
}`)}else h.code.add(fe`float heightManifoldDistancePixels(vec4 heightPlane, vec3 pos) {
return planeDistancePixels(heightPlane, pos);
}`);if(e.pointDistanceEnabled&&(h.uniforms.add(new he("maxPixelDistance",(e,t)=>2*t.camera.computeScreenPixelSizeAt(e.pointDistanceTarget))),h.code.add(fe`float sphereDistancePixels(vec4 sphere, vec3 pos) {
float dist = distance(sphere.xyz, pos) - sphere.w;
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}`)),e.intersectsLineEnabled&&h.uniforms.add(new W("perScreenPixelRatio",e=>e.camera.perScreenPixelRatio)).code.add(fe`float lineDistancePixels(vec3 start, vec3 dir, float radius, vec3 pos) {
float dist = length(cross(dir, pos - start)) / (length(pos) * perScreenPixelRatio);
return abs(dist) - radius;
}`),(e.lineVerticalPlaneEnabled||e.intersectsLineEnabled)&&h.code.add(fe`bool pointIsWithinLine(vec3 pos, vec3 start, vec3 end) {
vec3 dir = end - start;
float t2 = dot(dir, pos - start);
float l2 = dot(dir, dir);
return t2 >= 0.0 && t2 <= l2;
}`),h.main.add(fe`vec3 pos;
vec3 normal;
float angleCutoffAdjust;
float depthDiscontinuityAlpha;
if (!laserlineReconstructFromDepth(pos, normal, angleCutoffAdjust, depthDiscontinuityAlpha)) {
fragColor = vec4(0.0);
return;
}
vec4 color = vec4(0.0);`),e.heightManifoldEnabled){h.uniforms.add(new ee("angleCutoff",e=>ye(e)),new z("heightPlane",(e,t)=>Se(e.heightManifoldTarget,e.renderCoordsHelper.worldUpAtPosition(e.heightManifoldTarget,Ce),t.camera.viewMatrix)));const t=e.spherical?fe`normalize(globalOrigin - pos)`:fe`heightPlane.xyz`;h.main.add(fe`
      vec2 angleCutoffAdjusted = angleCutoff - angleCutoffAdjust;
      // Fade out laserlines on flat surfaces
      float heightManifoldAlpha = 1.0 - smoothstep(angleCutoffAdjusted.x, angleCutoffAdjusted.y, abs(dot(normal, ${t})));
      vec4 heightManifoldColor = laserlineProfile(heightManifoldDistancePixels(heightPlane, pos));
      color = max(color, heightManifoldColor * heightManifoldAlpha);`)}return e.pointDistanceEnabled&&(h.uniforms.add(new ee("angleCutoff",e=>ye(e)),new z("pointDistanceSphere",(e,t)=>function(e,t){return i(oe(Ue),e.pointDistanceOrigin,t.camera.viewMatrix),Ue[3]=r(e.pointDistanceOrigin,e.pointDistanceTarget),Ue}(e,t))),h.main.add(fe`float pointDistanceSphereDistance = sphereDistancePixels(pointDistanceSphere, pos);
vec4 pointDistanceSphereColor = laserlineProfile(pointDistanceSphereDistance);
float pointDistanceSphereAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, normalize(pos - pointDistanceSphere.xyz))));
color = max(color, pointDistanceSphereColor * pointDistanceSphereAlpha);`)),e.lineVerticalPlaneEnabled&&(h.uniforms.add(new ee("angleCutoff",e=>ye(e)),new z("lineVerticalPlane",(e,t)=>function(e,t){const i=p(e.lineVerticalPlaneSegment,.5,Ce),s=e.renderCoordsHelper.worldUpAtPosition(i,Ae),r=n(je,e.lineVerticalPlaneSegment.vector),a=l(Ce,s,r);return n(a,a),Se(e.lineVerticalPlaneSegment.origin,a,t.camera.viewMatrix)}(e,t)),new de("lineVerticalStart",(e,t)=>function(e,t){const n=a(Ce,e.lineVerticalPlaneSegment.origin);return e.renderCoordsHelper.setAltitude(n,0),i(n,n,t.camera.viewMatrix)}(e,t)),new de("lineVerticalEnd",(e,t)=>function(e,t){const n=o(Ce,e.lineVerticalPlaneSegment.origin,e.lineVerticalPlaneSegment.vector);return e.renderCoordsHelper.setAltitude(n,0),i(n,n,t.camera.viewMatrix)}(e,t))),h.main.add(fe`if (pointIsWithinLine(pos, lineVerticalStart, lineVerticalEnd)) {
float lineVerticalDistance = planeDistancePixels(lineVerticalPlane, pos);
vec4 lineVerticalColor = laserlineProfile(lineVerticalDistance);
float lineVerticalAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, lineVerticalPlane.xyz)));
color = max(color, lineVerticalColor * lineVerticalAlpha);
}`)),e.intersectsLineEnabled&&(h.uniforms.add(new ee("angleCutoff",e=>ye(e)),new de("intersectsLineStart",(e,t)=>i(Ce,e.lineStartWorld,t.camera.viewMatrix)),new de("intersectsLineEnd",(e,t)=>i(Ce,e.lineEndWorld,t.camera.viewMatrix)),new de("intersectsLineDirection",(e,t)=>(a(Me,e.intersectsLineSegment.vector),Me[3]=0,n(Ce,se(Me,Me,t.camera.viewMatrix)))),new he("intersectsLineRadius",e=>e.intersectsLineRadius)),h.main.add(fe`if (pointIsWithinLine(pos, intersectsLineStart, intersectsLineEnd)) {
float intersectsLineDistance = lineDistancePixels(intersectsLineStart, intersectsLineDirection, intersectsLineRadius, pos);
vec4 intersectsLineColor = laserlineProfile(intersectsLineDistance);
float intersectsLineAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, 1.0 - abs(dot(normal, intersectsLineDirection)));
color = max(color, intersectsLineColor * intersectsLineAlpha);
}`)),h.main.add(fe`fragColor = laserlineOutput(color * depthDiscontinuityAlpha);`),c},defaultAngleCutoff:Ee},Symbol.toStringTag,{value:"Module"}));class qe extends H{constructor(){super(...arguments),this.innerColor=h(1,1,1),this.innerWidth=1,this.glowColor=h(1,.5,0),this.glowWidth=8,this.glowFalloff=8,this.globalAlpha=.75,this.globalAlphaContrastBoost=2,this.angleCutoff=K(6),this.pointDistanceOrigin=c(),this.pointDistanceTarget=c(),this.lineVerticalPlaneSegment=f(),this.intersectsLineSegment=f(),this.intersectsLineRadius=3,this.heightManifoldTarget=c(),this.lineStartWorld=c(),this.lineEndWorld=c()}}class Oe extends B{constructor(e,t){super(e,t,new F(Ie,()=>Promise.resolve().then(()=>Ie)),te)}}const ze=ne(),Ne=_e(),We=Object.freeze(Object.defineProperty({__proto__:null,build:function(e){const t=new ge;t.include(De,e);const{vertex:i,fragment:n}=t;i.uniforms.add(new G("modelView",(e,{camera:t})=>me(Ne,t.viewMatrix,e.origin)),new k("proj",({camera:e})=>e.projectionMatrix),new he("glowWidth",(e,{camera:t})=>e.glowWidth*t.pixelRatio),new $("pixelToNDC",({camera:e})=>ie(ze,2/e.fullViewport[2],2/e.fullViewport[3]))),t.attributes.add("start","vec3"),t.attributes.add("end","vec3"),e.spherical&&(t.attributes.add("startUp","vec3"),t.attributes.add("endUp","vec3")),t.attributes.add("extrude","vec2"),t.varyings.add("uv","vec2"),t.varyings.add("vViewStart","vec3"),t.varyings.add("vViewEnd","vec3"),t.varyings.add("vViewSegmentNormal","vec3"),t.varyings.add("vViewStartNormal","vec3"),t.varyings.add("vViewEndNormal","vec3");const s=!e.spherical;return i.main.add(fe`
    vec3 pos = mix(start, end, extrude.x);

    vec4 viewPos = modelView * vec4(pos, 1);
    vec4 projPos = proj * viewPos;
    vec2 ndcPos = projPos.xy / projPos.w;

    // in planar we hardcode the up vectors to be Z-up */
    ${ue(s,fe`vec3 startUp = vec3(0, 0, 1);`)}
    ${ue(s,fe`vec3 endUp = vec3(0, 0, 1);`)}

    // up vector corresponding to the location of the vertex, selecting either startUp or endUp */
    vec3 up = extrude.y * mix(startUp, endUp, extrude.x);
    vec3 viewUp = (modelView * vec4(up, 0)).xyz;

    vec4 projPosUp = proj * vec4(viewPos.xyz + viewUp, 1);
    vec2 projUp = normalize(projPosUp.xy / projPosUp.w - ndcPos);

    // extrude ndcPos along projUp to the edge of the screen
    vec2 lxy = abs(sign(projUp) - ndcPos);
    ndcPos += length(lxy) * projUp;

    vViewStart = (modelView * vec4(start, 1)).xyz;
    vViewEnd = (modelView * vec4(end, 1)).xyz;

    vec3 viewStartEndDir = vViewEnd - vViewStart;

    vec3 viewStartUp = (modelView * vec4(startUp, 0)).xyz;

    // the normal of the plane that aligns with the segment and the up vector
    vViewSegmentNormal = normalize(cross(viewStartUp, viewStartEndDir));

    // the normal orthogonal to the segment normal and the start up vector
    vViewStartNormal = -normalize(cross(vViewSegmentNormal, viewStartUp));

    // the normal orthogonal to the segment normal and the end up vector
    vec3 viewEndUp = (modelView * vec4(endUp, 0)).xyz;
    vViewEndNormal = normalize(cross(vViewSegmentNormal, viewEndUp));

    // Add enough padding in the X screen space direction for "glow"
    float xPaddingPixels = sign(dot(vViewSegmentNormal, viewPos.xyz)) * (extrude.x * 2.0 - 1.0) * glowWidth;
    ndcPos.x += xPaddingPixels * pixelToNDC.x;

    // uv is used to read back depth to reconstruct the position at the fragment
    uv = ndcPos * 0.5 + 0.5;

    gl_Position = vec4(ndcPos, 0, 1);
  `),n.uniforms.add(new W("perScreenPixelRatio",e=>e.camera.perScreenPixelRatio)),n.code.add(fe`float planeDistance(vec3 planeNormal, vec3 planeOrigin, vec3 pos) {
return dot(planeNormal, pos - planeOrigin);
}
float segmentDistancePixels(vec3 segmentNormal, vec3 startNormal, vec3 endNormal, vec3 pos, vec3 start, vec3 end) {
float distSegmentPlane = planeDistance(segmentNormal, start, pos);
float distStartPlane = planeDistance(startNormal, start, pos);
float distEndPlane = planeDistance(endNormal, end, pos);
float dist = max(max(distStartPlane, distEndPlane), abs(distSegmentPlane));
float width = fwidth(distSegmentPlane);
float maxPixelDistance = length(pos) * perScreenPixelRatio * 2.0;
float pixelDist = dist / min(width, maxPixelDistance);
return abs(pixelDist);
}`),n.main.add(fe`fragColor = vec4(0.0);
vec3 dEndStart = vViewEnd - vViewStart;
if (dot(dEndStart, dEndStart) < 1e-5) {
return;
}
vec3 pos;
vec3 normal;
float angleCutoffAdjust;
float depthDiscontinuityAlpha;
if (!laserlineReconstructFromDepth(pos, normal, angleCutoffAdjust, depthDiscontinuityAlpha)) {
return;
}
float distance = segmentDistancePixels(
vViewSegmentNormal,
vViewStartNormal,
vViewEndNormal,
pos,
vViewStart,
vViewEnd
);
vec4 color = laserlineProfile(distance);
float alpha = (1.0 - smoothstep(0.995 - angleCutoffAdjust, 0.999 - angleCutoffAdjust, abs(dot(normal, vViewSegmentNormal))));
fragColor = laserlineOutput(color * alpha * depthDiscontinuityAlpha);`),t}},Symbol.toStringTag,{value:"Module"}));class Be extends qe{constructor(){super(...arguments),this.origin=c()}}class Fe extends B{constructor(e,t){super(e,t,new F(We,()=>Promise.resolve().then(()=>We)),He)}}const He=new Map([["start",0],["end",1],["extrude",2],["startUp",3],["endUp",4]]);class Ge extends Z{constructor(){super(...arguments),this.contrastControlEnabled=!1,this.spherical=!1}}_([X()],Ge.prototype,"contrastControlEnabled",void 0),_([X()],Ge.prototype,"spherical",void 0);class ke extends Ge{constructor(){super(...arguments),this.heightManifoldEnabled=!1,this.pointDistanceEnabled=!1,this.lineVerticalPlaneEnabled=!1,this.intersectsLineEnabled=!1}}_([X()],ke.prototype,"heightManifoldEnabled",void 0),_([X()],ke.prototype,"pointDistanceEnabled",void 0),_([X()],ke.prototype,"lineVerticalPlaneEnabled",void 0),_([X()],ke.prototype,"intersectsLineEnabled",void 0);let $e=class extends L{constructor(e){super(e),this.isDecoration=!0,this.produces=S.LASERLINES,this.consumes={required:[S.LASERLINES,"normals"]},this.requireGeometryDepth=!0,this._configuration=new ke,this._pathTechniqueConfiguration=new Ge,this._heightManifoldEnabled=!1,this._pointDistanceEnabled=!1,this._lineVerticalPlaneEnabled=!1,this._intersectsLineEnabled=!1,this._intersectsLineInfinite=!1,this._pathVerticalPlaneEnabled=!1,this._passParameters=new Be;const t=e.view.stage.renderView.techniques,i=new Ge;i.contrastControlEnabled=e.contrastControlEnabled,t.precompile(Fe,i)}initialize(){this._passParameters.renderCoordsHelper=this.view.renderCoordsHelper,this._pathTechniqueConfiguration.spherical=1===this.view.state.viewingMode,this._pathTechniqueConfiguration.contrastControlEnabled=this.contrastControlEnabled,this._techniques.precompile(Fe,this._pathTechniqueConfiguration),this._blit=new M(this._techniques,2)}destroy(){this._pathVerticalPlaneData=v(this._pathVerticalPlaneData),this._blit=null}get _techniques(){return this.view.stage.renderView.techniques}get heightManifoldEnabled(){return this._heightManifoldEnabled}set heightManifoldEnabled(e){this._heightManifoldEnabled!==e&&(this._heightManifoldEnabled=e,this.requestRender(1))}get heightManifoldTarget(){return this._passParameters.heightManifoldTarget}set heightManifoldTarget(e){a(this._passParameters.heightManifoldTarget,e),this.requestRender(1)}get pointDistanceEnabled(){return this._pointDistanceEnabled}set pointDistanceEnabled(e){e!==this._pointDistanceEnabled&&(this._pointDistanceEnabled=e,this.requestRender(1))}get pointDistanceTarget(){return this._passParameters.pointDistanceTarget}set pointDistanceTarget(e){a(this._passParameters.pointDistanceTarget,e),this.requestRender(1)}get pointDistanceOrigin(){return this._passParameters.pointDistanceOrigin}set pointDistanceOrigin(e){a(this._passParameters.pointDistanceOrigin,e),this.requestRender(1)}get lineVerticalPlaneEnabled(){return this._lineVerticalPlaneEnabled}set lineVerticalPlaneEnabled(e){e!==this._lineVerticalPlaneEnabled&&(this._lineVerticalPlaneEnabled=e,this.requestRender(1))}get lineVerticalPlaneSegment(){return this._passParameters.lineVerticalPlaneSegment}set lineVerticalPlaneSegment(e){u(e,this._passParameters.lineVerticalPlaneSegment),this.requestRender(1)}get intersectsLineEnabled(){return this._intersectsLineEnabled}set intersectsLineEnabled(e){e!==this._intersectsLineEnabled&&(this._intersectsLineEnabled=e,this.requestRender(1))}get intersectsLineSegment(){return this._passParameters.intersectsLineSegment}set intersectsLineSegment(e){u(e,this._passParameters.intersectsLineSegment),this.requestRender(1)}get intersectsLineInfinite(){return this._intersectsLineInfinite}set intersectsLineInfinite(e){e!==this._intersectsLineInfinite&&(this._intersectsLineInfinite=e,this.requestRender(1))}get pathVerticalPlaneEnabled(){return this._pathVerticalPlaneEnabled}set pathVerticalPlaneEnabled(e){e!==this._pathVerticalPlaneEnabled&&(this._pathVerticalPlaneEnabled=e,null!=this._pathVerticalPlaneData&&this.requestRender(1))}set pathVerticalPlaneVertices(e){null==this._pathVerticalPlaneData&&(this._pathVerticalPlaneData=new ve(this._passParameters.renderCoordsHelper)),this._pathVerticalPlaneData.vertices=e,this.pathVerticalPlaneEnabled&&this.requestRender(1)}set pathVerticalPlaneBuffers(e){null==this._pathVerticalPlaneData&&(this._pathVerticalPlaneData=new ve(this._passParameters.renderCoordsHelper)),this._pathVerticalPlaneData.buffers=e,this.pathVerticalPlaneEnabled&&this.requestRender(1)}setParameters(e){J(this._passParameters,e)&&this.requestRender(1)}precompile(){this._acquireTechnique()}render(e){const t=e.find(({name:e})=>e===this.produces);if(this.isDecoration&&!this.bindParameters.decorations||null==this._blit)return t;const i=this.renderingContext,n=e.find(({name:e})=>"normals"===e);this._passParameters.normals=n?.getTexture();const s=()=>{(this.heightManifoldEnabled||this.pointDistanceEnabled||this.lineVerticalPlaneSegment||this.intersectsLineEnabled)&&this._renderUnified(),this.pathVerticalPlaneEnabled&&this._renderPath()};if(!this.contrastControlEnabled)return i.bindFramebuffer(t.fbo),s(),t;this._passParameters.colors=t.getTexture();const r=this.fboCache.acquire(t.fbo.width,t.fbo.height,"laser lines");return i.bindFramebuffer(r.fbo),i.setClearColor(0,0,0,0),i.clear(16640),s(),i.unbindTexture(t.getTexture()),this._blit.blend(i,r,t,this.bindParameters)||this.requestRender(1),r.release(),t}_acquireTechnique(){return this._configuration.heightManifoldEnabled=this.heightManifoldEnabled,this._configuration.lineVerticalPlaneEnabled=this.lineVerticalPlaneEnabled,this._configuration.pointDistanceEnabled=this.pointDistanceEnabled,this._configuration.intersectsLineEnabled=this.intersectsLineEnabled,this._configuration.contrastControlEnabled=this.contrastControlEnabled,this._configuration.spherical=1===this.view.state.viewingMode,this._techniques.get(Oe,this._configuration)}_renderUnified(){if(!this._updatePassParameters())return;const e=this._acquireTechnique();if(e.compiled){const t=this.renderingContext;t.bindTechnique(e,this.bindParameters,this._passParameters),t.screen.draw()}else this.requestRender(1)}_renderPath(){if(null==this._pathVerticalPlaneData)return;const e=this._techniques.get(Fe,this._pathTechniqueConfiguration);if(e.compiled){const t=this.renderingContext;this._passParameters.origin=this._pathVerticalPlaneData.origin,t.bindTechnique(e,this.bindParameters,this._passParameters),this._pathVerticalPlaneData.draw(t)}else this.requestRender(1)}_updatePassParameters(){if(!this._intersectsLineEnabled)return!0;const e=this.bindParameters.camera,t=this._passParameters;if(this._intersectsLineInfinite){if(V(y(t.intersectsLineSegment.origin,t.intersectsLineSegment.vector),Xe),Xe.c0=-Number.MAX_VALUE,!x(e.frustum,Xe))return!1;D(Xe,t.lineStartWorld),E(Xe,t.lineEndWorld)}else a(t.lineStartWorld,t.intersectsLineSegment.origin),o(t.lineEndWorld,t.intersectsLineSegment.origin,t.intersectsLineSegment.vector);return!0}get test(){}};_([P({constructOnly:!0})],$e.prototype,"contrastControlEnabled",void 0),_([P()],$e.prototype,"isDecoration",void 0),_([P()],$e.prototype,"produces",void 0),_([P()],$e.prototype,"consumes",void 0),$e=_([b("esri.views.3d.webgl-engine.effects.laserlines.LaserLineRenderer")],$e);const Xe=w();class Ze extends m{constructor(e){super(e),this._angleCutoff=Ee,this._style={},this._heightManifoldTarget=c(),this._heightManifoldEnabled=!1,this._intersectsLine=f(),this._intersectsLineEnabled=!1,this._intersectsLineInfinite=!1,this._lineVerticalPlaneSegment=null,this._pathVerticalPlaneBuffers=null,this._pointDistanceLine=null,this.applyProperties(e)}get testData(){}createResources(){this._ensureRenderer()}destroyResources(){this._disposeRenderer()}updateVisibility(){this._syncRenderer(),this._syncHeightManifold(),this._syncIntersectsLine(),this._syncPathVerticalPlane(),this._syncLineVerticalPlane(),this._syncPointDistance()}get angleCutoff(){return this._angleCutoff}set angleCutoff(e){this._angleCutoff!==e&&(this._angleCutoff=e,this._syncAngleCutoff())}get style(){return this._style}set style(e){this._style=e,this._syncStyle()}get heightManifoldTarget(){return this._heightManifoldEnabled?this._heightManifoldTarget:null}set heightManifoldTarget(e){null!=e?(a(this._heightManifoldTarget,e),this._heightManifoldEnabled=!0):this._heightManifoldEnabled=!1,this._syncRenderer(),this._syncHeightManifold()}set intersectsWorldUpAtLocation(e){if(null==e)return void(this.intersectsLine=null);const t=this.view.renderCoordsHelper.worldUpAtPosition(e,Je);this.intersectsLine=g(e,t),this.intersectsLineInfinite=!0}get intersectsLine(){return this._intersectsLineEnabled?this._intersectsLine:null}set intersectsLine(e){null!=e?(u(e,this._intersectsLine),this._intersectsLineEnabled=!0):this._intersectsLineEnabled=!1,this._syncIntersectsLine(),this._syncRenderer()}get intersectsLineInfinite(){return this._intersectsLineInfinite}set intersectsLineInfinite(e){this._intersectsLineInfinite=e,this._syncIntersectsLineInfinite()}get lineVerticalPlaneSegment(){return this._lineVerticalPlaneSegment}set lineVerticalPlaneSegment(e){this._lineVerticalPlaneSegment=null!=e?u(e):null,this._syncLineVerticalPlane(),this._syncRenderer()}get pathVerticalPlane(){return this._pathVerticalPlaneBuffers}set pathVerticalPlane(e){this._pathVerticalPlaneBuffers=e,this._syncPathVerticalPlane(),this._syncLineVerticalPlane(),this._syncPointDistance(),this._syncRenderer()}get pointDistanceLine(){return this._pointDistanceLine}set pointDistanceLine(e){this._pointDistanceLine=null!=e?{origin:d(e.origin),target:e.target?d(e.target):null}:null,this._syncPointDistance(),this._syncRenderer()}get isDecoration(){return this._isDecoration}set isDecoration(e){this._isDecoration=e,this._renderer&&(this._renderer.isDecoration=e)}_syncRenderer(){this.attached&&this.visible&&(this._intersectsLineEnabled||this._heightManifoldEnabled||null!=this._pointDistanceLine||null!=this._pathVerticalPlaneBuffers)?this._ensureRenderer():this._disposeRenderer()}_ensureRenderer(){null==this._renderer&&(this._renderer=new $e({view:this.view,contrastControlEnabled:!0,isDecoration:this.isDecoration}),this._syncStyle(),this._syncHeightManifold(),this._syncIntersectsLine(),this._syncIntersectsLineInfinite(),this._syncPathVerticalPlane(),this._syncLineVerticalPlane(),this._syncPointDistance(),this._syncAngleCutoff())}_syncStyle(){null!=this._renderer&&this._renderer.setParameters(this._style)}_syncAngleCutoff(){this._renderer?.setParameters({angleCutoff:this._angleCutoff})}_syncHeightManifold(){null!=this._renderer&&(this._renderer.heightManifoldEnabled=this._heightManifoldEnabled&&this.visible,this._heightManifoldEnabled&&(this._renderer.heightManifoldTarget=this._heightManifoldTarget))}_syncIntersectsLine(){null!=this._renderer&&(this._renderer.intersectsLineEnabled=this._intersectsLineEnabled&&this.visible,this._intersectsLineEnabled&&(this._renderer.intersectsLineSegment=this._intersectsLine))}_syncIntersectsLineInfinite(){null!=this._renderer&&(this._renderer.intersectsLineInfinite=this._intersectsLineInfinite)}_syncPathVerticalPlane(){null!=this._renderer&&(this._renderer.pathVerticalPlaneEnabled=null!=this._pathVerticalPlaneBuffers&&this.visible,null!=this._pathVerticalPlaneBuffers&&(this._renderer.pathVerticalPlaneBuffers=this._pathVerticalPlaneBuffers))}_syncLineVerticalPlane(){null!=this._renderer&&(this._renderer.lineVerticalPlaneEnabled=null!=this._lineVerticalPlaneSegment&&this.visible,null!=this._lineVerticalPlaneSegment&&(this._renderer.lineVerticalPlaneSegment=this._lineVerticalPlaneSegment))}_syncPointDistance(){if(null==this._renderer)return;const e=this._pointDistanceLine,t=null!=e;this._renderer.pointDistanceEnabled=t&&null!=e.target&&this.visible,t&&(this._renderer.pointDistanceOrigin=e.origin,null!=e.target&&(this._renderer.pointDistanceTarget=e.target))}_disposeRenderer(){null!=this._renderer&&this.view.stage&&(this._renderer.destroy(),this._renderer=null)}forEachMaterial(){}}const Je=c();export{Ze as L};
