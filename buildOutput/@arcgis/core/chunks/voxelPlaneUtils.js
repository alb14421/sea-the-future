/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{s as a,m as s}from"./quat.js";import{c as t}from"./quatf64.js";import{c as o,f as r}from"./vec3f64.js";import{a as m,t as n}from"./common.js";import{e as c,n as f,r as i}from"./vec3.js";const e=o(),p=t(),u=t(),j=t(),h=r(0,0,1),q=r(0,1,0),v=r(1,0,0);function M(s){c(e,s),f(e,e);const o=Math.atan2(e[1],e[0]),r=a(t(),h,-o);i(e,e,r);const n=-1*Math.atan2(e[2],e[0]);return[m(o)+270,m(n)+90]}function x(t,o){return a(u,h,n(t-270)),a(j,q,n(o-90)),s(p,u,j),c(e,v),i(e,e,p),f(e,e),[e[0],e[1],e[2]]}export{x as a,M as c};
