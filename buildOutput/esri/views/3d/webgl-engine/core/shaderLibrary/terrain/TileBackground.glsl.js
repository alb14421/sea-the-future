// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/has","../../../../../../core/libs/gl-matrix-2/factories/vec3f64","./BackgroundGrid.glsl","../util/BlendModes.glsl","../../shaderModules/Float3PassUniform","../../shaderModules/FloatPassUniform","../../shaderModules/glsl","../../shaderModules/Texture2DPassUniform","../../../../../webgl/NoParameters"],function(o,e,r,a,l,c,s,t,g,d){"use strict";class n extends d.NoParameters{constructor(){super(...arguments),this.baseOpacity=1,this.backgroundColor=r.ZEROS,this.fboTexture=null}}o.TileBackground=function(o,e){const{output:r,blendMode:d,baseOpacityMode:n,premultipliedSource:i}=e,u=o.fragment,b=1===n;b&&u.uniforms.add(new s.FloatPassUniform("baseOpacity",o=>o.baseOpacity));const y=0!==d,f=!(y||1===i||(1!==r||b)&&4!==r);u.include(l.BlendModes,e);let p="";switch(r){case 4:case 0:p=t.glsl`vec4(0.0)`;break;case 2:u.uniforms.add(new c.Float3PassUniform("backgroundColor",o=>o.backgroundColor)),p=t.glsl`vec4(backgroundColor, 1.0)`;break;case 3:u.include(a.BackgroundGrid),p=t.glsl`vec4(gridColor(uv), 1.0)`;break;case 1:u.uniforms.add(new g.Texture2DPassUniform("fboColor",o=>o.fboTexture)),p=t.glsl`texelFetch(fboColor, ivec2(gl_FragCoord.xy), 0)`}u.code.add(t.glsl`
    vec4 getBackground(vec2 uv) {
      return ${t.If(b,t.glsl`baseOpacity *`)} ${p};
    }

    vec4 blendLayers(vec2 bgUV, vec4 colorLayer, float opacity) {
      ${y?t.glsl`
          vec3 cl = colorLayer.a == 0.0 ? colorLayer.rgb : colorLayer.rgb / colorLayer.a;
          vec4 bgColor = getBackground(bgUV);
          vec3 cb = bgColor.a == 0.0 ? bgColor.rgb : bgColor.rgb / bgColor.a;
          return applyBlendMode(clamp(cl, vec3(0.0), vec3(1.0)), colorLayer.a * opacity, cb, bgColor.a);`:t.glsl`
          float composeAlpha = colorLayer.a * opacity;
          ${f?t.glsl`return colorLayer * opacity;`:t.glsl`
            vec4 bgColor = getBackground(bgUV);
            return bgColor * (1.0 - composeAlpha) + colorLayer * opacity;`}`}
    }`)},o.TileBackgroundPassParameters=n,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});