// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../chunks/OperatorWithin","../support/jsonConverter"],function(e,t,o){"use strict";const r=new t.OperatorWithin;e.execute=function(e,t){const n=o.fromGeometry(e);return r.execute(n.getGeometry(),o.fromGeometryToGXGeometry(t),n.getSpatialReference(),null)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});