// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../views/3d/webgl-engine/core/shaderLibrary/ScreenSpacePass.glsl","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/webgl/ShaderBuilder"],function(e,o,r,t,s){"use strict";function c(){const e=new s.ShaderBuilder;return e.include(o.ScreenSpacePass),e.fragment.uniforms.add(new t.Texture2DPassUniform("edgesTexture",e=>e.inputTexture),new t.Texture2DPassUniform("areaTexture",e=>e.areaTexture),new t.Texture2DPassUniform("searchTexture",e=>e.searchTexture)),e.fragment.constants.add("smaaAreaTexPixelSize","vec2",[1/160,1/560]),e.fragment.code.add(r.glsl`
    vec4 sampleLevelZeroOffset(vec2 coord, vec2 offset, vec2 resolution) {
      return texture(edgesTexture, coord + offset.x * resolution);
    }

    float searchLength(vec2 e, float bias, float scale) {
      e.r = bias + e.r * scale;
      return 255.0 * texture(searchTexture, e).r;
    }

    float searchLeft(vec2 texcoord, float end, vec2 resolution) {
      vec2 e = vec2(0.0, 1.0);
      for (int i = 0; i < ${r.glsl.int(8)}; ++i) {
        e = texture(edgesTexture, texcoord).rg;
        texcoord -= vec2(2.0, 0.0) * resolution;
        if (! (texcoord.x > end && e.g > 0.8281 && e.r == 0.0)) break;
      }
      texcoord.x += 0.25 * resolution.x;
      texcoord.x += resolution.x;
      texcoord.x += 2.0 * resolution.x;
      texcoord.x -= resolution.x * searchLength(e, 0.0, 0.5);
      return texcoord.x;
    }

    float searchRight(vec2 texcoord, float end, vec2 resolution) {
      vec2 e = vec2(0.0, 1.0);
      for (int i = 0; i < ${r.glsl.int(8)}; ++i) {
        e = texture(edgesTexture, texcoord).rg;
        texcoord += vec2(2.0, 0.0) * resolution;
        if (! (texcoord.x < end && e.g > 0.8281 && e.r == 0.0)) break;
      }
      texcoord.x -= 0.25 * resolution.x;
      texcoord.x -= resolution.x;
      texcoord.x -= 2.0 * resolution.x;
      texcoord.x += resolution.x * searchLength(e, 0.5, 0.5);
      return texcoord.x;
    }

    float searchUp(vec2 texcoord, float end, vec2 resolution) {
      vec2 e = vec2(1.0, 0.0);
      for (int i = 0; i < ${r.glsl.int(8)}; ++i) {
        e = texture(edgesTexture, texcoord).rg;
        texcoord += vec2(0.0, 2.0) * resolution;
        if (! (texcoord.y > end && e.r > 0.8281 && e.g == 0.0)) break;
      }
      texcoord.y -= 0.25 * resolution.y;
      texcoord.y -= resolution.y;
      texcoord.y -= 2.0 * resolution.y;
      texcoord.y += resolution.y * searchLength(e.gr, 0.0, 0.5);
      return texcoord.y;
    }

    float searchDown(vec2 texcoord, float end, vec2 resolution) {
      vec2 e = vec2(1.0, 0.0);
      for (int i = 0; i < ${r.glsl.int(8)}; ++i) {
        e = texture(edgesTexture, texcoord).rg;
        texcoord -= vec2(0.0, 2.0) * resolution;
        if (! (texcoord.y < end && e.r > 0.8281 && e.g == 0.0)) break;
      }
      texcoord.y += 0.25 * resolution.y;
      texcoord.y += resolution.y;
      texcoord.y += 2.0 * resolution.y;
      texcoord.y -= resolution.y * searchLength(e.gr, 0.5, 0.5);
      return texcoord.y;
    }

    vec2 getArea(sampler2D areaTex, vec2 dist, float e1, float e2, float offset) {
      vec2 texcoord = float(${r.glsl.int(16)}) * round(4.0 * vec2(e1, e2)) + dist;
      texcoord = smaaAreaTexPixelSize * texcoord + (0.5 * smaaAreaTexPixelSize);
      texcoord.y += ${r.glsl.float(1/7)} * offset;
      return texture(areaTex, texcoord).rg;
    }`),e.fragment.main.add(r.glsl`
    vec2 size = vec2(textureSize(edgesTexture, 0));
    vec2 resolution = 1.0 / size;
    vec2 pixelCoord = uv * size;
    vec4 offsets[2];
    offsets[0] = uv.xyxy + resolution.xyxy * vec4(-0.25, 0.125, 1.25, 0.125);
    offsets[1] = uv.xyxy + resolution.xyxy * vec4(-0.125, 0.25, -0.125, -1.25);
    vec4 maxOffset = vec4(offsets[0].xz, offsets[1].yw) + vec4(-2.0, 2.0, -2.0, 2.0) * resolution.xxyy * float(${r.glsl.int(8)});
    ivec4 subsampleIndices = ivec4(0.0);
    vec4 weights = vec4(0.0);
    vec2 e = texture(edgesTexture, uv).rg;
    if (e.r > 0.0) {
      vec2 d;
      vec2 coords;
      coords.y = searchUp(offsets[1].xy, maxOffset.z, resolution);
      coords.x = offsets[0].x;
      d.x = coords.y;
      float e1 = texture(edgesTexture, coords).g;
      coords.y = searchDown(offsets[1].zw, maxOffset.w, resolution);
      d.y = coords.y;
      d = d * size.y - pixelCoord.y;
      vec2 sqrt_d = sqrt(abs(d));
      coords.y -= 1.0 * resolution.y;
      float e2 = sampleLevelZeroOffset(coords, vec2(0.0, 1.0), resolution).g;
      weights.ba = getArea(areaTexture, sqrt_d, e1, e2, float(subsampleIndices.x));
      // for some reason the following lines are necessary to prevent
      // texture lookup precision issues on some Intel integrated graphics chips
      vec4 dbg = (offsets[0] + offsets[1] + maxOffset + coords.xyyx);
      weights.r += 0.00000001 * dot(vec4(0, 1, 0, 1), dbg);
    }
    if (e.g > 0.0) {
      vec2 d;
      vec2 coords;
      coords.x = searchLeft(offsets[0].xy, maxOffset.x, resolution);
      coords.y = offsets[1].y;
      d.x = coords.x;
      float e1 = texture(edgesTexture, coords).r;
      coords.x = searchRight(offsets[0].zw, maxOffset.y, resolution);
      d.y = coords.x;
      d = d * size.x - pixelCoord.x;
      vec2 sqrt_d = sqrt(abs(d));
      coords.y -= 1.0 * resolution.y;
      float e2 = sampleLevelZeroOffset(coords, vec2(1.0, 0.0), resolution).r;
      weights.rg = getArea(areaTexture, sqrt_d, e1, e2, float(subsampleIndices.y));
    }
    fragColor = weights;
  `),e}const x=Object.freeze(Object.defineProperty({__proto__:null,build:c},Symbol.toStringTag,{value:"Module"}));e.BlendWeights=x,e.build=c});