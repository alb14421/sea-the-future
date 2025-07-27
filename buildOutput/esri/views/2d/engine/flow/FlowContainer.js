// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["./BrushFlow","../webgl/WGLContainer"],function(e,r){"use strict";return class extends r{constructor(){super(...arguments),this.flowStyle=null}doRender(e){super.doRender(e)}prepareRenderPasses(r){const s=r.registerRenderPass({name:"flow",brushes:[e],target:()=>this.children,drawPhase:1});return[...super.prepareRenderPasses(r),s]}}});