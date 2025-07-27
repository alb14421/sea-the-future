// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../attributes/VertexTextureCoordinates.glsl","../../shaderModules/Float3DrawUniform","../../shaderModules/Float3PassUniform","../../shaderModules/glsl","../../shaderModules/Texture2DDrawUniform","../../shaderModules/Texture2DPassUniform","../../../materials/pbrUtils","../../../../../webgl/NoParameters"],function(e,r,s,o,t,l,a,c,u){"use strict";class n extends u.NoParameters{constructor(e,r){super(),this.textureOcclusion=e,this.textureMetallicRoughness=r,this.mrrFactors=c.schematicMRRFactors}}e.PBRRenderingParameters=n,e.PhysicallyBasedRenderingParameters=function(e,c){const u=c.pbrMode,n=e.fragment;if(2!==u&&0!==u&&1!==u)return void n.code.add(t.glsl`void applyPBRFactors() {}`);if(0===u)return void n.code.add(t.glsl`void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`);if(2===u)return void n.code.add(t.glsl`vec3 mrr = vec3(0.0, 0.6, 0.2);
float occlusion = 1.0;
void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`);const{hasMetallicRoughnessTexture:i,hasMetallicRoughnessTextureTransform:d,hasOcclusionTexture:m,hasOcclusionTextureTransform:g,bindType:f}=c;(i||m)&&e.include(r.VertexTextureCoordinates,c),n.code.add(t.glsl`vec3 mrr;
float occlusion;`),i&&n.uniforms.add(1===f?new a.Texture2DPassUniform("texMetallicRoughness",e=>e.textureMetallicRoughness):new l.Texture2DDrawUniform("texMetallicRoughness",e=>e.textureMetallicRoughness)),m&&n.uniforms.add(1===f?new a.Texture2DPassUniform("texOcclusion",e=>e.textureOcclusion):new l.Texture2DDrawUniform("texOcclusion",e=>e.textureOcclusion)),n.uniforms.add(1===f?new o.Float3PassUniform("mrrFactors",e=>e.mrrFactors):new s.Float3DrawUniform("mrrFactors",e=>e.mrrFactors)),n.code.add(t.glsl`
    ${t.If(i,t.glsl`void applyMetallicRoughness(vec2 uv) {
            vec3 metallicRoughness = textureLookup(texMetallicRoughness, uv).rgb;
            mrr[0] *= metallicRoughness.b;
            mrr[1] *= metallicRoughness.g;
          }`)}

    ${t.If(m,"void applyOcclusion(vec2 uv) { occlusion *= textureLookup(texOcclusion, uv).r; }")}

    float getBakedOcclusion() {
      return ${m?"occlusion":"1.0"};
    }

    void applyPBRFactors() {
      mrr = mrrFactors;
      occlusion = 1.0;

      ${t.If(i,`applyMetallicRoughness(${d?"metallicRoughnessUV":"vuv0"});`)}
      ${t.If(m,`applyOcclusion(${g?"occlusionUV":"vuv0"});`)}
    }
  `)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});