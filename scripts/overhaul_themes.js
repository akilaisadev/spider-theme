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
  comment: "#5C6370",
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
  const fg90 = fg + opacities.c90;
  const fg85 = fg + opacities.c85;
  const kw70 = c.keyword + opacities.c70;
  const op55 = c.operator + opacities.c55;
  const punc30 = c.operator + opacities.c30;
  const class95 = c.class + opacities.c95;

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
      "parameter": { "foreground": c.parameter + opacities.c85, "fontStyle": "italic" },
      "variable": fg90,
      "property": fg85,
      "keyword": kw70,
      "string": c.string,
      "number": c.number,
      "operator": op55,
      "comment": { "foreground": c.comment + opacities.c45, "fontStyle": "italic" },
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
      "editorWhitespace.foreground": `${c.comment}20`, // Almost invisible
      "editorIndentGuide.background": `${c.comment}1A`,
      "editorIndentGuide.activeBackground": `${c.comment}60`, // Highlight current indent
      "editorBracketMatch.background": `${c.function}30`,
      "editorBracketMatch.border": `${c.function}80`, // Match scope
      "editorLineNumber.foreground": `${c.comment}4D`,
      "editorLineNumber.activeForeground": fg90,

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
        "settings": { "foreground": c.comment + opacities.c45, "fontStyle": "italic" }
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
        "settings": { "foreground": punc30 }
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
        "settings": { "foreground": c.class + opacities.c85, "fontStyle": "italic" }
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

// 1. Night
generateTheme("Night", "dark", "akyyra-night.json", {
  bg: "#1A1C23", sidebar: "#16181E", activityBar: "#111317", statusBar: "#0E0F12", fg: "#E5E0D8", selection: "#2E3440", lineHighlight: "#21242E"
});

// 2. Midnight
generateTheme("Midnight", "dark", "akyyra-midnight.json", {
  bg: "#111217", sidebar: "#0E0E12", activityBar: "#0A0B0E", statusBar: "#08090C", fg: "#E5E0D8", selection: "#20222B", lineHighlight: "#16181F"
});

// 3. Focus (OLED)
generateTheme("Focus (OLED)", "dark", "akyyra-oled.json", {
  bg: "#000000", sidebar: "#050505", activityBar: "#080808", statusBar: "#0A0A0A", fg: "#C8D0E0", selection: "#1A1A1A", lineHighlight: "#0F0F0F"
});

// 4. Soft
generateTheme("Soft", "dark", "akyyra-soft.json", {
  bg: "#282C34", sidebar: "#21252B", activityBar: "#1E2227", statusBar: "#181A1F", fg: "#ABB2BF", selection: "#3E4451", lineHighlight: "#2F333D"
}, { function: "#56B6C2", string: "#89CA78", class: "#D55FDE", keyword: "#EF596F" });

// 5. High Contrast
generateTheme("High Contrast", "hc-black", "akyyra-high-contrast.json", {
  bg: "#000000", sidebar: "#000000", activityBar: "#000000", statusBar: "#000000", fg: "#FFFFE0", selection: "#333333", lineHighlight: "#111111"
}, { function: "#80C7FF", string: "#A3D98A", class: "#D4A5FF", keyword: "#FF8C9A" });

// 6. Pastel
generateTheme("Pastel", "dark", "akyyra-pastel.json", {
  bg: "#2C313C", sidebar: "#252932", activityBar: "#20232A", statusBar: "#1B1E24", fg: "#D8DEE9", selection: "#404859", lineHighlight: "#363C49"
}, { function: "#7EBDF5", string: "#A9D494", class: "#CFA0E6", keyword: "#E08F96" });

// 7. Neon Cyber
generateTheme("Neon Cyber", "dark", "akyyra-neon.json", {
  bg: "#1E1032", sidebar: "#150A24", activityBar: "#0F071A", statusBar: "#0A0412", fg: "#E5E0D8", selection: "#3D2466", lineHighlight: "#2B1747"
}, { function: "#00FFD1", string: "#39FF14", class: "#BF00FF", keyword: "#FF0055" });

// 8. Galaxy
generateTheme("Galaxy", "dark", "akyyra-galaxy.json", {
  bg: "#0F1423", sidebar: "#0A0D17", activityBar: "#070A12", statusBar: "#05070D", fg: "#D8DEE9", selection: "#212A45", lineHighlight: "#161D33"
}, { function: "#64B5F6", string: "#81C784", class: "#BA68C8", keyword: "#E57373" });

// 9. Spider
generateTheme("Spider", "dark", "akyyra-spiderman.json", {
  bg: "#1A1515", sidebar: "#120E0E", activityBar: "#0D0A0A", statusBar: "#080606", fg: "#E5E0D8", selection: "#3D2727", lineHighlight: "#241818"
}, { function: "#4DB8B8", string: "#89C9A1", class: "#D48B8B", keyword: "#E25A5A" });

// 10. Dark Knight
generateTheme("Dark Knight", "dark", "akyyra-batman.json", {
  bg: "#17181A", sidebar: "#101112", activityBar: "#0B0B0C", statusBar: "#050506", fg: "#C9CBD0", selection: "#2C2E33", lineHighlight: "#1C1D20"
}, { function: "#9397A1", string: "#828994", class: "#A7AAB3", keyword: "#E5C07B" });

console.log("All themes regenerated with Cognitive Minimalism and UI Depth.");
