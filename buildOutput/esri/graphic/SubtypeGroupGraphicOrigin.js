// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["./GraphicOrigin","./isSubtypeGroupGraphicOrigin"],function(r,t){"use strict";var i;class e extends r{static{i=t.isSubtypeGroupGraphicOriginSymbol}constructor(r){super(),this[i]=!0,this.type="subtype-group",this.sublayer=r}get layer(){return this.sublayer.parent}}return e});