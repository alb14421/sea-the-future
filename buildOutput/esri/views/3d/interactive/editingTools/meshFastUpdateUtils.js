// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../../core/handleUtils","../../../../core/reactiveUtils"],function(e,n,i){"use strict";e.meshTransformFastUpdateHandles=function(e){const t=e.graphic;return t?[i.watch(()=>"visible"in e?e.visible:e.displaying,e=>{e&&t.notifyMeshTransformChanged({action:0})},{...i.syncAndInitial}),n.makeHandle(()=>t.notifyMeshTransformChanged({action:1}))]:[]},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});