// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../core/libs/gl-matrix-2/math/vec2","../core/libs/gl-matrix-2/factories/vec2f64","../core/libs/gl-matrix-2/factories/vec4f64","../geometry/support/Ellipsoid","../views/3d/webgl-engine/core/shaderLibrary/Slice.glsl","../views/3d/webgl-engine/core/shaderLibrary/attributes/ObjectAndLayerIdColor.glsl","../views/3d/webgl-engine/core/shaderLibrary/hud/AlignPixel.glsl","../views/3d/webgl-engine/core/shaderLibrary/hud/HUD.glsl","../views/3d/webgl-engine/core/shaderLibrary/hud/HUDOcclusionPass.glsl","../views/3d/webgl-engine/core/shaderLibrary/hud/HUDVisibility.glsl","../views/3d/webgl-engine/core/shaderLibrary/output/OutputHighlight.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/VisualVariables.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/RgbaFloatEncoding.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/ScreenSizePerspective.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/View.glsl","../views/3d/webgl-engine/core/shaderModules/Float2PassUniform","../views/3d/webgl-engine/core/shaderModules/Float4BindUniform","../views/3d/webgl-engine/core/shaderModules/Float4DrawUniform","../views/3d/webgl-engine/core/shaderModules/Float4PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatBindUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DBindUniform","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/webgl/ShaderBuilder","../webscene/support/AlphaCutoff"],function(e,o,l,i,r,a,t,s,n,c,d,u,f,g,p,v,b,h,m,x,w,C,P,S,z,y,A,F){"use strict";function O(e){const l=new A.ShaderBuilder,{signedDistanceFieldEnabled:O,occlusionTestEnabled:j,horizonCullingEnabled:B,pixelSnappingEnabled:T,hasScreenSizePerspective:V,debugDrawLabelBorder:M,hasVVSize:L,hasVVColor:H,hasRotation:E,occludedFragmentFade:R,sampleSignedDistanceFieldTexelCenter:_}=e;l.include(n.HUD,e),l.vertex.include(a.RejectBySlice,e);const{occlusionPass:q,output:k,oitPass:G}=e;if(q)return l.include(c.HUDOcclusionPass,e),l;const{vertex:Z,fragment:J}=l;l.include(v.ScreenSizePerspective),l.include(f.VisualVariables,e),l.include(t.ObjectAndLayerIdColor,e),j&&l.include(d.HUDVisibility),J.include(p.RgbaFloatEncoding),J.include(g.ColorConversion),l.varyings.add("vcolor","vec4"),l.varyings.add("vtc","vec2"),l.varyings.add("vsize","vec2");const K=8===k,N=K&&j;N&&l.varyings.add("voccluded","float"),Z.uniforms.add(new m.Float4BindUniform("viewport",e=>e.camera.fullViewport),new h.Float2PassUniform("screenOffset",(e,l)=>o.set(U,2*e.screenOffset[0]*l.camera.pixelRatio,2*e.screenOffset[1]*l.camera.pixelRatio)),new h.Float2PassUniform("anchorPosition",e=>D(e)),new w.Float4PassUniform("materialColor",e=>e.color),new P.FloatPassUniform("materialRotation",e=>e.rotation),new y.Texture2DPassUniform("tex",e=>e.texture)),b.addPixelRatio(Z),O&&(Z.uniforms.add(new w.Float4PassUniform("outlineColor",e=>e.outlineColor)),J.uniforms.add(new w.Float4PassUniform("outlineColor",e=>$(e)?e.outlineColor:i.ZEROS),new P.FloatPassUniform("outlineSize",e=>$(e)?e.outlineSize:0))),B&&Z.uniforms.add(new x.Float4DrawUniform("pointDistanceSphere",(e,o)=>{const l=o.camera.eye,a=e.origin;return i.fromValues(a[0]-l[0],a[1]-l[1],a[2]-l[2],r.earth.radius)})),T&&Z.include(s.AlignPixel),V&&(v.addScreenSizePerspective(Z),v.addScreenSizePerspectiveAlignment(Z)),M&&l.varyings.add("debugBorderCoords","vec4"),l.attributes.add("uvi","vec2"),l.attributes.add("color","vec4"),l.attributes.add("size","vec2"),l.attributes.add("rotation","float"),(L||H)&&l.attributes.add("featureAttribute","vec4"),Z.code.add(B?S.glsl`bool behindHorizon(vec3 posModel) {
vec3 camToEarthCenter = pointDistanceSphere.xyz - localOrigin;
vec3 camToPos = pointDistanceSphere.xyz + posModel;
float earthRadius = pointDistanceSphere.w;
float a = dot(camToPos, camToPos);
float b = dot(camToPos, camToEarthCenter);
float c = dot(camToEarthCenter, camToEarthCenter) - earthRadius * earthRadius;
return b > 0.0 && b < a && b * b  > a * c;
}`:S.glsl`bool behindHorizon(vec3 posModel) { return false; }`),Z.main.add(S.glsl`
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
    ${S.If(V,S.glsl`
        inputSize = screenSizePerspectiveScaleVec2(size, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspective);
        vec2 screenOffsetScaled = screenSizePerspectiveScaleVec2(screenOffset, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);`,S.glsl`
        inputSize = size;
        vec2 screenOffsetScaled = screenOffset;`)}
    ${S.If(L,S.glsl`inputSize *= vvScale(featureAttribute).xx;`)}

    vec2 combinedSize = inputSize * pixelRatio;
    vec4 quadOffset = vec4(0.0);

    ${S.If(j,S.glsl`
    bool visible = testHUDVisibility(posProj);
    if (!visible) {
      vtc = vec2(0.0);
      ${S.If(M,"debugBorderCoords = vec4(0.5, 0.5, 1.5 / combinedSize);")}
      return;
    }`)}
    ${S.If(N,S.glsl`voccluded = visible ? 0.0 : 1.0;`)}
  `);const Q=S.glsl`
      vec2 uvi1 = vec2(uvi.x < 0.0 ? 1.0 : 0.0, uvi.y < 0.0 ? 1.0 : 0.0);
      vec2 uv = abs(uvi + uvi1);
      vec2 texSize = vec2(textureSize(tex, 0));
      uv.x = uv.x >= ${I} ? 1.0 : uv.x / texSize.x;
      uv.y = uv.y >= ${I} ? 1.0 : uv.y / texSize.y;
      quadOffset.xy = (uvi1 - anchorPosition) * 2.0 * combinedSize;

      ${S.If(E,S.glsl`
          float angle = radians(materialRotation + rotation);
          float cosAngle = cos(angle);
          float sinAngle = sin(angle);
          mat2 rotate = mat2(cosAngle, -sinAngle, sinAngle,  cosAngle);

          quadOffset.xy = rotate * quadOffset.xy;
        `)}

      quadOffset.xy = (quadOffset.xy + screenOffsetScaled) / viewport.zw * posProj.w;
  `,W=T?O?S.glsl`posProj = alignToPixelOrigin(posProj, viewport.zw) + quadOffset;`:S.glsl`posProj += quadOffset;
