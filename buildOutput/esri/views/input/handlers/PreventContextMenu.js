// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../InputHandler"],function(e,t){"use strict";class n extends t.InputHandler{constructor(){super(!0),this.registerIncoming("context-menu",e=>e.data.native.preventDefault())}}e.PreventContextMenu=n,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});