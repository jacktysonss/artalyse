// Glossary of art and software terms with definitions and where to find settings
// Keys are lowercase for matching; terms can appear as partial matches in text

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
      "Fresco: Brush Settings > Pressure. Procreate: Actions (wrench) > Prefs > Pressure and Smoothing > Edit Pressure Curve.",
  },
  "pressure sensitivity": {
    term: "Pressure Sensitivity",
    definition:
      "How the app detects how hard you're pressing with your stylus. Lighter pressure = thinner/lighter strokes, harder pressure = thicker/darker strokes.",
    location:
      "Fresco: Brush Settings > Pressure. Procreate: Individual brush settings or global in Actions > Prefs.",
  },
  streamline: {
    term: "StreamLine",
    definition:
      "A Procreate setting that smooths out your strokes by slightly delaying the line to follow a cleaner path. Higher values = smoother but less responsive lines.",
    location:
      "Procreate: Tap a brush > Stabilization > StreamLine. Adjust the Amount slider.",
  },
  "motion filtering": {
    term: "Motion Filtering",
    definition:
      "A Procreate stabilization setting that removes small hand tremors from your strokes. Unlike StreamLine, it focuses on filtering out jitter rather than smoothing the overall path.",
    location: "Procreate: Tap a brush > Stabilization > Motion Filtering.",
  },
  smoothing: {
    term: "Smoothing",
    definition:
      "Reduces wobble and hand tremor in your brush strokes. Higher values create cleaner lines but with a slight lag as the app corrects your input.",
    location:
      "Fresco: Toolbar > Smoothing slider (when a brush is selected). Procreate: Brush settings > Stabilization.",
  },
  stabilization: {
    term: "Stabilization",
    definition:
      "Software assistance that steadies your hand while drawing. It compensates for natural hand shake to produce cleaner lines.",
    location:
      "Fresco: Smoothing slider in the toolbar. Procreate: Tap any brush > Stabilization section.",
  },
  "blending mode": {
    term: "Blending Mode",
    definition:
      "Controls how a layer's pixels interact with layers below it. For example, 'Multiply' darkens, 'Screen' lightens, and 'Overlay' increases contrast.",
    location:
      "Fresco: Tap a layer > Blending Mode dropdown. Procreate: Tap the 'N' next to the layer name in the Layers panel.",
  },
  multiply: {
    term: "Multiply",
    definition:
      "A blending mode that darkens by combining the layer with what's below it. White disappears, dark colors get darker. Great for shadows.",
    location: "Found in the blending mode menu on any layer.",
  },
  screen: {
    term: "Screen",
    definition:
      "A blending mode that lightens. The opposite of Multiply - black disappears, light colors get brighter. Good for glow and highlights.",
    location: "Found in the blending mode menu on any layer.",
  },
  overlay: {
    term: "Overlay",
    definition:
      "A blending mode that increases contrast by combining Multiply and Screen. Dark areas get darker, light areas get lighter. Useful for adding depth.",
    location: "Found in the blending mode menu on any layer.",
  },
  "soft light": {
    term: "Soft Light",
    definition:
      "A gentler version of Overlay. Subtly shifts colors and contrast without the harsh effect. Good for color grading and atmosphere.",
    location: "Found in the blending mode menu on any layer.",
  },
  "color dodge": {
    term: "Color Dodge",
    definition:
      "A blending mode that brightens the base color to reflect the blend color. Creates vivid, high-contrast highlights. Use sparingly.",
    location: "Found in the blending mode menu on any layer.",
  },
  layer: {
    term: "Layer",
    definition:
      "Think of layers like transparent sheets stacked on top of each other. Each layer holds separate parts of your artwork so you can edit, move, or delete one part without affecting the rest.",
    location:
      "Fresco: Layers panel on the right. Procreate: Tap the two-square icon (top right) to open the Layers panel.",
  },
  "clipping mask": {
    term: "Clipping Mask",
    definition:
      "Makes a layer only visible within the non-transparent areas of the layer directly below it. Paint on the clipping mask layer and it stays within the shape below.",
    location:
      "Fresco: Right-click layer > Create Clipping Mask. Procreate: Tap a layer > Clipping Mask.",
  },
  "alpha lock": {
    term: "Alpha Lock",
    definition:
      "Locks the transparent areas of a layer so you can only paint on pixels that already exist. Useful for recoloring or adding texture to a shape without going outside its edges.",
    location:
      "Procreate: Swipe right with two fingers on a layer, or tap the layer > Alpha Lock. Fresco: Tap the lock icon on a layer (Lock Transparency).",
  },
  opacity: {
    term: "Opacity",
    definition:
      "How see-through something is. 100% opacity = fully solid, 0% = fully transparent. Applies to layers, brushes, and effects.",
    location:
      "Fresco: Layer opacity slider in layer options, brush opacity in the toolbar. Procreate: Layer opacity via the 'N' menu, brush opacity via the left-side slider.",
  },
  "brush opacity": {
    term: "Brush Opacity",
    definition:
      "Controls how transparent each brush stroke is. Lower opacity lets you build up color gradually with multiple strokes.",
    location:
      "Fresco: Opacity slider in the toolbar (below brush size). Procreate: Left side slider (the bottom one).",
  },
  "brush size": {
    term: "Brush Size",
    definition:
      "The diameter of your brush stroke in pixels. Larger = wider strokes, smaller = fine details.",
    location:
      "Fresco: Size slider in the toolbar. Procreate: Left side slider (the top one).",
  },
  tilt: {
    term: "Tilt",
    definition:
      "When you angle your Apple Pencil/stylus, tilt-enabled brushes change their behavior - usually getting wider or changing texture, similar to tilting a real pencil on its side.",
    location:
      "Fresco: Brush Settings > Tilt. Procreate: Individual brush settings > Apple Pencil > Tilt.",
  },
  "gaussian blur": {
    term: "Gaussian Blur",
    definition:
      "A filter that softens/blurs an area evenly in all directions. Named after the mathematician Gauss. Used for soft backgrounds, depth of field, or smoothing.",
    location:
      "Fresco: Filter menu > Blur. Procreate: Adjustments (magic wand icon) > Gaussian Blur, then drag finger left/right to adjust amount.",
  },
  "color balance": {
    term: "Color Balance",
    definition:
      "Adjusts the overall color tone of your artwork by shifting between color pairs (e.g., more blue vs. more yellow). Used to set mood or correct colors.",
    location:
      "Fresco: Adjustments panel. Procreate: Adjustments (magic wand) > Color Balance.",
  },
  "hue saturation": {
    term: "Hue, Saturation, Brightness",
    definition:
      "Three properties of color. Hue = the color itself (red, blue, etc.). Saturation = how vivid vs. gray. Brightness = how light or dark.",
    location:
      "Fresco: Adjustments > Hue/Saturation. Procreate: Adjustments (magic wand) > Hue, Saturation, Brightness.",
  },
  "reference layer": {
    term: "Reference Layer",
    definition:
      "A special layer designation that tells the app to use this layer's contents as a boundary reference for fills and selections, even when painting on other layers.",
    location:
      "Procreate: Tap a layer > Reference. Fresco: Not directly available, use clipping masks instead.",
  },
  "color picker": {
    term: "Color Picker / Eyedropper",
    definition:
      "A tool that samples a color from your canvas so you can paint with that exact color. Tap and hold on the canvas to activate it.",
    location:
      "Fresco: Hold on canvas or use eyedropper tool. Procreate: Hold finger on canvas, or tap and hold the color circle.",
  },
  "quick shape": {
    term: "QuickShape",
    definition:
      "A Procreate feature that auto-corrects your drawn shapes. Draw a line, circle, or rectangle and hold at the end - Procreate snaps it to a perfect geometric shape.",
    location: "Procreate: Draw a shape and hold your pen at the end of the stroke.",
  },
  "live brushes": {
    term: "Live Brushes",
    definition:
      "Adobe Fresco's unique brushes that simulate real paint and watercolor. They blend, bleed, and dry like physical media. Different from pixel or vector brushes.",
    location:
      "Fresco: Tap the brush icon > Live Brushes tab (the water droplet icon).",
  },
  "pixel brushes": {
    term: "Pixel Brushes",
    definition:
      "Standard digital brushes that paint with pixels. They don't simulate real media physics like Live Brushes, but offer more control and variety.",
    location: "Fresco: Tap the brush icon > Pixel Brushes tab (the circle icon).",
  },
  "vector brushes": {
    term: "Vector Brushes",
    definition:
      "Brushes that create scalable, resolution-independent strokes. You can resize them infinitely without quality loss. Best for clean line work.",
    location: "Fresco: Tap the brush icon > Vector Brushes tab (the pen icon).",
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
