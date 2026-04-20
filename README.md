# Agentic Engineering — HCMUT

> Bounded LLMs · Contract-based pipelines · Shipped systems.

Marketing + CMS site for **Agentic Engineering**, a student club at **Ho Chi Minh City University of Technology (HCMUT)**. 

Winner: 2nd place — Best Use of Qwen, GenAI Hackathon Vietnam 2025.

## 🛠 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI**: [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/)
- **Motion**: [GSAP 3](https://greensock.com/gsap/), [Lenis Smooth Scroll](https://lenis.darkroom.engineering/)
- **Visuals**: [ogl](https://github.com/o-gl/ogl) (WebGL), [Lucide React](https://lucide.dev/)
- **Forms**: [react-hook-form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **Type**: [Syne](https://font.google.com/specimen/Syne), [Instrument Serif](https://font.google.com/specimen/Instrument+Serif), [DM Mono](https://font.google.com/specimen/DM+Mono)

## 🚀 Getting Started

```bash
pnpm install
pnpm dev
```

## 🎮 Easter Eggs

- **Matrix Mode**: Type `↑↑↓↓←→←→ba` anywhere to engage the amber rain.
- **Grid Toggle**: Press `g` to reveal the editorial grid.
- **Trace Mode**: Engage Konami code to see scroll depth and debug info.
- **Console API**: Try `window.__ae.about()` or `window.__ae.matrix()` in the dev tools.
- **Footer Stack**: Triple-click the "Crafted in Ho Chi Minh City" text in the footer.
- **Qwen Pulse**: Visit `/journal/qwen-hackathon` for a one-shot amber pulse.

## 🏛 Architecture

- `src/app`: Routes and layouts.
- `src/components/chrome`: Global UI elements (Header, Footer, Cursor, etc.).
- `src/components/motion`: Reusable animation components.
- `src/components/primitives`: Base UI atoms.
- `src/components/sections`: Landing page sections.
- `src/lib`: Core utilities and CMS mock data.

## 📄 License

MIT · 2026 Agentic Engineering
