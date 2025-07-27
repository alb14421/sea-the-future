// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../ForwardLinearDepthToWriteShadowMap.glsl","../Slice.glsl","../Transform.glsl","../attributes/NormalAttribute.glsl","../attributes/ObjectAndLayerIdColor.glsl","../attributes/TextureCoordinateAttribute.glsl","../attributes/VertexNormal.glsl","../output/OutputDepth.glsl","../output/OutputHighlight.glsl","../shading/VisualVariables.glsl","../util/DiscardOrAdjustAlpha.glsl","../util/View.glsl","../../shaderModules/glsl","../../shaderModules/Texture2DPassUniform"],function(e,r,t,a,i,l,o,s,d,n,u,c,p,g,v){"use strict";e.DefaultMaterialAuxiliaryPasses=function(e,x){const{vertex:f,fragment:m,varyings:O}=e,{hasColorTexture:h,alphaDiscardMode:A}=x,V=h&&1!==A,{output:w,normalType:b,hasColorTextureTransform:P}=x;switch(w){case 2:p.addProjViewLocalOrigin(f,x),e.include(a.Transform,x),m.include(t.SliceDraw,x),e.include(o.TextureCoordinateAttribute,x),V&&m.uniforms.add(new v.Texture2DPassUniform("tex",e=>e.texture)),f.main.add(g.glsl`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();`),e.include(c.DiscardOrAdjustAlphaPass,x),m.main.add(g.glsl`
        discardBySlice(vpos);
        ${g.If(V,g.glsl`vec4 texColor = texture(tex, ${P?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}`);break;case 4:case 5:case 6:case 7:case 9:p.addProjViewLocalOrigin(f,x),e.include(a.Transform,x),e.include(o.TextureCoordinateAttribute,x),e.include(u.VisualVariables,x),e.include(d.OutputDepth,x),m.include(t.SliceDraw,x),e.include(l.ObjectAndLayerIdColor,x),r.addNearFar(e),O.add("depth","float",{invariant:!0}),V&&m.uniforms.add(new v.Texture2DPassUniform("tex",e=>e.texture)),f.main.add(g.glsl`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);
forwardTextureCoordinates();
forwardObjectAndLayerIdColor();`),e.include(c.DiscardOrAdjustAlphaPass,x),m.main.add(g.glsl`
        discardBySlice(vpos);
        ${g.If(V,g.glsl`vec4 texColor = texture(tex, ${P?"colorUV":"vuv0"});
               discardOrAdjustAlpha(texColor);`)}
        ${9===w?g.glsl`outputObjectAndLayerIdColor();`:g.glsl`outputDepth(depth);`}`);break;case 3:{p.addProjViewLocalOrigin(f,x),e.include(a.Transform,x),e.include(i.NormalAttribute,x),e.include(s.VertexNormal,x),e.include(o.TextureCoordinateAttribute,x),e.include(u.VisualVariables,x),V&&m.uniforms.add(new v.Texture2DPassUniform("tex",e=>e.texture)),2===b&&O.add("vPositionView","vec3",{invariant:!0});const r=0===b||1===b;f.main.add(g.glsl`
        vpos = getVertexInLocalOriginSpace();
        ${r?g.glsl`vNormalWorld = dpNormalView(vvLocalNormal(normalModel()));`:g.glsl`vPositionView = (view * vec4(vpos, 1.0)).xyz;`}
        vpos = subtractOrigin(vpos);
        vpos = addVerticalOffset(vpos, localOrigin);
        gl_Position = transformPosition(proj, view, vpos);
        forwardTextureCoordinates();`),m.include(t.SliceDraw,x),e.include(c.DiscardOrAdjustAlphaPass,x),m.main.add(g.glsl`
        discardBySlice(vpos);
        ${g.If(V,g.glsl`vec4 texColor = texture(tex, ${P?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}

        ${2===b?g.glsl`vec3 normal = screenDerivativeNormal(vPositionView);`:g.glsl`vec3 normal = normalize(vNormalWorld);
                    if (gl_FrontFacing == false){
                      normal = -normal;
                    }`}
        fragColor = vec4(0.5 + 0.5 * normal, 1.0);`);break}case 8:p.addProjViewLocalOrigin(f,x),e.include(a.Transform,x),e.include(o.TextureCoordinateAttribute,x),e.include(u.VisualVariables,x),V&&m.uniforms.add(new v.Texture2DPassUniform("tex",e=>e.texture)),f.main.add(g.glsl`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();`),m.include(t.SliceDraw,x),e.include(c.DiscardOrAdjustAlphaPass,x),e.include(n.OutputHighlight,x),m.main.add(g.glsl`
        discardBySlice(vpos);
        ${g.If(V,g.glsl`vec4 texColor = texture(tex, ${P?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}
        calculateOcclusionAndOutputHighlight();`)}},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});