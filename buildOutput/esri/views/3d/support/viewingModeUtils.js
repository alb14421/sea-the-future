// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../chunks/cameraUtilsPlanar","../../../chunks/cameraUtilsSpherical"],function(e,i,t){"use strict";function n({state:e}){return e.isGlobal?t.cameraUtilsSpherical:i.cameraUtilsPlanar}e.directionToHeadingTilt=function(e,i,t,a,r){return n(e).directionToHeadingTilt(i,t,a,r)},e.viewModeDependentUtil=n,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});