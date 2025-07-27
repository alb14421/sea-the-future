/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.34/esri/copyright.txt for details.
*/
import{e as t}from"./mathUtils.js";function r({distance:r,heading:e,horizontalFieldOfView:i,pitch:o,verticalFieldOfView:n,origin:a=[0,0,0],positionLength:f=3}){const s=f-1,l=f*f,c=new Float32Array(2*l),h=new Float64Array(3*l),u=new Float32Array(3*l).fill(0),w=new Uint32Array(s**2*6);for(let p=0,F=0;p<l;p++){const l=Math.floor(p/f),M=p%f,b=1-M/s,d=l/s,m=2*p,y=3*p;c[m]=b,c[m+1]=d;const A=o+n/2-d*n,g=t(e-i/2+b*i),v=t(A),L=Math.sin(v),O=Math.cos(v),U=[L*Math.sin(g),Math.cos(g)*L,-O];h[y]=a[0]+r*U[0],h[y+1]=a[1]+r*U[1],h[y+2]=a[2]+r*U[2],u[y]=-U[0],u[y+1]=-U[1],u[y+2]=-U[2],l!==s&&M!==s&&(w[F++]=p,w[F++]=p+f,w[F++]=p+f+1,w[F++]=p,w[F++]=p+f+1,w[F++]=p+1)}return{result:{position:h,uv:c,normal:u,faces:w},transferList:[h.buffer,c.buffer,u.buffer,w?.buffer]}}export{r as getFacesWithVertexAttributes};
