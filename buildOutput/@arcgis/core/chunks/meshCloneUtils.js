/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
const t=Symbol("meshContext");function n(n){return n&&"object"==typeof n&&t in n?n[t]:void 0}function e(e,o){const r=n(e);return{...e,[t]:{...r,...o}}}const o=Symbol("meshMaterialContext");function r(t){return t&&"object"==typeof t&&o in t?t[o]:void 0}function a(t){const n=r(t);if(n?.materialMap)return t;const e={materialMap:new Map};return{...t,[o]:e}}const c=Symbol("meshTextureContext");function i(t){return t&&"object"==typeof t&&c in t?t[c]:void 0}function s(t){const n=i(t);if(n?.textureMap)return t;const e={textureMap:new Map};return{...t,[c]:e}}export{s as a,i as b,e as c,a as d,n as e,r as g};
