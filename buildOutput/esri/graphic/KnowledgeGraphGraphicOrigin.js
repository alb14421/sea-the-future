// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["./GraphicOrigin","./isKnowledgeGraphGraphicOrigin"],function(r,e){"use strict";var i;class t extends r{static{i=e.isKnowledgeGraphGraphicOriginSymbol}constructor(r){super(),this[i]=!0,this.type="knowledge-graph",this.sublayer=r}get layer(){return this.sublayer.parent}}return t});