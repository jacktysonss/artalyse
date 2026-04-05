// Glossary of art and software terms with definitions and where to find settings.
// Updated for Adobe Fresco (2025) and Procreate 5.x (iPad).
// Keys are lowercase for matching; terms can appear as partial matches in text.

export interface GlossaryEntry {
  term: string;
  definition: string;
  location?: string; // where to find it in software
}

const glossary: Record<string, GlossaryEntry> = {
  "pressure curve": {
    term: "Pressure Curve",
    definition:
      "A graph that maps how hard you press with your stylus to how the brush responds (opacity, size, etc.). A steep curve means light touches have big effects; a gentle curve requires more pressure.",
    location:
      "Fresco: Double-tap a brush to open Brush Settings, then scroll to Pressure dynamics — there's an editable curve graph. Procreate: Actions (wrench icon, top left) > Prefs > Pressure and Smoothing > Edit Pressure Curve.",
  },
  "pressure sensitivity": {
    term: "Pressure Sensitivity",
    definition:
      "How the app detects how hard you're pressing with your stylus. Lighter pressure = thinner/lighter strokes, harder pressure = thicker/darker strokes.",
    location:
      "Fresco: Double-tap a brush to open Brush Settings > Pressure dynamics (per-brush setting). Procreate: Global setting in Actions (wrench) > Prefs > Pressure and Smoothing.",
  },
  streamline: {
    term: "StreamLine",
    definition:
      "A Procreate setting that smooths out your strokes by slightly delaying the line to follow a cleaner path. Higher values = smoother but less responsive lines.",
    location:
      "Procreate: Tap a brush in the Brush Library to select it, then tap it again to open Brush Studio. Go to the Stabilization section in the left sidebar. StreamLine has an Amount slider (0%–100%).",
  },
  "motion filtering": {
    term: "Motion Filtering",
    definition:
      "A Procreate stabilization setting that removes small hand tremors by deleting wobble extremities rather than averaging them. It also has an Expression slider to put expressive variation back into filtered strokes.",
    location:
      "Procreate: Brush Studio > Stabilization (left sidebar). Motion Filtering has Amount and Expression sliders, below StreamLine. Can also be set globally at Actions (wrench) > Prefs > Pressure and Smoothing.",
  },
  smoothing: {
    term: "Smoothing",
    definition:
      "Reduces wobble and hand tremor in your brush strokes. Higher values create cleaner lines but with a slight lag as the app corrects your input.",
    location:
      "Fresco: With a Pixel or Vector brush selected, find the Smoothing slider on the left toolbar alongside brush size and opacity. Procreate: Called StreamLine — in Brush Studio > Stabilization.",
  },
  stabilization: {
    term: "Stabilization",
    definition:
      "Software assistance that steadies your hand while drawing. It compensates for natural hand shake to produce cleaner lines.",
    location:
      "Fresco: Smoothing slider on the left toolbar (visible when a Pixel/Vector brush is active). Procreate: Tap a brush to open Brush Studio, then the Stabilization section in the left sidebar — includes StreamLine, Motion Filtering, and Gyroscope Filtering.",
  },
  "blending mode": {
    term: "Blending Mode",
    definition:
      "Controls how a layer's pixels interact with layers below it. For example, Multiply darkens, Screen lightens, and Overlay increases contrast.",
    location:
      "Fresco: Open Layers panel (right side) > tap a layer > the blending mode dropdown is at the top of the panel (defaults to 'Normal'). Procreate: Open Layers panel (two overlapping squares icon, top right) > tap the letter 'N' next to the layer thumbnail — this opens the blending mode list and opacity slider.",
  },
  multiply: {
    term: "Multiply",
    definition:
      "A blending mode that darkens by combining the layer with what's below it. White disappears, dark colors get darker. Great for shadows.",
    location:
      "Fresco: Layers panel > blending mode dropdown. Procreate: Layers panel > tap 'N' on the layer.",
  },
  screen: {
    term: "Screen",
    definition:
      "A blending mode that lightens. The opposite of Multiply — black disappears, light colors get brighter. Good for glow and highlights.",
    location:
      "Fresco: Layers panel > blending mode dropdown. Procreate: Layers panel > tap 'N' on the layer.",
  },
  overlay: {
    term: "Overlay",
    definition:
      "A blending mode that increases contrast by combining Multiply and Screen. Dark areas get darker, light areas get lighter. Useful for adding depth.",
    location:
      "Fresco: Layers panel > blending mode dropdown. Procreate: Layers panel > tap 'N' on the layer.",
  },
  "soft light": {
    term: "Soft Light",
    definition:
      "A gentler version of Overlay. Subtly shifts colors and contrast without the harsh effect. Good for color grading and atmosphere.",
    location:
      "Fresco: Layers panel > blending mode dropdown. Procreate: Layers panel > tap 'N' on the layer.",
  },
  "color dodge": {
    term: "Color Dodge",
    definition:
      "A blending mode that brightens the base color to reflect the blend color. Creates vivid, high-contrast highlights. Use sparingly.",
    location:
      "Fresco: Layers panel > blending mode dropdown. Procreate: Layers panel > tap 'N' on the layer.",
  },
  layer: {
    term: "Layer",
    definition:
      "Think of layers like transparent sheets stacked on top of each other. Each layer holds separate parts of your artwork so you can edit, move, or delete one part without affecting the rest.",
    location:
      "Fresco: Layers panel on the right side of the screen (stacked rectangles icon). Tap '+' at the bottom to add a new layer. Drag layers to reorder. Procreate: Tap the two overlapping squares icon (top right) to open the Layers panel. Tap '+' to add a layer. Drag to reorder.",
  },
  "clipping mask": {
    term: "Clipping Mask",
    definition:
      "Makes a layer only visible within the non-transparent areas of the layer directly below it. Paint on the clipping mask layer and it stays within the shape below — like colouring inside the lines automatically.",
    location:
      "Fresco: In the Layers panel, tap the layer above the base layer, then tap the '...' (three-dot menu) > Create Clipping Mask. A small downward arrow appears on the clipped layer. Procreate: In the Layers panel, tap the layer above the base layer to open its menu > tap Clipping Mask.",
  },
  "alpha lock": {
    term: "Alpha Lock",
    definition:
      "Locks the transparent areas of a layer so you can only paint on pixels that already exist. Useful for recoloring or adding texture to a shape without going outside its edges.",
    location:
      "Procreate: In the Layers panel, swipe right with two fingers on a layer to toggle Alpha Lock (a checkerboard pattern appears on the thumbnail). Or tap the layer > Alpha Lock. Fresco: In the Layers panel, tap a layer's '...' menu > Lock Transparency.",
  },
  opacity: {
    term: "Opacity",
    definition:
      "How see-through something is. 100% opacity = fully solid, 0% = fully transparent. Applies to layers, brushes, and effects.",
    location:
      "Fresco: Layer opacity — in the Layers panel, the slider at the top next to the blending mode. Brush opacity — the bottom slider on the left toolbar. Procreate: Layer opacity — tap the 'N' on a layer, the opacity slider is right there. Brush opacity — the bottom slider on the left side of the screen.",
  },
  "brush opacity": {
    term: "Brush Opacity",
    definition:
      "Controls how transparent each brush stroke is. Lower opacity lets you build up color gradually with multiple strokes.",
    location:
      "Fresco: The bottom slider on the left toolbar (below the brush size slider). Tap it to type an exact %. Procreate: The bottom slider on the left edge of the screen (below the brush size slider).",
  },
  "brush size": {
    term: "Brush Size",
    definition:
      "The diameter of your brush stroke in pixels. Larger = wider strokes, smaller = fine details.",
    location:
      "Fresco: The top slider on the left toolbar. Tap it to type an exact pixel value. Procreate: The top slider on the left edge of the screen. Drag up/down to adjust.",
  },
  tilt: {
    term: "Tilt",
    definition:
      "When you angle your Apple Pencil/stylus, tilt-enabled brushes change their behavior — usually getting wider or changing texture, similar to tilting a real pencil on its side.",
    location:
      "Fresco: Double-tap a brush to open Brush Settings > scroll to Tilt dynamics. Procreate: Open Brush Studio (tap a brush twice) > Apple Pencil section in the left sidebar > Tilt settings.",
  },
  "gaussian blur": {
    term: "Gaussian Blur",
    definition:
      "A filter that softens/blurs an area evenly in all directions. Used for soft backgrounds, depth of field effects, or smoothing out textures.",
    location:
      "Fresco: Top menu bar > Filters > Gaussian Blur (apply to the selected layer, use the slider to control radius). Procreate: Tap the Adjustments icon (magic wand, top left area) > Gaussian Blur. Then drag your finger/pencil left or right on the canvas to control the amount.",
  },
  "color balance": {
    term: "Color Balance",
    definition:
      "Adjusts the overall color tone of your artwork by shifting between color pairs (e.g., more blue vs. more yellow). Used to set mood or correct colors.",
    location:
      "Procreate: Adjustments (magic wand icon, top menu) > Color Balance. Use the sliders for Shadows, Midtones, and Highlights. Fresco: Adjustments panel (if available in your version), otherwise use Edit in Photoshop for full color balance controls.",
  },
  "hue saturation": {
    term: "Hue, Saturation, Brightness",
    definition:
      "Three properties of color. Hue = the color itself (red, blue, etc.). Saturation = how vivid vs. gray. Brightness = how light or dark.",
    location:
      "Fresco: Adjustments panel > Hue/Saturation (sliders for Hue, Saturation, Lightness). Procreate: Adjustments (magic wand icon) > Hue, Saturation, Brightness. Three sliders appear at the bottom of the screen.",
  },
  "reference layer": {
    term: "Reference Layer",
    definition:
      "A special layer designation that tells the app to use this layer's contents as a boundary reference for Color Fill, even when you're painting on a different layer.",
    location:
      "Procreate: In the Layers panel, tap the layer you want as the reference > tap Reference in the layer menu. A 'Ref' label appears on it. Fresco: Not directly available — use clipping masks for similar results.",
  },
  "color picker": {
    term: "Color Picker / Eyedropper",
    definition:
      "A tool that samples a color from your canvas so you can paint with that exact color. A magnifying loupe appears showing the sampled color on the bottom and your current color on top.",
    location:
      "Fresco: Touch and hold on the canvas (a magnified circle appears). Or use the eyedropper tool in the left toolbar. The full color picker is the circle at the bottom of the left toolbar. Procreate: Touch and hold on the canvas with your FINGER (not pencil). Or tap the small square between the size/opacity sliders on the left side. The color circle (top right) opens the full color picker.",
  },
  "quick shape": {
    term: "QuickShape",
    definition:
      "A Procreate feature that auto-corrects your drawn shapes into clean geometric forms. Works for lines, circles, rectangles, triangles, and arcs.",
    location:
      "Procreate: Draw any shape and hold your pencil down at the end of the stroke (don't lift). It snaps to a clean shape. Place a finger while holding to constrain (perfect circle, straight line). Then tap 'Edit Shape' at the top of the screen to refine further.",
  },
  "live brushes": {
    term: "Live Brushes",
    definition:
      "Adobe Fresco's signature brushes that simulate real paint and watercolor. They blend, bleed, and dry like physical media on a real canvas. Different from pixel or vector brushes.",
    location:
      "Fresco: Tap the brush tool on the left toolbar. In the Brush Picker that opens, the Live Brushes tab is the first section (look for the watercolor drop or paint tube icon). Sub-categories: Watercolor and Oil Paint, each with multiple presets.",
  },
  "pixel brushes": {
    term: "Pixel Brushes",
    definition:
      "Standard digital brushes that paint with pixels. They offer the most control and customization (pressure, tilt, smoothing, texture) but don't simulate real media physics.",
    location:
      "Fresco: In the Brush Picker (tap brush tool on left toolbar), Pixel Brushes are the middle tab (circle/dot icon). Categories include: Sketching, Inking, Painting, Dry Media (charcoal, pastels, graphite), Special Effects, and Imported (.ABR) brushes.",
  },
  "vector brushes": {
    term: "Vector Brushes",
    definition:
      "Brushes that create scalable, resolution-independent strokes. You can resize them infinitely without quality loss. Best for clean line work and logos.",
    location:
      "Fresco: In the Brush Picker, Vector Brushes are the third tab (pen/path icon). Strokes can be edited after drawing with the Direct Selection tool.",
  },
  "brush studio": {
    term: "Brush Studio",
    definition:
      "Procreate's detailed brush editor where you can customize every aspect of a brush: shape, grain, rendering, dynamics, Apple Pencil response, and more.",
    location:
      "Procreate: In the Brush Library (paintbrush icon, top right), tap the brush you want to edit a second time (first tap selects, second tap opens Brush Studio). The left sidebar shows all editable categories.",
  },
  "brush library": {
    term: "Brush Library",
    definition:
      "The panel showing all available brushes organized by category. Contains default brushes and any you've imported or created.",
    location:
      "Procreate: Tap the paintbrush icon (top right). Default categories include: Sketching, Inking, Drawing, Painting, Artistic, Airbrushing, Textures, Abstract, Charcoals, Elements, Spray Paints, Touch Ups, Water, and more. Drag to reorder sets. Fresco: Tap the brush tool (left toolbar) to open the Brush Picker with Live/Pixel/Vector tabs.",
  },
};

