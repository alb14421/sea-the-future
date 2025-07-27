/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{A as e}from"./enum.js";function t(t){if("string"==typeof t)return t.toLowerCase();if("name"in t)return t.name.toLowerCase();if("string"!=typeof t.value)throw new e(null,"InvalidIdentifier",null);return t.value.toLowerCase()}const n=Object.freeze({aborted:!1});export{n,t};
