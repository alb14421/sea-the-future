/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import"../core/lang.js";import{P as r}from"./Program.js";class t{constructor(r){this._rctx=r,this._store=new Map}dispose(){this._store.forEach(r=>r.dispose()),this._store.clear()}acquire(t,s,e,o){const i=t+s+JSON.stringify(Array.from(e.entries())),c=this._store.get(i);if(null!=c)return c.ref(),c;const n=new r(this._rctx,t,s,e,o);return n.ref(),this._store.set(i,n),n}get test(){}}export{t as P};
