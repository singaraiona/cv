# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-page static HTML CV/resume for Anton Kundenko. There is no build system, framework, or dependencies.

## Files

- `anton_kundenko_modern_cv.html` — Self-contained HTML+CSS CV (no external JS, all styles inline in `<style>`)
- `avatar.png` — Profile photo referenced by the HTML

## Development

Open `anton_kundenko_modern_cv.html` directly in a browser. No build step required.

## Architecture Notes

- **CSS custom properties** defined in `:root` control the color theme (see `--bg`, `--accent`, etc.)
- **Two-column grid layout** (`.grid`): left column (`.main`) has Summary, Key Projects, Experience, Education; right column (`.side`) has Focus, Technical Skills, Open Source, Languages
- **Print styles** (`@media print`) are included for clean A4 PDF export via browser print
- **Responsive breakpoint** at 880px collapses to single-column layout
- Uses **Google Fonts (Inter)** as the only external dependency
