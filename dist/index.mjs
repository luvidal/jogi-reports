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
var calculateAge = (dateStr, referenceDate) => {
  if (!dateStr) return "\u2014";
  try {
    const birthDate = new Date(dateStr);
    if (isNaN(birthDate.getTime())) return "\u2014";
    const today = referenceDate ?? /* @__PURE__ */ new Date();
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

export { T, calculateAge, displayCurrency, displayCurrencyCompact, displayDate, displayUF, displayValue, toTitleCase };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map