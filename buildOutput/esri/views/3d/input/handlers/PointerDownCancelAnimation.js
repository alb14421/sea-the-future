// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../input/InputHandler"],function(e,t){"use strict";class n extends t.InputHandler{constructor(e,t){super(!0),this.view=e,this.registerIncoming("pointer-down",t,()=>this.view.state.stopActiveCameraController())}}e.PointerDownCancelAnimation=n,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});