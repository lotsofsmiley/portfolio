# portfolio

The personal site of **António Guimarães** — systems & software, from Porto.

A portfolio that behaves like the kind of thing I build: an **observable system**. The
homepage is a living node-graph that breathes and reacts to the cursor; navigation is a
`/` command palette; a single coral signal colour runs throughout. No template, no UI
kit — built by hand.

> **Live:** **[guimaraes.systems](https://guimaraes.systems)** · the site explains how it's made at `/colophon`

## Stack

- **[SvelteKit](https://svelte.dev/docs/kit)** — Svelte 5, static & fully prerendered (`adapter-static`)
- **TypeScript** + hand-written scoped CSS (no Tailwind, no component library)
- A `<canvas>` node-graph + Svelte transitions for the motion
- Type: **Inter Tight** · **IBM Plex Mono**

## Develop

```sh
npm install
npm run dev        # http://localhost:5173
```

```sh
npm run build      # static output → build/
npm run preview
```

## Structure

```
src/
├─ routes/                 index · work · about · colophon
├─ lib/components/         SchematicCanvas · CommandPalette · Telemetry
└─ app.css                 design tokens — retheme via the single --sig colour
```

---

Built by [António Guimarães](https://github.com/lotsofsmiley) · [MIT](LICENSE)
