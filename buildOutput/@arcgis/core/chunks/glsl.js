/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
const t=(t,...n)=>{let o="";for(let r=0;r<n.length;r++)o+=t[r]+n[r];return o+=t[t.length-1],o};function n(t,n,o=""){return t?n:o}t.int=t=>Math.round(t).toString(),t.float=t=>t.toPrecision(8);export{n as I,t as g};
