// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../../core/libs/gl-matrix-2/factories/vec3f64","../../../../../../geometry/support/Ellipsoid","../../../../environment/weather","../shading/MainLighting.glsl","./LookupCloudsFromTextureArray.glsl","../../shaderModules/BooleanBindUniform","../../shaderModules/Float3BindUniform","../../shaderModules/FloatBindUniform","../../shaderModules/glsl","../../shaderModules/Matrix4BindUniform","../../shaderModules/Texture2DArrayBindUniform"],function(o,a,t,e,r,i,n,d,l,c,s,u){"use strict";const m=(t.earth.radius+e.cloudsHeight)**2;o.CloudsParallaxShading=function(o){const t=o.fragment;t.constants.add("radiusCloudsSquared","float",m).code.add(c.glsl`vec3 intersectWithCloudLayer(vec3 dir, vec3 cameraPosition, vec3 spherePos) {
float B = 2.0 * dot(cameraPosition, dir);
float C = dot(cameraPosition, cameraPosition) - radiusCloudsSquared;
float det = B * B - 4.0 * C;
float pointIntDist = max(0.0, 0.5 *(-B + sqrt(det)));
return (cameraPosition + dir * pointIntDist) - spherePos;
}`),t.uniforms.add(new l.FloatBindUniform("radiusCurvatureCorrection",({clouds:o})=>o.parallax.radiusCurvatureCorrection)).code.add(c.glsl`vec3 correctForPlanetCurvature(vec3 dir) {
dir.z = dir.z * (1.0 - radiusCurvatureCorrection) + radiusCurvatureCorrection;
return dir;
}`),t.code.add(c.glsl`vec3 rotateDirectionToAnchorPoint(mat4 rotMat, vec3 inVec) {
return (rotMat * vec4(inVec, 0.0)).xyz;
}`),r.addMainLightDirection(t),r.addMainLightIntensity(t);const e=a.fromValues(.28,.175,.035);t.constants.add("RIM_COLOR","vec3",e),t.code.add(c.glsl`
    vec3 calculateCloudColor(vec3 cameraPosition, vec3 worldSpaceRay, vec4 clouds) {
      float upDotLight = dot(cameraPosition, mainLightDirection);
      float dirDotLight = max(dot(worldSpaceRay, mainLightDirection), 0.0);
      float sunsetTransition = clamp(pow(max(upDotLight, 0.0), ${c.glsl.float(.3)}), 0.0, 1.0);

      // Base color of the clouds that depends on lighting of the sun and sky
      vec3 ambientLight = calculateAmbientIrradiance(cameraPosition,  0.0);
      vec3 combinedLight = clamp((mainLightIntensity + ambientLight )/PI, vec3(0.0), vec3(1.0));
      vec3 baseCloudColor = pow(combinedLight * pow(clouds.xyz, vec3(GAMMA)), vec3(INV_GAMMA));

      // Rim light around the edge of the clouds simulating scattering of the direct lun light
      float scatteringMod = max(clouds.a < 0.5 ? clouds.a / 0.5 : - clouds.a / 0.5 + 2.0, 0.0);
      float rimLightIntensity = 0.5 + 0.5 * pow(max(upDotLight, 0.0), 0.35);
      vec3 directSunScattering = RIM_COLOR * rimLightIntensity * (pow(dirDotLight, ${c.glsl.float(140)})) * scatteringMod;

      // Brighten the clouds around the sun at the sunsets
      float additionalLight = ${c.glsl.float(.2)} * pow(dirDotLight, ${c.glsl.float(10)}) * (1. - pow(sunsetTransition, ${c.glsl.float(.3)})) ;

      return vec3(baseCloudColor * (1.0 + additionalLight) + directSunScattering);
    }
  `),o.include(i.LookupCloudsFromTextureArray),t.uniforms.add(new n.BooleanBindUniform("readChannelsRG",o=>0===o.clouds.readChannels),new u.Texture2DArrayBindUniform("cubeMap",o=>o.clouds.data?.cubeMap?.colorTexture)).code.add(c.glsl`vec4 sampleCloud(vec3 rayDir, bool readOtherChannel) {
vec4 s = lookupCloudsFromTextureArray(cubeMap, rayDir);
bool readRG = readChannelsRG ^^ readOtherChannel;
s = readRG ? vec4(vec3(s.r), s.g) : vec4(vec3(s.b), s.a);
return length(s) == 0.0 ? vec4(s.rgb, 1.0) : s;
}`),t.uniforms.add(new d.Float3BindUniform("anchorPoint",o=>o.clouds.parallax.anchorPoint),new d.Float3BindUniform("anchorPointNew",o=>o.clouds.parallaxNew.anchorPoint),new s.Matrix4BindUniform("rotationClouds",o=>o.clouds.parallax.transform),new s.Matrix4BindUniform("rotationCloudsNew",o=>o.clouds.parallaxNew.transform),new l.FloatBindUniform("cloudsOpacity",o=>o.clouds.opacity),new l.FloatBindUniform("fadeFactor",o=>o.clouds.fadeFactor),new n.BooleanBindUniform("crossFade",o=>3===o.clouds.fadeState)).code.add(c.glsl`vec4 renderClouds(vec3 worldRay, vec3 cameraPosition) {
vec3 intersectionPoint = intersectWithCloudLayer(worldRay, cameraPosition, anchorPoint);
vec3 worldRayRotated = rotateDirectionToAnchorPoint(rotationClouds, normalize(intersectionPoint));
vec3 worldRayRotatedCorrected = correctForPlanetCurvature(worldRayRotated);
vec4 cloudData = sampleCloud(worldRayRotatedCorrected, crossFade);
vec3 cameraPositionN = normalize(cameraPosition);
vec4 cloudColor = vec4(calculateCloudColor(cameraPositionN, worldRay, cloudData), cloudData.a);
if(crossFade) {
intersectionPoint = intersectWithCloudLayer(worldRay, cameraPosition, anchorPointNew);
worldRayRotated = rotateDirectionToAnchorPoint(rotationCloudsNew, normalize(intersectionPoint));
worldRayRotatedCorrected = correctForPlanetCurvature(worldRayRotated);
cloudData = sampleCloud(worldRayRotatedCorrected, false);
vec4 cloudColorNew = vec4(calculateCloudColor(cameraPositionN, worldRay, cloudData), cloudData.a);
cloudColor = mix(cloudColor, cloudColorNew, fadeFactor);
}
float totalTransmittance = length(cloudColor.rgb) == 0.0 ?
1.0 :
clamp(cloudColor.a * cloudsOpacity + (1.0 - cloudsOpacity), 0.0 , 1.0);
return vec4(cloudColor.rgb, totalTransmittance);
}`)},Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});