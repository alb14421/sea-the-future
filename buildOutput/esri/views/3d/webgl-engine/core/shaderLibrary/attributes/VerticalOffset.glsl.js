// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/screenUtils","../../../../../../chunks/vec42","../../../../../../core/libs/gl-matrix-2/factories/vec4f64","../util/ScreenSizePerspective.glsl","../util/View.glsl","../../shaderModules/Float4PassUniform","../../shaderModules/glsl"],function(e,t,l,r,c,s,i,a){"use strict";const o=r.create();function n(e){e.uniforms.add(new i.Float4PassUniform("verticalOffset",(e,t)=>{const{minWorldLength:r,maxWorldLength:c,screenLength:s}=e.verticalOffset,i=Math.tan(.5*t.camera.fovY)/(.5*t.camera.fullViewport[3]),a=t.camera.pixelRatio||1;return l.set(o,s*a,i,r,c)}))}e.VerticalOffset=function(e,t){const l=e.vertex;t.hasVerticalOffset?(n(l),t.hasScreenSizePerspective&&(e.include(c.ScreenSizePerspective),c.addScreenSizePerspectiveAlignment(l),s.addCameraPosition(e.vertex,t)),l.code.add(a.glsl`
      vec3 calculateVerticalOffset(vec3 worldPos, vec3 localOrigin) {
        float viewDistance = length((view * vec4(worldPos, 1.0)).xyz);
        ${t.spherical?a.glsl`vec3 worldNormal = normalize(worldPos + localOrigin);`:a.glsl`vec3 worldNormal = vec3(0.0, 0.0, 1.0);`}
        ${t.hasScreenSizePerspective?a.glsl`
            float cosAngle = dot(worldNormal, normalize(worldPos - cameraPosition));
            float verticalOffsetScreenHeight = screenSizePerspectiveScaleFloat(verticalOffset.x, abs(cosAngle), viewDistance, screenSizePerspectiveAlignment);`:a.glsl`
            float verticalOffsetScreenHeight = verticalOffset.x;`}
        // Screen sized offset in world space, used for example for line callouts
        float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * viewDistance, verticalOffset.z, verticalOffset.w);
        return worldNormal * worldOffset;
      }

      vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) {
        return worldPos + calculateVerticalOffset(worldPos, localOrigin);
      }
    `)):l.code.add(a.glsl`vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) { return worldPos; }`)},e.VerticalOffsetParameters=class{constructor(e){this.screenLength=t.pt2px(e.screenLength),this.minWorldLength=e.minWorldLength??0,this.maxWorldLength=e.maxWorldLength??1/0}},e.addVerticalOffset=n,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});