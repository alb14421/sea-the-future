/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
function n(n){let t=0;return new Map(n.map(({name:n,count:a})=>{const r=[n,t];return 16===a?t+=4:9===a?t+=3:++t,r}))}function t(n){const t=new Map;let a=0;return n.forEach(n=>n.forEach(({name:n,count:r})=>{t.set(n,a),16===r?a+=4:9===r?a+=3:++a})),t}function a(n){return t(Array.from(n.values()).map(({layout:n})=>n))}export{t as a,n as b,a as f};