/**
 * Search for glossary terms within a piece of text and return
 * the segments with term positions marked.
 */
export interface TextSegment {
  text: string;
  glossaryKey?: string; // if set, this segment is a glossary term
}

export function annotateText(text: string): TextSegment[] {
  if (!text) return [{ text }];

  // Build a list of all match positions
  const matches: { start: number; end: number; key: string }[] = [];
  const lowerText = text.toLowerCase();

  for (const key of Object.keys(glossary)) {
    let searchFrom = 0;
    while (true) {
      const idx = lowerText.indexOf(key, searchFrom);
      if (idx === -1) break;

      // Check word boundaries to avoid partial matches inside words
      const before = idx > 0 ? lowerText[idx - 1] : " ";
      const after =
        idx + key.length < lowerText.length
          ? lowerText[idx + key.length]
          : " ";
      const isWordBoundary = (c: string) =>
        /[\s,.;:!?()[\]{}"'/\-]/.test(c);

      if (isWordBoundary(before) && isWordBoundary(after)) {
        matches.push({ start: idx, end: idx + key.length, key });
      }
      searchFrom = idx + 1;
    }
  }

  if (matches.length === 0) return [{ text }];

  // Sort by start position, prefer longer matches
  matches.sort((a, b) => a.start - b.start || b.end - a.end);

  // Remove overlapping matches (keep the first/longest)
  const filtered: typeof matches = [];
  let lastEnd = 0;
  for (const m of matches) {
    if (m.start >= lastEnd) {
      filtered.push(m);
      lastEnd = m.end;
    }
  }

  // Build segments
  const segments: TextSegment[] = [];
  let cursor = 0;
  for (const m of filtered) {
    if (m.start > cursor) {
      segments.push({ text: text.slice(cursor, m.start) });
    }
    segments.push({
      text: text.slice(m.start, m.end),
      glossaryKey: m.key,
    });
    cursor = m.end;
  }
  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor) });
  }

  return segments;
}

export function getGlossaryEntry(key: string): GlossaryEntry | undefined {
  return glossary[key];
}

export { glossary };
