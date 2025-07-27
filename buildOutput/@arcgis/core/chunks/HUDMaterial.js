/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{c as e,e as t}from"./mathUtils.js";import{f as i}from"./mat3.js";import{c as o}from"./mat3f64.js";import{i as s}from"./mat4.js";import{c as a}from"./mat4f64.js";import{c as r,s as n,r as l}from"./vec2.js";import{c,f as d}from"./vec2f64.js";import{k as u,t as p,n as f,h,i as g,e as m,l as v,x,j as b,s as S,q as P,d as C}from"./vec3.js";import{c as z,f as y}from"./vec3f64.js";import{Z as A,f as O,d as j,c as w,b as F}from"./vec4f64.js";import{c as D}from"./aaBoundingRect.js";import{D as _,o as T,B as V,q as R,c as E,g as $}from"./BufferView.js";import{t as B,a1 as M,V as U,h as I,C as L,F as q,i as H,e as G,g as W,c as N,H as k,k as X,R as Y,j as Z,w as J,U as K,D as Q,x as ee,M as te,a2 as ie,a3 as oe,a4 as se,a5 as ae,a6 as re,a7 as ne,a8 as le,X as ce,a9 as de,aa as ue,ab as pe,ac as fe}from"./Matrix4PassUniform.js";import{d as he}from"./debugFlags2.js";import{U as ge,F as me,T as ve,i as xe,j as be}from"./Emissions.glsl.js";import{A as Se,H as Pe,a as Ce,b as ze}from"./HUDVisibility.glsl.js";import{S as ye,c as Ae,b as Oe,G as je,d as we}from"./BooleanBindUniform.js";import{x as Fe}from"./unitUtils.js";import{g as De,I as _e}from"./glsl.js";import{R as Te}from"./sdfPrimitives.js";import{F as Ve}from"./CameraSpace.glsl.js";import{S as Re}from"./ShaderBuilder.js";import{a as Ee}from"./AlphaCutoff.js";import{n as $e}from"./InterleavedLayout.js";import{a as Be}from"./enums.js";import{m as Me,d as Ue,a as Ie,p as Le}from"./renderState.js";import{_ as qe}from"./tslib.es6.js";class He{constructor(){this.factor=new Ge,this.factorAlignment=new Ge}}class Ge{constructor(){this.scale=0,this.factor=0,this.minScaleFactor=0}}function We(e,t){const{vertex:i,fragment:o}=e;e.include(B,t),i.include(Se),i.main.add(De`vec4 posProjCenter;
if (dot(position, position) > 0.0) {
ProjectHUDAux projectAux;
vec4 posProj = projectPositionHUD(projectAux);
posProjCenter = alignToPixelCenter(posProj, viewport.zw);
forwardViewPosDepth(projectAux.posView);
vec3 vpos = projectAux.posModel;
if (rejectBySlice(vpos)) {
posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
}
} else {
posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
}
gl_Position = posProjCenter;
gl_PointSize = 1.0;`),o.main.add(De`fragColor = vec4(1);
if(discardByTerrainDepth()) {
fragColor.g = 0.5;
}`)}class Ne extends ge{constructor(e,t,i){super(e,"vec4",2,(o,s,a)=>o.setUniform4fv(e,t(s,a),i))}}function ke(e){return e.outlineColor[3]>0&&e.outlineSize>0}function Xe(e){var t,i;return e.textureIsSignedDistanceField?(t=e.anchorPosition,i=e.distanceFieldBoundingBox,n(Ye,t[0]*(i[2]-i[0])+i[0],t[1]*(i[3]-i[1])+i[1])):r(Ye,e.anchorPosition),Ye}const Ye=c(),Ze=De.float(32e3),Je=Object.freeze(Object.defineProperty({__proto__:null,build:function(e){const t=new Re,{signedDistanceFieldEnabled:i,occlusionTestEnabled:o,horizonCullingEnabled:s,pixelSnappingEnabled:a,hasScreenSizePerspective:r,debugDrawLabelBorder:l,hasVVSize:c,hasVVColor:d,hasRotation:u,occludedFragmentFade:p,sampleSignedDistanceFieldTexelCenter:f}=e;t.include(Pe,e),t.vertex.include(M,e);const{occlusionPass:h,output:g,oitPass:m}=e;if(h)return t.include(We,e),t;const{vertex:v,fragment:x}=t;t.include(ye),t.include(U,e),t.include(I,e),o&&t.include(Ce),x.include(Te),x.include(L),t.varyings.add("vcolor","vec4"),t.varyings.add("vtc","vec2"),t.varyings.add("vsize","vec2");const b=8===g,S=b&&o;S&&t.varyings.add("voccluded","float"),v.uniforms.add(new q("viewport",e=>e.camera.fullViewport),new Ve("screenOffset",(e,t)=>n(Ye,2*e.screenOffset[0]*t.camera.pixelRatio,2*e.screenOffset[1]*t.camera.pixelRatio)),new Ve("anchorPosition",e=>Xe(e)),new H("materialColor",e=>e.color),new me("materialRotation",e=>e.rotation),new ve("tex",e=>e.texture)),G(v),i&&(v.uniforms.add(new H("outlineColor",e=>e.outlineColor)),x.uniforms.add(new H("outlineColor",e=>ke(e)?e.outlineColor:A),new me("outlineSize",e=>ke(e)?e.outlineSize:0))),s&&v.uniforms.add(new Ne("pointDistanceSphere",(e,t)=>{const i=t.camera.eye,o=e.origin;return O(o[0]-i[0],o[1]-i[1],o[2]-i[2],Fe.radius)})),a&&v.include(Se),r&&(Ae(v),Oe(v)),l&&t.varyings.add("debugBorderCoords","vec4"),t.attributes.add("uvi","vec2"),t.attributes.add("color","vec4"),t.attributes.add("size","vec2"),t.attributes.add("rotation","float"),(c||d)&&t.attributes.add("featureAttribute","vec4"),v.code.add(s?De`bool behindHorizon(vec3 posModel) {
vec3 camToEarthCenter = pointDistanceSphere.xyz - localOrigin;
vec3 camToPos = pointDistanceSphere.xyz + posModel;
float earthRadius = pointDistanceSphere.w;
float a = dot(camToPos, camToPos);
float b = dot(camToPos, camToEarthCenter);
float c = dot(camToEarthCenter, camToEarthCenter) - earthRadius * earthRadius;
return b > 0.0 && b < a && b * b  > a * c;
}`:De`bool behindHorizon(vec3 posModel) { return false; }`),v.main.add(De`
    ProjectHUDAux projectAux;
    vec4 posProj = projectPositionHUD(projectAux);
    forwardObjectAndLayerIdColor();

    if (rejectBySlice(projectAux.posModel)) {
      // Project outside of clip plane
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      return;
    }

    if (behindHorizon(projectAux.posModel)) {
      // Project outside of clip plane
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      return;
    }

    vec2 inputSize;
    ${_e(r,De`
        inputSize = screenSizePerspectiveScaleVec2(size, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspective);
        vec2 screenOffsetScaled = screenSizePerspectiveScaleVec2(screenOffset, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);`,De`
        inputSize = size;
        vec2 screenOffsetScaled = screenOffset;`)}
    ${_e(c,De`inputSize *= vvScale(featureAttribute).xx;`)}

    vec2 combinedSize = inputSize * pixelRatio;
    vec4 quadOffset = vec4(0.0);

    ${_e(o,De`
    bool visible = testHUDVisibility(posProj);
    if (!visible) {
      vtc = vec2(0.0);
      ${_e(l,"debugBorderCoords = vec4(0.5, 0.5, 1.5 / combinedSize);")}
      return;
    }`)}
    ${_e(S,De`voccluded = visible ? 0.0 : 1.0;`)}
  `);const P=De`
      vec2 uvi1 = vec2(uvi.x < 0.0 ? 1.0 : 0.0, uvi.y < 0.0 ? 1.0 : 0.0);
      vec2 uv = abs(uvi + uvi1);
      vec2 texSize = vec2(textureSize(tex, 0));
      uv.x = uv.x >= ${Ze} ? 1.0 : uv.x / texSize.x;
      uv.y = uv.y >= ${Ze} ? 1.0 : uv.y / texSize.y;
      quadOffset.xy = (uvi1 - anchorPosition) * 2.0 * combinedSize;

      ${_e(u,De`
          float angle = radians(materialRotation + rotation);
          float cosAngle = cos(angle);
          float sinAngle = sin(angle);
          mat2 rotate = mat2(cosAngle, -sinAngle, sinAngle,  cosAngle);

          quadOffset.xy = rotate * quadOffset.xy;
        `)}

      quadOffset.xy = (quadOffset.xy + screenOffsetScaled) / viewport.zw * posProj.w;
  `,C=a?i?De`posProj = alignToPixelOrigin(posProj, viewport.zw) + quadOffset;`:De`posProj += quadOffset;
if (inputSize.x == size.x) {
posProj = alignToPixelOrigin(posProj, viewport.zw);
}`:De`posProj += quadOffset;`;v.main.add(De`
    ${P}
    ${d?"vcolor = interpolateVVColor(featureAttribute.y) * materialColor;":"vcolor = color / 255.0 * materialColor;"}

    ${_e(9===g,De`vcolor.a = 1.0;`)}

    bool alphaDiscard = vcolor.a < ${De.float(Ee)};
    ${_e(i,`alphaDiscard = alphaDiscard && outlineColor.a < ${De.float(Ee)};`)}
    if (alphaDiscard) {
      // "early discard" if both symbol color (= fill) and outline color (if applicable) are transparent
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    } else {
      ${C}
      gl_Position = posProj;
    }

    vtc = uv;

    ${_e(l,De`debugBorderCoords = vec4(uv01, 1.5 / combinedSize);`)}
    vsize = inputSize;
  `),x.uniforms.add(new ve("tex",e=>e.texture)),p&&!b&&x.uniforms.add(new W("depthMap",e=>e.mainDepth),new N("occludedOpacity",e=>e.hudOccludedFragmentOpacity));const z=l?De`(isBorder > 0.0 ? 0.0 : ${De.float(Ee)})`:De.float(Ee),y=De`
    ${_e(l,De`float isBorder = float(any(lessThan(debugBorderCoords.xy, debugBorderCoords.zw)) || any(greaterThan(debugBorderCoords.xy, 1.0 - debugBorderCoords.zw)));`)}

    vec2 samplePos = vtc;

    ${_e(f,De`
      float txSize = float(textureSize(tex, 0).x);
      float texelSize = 1.0 / txSize;

      // Calculate how much we have to add/subtract to/from each texel to reach the size of an onscreen pixel
      vec2 scaleFactor = (vsize - txSize) * texelSize;
      samplePos += (vec2(1.0, -1.0) * texelSize) * scaleFactor;`)}

    ${i?De`
      vec4 fillPixelColor = vcolor;

      // Get distance and map it into [-0.5, 0.5]
      float d = rgbaTofloat(texture(tex, samplePos)) - 0.5;

      // Distance in output units (i.e. pixels)
      float dist = d * vsize.x;

      // Create smooth transition from the icon into its outline
      float fillAlphaFactor = clamp(0.5 - dist, 0.0, 1.0);
      fillPixelColor.a *= fillAlphaFactor;

      if (outlineSize > 0.25) {
        vec4 outlinePixelColor = outlineColor;
        float clampedOutlineSize = min(outlineSize, 0.5*vsize.x);

        // Create smooth transition around outline
        float outlineAlphaFactor = clamp(0.5 - (abs(dist) - 0.5*clampedOutlineSize), 0.0, 1.0);
        outlinePixelColor.a *= outlineAlphaFactor;

        if (
          outlineAlphaFactor + fillAlphaFactor < ${z} ||
          fillPixelColor.a + outlinePixelColor.a < ${De.float(Ee)}
        ) {
          discard;
        }

        // perform un-premultiplied over operator (see https://en.wikipedia.org/wiki/Alpha_compositing#Description)
        float compositeAlpha = outlinePixelColor.a + fillPixelColor.a * (1.0 - outlinePixelColor.a);
        vec3 compositeColor = vec3(outlinePixelColor) * outlinePixelColor.a +
          vec3(fillPixelColor) * fillPixelColor.a * (1.0 - outlinePixelColor.a);

        ${_e(!b,De`fragColor = vec4(compositeColor, compositeAlpha);`)}
      } else {
        if (fillAlphaFactor < ${z}) {
          discard;
        }

        ${_e(!b,De`fragColor = premultiplyAlpha(fillPixelColor);`)}
      }

      // visualize SDF:
      // fragColor = vec4(clamp(-dist/vsize.x*2.0, 0.0, 1.0), clamp(dist/vsize.x*2.0, 0.0, 1.0), 0.0, 1.0);
      `:De`
          vec4 texColor = texture(tex, samplePos, -0.5);
          if (texColor.a < ${z}) {
            discard;
          }
          ${_e(!b,De`fragColor = texColor * premultiplyAlpha(vcolor);`)}
          `}

    ${_e(p&&!b,De`
        float zSample = texelFetch(depthMap, ivec2(gl_FragCoord.xy), 0).x;
        if (zSample < gl_FragCoord.z) {
          fragColor *= occludedOpacity;
        }
        `)}

    ${_e(!b&&l,De`fragColor = mix(fragColor, vec4(1.0, 0.0, 1.0, 1.0), isBorder * 0.5);`)}
  `;switch(g){case 0:case 1:t.outputs.add("fragColor","vec4",0),1===g&&t.outputs.add("fragEmission","vec4",1),1===m&&t.outputs.add("fragAlpha","float",1===g?2:1),x.main.add(De`
        ${y}
        ${_e(2===m,De`fragColor.rgb /= fragColor.a;`)}
        ${_e(1===g,De`fragEmission = vec4(0.0);`)}
        ${_e(1===m,De`fragAlpha = fragColor.a;`)}`);break;case 9:x.main.add(De`
        ${y}
        outputObjectAndLayerIdColor();`);break;case 8:t.include(k,e),x.main.add(De`
        ${y}
        outputHighlight(${_e(S,De`voccluded == 1.0`,De`false`)});`)}return t},calculateAnchorPosition:Xe,fullUV:32e3},Symbol.toStringTag,{value:"Module"}));class Ke extends X{constructor(e,t){super(e,t,new Y(Je,()=>Promise.resolve().then(()=>Je)),(Z()?tt:et).locations),this.primitiveType=t.occlusionPass?Be.POINTS:Be.TRIANGLES}initializePipeline(e){const{oitPass:t,hasPolygonOffset:i,draped:o,output:s,depthTestEnabled:a,occlusionPass:r}=e,n=0===t,l=a&&!o&&!(1===t)&&!r&&!(8===s);return Me({blending:xe(s)?n?Le:K(t):null,depthTest:a&&!o?{func:515}:null,depthWrite:l?Ie:null,drawBuffers:J(t,s),colorWrite:Ue,polygonOffset:i?Qe:null})}}const Qe={factor:0,units:-4},et=$e().vec3f("position").vec3f("normal").vec2i16("uvi").vec4u8("color").vec2f("size").f32("rotation").vec4f("centerOffsetAndDistance").vec4f("featureAttribute"),tt=et.clone().vec4u8("olidColor");class it extends Q{constructor(e){super(),this.spherical=e,this.screenCenterOffsetUnitsEnabled=!1,this.occlusionTestEnabled=!0,this.signedDistanceFieldEnabled=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.hasVVSize=!1,this.hasVVColor=!1,this.hasVerticalOffset=!1,this.hasScreenSizePerspective=!1,this.hasRotation=!1,this.debugDrawLabelBorder=!1,this.hasPolygonOffset=!1,this.depthTestEnabled=!0,this.pixelSnappingEnabled=!0,this.draped=!1,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.occlusionPass=!1,this.occludedFragmentFade=!1,this.horizonCullingEnabled=!0,this.isFocused=!0,this.olidColorInstanced=!1,this.textureCoordinateType=0,this.emissionSource=0,this.discardInvisibleFragments=!0,this.hasVVInstancing=!1,this.snowCover=!1}}qe([ee()],it.prototype,"screenCenterOffsetUnitsEnabled",void 0),qe([ee()],it.prototype,"occlusionTestEnabled",void 0),qe([ee()],it.prototype,"signedDistanceFieldEnabled",void 0),qe([ee()],it.prototype,"sampleSignedDistanceFieldTexelCenter",void 0),qe([ee()],it.prototype,"hasVVSize",void 0),qe([ee()],it.prototype,"hasVVColor",void 0),qe([ee()],it.prototype,"hasVerticalOffset",void 0),qe([ee()],it.prototype,"hasScreenSizePerspective",void 0),qe([ee()],it.prototype,"hasRotation",void 0),qe([ee()],it.prototype,"debugDrawLabelBorder",void 0),qe([ee()],it.prototype,"hasPolygonOffset",void 0),qe([ee()],it.prototype,"depthTestEnabled",void 0),qe([ee()],it.prototype,"pixelSnappingEnabled",void 0),qe([ee()],it.prototype,"draped",void 0),qe([ee()],it.prototype,"terrainDepthTest",void 0),qe([ee()],it.prototype,"cullAboveTerrain",void 0),qe([ee()],it.prototype,"occlusionPass",void 0),qe([ee()],it.prototype,"occludedFragmentFade",void 0),qe([ee()],it.prototype,"horizonCullingEnabled",void 0),qe([ee()],it.prototype,"isFocused",void 0);class ot extends te{constructor(e,t){super(e,jt),this.produces=new Map([[13,e=>be(e)&&!this.parameters.drawAsLabel],[14,e=>be(e)&&this.parameters.drawAsLabel],[12,()=>this.parameters.occlusionTest],[18,e=>this.parameters.draped&&be(e)]]),this._visible=!0,this._configuration=new it(t)}getConfiguration(e,t){const i=this.parameters.draped;return super.getConfiguration(e,t,this._configuration),this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.hasVerticalOffset=!!this.parameters.verticalOffset,this._configuration.hasScreenSizePerspective=!!this.parameters.screenSizePerspective,this._configuration.screenCenterOffsetUnitsEnabled="screen"===this.parameters.centerOffsetUnits,this._configuration.hasPolygonOffset=this.parameters.polygonOffset,this._configuration.draped=i,this._configuration.occlusionTestEnabled=this.parameters.occlusionTest,this._configuration.pixelSnappingEnabled=this.parameters.pixelSnappingEnabled,this._configuration.signedDistanceFieldEnabled=this.parameters.textureIsSignedDistanceField,this._configuration.sampleSignedDistanceFieldTexelCenter=this.parameters.sampleSignedDistanceFieldTexelCenter,this._configuration.hasRotation=this.parameters.hasRotation,this._configuration.hasVVSize=!!this.parameters.vvSize,this._configuration.hasVVColor=!!this.parameters.vvColor,this._configuration.occlusionPass=12===t.slot,this._configuration.occludedFragmentFade=!i&&this.parameters.occludedFragmentFade,this._configuration.horizonCullingEnabled=this.parameters.horizonCullingEnabled,this._configuration.isFocused=this.parameters.isFocused,this._configuration.depthTestEnabled=this.parameters.depthEnabled||12===t.slot,xe(e)&&(this._configuration.debugDrawLabelBorder=!!he.LABELS_SHOW_BORDER),this._configuration.oitPass=t.oitPass,this._configuration.terrainDepthTest=t.terrainDepthTest,this._configuration.cullAboveTerrain=t.cullAboveTerrain,this._configuration}intersect(e,t,o,a,r,n){const{options:{selectionMode:l,hud:c,excludeLabels:d},point:b,camera:S}=o,{parameters:P}=this;if(!l||!c||d&&P.isLabel||!e.visible||!b||!S)return;const C=e.attributes.get("featureAttribute"),y=null==C?null:j(C.data,Pt),{scaleX:A,scaleY:O}=Ft(y,P,S.pixelRatio);i(gt,t),e.attributes.has("featureAttribute")&&function(e){const t=e[0],i=e[1],o=e[2],s=e[3],a=e[4],r=e[5],n=e[6],l=e[7],c=e[8],d=1/Math.sqrt(t*t+i*i+o*o),u=1/Math.sqrt(s*s+a*a+r*r),p=1/Math.sqrt(n*n+l*l+c*c);e[0]=t*d,e[1]=i*d,e[2]=o*d,e[3]=s*u,e[4]=a*u,e[5]=r*u,e[6]=n*p,e[7]=l*p,e[8]=c*p}(gt);const w=e.attributes.get("position"),F=e.attributes.get("size"),D=e.attributes.get("normal"),T=e.attributes.get("rotation"),V=e.attributes.get("centerOffsetAndDistance");_(w.size>=3);const R=Xe(P),E="screen"===this.parameters.centerOffsetUnits;for(let e=0;e<w.data.length/w.size;e++){const i=e*w.size;u(lt,w.data[i],w.data[i+1],w.data[i+2]),p(lt,lt,t),p(lt,lt,S.viewMatrix);const a=e*V.size;if(u(bt,V.data[a],V.data[a+1],V.data[a+2]),!E&&(lt[0]+=bt[0],lt[1]+=bt[1],0!==bt[2])){const e=bt[2];f(bt,lt),h(lt,lt,g(bt,bt,e))}const r=e*D.size;if(u(ct,D.data[r],D.data[r+1],D.data[r+2]),at(ct,gt,S,Ct),Dt(this.parameters,lt,Ct,S,nt),S.applyProjection(lt,dt),dt[0]>-1){E&&(bt[0]||bt[1])&&(dt[0]+=bt[0]*S.pixelRatio,0!==bt[1]&&(dt[1]+=ie(bt[1],nt.factorAlignment)*S.pixelRatio),S.unapplyProjection(dt,lt)),dt[0]+=this.parameters.screenOffset[0]*S.pixelRatio,dt[1]+=this.parameters.screenOffset[1]*S.pixelRatio,dt[0]=Math.floor(dt[0]),dt[1]=Math.floor(dt[1]);const t=e*F.size;At[0]=F.data[t],At[1]=F.data[t+1],oe(At,nt.factor,At);const i=zt*S.pixelRatio;let a=0;P.textureIsSignedDistanceField&&(a=Math.min(P.outlineSize,.5*At[0])*S.pixelRatio/2),At[0]*=A,At[1]*=O;const r=e*T.size,l=P.rotation+T.data[r];if(rt(b,dt[0],dt[1],At,i,a,l,P,R)){const e=o.ray;if(p(pt,lt,s(vt,S.viewMatrix)),dt[0]=b[0],dt[1]=b[1],S.unprojectFromRenderScreen(dt,lt)){const t=z();m(t,e.direction);const i=1/v(t);g(t,t,i),n(x(e.origin,lt)*i,t,-1,pt)}}}}}intersectDraped(e,t,i,o,s){const a=e.attributes.get("position"),r=e.attributes.get("size"),n=e.attributes.get("rotation"),l=this.parameters,c=Xe(l),d=e.attributes.get("featureAttribute"),u=null==d?null:j(d.data,Pt),{scaleX:p,scaleY:f}=Ft(u,l,e.screenToWorldRatio),h=yt*e.screenToWorldRatio;for(let t=0;t<a.data.length/a.size;t++){const d=t*a.size,u=a.data[d],g=a.data[d+1],m=t*r.size;At[0]=r.data[m],At[1]=r.data[m+1];let v=0;l.textureIsSignedDistanceField&&(v=Math.min(l.outlineSize,.5*At[0])*e.screenToWorldRatio/2),At[0]*=p,At[1]*=f;const x=t*n.size,b=l.rotation+n.data[x];rt(i,u,g,At,h,v,b,l,c)&&o(s.distance,s.normal,-1)}}createBufferWriter(){return new wt}applyShaderOffsetsView(e,t,i,o,s,a,r){const n=at(t,i,s,Ct);return this._applyVerticalGroundOffsetView(e,n,s,r),Dt(this.parameters,r,n,s,a),this._applyPolygonOffsetView(r,n,o[3],s,r),this._applyCenterOffsetView(r,o,r),r}applyShaderOffsetsNDC(e,t,i,o,s){return this._applyCenterOffsetNDC(e,t,i,o),null!=s&&m(s,o),this._applyPolygonOffsetNDC(o,t,i,o),o}_applyPolygonOffsetView(t,i,o,s,a){const r=s.aboveGround?1:-1;let n=Math.sign(o);0===n&&(n=r);const l=r*n;if(this.parameters.shaderPolygonOffset<=0)return m(a,t);const c=e(Math.abs(i.cosAngle),.01,1),d=1-Math.sqrt(1-c*c)/c/s.viewport[2];return g(a,t,l>0?d:1/d),a}_applyVerticalGroundOffsetView(e,t,i,o){const s=v(e),a=i.aboveGround?1:-1,r=i.computeRenderPixelSizeAtDist(s)*ze,n=g(lt,t.normal,a*r);return b(o,e,n),o}_applyCenterOffsetView(e,t,i){const o="screen"!==this.parameters.centerOffsetUnits;return i!==e&&m(i,e),o&&(i[0]+=t[0],i[1]+=t[1],t[2]&&(f(ct,i),S(i,i,g(ct,ct,t[2])))),i}_applyCenterOffsetNDC(e,t,i,o){const s="screen"!==this.parameters.centerOffsetUnits;return o!==e&&m(o,e),s||(o[0]+=t[0]/i.fullWidth*2,o[1]+=t[1]/i.fullHeight*2),o}_applyPolygonOffsetNDC(e,t,i,o){const s=this.parameters.shaderPolygonOffset;if(e!==o&&m(o,e),s){const e=i.aboveGround?1:-1,a=e*Math.sign(t[3]);o[2]-=(a||e)*s}return o}set visible(e){this._visible=e}get visible(){const{color:e,outlineSize:t,outlineColor:i}=this.parameters,o=e[3]>=Ee||t>=Ee&&i[3]>=Ee;return this._visible&&o}createGLMaterial(e){return new st(e)}calculateRelativeScreenBounds(e,t,i=D()){return function(e,t,i,o){o[0]=e.anchorPosition[0]*-t[0]+e.screenOffset[0]*i,o[1]=e.anchorPosition[1]*-t[1]+e.screenOffset[1]*i}(this.parameters,e,t,i),i[2]=i[0]+e[0],i[3]=i[1]+e[1],i}}class st extends we{constructor(e){super({...e,...e.material.parameters})}beginSlot(e){return this.updateTexture(this._material.parameters.textureId),this._material.setParameters(this.textureBindParameters),this.getTechnique(Ke,e)}}function at(e,t,o,s){return(function(e){return e instanceof Float32Array&&e.length>=16}(a=t)||function(e){return Array.isArray(e)&&e.length>=16}(a))&&(t=i(mt,t)),P(s.normal,e,t),p(s.normal,s.normal,o.viewInverseTransposeMatrix),s.cosAngle=C(ut,Ot),s;var a}function rt(e,i,o,s,a,r,c,d,u){let p=i-a-s[0]*u[0],f=p+s[0]+2*a,h=o-a-s[1]*u[1],g=h+s[1]+2*a;const m=d.distanceFieldBoundingBox;return d.textureIsSignedDistanceField&&null!=m&&(p+=s[0]*m[0],h+=s[1]*m[1],f-=s[0]*(1-m[2]),g-=s[1]*(1-m[3]),p-=r,f+=r,h-=r,g+=r),n(ht,i,o),l(ft,e,ht,t(c)),ft[0]>p&&ft[0]<f&&ft[1]>h&&ft[1]<g}const nt=new He,lt=z(),ct=z(),dt=w(),ut=z(),pt=z(),ft=c(),ht=c(),gt=o(),mt=o(),vt=a(),xt=w(),bt=z(),St=z(),Pt=w(),Ct={normal:ut,cosAngle:0},zt=1,yt=2,At=d(0,0),Ot=y(0,0,1);class jt extends je{constructor(){super(...arguments),this.renderOccluded=1,this.isDecoration=!1,this.color=F(1,1,1,1),this.polygonOffset=!1,this.anchorPosition=d(.5,.5),this.screenOffset=[0,0],this.shaderPolygonOffset=1e-5,this.textureIsSignedDistanceField=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.outlineColor=F(1,1,1,1),this.outlineSize=0,this.distanceFieldBoundingBox=w(),this.rotation=0,this.hasRotation=!1,this.vvSizeEnabled=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.vvSymbolAnchor=null,this.vvSymbolRotationMatrix=null,this.hasSlicePlane=!1,this.pixelSnappingEnabled=!0,this.occlusionTest=!0,this.occludedFragmentFade=!1,this.horizonCullingEnabled=!1,this.centerOffsetUnits="world",this.drawAsLabel=!1,this.depthEnabled=!0,this.isFocused=!0,this.focusStyle="bright",this.draped=!1,this.isLabel=!1}get hasVVSize(){return!!this.vvSize}get hasVVColor(){return!!this.vvColor}get hasVVOpacity(){return!!this.vvOpacity}}class wt{constructor(){this.layout=Z()?tt:et}elementCount(e){return 6*e.get("position").indices.length}write(e,t,i,o,s,a){const{position:r,normal:n,uvi:l,color:c,size:d,rotation:u,centerOffsetAndDistance:p,featureAttribute:f}=s;re(i.get("position"),e,r,a,6),ne(i.get("normal"),t,n,a,6);const h=i.get("uvi")?.data;let g=0,m=0,v=-32001,x=-32001;h&&h.length>=4&&(g=h[0],m=h[1],v=-1-h[2],x=-1-h[3]);let b=i.get("position").indices.length,S=a;for(let e=0;e<b;++e)l.set(S,0,g),l.set(S,1,m),S++,l.set(S,0,v),l.set(S,1,m),S++,l.set(S,0,v),l.set(S,1,x),S++,l.set(S,0,v),l.set(S,1,x),S++,l.set(S,0,g),l.set(S,1,x),S++,l.set(S,0,g),l.set(S,1,m),S++;le(i.get("color"),4,c,a,6);const{data:P,indices:C}=i.get("size");b=C.length,S=a;for(let e=0;e<b;++e){const t=P[2*C[e]],i=P[2*C[e]+1];for(let e=0;e<6;++e)d.set(S,0,t),d.set(S,1,i),S++}if(ce(i.get("rotation"),u,a,6),i.get("centerOffsetAndDistance")?de(i.get("centerOffsetAndDistance"),p,a,6):ue(p,a,6*b),i.get("featureAttribute")?de(i.get("featureAttribute"),f,a,6):ue(f,a,6*b),null!=o){const e=i.get("position")?.indices;if(e){const t=e.length,i=s.getField("olidColor",T);pe(o,i,t,a,6)}}return{numVerticesPerItem:6,numItems:b}}intersect(e,t,i,o,a,r,n){const{options:{selectionMode:l,hud:c,excludeLabels:d},point:S,camera:P}=o;if(!l||!c||d&&t.isLabel||!S)return;const C=this.layout.createView(e),y=C.getField("position",V),A=C.getField("normal",V),O=C.getField("rotation",R),j=C.getField("size",E),w=C.getField("featureAttribute",$),F=C.getField("centerOffsetAndDistance",$),D="screen"===t.centerOffsetUnits,_=Xe(t);if(null==y||null==A||null==O||null==j||null==F||null==P)return;const T=null==w?null:w.getVec(0,Pt),{scaleX:B,scaleY:M}=Ft(T,t,P.pixelRatio),U=y.count/6;for(let e=0;e<U;e++){const a=6*e;if(y.getVec(a,lt),null!=i&&b(lt,lt,i),p(lt,lt,P.viewMatrix),F.getVec(a,xt),u(bt,xt[0],xt[1],xt[2]),!D&&(lt[0]+=bt[0],lt[1]+=bt[1],0!==bt[2])){const e=bt[2];f(bt,lt),h(lt,lt,g(bt,bt,e))}if(A.getVec(a,ct),at(ct,gt,P,Ct),Dt(t,lt,Ct,P,nt),P.applyProjection(lt,dt),dt[0]>-1){D&&(bt[0]||bt[1])&&(dt[0]+=bt[0]*P.pixelRatio,0!==bt[1]&&(dt[1]+=ie(bt[1],nt.factorAlignment)*P.pixelRatio),P.unapplyProjection(dt,lt)),dt[0]+=t.screenOffset[0]*P.pixelRatio,dt[1]+=t.screenOffset[1]*P.pixelRatio,dt[0]=Math.floor(dt[0]),dt[1]=Math.floor(dt[1]),j.getVec(a,At),oe(At,nt.factor,At);const i=zt*P.pixelRatio;let r=0;t.textureIsSignedDistanceField&&(r=Math.min(t.outlineSize,.5*At[0])*P.pixelRatio/2),At[0]*=B,At[1]*=M;const l=O.get(a),c=t.rotation+l;if(rt(S,dt[0],dt[1],At,i,r,c,t,_)){const t=o.ray;if(p(pt,lt,s(vt,P.viewMatrix)),dt[0]=S[0],dt[1]=S[1],P.unprojectFromRenderScreen(dt,lt)){const i=z();m(i,t.direction);const o=1/v(i);g(i,i,o),n(x(t.origin,lt)*o,i,e,pt)}}}}}}function Ft(e,t,i){return null==e||null==t.vvSize?{scaleX:i,scaleY:i}:(se(St,t,e),{scaleX:St[0]*i,scaleY:St[1]*i})}function Dt(e,t,i,o,s){if(!e.verticalOffset?.screenLength)return e.screenSizePerspective||e.screenSizePerspectiveAlignment?_t(e,s,v(t),i.cosAngle):(s.factor.scale=1,s.factorAlignment.scale=1),t;const a=v(t),r=e.screenSizePerspectiveAlignment??e.screenSizePerspective,n=ae(o,a,e.verticalOffset,i.cosAngle,r);return _t(e,s,a,i.cosAngle),g(i.normal,i.normal,n),b(t,t,i.normal)}function _t(e,t,i,o){null!=e.screenSizePerspective?fe(o,i,e.screenSizePerspective,t.factor):(t.factor.scale=1,t.factor.factor=0,t.factor.minScaleFactor=0),null!=e.screenSizePerspectiveAlignment?fe(o,i,e.screenSizePerspectiveAlignment,t.factorAlignment):(t.factorAlignment.factor=t.factor.factor,t.factorAlignment.scale=t.factor.scale,t.factorAlignment.minScaleFactor=t.factor.minScaleFactor)}export{Ne as F,ot as H,He as S};
