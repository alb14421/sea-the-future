// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports"],function(e){"use strict";e.StreamDataRequesterImpl=class{constructor(e,t){this._loader=e,this._clientType=t}request(e,t,r={}){return this._loader.request(e,t,this._clientType,r)}get busy(){return!this._loader.hasDownloadSlots(this._clientType)}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});