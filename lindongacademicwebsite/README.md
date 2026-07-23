# Lin Dong — Personal Academic Website

A static personal academic website (Home, About Me, Publications, Teaching, Latest Activities) built with plain HTML and Tailwind CSS, styled after a Playfair Display / Inter academic design system.

Tailwind is compiled to a single static CSS file at `assets/css/site.css` and committed to the repo — pages load that file directly, with no runtime CDN script and no build step required at deploy time. (A build step is only needed if *you* add new Tailwind classes — see below.)

## Structure

```
index.html              Home
about.html               About Me — bio, education, research interests
publications.html        Journal articles, books, working papers (with live search)
teaching.html             Courses taught, teaching philosophy
news.html                 Latest Activities — talks, awards, updates
activities/_template/     Copy this folder to create a new activity detail page
activities/example-event/ A filled-in example of the pattern above, linked from news.html
assets/css/site.css       Compiled Tailwind output (generated — don't hand-edit)
assets/js/                Scroll reveal, mobile menu, publication search
assets/cv/                Put your CV PDF here (see assets/cv/README.md)
assets/img/               Put your photos here (see assets/img/README.md)
src/input.css             Tailwind source (base + custom component classes)
tailwind.config.js        Design tokens (colors, fonts, spacing) — single source of truth
```

## Customizing content

Every page has bracketed placeholders like `[Your Institution]` or `[Title of Journal Article One]` — search for `[` across the repo to find them all and replace with your real content:

```
grep -rln "\[" --include="*.html" .
```

Update in particular:
- The hero intro and research focus cards in `index.html`
- Biography, education, and research interests in `about.html`
- Publication entries in `publications.html` (each entry has a `data-search` attribute used by the search box — keep it in sync with the visible text)
- Courses in `teaching.html`
- Activity entries in `news.html`
- Social links (Google Scholar, ResearchGate, LinkedIn, GitHub) in every page footer — currently `href="#"`
- Contact email — defaults to `hnlindong@gmail.com`, update if needed

Editing text content, links, or images never requires a rebuild — only adding a *new* Tailwind utility class you haven't used elsewhere does (see Build below).

## Adding a new activity/event page

Each activity can optionally have its own detail page (for a talk, award, or update worth expanding on), using a shared template so a new one is just a copy:

1. Duplicate the template folder: `activities/_template` → `activities/<slug>` (suggested slug: `YYYY-MM-short-name`, e.g. `2026-09-oxford-workshop`).
2. Open `activities/<slug>/index.html` and fill in the bracketed placeholders.
3. Add a summary card to `news.html` linking to `activities/<slug>/index.html` (copy the pattern used for the existing "TALK" entry, which links to `activities/example-event/`).
4. Commit and push.

`activities/example-event/` is a filled-in reference showing the pattern working end-to-end — edit it into your first real entry, or leave it as a live example and delete it once you have real activities of your own.

## Adding your CV and photo

- Drop your CV PDF at `assets/cv/lin-dong-cv.pdf` — every CV button already links there.
- Drop a headshot at `assets/img/profile.jpg` and swap it in for the "LD" placeholder block in `index.html`.

## Build (only needed if you add new Tailwind classes)

```
npm install
npm run build     # compiles src/input.css -> assets/css/site.css (one-time)
npm run watch      # recompiles automatically while you edit
```

`tailwind.config.js`'s `content` array (`./*.html`, `./activities/**/*.html`) tells Tailwind which files to scan for class names — if you add a new top-level page or a differently-located folder, add its path there too.

## Local preview

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying to GitHub Pages

1. Push this repo to GitHub (already done if you're reading this from the repo).
2. In the repo settings, go to **Pages**.
3. Under **Source**, choose the branch you want to publish (e.g. `main`) and the root folder.
4. Save — GitHub will publish the site at `https://<username>.github.io/<repo>/`.

Because `assets/css/site.css` is committed, GitHub Pages can serve the site as-is with no build step of its own.

## Design system

Shared Tailwind tokens (colors, fonts, spacing) live in `tailwind.config.js`, and shared component classes (nav links, footer links, scroll-reveal, the Material Symbols icon fix) live in `src/input.css`. Edit either and run `npm run build` to retheme the whole site at once.
