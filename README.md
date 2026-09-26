# space-template-desktop

An AitherOS surface as a Space: your name, tagline and accent colour in a bar
across the top, and a hosted AitherOS page full-viewport underneath. The
Living Desktop by default; `route` picks another surface.

## What this is, plainly

The surface is not copied into your site. The page frames the hosted page at
`https://aitherium.com<route>`, which allows being framed. Your branding applies
to the bar around it; the framed page keeps its own look because it takes no
branding parameters.

A framed page runs signed out: browsers keep its cookies apart from a visit in
a normal tab. The **Open full app ↗** link opens the same page in its own tab,
where you can sign in. It is also the way in if a browser refuses the frame.

## Surfaces

`route` must be exactly one of these paths. Anything else, or no `route` at
all, frames the desktop.

| route | surface |
|---|---|
| `/desktop/` | Living Desktop (the default) |
| `/desktop/?app=terminal` | AitherShell (awsh), the harness-backed terminal in the desktop |
| `/playground/` | Community Playground |
| `/iris/` | Iris |
| `/lyra/` | Lyra |
| `/atlas/` | Atlas |
| `/hera/` | Hera |
| `/vera/` | Vera |
| `/saga/` | Saga, agentic narrative storytelling |
| `/demo/adk/` | awdk tour, a simulated walkthrough of the awdk workflow |
| `/demo/connect/` | Awconnect demo |

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
  "agentName": "Aither",
  "route": "/desktop/"
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
| `route` | which surface is framed, from the table above |
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
fails if `index.html` references a local file that is not in `src/`, if the
route tests in `test/` fail against the built `space.js`, or if the tarball
holds anything other than the four site files. It needs `node` for the tests;
run them alone with `node --test test/space.test.cjs`.

## Releasing

`.github/workflows/release.yml` builds the tarball on every `v*` tag and attaches
it to a new release for that tag; it never replaces an existing release. Spaces
always deploy the latest release.
