// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../core/Collection","./HighlightDefaults","./HighlightOptions"],function(e,t,i,n){"use strict";e.createInitialHighlightOptions=function(){return new t([new n({name:i.defaultHighlightName}),new n({name:i.temporaryHighlightName,color:i.temporaryHighlightColor})])},e.getHighlightName=function(e){return e?.name??i.defaultHighlightName},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});