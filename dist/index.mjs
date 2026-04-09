// src/pdf.ts
var DEFAULT_PRIMARY = "#9333ea";
var DEFAULT_SECONDARY = "#7c3aed";
var DEFAULT_ACCENT = "#a855f7";
function resolveBrandingColors(branding) {
  const primary = branding?.primary_color || DEFAULT_PRIMARY;
  const secondary = branding?.secondary_color || DEFAULT_SECONDARY;
  const accent = branding?.accent_color || DEFAULT_ACCENT;
  return {
    primary,
    secondary,
    accent,
    primaryLight: `${primary}1a`,
    // 10% opacity
    primaryMedium: `${primary}33`,
    // 20% opacity
    primaryLighter: `${primary}0d`
    // 5% opacity
  };
}
var TEXT_COLOR_PREFIXES = ["purple", "violet", "emerald", "blue", "indigo", "teal", "cyan", "rose", "pink", "amber", "slate", "sky"];
var BG_LIGHT_SHADES = ["50", "100"];
var BG_DARK_SHADES = ["500", "600", "700"];
var BORDER_SHADES = ["100", "200", "300"];
var basePdfStyles = `
    @page { margin: 12mm; }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
        margin: 0;
        padding: 16px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.4;
        color: #1f2937;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
    }
    table { border-collapse: collapse; width: 100%; }
    th, td { text-align: left; vertical-align: middle; }

    /* Layout utilities */
    .flex { display: flex; }
    .flex-col { flex-direction: column; }
    .flex-wrap { flex-wrap: wrap; }
    .items-center { align-items: center; }
    .items-start { align-items: flex-start; }
    .justify-center { justify-content: center; }
    .justify-between { justify-content: space-between; }
    .justify-end { justify-content: flex-end; }
    .gap-1 { gap: 0.25rem; }
    .gap-1\\.5 { gap: 0.375rem; }
    .gap-2 { gap: 0.5rem; }
    .gap-3 { gap: 0.75rem; }
    .gap-4 { gap: 1rem; }
    .gap-6 { gap: 1.5rem; }
    .gap-x-1 { column-gap: 0.25rem; }
    .shrink-0 { flex-shrink: 0; }
    .flex-1 { flex: 1 1 0%; }
    .grid { display: grid; }
    .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
    .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }

    /* Spacing */
    .p-3 { padding: 0.75rem; }
    .p-4 { padding: 1rem; }
    .p-8 { padding: 2rem; }
    .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
    .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
    .px-4 { padding-left: 1rem; padding-right: 1rem; }
    .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
    .py-1\\.5 { padding-top: 0.375rem; padding-bottom: 0.375rem; }
    .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
    .py-2\\.5 { padding-top: 0.625rem; padding-bottom: 0.625rem; }
    .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
    .pl-1 { padding-left: 0.25rem; }
    .pt-3 { padding-top: 0.75rem; }
    .pt-4 { padding-top: 1rem; }
    .mt-0\\.5 { margin-top: 0.125rem; }
    .mt-1 { margin-top: 0.25rem; }
    .mt-3 { margin-top: 0.75rem; }
    .mt-4 { margin-top: 1rem; }
    .mt-10 { margin-top: 2.5rem; }
    .mb-1 { margin-bottom: 0.25rem; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mb-3 { margin-bottom: 0.75rem; }
    .mb-4 { margin-bottom: 1rem; }
    .mr-1 { margin-right: 0.25rem; }
    .ml-1 { margin-left: 0.25rem; }
    .ml-2 { margin-left: 0.5rem; }
    .mx-2 { margin-left: 0.5rem; margin-right: 0.5rem; }
    .space-y-1\\.5 > * + * { margin-top: 0.375rem; }
    .space-y-2 > * + * { margin-top: 0.5rem; }
    .space-y-3 > * + * { margin-top: 0.75rem; }
    .space-y-4 > * + * { margin-top: 1rem; }
    .space-y-6 > * + * { margin-top: 1.5rem; }
    .space-y-8 > * + * { margin-top: 2rem; }

    /* Sizing */
    .w-full { width: 100%; }
    .w-2 { width: 0.5rem; }
    .w-3 { width: 0.75rem; }
    .w-4 { width: 1rem; }
    .w-5 { width: 1.25rem; }
    .w-6 { width: 1.5rem; }
    .w-8 { width: 2rem; }
    .w-10 { width: 2.5rem; }
    .w-12 { width: 3rem; }
    .w-16 { width: 4rem; }
    .w-2\\/5 { width: 40%; }
    .h-2 { height: 0.5rem; }
    .h-3 { height: 0.75rem; }
    .h-4 { height: 1rem; }
    .h-5 { height: 1.25rem; }
    .h-6 { height: 1.5rem; }
    .h-8 { height: 2rem; }
    .h-10 { height: 2.5rem; }
    .h-12 { height: 3rem; }
    .h-16 { height: 4rem; }
    .min-w-0 { min-width: 0; }
    .min-w-\\[250px\\] { min-width: 250px; }
    .max-w-6xl { max-width: 72rem; }
    .mx-auto { margin-left: auto; margin-right: auto; }

    /* Typography */
    .text-xs { font-size: 0.75rem; line-height: 1rem; }
    .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
    .text-base { font-size: 1rem; line-height: 1.5rem; }
    .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
    .text-2xl { font-size: 1.5rem; line-height: 2rem; }
    .font-normal { font-weight: 400; }
    .font-medium { font-weight: 500; }
    .font-semibold { font-weight: 600; }
    .font-bold { font-weight: 700; }
    .font-mono { font-family: ui-monospace, monospace; }
    .text-left { text-align: left; }
    .text-center { text-align: center; }
    .text-right { text-align: right; }
    .uppercase { text-transform: uppercase; }
    .capitalize { text-transform: capitalize; }
    .tracking-wider { letter-spacing: 0.05em; }
    .italic { font-style: italic; }
    .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .inline-flex { display: inline-flex; }
    .align-middle { vertical-align: middle; }

    /* Colors - Text */
    .text-white { color: #ffffff !important; }
    .text-gray-300 { color: #d1d5db; }
    .text-gray-400 { color: #9ca3af; }
    .text-gray-500 { color: #6b7280; }
    .text-gray-600 { color: #4b5563; }
    .text-gray-700 { color: #374151; }
    .text-gray-800 { color: #1f2937; }
    .text-slate-300 { color: #cbd5e1; }
    .text-slate-400 { color: #94a3b8; }
    .text-slate-500 { color: #64748b; }
    .text-slate-600 { color: #475569; }
    .text-slate-700 { color: #334155; }
    .text-purple-600 { color: #9333ea; }
    .text-purple-700 { color: #7c3aed; }
    .text-purple-800 { color: #6b21a8; }
    .text-emerald-500 { color: #10b981; }
    .text-emerald-600 { color: #059669; }
    .text-emerald-700 { color: #047857 !important; }
    .text-emerald-800 { color: #065f46 !important; }
    .text-sky-700 { color: #0369a1; }
    .text-violet-700 { color: #6d28d9; }
    .text-blue-700 { color: #1d4ed8; }
    .text-indigo-600 { color: #4f46e5; }
    .text-indigo-700 { color: #4338ca; }
    .text-orange-600 { color: #ea580c; }
    .text-orange-700 { color: #c2410c; }
    .text-orange-800 { color: #9a3412; }
    .text-red-700 { color: #b91c1c; }
    .text-amber-700 { color: #b45309; }
    .text-teal-700 { color: #0f766e; }

    /* Colors - Backgrounds */
    .bg-white { background-color: #ffffff !important; }
    .bg-transparent { background-color: transparent !important; }
    .bg-gray-50 { background-color: #f9fafb !important; }
    .bg-gray-100 { background-color: #f3f4f6 !important; }
    .bg-slate-50 { background-color: #f8fafc !important; }
    .bg-slate-200 { background-color: #e2e8f0 !important; }
    .bg-slate-500 { background-color: #64748b !important; }
    .bg-slate-600 { background-color: #475569 !important; }
    .bg-slate-700 { background-color: #334155 !important; }
    .bg-purple-50 { background-color: #faf5ff !important; }
    .bg-purple-50\\/50 { background-color: rgba(250, 245, 255, 0.5) !important; }
    .bg-purple-100 { background-color: #f3e8ff !important; }
    .bg-purple-500 { background-color: #a855f7 !important; }
    .bg-purple-600 { background-color: #9333ea !important; }
    .bg-emerald-50 { background-color: #ecfdf5 !important; }
    .bg-emerald-50\\/50 { background-color: rgba(236, 253, 245, 0.5) !important; }
    .bg-emerald-50\\/30 { background-color: rgba(236, 253, 245, 0.3) !important; }
    .bg-emerald-100 { background-color: #d1fae5 !important; }
    .bg-emerald-100\\/50 { background-color: rgba(209, 250, 229, 0.5) !important; }
    .bg-emerald-500 { background-color: #10b981 !important; }
    .bg-emerald-600 { background-color: #059669 !important; }
    .bg-blue-50 { background-color: #eff6ff !important; }
    .bg-blue-50\\/50 { background-color: rgba(239, 246, 255, 0.5) !important; }
    .bg-blue-100 { background-color: #dbeafe !important; }
    .bg-sky-50 { background-color: #f0f9ff !important; }
    .bg-violet-50 { background-color: #f5f3ff !important; }
    .bg-indigo-50\\/30 { background-color: rgba(238, 242, 255, 0.3) !important; }
    .bg-indigo-50\\/50 { background-color: rgba(238, 242, 255, 0.5) !important; }
    .bg-indigo-100 { background-color: #e0e7ff !important; }
    .bg-indigo-500 { background-color: #6366f1 !important; }
    .bg-indigo-900 { background-color: #312e81 !important; }
    .bg-orange-50 { background-color: #fff7ed !important; }
    .bg-orange-50\\/50 { background-color: rgba(255, 247, 237, 0.5) !important; }
    .bg-orange-50\\/30 { background-color: rgba(255, 247, 237, 0.3) !important; }
    .bg-orange-100 { background-color: #ffedd5 !important; }
    .bg-orange-100\\/50 { background-color: rgba(255, 237, 213, 0.5) !important; }
    .bg-red-50 { background-color: #fef2f2 !important; }
    .bg-red-50\\/30 { background-color: rgba(254, 242, 242, 0.3) !important; }
    .bg-red-100 { background-color: #fee2e2 !important; }
    .bg-red-500 { background-color: #ef4444 !important; }
    .bg-amber-50 { background-color: #fffbeb !important; }
    .bg-amber-50\\/30 { background-color: rgba(255, 251, 235, 0.3) !important; }
    .bg-amber-100 { background-color: #fef3c7 !important; }
    .bg-teal-500 { background-color: #14b8a6 !important; }

    /* Borders */
    .border { border-width: 1px; border-style: solid; border-color: #e5e7eb; }
    .border-2 { border-width: 2px; border-style: solid; }
    .border-t { border-top-width: 1px; border-top-style: solid; }
    .border-b { border-bottom-width: 1px; border-bottom-style: solid; }
    .border-t-2 { border-top-width: 2px; }
    .border-none { border: none; }
    .border-dashed { border-style: dashed; }
    .border-gray-100 { border-color: #f3f4f6; }
    .border-gray-200 { border-color: #e5e7eb; }
    .border-gray-300 { border-color: #d1d5db; }
    .border-slate-200 { border-color: #e2e8f0; }
    .border-slate-300 { border-color: #cbd5e1; }
    .border-slate-500 { border-color: #64748b; }
    .border-purple-200 { border-color: #e9d5ff; }
    .border-purple-500 { border-color: #a855f7; }
    .border-emerald-100 { border-color: #d1fae5; }
    .border-emerald-200 { border-color: #a7f3d0; }
    .border-emerald-300 { border-color: #6ee7b7; }
    .border-blue-200 { border-color: #bfdbfe; }
    .border-blue-300 { border-color: #93c5fd; }
    .border-sky-200 { border-color: #bae6fd; }
    .border-violet-200 { border-color: #ddd6fe; }
    .border-indigo-100 { border-color: #e0e7ff; }
    .border-indigo-200 { border-color: #c7d2fe; }
    .border-indigo-900 { border-color: #312e81; }
    .border-orange-100 { border-color: #ffedd5; }
    .border-orange-200 { border-color: #fed7aa; }
    .border-red-100 { border-color: #fee2e2; }
    .border-red-200 { border-color: #fecaca; }
    .border-red-500 { border-color: #ef4444; }
    .border-amber-100 { border-color: #fef3c7; }
    .border-amber-200 { border-color: #fde68a; }
    .border-teal-500 { border-color: #14b8a6; }
    .rounded { border-radius: 0.25rem; }
    .rounded-lg { border-radius: 0.5rem; }
    .rounded-xl { border-radius: 0.75rem; }
    .rounded-full { border-radius: 9999px; }
    .overflow-hidden { overflow: hidden; }
    .overflow-x-auto { overflow-x: auto; }

    /* Shadows */
    .shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); }

    /* Gradient text - override for print */
    .bg-clip-text { -webkit-background-clip: text; background-clip: text; }
    .text-transparent { color: #7c3aed !important; background: none !important; -webkit-background-clip: unset !important; background-clip: unset !important; }

    /* Additional utilities */
    .sticky { position: sticky; }
    .top-0 { top: 0; }
    .z-10 { z-index: 10; }
    .cursor-pointer { cursor: pointer; }
    .outline-none { outline: none; }
    .hover\\:opacity-90:hover { opacity: 0.9; }
    .transition-all { transition: all 0.15s ease; }
    .last\\:border-b-0:last-child { border-bottom: 0; }

    /* Print-specific */
    .hidden { display: none !important; }
    .print\\:block { display: block !important; }
    .page-break { page-break-before: always; }
    .animate-pulse { display: none !important; }
    .border-dashed { display: none !important; }
    button[title="Ver documento fuente"] { display: none !important; }
    button[title="Ver documento"] { display: none !important; }
    svg { display: inline-block; vertical-align: middle; }
`;
var landscapeStyles = `
    @page { size: A4 landscape; }
    body { font-size: 11px; }
`;
function cleanContentForPdf(element, branding) {
  const content = element.cloneNode(true);
  content.querySelectorAll(".hidden").forEach((el) => {
    el.classList.remove("hidden");
  });
  content.querySelectorAll("input").forEach((el) => {
    const span = document.createElement("span");
    span.textContent = el.value || el.placeholder || "";
    span.style.cssText = el.style.cssText;
    el.parentNode?.replaceChild(span, el);
  });
  const { primary } = resolveBrandingColors(branding);
  content.querySelectorAll("button").forEach((el) => {
    if (el.classList.contains("w-full") && el.classList.contains("flex")) {
      const div = document.createElement("div");
      div.className = "flex items-center gap-3 px-4 py-3";
      div.style.backgroundColor = primary;
      Array.from(el.children).forEach((child) => {
        const clone = child.cloneNode(true);
        if (clone.classList?.contains("shrink-0") || clone.classList?.contains("rounded-lg")) {
          clone.style.backgroundColor = "rgba(255,255,255,0.2)";
          clone.querySelectorAll("svg").forEach((svg) => {
            svg.style.color = "white";
          });
        }
        if (clone.classList?.contains("flex-1")) {
          clone.querySelectorAll(".font-semibold").forEach((title) => {
            title.style.color = "white";
          });
          clone.querySelectorAll(".text-xs, .text-gray-500").forEach((sub) => {
            sub.style.color = "rgba(255,255,255,0.85)";
          });
        }
        if (clone.tagName === "svg" || clone.tagName === "SVG") {
          clone.style.color = "white";
        }
        div.appendChild(clone);
      });
      el.parentNode?.replaceChild(div, el);
    } else {
      el.remove();
    }
  });
  content.querySelectorAll("tr").forEach((tr) => {
    if (tr.className.includes("border-dashed")) {
      tr.remove();
    }
  });
  if (branding) {
    const { primary: primary2, accent, primaryLight, primaryMedium } = resolveBrandingColors(branding);
    const textColorPatterns = TEXT_COLOR_PREFIXES.map((c) => `text-${c}`);
    const bgLightPatterns = TEXT_COLOR_PREFIXES.flatMap((c) => BG_LIGHT_SHADES.map((s) => `bg-${c}-${s}`));
    const bgMediumPatterns = TEXT_COLOR_PREFIXES.map((c) => `bg-${c}-200`);
    const bgDarkPatterns = [...TEXT_COLOR_PREFIXES.flatMap((c) => BG_DARK_SHADES.map((s) => `bg-${c}-${s}`)), "bg-gradient-to-br", "from-purple"];
    content.querySelectorAll("*").forEach((el) => {
      const htmlEl = el;
      const classes = htmlEl.className || "";
      if (typeof classes !== "string") return;
      if (textColorPatterns.some((p) => classes.includes(p))) {
        htmlEl.style.color = primary2;
      }
      if (bgLightPatterns.some((p) => classes.includes(p))) {
        htmlEl.style.backgroundColor = primaryLight;
      }
      if (bgMediumPatterns.some((p) => classes.includes(p))) {
        htmlEl.style.backgroundColor = primaryMedium;
      }
      if (bgDarkPatterns.some((p) => classes.includes(p))) {
        htmlEl.style.background = `linear-gradient(to bottom right, ${accent}, ${primary2})`;
      }
      if (classes.includes("text-transparent") || classes.includes("bg-clip-text")) {
        htmlEl.style.color = primary2;
        htmlEl.style.background = "none";
        htmlEl.style.setProperty("-webkit-text-fill-color", primary2);
      }
    });
    content.querySelectorAll("h1").forEach((el) => {
      const h1 = el;
      h1.style.color = primary2;
      h1.style.background = "none";
      h1.style.setProperty("-webkit-text-fill-color", primary2);
    });
    content.querySelectorAll(".font-semibold").forEach((el) => {
      el.style.color = primary2;
    });
    if (branding.logo_url) {
      const iconBox = content.querySelector(".w-12.h-12.rounded-xl");
      if (iconBox) {
        const logoDiv = document.createElement("div");
        logoDiv.className = "pdf-brand-logo";
        logoDiv.innerHTML = `<img src="${branding.logo_url}" alt="${branding.name || "Logo"}" />`;
        iconBox.parentNode?.replaceChild(logoDiv, iconBox);
      }
    }
  }
  return content;
}
function generateBrandingStyles(branding) {
  if (!branding) return "";
  const { primary, secondary, accent, primaryLight, primaryMedium, primaryLighter } = resolveBrandingColors(branding);
  const textSelectors = TEXT_COLOR_PREFIXES.map((c) => `[class*="text-${c}-"]`).join(",\n        ");
  const bgLightSelectors = TEXT_COLOR_PREFIXES.flatMap((c) => BG_LIGHT_SHADES.map((s) => `[class*="bg-${c}-${s}"]`)).join(",\n        ");
  const bgDarkSelectors = TEXT_COLOR_PREFIXES.flatMap((c) => BG_DARK_SHADES.map((s) => `[class*="bg-${c}-${s}"]`)).join(",\n        ");
  const borderSelectors = TEXT_COLOR_PREFIXES.flatMap((c) => BORDER_SHADES.map((s) => `[class*="border-${c}-${s}"]`)).join(",\n        ");
  const gradientSelectors = TEXT_COLOR_PREFIXES.map((c) => `[class*="from-${c}-"]`).join(",\n        ");
  return `
        /* Brand color overrides for PDF export */

        :root {
            --brand-primary: ${primary};
            --brand-secondary: ${secondary};
            --brand-accent: ${accent};
        }

        /* Text colors -> brand primary */
        ${textSelectors} {
            color: ${primary} !important;
        }

        /* Gradient text (headers) */
        .text-transparent, .bg-clip-text,
        h1.text-transparent, h1.bg-clip-text {
            color: ${primary} !important;
            background: none !important;
            background-image: none !important;
            -webkit-background-clip: unset !important;
            background-clip: unset !important;
            -webkit-text-fill-color: ${primary} !important;
        }

        /* Dark backgrounds -> brand primary */
        ${bgDarkSelectors} {
            background-color: ${primary} !important;
        }

        /* Light backgrounds -> brand light */
        ${bgLightSelectors} {
            background-color: ${primaryLight} !important;
        }

        /* Opacity variants */
        [class*="-50\\/"], [class*="-100\\/"] {
            background-color: ${primaryLighter} !important;
        }

        /* Borders -> brand medium */
        ${borderSelectors} {
            border-color: ${primaryMedium} !important;
        }

        /* Gradients -> brand gradient */
        .bg-gradient-to-br, .bg-gradient-to-r,
        ${gradientSelectors} {
            background: linear-gradient(to bottom right, ${accent}, ${primary}) !important;
            background-image: linear-gradient(to bottom right, ${accent}, ${primary}) !important;
        }

        /* Header icon box */
        .w-12.h-12.rounded-xl {
            background: linear-gradient(to bottom right, ${accent}, ${primary}) !important;
        }

        /* Section header icon boxes */
        .w-8.h-8.rounded-lg, .w-10.h-10.rounded-lg {
            background-color: ${primaryMedium} !important;
        }

        /* PDF section headers */
        .pdf-section-header { background-color: ${primary} !important; }
        .pdf-section-header * { color: white !important; }
        .pdf-section-header .text-xs,
        .pdf-section-header .text-gray-500 { color: rgba(255, 255, 255, 0.85) !important; }
        .pdf-section-header > div:first-child { background-color: rgba(255, 255, 255, 0.2) !important; }
        .pdf-section-title { color: ${primary} !important; }

        /* Brand logo */
        .pdf-brand-logo {
            width: 3rem; height: 3rem; border-radius: 0.75rem;
            background: white; border: 1px solid #e5e7eb;
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); overflow: hidden;
        }
        .pdf-brand-logo img { width: 2.5rem; height: 2.5rem; object-fit: contain; }
    `;
}
function generatePdfFooter(branding) {
  const companyName = branding?.name || "Jogi";
  const tagline = branding?.name ? "" : " - Sistema de Gesti\xF3n Documental";
  return `
        <div style="margin-top: 2rem; padding-top: 1rem; font-size: 0.75rem; color: #9ca3af; text-align: center; border-top: 1px solid #e5e7eb;">
            Generado el ${(/* @__PURE__ */ new Date()).toLocaleString("es-CL")} \u2022 ${companyName}${tagline}
        </div>
    `;
}
function buildHtmlDocument(options) {
  const { title, styles, bodyHtml, branding } = options;
  return `<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <title>${title}</title>
    <style>${styles.join("\n")}</style>
</head>
<body>
    ${bodyHtml}
    ${generatePdfFooter(branding)}
</body>
</html>`;
}
function generatePdfHtml(options) {
  const { title, content, orientation = "landscape", extraStyles = "", branding } = options;
  const defaultPortraitStyles = `@page { size: A4 portrait; } body { font-size: 10px; }`;
  const orientationStyles = orientation === "landscape" ? landscapeStyles : defaultPortraitStyles;
  const bodyHtml = typeof content === "string" ? content : content.outerHTML;
  return buildHtmlDocument({
    title,
    styles: [basePdfStyles, orientationStyles, generateBrandingStyles(branding), extraStyles],
    bodyHtml,
    branding
  });
}
function printHtml(html) {
  const iframe = document.createElement("iframe");
  iframe.style.cssText = "position:fixed;top:-10000px;left:-10000px;width:0;height:0;border:none;";
  document.body.appendChild(iframe);
  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!iframeDoc) {
    document.body.removeChild(iframe);
    return;
  }
  iframeDoc.open();
  iframeDoc.write(html);
  iframeDoc.close();
  iframe.onload = () => {
    setTimeout(() => {
      iframe.contentWindow?.print();
      setTimeout(() => document.body.removeChild(iframe), 1e3);
    }, 100);
  };
}
function generateAndPrintPdf(options) {
  const { element, title, orientation, extraStyles, branding } = options;
  const cleanedContent = cleanContentForPdf(element, branding);
  const html = generatePdfHtml({ title, content: cleanedContent, orientation, extraStyles, branding });
  printHtml(html);
}
function generateCombinedPdf(options) {
  const html = generateCombinedPdfHtml(options);
  if (html) printHtml(html);
}
function generateCombinedPdfHtml(options) {
  const { title, reports, branding } = options;
  if (reports.length === 0) return "";
  const { primary } = resolveBrandingColors(branding);
  const sectionsHtml = reports.map((report, index) => {
    const cleaned = cleanContentForPdf(report.element.cloneNode(true), branding);
    const sectionHeader = document.createElement("div");
    sectionHeader.className = "pdf-section-header";
    sectionHeader.innerHTML = `<h2 class="pdf-section-title">${report.title}</h2>`;
    const wrapper = document.createElement("div");
    wrapper.className = `pdf-report-section ${report.orientation === "portrait" ? "portrait-section" : "landscape-section"}`;
    if (index > 0) {
      wrapper.style.pageBreakBefore = "always";
    }
    wrapper.appendChild(sectionHeader);
    wrapper.appendChild(cleaned);
    return wrapper.outerHTML;
  }).join("");
  const combinedStyles = `
        @page { size: A4 landscape; margin: 10mm; }
        @page portrait { size: A4 portrait; }
        .portrait-section { page: portrait; }
        body { font-size: 10px; }
        .pdf-report-section { padding: 8px; }
        .pdf-section-header { margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid ${primary}; }
        .pdf-section-title { font-size: 1.25rem; font-weight: 700; color: ${primary}; margin: 0; }
        th, td { padding: 0.375rem 0.5rem; font-size: 0.75rem; }
    `;
  return generatePdfHtml({
    title,
    content: sectionsHtml,
    extraStyles: combinedStyles,
    branding
  });
}

