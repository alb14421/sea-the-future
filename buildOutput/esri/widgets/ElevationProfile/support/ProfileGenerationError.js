// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports"],function(e){"use strict";const r="ProfileGenerationError";class o extends Error{constructor(e){super("profile could not be generated",{cause:e}),this.type=r}}e.ProfileGenerationError=o,e.isProfileGenerationError=function(e){return e.type===r},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});