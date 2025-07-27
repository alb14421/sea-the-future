/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{isLayerFromCatalog as t}from"../layers/catalog/catalogUtils.js";import{g as o,m as i}from"./layerUtils.js";function n(n){return!(!function(t){return"object"==typeof t&&null!=t&&"loaded"in t&&!0===t.loaded&&"type"in t}(n)||!o(n)?.operations?.supportsEditing||"editingEnabled"in n&&!i(n)||t(n))}export{n as i};
