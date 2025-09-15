# Angular-style Login/Register Frontend (Minimal scaffold)

This is a minimal Angular 16-style scaffold containing Login, Register, Profile pages and a simple AuthService.
It uses **standalone components** so you don't need to declare components in NgModule files.

How to run:
1. Install dependencies: `npm install`
2. Start dev server: `npm start` (this runs `ng serve` - Angular CLI must be available via the installed devDependencies)

Notes:
- Auth is fake/in-memory (localStorage token). Replace AuthService with real API calls as needed.
- Styling is simple CSS (src/styles.css). You can replace with Tailwind or Angular Material.

File structure mirrors the requested structure under `src/app`:
- core/  -> auth.service.ts, auth.guard.ts
- shared/ -> shared readme (UI primitives)
- features/auth -> login/register
- features/profile -> profile
