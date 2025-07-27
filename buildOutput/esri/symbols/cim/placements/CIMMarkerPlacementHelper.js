// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../CIMOperators"],function(e,t){"use strict";e.CIMMarkerPlacementHelper=class{static getPlacement(e,r,n,a,c){const l=t.getPlacementOperator(n);return l?(-1===r&&e.invertY(),l.execute(e,n,a,c)):null}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});