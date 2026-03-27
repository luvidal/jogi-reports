/**
 * Company branding data for white-label reports
 */
interface CompanyBranding {
    id: string;
    name: string;
    logo_url: string | null;
    primary_color: string | null;
    secondary_color: string | null;
    accent_color: string | null;
}
/**
 * Report section for combined PDF
 */
interface ReportSection {
    title: string;
    element: HTMLElement;
    orientation?: 'landscape' | 'portrait';
}

/**
 * PDF generation utilities for reports
 * Shared CSS and HTML generation for print-ready reports
 */

/**
 * Base CSS styles shared across all report PDFs
 */
declare const basePdfStyles = "\n    @page { margin: 12mm; }\n    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n    body {\n        margin: 0;\n        padding: 16px;\n        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;\n        line-height: 1.4;\n        color: #1f2937;\n        -webkit-print-color-adjust: exact !important;\n        print-color-adjust: exact !important;\n        color-adjust: exact !important;\n    }\n    table { border-collapse: collapse; width: 100%; }\n    th, td { text-align: left; vertical-align: middle; }\n\n    /* Layout utilities */\n    .flex { display: flex; }\n    .flex-col { flex-direction: column; }\n    .flex-wrap { flex-wrap: wrap; }\n    .items-center { align-items: center; }\n    .items-start { align-items: flex-start; }\n    .justify-center { justify-content: center; }\n    .justify-between { justify-content: space-between; }\n    .justify-end { justify-content: flex-end; }\n    .gap-1 { gap: 0.25rem; }\n    .gap-1\\.5 { gap: 0.375rem; }\n    .gap-2 { gap: 0.5rem; }\n    .gap-3 { gap: 0.75rem; }\n    .gap-4 { gap: 1rem; }\n    .gap-6 { gap: 1.5rem; }\n    .gap-x-1 { column-gap: 0.25rem; }\n    .shrink-0 { flex-shrink: 0; }\n    .flex-1 { flex: 1 1 0%; }\n    .grid { display: grid; }\n    .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }\n    .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n    .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }\n    .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n    .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }\n\n    /* Spacing */\n    .p-3 { padding: 0.75rem; }\n    .p-4 { padding: 1rem; }\n    .p-8 { padding: 2rem; }\n    .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }\n    .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }\n    .px-4 { padding-left: 1rem; padding-right: 1rem; }\n    .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }\n    .py-1\\.5 { padding-top: 0.375rem; padding-bottom: 0.375rem; }\n    .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }\n    .py-2\\.5 { padding-top: 0.625rem; padding-bottom: 0.625rem; }\n    .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }\n    .pl-1 { padding-left: 0.25rem; }\n    .pt-3 { padding-top: 0.75rem; }\n    .pt-4 { padding-top: 1rem; }\n    .mt-0\\.5 { margin-top: 0.125rem; }\n    .mt-1 { margin-top: 0.25rem; }\n    .mt-3 { margin-top: 0.75rem; }\n    .mt-4 { margin-top: 1rem; }\n    .mt-10 { margin-top: 2.5rem; }\n    .mb-1 { margin-bottom: 0.25rem; }\n    .mb-2 { margin-bottom: 0.5rem; }\n    .mb-3 { margin-bottom: 0.75rem; }\n    .mb-4 { margin-bottom: 1rem; }\n    .mr-1 { margin-right: 0.25rem; }\n    .ml-1 { margin-left: 0.25rem; }\n    .ml-2 { margin-left: 0.5rem; }\n    .mx-2 { margin-left: 0.5rem; margin-right: 0.5rem; }\n    .space-y-1\\.5 > * + * { margin-top: 0.375rem; }\n    .space-y-2 > * + * { margin-top: 0.5rem; }\n    .space-y-3 > * + * { margin-top: 0.75rem; }\n    .space-y-4 > * + * { margin-top: 1rem; }\n    .space-y-6 > * + * { margin-top: 1.5rem; }\n    .space-y-8 > * + * { margin-top: 2rem; }\n\n    /* Sizing */\n    .w-full { width: 100%; }\n    .w-2 { width: 0.5rem; }\n    .w-3 { width: 0.75rem; }\n    .w-4 { width: 1rem; }\n    .w-5 { width: 1.25rem; }\n    .w-6 { width: 1.5rem; }\n    .w-8 { width: 2rem; }\n    .w-10 { width: 2.5rem; }\n    .w-12 { width: 3rem; }\n    .w-16 { width: 4rem; }\n    .w-2\\/5 { width: 40%; }\n    .h-2 { height: 0.5rem; }\n    .h-3 { height: 0.75rem; }\n    .h-4 { height: 1rem; }\n    .h-5 { height: 1.25rem; }\n    .h-6 { height: 1.5rem; }\n    .h-8 { height: 2rem; }\n    .h-10 { height: 2.5rem; }\n    .h-12 { height: 3rem; }\n    .h-16 { height: 4rem; }\n    .min-w-0 { min-width: 0; }\n    .min-w-\\[250px\\] { min-width: 250px; }\n    .max-w-6xl { max-width: 72rem; }\n    .mx-auto { margin-left: auto; margin-right: auto; }\n\n    /* Typography */\n    .text-xs { font-size: 0.75rem; line-height: 1rem; }\n    .text-sm { font-size: 0.875rem; line-height: 1.25rem; }\n    .text-base { font-size: 1rem; line-height: 1.5rem; }\n    .text-lg { font-size: 1.125rem; line-height: 1.75rem; }\n    .text-2xl { font-size: 1.5rem; line-height: 2rem; }\n    .font-normal { font-weight: 400; }\n    .font-medium { font-weight: 500; }\n    .font-semibold { font-weight: 600; }\n    .font-bold { font-weight: 700; }\n    .font-mono { font-family: ui-monospace, monospace; }\n    .text-left { text-align: left; }\n    .text-center { text-align: center; }\n    .text-right { text-align: right; }\n    .uppercase { text-transform: uppercase; }\n    .capitalize { text-transform: capitalize; }\n    .tracking-wider { letter-spacing: 0.05em; }\n    .italic { font-style: italic; }\n    .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n    .inline-flex { display: inline-flex; }\n    .align-middle { vertical-align: middle; }\n\n    /* Colors - Text */\n    .text-white { color: #ffffff !important; }\n    .text-gray-300 { color: #d1d5db; }\n    .text-gray-400 { color: #9ca3af; }\n    .text-gray-500 { color: #6b7280; }\n    .text-gray-600 { color: #4b5563; }\n    .text-gray-700 { color: #374151; }\n    .text-gray-800 { color: #1f2937; }\n    .text-slate-300 { color: #cbd5e1; }\n    .text-slate-400 { color: #94a3b8; }\n    .text-slate-500 { color: #64748b; }\n    .text-slate-600 { color: #475569; }\n    .text-slate-700 { color: #334155; }\n    .text-purple-600 { color: #9333ea; }\n    .text-purple-700 { color: #7c3aed; }\n    .text-purple-800 { color: #6b21a8; }\n    .text-emerald-500 { color: #10b981; }\n    .text-emerald-600 { color: #059669; }\n    .text-emerald-700 { color: #047857 !important; }\n    .text-emerald-800 { color: #065f46 !important; }\n    .text-sky-700 { color: #0369a1; }\n    .text-violet-700 { color: #6d28d9; }\n    .text-blue-700 { color: #1d4ed8; }\n    .text-indigo-600 { color: #4f46e5; }\n    .text-indigo-700 { color: #4338ca; }\n    .text-orange-600 { color: #ea580c; }\n    .text-orange-700 { color: #c2410c; }\n    .text-orange-800 { color: #9a3412; }\n    .text-red-700 { color: #b91c1c; }\n    .text-amber-700 { color: #b45309; }\n    .text-teal-700 { color: #0f766e; }\n\n    /* Colors - Backgrounds */\n    .bg-white { background-color: #ffffff !important; }\n    .bg-transparent { background-color: transparent !important; }\n    .bg-gray-50 { background-color: #f9fafb !important; }\n    .bg-gray-100 { background-color: #f3f4f6 !important; }\n    .bg-slate-50 { background-color: #f8fafc !important; }\n    .bg-slate-200 { background-color: #e2e8f0 !important; }\n    .bg-slate-500 { background-color: #64748b !important; }\n    .bg-slate-600 { background-color: #475569 !important; }\n    .bg-slate-700 { background-color: #334155 !important; }\n    .bg-purple-50 { background-color: #faf5ff !important; }\n    .bg-purple-50\\/50 { background-color: rgba(250, 245, 255, 0.5) !important; }\n    .bg-purple-100 { background-color: #f3e8ff !important; }\n    .bg-purple-500 { background-color: #a855f7 !important; }\n    .bg-purple-600 { background-color: #9333ea !important; }\n    .bg-emerald-50 { background-color: #ecfdf5 !important; }\n    .bg-emerald-50\\/50 { background-color: rgba(236, 253, 245, 0.5) !important; }\n    .bg-emerald-50\\/30 { background-color: rgba(236, 253, 245, 0.3) !important; }\n    .bg-emerald-100 { background-color: #d1fae5 !important; }\n    .bg-emerald-100\\/50 { background-color: rgba(209, 250, 229, 0.5) !important; }\n    .bg-emerald-500 { background-color: #10b981 !important; }\n    .bg-emerald-600 { background-color: #059669 !important; }\n    .bg-blue-50 { background-color: #eff6ff !important; }\n    .bg-blue-50\\/50 { background-color: rgba(239, 246, 255, 0.5) !important; }\n    .bg-blue-100 { background-color: #dbeafe !important; }\n    .bg-sky-50 { background-color: #f0f9ff !important; }\n    .bg-violet-50 { background-color: #f5f3ff !important; }\n    .bg-indigo-50\\/30 { background-color: rgba(238, 242, 255, 0.3) !important; }\n    .bg-indigo-50\\/50 { background-color: rgba(238, 242, 255, 0.5) !important; }\n    .bg-indigo-100 { background-color: #e0e7ff !important; }\n    .bg-indigo-500 { background-color: #6366f1 !important; }\n    .bg-indigo-900 { background-color: #312e81 !important; }\n    .bg-orange-50 { background-color: #fff7ed !important; }\n    .bg-orange-50\\/50 { background-color: rgba(255, 247, 237, 0.5) !important; }\n    .bg-orange-50\\/30 { background-color: rgba(255, 247, 237, 0.3) !important; }\n    .bg-orange-100 { background-color: #ffedd5 !important; }\n    .bg-orange-100\\/50 { background-color: rgba(255, 237, 213, 0.5) !important; }\n    .bg-red-50 { background-color: #fef2f2 !important; }\n    .bg-red-50\\/30 { background-color: rgba(254, 242, 242, 0.3) !important; }\n    .bg-red-100 { background-color: #fee2e2 !important; }\n    .bg-red-500 { background-color: #ef4444 !important; }\n    .bg-amber-50 { background-color: #fffbeb !important; }\n    .bg-amber-50\\/30 { background-color: rgba(255, 251, 235, 0.3) !important; }\n    .bg-amber-100 { background-color: #fef3c7 !important; }\n    .bg-teal-500 { background-color: #14b8a6 !important; }\n\n    /* Borders */\n    .border { border-width: 1px; border-style: solid; border-color: #e5e7eb; }\n    .border-2 { border-width: 2px; border-style: solid; }\n    .border-t { border-top-width: 1px; border-top-style: solid; }\n    .border-b { border-bottom-width: 1px; border-bottom-style: solid; }\n    .border-t-2 { border-top-width: 2px; }\n    .border-none { border: none; }\n    .border-dashed { border-style: dashed; }\n    .border-gray-100 { border-color: #f3f4f6; }\n    .border-gray-200 { border-color: #e5e7eb; }\n    .border-gray-300 { border-color: #d1d5db; }\n    .border-slate-200 { border-color: #e2e8f0; }\n    .border-slate-300 { border-color: #cbd5e1; }\n    .border-slate-500 { border-color: #64748b; }\n    .border-purple-200 { border-color: #e9d5ff; }\n    .border-purple-500 { border-color: #a855f7; }\n    .border-emerald-100 { border-color: #d1fae5; }\n    .border-emerald-200 { border-color: #a7f3d0; }\n    .border-emerald-300 { border-color: #6ee7b7; }\n    .border-blue-200 { border-color: #bfdbfe; }\n    .border-blue-300 { border-color: #93c5fd; }\n    .border-sky-200 { border-color: #bae6fd; }\n    .border-violet-200 { border-color: #ddd6fe; }\n    .border-indigo-100 { border-color: #e0e7ff; }\n    .border-indigo-200 { border-color: #c7d2fe; }\n    .border-indigo-900 { border-color: #312e81; }\n    .border-orange-100 { border-color: #ffedd5; }\n    .border-orange-200 { border-color: #fed7aa; }\n    .border-red-100 { border-color: #fee2e2; }\n    .border-red-200 { border-color: #fecaca; }\n    .border-red-500 { border-color: #ef4444; }\n    .border-amber-100 { border-color: #fef3c7; }\n    .border-amber-200 { border-color: #fde68a; }\n    .border-teal-500 { border-color: #14b8a6; }\n    .rounded { border-radius: 0.25rem; }\n    .rounded-lg { border-radius: 0.5rem; }\n    .rounded-xl { border-radius: 0.75rem; }\n    .rounded-full { border-radius: 9999px; }\n    .overflow-hidden { overflow: hidden; }\n    .overflow-x-auto { overflow-x: auto; }\n\n    /* Shadows */\n    .shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }\n    .shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); }\n\n    /* Gradient text - override for print */\n    .bg-clip-text { -webkit-background-clip: text; background-clip: text; }\n    .text-transparent { color: #7c3aed !important; background: none !important; -webkit-background-clip: unset !important; background-clip: unset !important; }\n\n    /* Additional utilities */\n    .sticky { position: sticky; }\n    .top-0 { top: 0; }\n    .z-10 { z-index: 10; }\n    .cursor-pointer { cursor: pointer; }\n    .outline-none { outline: none; }\n    .hover\\:opacity-90:hover { opacity: 0.9; }\n    .transition-all { transition: all 0.15s ease; }\n    .last\\:border-b-0:last-child { border-bottom: 0; }\n\n    /* Print-specific */\n    .hidden { display: none !important; }\n    .print\\:block { display: block !important; }\n    .page-break { page-break-before: always; }\n    .animate-pulse { display: none !important; }\n    .border-dashed { display: none !important; }\n    button[title=\"Ver documento fuente\"] { display: none !important; }\n    button[title=\"Ver documento\"] { display: none !important; }\n    svg { display: inline-block; vertical-align: middle; }\n";
/**
 * Landscape-specific styles for income reports
 */
