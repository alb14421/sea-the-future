// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/ObjectAndLayerIdColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/VertexColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/TerrainDepthTest.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/VisualVariables.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatBindUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/shaders/OutputColorHighlightOID.glsl","../views/webgl/ShaderBuilder"],function(e,o,t,a,l,r,i,n,c,d,s,g,v,u){"use strict";const p=.70710678118,f=p;function m(e){const m=new u.ShaderBuilder,{vertex:w,fragment:h,attributes:b,varyings:y}=m,S=8===e.output;c.addProjViewLocalOrigin(w,e),m.include(t.Transform,e),m.include(l.VertexColor,e),m.include(i.VisualVariables,e),m.include(a.ObjectAndLayerIdColor,e),m.fragment.include(o.SliceDraw,e),m.include(v.outputColorHighlightOID,e),m.include(r.terrainDepthTest,e),e.draped?w.uniforms.add(new s.FloatBindUniform("worldToScreenRatio",e=>1/e.screenToPCSRatio)):b.add("boundingRect","mat3"),b.add("position","vec3"),b.add("uvMapSpace","vec4"),e.hasVVColor&&b.add("colorFeatureAttribute","float"),e.hasVertexColors||y.add("vColor","vec4"),y.add("vpos","vec3",{invariant:!0}),y.add("vuv","vec2"),w.uniforms.add(new d.Float4PassUniform("uColor",e=>e.color));const x=3===e.style||4===e.style||5===e.style;return x&&w.code.add(g.glsl`
      const mat2 rotate45 = mat2(${g.glsl.float(p)}, ${g.glsl.float(-f)},
                                 ${g.glsl.float(f)}, ${g.glsl.float(p)});
    `),e.draped||(c.addCameraPosition(w,e),w.uniforms.add(new s.FloatBindUniform("worldToScreenPerDistanceRatio",e=>1/e.camera.perScreenPixelRatio)),w.code.add(g.glsl`vec3 projectPointToLineSegment(vec3 center, vec3 halfVector, vec3 point) {
float projectedLength = dot(halfVector, point - center) / dot(halfVector, halfVector);
return center + halfVector * clamp(projectedLength, -1.0, 1.0);
}`),w.code.add(g.glsl`vec3 intersectRayPlane(vec3 rayDir, vec3 rayOrigin, vec3 planeNormal, vec3 planePoint) {
float d = dot(planeNormal, planePoint);
float t = (d - dot(planeNormal, rayOrigin)) / dot(planeNormal, rayDir);
return rayOrigin + t * rayDir;
}`),w.code.add(g.glsl`
      float boundingRectDistanceToCamera() {
        vec3 center = vec3(boundingRect[0][0], boundingRect[0][1], boundingRect[0][2]);
        vec3 halfU = vec3(boundingRect[1][0], boundingRect[1][1], boundingRect[1][2]);
        vec3 halfV = vec3(boundingRect[2][0], boundingRect[2][1], boundingRect[2][2]);
        vec3 n = normalize(cross(halfU, halfV));

        vec3 viewDir = - vec3(view[0][2], view[1][2], view[2][2]);

        float viewAngle = dot(viewDir, n);
        float minViewAngle = ${g.glsl.float(.08715574274)};

        if (abs(viewAngle) < minViewAngle) {
          // view direction is (almost) parallel to plane -> clamp it to min angle
          float normalComponent = sign(viewAngle) * minViewAngle - viewAngle;
          viewDir = normalize(viewDir + normalComponent * n);
        }

        // intersect view direction with infinite plane that contains bounding rect
        vec3 planeProjected = intersectRayPlane(viewDir, cameraPosition, n, center);

        // clip to bounds by projecting to u and v line segments individually
        vec3 uProjected = projectPointToLineSegment(center, halfU, planeProjected);
        vec3 vProjected = projectPointToLineSegment(center, halfV, planeProjected);

        // use to calculate the closest point to camera on bounding rect
        vec3 closestPoint = uProjected + vProjected - center;

        return length(closestPoint - cameraPosition);
      }
    `)),w.code.add(g.glsl`
    vec2 scaledUV() {
      vec2 uv = uvMapSpace.xy ${g.If(x," * rotate45")};
      vec2 uvCellOrigin = uvMapSpace.zw ${g.If(x," * rotate45")};

      ${g.If(!e.draped,g.glsl`float distanceToCamera = boundingRectDistanceToCamera();
               float worldToScreenRatio = worldToScreenPerDistanceRatio / distanceToCamera;`)}

      // Logarithmically discretize ratio to avoid jittering
      float step = 0.1;
      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);

      vec2 uvOffset = mod(uvCellOrigin * discreteWorldToScreenRatio, ${g.glsl.float(10)});
      return uvOffset + (uv * discreteWorldToScreenRatio);
    }
  `),w.main.add(g.glsl`
    vuv = scaledUV();
    vpos = position;
    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    forwardNormalizedVertexColor();
    forwardObjectAndLayerIdColor();
    ${e.hasVertexColors?"vColor *= uColor;":e.hasVVColor?"vColor = uColor * interpolateVVColor(colorFeatureAttribute);":"vColor = uColor;"}
    gl_Position = transformPosition(proj, view, vpos);
  `),h.include(n.ColorConversion),e.draped&&h.uniforms.add(new s.FloatBindUniform("texelSize",e=>1/e.camera.pixelRatio)),S||(h.code.add(g.glsl`
      const float lineWidth = ${g.glsl.float(1)};
      const float spacing = ${g.glsl.float(10)};
      const float spacingINV = ${g.glsl.float(.1)};

      float coverage(float p, float txlSize) {
        p = mod(p, spacing);

        float halfTxlSize = txlSize / 2.0;

        float start = p - halfTxlSize;
        float end = p + halfTxlSize;

        float coverage = (ceil(end * spacingINV) - floor(start * spacingINV)) * lineWidth;
        coverage -= min(lineWidth, mod(start, spacing));
        coverage -= max(lineWidth - mod(end, spacing), 0.0);

        return coverage / txlSize;
      }
    `),e.draped||h.code.add(g.glsl`const int maxSamples = 5;
