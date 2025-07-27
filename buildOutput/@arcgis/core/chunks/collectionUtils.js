/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import r from"../core/Collection.js";function e(e,n,t=r){return n||(n=new t),n===e||n.destroyed||(n.removeAll(),function(r){return r&&(Array.isArray(r)||"items"in r&&Array.isArray(r.items))}(e)?n.addMany(e):e&&n.add(e)),n}function n(r){return r}export{n as c,e as r};
