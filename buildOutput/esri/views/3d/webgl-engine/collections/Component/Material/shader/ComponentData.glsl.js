// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../../core/compilerUtils","../../../../../../../core/floatRGBA","./DecodeSymbolColor.glsl","../../../../core/shaderLibrary/util/RgbaFloatEncoding.glsl","../../../../core/shaderModules/Float4DrawUniform","../../../../core/shaderModules/FloatDrawUniform","../../../../core/shaderModules/glsl","../../../../core/shaderModules/IntegerDrawUniform","../../../../core/shaderModules/Texture2DDrawUniform","../../../../effects/geometry/olidUtils"],function(o,e,t,r,n,a,d,l,i,c,s){"use strict";const x=429496.7296,m=1e6;function C(){return 3+(s.olidEnabled()?1:0)}o.ComponentData=function(o,t){switch(t.componentData){case 1:return function(o,e){const{vertex:t,fragment:a}=o;t.include(n.RgbaFloatEncoding),t.uniforms.add(new c.Texture2DDrawUniform("componentColorTex",o=>o.componentParameters.texture.texture)),o.attributes.add("componentIndex","float"),o.varyings.add("vExternalColorMixMode","mediump float"),o.varyings.add("vExternalColor","vec4");const{output:d}=e,i=9===d;i&&o.varyings.add("vObjectAndLayerIdColor","vec4");const s=1===d;s&&(o.varyings.add("emissiveStrength","float"),o.varyings.add("emissiveSource","int",{flat:!0})),o.include(r.DecodeSymbolColor),t.constants.add("stride","float",C()),t.code.add(l.glsl`vec2 getComponentTextureCoordinates(float componentIndex, float typeOffset) {
float index = componentIndex * stride + typeOffset;
float texSize = float(textureSize(componentColorTex, 0).x);
float coordX = mod(index, texSize);
float coordY = floor(index / texSize);
return vec2(coordX, coordY) + 0.5;
}`),t.code.add(l.glsl`
  vec4 _readComponentColor() {
    vec2 textureCoordinates = getComponentTextureCoordinates(componentIndex, 0.0);
    return texelFetch(componentColorTex, ivec2(textureCoordinates), 0);
   }

  float readElevationOffset() {
    vec2 textureCoordinates = getComponentTextureCoordinates(componentIndex, 1.0);
    vec4 encodedElevation = texelFetch(componentColorTex, ivec2(textureCoordinates), 0);
    return uninterpolatedRGBAToFloat(encodedElevation) * ${l.glsl.float(x)};
  }

  void forwardEmissiveStrength() {
    ${l.If(s,l.glsl`vec2 textureCoordinates = getComponentTextureCoordinates(componentIndex, 2.0);
           vec4 encodedEmissive = texelFetch(componentColorTex, ivec2(textureCoordinates), 0);
           emissiveStrength = uninterpolatedRGBToFloat(encodedEmissive.rgb) * ${l.glsl.float(m)};
           emissiveSource = encodedEmissive.a == 0.0 ? 0 : 1;`)}
  }

  void forwardObjectAndLayerIdColor() {
    ${l.If(i,l.glsl`vec2 textureCoordinates = getComponentTextureCoordinates(componentIndex, 3.0);
           vObjectAndLayerIdColor = texelFetch(componentColorTex, ivec2(textureCoordinates), 0);`)}
  }

  vec4 forwardExternalColor(out bool castShadows) {
    vec4 componentColor = _readComponentColor() * 255.0;

    float shadowFlag = mod(componentColor.b * 255.0, 2.0);
    componentColor.b -= shadowFlag;
    castShadows = shadowFlag >= 1.0;

    int decodedColorMixMode;
    vExternalColor = decodeSymbolColor(componentColor, decodedColorMixMode) * 0.003921568627451; // = 1/255;
    vExternalColorMixMode = float(decodedColorMixMode) + 0.5; // add 0.5 to avoid interpolation artifacts

    return vExternalColor;
  }
`),a.code.add(l.glsl`
  void readExternalColor(out vec4 externalColor, out int externalColorMixMode) {
    externalColor = vExternalColor;
    externalColorMixMode = int(vExternalColorMixMode);
  }

  void outputObjectAndLayerIdColor() {
     ${i?l.glsl`fragColor = vObjectAndLayerIdColor;`:""}
  }
`)}(o,t);case 0:return function(o,e){const{vertex:t,fragment:r}=o;o.varyings.add("vExternalColor","vec4"),r.uniforms.add(new d.FloatDrawUniform("emissiveStrength",o=>o.componentParameters.emissiveStrength)),t.uniforms.add(new a.Float4DrawUniform("externalColor",o=>o.componentParameters.externalColor)).code.add(l.glsl`float readElevationOffset() {
return 0.0;
}
void forwardObjectAndLayerIdColor() {}
void forwardEmissiveStrength() {}
vec4 forwardExternalColor(out bool castShadows) {
vExternalColor = externalColor;
castShadows = true;
return externalColor;
}`);const n=9===e.output;r.uniforms.add(new i.IntegerDrawUniform("externalColorMixMode",o=>o.componentParameters.externalColorMixMode)).code.add(l.glsl`
    void readExternalColor(out vec4 color, out int colorMixMode) {
      color = vExternalColor;
      colorMixMode = externalColorMixMode;
    }

    void outputObjectAndLayerIdColor() {
      ${l.If(n,"fragColor = vec4(0, 0, 0, 0);")}
    }
  `)}(o,t);case 2:return;default:e.neverReached(t.componentData)}},o.encodeElevationOffset=function(o,e){t.packFloatRGBA(o/x*.5+.5,e)},o.encodeEmissiveStrength=function(o,e){t.packFloatRGB(o/m*.5+.5,e)},o.getComponentFieldCount=C,o.maxElevationOffset=x,o.maxPackedRGBEmission=m,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});