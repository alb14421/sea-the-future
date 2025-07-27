// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../core/libs/gl-matrix-2/factories/vec3f64","../views/3d/webgl-engine/core/shaderLibrary/raster/Colormap.glsl","../views/3d/webgl-engine/core/shaderLibrary/raster/Common.glsl","../views/3d/webgl-engine/core/shaderLibrary/terrain/TileBackground.glsl","../views/3d/webgl-engine/core/shaderLibrary/terrain/TileComposite.glsl","../views/3d/webgl-engine/core/shaderLibrary/util/ColorConversion.glsl","../views/3d/webgl-engine/core/shaderModules/BooleanPassUniform","../views/3d/webgl-engine/core/shaderModules/Float2PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/FloatsPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/IntegerPassUniform","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/webgl/ShaderBuilder"],function(e,a,l,o,i,r,t,n,u,s,c,m,f,d,g){"use strict";class x extends o.CommonPassParameters{constructor(e,l,o,i,r,t){super(e,i,r),this.colormap=l,this.symbolizer=o,this.u_colormap=t,this.backgroundColor=a.ZEROS,this.fboTexture=null,this.baseOpacity=1}}class v extends x{}class p extends x{}function _(e){const a=new g.ShaderBuilder;return a.include(r.TileComposite),a.include(o.Common,e),a.include(l.Colormap,e),a.include(i.TileBackground,e),a.fragment.code.add(m.glsl`vec4 applyBackgroundBlend(vec4 layerColor) {
return blendLayers(vuv, layerColor, u_opacity);
}`),0===e.colorizerType?function(e,a){e.fragment.uniforms.add(new f.IntegerPassUniform("u_bandCount",e=>e.symbolizer.u_bandCount),new c.FloatsPassUniform("u_minCutOff",e=>e.symbolizer.u_minCutOff,3),new c.FloatsPassUniform("u_maxCutOff",e=>e.symbolizer.u_maxCutOff,3),new c.FloatsPassUniform("u_factor",e=>e.symbolizer.u_factor,3),new s.FloatPassUniform("u_minOutput",e=>e.symbolizer.u_minOutput),new s.FloatPassUniform("u_maxOutput",e=>e.symbolizer.u_maxOutput),new n.BooleanPassUniform("u_useGamma",e=>e.symbolizer.u_useGamma),new c.FloatsPassUniform("u_gamma",e=>e.symbolizer.u_gamma,3),new c.FloatsPassUniform("u_gammaCorrection",e=>e.symbolizer.u_gammaCorrection,3),new s.FloatPassUniform("u_opacity",e=>e.common.u_opacity)),e.fragment.code.add(m.glsl`float stretchOneValue(float val, float minCutOff, float maxCutOff, float minOutput, float maxOutput, float factor, bool useGamma, float gamma, float gammaCorrection) {
if (val >= maxCutOff) {
return maxOutput;
} else if (val <= minCutOff) {
return minOutput;
}
float stretchedVal;
if (useGamma) {
float tempf = 1.0;
float outRange = maxOutput - minOutput;
float relativeVal = (val - minCutOff) / (maxCutOff - minCutOff);
if (gamma > 1.0) {
tempf -= pow(1.0 / outRange, relativeVal * gammaCorrection);
}
stretchedVal = (tempf * outRange * pow(relativeVal, 1.0 / gamma) + minOutput) / 255.0;
} else {
stretchedVal = minOutput + (val - minCutOff) * factor;
}
return stretchedVal;
}`);const l=a.applyColormap?m.glsl`fragColor = applyBackgroundBlend(colormap(vec4(grayVal, grayVal, grayVal, currentPixel.a), !u_useGamma));`:m.glsl`fragColor = applyBackgroundBlend(vec4(grayVal, grayVal, grayVal, currentPixel.a));`;e.fragment.main.add(m.glsl`
    vec2 pixelLocation = getPixelLocation(uv);
    if (isOutside(pixelLocation)) {
      fragColor = applyBackgroundBlend(vec4(0.0, 0.0, 0.0, 0.0));
      return;
    }

    vec4 currentPixel = getPixel(pixelLocation);
    ${0===a.stretchType?m.glsl`fragColor = applyBackgroundBlend(currentPixel);`:m.glsl`
    if (currentPixel.a == 0.0) {
      fragColor = applyBackgroundBlend(vec4(0.0, 0.0, 0.0, 0.0));
      return;
    }
    if (u_bandCount == 1) {
      float grayVal = stretchOneValue(currentPixel.r, u_minCutOff[0], u_maxCutOff[0], u_minOutput, u_maxOutput, u_factor[0], u_useGamma, u_gamma[0], u_gammaCorrection[0]);
      ${l}
    } else {
      float redVal = stretchOneValue(currentPixel.r, u_minCutOff[0], u_maxCutOff[0], u_minOutput, u_maxOutput, u_factor[0], u_useGamma, u_gamma[0], u_gammaCorrection[0]);
      float greenVal = stretchOneValue(currentPixel.g, u_minCutOff[1], u_maxCutOff[1], u_minOutput, u_maxOutput, u_factor[1], u_useGamma, u_gamma[1], u_gammaCorrection[1]);
      float blueVal = stretchOneValue(currentPixel.b, u_minCutOff[2], u_maxCutOff[2], u_minOutput, u_maxOutput, u_factor[2], u_useGamma, u_gamma[2], u_gammaCorrection[2]);
      fragColor = applyBackgroundBlend(vec4(redVal, greenVal, blueVal, currentPixel.a));
    }`}`)}(a,e):1===e.colorizerType?function(e){e.fragment.main.add(m.glsl`vec2 pixelLocation = getPixelLocation(uv);
