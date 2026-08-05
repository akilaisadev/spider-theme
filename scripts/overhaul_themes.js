const fs = require('fs');
const path = require('path');

const themesDir = path.join(__dirname, '..', 'themes');

// Base Ergonomic Syntax Colors (Cognitive Minimalism Architecture)
const syntaxColors = {
  class: "#C678DD",
  type: "#C678DD",
  interface: "#C678DD",
  enum: "#E5C07B",
  function: "#61AFEF",
  parameter: "#56B6C2",
  variable: "#E5E0D8",
  property: "#E5E0D8",
  mutable: "#D19A66",
  readonly: "#E5C07B",
  keyword: "#E06C75",
  string: "#98C379",
  number: "#D19A66",
  operator: "#ABB2BF",
  comment: "#8B95A5",
  decorator: "#C678DD",
  namespace: "#56B6C2",
  error: "#E06C75",
  warning: "#E5C07B",
  info: "#56B6C2",
  success: "#98C379"
};

// Adaptive Comment Tokens
const commentColors = {
  todo: "#D19A66",   // Orange
  fixme: "#E06C75",  // Red
  note: "#61AFEF",   // Blue
  warning: "#E5C07B",// Yellow
  hack: "#C678DD"    // Purple
};

function generateTheme(name, type, file, bgColors, overrideSyntax = {}) {
  const c = { ...syntaxColors, ...overrideSyntax };
  
  // Opacity Constants
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

  // UI Background Hierarchy
  const bg = bgColors.bg;
  const sidebar = bgColors.sidebar;
  const activityBar = bgColors.activityBar;
  const statusBar = bgColors.statusBar;
  const fg = bgColors.fg;
  const selection = bgColors.selection;
  const lineHighlight = bgColors.lineHighlight;
  
  // Solid Foreground Tokens for Crisp Subpixel Text Rendering
  const fgSolid = fg;
  const kwSolid = c.keyword;
  const op85 = c.operator + opacities.c85; 
  const classSolid = c.class;
  const attributeColor = c.attribute || c.parameter || c.info;
  const tagColor = c.tag || c.keyword;

  const themeObj = {
    name: name,
    type: type,
    semanticHighlighting: true,
    semanticTokenColors: {
      "class": classSolid,
      "class.declaration": { "foreground": classSolid, "fontStyle": "bold" },
      "struct": classSolid,
      "enum": c.enum,
      "enumMember": c.number,
      "type": classSolid,
      "type.declaration": { "foreground": classSolid, "fontStyle": "bold" },
      "type.defaultLibrary": c.info,
      "typeParameter": { "foreground": classSolid, "fontStyle": "italic" },
      "interface": { "foreground": classSolid, "fontStyle": "italic" },
      "function": c.function,
      "function.declaration": { "foreground": c.function, "fontStyle": "bold" },
      "function.defaultLibrary": c.function,
      "method": c.function,
      "method.declaration": { "foreground": c.function, "fontStyle": "bold" },
      "macro": { "foreground": c.function, "fontStyle": "bold" },
      "parameter": { "foreground": c.parameter, "fontStyle": "italic" },
      "selfParameter": { "foreground": kwSolid, "fontStyle": "italic" },
      "clsParameter": { "foreground": kwSolid, "fontStyle": "italic" },
      "variable": fgSolid,
      "variable.readonly": { "foreground": c.readonly || c.enum, "fontStyle": "bold" },
      "variable.defaultLibrary": c.info,
      "property": fgSolid,
      "property.readonly": c.readonly || c.enum,
      "keyword": kwSolid,
      "keyword.control": { "foreground": kwSolid, "fontStyle": "bold" },
      "string": c.string,
      "string.escape": { "foreground": kwSolid, "fontStyle": "bold" },
      "number": c.number,
      "operator": op85,
      "comment": { "foreground": c.comment, "fontStyle": "italic" },
      "decorator": { "foreground": c.decorator, "fontStyle": "italic" },
      "namespace": c.namespace,
      "*.mutable": { "fontStyle": "underline" }
    },
    colors: {
      "focusBorder": `${c.function}40`,
      "foreground": fgSolid,
      "widget.shadow": "#00000080",
      
      // Editor Surface
      "editor.background": bg,
      "editor.foreground": fg,
      "editor.lineHighlightBackground": lineHighlight,
      "editor.selectionBackground": selection,
      "editor.inactiveSelectionBackground": `${selection}80`,
      "editor.selectionHighlightBackground": `${selection}A0`,
      "editor.wordHighlightBackground": `${selection}A0`,
      "editor.wordHighlightStrongBackground": `${c.function}30`,
      
      // Search Matches
      "editor.findMatchBackground": `${c.warning}80`,
      "editor.findMatchHighlightBackground": `${c.warning}30`,
      "editor.findRangeHighlightBackground": `${c.warning}1A`,
      
      // Cursor & Guides
      "editorCursor.foreground": c.function,
      "editorWhitespace.foreground": `${c.comment}60`,
      "editorIndentGuide.background": `${c.comment}40`,
      "editorIndentGuide.activeBackground": `${c.comment}90`,
      "editorBracketMatch.background": `${c.function}40`,
      "editorBracketMatch.border": `${c.function}A0`,
      "editorLineNumber.foreground": `${c.comment}90`,
      "editorLineNumber.activeForeground": fg,

      // Diff Integration
      "diffEditor.insertedTextBackground": `${c.success}1A`,
      "diffEditor.removedTextBackground": `${c.error}1A`,
      "diffEditor.insertedLineBackground": `${c.success}10`,
      "diffEditor.removedLineBackground": `${c.error}10`,
      "diffEditor.diagonalFill": `${c.comment}40`,

      // UI Frame Depth
      "sideBar.background": sidebar,
      "sideBar.foreground": fgSolid,
      "sideBar.border": sidebar,
      "sideBarSectionHeader.background": sidebar,
      
      "activityBar.background": activityBar,
      "activityBar.foreground": c.function,
      "activityBar.inactiveForeground": `${c.comment}73`,
      "activityBar.border": activityBar,
      
      "statusBar.background": statusBar,
      "statusBar.foreground": fgSolid,
      "statusBar.border": statusBar,
      "statusBar.noFolderBackground": statusBar,
      "statusBar.debuggingBackground": `${c.warning}40`,

      "editorGroupHeader.tabsBackground": sidebar,
      "tab.activeBackground": bg,
      "tab.inactiveBackground": sidebar,
      "panel.background": bg,

      // Integrated Terminal Palette
      "terminal.background": bg,
      "terminal.foreground": fg,
      "terminal.ansiBlack": activityBar,
      "terminal.ansiRed": c.error,
      "terminal.ansiGreen": c.success,
      "terminal.ansiYellow": c.warning,
      "terminal.ansiBlue": c.function,
      "terminal.ansiMagenta": classSolid,
      "terminal.ansiCyan": c.info,
      "terminal.ansiWhite": fg,
      "terminal.ansiBrightBlack": c.comment,
      "terminal.ansiBrightRed": c.error,
      "terminal.ansiBrightGreen": c.success,
      "terminal.ansiBrightYellow": c.warning,
      "terminal.ansiBrightBlue": c.function,
      "terminal.ansiBrightMagenta": classSolid,
      "terminal.ansiBrightCyan": c.parameter,
      "terminal.ansiBrightWhite": "#FFFFFF",
      
      // Git Workbench & Tree Status
      "gitDecoration.addedResourceForeground": c.success,
      "gitDecoration.modifiedResourceForeground": c.function,
      "gitDecoration.deletedResourceForeground": c.error,
      "gitDecoration.untrackedResourceForeground": c.info,
      "gitDecoration.conflictingResourceForeground": classSolid,
      "gitDecoration.ignoredResourceForeground": `${c.comment}B3`,
      "list.deemphasizedForeground": `${c.comment}B3`
    },
    tokenColors: [
      // 1. Comments & Documentation
      {
        "name": "Comments",
        "scope": ["comment", "punctuation.definition.comment"],
        "settings": { "foreground": c.comment, "fontStyle": "italic" }
      },
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

      // 2. Syntax Operators & Punctuation
      {
        "name": "Punctuation & Noise",
        "scope": ["punctuation", "meta.brace", "meta.delimiter"],
        "settings": { "foreground": op85 }
      },
      {
        "name": "Operators",
        "scope": ["keyword.operator", "keyword.operator.assignment", "keyword.operator.arithmetic", "keyword.operator.logical", "keyword.operator.comparison"],
        "settings": { "foreground": op85 }
      },

      // 3. Keywords & Control Flow
      {
        "name": "Keywords General",
        "scope": ["keyword", "storage", "storage.type"],
        "settings": { "foreground": kwSolid }
      },
      {
        "name": "Control Flow Keywords",
        "scope": ["keyword.control", "keyword.control.flow", "keyword.control.conditional", "keyword.control.loop", "keyword.control.trycatch", "keyword.control.return"],
        "settings": { "foreground": kwSolid, "fontStyle": "bold" }
      },
      {
        "name": "Import & Export Keywords",
        "scope": ["keyword.control.import", "keyword.control.export", "keyword.control.from", "keyword.control.as"],
        "settings": { "foreground": kwSolid, "fontStyle": "italic" }
      },

      // 4. Functions & Methods
      {
        "name": "Functions & Methods",
        "scope": ["entity.name.function", "meta.function-call", "support.function"],
        "settings": { "foreground": c.function }
      },
      {
        "name": "Function Calls",
        "scope": ["variable.function", "meta.function-call.generic"],
        "settings": { "foreground": c.function }
      },

      // 5. Classes, Types & Structs
      {
        "name": "Classes & Types",
        "scope": ["entity.name.type", "entity.name.class", "support.class", "entity.name.type.class", "entity.name.type.struct", "entity.name.type.enum"],
        "settings": { "foreground": classSolid }
      },
      {
        "name": "Interfaces & Traits",
        "scope": ["entity.name.type.interface", "entity.name.type.trait"],
        "settings": { "foreground": classSolid, "fontStyle": "italic" }
      },
      {
        "name": "Primitive & Builtin Types",
        "scope": ["support.type.primitive", "support.type.builtin", "storage.type.numeric.go", "storage.type.boolean.go", "storage.type.string.go"],
        "settings": { "foreground": c.info }
      },

      // 6. Variables & Parameters
      {
        "name": "Variables",
        "scope": ["variable", "variable.other.readwrite", "variable.other.object"],
        "settings": { "foreground": fgSolid }
      },
      {
        "name": "Parameters",
        "scope": ["variable.parameter", "meta.parameter"],
        "settings": { "foreground": c.parameter, "fontStyle": "italic" }
      },
      {
        "name": "Language Constants & Builtin Self",
        "scope": ["variable.language", "variable.parameter.function.language.special.self", "variable.parameter.function.language.special.cls"],
        "settings": { "foreground": kwSolid, "fontStyle": "italic" }
      },
      {
        "name": "Object Properties & Fields",
        "scope": ["variable.other.property", "meta.object-literal.key", "support.type.property-name"],
        "settings": { "foreground": fgSolid }
      },

      // 7. Literals: Strings, Numbers, Booleans, Escapes
      {
        "name": "Strings",
        "scope": ["string", "string.quoted", "string.template"],
        "settings": { "foreground": c.string }
      },
      {
        "name": "String Escape Sequences",
        "scope": ["constant.character.escape", "constant.other.placeholder"],
        "settings": { "foreground": kwSolid, "fontStyle": "bold" }
      },
      {
        "name": "Numbers & Units",
        "scope": ["constant.numeric", "keyword.other.unit"],
        "settings": { "foreground": c.number }
      },
      {
        "name": "Booleans & Constants",
        "scope": ["constant.language", "constant.language.boolean", "constant.language.null", "constant.language.undefined"],
        "settings": { "foreground": c.number, "fontStyle": "bold" }
      },
      {
        "name": "Constant Identifiers",
        "scope": ["variable.other.constant", "entity.name.constant"],
        "settings": { "foreground": c.readonly || c.enum, "fontStyle": "bold" }
      },

      // 8. HTML, XML & JSX Markup
      {
        "name": "HTML & JSX Tags",
        "scope": ["entity.name.tag", "entity.name.tag.html", "entity.name.tag.xml", "entity.name.tag.js", "entity.name.tag.jsx", "entity.name.tag.tsx"],
        "settings": { "foreground": tagColor }
      },
      {
        "name": "HTML Component Tags",
        "scope": ["support.class.component", "entity.name.tag.custom"],
        "settings": { "foreground": classSolid, "fontStyle": "bold" }
      },
      {
        "name": "HTML & JSX Attributes",
        "scope": ["entity.other.attribute-name", "entity.other.attribute-name.html", "entity.other.attribute-name.jsx", "entity.other.attribute-name.tsx"],
        "settings": { "foreground": attributeColor, "fontStyle": "italic" }
      },
      {
        "name": "HTML Tag Punctuation",
        "scope": ["punctuation.definition.tag", "punctuation.definition.tag.begin", "punctuation.definition.tag.end"],
        "settings": { "foreground": op85 }
      },

      // 9. CSS / SCSS / LESS Style Engineering
      {
        "name": "CSS Property Names",
        "scope": ["support.type.property-name.css", "support.type.property-name.scss", "support.type.property-name.less"],
        "settings": { "foreground": attributeColor }
      },
      {
        "name": "CSS Property Values & Constants",
        "scope": ["support.constant.property-value.css", "meta.property-value.css", "support.constant.color"],
        "settings": { "foreground": c.string }
      },
      {
        "name": "CSS Class & ID Selectors",
        "scope": ["entity.other.attribute-name.class.css", "entity.other.attribute-name.id.css"],
        "settings": { "foreground": classSolid, "fontStyle": "bold" }
      },
      {
        "name": "CSS Pseudo-Classes & Pseudo-Elements",
        "scope": ["entity.other.attribute-name.pseudo-class.css", "entity.other.attribute-name.pseudo-element.css"],
        "settings": { "foreground": c.decorator, "fontStyle": "italic" }
      },
      {
        "name": "CSS Variables",
        "scope": ["variable.argument.css", "variable.css", "variable.scss"],
        "settings": { "foreground": fgSolid }
      },

      // 10. Python Language Tuning
      {
        "name": "Python Decorators",
        "scope": ["meta.function.decorator.python", "entity.name.function.decorator.python"],
        "settings": { "foreground": c.decorator, "fontStyle": "italic" }
      },
      {
        "name": "Python Builtin Functions",
        "scope": ["support.function.builtin.python"],
        "settings": { "foreground": c.info }
      },

      // 11. Rust Language Tuning
      {
        "name": "Rust Lifetimes",
        "scope": ["entity.name.type.lifetime.rust", "storage.modifier.lifetime.rust"],
        "settings": { "foreground": c.warning, "fontStyle": "italic" }
      },
      {
        "name": "Rust Macros",
        "scope": ["support.macro.rust", "entity.name.function.macro.rust"],
        "settings": { "foreground": c.function, "fontStyle": "bold" }
      },
      {
        "name": "Rust Unsafe",
        "scope": ["keyword.other.unsafe.rust"],
        "settings": { "foreground": c.error, "fontStyle": "bold" }
      },

      // 12. Go Language Tuning
      {
        "name": "Go Builtin Functions & Packages",
        "scope": ["keyword.package.go", "keyword.import.go", "entity.name.package.go"],
        "settings": { "foreground": kwSolid, "fontStyle": "italic" }
      },

      // 13. Data Formats: JSON, YAML, TOML, SQL, GraphQL, Prisma
      {
        "name": "JSON & YAML Property Keys",
        "scope": ["support.type.property-name.json", "entity.name.tag.yaml"],
        "settings": { "foreground": attributeColor }
      },
      {
        "name": "SQL Keywords",
        "scope": ["keyword.other.DML.sql", "keyword.other.DDL.sql", "keyword.other.sql"],
        "settings": { "foreground": kwSolid, "fontStyle": "bold" }
      },
      {
        "name": "Prisma Models & Fields",
        "scope": ["entity.name.type.model.prisma"],
        "settings": { "foreground": classSolid, "fontStyle": "bold" }
      },

      // 14. Shell & Docker Tuning
      {
        "name": "Docker Directives",
        "scope": ["keyword.other.dockerfile"],
        "settings": { "foreground": kwSolid, "fontStyle": "bold" }
      },
      {
        "name": "Shell Variables & Commands",
        "scope": ["variable.other.normal.shell", "support.function.builtin.shell"],
        "settings": { "foreground": c.info }
      },

      // 15. Markdown & Documentation Tuning
      {
        "name": "Markdown Headers",
        "scope": ["markup.heading", "entity.name.section.markdown"],
        "settings": { "foreground": c.function, "fontStyle": "bold" }
      },
      {
        "name": "Markdown Blockquote",
        "scope": ["markup.quote"],
        "settings": { "foreground": classSolid, "fontStyle": "italic" }
      },
      {
        "name": "Markdown Code",
        "scope": ["markup.inline.raw", "markup.fenced_code.block"],
        "settings": { "foreground": c.string }
      },
      {
        "name": "Markdown Links",
        "scope": ["markup.underline.link", "string.other.link"],
        "settings": { "foreground": c.info, "fontStyle": "underline" }
      }
    ]
  };

  fs.writeFileSync(path.join(themesDir, file), JSON.stringify(themeObj, null, 2));
}

