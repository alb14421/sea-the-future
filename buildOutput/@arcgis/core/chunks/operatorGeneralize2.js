/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{S as r}from"./SimpleGeometryCursor.js";import{O as e}from"./OperatorGeneralize.js";const n=new e;function t(r,e,t){return n.execute(r,e,t,null)}function o(e,t,o){const s=n.executeMany(new r(e),t,o,null);return Array.from(s)}function s(){return n.supportsCurves()}export{o as a,t as e,s};
