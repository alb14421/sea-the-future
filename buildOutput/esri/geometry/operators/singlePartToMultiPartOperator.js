// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../core/arrayUtils","./gx/operatorSinglePartToMultiPart","./support/apiConverter"],function(e,t,r,o){"use strict";const n=r.supportsCurves();e.executeMany=function(e){const n=e.map(o.fromGeometry),a=o.getSpatialReference(e);return r.executeMany(n).map(e=>o.toGeometry(e,a)).filter(t.isSome)},e.supportsCurves=n,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});