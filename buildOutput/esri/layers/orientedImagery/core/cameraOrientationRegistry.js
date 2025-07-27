// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["./CameraOrientationHPR","./CameraOrientationLTP","./CameraOrientationOPK","./CameraOrientationYPR"],function(n,t,e,a){"use strict";const i=new Map;return i.set("2",{desc:"Using Omega Phi Kappa",constructor:e}),i.set("1",{desc:"Using Heading, Pitch and Roll",constructor:n}),i.set("3",{desc:"Using Yaw, Pitch and Roll",constructor:a}),i.set("4",{desc:"Using Local Tangent Plane",constructor:t}),i});