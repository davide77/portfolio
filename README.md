# Davide Domenghini - Portfolio

Personal portfolio site for [domenghini.com](https://domenghini.com). I built it to show selected work, how I think about front-end engineering, and the easiest way to get in touch.

I'm a senior front-end engineer and founder based in London. I've spent twenty years shipping high-traffic web products for Sky, Estée Lauder Companies, Liberty Global, Bristol City Council, EE, and A+E Networks. Right now I'm leading frontend at Liberty Blume and building [Nannynow.co.uk](https://nannynow.co.uk) end to end.

## What's on the site

- **Home** - positioning, selected case studies, capabilities, and contact prompts
- **Work** - featured projects with live links and case study pages
- **Archive** - long-form gallery of earlier client and campaign work
- **About** - background, principles, career timeline, and CV download
- **Lab** - motion and WebGL experiments kept separate from production work
- **Contact** - booking link, brief form, and direct channels

Case studies cover enterprise lending (Liberty Blume), luxury retail (Estée Lauder EMEA), public sector (Bristol City Council), and founder-led products (Nannynow, Striver.Football, Cheam Sports FC).

## Stack

Next.js 16 · React 19 · TypeScript · Sass (token-driven 7-1 architecture) · Framer Motion · Three.js · Resend (contact form)

Design tokens, voice, and visual rules live in [brand.md](brand.md). That file is the source of truth for colours, typography, and copy tone across the site.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build    # production build
npm run lint     # ESLint
npm run start    # serve production build
```

Optional capture scripts regenerate project screenshots with Playwright:

```bash
npm run capture:projects
npm run capture:estee-lauder
```

## Environment

Create `.env.local` for production contact delivery:

- `RESEND_API_KEY` - contact form delivery via Resend
- `CONTACT_TO_EMAIL` - inbox for form submissions (defaults to davide@domenghini.com)
- `CONTACT_FROM_EMAIL` - sender address (defaults to portfolio@domenghini.com)

In development the contact form logs submissions to the console when `RESEND_API_KEY` is unset.

## Project structure

```
src/
  app/              Next.js routes (home, work, about, contact, lab, archive)
  components/       UI, layout, motion, case study templates
  constants/        Site copy, projects, navigation, and content
  styles/           SCSS abstracts, base, utilities, and components
public/
  images/           Project shots, archive gallery, portraits
brand.md            Brand positioning, voice, colours, and typography
```

## Licence

Private repository. Content and case study assets belong to their respective clients unless otherwise noted.