float sampleAA(float p) {
vec2 dxdy = abs(vec2(dFdx(p), dFdy(p)));
float fwidth = dxdy.x + dxdy.y;
ivec2 samples = 1 + ivec2(clamp(dxdy, 0.0, float(maxSamples - 1)));
vec2 invSamples = 1.0 / vec2(samples);
float accumulator = 0.0;
for (int j = 0; j < maxSamples; j++) {
if(j >= samples.y) {
break;
}
for (int i = 0; i < maxSamples; i++) {
if(i >= samples.x) {
break;
}
vec2 step = vec2(i,j) * invSamples - 0.5;
accumulator += coverage(p + step.x * dxdy.x + step.y * dxdy.y, fwidth);
}
}
accumulator /= float(samples.x * samples.y);
return accumulator;
}`)),h.main.add(g.glsl`
    discardBySlice(vpos);
    discardByTerrainDepth();
    vec4 color = vColor;
    ${g.If(!S,g.glsl`color.a *= ${function(e){function o(o){return e.draped?g.glsl`coverage(vuv.${o}, texelSize)`:g.glsl`sampleAA(vuv.${o})`}switch(e.style){case 3:case 0:return o("y");case 4:case 1:return o("x");case 5:case 2:return g.glsl`1.0 - (1.0 - ${o("x")}) * (1.0 - ${o("y")})`;default:return"0.0"}}(e)};`)}
    outputColorHighlightOID(color, vpos, color.rgb);
  `),m}const w=Object.freeze(Object.defineProperty({__proto__:null,build:m},Symbol.toStringTag,{value:"Module"}));e.Pattern=w,e.build=m});