declare const landscapeStyles = "\n    @page { size: A4 landscape; }\n    body { font-size: 11px; }\n";
/**
 * Clean content for PDF generation
 * Removes interactive elements and prepares for print
 * Applies branding colors directly via inline styles
 */
declare function cleanContentForPdf(element: HTMLElement, branding?: CompanyBranding | null): HTMLElement;
/**
 * Generate CSS for brand colors (applied only in extracted PDF)
 * Creates CSS custom properties and override classes for brand colors
 * IMPORTANT: This replaces ALL app colors with org brand colors
 */
declare function generateBrandingStyles(branding?: CompanyBranding | null): string;
/**
 * Generate PDF footer with timestamp and optional company branding
 */
declare function generatePdfFooter(branding?: CompanyBranding | null): string;
/**
 * Generate complete PDF HTML document
 */
declare function generatePdfHtml(options: {
    title: string;
    content: HTMLElement | string;
    orientation?: 'landscape' | 'portrait';
    extraStyles?: string;
    branding?: CompanyBranding | null;
}): string;
/**
 * Print HTML using a hidden iframe (no new tab)
 */
declare function printHtml(html: string): void;
/**
 * Complete PDF generation function
 */
declare function generateAndPrintPdf(options: {
    element: HTMLElement;
    title: string;
    orientation?: 'landscape' | 'portrait';
    extraStyles?: string;
    branding?: CompanyBranding | null;
}): void;
/**
 * Generate combined PDF with multiple reports
 * Each report starts on a new page with its own orientation
 */
