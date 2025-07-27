// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../../chunks/vec32","./SnappingHint"],function(n,t,e){"use strict";class i extends e.SnappingHint{constructor(n,t,e=3){super(t,e),this.intersectionPoint=n}equals(n){return n instanceof i&&t.exactEquals(this.intersectionPoint,n.intersectionPoint)}}n.IntersectionSnappingHint=i,Object.defineProperty(n,Symbol.toStringTag,{value:"Module"})});