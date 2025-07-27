/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import"../core/lang.js";import{k as e}from"./elevationInfoUtils.js";function t(t){if(t.graphic&&"graphics"!==t.graphic.layer?.type)return 1;const r=t.operations?.data.type;if(!r)return 3;switch(r){case"polygon":case"point":case"polyline":case"mesh":break;default:return 3}const a=t.elevationInfo;return e(a)?4:0}export{t as i};
