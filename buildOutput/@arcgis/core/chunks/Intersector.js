/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{i as s}from"./HUDIntersectorResult.js";class t{constructor(s){this.layerViewUid=s}}class r extends t{constructor(s,t){super(s),this.graphicUid=t}}class e extends r{constructor(s,t,r,e,i){super(s,t),this.layerViewUid=s,this.graphicUid=t,this.triangleNr=r,this.baseBoundingSphere=e,this.numLodLevels=i}}function i(t){return s(t)&&6===t.intersector&&!!t.target}export{r as G,e as L,t as a,i};
