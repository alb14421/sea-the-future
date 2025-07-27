/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{c as e}from"./vec2f64.js";import{c as t,f as o}from"./vec3f64.js";import{f as r,Z as a,c as i}from"./vec4f64.js";import s from"../Color.js";import{i as n,l as c}from"./fontUtils.js";import{L as d}from"./Logger.js";import{p as l}from"./screenUtils.js";import{_ as h}from"./tslib.es6.js";import u from"../core/Accessor.js";import{EventEmitter as f}from"../core/Evented.js";import"../core/lang.js";import{f as m,r as p}from"./maybe.js";import{g as v}from"./watch.js";import{property as y}from"../core/accessorSupport/decorators/property.js";import{subclass as g}from"../core/accessorSupport/decorators/subclass.js";import{a as w,s as x}from"./vec4.js";import{am as C,_,B as D,g as P,E as S,c as R,ak as b}from"./Matrix4PassUniform.js";import{T as k,Y as z}from"./Scheduler.js";import{a as j,T as M}from"./Texture.js";import{g as T}from"./glsl.js";import{U as I,G as F}from"./Emissions.glsl.js";import{c as L,d as A,P as E,T as N,f as O,h as Z}from"./DefaultMaterial.js";import{x as H}from"./unitUtils.js";import{c as U}from"./weather.js";import{B as V}from"./BooleanBindUniform.js";class B{constructor(o,a="center",i=!1,s=e(),n=r(0,0,0,-1),c="world",d=t(),l=0){this.verticalOffset=o,this.anchor=a,this.hasLabelVerticalOffset=i,this.screenOffset=s,this.centerOffset=n,this.centerOffsetUnits=c,this.translation=d,this.elevationOffset=l}}class G{constructor(t,o="center",r="center",a=null,i=e(),s=!0){this.placement=t,this.horizontalPlacement=o,this.verticalPlacement=r,this.text=a,this.displaySize=i,this.isFocused=s}}class W{constructor(e){this.definition=e,this.key=JSON.stringify(e),this.haloSize=Math.round(e.halo.size),this.textStyle=$(e.color),this.haloStyle=`rgb(${e.halo.color.slice(0,3).map(e=>Math.floor(255*e)).toString()})`,this.backgroundStyle=0!==e.background.color[3]?$(e.background.color):null}fontString(e){const t=this.definition.font;return`${t.style} ${t.weight} ${e}px ${t.family}, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji`}setFontProperties(e,t){e.font=this.fontString(t),e.textAlign="left",e.textBaseline="alphabetic"}static async fromSymbol(e,t){const o=e?.material?.color,r=s.toUnitRGBA(o)??a,i=null!=e.size?l(e.size):12,h=e.lineHeight,u=null!=e.background?s.toUnitRGBA(e.background.color):a,f={family:e.font?.family??"sans-serif",decoration:e.font?.decoration??"none",weight:e.font?.weight??"normal",style:e.font?.style??"normal"},m=e.halo,p=null!=m?.color&&m.size>0?{size:l(m.size),color:s.toUnitRGBA(m.color)}:{size:0,color:a},v=new W({color:r,size:i,background:{color:u,padding:null!=e.background?[.65*i,.5*i]:[0,0],borderRadius:null!=e.background?i*(6/16):0},lineSpacingFactor:h,font:f,halo:p,pixelRatio:t});if(e.font){let t=!1;const o=v.fontString(i);try{t=(await document.fonts.load(o)).some(e=>!n(e))}catch(e){d.getLogger("esri.views.3d.webgl-engine.lib.TextRenderParameters").warnOnce(`Failed to preload font '${o}'. Some text symbology may be rendered using the default browser font.`)}if(!t&&!Q.has(e.font.family))try{await c(e.font)}catch(e){}}return v}}function $(e){return`rgba(${e.slice(0,3).map(e=>Math.floor(255*e)).toString()},${e[3]})`}const Q=new Set(["Arial","Times New Roman","Courier New","serif","sans-serif","monospace","cursive","fantasy","system-ui","ui-serif","ui-sans-serif","ui-monospace","ui-rounded","math","emoji","fangsong"]),Y=4096;let q=class extends u{constructor(e){super(e),this.id=v(),this.events=new f,this._glTexture=null,this._atlas=new ee(256,256),this._needsRepack=!1,this._canRepack=!0,this._elementsToRender=new Map,this._elements=new Map,this._uvCallbacks=new Map,this.updating=!1}initialize(){this._canvas=document.createElement("canvas"),this._canvas.setAttribute("id","textAtlasCanvas"),this._canvas.setAttribute("style","display:none"),this._ctx=this._canvas.getContext("2d"),this._stage=this.view.stage,this._stage.addTexture(this),this._updateCanvasElementSize(this._atlas),this._reset()}unload(){this._glTexture=m(this._glTexture),this._frameWorker=p(this._frameWorker),this.updating=!1,this.events.emit("unloaded")}get loaded(){return null!=this._glTexture}get glTexture(){return this._glTexture}static get maxSize(){return oe=0,[Y-X-oe,Y-X-oe-J]}load(e){if(this._glTexture)return this._glTexture;const t=new j;return t.wrapMode=33071,t.samplingMode=9987,t.hasMipmap=!0,t.preMultiplyAlpha=!0,t.maxAnisotropy=e.parameters.maxMaxAnisotropy,this._glTexture=new M(e,t,this._canvas),this._frameWorker=this.view.resourceController.scheduler.registerTask(k.TEXT_TEXTURE_ATLAS,this),this.setDirty(),this._glTexture}dispose(){this._elements.clear(),this._elementsToRender.clear(),this._frameWorker=p(this._frameWorker),this._glTexture&&(this._stage.removeTexture(this),this._glTexture=m(this._glTexture)),this._canvas.width=0,this._canvas.height=0,this._canvas=null,this._ctx=null}_updateCanvasElementSize(e){this._canvas.width=e.width,this._canvas.height=e.height}_resizeAtlas(e,t){const{width:o,height:r}=this._atlas;o===e&&r===t||(this._atlas.width=e,this._atlas.height=t,this._glTexture?.resize(e,t),this._glTexture?.updateData(0,0,0,o,r,this._canvas),this._updateCanvasElementSize(this._atlas),this._elements.forEach(e=>this._uvCallbacks.get(e.textRenderer.key)?.forEach(t=>t(e.uv))),this._reset())}_reset(){this._elementsToRender.clear(),this._atlas.reset(),this._needsRepack=!0,this.setDirty()}_addAtlasElement(e,t,o,r){const a=this._atlas;if(a.width<o||a.height<r)return!1;let i=a.cursors.get(r);if(!i){if(a.height<a.nextY+r)return!1;i=[new te(a.nextY)],a.cursors.set(r,i),a.nextY+=r}let s=i.find(e=>a.width>=e.x+o);if(null==s){if(a.height<a.nextY+r)return!1;s=new te(a.nextY),a.nextY+=r,i.push(s)}return e.setNewPosition(s),this._elements.set(t,e),this._elementsToRender.set(t,e),s.x+=o,!0}_ensureCallbacks(e){const t=this._uvCallbacks.get(e);if(t)return t;const o=new Set;return this._uvCallbacks.set(e,o),o}_addCallback(e,t){this._ensureCallbacks(e).add(t)}_removeCallback(e,t){const o=this._uvCallbacks.get(e);return!(!o?.delete(t)||0!==o.size||(this._uvCallbacks.delete(e),0))}_processAddition(e){const t=e.textRenderer.key;if(this._needsRepack)return void this._elements.set(t,e);const o=this._atlas,r=e.textRenderer.renderedWidth,a=e.textRenderer.renderedHeight,i=r+X,s=a+X+J;if(!this._addAtlasElement(e,t,i,s)){if(this._canRepack)this._reset();else if(o.width<i){const e=C(Math.max(i,1.5*o.width),Y);this._resizeAtlas(e,o.height)}else{const e=o.nextY+s,t=C(Math.max(e,1.5*o.height),Y);if(t>o.height)this._resizeAtlas(o.width,t);else if(o.width<Y){const e=C(1.5*o.width,Y);this._resizeAtlas(e,o.height)}}this._elements.set(t,e)}}_renderElement(e){const t=e.commitNewPosition(),o=e.textRenderer;this._ctx.clearRect(t[0]-X,t[1]-X,o.renderedWidth+2*X,o.renderedHeight+2*X),o.render(this._ctx,t[0],t[1]),this._uvCallbacks.get(o.key)?.forEach(t=>t(e.uv))}get readyToRun(){return this.updating}runTask(e){if(null==this._glTexture)return z;for(;this._needsRepack&&(this._canRepack||this._atlas.height<Y&&this._atlas.height<Y);){this._canRepack=this._needsRepack=!1;const t=this._elements;this._elements=new Map,t.forEach(e=>this._processAddition(e)),e.madeProgress()}if(this._elementsToRender.size>0){for(const[t,o]of this._elementsToRender){if(e.done)break;this._renderElement(o),this._elementsToRender.delete(t),e.madeProgress()}this._glTexture.setData(this._canvas)}this.updating=this._elementsToRender.size>0}addText(e,t){const o=e.key;this._addCallback(o,t);let r=this._elements.get(o);return r?w(r.uv,a)||t(r.uv):(r=new K(e),this._processAddition(r),this.setDirty()),{remove:()=>this._removeText(e,t)}}_removeText(e,t){const o=e.key;this._elements.get(o)&&this._removeCallback(o,t)&&(this._elements.delete(o),this._elementsToRender.delete(o),this._canRepack=!0)}setDirty(){this._glTexture&&(this.updating=!0)}get test(){}get usedMemory(){return(this._glTexture?.usedMemory??0)+(this._canvas?.width??0)*(this._canvas?.height??0)*4}};h([y({constructOnly:!0})],q.prototype,"view",void 0),h([y({type:Boolean})],q.prototype,"updating",void 0),q=h([g("esri.views.3d.webgl-engine.lib.TextTextureAtlas")],q);const X=2,J=2;class K{constructor(e){this.textRenderer=e,this._uv=i(),this._newPosition=[0,0]}get uv(){if(null==this._xOffset||null==this._yOffset)return a;const{renderedWidth:e,renderedHeight:t}=this.textRenderer;return x(this._uv,this._xOffset,this._yOffset+t,this._xOffset+e,this._yOffset)}setNewPosition(e){this._newPosition[0]=e.x,this._newPosition[1]=e.y}commitNewPosition(){return this._xOffset=this._newPosition[0],this._yOffset=this._newPosition[1],this._newPosition}get xOffset(){return this._xOffset}get yOffset(){return this._yOffset}}class ee{constructor(e,t){this.width=e,this.height=t,this.cursors=new Map,this.nextY=0}reset(){this.cursors.clear(),this.nextY=oe}}class te{constructor(e){this.y=e,this.x=oe}}let oe=0;class re{constructor(e,t){this._material=e,this._repository=t,this._map=new Map}dispose(){this._map.forEach((e,t)=>{null!=e&&this._repository.release(this._material,t)})}load(e,t,o){const r=this._material.produces.get(t);if(!r?.(o))return null;this._map.has(o)||this._map.set(o,this._repository.acquire(this._material,t,o));const a=this._map.get(o);if(a){if(2===a.ensureResources(e))return a;this._repository.requestRender()}return null}}function ae(e){e.code.add(T`float normals2FoamIntensity(vec3 n, float waveStrength){
float normalizationFactor =  max(0.015, waveStrength);
return max((n.x + n.y)*0.3303545/normalizationFactor + 0.3303545, 0.0);
}`)}function ie(e){e.code.add(T`vec3 foamIntensity2FoamColor(float foamIntensityExternal, float foamPixelIntensity, vec3 skyZenitColor, float dayMod){
return foamIntensityExternal * (0.075 * skyZenitColor * pow(foamPixelIntensity, 4.) +  50.* pow(foamPixelIntensity, 23.0)) * dayMod;
}`)}function se(e,t){if(!t.screenSpaceReflections)return;const o=e.fragment;o.include(_),o.uniforms.add(new D("nearFar",e=>e.camera.nearFar),new P("depthMap",e=>e.depth?.attachment),new S("proj",e=>e.camera.projectionMatrix),new R("invResolutionHeight",e=>1/e.camera.height),new S("reprojectionMatrix",e=>e.ssr.reprojectionMatrix)).code.add(T`
  vec2 reprojectionCoordinate(vec3 projectionCoordinate)
  {
    vec4 zw = proj * vec4(0.0, 0.0, -projectionCoordinate.z, 1.0);
    vec4 reprojectedCoord = reprojectionMatrix * vec4(zw.w * (projectionCoordinate.xy * 2.0 - 1.0), zw.z, zw.w);
    reprojectedCoord.xy /= reprojectedCoord.w;
    return reprojectedCoord.xy * 0.5 + 0.5;
  }

  const int maxSteps = ${t.highStepCount?"150":"75"};

  vec4 applyProjectionMat(mat4 projectionMat, vec3 x)
  {
    vec4 projectedCoord =  projectionMat * vec4(x, 1.0);
    projectedCoord.xy /= projectedCoord.w;
    projectedCoord.xy = projectedCoord.xy*0.5 + 0.5;
    return projectedCoord;
  }

  vec3 screenSpaceIntersection(vec3 dir, vec3 startPosition, vec3 viewDir, vec3 normal)
  {
    vec3 viewPos = startPosition;
    vec3 viewPosEnd = startPosition;

    // Project the start position to the screen
    vec4 projectedCoordStart = applyProjectionMat(proj, viewPos);
    vec3  Q0 = viewPos / projectedCoordStart.w; // homogeneous camera space
    float k0 = 1.0/ projectedCoordStart.w;

    // advance the position in the direction of the reflection
    viewPos += dir;

    vec4 projectedCoordVanishingPoint = applyProjectionMat(proj, dir);

    // Project the advanced position to the screen
    vec4 projectedCoordEnd = applyProjectionMat(proj, viewPos);
    vec3  Q1 = viewPos / projectedCoordEnd.w; // homogeneous camera space
    float k1 = 1.0/ projectedCoordEnd.w;

    // calculate the reflection direction in the screen space
    vec2 projectedCoordDir = (projectedCoordEnd.xy - projectedCoordStart.xy);
    vec2 projectedCoordDistVanishingPoint = (projectedCoordVanishingPoint.xy - projectedCoordStart.xy);

    float yMod = min(abs(projectedCoordDistVanishingPoint.y), 1.0);

    float projectedCoordDirLength = length(projectedCoordDir);
    float maxSt = float(maxSteps);

    // normalize the projection direction depending on maximum steps
    // this determines how blocky the reflection looks
    vec2 dP = yMod * (projectedCoordDir)/(maxSt * projectedCoordDirLength);

    // Normalize the homogeneous camera space coordinates
    vec3  dQ = yMod * (Q1 - Q0)/(maxSt * projectedCoordDirLength);
    float dk = yMod * (k1 - k0)/(maxSt * projectedCoordDirLength);

    // initialize the variables for ray marching
    vec2 P = projectedCoordStart.xy;
    vec3 Q = Q0;
    float k = k0;
    float rayStartZ = -startPosition.z; // estimated ray start depth value
    float rayEndZ = -startPosition.z;   // estimated ray end depth value
    float prevEstimateZ = -startPosition.z;
    float rayDiffZ = 0.0;
    float dDepth;
    float depth;
    float rayDiffZOld = 0.0;

    // early outs
    if (dot(normal, dir) < 0.0 || dot(-viewDir, normal) < 0.0)
      return vec3(P, 0.0);
    float dDepthBefore = 0.0;

    for(int i = 0; i < maxSteps-1; i++)
    {
      depth = -linearDepthFromTexture(depthMap, P); // get linear depth from the depth buffer

      // estimate depth of the marching ray
      rayStartZ = prevEstimateZ;
      dDepth = -rayStartZ - depth;
      rayEndZ = (dQ.z * 0.5 + Q.z)/ ((dk * 0.5 + k));
      rayDiffZ = rayEndZ- rayStartZ;
      prevEstimateZ = rayEndZ;

      if(-rayEndZ > nearFar[1] || -rayEndZ < nearFar[0] || P.y < 0.0  || P.y > 1.0 )
      {
        return vec3(P, 0.);
      }

      // If we detect a hit - return the intersection point, two conditions:
      //  - dDepth > 0.0 - sampled point depth is in front of estimated depth
      //  - if difference between dDepth and rayDiffZOld is not too large
      //  - if difference between dDepth and 0.025/abs(k) is not too large
      //  - if the sampled depth is not behind far plane or in front of near plane

      if((dDepth) < 0.025/abs(k) + abs(rayDiffZ) && dDepth > 0.0 && depth > nearFar[0] && depth < nearFar[1] && abs(P.y - projectedCoordStart.y) > invResolutionHeight)
      {
        float weight = dDepth / (dDepth - dDepthBefore);
        vec2 Pf = mix(P - dP, P, 1.0 - weight);
        if (abs(Pf.y - projectedCoordStart.y) > invResolutionHeight) {
          return vec3(Pf, depth);
        }
        else {
          return vec3(P, depth);
        }
      }

      // continue with ray marching
      P = clamp(P + dP, vec2(0.0), vec2(0.999));
      Q.z += dQ.z;
      k += dk;
      rayDiffZOld = rayDiffZ;
      dDepthBefore = dDepth;
    }
    return vec3(P, 0.0);
  }
  `)}function ne(e){e.fragment.uniforms.add(new R("cloudAbsorption",e=>e.clouds.absorption),new R("cloudCoverage",e=>e.clouds.coverage)).code.add(T`vec4 lookupCloudsFromTextureArray(sampler2DArray cubeMap, vec3 rayDir) {
int faceIndex;
vec2 uv;
if(rayDir.z <= 0.0) {
float hazeFactor = smoothstep(-0.01, mix(0.0, 0.075, cloudCoverage), abs(dot(rayDir, vec3(0, 0, 1))));
float shading = clamp(1.0 - cloudAbsorption, 0.6, 1.0) * (1.0 - hazeFactor);
float totalTransmittance = hazeFactor;
return vec4(shading, totalTransmittance, shading, totalTransmittance);
}
if (abs(rayDir.x) >= abs(rayDir.y) && abs(rayDir.x) >= abs(rayDir.z)) {
if(rayDir.x > 0.0) {
faceIndex = 0;
uv = rayDir.yz / rayDir.x;
uv = vec2(-uv.x, uv.y);
} else {
faceIndex = 1;
uv = rayDir.yz / rayDir.x;
uv = vec2(-uv.x, -uv.y);
}
} else if (abs(rayDir.y) >= abs(rayDir.x) && abs(rayDir.y) >= abs(rayDir.z)) {
if(rayDir.y > 0.0) {
faceIndex = 2;
uv = rayDir.xz / rayDir.y;
} else {
faceIndex = 3;
uv = rayDir.xz / rayDir.y;
uv = vec2(uv.x, -uv.y);
}
} else {
if(rayDir.y < 0.0) {
faceIndex = 4;
uv = rayDir.xy / rayDir.z;
uv = vec2(uv.x, -uv.y);
} else {
faceIndex = 5;
uv = rayDir.xy / rayDir.z;
uv = vec2(uv.x, -uv.y);
}
}
uv = 0.5 * (uv + 1.0);
if(faceIndex != 5) {
uv.y = uv.y - 0.5;
}
uv.y = uv.y * 2.0;
vec4 s = texture(cubeMap, vec3(uv, float(faceIndex)));
return s;
}`)}class ce extends I{constructor(e,t){super(e,"sampler2DArray",0,(o,r)=>o.bindTexture(e,t(r)))}}function de(e){const t=e.fragment;t.constants.add("radiusCloudsSquared","float",le).code.add(T`vec3 intersectWithCloudLayer(vec3 dir, vec3 cameraPosition, vec3 spherePos) {
float B = 2.0 * dot(cameraPosition, dir);
float C = dot(cameraPosition, cameraPosition) - radiusCloudsSquared;
float det = B * B - 4.0 * C;
float pointIntDist = max(0.0, 0.5 *(-B + sqrt(det)));
return (cameraPosition + dir * pointIntDist) - spherePos;
}`),t.uniforms.add(new R("radiusCurvatureCorrection",({clouds:e})=>e.parallax.radiusCurvatureCorrection)).code.add(T`vec3 correctForPlanetCurvature(vec3 dir) {
dir.z = dir.z * (1.0 - radiusCurvatureCorrection) + radiusCurvatureCorrection;
return dir;
}`),t.code.add(T`vec3 rotateDirectionToAnchorPoint(mat4 rotMat, vec3 inVec) {
return (rotMat * vec4(inVec, 0.0)).xyz;
}`),L(t),A(t);const r=o(.28,.175,.035);t.constants.add("RIM_COLOR","vec3",r),t.code.add(T`
    vec3 calculateCloudColor(vec3 cameraPosition, vec3 worldSpaceRay, vec4 clouds) {
      float upDotLight = dot(cameraPosition, mainLightDirection);
      float dirDotLight = max(dot(worldSpaceRay, mainLightDirection), 0.0);
      float sunsetTransition = clamp(pow(max(upDotLight, 0.0), ${T.float(.3)}), 0.0, 1.0);

      // Base color of the clouds that depends on lighting of the sun and sky
      vec3 ambientLight = calculateAmbientIrradiance(cameraPosition,  0.0);
      vec3 combinedLight = clamp((mainLightIntensity + ambientLight )/PI, vec3(0.0), vec3(1.0));
      vec3 baseCloudColor = pow(combinedLight * pow(clouds.xyz, vec3(GAMMA)), vec3(INV_GAMMA));

      // Rim light around the edge of the clouds simulating scattering of the direct lun light
      float scatteringMod = max(clouds.a < 0.5 ? clouds.a / 0.5 : - clouds.a / 0.5 + 2.0, 0.0);
      float rimLightIntensity = 0.5 + 0.5 * pow(max(upDotLight, 0.0), 0.35);
      vec3 directSunScattering = RIM_COLOR * rimLightIntensity * (pow(dirDotLight, ${T.float(140)})) * scatteringMod;

      // Brighten the clouds around the sun at the sunsets
      float additionalLight = ${T.float(.2)} * pow(dirDotLight, ${T.float(10)}) * (1. - pow(sunsetTransition, ${T.float(.3)})) ;

      return vec3(baseCloudColor * (1.0 + additionalLight) + directSunScattering);
    }
  `),e.include(ne),t.uniforms.add(new V("readChannelsRG",e=>0===e.clouds.readChannels),new ce("cubeMap",e=>e.clouds.data?.cubeMap?.colorTexture)).code.add(T`vec4 sampleCloud(vec3 rayDir, bool readOtherChannel) {
vec4 s = lookupCloudsFromTextureArray(cubeMap, rayDir);
bool readRG = readChannelsRG ^^ readOtherChannel;
s = readRG ? vec4(vec3(s.r), s.g) : vec4(vec3(s.b), s.a);
return length(s) == 0.0 ? vec4(s.rgb, 1.0) : s;
}`),t.uniforms.add(new b("anchorPoint",e=>e.clouds.parallax.anchorPoint),new b("anchorPointNew",e=>e.clouds.parallaxNew.anchorPoint),new S("rotationClouds",e=>e.clouds.parallax.transform),new S("rotationCloudsNew",e=>e.clouds.parallaxNew.transform),new R("cloudsOpacity",e=>e.clouds.opacity),new R("fadeFactor",e=>e.clouds.fadeFactor),new V("crossFade",e=>3===e.clouds.fadeState)).code.add(T`vec4 renderClouds(vec3 worldRay, vec3 cameraPosition) {
vec3 intersectionPoint = intersectWithCloudLayer(worldRay, cameraPosition, anchorPoint);
vec3 worldRayRotated = rotateDirectionToAnchorPoint(rotationClouds, normalize(intersectionPoint));
vec3 worldRayRotatedCorrected = correctForPlanetCurvature(worldRayRotated);
vec4 cloudData = sampleCloud(worldRayRotatedCorrected, crossFade);
vec3 cameraPositionN = normalize(cameraPosition);
vec4 cloudColor = vec4(calculateCloudColor(cameraPositionN, worldRay, cloudData), cloudData.a);
if(crossFade) {
intersectionPoint = intersectWithCloudLayer(worldRay, cameraPosition, anchorPointNew);
worldRayRotated = rotateDirectionToAnchorPoint(rotationCloudsNew, normalize(intersectionPoint));
worldRayRotatedCorrected = correctForPlanetCurvature(worldRayRotated);
cloudData = sampleCloud(worldRayRotatedCorrected, false);
vec4 cloudColorNew = vec4(calculateCloudColor(cameraPositionN, worldRay, cloudData), cloudData.a);
cloudColor = mix(cloudColor, cloudColorNew, fadeFactor);
}
float totalTransmittance = length(cloudColor.rgb) == 0.0 ?
1.0 :
clamp(cloudColor.a * cloudsOpacity + (1.0 - cloudsOpacity), 0.0 , 1.0);
return vec4(cloudColor.rgb, totalTransmittance);
}`)}const le=(H.radius+U)**2;function he(e,t){const o=e.fragment;o.include(E,t),o.include(F),o.include(ie),t.cloudReflections&&e.include(de),e.include(se,t),o.include(N,t),o.constants.add("fresnelSky","vec3",[.02,1,15]),o.constants.add("fresnelMaterial","vec2",[.02,.1]),o.constants.add("roughness","float",.015),o.constants.add("foamIntensityExternal","float",1.7),o.constants.add("ssrIntensity","float",.65),o.constants.add("ssrHeightFadeStart","float",O),o.constants.add("ssrHeightFadeEnd","float",Z),o.constants.add("waterDiffusion","float",.92),o.constants.add("waterSeaColorMod","float",.8),o.constants.add("correctionViewingPowerFactor","float",.4),o.constants.add("skyZenitColor","vec3",[.52,.68,.9]),o.constants.add("skyColor","vec3",[.67,.79,.9]),o.constants.add("cloudFresnelModifier","vec2",[1.2,.01]),o.code.add(T`PBRShadingWater shadingInfo;
vec3 getSkyGradientColor(in float cosTheta, in vec3 horizon, in vec3 zenit) {
float exponent = pow((1.0 - cosTheta), fresnelSky[2]);
return mix(zenit, horizon, exponent);
}`),o.uniforms.add(new R("lightingSpecularStrength",e=>e.lighting.mainLight.specularStrength),new R("lightingEnvironmentStrength",e=>e.lighting.mainLight.environmentStrength)),o.code.add(T`vec3 getSeaColor(in vec3 n, in vec3 v, in vec3 l, vec3 color, in vec3 lightIntensity, in vec3 localUp, in float shadow, float foamIntensity, vec3 viewPosition, vec3 position) {
float reflectionHit = 0.0;
float reflectionHitDiffused = 0.0;
vec3 seaWaterColor = linearizeGamma(color);
vec3 h = normalize(l + v);
shadingInfo.NdotV = clamp(dot(n, v), 0.001, 1.0);
shadingInfo.VdotN = clamp(dot(v, n), 0.001, 1.0);
shadingInfo.NdotH = clamp(dot(n, h), 0.0, 1.0);
shadingInfo.VdotH = clamp(dot(v, h), 0.0, 1.0);
shadingInfo.LdotH = clamp(dot(l, h), 0.0, 1.0);
float upDotV = max(dot(localUp,v), 0.0);
vec3 skyHorizon = linearizeGamma(skyColor);
vec3 skyZenit = linearizeGamma(skyZenitColor);
vec3 skyColor = getSkyGradientColor(upDotV, skyHorizon, skyZenit );
float upDotL = max(dot(localUp,l),0.0);
float daytimeMod = 0.1 + upDotL * 0.9;
skyColor *= daytimeMod;
float shadowModifier = clamp(shadow, 0.8, 1.0);
vec3 fresnelModifier = fresnelReflection(shadingInfo.VdotN, vec3(fresnelSky[0]), fresnelSky[1]);
vec3 reflSky = lightingEnvironmentStrength * fresnelModifier * skyColor * shadowModifier;
vec3 reflSea = seaWaterColor * mix(skyColor, upDotL * lightIntensity * LIGHT_NORMALIZATION, 2.0 / 3.0) * shadowModifier;
vec3 specular = vec3(0.0);
if(upDotV > 0.0 && upDotL > 0.0) {
vec3 specularSun = brdfSpecularWater(shadingInfo, roughness, vec3(fresnelMaterial[0]), fresnelMaterial[1]);
vec3 incidentLight = lightIntensity * LIGHT_NORMALIZATION * shadow;
float NdotL = clamp(dot(n, l), 0.0, 1.0);
specular = lightingSpecularStrength * NdotL * incidentLight * specularSun;
}
vec3 foam = vec3(0.0);
if(upDotV > 0.0) {
foam = foamIntensity2FoamColor(foamIntensityExternal, foamIntensity, skyZenitColor, daytimeMod);
}
float correctionViewingFactor = pow(max(dot(v, localUp), 0.0), correctionViewingPowerFactor);
vec3 normalCorrectedClouds = mix(localUp, n, correctionViewingFactor);
vec3 reflectedWorld = normalize(reflect(-v, normalCorrectedClouds));`),t.cloudReflections&&o.uniforms.add(new R("cloudsOpacity",e=>e.clouds.opacity)).code.add(T`vec4 cloudsColor = renderClouds(reflectedWorld, position);
cloudsColor.a = 1.0 - cloudsColor.a;
cloudsColor = pow(cloudsColor, vec4(GAMMA));
cloudsColor *= clamp(fresnelModifier.y * cloudFresnelModifier[0] - cloudFresnelModifier[1], 0.0, 1.0) * cloudsOpacity;`),t.screenSpaceReflections?o.uniforms.add(new S("view",e=>e.camera.viewMatrix),new P("lastFrameColorTexture",e=>e.ssr.lastFrameColor?.getTexture()),new R("fadeFactorSSR",e=>e.ssr.fadeFactor)).code.add(T`vec3 viewDir = normalize(viewPosition);
vec4 viewNormalVectorCoordinate = view * vec4(n, 0.0);
vec3 viewNormal = normalize(viewNormalVectorCoordinate.xyz);
vec4 viewUp = view * vec4(localUp, 0.0);
vec3 viewNormalCorrectedSSR = mix(viewUp.xyz, viewNormal, correctionViewingFactor);
vec3 reflected = normalize(reflect(viewDir, viewNormalCorrectedSSR));
vec3 hitCoordinate = screenSpaceIntersection(reflected, viewPosition, viewDir, viewUp.xyz);
vec3 reflectedColor = vec3(0.0);
if (hitCoordinate.z > 0.0)
{
vec2 reprojectedCoordinate = reprojectionCoordinate(hitCoordinate);
vec2 dCoords = smoothstep(0.3, 0.6, abs(vec2(0.5, 0.5) - hitCoordinate.xy));
float heightMod = smoothstep(ssrHeightFadeEnd, ssrHeightFadeStart, -viewPosition.z);
reflectionHit = clamp(1.0 - (1.3 * dCoords.y), 0.0, 1.0) * heightMod * fadeFactorSSR;
reflectionHitDiffused = waterDiffusion * reflectionHit;
reflectedColor = linearizeGamma(texture(lastFrameColorTexture, reprojectedCoordinate).xyz) *
reflectionHitDiffused * fresnelModifier.y * ssrIntensity;
}
float seaColorMod =  mix(waterSeaColorMod, waterSeaColorMod * 0.5, reflectionHitDiffused);
vec3 waterRenderedColor = tonemapACES((1.0 - reflectionHitDiffused) * reflSky + reflectedColor +
reflSea * seaColorMod + specular + foam);`):o.code.add(T`vec3 waterRenderedColor = tonemapACES(reflSky + reflSea * waterSeaColorMod + specular + foam);`),t.cloudReflections?t.screenSpaceReflections?o.code.add(T`return waterRenderedColor * (1.0 - (1.0 - reflectionHit) * cloudsColor.a) + (1.0 - reflectionHit) * cloudsColor.xyz;
}`):o.code.add(T`return waterRenderedColor * (1.0 - cloudsColor.a) + cloudsColor.xyz;
}`):o.code.add(T`return waterRenderedColor;
}`)}function ue(e,t){t.spherical?e.vertex.code.add(T`vec3 getLocalUp(in vec3 pos, in vec3 origin) {
return normalize(pos + origin);
}`):e.vertex.code.add(T`vec3 getLocalUp(in vec3 pos, in vec3 origin) {
return vec3(0.0, 0.0, 1.0);
}`),t.spherical?e.vertex.code.add(T`mat3 getTBNMatrix(in vec3 n) {
vec3 t = normalize(cross(vec3(0.0, 0.0, 1.0), n));
vec3 b = normalize(cross(n, t));
return mat3(t, b, n);
}`):e.vertex.code.add(T`mat3 getTBNMatrix(in vec3 n) {
vec3 t = vec3(1.0, 0.0, 0.0);
vec3 b = normalize(cross(n, t));
return mat3(t, b, n);
}`)}export{de as C,ae as F,re as G,B as L,ue as N,q as T,he as W,W as a,G as b};
