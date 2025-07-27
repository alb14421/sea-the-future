/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{L as e}from"./Logger.js";import{isAborted as r,createAbortError as t}from"../core/promiseUtils.js";import{isRefreshableLayer as s}from"../layers/mixins/RefreshableLayer.js";import{u as o}from"./terrainUtils.js";async function i(i,a,l){const n=i.layer;if(o(n)){const s=await n.fetchTile(a[0],a[1],a[2],l);if(r(l))throw e.getLogger(i).warnOnce("A call to fetchTile resolved even though the request was aborted. fetchTile should not resolve if options.signal.aborted is true."),t();return s}let m=i.getTileUrl(a);s(n)&&n.refreshTimestamp&&(m+=`${m.includes("?")?"&":"?"}_ts=${n.refreshTimestamp}`);const f=i.hasMixedImageFormats?3:2;return l.requester.request(m,f,l)}export{i as f};
