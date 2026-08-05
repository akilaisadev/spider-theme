# Changelog

All notable changes to the **Spider Theme Suite** extension will be documented in this file.

## [1.2.0] - 2026-08-05

### Major Cognitive Overhaul & Zero-Collision Architecture
- **Preattentive Visual Hierarchy**: Introduced a 5-tier luminance & contrast architecture designed around human visual processing and Cowan's working memory model.
- **Zero Token Collision**: Resolved visual collisions where `class`, `function`, and `keyword` tokens shared identical hues (e.g. `class` vs `function` in Year 2099, Absolute Carnage, and Symbiote).
- **Distinct Class & Method Visuals**: Assigned distinct electric purple/violet (`#E056FD` / `#C77DFF` / `#C678DD`) to classes and types, while preserving cyan/amber for functions and methods.
- **Granular Multi-Language Support**: Handcrafted TextMate rules for 35+ language ecosystems including HTML/XML, CSS/SCSS, JS/TS/JSX/TSX, Python, Go, Rust, Java, C/C++, SQL, Docker, Markdown, Shell, and Prisma.
- **Subpixel Solid Font Rendering**: Completely eliminated alpha transparency on baseline text, variables, parameters, and properties to ensure crisp subpixel font rendering and eliminate eye strain.

## [1.1.2] - 2026-08-05

### Improved
- Elevated WCAG AA / AAA contrast across all 10 theme variants.
- Removed alpha transparency on keywords, variables, parameters, and properties for crisp text rendering and zero eye strain.
- Enhanced operator and bracket visibility with 85% opacity.
- Corrected low-contrast function and keyword colors in Absolute Carnage, Emerald Menace, Superior, Year 2099, and Brooklyn Anomaly.

## [1.0.0] - 2026-08-04

### Added
- Official launch of **Spider Theme Suite** by Akila Wasalathilaka ([@akilaisadev](https://github.com/akilaisadev))!
- Added official 2D cartoon Spider mascot extension icon (`icon.png`).
- 10 theme variants anchored around the flagship **Spider** palette (Crimson `#E25A5A` & Teal `#4DB8B8`).
- Integrated Cognitive Minimalism engine: opacity-based syntax hierarchy, Depth UI, adaptive comments, and high-legibility diffs.
