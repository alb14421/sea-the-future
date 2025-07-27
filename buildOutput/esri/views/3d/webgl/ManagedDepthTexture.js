// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","./ManagedDepthAttachment"],function(t,e){"use strict";class n extends e.ManagedDepthAttachment{constructor(t,e,n){super(t,e,n),this.attachment=e}}t.ManagedDepthTexture=n,t.isManagedDepthTexture=function(t){return 1===t?.attachment.type},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})});