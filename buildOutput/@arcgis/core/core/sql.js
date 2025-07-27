/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
let n;async function t(){return null==n&&(n=import("../chunks/WhereClauseCache.js").then(n=>new n.WhereClauseCache(500,500))),n}function u(){n=null}async function e(n,u){const e=await t(),r=e.get(n,u);if(null==r)throw e.getError(n,u);return r}function r(n,t){return n||=null,t||=null,"1=1"===n?t??n:"1=1"===t?n??t:n&&t?`(${n}) AND (${t})`:n??t}function l(n,t){return n||=null,t||=null,"1=1"===n||"1=1"===t||n===t?"1=1"===n?n:t:n&&t?`(${n}) OR (${t})`:n??t}function c(n,t){return 0===t.length?null:`${n} IN (${function(n){return n.map(n=>"string"==typeof n?function(n){return`'${n.replaceAll("'","''")}'`}(n):n).join(",")}(t)})`}export{u as cleanupWhereClauseCache,e as parseWhereClause,r as sqlAnd,c as sqlIn,l as sqlOr};
