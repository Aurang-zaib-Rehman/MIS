# AGENTS.md — TailAdmin React Pro

> React 19 admin dashboard template · Vite · Tailwind CSS v4 · react-i18next · ApexCharts · FullCalendar · Swiper

## Repo Map

```
src/
├── App.tsx                    # root router — all routes registered here
├── main.tsx                   # entry point: providers + CSS imports
├── index.css                  # Tailwind v4 @theme tokens, @utility classes, third-party overrides
├── pages/                     # route-level components (one file or folder per page)
│   ├── Dashboard/             # dashboard variants: Ecommerce, Analytics, CRM, Sales, Finance…
│   ├── AuthPages/             # SignIn, SignUp, ResetPassword, TwoStepVerification
│   ├── Ecommerce/             # ProductList, AddProduct, Billing, Invoices, Transactions…
│   ├── Forms/                 # FormElements, FormLayout
│   ├── Tables/                # BasicTables, DataTables
│   ├── Charts/                # LineChart, BarChart, PieChart, RadarChart, RadialChart
│   ├── UiElements/            # Alerts, Badges, Buttons, Modals, Tabs, Tooltips…
│   ├── Task/                  # TaskKanban, TaskList
│   ├── Email/                 # EmailInbox, EmailDetails
│   ├── Maps/                  # Maps, VectorMap
│   ├── Ai/                    # AI generator pages (Text, Image, Code, Video) + AiSettings
│   ├── Layouts/               # LayoutOne … LayoutSix (alternative sidebar demos)
│   └── OtherPage/             # NotFound, ComingSoon, Maintenance, Success, 500, 503…
├── components/
│   ├── ui/                    # primitives: alert/, avatar/, badge/, button/, card/,
│   │                          #   carousel/, dropdown/, modal/, pagination/, table/, tabs/,
│   │                          #   tooltip/, popover/, progressbar/, spinner/, ribbons/…
│   ├── form/                  # Form, Label, Select, MultiSelect, date-picker + input/, switch/
│   ├── common/                # shared widgets: PageBreadCrumb, ComponentCard, PageMeta,
│   │                          #   ThemeToggleButton, ScrollToTop, TableDropdown, ChartTab…
│   ├── header/                # AppHeader dropdowns (notifications, user menu, language…)
│   └── <feature>/             # one folder per domain: ecommerce/, crm/, analytics/,
│                              #   charts/, chats/, task/, invoice/, ai/, maps/…
├── layout/                    # AppLayout (sidebar+header shell), AlternativeLayout,
│                              #   AppSidebar, AppHeader, Backdrop, SidebarWidget
├── context/                   # ThemeContext, SidebarContext, LanguageContext
├── hooks/                     # useModal, useGoBack, useClickOutside
├── i18n/                      # index.ts — i18next bootstrap (resources, defaultNS, fallbackLng)
├── locales/                   # translation files: en/common.json, ar/common.json,
│                              #   es/common.json, de/common.json
├── icons/                     # .svg files + index.ts barrel (SVGR named exports)
└── utils/                     # utility helpers
```

## Stack

- **React 19** with strict **TypeScript** (~5.7), bundled by **Vite 8**.
- **React Router v7** (`react-router`) for client-side routing via `BrowserRouter`.
- **react-i18next v17** + **i18next v26** for internationalization and RTL support.
- **Tailwind CSS v4** — configured entirely through `src/index.css`; **no `tailwind.config` file exists**.
- **react-apexcharts** for charts, **@fullcalendar/react** for the calendar, **Swiper** for carousels.
- **react-helmet-async** (`PageMeta`) for per-page `<title>` and `<meta description>`.
- Path alias: `@/*` → `src/*` (configured in `tsconfig.app.json` + `vite.config.ts`).
- Scripts: `npm run dev` (Vite dev server), `npm run build` (tsc + Vite), `npm run lint`.
- Node >= 20.19.0 || >= 22.12.0 required (Vite 8 requirement).

## Routing Conventions

- All routes are registered in `src/App.tsx` using `<Routes>` / `<Route>`.
- Three layout groups:
  - **`<AppLayout>`** — standard dashboard shell (sidebar + header). Most pages live here.
  - **`<AlternativeLayout>`** — full-width shell for AI generator pages and AI settings.
  - **No layout** — standalone pages: auth routes (`/signin`, `/signup`…), error pages, layout demos.
- **New page** → create a file or folder under `src/pages/<Category>/MyPage.tsx`, then add a `<Route>` in `App.tsx` under the appropriate layout group.
- Page files are **PascalCase** (`MyPage.tsx`) with a **default export**.
- Colocate route-only sub-components inside the page folder. Reusable UI goes in `src/components/<feature>/`.

