// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/webgl/ShaderBuilder"],function(e,i,a,t,o){"use strict";function r(e){const r=new o.ShaderBuilder,{vertex:s,fragment:l,attributes:d,varyings:u}=r;i.addProjViewLocalOrigin(s,e);const{isAttributeDriven:n,usesHalfFloat:c}=e;return d.add("position","vec3"),d.add("uv0","vec2"),n&&(d.add("featureAttribute","float"),u.add("attributeValue","float")),c&&l.constants.add("compressionFactor","float",.25),u.add("unitCirclePos","vec2"),s.uniforms.add(new a.FloatPassUniform("radius",({resolutionForScale:e,searchRadius:i},{camera:a,screenToWorldRatio:t,overlayStretch:o})=>2*i*(0===e?1:e/t)*a.pixelRatio/a.fullViewport[2]/o)),s.main.add(t.glsl`
    unitCirclePos = uv0;

    vec4 posProj = proj * (view * vec4(${"position"}, 1.0));
    vec4 quadOffset = vec4(unitCirclePos * radius, 0.0, 0.0);

    ${n?t.glsl`attributeValue = ${"featureAttribute"};`:""}
    gl_Position = posProj + quadOffset;
  `),l.main.add(t.glsl`
    float radiusRatioSquared = dot(unitCirclePos, unitCirclePos);
    if (radiusRatioSquared > 1.0) {
      fragColor = vec4(0.0);
    }
    else {
      float oneMinusRadiusRatioSquared = 1.0 - radiusRatioSquared;
      float density = oneMinusRadiusRatioSquared * oneMinusRadiusRatioSquared ${n?t.glsl` * attributeValue`:""} ${c?t.glsl` * compressionFactor`:""};
      fragColor = vec4(density);
    }
  `),r}const s=Object.freeze(Object.defineProperty({__proto__:null,build:r},Symbol.toStringTag,{value:"Module"}));e.HeatmapDensity=s,e.build=r});