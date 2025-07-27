// All material copyright Esri, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.34/esri/copyright.txt for details.
//>>built
define(["exports","./OutputHighlight.glsl","../../shaderModules/glsl"],function(t,i,l){"use strict";t.OutputHighlightOverlay=function(t,e){8===e.output&&(t.include(i.OutputHighlight,e),t.fragment.code.add(l.glsl`
    void calculateOcclusionAndOutputHighlight(uvec2 highlightToAdd) {
      uint levelBits = readLevelBits(highlightToAdd, highlightLevel);
      if ((levelBits & 1u) == 0u) discard;
      outputHighlight(isHighlightOccluded());
    }
  `))},Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})});