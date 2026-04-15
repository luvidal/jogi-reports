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
declare const toTitleCase: (str: string, preserve?: Set<string>) => string;
declare const displayUF: (value: number | undefined | null) => string;
declare const displayDate: (dateStr: string | undefined | null) => string;
declare const calculateAge: (dateStr: string, referenceDate?: Date) => string;

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

export { type CompanyBranding, T, calculateAge, displayCurrency, displayCurrencyCompact, displayDate, displayUF, displayValue, toTitleCase };
