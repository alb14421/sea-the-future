// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["./GraphicOrigin","./isBuildingGraphicOrigin"],function(i,r){"use strict";var s;class t extends i{static{s=r.isBuildingGraphicOriginSymbol}constructor(i){super(),this[s]=!0,this.type="building",this.sublayer=i}get layer(){return this.sublayer.layer}}return t});