## Conventions

- **Component files**: PascalCase (`EcommerceMetrics.tsx`) with a **default export**.
- **Hook files**: camelCase (`useModal.ts`).
- **New reusable component** → `src/components/<feature>/` if domain-specific, else `src/components/common/` or `src/components/ui/`.
- **New icon** → drop the `.svg` into `src/icons/`, add a named export to `src/icons/index.ts` using a PascalCase name (e.g., `export { ReactComponent as MyIcon } from "./my-icon.svg"`). Never inline SVG markup in components.
- **Page meta (SEO)** → every page must render `<PageMeta title="…" description="…" />` (from `src/components/common/PageMeta.tsx`) as the first child.
- **Breadcrumbs** → add `<PageBreadCrumb pageTitle="…" />` at the top of admin pages, matching existing pages.
- **Demo sections** → wrap in `<ComponentCard title="…">` to match the UI element demo pages pattern.
- Modals use the `useModal` hook (`isOpen`, `openModal`, `closeModal`, `toggleModal`).
- Global state goes through the existing contexts (`useSidebar`, `useTheme`, `useLanguage`) — do not add new providers without a clear need.
- Prefer primitives from `src/components/ui/` and `src/components/form/` over raw HTML or new third-party equivalents.

## Internationalization (react-i18next) Rules

- **Setup**: i18next is bootstrapped in `src/i18n/index.ts` and imported once in `src/main.tsx`. Do not re-initialize it.
- **Supported locales**: `en`, `ar`, `es`, `de`. All share the single `"common"` namespace.
- **Translation dictionaries**: `src/locales/<locale>/common.json`. When adding any user-facing string, add the key to **all four** locale files.
- **Using translations**:
  - In any component (all are client-side in Vite/React): use the `useTranslation` hook.
    ```tsx
    import { useTranslation } from "react-i18next";
    const { t } = useTranslation(); // uses default "common" namespace
    return <p>{t("myKey")}</p>;
    ```
  - Organize keys by feature namespace inside `common.json` (e.g., `"ecommerce": { "metrics": { "customers": "Customers" } }`), then access with `t("ecommerce.metrics.customers")`.
- **Language switching**: Use `useLanguage()` from `src/context/LanguageContext.tsx`. Call `setLanguage(code)` — it updates i18next, `localStorage`, and `document.documentElement.lang`/`dir` automatically.
- **RTL**: Arabic (`ar`) sets `dir="rtl"` on `<html>`. `LanguageContext` exposes `dir: "ltr" | "rtl"` for conditional logic. Use CSS logical properties everywhere (see Styling Rules) — the RTL flip is CSS-driven and requires no JS conditionals for layout.

## Styling Rules

- Tailwind CSS **v4** — the entire theme lives in `src/index.css` under `@theme`. **Never create a `tailwind.config.js/ts`**.
- Always use theme tokens instead of hardcoded values:
  - **Colors**: `brand`, `gray`, `blue-light`, `orange`, `success`, `error`, `warning` scales (`25`–`950`), plus `theme-pink-500` / `theme-purple-500`.
  - **Typography**: `font-outfit`, `text-theme-xs/sm/xl`, `text-title-sm/md/lg/xl/2xl`.
  - **Shadows**: `shadow-theme-xs/sm/md/lg/xl`, `shadow-focus-ring`, `shadow-slider-navigation`, `shadow-tooltip`, `shadow-datepicker`.
  - **Breakpoints**: custom `2xsm` (375px), `xsm` (425px), `3xl` (2000px) alongside defaults.
  - **Z-index**: `z-1`, `z-9`, `z-99`, `z-999`, `z-9999`, `z-99999`, `z-999999` tokens.
- **Dark mode is class-based** (`@custom-variant dark (&:is(.dark *))`, toggled by `ThemeContext` adding/removing `.dark` on `<html>`). Every styled element must include its `dark:` variant.
- **CSS Logical Properties for RTL & Internationalization**:
  - Never use physical directional utilities when logical equivalents exist; physical `left`/`right` properties break the Arabic (`ar`) RTL layout:
    - **Margins**: use `ms-*` / `me-*` instead of `ml-*` / `mr-*`.
    - **Padding**: use `ps-*` / `pe-*` instead of `pl-*` / `pr-*`.
    - **Positioning / Insets**: use `start-*` / `end-*` instead of `left-*` / `right-*`.
    - **Borders**: use `border-s-*` / `border-e-*` instead of `border-l-*` / `border-r-*`.
    - **Border Radius**: use `rounded-s-*` / `rounded-e-*` / `rounded-ss-*` / `rounded-se-*` / `rounded-es-*` / `rounded-ee-*` instead of `rounded-l-*` / `rounded-r-*`.
    - **Text Alignment**: use `text-start` / `text-end` instead of `text-left` / `text-right`.
  - **Directional Icons & Transforms**:
    - Directional glyphs (back/forward arrows, breadcrumb chevrons, next/prev buttons) must flip in RTL: use `rtl:rotate-180` or `rtl:-scale-x-100`.
    - Off-canvas drawers and sliding elements must mirror their translation (e.g., `-translate-x-full rtl:translate-x-full`).
    - Use `ltr:*` / `rtl:*` modifiers only when a logical property does not exist or for third-party integration overrides.
