# Curry N Jerk Memphis — portable website

This is the portable conversion of the correct website:

**https://curry-n-jerk-memphis.ugly-b3ar.chatgpt.site/**

The original rendered HTML, compiled CSS, text, colors, responsive layouts, photographs, menus and native controls are preserved. Framework startup code and Sites access dependencies have been removed. Menu search and dish popups use plain JavaScript.

## Upload to your third-party host

1. Extract `curry-n-jerk-memphis-website.zip`.
2. Upload all extracted files and folders to your host's website/public directory.
3. Keep `index.html`, `styles.css`, `script.js`, `menu-data.js`, `assets/`, and all page folders together. Do not flatten the folders.
4. Open the new website address. Your host should serve each folder's `index.html` automatically.

No build command, React installation, Node server, database, or Sites account is required. No single-page-app fallback or special routing rules are needed. Relative links and assets also support hosting in a subfolder.

`404.html` preserves the original not-found design. Hosts that support a custom error page can use this file. For a website hosted in a subfolder, set its `<base href="/">` to that subfolder's path.

Use a static server or your host's preview feature when previewing locally. The package was verified through a static server, including subfolder hosting.

## Included pages

The package includes 23 HTML pages:

- Home
- Full menu and interactive visual menu
- Vegetarian & vegan menu
- Our story
- Catering
- Parties & private events
- 507 Lux Lounge — Coming Soon
- Happy hour
- Visit, hours, directions and the full-size downtown map
- Contact
- Accessibility and privacy
- Ten dedicated photographed dish pages

The visual menu includes all 73 original items, search, category links, dish popups, current option lists and links to Toast.

## Files to edit

- `index.html` and each page folder's `index.html`: page text, links, business details, form fields and metadata.
- `styles.css`: the original site's compiled visual styles. It is complete CSS and has no framework dependency.
- `script.js`: menu search/popups, the original analytics event queue, and the catering return URL.
- `menu-data.js`: dish descriptions, prices, photos and variant options used by the visual menu.
- `assets/images/`: original local photographs plus localized copies of the remote dish and dining-room photographs.

The visual menu data and the static menu/dish HTML are separate editable files. Keep them consistent when changing prices or descriptions.

## Ordering, directions and inquiries

Ordering retains the original Toast destinations. Directions open Google Maps. Phone and email actions retain their original destinations.

The catering form keeps the existing FormSubmit endpoint, `https://formsubmit.co/cnjowner@outlook.com`, and its required fields and honeypot. JavaScript automatically sets its return URL to the Contact page on your deployed host. Form delivery depends on that external service and the restaurant's existing account configuration. No inquiry was sent during verification.

## Domain metadata

Canonical URLs and structured data intentionally retain the restaurant's original primary domain, `https://currynjerk.com`. If this is your final domain, keep it. If you use a different primary domain, replace that domain in the HTML metadata and structured data before launch. Image metadata has been updated to the packaged `assets/images/` paths.

The original source marks the visual menu and 507 Lux Lounge pages as noindex; those settings are retained. Page copy, prices, business details and existing draft statements are carried over from the original, without adding new business claims.

## Verification

Source: the correct Memphis Sites project, version 30, retrieved October 7, 2026.

- Desktop and phone homepage comparisons: identical visible text, CSS rules and section dimensions.
- All 23 pages loaded directly in the browser with the expected headings, no page-width overflow, and no failed loaded images.
- 1,463 local references/anchors and 343 responsive image candidates validated.
- All 16 JPEG/WebP assets decoded successfully.
- Menu search, zero-result recovery, all 73-item restoration, photographed and unphotographed dish popups, options and closing controls verified.
- Mobile navigation, FAQ expansion and review controls verified.
- Catering endpoint, required field validity and host-relative return URL verified without submitting a form.

The original Sites project was not modified or redeployed.
