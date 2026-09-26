# space-template-desktop

The AitherOS Living Desktop as a Space: your name, tagline and accent colour
in a bar across the top, and the desktop itself full-viewport underneath.

## What this is, plainly

The desktop is not copied into your site. The page frames the hosted desktop
at `https://aitherium.com/desktop/`, which allows being framed. Your branding
applies to the bar around it; the desktop keeps its own look because it takes
no branding parameters. The **Open your desktop** button opens it in its own
tab, which is also the way in if a browser refuses the frame.

## Using it

A Space built from this template is a small repository in your own GitHub
account. It holds one file you edit, `aither.config.json`:

```json
{
  "handle": "yourname",
  "template": "desktop",
  "templateVersion": "v0.1.0",
  "apiBase": "https://api.aitherium.com",
  "basePath": "/my-space/",
  "name": "My Space",
  "tagline": "A corner of the web, grown as code.",
  "accentColor": "#5ad1ff",
  "agentName": "Aither"
}
```

Edit it and push. The Space's Pages workflow downloads the latest release of
this template, puts your `aither.config.json` beside `index.html`, and
redeploys.

| field | effect |
|---|---|
| `name` | shown in the bar and the page title |
| `tagline` | shown in the bar and used as the page description |
| `accentColor` | the bar's border, marker and button (`#rgb` or `#rrggbb`) |
| `agentName` | shown in the bar |
| `apiBase` | exposed as `window.AITHER_SPACE.apiBase`; the framed desktop uses its own backend |
| `basePath` | the path the site is served under, exposed as `window.AITHER_SPACE.basePath`; the site itself uses relative URLs and works under any path |

A missing or malformed config falls back to the defaults shown above.

## Where it is served

GitHub Pages serves the Space from your repository's project path,
`https://<your-login>.github.io/<repo>/`. To use your own domain instead, add it
under **Settings > Pages > Custom domain** in your repository; the template needs
no change for that.

## Building

```bash
./build.sh
```

The output is `dist/site.tar.gz`, built from `src/` and packed flat. The build
fails if `index.html` references a local file that is not in `src/`.

## Releasing

`.github/workflows/release.yml` builds the tarball on every `v*` tag and attaches
it to a new release for that tag; it never replaces an existing release. Spaces
always deploy the latest release.
