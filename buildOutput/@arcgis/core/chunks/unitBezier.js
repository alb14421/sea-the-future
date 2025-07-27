/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
function e(e,n,t,r){const u=3*e,a=3*(t-e)-u,s=1-u-a,i=3*n,f=3*(r-n)-i,o=1-i-f;function c(e){return((s*e+a)*e+u)*e}function b(e){return(3*s*e+2*a)*e+u}return function(e,n=1e-6){return t=function(e,n){let t,r,u,a,s,i;for(u=e,i=0;i<8;i++){if(a=c(u)-e,Math.abs(a)<n)return u;if(s=b(u),Math.abs(s)<1e-6)break;u-=a/s}if(t=0,r=1,u=e,u<t)return t;if(u>r)return r;for(;t<r;){if(a=c(u),Math.abs(a-e)<n)return u;e>a?t=u:r=u,u=.5*(r-t)+t}return u}(e,n),((o*t+f)*t+i)*t;var t}}const n={};n.ease=e(.25,.1,.25,1),n.linear=e(0,0,1,1),n.easeIn=n["ease-in"]=e(.42,0,1,1),n.easeOut=n["ease-out"]=e(0,0,.58,1),n.easeInOut=n["ease-in-out"]=e(.42,0,.58,1);export{n as e,e as u};