if (inputSize.x == size.x) {
posProj = alignToPixelOrigin(posProj, viewport.zw);
}`:S.glsl`posProj += quadOffset;`;Z.main.add(S.glsl`
    ${Q}
    ${H?"vcolor = interpolateVVColor(featureAttribute.y) * materialColor;":"vcolor = color / 255.0 * materialColor;"}

    ${S.If(9===k,S.glsl`vcolor.a = 1.0;`)}

    bool alphaDiscard = vcolor.a < ${S.glsl.float(F.alphaCutoff)};
    ${S.If(O,`alphaDiscard = alphaDiscard && outlineColor.a < ${S.glsl.float(F.alphaCutoff)};`)}
    if (alphaDiscard) {
      // "early discard" if both symbol color (= fill) and outline color (if applicable) are transparent
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    } else {
      ${W}
      gl_Position = posProj;
    }

    vtc = uv;

    ${S.If(M,S.glsl`debugBorderCoords = vec4(uv01, 1.5 / combinedSize);`)}
    vsize = inputSize;
  `),J.uniforms.add(new y.Texture2DPassUniform("tex",e=>e.texture)),R&&!K&&J.uniforms.add(new z.Texture2DBindUniform("depthMap",e=>e.mainDepth),new C.FloatBindUniform("occludedOpacity",e=>e.hudOccludedFragmentOpacity));const X=M?S.glsl`(isBorder > 0.0 ? 0.0 : ${S.glsl.float(F.alphaCutoff)})`:S.glsl.float(F.alphaCutoff),Y=S.glsl`
    ${S.If(M,S.glsl`float isBorder = float(any(lessThan(debugBorderCoords.xy, debugBorderCoords.zw)) || any(greaterThan(debugBorderCoords.xy, 1.0 - debugBorderCoords.zw)));`)}

    vec2 samplePos = vtc;

    ${S.If(_,S.glsl`
      float txSize = float(textureSize(tex, 0).x);
      float texelSize = 1.0 / txSize;

      // Calculate how much we have to add/subtract to/from each texel to reach the size of an onscreen pixel
      vec2 scaleFactor = (vsize - txSize) * texelSize;
      samplePos += (vec2(1.0, -1.0) * texelSize) * scaleFactor;`)}

    ${O?S.glsl`
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
          outlineAlphaFactor + fillAlphaFactor < ${X} ||
          fillPixelColor.a + outlinePixelColor.a < ${S.glsl.float(F.alphaCutoff)}
        ) {
          discard;
        }

        // perform un-premultiplied over operator (see https://en.wikipedia.org/wiki/Alpha_compositing#Description)
        float compositeAlpha = outlinePixelColor.a + fillPixelColor.a * (1.0 - outlinePixelColor.a);
        vec3 compositeColor = vec3(outlinePixelColor) * outlinePixelColor.a +
          vec3(fillPixelColor) * fillPixelColor.a * (1.0 - outlinePixelColor.a);

        ${S.If(!K,S.glsl`fragColor = vec4(compositeColor, compositeAlpha);`)}
      } else {
        if (fillAlphaFactor < ${X}) {
          discard;
        }

        ${S.If(!K,S.glsl`fragColor = premultiplyAlpha(fillPixelColor);`)}
      }

      // visualize SDF:
      // fragColor = vec4(clamp(-dist/vsize.x*2.0, 0.0, 1.0), clamp(dist/vsize.x*2.0, 0.0, 1.0), 0.0, 1.0);
      `:S.glsl`
          vec4 texColor = texture(tex, samplePos, -0.5);
          if (texColor.a < ${X}) {
            discard;
          }
          ${S.If(!K,S.glsl`fragColor = texColor * premultiplyAlpha(vcolor);`)}
          `}

    ${S.If(R&&!K,S.glsl`
        float zSample = texelFetch(depthMap, ivec2(gl_FragCoord.xy), 0).x;
        if (zSample < gl_FragCoord.z) {
          fragColor *= occludedOpacity;
        }
        `)}

    ${S.If(!K&&M,S.glsl`fragColor = mix(fragColor, vec4(1.0, 0.0, 1.0, 1.0), isBorder * 0.5);`)}
  `;switch(k){case 0:case 1:l.outputs.add("fragColor","vec4",0),1===k&&l.outputs.add("fragEmission","vec4",1),1===G&&l.outputs.add("fragAlpha","float",1===k?2:1),J.main.add(S.glsl`
        ${Y}
        ${S.If(2===G,S.glsl`fragColor.rgb /= fragColor.a;`)}
        ${S.If(1===k,S.glsl`fragEmission = vec4(0.0);`)}
        ${S.If(1===G,S.glsl`fragAlpha = fragColor.a;`)}`);break;case 9:J.main.add(S.glsl`
        ${Y}
        outputObjectAndLayerIdColor();`);break;case 8:l.include(u.OutputHighlight,e),J.main.add(S.glsl`
        ${Y}
        outputHighlight(${S.If(N,S.glsl`voccluded == 1.0`,S.glsl`false`)});`)}return l}function $(e){return e.outlineColor[3]>0&&e.outlineSize>0}function D(e){var l,i,r;return e.textureIsSignedDistanceField?(l=e.anchorPosition,i=e.distanceFieldBoundingBox,r=U,o.set(r,l[0]*(i[2]-i[0])+i[0],l[1]*(i[3]-i[1])+i[1])):o.copy(U,e.anchorPosition),U}const U=l.create(),j=32e3,I=S.glsl.float(j),B=Object.freeze(Object.defineProperty({__proto__:null,build:O,calculateAnchorPosition:D,fullUV:j},Symbol.toStringTag,{value:"Module"}));e.HUDMaterial=B,e.build=O,e.calculateAnchorPosition=D,e.fullUV=j});