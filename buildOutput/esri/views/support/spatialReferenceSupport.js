// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports"],function(e){"use strict";e.isSpatialReferenceSupported=function(e,i){return null!=e&&(null==i||(2===i?!e.isGeographic||e.isWGS84||4490===e.wkid:e.isWebMercator||e.isWGS84||4490===e.wkid||104971===e.wkid||104905===e.wkid||104903===e.wkid))},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});