/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
function t(t,s,i,e){return{x:t,y:s,z:i,hasZ:null!=i,hasM:!1,spatialReference:e,type:"point"}}function s(t,s,i,e,n){t.x=s,t.y=i,t.z=e,t.hasZ=null!=e,t.spatialReference=n}class i{constructor(t,s,i,e,n){this.spatialReference=t,this._position=void 0!==n?[s,i,e??0,n??0]:void 0!==e?[s,i,e??0]:[s,i],this._flags=(void 0!==e?1:0)+(void 0!==n?2:0)}get hasZ(){return!(1&~this._flags)}get hasM(){return!(2&~this._flags)}get type(){return"point"}get x(){return this._position[0]}get y(){return this._position[1]}get z(){return this.hasZ?this._position[2]:void 0}get m(){return this.hasM?this._position[3]:void 0}}export{i as I,t as m,s};
