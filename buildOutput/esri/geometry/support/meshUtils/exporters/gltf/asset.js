// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../../../core/arrayUtils"],function(e,s){"use strict";e.Asset=class{constructor(){this.copyright="",this.defaultScene=0,this.generator="",this._scenes=[]}addScene(e){if(this._scenes.includes(e))throw new Error("Scene already added");this._scenes.push(e)}removeScene(e){s.remove(this._scenes,e)}forEachScene(e){this._scenes.forEach(e)}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});