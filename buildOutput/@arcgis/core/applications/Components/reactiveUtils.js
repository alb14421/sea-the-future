/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{s}from"../../chunks/signal.js";import{t as r,r as n}from"../../chunks/tracking.js";import{S as t}from"../../chunks/SimpleObservable.js";import{S as i}from"../../chunks/SimpleTrackingTarget.js";import"../../core/lang.js";import"../../chunks/Logger.js";import"../../config.js";import"../../chunks/object.js";import"../../chunks/string.js";import"../../chunks/utils.js";import"../../chunks/handleUtils.js";import"../../chunks/ObservableBase.js";function o(r,n){return s(r,n)}function c(){return new t}function u(s){return new i(s)}function e(s){r(s)}function m(s,r){return n(s,r)}export{c as createObservable,u as createTrackingTarget,m as runTracked,o as signal,e as trackAccess};
