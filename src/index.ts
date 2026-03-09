// Main entry point — PDF generation, formatting utils, styles, types

// PDF generation
export {
    basePdfStyles,
    landscapeStyles,
    cleanContentForPdf,
    generateBrandingStyles,
    generatePdfFooter,
    generatePdfHtml,
    printHtml,
    generateAndPrintPdf,
    generateCombinedPdf,
    generateCombinedPdfHtml,
} from './pdf'

// Formatting utilities
export {
    displayValue,
    displayCurrency,
    displayCurrencyCompact,
    toTitleCase,
    displayUF,
    displayDate,
    calculateAge,
} from './utils'

// Table styles
export { T } from './styles'

// Types
export type {
    CompanyBranding,
    ReportSection,
} from './types'
