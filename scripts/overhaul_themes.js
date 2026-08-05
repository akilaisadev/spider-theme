const fs = require('fs');
const path = require('path');

const themesDir = path.join(__dirname, '..', 'themes');

// Base Ergonomic Syntax Colors (Cognitive Minimalism)
const syntaxColors = {
  class: "#C678DD",
  type: "#C678DD",
  interface: "#C678DD",
  enum: "#E5C07B",
  function: "#61AFEF",
  parameter: "#56B6C2",
  variable: "#E5E0D8", // Default FG, will override per theme
  property: "#E5E0D8",
  mutable: "#D19A66",
  readonly: "#E5C07B",
  keyword: "#E06C75",
  string: "#98C379",
  number: "#D19A66",
  operator: "#ABB2BF", // Base operator color
  comment: "#8B95A5", // Greatly brightened for eye comfort (was #5C6370)
  decorator: "#C678DD",
  namespace: "#56B6C2",
  error: "#E06C75",
  warning: "#E5C07B",
  info: "#56B6C2",
  success: "#98C379"
};

// Adaptive Comment Colors
const commentColors = {
  todo: "#D19A66",   // Orange
  fixme: "#E06C75",  // Red
  note: "#61AFEF",   // Blue
  warning: "#E5C07B",// Yellow
  hack: "#C678DD"    // Purple
};

