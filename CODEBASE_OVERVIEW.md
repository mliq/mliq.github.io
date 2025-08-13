# Codebase Overview

This repository hosts the source for [mliq.github.io](http://mliq.github.io), a static personal site that serves as a résumé and profile for Michael Liquori.

## Structure

```
root/
├── index.html              # Main single-page site
├── public/
│   ├── styles/
│   │   ├── custom.scss     # Source Sass styles
│   │   └── custom.css      # Compiled CSS (generated)
│   ├── vendor/             # Third-party libraries
│   ├── img/                # Project images
│   └── svg/                # Logos and icons
├── package.json            # Node dependencies and scripts
└── README.md
```

### `index.html`
The site is a single HTML page built with Bootstrap's grid and components. It imports:

- Google Fonts and Analytics snippets
- Bootswatch's **Readable** Bootstrap theme
- Font Awesome for icons
- The local `public/styles/custom.css`

### `public/styles`
All project styling is authored in `custom.scss` and compiled to `custom.css` using the build script. Edit the `.scss` file and run `npm run build` to regenerate the CSS.

### `public/vendor`
Vendored assets include:

- `readable/`: Bootswatch theme files based on Bootstrap 3
- `font-awesome/`: icon library
- `animate/`: animation helpers (not currently referenced)

### `package.json`
Lists dependencies such as Bootstrap, jQuery, and tooling like Grunt. The only active script is:

```
"build": "npx sass ./public/styles"
```

Running `npm run build` compiles Sass to CSS. A placeholder `npm test` script exists but does not run any tests.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Compile styles** after modifying `custom.scss`:
   ```bash
   npm run build
   ```
3. **Serve the site** by opening `index.html` directly or via a static file server.

## Next Steps for Contributors

- Explore Bootstrap and Bootswatch to expand the layout.
- Split the Sass file into partials as the style layer grows.
- Audit `package.json` for unused dependencies (e.g., Express, Grunt) to simplify the project.
- Optimize assets (minify CSS/JS, compress images) as the site matures.