declare function generateCombinedPdf(options: {
    title: string;
    reports: ReportSection[];
    branding?: CompanyBranding | null;
}): void;
/**
 * Generate combined PDF HTML without opening a window
 * Returns the HTML string for use in print-preview modal
 */
declare function generateCombinedPdfHtml(options: {
    title: string;
    reports: ReportSection[];
    branding?: CompanyBranding | null;
}): string;

/**
 * Shared utility functions for reports
 *
 * DIRECTIVE: Display if present, blank if not
 * This allows analysts to see at a glance what information is missing.
 */
declare const displayValue: (value: any) => string;
declare const displayCurrency: (value: number | undefined | null) => string;
/**
 * Compact currency: rounds to nearest thousand and displays without decimals.
 * 1_393_231 → "$1.393", 539_000 → "$539", 150 → "$0"
 * Full value is preserved in editing and shown in tooltip (displayCurrency).
 */
declare const displayCurrencyCompact: (value: number | undefined | null, isDeduction?: boolean) => string;
/** Convert UPPER CASE or snake_case label to Title Case */
declare const toTitleCase: (str: string) => string;
declare const displayUF: (value: number | undefined | null) => string;
declare const displayDate: (dateStr: string | undefined | null) => string;
declare const calculateAge: (dateStr: string) => string;