function generateTheme(name, type, file, bgColors, overrideSyntax = {}) {
  const c = { ...syntaxColors, ...overrideSyntax };
  
  // Semantic Brightness/Opacity Rules
  const opacities = {
    c100: "",    // 100%
    c95: "F2",   // 95%
    c90: "E6",   // 90%
    c85: "D9",   // 85%
    c70: "B3",   // 70%
    c55: "8C",   // 55%
    c45: "73",   // 45%
    c30: "4D",   // 30%
    c10: "1A",   // 10%
  };

  // Depth UI Cascading Backgrounds
  const bg = bgColors.bg;
  const sidebar = bgColors.sidebar;
  const activityBar = bgColors.activityBar;
  const statusBar = bgColors.statusBar;
  const fg = bgColors.fg;
  const selection = bgColors.selection;
  const lineHighlight = bgColors.lineHighlight;
  
  // Base Opacity Adjustments
  const fg90 = fg; // Full opacity for crisp font rendering and high contrast
  const fg85 = fg;
  const kw70 = c.keyword; // Full opacity for keywords to maintain WCAG contrast
  const op55 = c.operator + opacities.c85; // Bumping operator opacity from 55% to 85% for clear punctuation
  const punc85 = c.operator + opacities.c85; 
  const class95 = c.class;

  const themeObj = {
    name: name,
    type: type,
    semanticHighlighting: true,
    semanticTokenColors: {
      "class": class95,
      "class.declaration": { "foreground": class95, "fontStyle": "bold" },
      "type": class95,
      "interface": { "foreground": class95, "fontStyle": "italic" },
      "enum": c.enum,
      "function": c.function,
      "method": c.function,
      "parameter": { "foreground": c.parameter, "fontStyle": "italic" },
      "variable": fg90,
      "property": fg85,
      "keyword": kw70,
      "string": c.string,
      "number": c.number,
      "operator": op55,
      "comment": { "foreground": c.comment, "fontStyle": "italic" },
      "decorator": c.decorator,
      "namespace": c.namespace,
      "*.mutable": c.mutable
    },
    colors: {
      "focusBorder": `${c.function}40`,
      "foreground": fg90,
      "widget.shadow": "#00000080",
      
      // Editor
      "editor.background": bg,
      "editor.foreground": fg,
      "editor.lineHighlightBackground": lineHighlight,
      "editor.selectionBackground": selection,
      "editor.inactiveSelectionBackground": `${selection}80`,
      "editor.selectionHighlightBackground": `${selection}A0`,
      "editor.wordHighlightBackground": `${selection}A0`,
      "editor.wordHighlightStrongBackground": `${c.function}30`,
      
      // Better Search
      "editor.findMatchBackground": `${c.warning}80`, // Bold glowing yellow
      "editor.findMatchHighlightBackground": `${c.warning}30`, // Faded soft yellow
      "editor.findRangeHighlightBackground": `${c.warning}1A`,
      
      // Focus Cursor & Noise Reduction
      "editorCursor.foreground": c.function,
      "editorWhitespace.foreground": `${c.comment}60`, // Bumping opacity so it's clearly visible without straining
      "editorIndentGuide.background": `${c.comment}40`, // Made indent guides more visible
      "editorIndentGuide.activeBackground": `${c.comment}90`, // Highly visible active indent
      "editorBracketMatch.background": `${c.function}40`,
      "editorBracketMatch.border": `${c.function}A0`, // Stronger bracket match visibility
      "editorLineNumber.foreground": `${c.comment}90`, // Extremely legible line numbers
      "editorLineNumber.activeForeground": fg, // 100% foreground brightness for active line

      // Better Diff Theme
      "diffEditor.insertedTextBackground": `${c.success}1A`, // Subtle green bg
      "diffEditor.removedTextBackground": `${c.error}1A`,    // Subtle red bg
      "diffEditor.insertedLineBackground": `${c.success}10`,
      "diffEditor.removedLineBackground": `${c.error}10`,
      "diffEditor.diagonalFill": `${c.comment}40`,

      // UI Depth
      "sideBar.background": sidebar,
      "sideBar.foreground": fg85,
      "sideBar.border": sidebar,
      "sideBarSectionHeader.background": sidebar,
      
      "activityBar.background": activityBar,
      "activityBar.foreground": c.function,
      "activityBar.inactiveForeground": `${c.comment}73`,
      "activityBar.border": activityBar,
      
      "statusBar.background": statusBar,
      "statusBar.foreground": fg85,
      "statusBar.border": statusBar,
      "statusBar.noFolderBackground": statusBar,
      "statusBar.debuggingBackground": `${c.warning}40`,

      "editorGroupHeader.tabsBackground": sidebar,
      "tab.activeBackground": bg,
      "tab.inactiveBackground": sidebar,
      "panel.background": bg,

      // Terminal Matching
      "terminal.background": bg,
      "terminal.foreground": fg,
      "terminal.ansiBlack": activityBar,
      "terminal.ansiRed": c.error,
      "terminal.ansiGreen": c.success,
      "terminal.ansiYellow": c.warning,
      "terminal.ansiBlue": c.function,
      "terminal.ansiMagenta": c.class,
      "terminal.ansiCyan": c.info,
      "terminal.ansiWhite": fg,
      "terminal.ansiBrightBlack": c.comment,
      "terminal.ansiBrightRed": c.error,
      "terminal.ansiBrightGreen": c.success,
      "terminal.ansiBrightYellow": c.warning,
      "terminal.ansiBrightBlue": c.function,
      "terminal.ansiBrightMagenta": c.class,
      "terminal.ansiBrightCyan": c.parameter,
      "terminal.ansiBrightWhite": "#FFFFFF",
      
      "gitDecoration.addedResourceForeground": c.success,
      "gitDecoration.modifiedResourceForeground": c.function,
      "gitDecoration.deletedResourceForeground": c.error,
      "gitDecoration.untrackedResourceForeground": c.info,
      "gitDecoration.conflictingResourceForeground": c.class,
      "gitDecoration.ignoredResourceForeground": `${c.comment}73`
    },
    tokenColors: [
      {
        "name": "Comments",
        "scope": ["comment", "punctuation.definition.comment"],
        "settings": { "foreground": c.comment, "fontStyle": "italic" }
      },
      // Adaptive Comments
      {
        "name": "Comment TODO",
        "scope": ["comment.keyword.todo", "comment.line.todo"],
        "settings": { "foreground": commentColors.todo, "fontStyle": "bold" }
      },
      {
        "name": "Comment FIXME",
        "scope": ["comment.keyword.fixme", "comment.line.fixme"],
        "settings": { "foreground": commentColors.fixme, "fontStyle": "bold underline" }
      },
      {
        "name": "Comment NOTE",
        "scope": ["comment.keyword.note", "comment.line.note"],
        "settings": { "foreground": commentColors.note, "fontStyle": "bold" }
      },
      {
        "name": "Comment WARNING",
        "scope": ["comment.keyword.warning", "comment.line.warning"],
        "settings": { "foreground": commentColors.warning, "fontStyle": "bold" }
      },
      {
        "name": "Comment HACK",
        "scope": ["comment.keyword.hack", "comment.line.hack"],
        "settings": { "foreground": commentColors.hack, "fontStyle": "bold" }
      },
      // Minimal Noise Punctuation
      {
        "name": "Punctuation & Noise",
        "scope": ["punctuation", "meta.brace", "meta.delimiter", "keyword.operator"],
        "settings": { "foreground": punc85 }
      },
      {
        "name": "Keywords",
        "scope": ["keyword", "storage", "variable.language"],
        "settings": { "foreground": kw70 }
      },
      {
        "name": "Functions",
        "scope": ["entity.name.function", "meta.function-call"],
        "settings": { "foreground": c.function }
      },
      {
        "name": "Classes/Types",
        "scope": ["entity.name.type", "entity.name.class", "support.class"],
        "settings": { "foreground": class95 }
      },
      {
        "name": "Variables",
        "scope": ["variable"],
        "settings": { "foreground": fg90 }
      },
      {
        "name": "Strings",
        "scope": ["string"],
        "settings": { "foreground": c.string }
      },
      {
        "name": "Numbers",
        "scope": ["constant.numeric"],
        "settings": { "foreground": c.number }
      },
      // Better Markdown
      {
        "name": "Markdown Headers",
        "scope": ["markup.heading", "entity.name.section.markdown"],
        "settings": { "foreground": c.function, "fontStyle": "bold" }
      },
      {
        "name": "Markdown Blockquote",
        "scope": ["markup.quote"],
        "settings": { "foreground": c.class, "fontStyle": "italic" }
      },
      // Language Micro-optimizations
      {
        "name": "React JSX Tags",
        "scope": ["entity.name.tag.js", "entity.name.tag.tsx"],
        "settings": { "foreground": kw70 }
      },
      {
        "name": "Python Decorators",
        "scope": ["meta.function.decorator.python"],
        "settings": { "foreground": c.decorator, "fontStyle": "italic" }
      },
      {
        "name": "Rust Lifetimes",
        "scope": ["entity.name.type.lifetime.rust"],
        "settings": { "foreground": c.warning, "fontStyle": "italic" }
      },
      {
        "name": "Kotlin Extension Functions",
        "scope": ["entity.name.function.extension.kotlin"],
        "settings": { "foreground": c.info, "fontStyle": "bold" }
      }
    ]
  };

  fs.writeFileSync(path.join(themesDir, file), JSON.stringify(themeObj, null, 2));
}

