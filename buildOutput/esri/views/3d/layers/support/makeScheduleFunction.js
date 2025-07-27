// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../../../../core/promiseUtils","../../../support/Scheduler"],function(e,r,o){"use strict";e.makeScheduleFunction=function(e){return t=>{if(e.destroyed){const e=t(o.noBudget);return r.isPromiseLike(e)?e:Promise.resolve(e)}if(e.immediate)return e.immediate.schedule(t);const i="No immediate scheduler";throw console.error(i),new Error(i)}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});