/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{n as t}from"./string.js";function e(e,n){let o;if("string"==typeof e)o=t(e+`-seed(${n})`);else{let t=12;o=e^n;do{o=107*(o>>8^o)+t|0}while(0!==--t)}return(1+o/(1<<31))/2}function n(t){return Math.floor(e(t,o)*r)}const o=53290320,r=10;export{n as a,e as g};