- Reusable `@utility` classes already defined in `index.css` (`menu-item`, `menu-item-active`, `menu-item-inactive`, `menu-item-icon`, `menu-dropdown-item`, `menu-dropdown-badge`, `custom-scrollbar`, `no-scrollbar`, …) — reuse them before creating new ones.
- All third-party CSS overrides (ApexCharts, FullCalendar, Swiper, flatpickr, simplebar-react) live at the bottom of `index.css`. Add overrides there, matching the existing `@apply` style.
- Never hardcode hex colors in `className`. Chart option objects (`ApexOptions.colors`) are the established exception — copy hex values from the `@theme` palette (e.g., `#465fff` = `brand-500`, `#12b76a` = `success-500`).

## Component Rules

- **One feature, one folder**: page UI goes in `src/components/<feature>/`, split into focused, single-responsibility sub-components (e.g., `EcommerceMetrics.tsx`, `RecentOrders.tsx`). Avoid one monolithic file per page.
- **Composition over prop drilling**: pass `children`, separate container/state logic from presentational components, extract large JSX sections into their own files, and define explicit typed prop interfaces per sub-component.
- **Charts** (`react-apexcharts`): import lazily with `React.lazy` + `Suspense`, or guard with `if (typeof window === "undefined") return null`. Follow the pattern used in existing chart components before choosing an approach.
- **FullCalendar** and **Swiper**: these are also browser-only — follow the existing pattern in `src/pages/Calendar.tsx` and carousel components respectively before importing directly.
- **Icons**: always import from `@/icons` using the named export (e.g., `import { CalendarIcon } from "@/icons"`). SVGs are compiled to React components via `vite-plugin-svgr`. Never inline raw SVG markup in components.
- **Page SEO**: always add `<PageMeta title="Page Title | TailAdmin" description="…" />` as the first element in every page component.
- **Modals**: use `useModal` hook from `src/hooks/useModal.ts` and the `<Modal>` primitive from `src/components/ui/modal/`.
- **Global state**: consume only via existing hooks — `useSidebar()`, `useTheme()`, `useLanguage()`.

## Don'ts

- Don't install new packages without asking the user.
- Don't create a `tailwind.config.js` or `tailwind.config.ts` — Tailwind v4 is fully configured through `src/index.css`.
- Don't hardcode hex colors or pixel values in `className` — always use `@theme` tokens.
- Don't hardcode user-facing text — add keys to all four `src/locales/<locale>/common.json` files and use `t()`.
- Don't use physical directional utilities (`ml-*`, `mr-*`, `pl-*`, `pr-*`, `left-*`, `right-*`, `border-l-*`, `border-r-*`, `rounded-l-*`, `rounded-r-*`, `text-left`, `text-right`) — always prefer CSS logical equivalents (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `border-s-*`, `border-e-*`, `rounded-s-*`, `rounded-e-*`, `text-start`, `text-end`).
- Don't import `react-apexcharts`, `FullCalendar`, or `Swiper` at the module level without verifying they are safe to do so in that component's context — always check the existing pattern in that feature folder first.
- Don't add new pages outside `src/pages/` or new routes outside `src/App.tsx`.
- Don't add new context providers without a clear, broad need — prefer local state or composition.
- Don't inline SVG markup in components — always add the `.svg` to `src/icons/` and export it from the barrel `index.ts`.
- Don't use `styled-components`, CSS Modules, or any CSS-in-JS — Tailwind utility classes with `@utility` extensions in `index.css` are the only styling mechanism.

---

# PERMANENT DEVELOPMENT RULES — MADRASSA MIS

These instructions apply to EVERY task, feature, module, page, component, and code modification throughout this project.

## 1. EXISTING CODE FIRST — NEVER REBUILD UNNECESSARILY

Before implementing anything, inspect the existing codebase.

