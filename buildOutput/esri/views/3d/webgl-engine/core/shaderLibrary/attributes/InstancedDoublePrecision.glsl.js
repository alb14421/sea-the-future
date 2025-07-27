// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/libs/gl-matrix-2/math/mat3","../../../../../../core/libs/gl-matrix-2/factories/mat3f64","../../../../../../core/libs/gl-matrix-2/factories/mat4f64","../../../../../../chunks/vec32","../../../../../../core/libs/gl-matrix-2/factories/vec3f64","../util/DoublePrecision.glsl","../util/View.glsl","../../shaderModules/Float3BindUniform","../../shaderModules/glsl","../../shaderModules/Matrix3PassUniform","../../shaderModules/Matrix4PassUniform","../../../../../webgl/doublePrecisionUtils","../../../../../webgl/NoParameters"],function(e,o,r,n,a,i,t,l,s,c,d,m,g,u){"use strict";class v extends u.NoParameters{constructor(){super(...arguments),this.modelTransformation=null}}const x=r.create(),M=i.create();e.InstancedDoublePassParameters=v,e.InstancedDoublePrecision=function(e,r){const{hasModelTransformation:i,instancedDoublePrecision:u,instanced:v,output:f,hasVertexTangents:w}=r;i&&(e.vertex.uniforms.add(new m.Matrix4PassUniform("model",e=>e.modelTransformation??n.IDENTITY)),e.vertex.uniforms.add(new d.Matrix3PassUniform("normalLocalOriginFromModel",e=>(o.normalFromMat4(x,e.modelTransformation??n.IDENTITY),x)))),v&&u&&(e.attributes.add("instanceModelOriginHi","vec3"),e.attributes.add("instanceModelOriginLo","vec3"),e.attributes.add("instanceModel","mat3"),e.attributes.add("instanceModelNormal","mat3"));const b=e.vertex;u&&(b.include(t.DoublePrecision,r),b.uniforms.add(new s.Float3BindUniform("viewOriginHi",e=>g.encodeDoubleHi(a.set(M,e.camera.viewInverseTransposeMatrix[3],e.camera.viewInverseTransposeMatrix[7],e.camera.viewInverseTransposeMatrix[11]),M)),new s.Float3BindUniform("viewOriginLo",e=>g.encodeDoubleLo(a.set(M,e.camera.viewInverseTransposeMatrix[3],e.camera.viewInverseTransposeMatrix[7],e.camera.viewInverseTransposeMatrix[11]),M)))),b.code.add(c.glsl`
    vec3 getVertexInLocalOriginSpace() {
      return ${i?u?"(model * vec4(instanceModel * localPosition().xyz, 1.0)).xyz":"(model * localPosition()).xyz":u?"instanceModel * localPosition().xyz":"localPosition().xyz"};
    }

    vec3 subtractOrigin(vec3 _pos) {
      ${u?c.glsl`
          // Issue: (should be resolved now with invariant position) https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/56280
          vec3 originDelta = dpAdd(viewOriginHi, viewOriginLo, -instanceModelOriginHi, -instanceModelOriginLo);
          return _pos - originDelta;`:"return vpos;"}
    }
    `),b.code.add(c.glsl`
    vec3 dpNormal(vec4 _normal) {
      return normalize(${i?u?"normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz)":"normalLocalOriginFromModel * _normal.xyz":u?"instanceModelNormal * _normal.xyz":"_normal.xyz"});
    }
    `),3===f&&(l.addViewNormal(b),b.code.add(c.glsl`
    vec3 dpNormalView(vec4 _normal) {
      return normalize((viewNormal * ${i?u?"vec4(normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz), 1.0)":"vec4(normalLocalOriginFromModel * _normal.xyz, 1.0)":u?"vec4(instanceModelNormal * _normal.xyz, 1.0)":"_normal"}).xyz);
    }
    `)),w&&b.code.add(c.glsl`
    vec4 dpTransformVertexTangent(vec4 _tangent) {
      ${i?u?"return vec4(normalLocalOriginFromModel * (instanceModelNormal * _tangent.xyz), _tangent.w);":"return vec4(normalLocalOriginFromModel * _tangent.xyz, _tangent.w);":u?"return vec4(instanceModelNormal * _tangent.xyz, _tangent.w);":"return _tangent;"}
    }`)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});