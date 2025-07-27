// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(function(){"use strict";return class{constructor(t){this._material=t.material,this._techniques=t.techniques,this._output=t.output}dispose(){}get _stippleTextures(){return this._techniques.context?.stippleTextures}get _markerTextures(){return this._techniques.context?.markerTextures}getTechnique(t,e){return this._techniques.get(t,this._material.getConfiguration(this._output,e))}ensureResources(t){return 2}}});