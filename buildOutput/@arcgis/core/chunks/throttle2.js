/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{d as i,i as n}from"./debounce.js";function t(t,a,r){var e=!0,o=!0;if("function"!=typeof t)throw new TypeError("Expected a function");return n(r)&&(e="leading"in r?!!r.leading:e,o="trailing"in r?!!r.trailing:o),i(t,a,{leading:e,maxWait:a,trailing:o})}export{t};
