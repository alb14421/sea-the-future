/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{k as e,D as t,t as i}from"./vec3.js";import{c as r}from"./vec3f64.js";import{m as a}from"./BufferView.js";import{T as s,i as o,f as n,b as c,g as l}from"./Emissions.glsl.js";import{t as p,a as d,B as h,F as v,d as u,E as m,c as f,e as g,S,o as P,C as y,i as w,H as z,k as x,R as _,s as b,m as T,p as V,q as k,r as C,u as D,v as O,w as j,I as W,J as L,K as M,L as A,P as $,x as F,D as N,M as R,z as E,A as U,Q as I}from"./Matrix4PassUniform.js";import{n as B}from"./InterleavedLayout.js";import{a as q,M as H,m as Y,b as G,c as J}from"./RibbonLineMaterial.js";import{R as K}from"./sdfPrimitives.js";import{g as Q,I as X}from"./glsl.js";import{S as Z}from"./ShaderBuilder.js";import{m as ee,d as te,u as ie}from"./renderState.js";import{_ as re}from"./tslib.es6.js";import{a as ae}from"./AlphaCutoff.js";const se=Object.freeze(Object.defineProperty({__proto__:null,build:function(e){const t=new Z,{space:i,anchor:r,hasTip:a}=e,o=2===i,n=1===i;t.include(q,e),t.include(H,e),t.include(p,e);const{vertex:c,fragment:l,varyings:x}=t;l.include(K),d(c,e),t.attributes.add("position","vec3"),t.attributes.add("previousDelta","vec4"),t.attributes.add("uv0","vec2"),x.add("vColor","vec4"),x.add("vpos","vec3",{invariant:!0}),x.add("vUV","vec2"),x.add("vSize","float"),a&&x.add("vLineWidth","float"),c.uniforms.add(new h("nearFar",({camera:e})=>e.nearFar),new v("viewport",({camera:e})=>e.fullViewport)).code.add(Q`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`),c.code.add(Q`void clip(vec4 pos, inout vec4 prev) {
float vnp = nearFar[0] * 0.99;
if (prev.z > -nearFar[0]) {
float interpolation = (-vnp - pos.z) / (prev.z - pos.z);
prev = mix(pos, prev, interpolation);
}
}`),o?(t.attributes.add("normal","vec3"),u(c),c.constants.add("tiltThreshold","float",.7),c.code.add(Q`vec3 perpendicular(vec3 v) {
vec3 n = (viewNormal * vec4(normal.xyz, 1.0)).xyz;
vec3 n2 = cross(v, n);
vec3 forward = vec3(0.0, 0.0, 1.0);
float tiltDot = dot(forward, n);
return abs(tiltDot) < tiltThreshold ? n : n2;
}`)):c.code.add(Q`vec2 perpendicular(vec2 v) {
return vec2(v.y, -v.x);
}`);const _=o?"vec3":"vec2";return c.code.add(Q`
      ${_} normalizedSegment(${_} pos, ${_} prev) {
        ${_} segment = pos - prev;
        float segmentLen = length(segment);

        // normalize or zero if too short
        return (segmentLen > 0.001) ? segment / segmentLen : ${o?"vec3(0.0, 0.0, 0.0)":"vec2(0.0, 0.0)"};
      }

      ${_} displace(${_} pos, ${_} prev, float displacementLen) {
        ${_} segment = normalizedSegment(pos, prev);

        ${_} displacementDirU = perpendicular(segment);
        ${_} displacementDirV = segment;

        ${1===r?"pos -= 0.5 * displacementLen * displacementDirV;":""}

        return pos + displacementLen * (uv0.x * displacementDirU + uv0.y * displacementDirV);
      }
    `),n&&(c.uniforms.add(new m("inverseProjectionMatrix",({camera:e})=>e.inverseProjectionMatrix)),c.code.add(Q`vec3 inverseProject(vec4 posScreen) {
posScreen.xy = (posScreen.xy / viewport.zw) * posScreen.w;
return (inverseProjectionMatrix * posScreen).xyz;
}`),c.code.add(Q`bool rayIntersectPlane(vec3 rayDir, vec3 planeOrigin, vec3 planeNormal, out vec3 intersection) {
float cos = dot(rayDir, planeNormal);
float t = dot(planeOrigin, planeNormal) / cos;
intersection = t * rayDir;
return abs(cos) > 0.001 && t > 0.0;
}`),c.uniforms.add(new f("perScreenPixelRatio",({camera:e})=>e.perScreenPixelRatio)),c.code.add(Q`
      vec4 toFront(vec4 displacedPosScreen, vec3 posLeft, vec3 posRight, vec3 prev, float lineWidth) {
        // Project displaced position back to camera space
        vec3 displacedPos = inverseProject(displacedPosScreen);

        // Calculate the plane that we want the marker to lie in. Note that this will always be an approximation since ribbon lines are generally
        // not planar and we do not know the actual position of the displaced prev vertices (they are offset in screen space, too).
        vec3 planeNormal = normalize(cross(posLeft - posRight, posLeft - prev));
        vec3 planeOrigin = posLeft;

        ${X(e.hasCap,"if(prev.z > posLeft.z) {\n                vec2 diff = posLeft.xy - posRight.xy;\n                planeOrigin.xy += perpendicular(diff) / 2.0;\n             }")};

        // Move the plane towards the camera by a margin dependent on the line width (approximated in world space). This tolerance corrects for the
        // non-planarity in most cases, but sharp joins can place the prev vertices at arbitrary positions so markers can still clip.
        float offset = lineWidth * perScreenPixelRatio;
        planeOrigin *= (1.0 - offset);

        // Intersect camera ray with the plane and make sure it is within clip space
        vec3 rayDir = normalize(displacedPos);
        vec3 intersection;
        if (rayIntersectPlane(rayDir, planeOrigin, planeNormal, intersection) && intersection.z < -nearFar[0] && intersection.z > -nearFar[1]) {
          return vec4(intersection.xyz, 1.0);
        }

        // Fallback: use depth of pos or prev, whichever is closer to the camera
        float minDepth = planeOrigin.z > prev.z ? length(planeOrigin) : length(prev);
        displacedPos *= minDepth / length(displacedPos);
        return vec4(displacedPos.xyz, 1.0);
      }
  `)),g(c),c.main.add(Q`
    // Check for special value of uv0.y which is used by the Renderer when graphics
    // are removed before the VBO is recompacted. If this is the case, then we just
    // project outside of clip space.
    if (uv0.y == 0.0) {
      // Project out of clip space
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
    }
    else {
      float lineWidth = getLineWidth();
      float screenMarkerSize = getScreenMarkerSize();

      vec4 pos  = view * vec4(position, 1.0);
      vec4 prev = view * vec4(position + previousDelta.xyz * previousDelta.w, 1.0);
      clip(pos, prev);

      ${o?Q`${X(e.hideOnShortSegments,Q`
                if (areWorldMarkersHidden(pos, prev)) {
                  // Project out of clip space
                  gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
                  return;
                }`)}
            pos.xyz = displace(pos.xyz, prev.xyz, getWorldMarkerSize(pos));
            vec4 displacedPosScreen = projectAndScale(pos);`:Q`
            vec4 posScreen = projectAndScale(pos);
            vec4 prevScreen = projectAndScale(prev);
            vec4 displacedPosScreen = posScreen;

            displacedPosScreen.xy = displace(posScreen.xy, prevScreen.xy, screenMarkerSize);
            ${X(n,Q`
                vec2 displacementDirU = perpendicular(normalizedSegment(posScreen.xy, prevScreen.xy));

                // We need three points of the ribbon line in camera space to calculate the plane it lies in
                // Note that we approximate the third point, since we have no information about the join around prev
                vec3 lineRight = inverseProject(posScreen + lineWidth * vec4(displacementDirU.xy, 0.0, 0.0));
                vec3 lineLeft = pos.xyz + (pos.xyz - lineRight);

                pos = toFront(displacedPosScreen, lineLeft, lineRight, prev.xyz, lineWidth);
                displacedPosScreen = projectAndScale(pos);`)}`}
      forwardViewPosDepth(pos.xyz);
      // Convert back into NDC
      displacedPosScreen.xy = (displacedPosScreen.xy / viewport.zw) * displacedPosScreen.w;

      // Convert texture coordinate into [0,1]
      vUV = (uv0 + 1.0) / 2.0;
      ${X(!o,"vUV *= displacedPosScreen.w;")}
      ${X(a,"vLineWidth = lineWidth;")}

      vSize = screenMarkerSize;
      vColor = getColor();

      // Use camera space for slicing
      vpos = pos.xyz;

      gl_Position = displacedPosScreen;
    }`),l.include(S,e),t.include(P,e),l.include(y),l.uniforms.add(new w("intrinsicColor",({color:e})=>e),new s("tex",({markerTexture:e})=>e)).constants.add("texelSize","float",1/Y).code.add(Q`float markerAlpha(vec2 samplePos) {
samplePos += vec2(0.5, -0.5) * texelSize;
float sdf = rgbaTofloat(texture(tex, samplePos)) - 0.5;
float distance = sdf * vSize;
distance -= 0.5;
return clamp(0.5 - distance, 0.0, 1.0);
}`),a&&l.constants.add("relativeMarkerSize","float",G/Y).constants.add("relativeTipLineWidth","float",J).code.add(Q`
    float tipAlpha(vec2 samplePos) {
      // Convert coordinates s.t. they are in pixels and relative to the tip of an arrow marker
      samplePos -= vec2(0.5, 0.5 + 0.5 * relativeMarkerSize);
      samplePos *= vSize;

      float halfMarkerSize = 0.5 * relativeMarkerSize * vSize;
      float halfTipLineWidth = 0.5 * max(1.0, relativeTipLineWidth * vLineWidth);

      ${X(o,"halfTipLineWidth *= fwidth(samplePos.y);")}

      float distance = max(abs(samplePos.x) - halfMarkerSize, abs(samplePos.y) - halfTipLineWidth);
      return clamp(0.5 - distance, 0.0, 1.0);
    }
  `),t.include(z,e),l.main.add(Q`
    discardBySlice(vpos);
    discardByTerrainDepth();

    vec4 finalColor = intrinsicColor * vColor;

    // Cancel out perspective correct interpolation if in screen space or draped
    vec2 samplePos = vUV ${X(!o,"* gl_FragCoord.w")};
    finalColor.a *= ${a?"max(markerAlpha(samplePos), tipAlpha(samplePos))":"markerAlpha(samplePos)"};
    outputColorHighlightOID(finalColor, vpos, finalColor.rgb);`),t}},Symbol.toStringTag,{value:"Module"}));class oe extends x{constructor(e,t){super(e,t,new _(se,()=>Promise.resolve().then(()=>se)),ne(t).locations)}_makePipelineState(e,t){const{output:i,oitPass:r,space:a,hasOccludees:s}=e;return ee({blending:o(i)?O(r):null,depthTest:0===a?null:{func:D(r)},depthWrite:C(e),drawBuffers:k(i,j(r,i)),colorWrite:te,stencilWrite:s?V:null,stencilTest:s?t?b:T:null,polygonOffset:{factor:0,units:-10}})}initializePipeline(e){return e.occluder?(this._occluderPipelineTransparent=ee({blending:ie,depthTest:L,depthWrite:null,colorWrite:te,stencilWrite:null,stencilTest:W}),this._occluderPipelineOpaque=ee({blending:ie,depthTest:L,depthWrite:null,colorWrite:te,stencilWrite:A,stencilTest:M}),this._occluderPipelineMaskWrite=ee({blending:null,depthTest:$,depthWrite:null,colorWrite:null,stencilWrite:V,stencilTest:b})):this._occluderPipelineTransparent=this._occluderPipelineOpaque=this._occluderPipelineMaskWrite=null,this._occludeePipelineState=this._makePipelineState(e,!0),this._makePipelineState(e,!1)}getPipeline(e,t){return e?this._occludeePipelineState:11===t?this._occluderPipelineTransparent??super.getPipeline():10===t?this._occluderPipelineOpaque??super.getPipeline():this._occluderPipelineMaskWrite??super.getPipeline()}}function ne(e){const t=B().vec3f("position").vec4f16("previousDelta").vec2f16("uv0");return e.hasVVColor?t.f32("colorFeatureAttribute"):t.vec4u8("color",{glNormalized:!0}),e.hasVVOpacity&&t.f32("opacityFeatureAttribute"),e.hasVVSize?t.f32("sizeFeatureAttribute"):t.f16("size"),e.worldSpace&&t.vec3f16("normal"),t.freeze()}class ce extends N{constructor(){super(...arguments),this.space=1,this.anchor=0,this.occluder=!1,this.writeDepth=!1,this.hideOnShortSegments=!1,this.hasCap=!1,this.hasTip=!1,this.hasVVSize=!1,this.hasVVColor=!1,this.hasVVOpacity=!1,this.hasOccludees=!1,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.textureCoordinateType=0,this.emissionSource=0,this.discardInvisibleFragments=!0,this.occlusionPass=!1,this.hasVVInstancing=!1,this.hasSliceTranslatedView=!0,this.olidColorInstanced=!1,this.overlayEnabled=!1,this.snowCover=!1}get draped(){return 0===this.space}get worldSpace(){return 2===this.space}}re([F({count:3})],ce.prototype,"space",void 0),re([F({count:2})],ce.prototype,"anchor",void 0),re([F()],ce.prototype,"occluder",void 0),re([F()],ce.prototype,"writeDepth",void 0),re([F()],ce.prototype,"hideOnShortSegments",void 0),re([F()],ce.prototype,"hasCap",void 0),re([F()],ce.prototype,"hasTip",void 0),re([F()],ce.prototype,"hasVVSize",void 0),re([F()],ce.prototype,"hasVVColor",void 0),re([F()],ce.prototype,"hasVVOpacity",void 0),re([F()],ce.prototype,"hasOccludees",void 0),re([F()],ce.prototype,"terrainDepthTest",void 0),re([F()],ce.prototype,"cullAboveTerrain",void 0);class le extends R{constructor(e){super(e,de),this._configuration=new ce,this.produces=new Map([[2,e=>8===e||n(e)&&8===this.parameters.renderOccluded],[3,e=>c(e)],[10,e=>l(e)&&8===this.parameters.renderOccluded],[11,e=>l(e)&&8===this.parameters.renderOccluded],[4,e=>n(e)&&this.parameters.writeDepth],[8,e=>n(e)&&!this.parameters.writeDepth],[18,e=>o(e)||8===e]]),this.intersectDraped=void 0}getConfiguration(e,t){return super.getConfiguration(e,t,this._configuration),this._configuration.space=18===t.slot?0:this.parameters.worldSpace?2:1,this._configuration.hideOnShortSegments=this.parameters.hideOnShortSegments,this._configuration.hasCap=0!==this.parameters.cap,this._configuration.anchor=this.parameters.anchor,this._configuration.hasTip=this.parameters.hasTip,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.hasOccludees=t.hasOccludees,this._configuration.writeDepth=this.parameters.writeDepth,this._configuration.hasVVSize=this.parameters.hasVVSize,this._configuration.hasVVColor=this.parameters.hasVVColor,this._configuration.hasVVOpacity=this.parameters.hasVVOpacity,this._configuration.occluder=8===this.parameters.renderOccluded,this._configuration.oitPass=t.oitPass,this._configuration.terrainDepthTest=t.terrainDepthTest&&o(e),this._configuration.cullAboveTerrain=t.cullAboveTerrain,this._configuration}get visible(){return this.parameters.color[3]>=ae}intersect(){}createBufferWriter(){return new he(ne(this.parameters),this.parameters)}createGLMaterial(e){return new pe(e)}}class pe extends U{dispose(){super.dispose(),this._markerTextures?.release(this._markerPrimitive),this._markerPrimitive=null}beginSlot(e){const t=this._material.parameters.markerPrimitive;return t!==this._markerPrimitive&&(this._material.setParameters({markerTexture:this._markerTextures.swap(t,this._markerPrimitive)}),this._markerPrimitive=t),this.getTechnique(oe,e)}}class de extends E{constructor(){super(...arguments),this.width=0,this.color=[1,1,1,1],this.markerPrimitive="arrow",this.placement="end",this.cap=0,this.anchor=0,this.hasTip=!1,this.worldSpace=!1,this.hideOnShortSegments=!1,this.writeDepth=!0,this.hasSlicePlane=!1,this.vvFastUpdate=!1,this.markerTexture=null}}class he{constructor(e,t){this.layout=e,this._parameters=t}elementCount(){return"begin-end"===this._parameters.placement?12:6}write(r,s,o,n,c,l){const p=o.get("position").data,d=p.length/3;let h=[1,0,0];const v=o.get("normal");this._parameters.worldSpace&&null!=v&&(h=v.data);let u=1,m=0;this._parameters.vvSize?m=o.get("sizeFeatureAttribute").data[0]:o.has("size")&&(u=o.get("size").data[0]);let f=[1,1,1,1],g=0;this._parameters.vvColor?g=o.get("colorFeatureAttribute").data[0]:o.has("color")&&(f=o.get("color").data);let S=0;this._parameters.vvOpacity&&(S=o.get("opacityFeatureAttribute").data[0]);const P=new Float32Array(c.buffer),y=a(c.buffer),w=new Uint8Array(c.buffer);let z=l*(this.layout.stride/4);const x=P.BYTES_PER_ELEMENT/y.BYTES_PER_ELEMENT,_=4/x,b=(e,t,i,r)=>{P[z++]=e[0],P[z++]=e[1],P[z++]=e[2],I(t,e,y,z*x),z+=_;let a=z*x;if(y[a++]=i[0],y[a++]=i[1],z=Math.ceil(a/x),this._parameters.vvColor)P[z++]=g;else{const e=Math.min(4*r,f.length-4),t=4*z++;w[t]=255*f[e],w[t+1]=255*f[e+1],w[t+2]=255*f[e+2],w[t+3]=255*f[e+3]}this._parameters.vvOpacity&&(P[z++]=S),a=z*x,this._parameters.vvSize?(P[z++]=m,a+=2):y[a++]=u,this._parameters.worldSpace&&(y[a++]=h[0],y[a++]=h[1],y[a++]=h[2]),z=Math.ceil(a/x)},T=(a,s)=>{const o=e(ve,p[3*a],p[3*a+1],p[3*a+2]),n=ue;let c=a+s;do{e(n,p[3*c],p[3*c+1],p[3*c+2]),c+=s}while(t(o,n)&&c>=0&&c<d);r&&(i(o,o,r),i(n,n,r)),b(o,n,[-1,-1],a),b(o,n,[1,-1],a),b(o,n,[1,1],a),b(o,n,[-1,-1],a),b(o,n,[1,1],a),b(o,n,[-1,1],a)},V=this._parameters.placement;return"begin"!==V&&"begin-end"!==V||T(0,1),"end"!==V&&"begin-end"!==V||T(d-1,-1),null}}const ve=r(),ue=r();export{le as L};
