/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{isPromiseLike as e}from"../core/promiseUtils.js";import{n as r}from"./Scheduler.js";function o(o){return t=>{if(o.destroyed){const o=t(r);return e(o)?o:Promise.resolve(o)}if(o.immediate)return o.immediate.schedule(t);const i="No immediate scheduler";throw console.error(i),new Error(i)}}export{o as m};