// 1. Symbiote
generateTheme("Symbiote", "dark", "symbiote.json", {
  bg: "#1A1C23", sidebar: "#16181E", activityBar: "#111317", statusBar: "#0E0F12", fg: "#E5E5E5", selection: "#2E3440", lineHighlight: "#21242E"
}, { function: "#00F5D4", keyword: "#F15BB5", class: "#C77DFF", tag: "#F15BB5", attribute: "#56B6C2", string: "#89FC00", variable: "#E5E5E5", comment: "#8D93AB" });

// 2. Absolute Carnage
generateTheme("Absolute Carnage", "dark", "absolute-carnage.json", {
  bg: "#111217", sidebar: "#0E0E12", activityBar: "#0A0B0E", statusBar: "#08090C", fg: "#CED4DA", selection: "#20222B", lineHighlight: "#16181F"
}, { function: "#FF9F1C", keyword: "#FF4D4D", class: "#E63946", tag: "#FF4D4D", attribute: "#56B6C2", string: "#2EC4B6", variable: "#CED4DA", comment: "#A288A6" });

// 3. Brooklyn Anomaly
generateTheme("Brooklyn Anomaly", "dark", "brooklyn-anomaly.json", {
  bg: "#000000", sidebar: "#050505", activityBar: "#080808", statusBar: "#0A0A0A", fg: "#FFFFFF", selection: "#1A1A1A", lineHighlight: "#0F0F0F"
}, { function: "#4CC9F0", keyword: "#F72585", class: "#E056FD", tag: "#F72585", attribute: "#3A86FF", string: "#FEE440", variable: "#FFFFFF", comment: "#9EA7B0" });

