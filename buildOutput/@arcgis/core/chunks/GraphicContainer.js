/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{A as e}from"./AGraphicContainer.js";import{r}from"./util.js";class s extends e{renderChildren(e){for(const r of this.children)r.setTransform(e.state);if(super.renderChildren(e),this._updateAttributeView(),this.children.some(e=>e.hasData)){switch(e.drawPhase){case 1:this._renderChildren(e,0);break;case 16:this.hasHighlight&&this._renderHighlight(e)}this._boundsRenderer&&this._boundsRenderer.doRender(e)}}_renderHighlight(e){r(e,!1,e=>{this._renderChildren(e,1)})}}export{s as G};
