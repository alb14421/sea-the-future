// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../SpatialReference","../spatialReferenceEllipsoidUtils","./spatialReferenceUtils"],function(e,i,t,a){"use strict";e.getGCSForPlanet=function(e){return a.equals(e,t.SphericalPCPFMars)||a.isMars(e)?{wkid:104971}:a.equals(e,t.SphericalPCPFMoon)||a.isMoon(e)?{wkid:104903}:i.WGS84},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});