if (isOutside(pixelLocation)) {
fragColor = applyBackgroundBlend(vec4(0.0, 0.0, 0.0, 0.0));
return;
}
vec4 currentPixel = getPixel(pixelLocation);
fragColor = applyBackgroundBlend(colormap(currentPixel, true));`)}(a):2===e.colorizerType&&function(e,a){const l=e.fragment;l.uniforms.add(new d.Texture2DPassUniform("u_image",e=>e.u_image),new f.IntegerPassUniform("u_hillshadeType",e=>e.symbolizer.u_hillshadeType),new c.FloatsPassUniform("u_sinZcosAs",e=>e.symbolizer.u_sinZcosAs,6),new c.FloatsPassUniform("u_sinZsinAs",e=>e.symbolizer.u_sinZsinAs,6),new c.FloatsPassUniform("u_cosZs",e=>e.symbolizer.u_cosZs,6),new c.FloatsPassUniform("u_weights",e=>e.symbolizer.u_weights,6),new u.Float2PassUniform("u_factor",e=>e.symbolizer.u_factor),new s.FloatPassUniform("u_minValue",e=>e.symbolizer.u_minValue),new s.FloatPassUniform("u_maxValue",e=>e.symbolizer.u_maxValue),new u.Float2PassUniform("u_srcImageSize",e=>e.common.u_srcImageSize)),l.include(t.ColorConversion),l.code.add(m.glsl`vec4 overlay(float val, float minValue, float maxValue, float hillshade, float alpha) {
val = clamp((val - minValue) / (maxValue - minValue), 0.0, 1.0);
vec4 color = colormap(vec4(val, val, val, 1.0), false);
vec3 hsv = rgb2hsv(color.rgb);
hsv.z = hillshade;
return vec4(hsv2rgb(hsv), 1.0) * alpha * color.a;
}`),l.code.add(m.glsl`float getNeighborHoodAlpha(float a, float b, float c, float d, float e, float f, float g, float h, float i){
if (a == 0.0 || a == 0.0 || a==0.0 || a == 0.0 || a == 0.0 || a==0.0 || a == 0.0 || a == 0.0 || a==0.0) {
return 0.0;
}  else {
return e;
}
}`);const o=a.applyColormap?m.glsl`fragColor = applyBackgroundBlend(overlay(ve.r, u_minValue, u_maxValue, hillshade, alpha));`:m.glsl`hillshade *= alpha;
fragColor = applyBackgroundBlend(vec4(hillshade, hillshade, hillshade, alpha));`;l.main.add(m.glsl`
      vec2 pixelLocation = getPixelLocation(uv);
      if (isOutside(pixelLocation)) {
        fragColor = applyBackgroundBlend(vec4(0.0, 0.0, 0.0, 0.0));
        return;
      }

      vec4 currentPixel = getPixel(pixelLocation);
      if (currentPixel.a == 0.0) {
        fragColor = applyBackgroundBlend(vec4(0.0, 0.0, 0.0, 0.0));
        return;
      }

      //mirror edge pixels
      vec2 axy = vec2(-1.0, -1.0);
      vec2 bxy = vec2(0.0, -1.0);
      vec2 cxy = vec2(1.0, -1.0);
      vec2 dxy = vec2(-1.0, 0.0);
      vec2 fxy = vec2(1.0, 0.0);
      vec2 gxy = vec2(-1.0, 1.0);
      vec2 hxy = vec2(0.0, 1.0);
      vec2 ixy = vec2(1.0, 1.0);
      vec2 onePixel = 1.0 / u_srcImageSize;
      if (pixelLocation.s < onePixel.s) {
        axy[0] = 1.0;
        dxy[0] = 1.0;
        gxy[0] = 1.0;
      }
      if (pixelLocation.t < onePixel.t) {
        axy[1] = 1.0;
        bxy[1] = 1.0;
        cxy[1] = 1.0;
      }
      if (pixelLocation.s > 1.0 - onePixel.s) {
        cxy[0] = -1.0;
        fxy[0] = -1.0;
        ixy[0] = -1.0;
      }
      if (pixelLocation.t > 1.0 - onePixel.t) {
        gxy[1] = -1.0;
        hxy[1] = -1.0;
        ixy[1] = -1.0;
      }

      // calculate hillshade
      vec4 va = texture(u_image, pixelLocation + onePixel * axy);
      vec4 vb = texture(u_image, pixelLocation + onePixel * bxy);
      vec4 vc = texture(u_image, pixelLocation + onePixel * cxy);
      vec4 vd = texture(u_image, pixelLocation + onePixel * dxy);
      vec4 ve = texture(u_image, pixelLocation);
      vec4 vf = texture(u_image, pixelLocation + onePixel * fxy);
      vec4 vg = texture(u_image, pixelLocation + onePixel * gxy);
      vec4 vh = texture(u_image, pixelLocation + onePixel * hxy);
      vec4 vi = texture(u_image, pixelLocation + onePixel * ixy);

      // calculate the rate of z change along the x, y, and diagonal direction
      float dzx = (vc + 2.0 * vf + vi - va - 2.0 * vd - vg).r * u_factor.s;
      float dzy = (vg + 2.0 * vh + vi - va - 2.0 * vb - vc).r * u_factor.t;
      float dzd = sqrt(1.0 + dzx * dzx + dzy * dzy);
      float hillshade = 0.0;

      // traditional single light source
      if (u_hillshadeType == 0){
        float cosDelta = u_sinZsinAs[0] * dzy - u_sinZcosAs[0] * dzx;
        float z = (u_cosZs[0] + cosDelta) / dzd;
        if (z < 0.0)  z = 0.0;
        hillshade = z;
      } else {
        // multi-directional with 6 light sources
        for (int k = 0; k < 6; k++) {
        float cosDelta = u_sinZsinAs[k] * dzy - u_sinZcosAs[k] * dzx;
        float z = (u_cosZs[k] + cosDelta) / dzd;
        if (z < 0.0) z = 0.0;
        hillshade = hillshade + z * u_weights[k];
        if (k == 5) break;
        }
      }

      // set color
      float alpha = getNeighborHoodAlpha(va.a, vb.a, vc.a, vd.a, ve.a, vf.a, vg.a, vh.a, vi.a);
      alpha *= u_opacity;
      ${o}`)}(a,e),a}const y=Object.freeze(Object.defineProperty({__proto__:null,ColorizerHillshadeUniforms:p,ColorizerStretchUniforms:v,ColorizerUniforms:x,build:_},Symbol.toStringTag,{value:"Module"}));e.ColorizerHillshadeUniforms=p,e.ColorizerStretchUniforms=v,e.ColorizerUniforms=x,e.RasterColorizer=y,e.build=_});