declare const T: {
    readonly table: "w-full text-xs";
    /** Title text in the accordion header bar */
    readonly headerTitle: "font-normal text-xs truncate";
    /** Stats/summary values shown next to the title */
    readonly headerStat: "font-normal text-xs";
    /** Label before a stat value (e.g. "ENE:", "Total:") */
    readonly headerStatLabel: "font-normal text-xs uppercase";
    /** Count badge (e.g. "3 deudas", "5 documentos") */
    readonly headerCount: "font-medium text-xs";
    readonly th: "text-gray-500 font-medium text-xs uppercase";
    /** Label cell wrapper — prevents overflow in fixed-width columns */
    readonly cellLabel: "overflow-hidden";
    /** Text inputs inside data rows (entity name, label, type) */
    readonly input: "bg-transparent border-none outline-none text-xs truncate";
    /** Input with font-medium emphasis (row label, entity name) */
    readonly inputLabel: "bg-transparent border-none outline-none text-xs font-medium truncate";
    /** Placeholder/add-row inputs */
    readonly inputPlaceholder: "bg-transparent border-none outline-none text-xs text-gray-500 placeholder-gray-400 truncate";
    /** Row label in monthlytable (smaller, muted) */
    readonly rowLabel: "bg-transparent border-none outline-none text-xs font-medium text-gray-600 truncate";
    readonly sectionTitle: "font-normal text-xs";
    readonly totalLabel: "font-medium text-xs";
    readonly totalValue: "font-medium text-xs";
    readonly footerLabel: "font-bold";
    readonly footerValue: "font-bold";
    /** Small label text (descriptions, muted info) */
    readonly muted: "text-xs text-gray-600";
    /** Empty state italic */
    readonly empty: "text-xs text-gray-400 italic";
    /** Value text inside compact cards */
    readonly cardLabel: "text-xs font-medium";
    readonly cardValue: "text-xs font-semibold";
};

export { type CompanyBranding, type ReportSection, T, basePdfStyles, calculateAge, cleanContentForPdf, displayCurrency, displayCurrencyCompact, displayDate, displayUF, displayValue, generateAndPrintPdf, generateBrandingStyles, generateCombinedPdf, generateCombinedPdfHtml, generatePdfFooter, generatePdfHtml, landscapeStyles, printHtml, toTitleCase };