// src/utils.ts
var displayValue = (value) => {
  if (value === void 0 || value === null || value === "") return "";
  return String(value);
};
var displayCurrency = (value) => {
  if (value === void 0 || value === null) return "";
  return `$ ${value.toLocaleString("es-CL")}`;
};
var displayCurrencyCompact = (value, isDeduction = false) => {
  if (value === void 0 || value === null) return "\u2014";
  const abs = Math.abs(value);
  const sign = isDeduction && value > 0 ? "-" : "";
  const thousands = Math.round(abs / 1e3);
  return `${sign}$${thousands.toLocaleString("es-CL")}`;
};
var LOWERCASE_ES = /* @__PURE__ */ new Set(["de", "del", "el", "la", "los", "las", "un", "una", "y", "e", "o", "en", "con", "por", "para", "a", "al"]);
var toTitleCase = (str, preserve) => {
  if (!str) return "";
  return str.trim().replace(/_/g, " ").split(/\s+/).map((word, i) => {
    if (preserve?.has(word)) return word;
    const lower = word.toLowerCase();
    if (i > 0 && LOWERCASE_ES.has(lower)) return lower;
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }).join(" ");
};
var displayUF = (value) => {
  if (value === void 0 || value === null) return "";
  return `${value.toLocaleString("es-CL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} UF`;
};
var displayDate = (dateStr) => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("es-CL", { day: "2-digit", month: "2-digit", year: "numeric" });
  } catch {
    return dateStr;
  }
};
var calculateAge = (dateStr) => {
  if (!dateStr) return "\u2014";
  try {
    const birthDate = new Date(dateStr);
    if (isNaN(birthDate.getTime())) return "\u2014";
    const today = /* @__PURE__ */ new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birthDate.getDate()) {
      age--;
    }
    return `${age} a\xF1os`;
  } catch {
    return "\u2014";
  }
};