// 1. Symbiote
generateTheme("Symbiote", "dark", "symbiote.json", {
  bg: "#1A1C23", sidebar: "#16181E", activityBar: "#111317", statusBar: "#0E0F12", fg: "#E5E5E5", selection: "#2E3440", lineHighlight: "#21242E"
}, { function: "#00F5D4", keyword: "#F15BB5", class: "#F15BB5", string: "#89FC00", variable: "#E5E5E5", comment: "#8D93AB" });

// 2. Absolute Carnage
generateTheme("Absolute Carnage", "dark", "absolute-carnage.json", {
  bg: "#111217", sidebar: "#0E0E12", activityBar: "#0A0B0E", statusBar: "#08090C", fg: "#CED4DA", selection: "#20222B", lineHighlight: "#16181F"
}, { function: "#FFFFFF", keyword: "#FF4D4D", class: "#E63946", string: "#E85D04", variable: "#CED4DA", comment: "#A288A6" });

// 3. Brooklyn Anomaly
generateTheme("Brooklyn Anomaly", "dark", "brooklyn-anomaly.json", {
  bg: "#000000", sidebar: "#050505", activityBar: "#080808", statusBar: "#0A0A0A", fg: "#FFFFFF", selection: "#1A1A1A", lineHighlight: "#0F0F0F"
}, { function: "#4CC9F0", keyword: "#F72585", class: "#E056FD", string: "#FEE440", variable: "#FFFFFF", comment: "#9EA7B0" });