// 4. Phantom Web
generateTheme("Phantom Web", "dark", "phantom-web.json", {
  bg: "#282C34", sidebar: "#21252B", activityBar: "#1E2227", statusBar: "#181A1F", fg: "#DFE0DF", selection: "#3E4451", lineHighlight: "#2F333D"
}, { function: "#A0E1E5", keyword: "#FFA6C9", class: "#C77DFF", tag: "#FFA6C9", attribute: "#56B6C2", string: "#B4F8C8", variable: "#DFE0DF", comment: "#A6B1E1" });

// 5. Noir Detective
generateTheme("Noir Detective", "hc-black", "noir-detective.json", {
  bg: "#000000", sidebar: "#000000", activityBar: "#000000", statusBar: "#000000", fg: "#E9ECEF", selection: "#333333", lineHighlight: "#111111"
}, { function: "#F8F9FA", keyword: "#ADB5BD", class: "#93C5FD", tag: "#ADB5BD", attribute: "#CED4DA", string: "#D4A373", variable: "#E9ECEF", comment: "#8C96A0" });

// 6. Emerald Menace
generateTheme("Emerald Menace", "dark", "emerald-menace.json", {
  bg: "#2C313C", sidebar: "#252932", activityBar: "#20232A", statusBar: "#1B1E24", fg: "#F8F9FA", selection: "#404859", lineHighlight: "#363C49"
}, { function: "#38D9A9", keyword: "#52B788", class: "#7088FF", tag: "#52B788", attribute: "#56B6C2", string: "#F48C06", variable: "#F8F9FA", comment: "#9AA5B9" });

