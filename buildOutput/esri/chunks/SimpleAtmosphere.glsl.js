// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../core/libs/gl-matrix-2/factories/vec2f64","../core/libs/gl-matrix-2/factories/vec3f64","../views/3d/webgl-engine/core/shaderLibrary/Transform.glsl","../views/3d/webgl-engine/core/shaderLibrary/shading/MainLighting.glsl","../views/3d/webgl-engine/core/shaderModules/Float2PassUniform","../views/3d/webgl-engine/core/shaderModules/Float3BindUniform","../views/3d/webgl-engine/core/shaderModules/Float3PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Matrix4BindUniform","../views/3d/webgl-engine/core/shaderModules/Texture2DPassUniform","../views/webgl/NoParameters","../views/webgl/ShaderBuilder"],function(e,o,i,r,t,s,a,n,l,d,c,m,g,f){"use strict";class u extends g.NoParameters{constructor(){super(...arguments),this.texV=o.create(),this.altitudeFade=0,this.innerScale=0,this.undergroundFadeAlpha=0,this.silhouette=new h}}class h{constructor(){this.center=i.create(),this.v1=i.create(),this.v2=i.create()}}function p(e){const o=new f.ShaderBuilder,{vertex:i,fragment:g}=o;if(t.addMainLightDirection(i),2===e.geometry)o.attributes.add("position","vec2"),o.varyings.add("color","vec4"),i.uniforms.add(new a.Float3BindUniform("cameraPosition",e=>e.camera.eye),new l.FloatPassUniform("undergroundFadeAlpha",e=>e.undergroundFadeAlpha)),i.main.add(d.glsl`float ndotl = dot(normalize(cameraPosition), mainLightDirection);
float lighting = max(0.0, smoothstep(-1.0, 0.8, 2.0 * ndotl));
color = vec4(vec3(lighting), undergroundFadeAlpha);
gl_Position = vec4(position.xy, 1.0, 1.0);`),g.main.add(d.glsl`fragColor = color;`);else{o.include(r.Transform,e),o.attributes.add("position","vec3"),o.varyings.add("vtc","vec2"),o.varyings.add("falloff","float");const t=1===e.geometry;i.uniforms.add(new c.Matrix4BindUniform("proj",e=>e.camera.projectionMatrix),new c.Matrix4BindUniform("view",e=>e.camera.viewMatrix)),t||(o.varyings.add("innerFactor","float"),i.uniforms.add(new n.Float3PassUniform("silCircleCenter",e=>e.silhouette.center)),i.uniforms.add(new n.Float3PassUniform("silCircleV1",e=>e.silhouette.v1)),i.uniforms.add(new n.Float3PassUniform("silCircleV2",e=>e.silhouette.v2)),i.uniforms.add(new s.Float2PassUniform("texV",e=>e.texV)),i.uniforms.add(new l.FloatPassUniform("innerScale",e=>e.innerScale)));const a=6.2831853,f=1/128;i.main.add(d.glsl`
      ${t?d.glsl`
      vec3 pos = position;
      float ndotl = mainLightDirection.z;
      vtc = vec2(0.0, position.z + 0.05);`:d.glsl`
      innerFactor = clamp(-position.z, 0.0, 1.0);
      float scale = position.y * (1.0 + innerFactor * innerScale);
      float phi = position.x * ${d.glsl.float(a*f)} + 1.0;
      vec3 pos =  (silCircleCenter + sin(phi) * silCircleV1 + cos(phi) * silCircleV2) * scale;
      float ndotl = dot(normalize(position.y > 0.0 ? pos: silCircleCenter), mainLightDirection);
      vtc.x = position.x  * ${d.glsl.float(f)};
      vtc.y = texV.x * (1.0 - position.z) + texV.y * position.z;
      `}
      falloff = max(0.0, smoothstep(-1.0, 0.8, 2.0 * ndotl));

		  gl_Position = transformPosition(proj, view, pos);
		  gl_Position.z = gl_Position.w; // project atmosphere onto the far plane
	  `),g.uniforms.add(new m.Texture2DPassUniform("tex",e=>e.texture)),t||g.uniforms.add(new l.FloatPassUniform("altitudeFade",e=>e.altitudeFade)),g.main.add(d.glsl`
			vec4 atmosphereColor = texture(tex, vtc) * falloff;
      ${t?d.glsl`fragColor = atmosphereColor;`:d.glsl`
			vec4 innerColor = vec4(atmosphereColor.rgb, 1.0 - altitudeFade);
			fragColor = mix(atmosphereColor, innerColor, smoothstep(0.0, 1.0, innerFactor));`}`)}return o}const v=Object.freeze(Object.defineProperty({__proto__:null,SilhouetteCircle:h,SimpleAtmospherePassParameters:u,build:p},Symbol.toStringTag,{value:"Module"}));e.SilhouetteCircle=h,e.SimpleAtmosphere=v,e.SimpleAtmospherePassParameters=u,e.build=p});