// 4. Phantom Web
generateTheme("Phantom Web", "dark", "phantom-web.json", {
  bg: "#282C34", sidebar: "#21252B", activityBar: "#1E2227", statusBar: "#181A1F", fg: "#DFE0DF", selection: "#3E4451", lineHighlight: "#2F333D"
}, { function: "#A0E1E5", keyword: "#FFA6C9", class: "#FBE7C6", string: "#B4F8C8", variable: "#DFE0DF", comment: "#A6B1E1" });

// 5. Noir Detective
generateTheme("Noir Detective", "hc-black", "noir-detective.json", {
  bg: "#000000", sidebar: "#000000", activityBar: "#000000", statusBar: "#000000", fg: "#E9ECEF", selection: "#333333", lineHighlight: "#111111"
}, { function: "#F8F9FA", keyword: "#ADB5BD", class: "#CED4DA", string: "#D4A373", variable: "#E9ECEF", comment: "#8C96A0" });

// 6. Emerald Menace
generateTheme("Emerald Menace", "dark", "emerald-menace.json", {
  bg: "#2C313C", sidebar: "#252932", activityBar: "#20232A", statusBar: "#1B1E24", fg: "#F8F9FA", selection: "#404859", lineHighlight: "#363C49"
}, { function: "#38D9A9", keyword: "#52B788", class: "#7088FF", string: "#F48C06", variable: "#F8F9FA", comment: "#9AA5B9" });

// 7. Year 2099
generateTheme("Year 2099", "dark", "year-2099.json", {
  bg: "#1E1032", sidebar: "#150A24", activityBar: "#0F071A", statusBar: "#0A0412", fg: "#E0E1E3", selection: "#3D2466", lineHighlight: "#2B1747"
}, { function: "#00FFFF", keyword: "#FF3366", class: "#00FFFF", string: "#FAED26", variable: "#E0E1E3", comment: "#8C9BB0" });

// 8. Superior
generateTheme("Superior", "dark", "superior.json", {
  bg: "#0F1423", sidebar: "#0A0D17", activityBar: "#070A12", statusBar: "#05070D", fg: "#FDFCDC", selection: "#212A45", lineHighlight: "#161D33"
}, { function: "#C0C0C0", keyword: "#FF4D5D", class: "#0A9396", string: "#EE9B00", variable: "#FDFCDC", comment: "#979DAC" });

// 9. Arachnid
generateTheme("Arachnid", "dark", "arachnid.json", {
  bg: "#1A1515", sidebar: "#120E0E", activityBar: "#0D0A0A", statusBar: "#080606", fg: "#F8F9FA", selection: "#3D2727", lineHighlight: "#241818"
}, { function: "#00B4D8", keyword: "#E63946", class: "#E63946", string: "#E9C46A", variable: "#F8F9FA", comment: "#8E98AD" });

// 10. The Syndicate
generateTheme("The Syndicate", "dark", "the-syndicate.json", {
  bg: "#17181A", sidebar: "#101112", activityBar: "#0B0B0C", statusBar: "#050506", fg: "#FFFFFF", selection: "#2C2E33", lineHighlight: "#1C1D20"
}, { function: "#E0FBFC", keyword: "#FFFFFF", class: "#98C1D9", string: "#E5E5E5", variable: "#FFFFFF", comment: "#7A9CC6" });

console.log("All 10 uniquely engineered psychological themes generated successfully.");