// src/styles.ts
var T = {
  // ---------------------------------------------------------------------------
  // Table base
  // ---------------------------------------------------------------------------
  table: "w-full text-xs",
  // ---------------------------------------------------------------------------
  // Accordion header
  // ---------------------------------------------------------------------------
  /** Title text in the accordion header bar */
  headerTitle: "font-normal text-xs truncate",
  /** Stats/summary values shown next to the title */
  headerStat: "font-normal text-xs",
  /** Label before a stat value (e.g. "ENE:", "Total:") */
  headerStatLabel: "font-normal text-xs uppercase",
  /** Count badge (e.g. "3 deudas", "5 documentos") */
  headerCount: "font-medium text-xs",
  // ---------------------------------------------------------------------------
  // Column headers (thead)
  // ---------------------------------------------------------------------------
  th: "text-gray-500 font-medium text-xs uppercase",
  // ---------------------------------------------------------------------------
  // Body cells
  // ---------------------------------------------------------------------------
  /** Label cell wrapper — prevents overflow in fixed-width columns */
  cellLabel: "overflow-hidden",
  /** Text inputs inside data rows (entity name, label, type) */
  input: "bg-transparent border-none outline-none text-xs truncate",
  /** Input with font-medium emphasis (row label, entity name) */
  inputLabel: "bg-transparent border-none outline-none text-xs font-medium truncate",
  /** Placeholder/add-row inputs */
  inputPlaceholder: "bg-transparent border-none outline-none text-xs text-gray-500 placeholder-gray-400 truncate",
  /** Row label in monthlytable (smaller, muted) */
  rowLabel: "bg-transparent border-none outline-none text-xs font-medium text-gray-600 truncate",
  // ---------------------------------------------------------------------------
  // Section headers inside body (e.g. "Rentas Líquidas", "Obligaciones")
  // ---------------------------------------------------------------------------
  sectionTitle: "font-normal text-xs",
  // ---------------------------------------------------------------------------
  // Totals row
  // ---------------------------------------------------------------------------
  totalLabel: "font-medium text-xs",
  totalValue: "font-medium text-xs",
  // ---------------------------------------------------------------------------
  // Footer totals (bold)
  // ---------------------------------------------------------------------------
  footerLabel: "font-bold",
  footerValue: "font-bold",
  // ---------------------------------------------------------------------------
  // Miscellaneous
  // ---------------------------------------------------------------------------
  /** Small label text (descriptions, muted info) */
  muted: "text-xs text-gray-600",
  /** Empty state italic */
  empty: "text-xs text-gray-400 italic",
  /** Value text inside compact cards */
  cardLabel: "text-xs font-medium",
  cardValue: "text-xs font-semibold"
};

export { T, basePdfStyles, calculateAge, cleanContentForPdf, displayCurrency, displayCurrencyCompact, displayDate, displayUF, displayValue, generateAndPrintPdf, generateBrandingStyles, generateCombinedPdf, generateCombinedPdfHtml, generatePdfFooter, generatePdfHtml, landscapeStyles, printHtml, toTitleCase };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map