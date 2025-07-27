// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","./vec32","../core/libs/gl-matrix-2/factories/vec3f64","../views/3d/webgl-engine/core/shaderModules/Float3BindUniform","../views/3d/webgl-engine/core/shaderModules/Float3PassUniform","../views/3d/webgl-engine/core/shaderModules/FloatPassUniform","../views/3d/webgl-engine/core/shaderModules/glsl","../views/3d/webgl-engine/core/shaderModules/Matrix4BindUniform","../views/webgl/ShaderBuilder"],function(e,t,o,a,i,n,r,s,d){"use strict";function c(e){const o=new d.ShaderBuilder;return o.attributes.add("position","vec3"),o.attributes.add("instanceFeatureAttribute","float"),o.vertex.uniforms.add(new a.Float3BindUniform("cameraPosition",e=>e.camera.eye),new i.Float3PassUniform("offset",(e,o)=>function(e,o){const a=o.camera.eye,i=.5*e.width,n=1/e.width,r=t.floor(l,t.set(l,(a[0]+i)*n,(a[1]+i)*n,(a[2]+i)*n));return t.sub(r,a,t.scale(r,r,e.width))}(e,o)),new n.FloatPassUniform("width",e=>e.width),new n.FloatPassUniform("time",e=>e.time),new s.Matrix4BindUniform("proj",e=>e.camera.projectionMatrix),new s.Matrix4BindUniform("view",e=>e.camera.viewMatrix)),o.varyings.add("vUv","vec2"),o.vertex.code.add(r.glsl`vec3 hash31(float p){
vec3 p3 = fract(vec3(p) * vec3(0.1031, 0.1030, 0.0973));
p3 += dot(p3, p3.yzx + 33.33);
return fract((p3.xxy + p3.yzz) * p3.zyx);
}
float hash11(float p){
p = fract(p * 0.1031);
p *= p + 33.33;
p *= p + p;
return fract(p);
}
vec3 rotateVectorByQuaternion(vec3 v, vec4 q){
return 2.0 * cross(q.xyz, v * q.w + cross(q.xyz, v)) + v;
}`),o.vertex.main.add(r.glsl`
      vUv = position.xz;
      vec3 rand = hash31(instanceFeatureAttribute);

      // Set random position for all particles
      // The hash function space is not high resolution so offset particles by an additional random value
      // This creates grids of 1000 particles which are shifted by random hundredths of the tile width
      // overlaying multiple identical but offset grids
      vec3 randomPosition = 2.0 * (rand + (0.01 + 0.01 * rand) * floor(0.001 * instanceFeatureAttribute)) - 1.0;

      // Random orientation of rain drops
      float angle = 3.1415 * hash11(instanceFeatureAttribute);

      vec3 up = vec3(0, 0, 1);

      // Gravity and wind direction
      vec3 direction = normalize(cameraPosition);

      vec3 tangent = normalize(cross(direction, up));

      // Gravity
      vec3 animatedPos = randomPosition + direction * -time;

      // Rain particles fall straight down and are randomly oriented
      // Snow particles have random sinusoid trajectories and are rotated to face the camera
      ${0===e.type?r.glsl`
            // Random rotation for particle
            vec3 rotationAxis = up;
            vec4 quat = vec4(rotationAxis * sin(angle), cos(angle));
            vec3 transformedPos = rotateVectorByQuaternion(vec3(0.2, 0.2, 4.0) * (position - vec3(0.5, 0.0, 0.5)), quat);

            // Rotate particle to planetary position
            rotationAxis = tangent;
            angle = 0.5 * -acos(dot(direction, up));
            quat = vec4(rotationAxis * sin(angle), cos(angle));
            transformedPos = rotateVectorByQuaternion(transformedPos, quat);

            vec4 pos = mat4(mat3(view)) * vec4(transformedPos + (mod(width * animatedPos - offset, width) - 0.5 * width), 1.0);
            gl_Position = proj * pos;
      `:r.glsl`
            vec3 rotationAxis = direction;
            vec4 quat = vec4(rotationAxis * sin(angle), cos(angle));

            tangent = rotateVectorByQuaternion(tangent, quat);
            // Random sinusoid from friction
            animatedPos += tangent * 0.25 * sin(dot(animatedPos, direction));
            vec4 pos = mat4(mat3(view)) * vec4((mod(width * animatedPos - offset, width) - 0.5 * width), 1.0);
            gl_Position = proj * (0.5 * vec4(position.xzy, 0.0) + pos);
      `}
  `),o.fragment.uniforms.add(new n.FloatPassUniform("opacity",e=>e.opacity),new a.Float3BindUniform("particleColor",o=>function(e,o){const a=0===o.type?v:f,i=t.scale(l,a,p),n=e.camera.eye;t.normalize(m,n);const r=Math.max(0,t.dot(m,e.lighting.mainLight.direction));return t.lerp(i,i,a,r)}(o,e))),o.fragment.main.add(r.glsl`
    float d = length(vUv - vec2(0.5));

    ${0===e.type?r.glsl`d = 0.35 * smoothstep(0.5, 0.0, d);`:r.glsl`d = smoothstep(0.5, 0.1, d);`}
    fragColor = opacity * vec4(particleColor * d, d);
  `),o}const l=o.create(),m=o.create(),f=o.fromValues(1,1,1),v=o.fromValues(.85,.85,.85),p=.7,u=Object.freeze(Object.defineProperty({__proto__:null,build:c},Symbol.toStringTag,{value:"Module"}));e.Precipitation=u,e.build=c});