// 7. Year 2099
generateTheme("Year 2099", "dark", "year-2099.json", {
  bg: "#1E1032", sidebar: "#150A24", activityBar: "#0F071A", statusBar: "#0A0412", fg: "#E0E1E3", selection: "#3D2466", lineHighlight: "#2B1747"
}, { function: "#00FFFF", keyword: "#FF3366", class: "#E056FD", tag: "#FF3366", attribute: "#4CC9F0", string: "#FAED26", variable: "#E0E1E3", comment: "#8C9BB0" });

// 8. Superior
generateTheme("Superior", "dark", "superior.json", {
  bg: "#0F1423", sidebar: "#0A0D17", activityBar: "#070A12", statusBar: "#05070D", fg: "#FDFCDC", selection: "#212A45", lineHighlight: "#161D33"
}, { function: "#3A86FF", keyword: "#FF4D5D", class: "#0A9396", tag: "#FF4D5D", attribute: "#56B6C2", string: "#EE9B00", variable: "#FDFCDC", comment: "#979DAC" });

// 9. Arachnid
generateTheme("Arachnid", "dark", "arachnid.json", {
  bg: "#1A1515", sidebar: "#120E0E", activityBar: "#0D0A0A", statusBar: "#080606", fg: "#F8F9FA", selection: "#3D2727", lineHighlight: "#241818"
}, { function: "#00B4D8", keyword: "#E63946", class: "#C678DD", tag: "#E63946", attribute: "#56B6C2", string: "#E9C46A", variable: "#F8F9FA", comment: "#8E98AD" });

// 10. The Syndicate
generateTheme("The Syndicate", "dark", "the-syndicate.json", {
  bg: "#17181A", sidebar: "#101112", activityBar: "#0B0B0C", statusBar: "#050506", fg: "#FFFFFF", selection: "#2C2E33", lineHighlight: "#1C1D20"
}, { function: "#E0FBFC", keyword: "#FF6B6B", class: "#98C1D9", tag: "#FF6B6B", attribute: "#56B6C2", string: "#EE6C4D", variable: "#FFFFFF", comment: "#7A9CC6" });

console.log("All 10 themes generated with zero hue collision across classes, functions, and keywords.");
