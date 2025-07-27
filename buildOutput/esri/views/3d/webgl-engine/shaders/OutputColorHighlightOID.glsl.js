// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","../core/shaderLibrary/ShaderOutput","../core/shaderLibrary/output/Emissions.glsl","../core/shaderLibrary/output/OutputHighlight.glsl","../core/shaderLibrary/util/ColorConversion.glsl","../core/shaderModules/glsl","../../../../webscene/support/AlphaCutoff"],function(o,l,i,r,s,t,a){"use strict";o.outputColorHighlightOID=function(o,e){o.include(r.OutputHighlight,e),o.include(i.Emissions,e),o.fragment.include(s.ColorConversion);const{output:n,oitPass:u,discardInvisibleFragments:f,snowCover:d}=e,g=9===n,C=l.isColorEmission(n),c=l.isColorOrColorEmission(n)&&1===u,p=l.isColorOrColorEmission(n)&&1!==u;let h=0;(p||C||c)&&o.outputs.add("fragColor","vec4",h++),C&&o.outputs.add("fragEmission","vec4",h++),c&&o.outputs.add("fragAlpha","float",h++),o.fragment.code.add(t.glsl`
    void outputColorHighlightOID(vec4 finalColor, const in vec3 vWorldPosition, vec3 emissiveSymbolColor ${t.If(d,", float snow")}) {
      ${t.If(g,"finalColor.a = 1.0;")}

      ${t.If(f,`if (finalColor.a < ${t.glsl.float(a.alphaCutoff)}) { discard; }`)}

      finalColor = applySlice(finalColor, vWorldPosition);
      ${t.If(c,t.glsl`fragColor = premultiplyAlpha(finalColor);
             fragAlpha = finalColor.a;`)}
      ${t.If(p,"fragColor = finalColor;")}
      ${t.If(C,`fragEmission = ${t.If(d,"mix(finalColor.a * getEmissions(emissiveSymbolColor), vec4(0.0), snow);","finalColor.a * getEmissions(emissiveSymbolColor);")}`)}
      calculateOcclusionAndOutputHighlight();
      ${t.If(g,"outputObjectAndLayerIdColor();")}
    }
  `)},Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});