You MUST:
- Search for existing components before creating new ones.
- Reuse existing components wherever possible.
- Customize existing components according to requirements.
- Reuse existing tables, forms, buttons, inputs, dropdowns, modals, dialogs, cards, charts, calendars, notifications, navigation, and layouts.
- Reuse existing hooks, utilities, API services, validation schemas, and design tokens.
- Extend existing components rather than creating duplicate versions.
- Use configuration and props to make components reusable.
- Follow the existing project architecture and naming conventions.

### Concrete Reusability Mappings:
- **Tables**: Customize `src/components/ui/table/` and existing table patterns (`BasicTableOne`, `RecentOrders`) for Students, Teachers, Fees, Results, and Attendance.
- **Forms & Inputs**: Reuse `src/components/form/` primitives (`InputField`, `Select`, `MultiSelect`, `Checkbox`, `Radio`, `date-picker`, `DropZone`) for admission, student registration, fee collection, and marks entry.
- **Navigation & Sidebar**: Make existing `AppSidebar` role-aware (Admin, Teacher, Student) rather than creating separate sidebars.
- **Layouts**: Reuse `AppLayout` for Admin, Teacher, and Student dashboard shells.
- **Modals**: Reuse `src/components/ui/modal/` and `useModal` hook for Add, Edit, View, and Delete operations.
- **UI Elements**: Reuse `Button`, `Badge`, `Alert`, `Avatar`, `Dropdown`, `ComponentCard`.

## 2. CREATE NEW COMPONENTS ONLY WHEN NECESSARY

Before creating a new component:
1. Search the entire codebase for similar functionality.
2. Check whether an existing component can be extended.
3. Check whether existing components can be composed together.
4. Prefer reusable, configurable components.
5. Create a new component only if no suitable existing component exists.
*Never create duplicate components with different names but identical functionality.*

## 3. PERFORMANCE AND SCALABILITY

The application must be smooth, fast, maintainable, and scalable:
- Avoid unnecessary component re-renders.
- Avoid unnecessary API requests.
- Use pagination for large datasets.
- Use server-side filtering and searching when appropriate.
- Use lazy loading for routes and heavy components.
- Optimize database queries and indexes.
- Avoid unnecessary dependencies.
- Avoid duplicated API calls.
- Use appropriate caching where beneficial.
- Keep components modular and maintainable.
- Avoid oversized components and unnecessary abstractions.
- Optimize images and static assets.
- Handle loading, empty, success, and error states.
- Use responsive design for desktop, tablet, and mobile.
*Do not sacrifice code readability or maintainability for premature optimization.*

## 4. CODE QUALITY AND SECURITY

- Use TypeScript consistently throughout the project.
- Follow existing coding conventions and file patterns.
- Validate inputs on both frontend and backend.
- Handle errors properly with informative feedback.
- Protect sensitive information.
- Enforce authorization on the backend (never trust frontend-only role restrictions).
- Use secure authentication practices.
- Never expose passwords, JWT secrets, or environment variables.
- Avoid hardcoded production credentials.

## 5. TESTING IS MANDATORY AFTER EVERY TASK

Testing is NOT optional. After completing each development task:
- **A. UNIT TESTING**: Test newly created or modified components, functions, validation rules, service functions, states, and permission logic.
- **B. INTEGRATION TESTING**: Test interactions between integrated components, frontend/backend communication, API requests/responses, and ensure existing features remain unbroken.
- **C. REGRESSION TESTING**: Verify previously working functionality; check that shared components still work everywhere they are used.
- **D. BUILD AND QUALITY CHECKS**: Run TypeScript checks (`tsc`), linting, and production build. Resolve any errors introduced.
*Never claim a test passed unless you actually executed it.*

## 6. REPORT AFTER EVERY TASK (10-POINT MANDATORY REPORT)

After completing each task, provide:
1. **What was implemented**
2. **Which existing components were reused**
3. **Which components were modified**
4. **Whether any new components were created and why**
5. **Files created, modified, or deleted**
6. **Unit testing results**
7. **Integration testing results**
8. **Regression testing results**
9. **Build and TypeScript results**
10. **Known issues or remaining work**

## 7. STRICT DEVELOPMENT CONTROL

- Implement only the task requested.
- Do not implement future phases without approval.
- Do not change unrelated functionality.
- Do not rewrite working code unnecessarily.
- Do not change the database design or business rules without discussing first.
- Ask before introducing major architectural changes.
- If a requirement conflicts with existing functionality, explain the conflict before changing anything.

**CORE DIRECTIVE**:
**REUSE FIRST → CUSTOMIZE SECOND → CREATE NEW ONLY WHEN NECESSARY → TEST EVERYTHING → REPORT RESULTS.**
