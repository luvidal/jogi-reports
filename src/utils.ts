/**
 * Shared utility functions for reports
 *
 * DIRECTIVE: Display if present, blank if not
 * This allows analysts to see at a glance what information is missing.
 */

export const displayValue = (value: any): string => {
    if (value === undefined || value === null || value === '') return ''
    return String(value)
}

export const displayCurrency = (value: number | undefined | null): string => {
    if (value === undefined || value === null) return ''
    return `$ ${value.toLocaleString('es-CL')}`
}

/**
 * Compact currency: rounds to nearest thousand and displays without decimals.
 * 1_393_231 → "$1.393", 539_000 → "$539", 150 → "$0"
 * Full value is preserved in editing and shown in tooltip (displayCurrency).
 */
export const displayCurrencyCompact = (value: number | undefined | null, isDeduction = false): string => {
    if (value === undefined || value === null) return '—'
    const abs = Math.abs(value)
    const sign = isDeduction && value > 0 ? '-' : ''
    const thousands = Math.round(abs / 1000)
    return `${sign}$${thousands.toLocaleString('es-CL')}`
}

/**
 * Convert UPPER CASE or snake_case label to Title Case (Spanish).
 * Keeps Spanish articles/prepositions lowercase (except when first word).
 * Optional `preserve` set keeps specific tokens in their original case (e.g. acronyms).
 */
const LOWERCASE_ES = new Set(['de', 'del', 'el', 'la', 'los', 'las', 'un', 'una', 'y', 'e', 'o', 'en', 'con', 'por', 'para', 'a', 'al'])

export const toTitleCase = (str: string, preserve?: Set<string>): string => {
    if (!str) return ''
    return str
        .trim()
        .replace(/_/g, ' ')
        .split(/\s+/)
        .map((word, i) => {
            if (preserve?.has(word)) return word
            const lower = word.toLowerCase()
            if (i > 0 && LOWERCASE_ES.has(lower)) return lower
            return lower.charAt(0).toUpperCase() + lower.slice(1)
        })
        .join(' ')
}

export const displayUF = (value: number | undefined | null): string => {
    if (value === undefined || value === null) return ''
    return `${value.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} UF`
}

export const displayDate = (dateStr: string | undefined | null): string => {
    if (!dateStr) return ''
    try {
        const date = new Date(dateStr)
        if (isNaN(date.getTime())) return dateStr
        return date.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' })
    } catch {
        return dateStr
    }
}

export const calculateAge = (dateStr: string): string => {
    if (!dateStr) return '—'
    try {
        const birthDate = new Date(dateStr)
        if (isNaN(birthDate.getTime())) return '—'
        const today = new Date()
        let age = today.getFullYear() - birthDate.getFullYear()
        const monthDiff = today.getMonth() - birthDate.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        return `${age} años`
    } catch {
        return '—'
    }
}
