/* Auxiliary functions */

import { DEFAULT_CURRENCY, DEFAULT_LANG } from '@/lib/constants'

// handle form validation rules
export function addRule (label, rule, rules) {
  if (!rules.hasOwnProperty(label)) {
    // preset array
    rules[label] = []
  }
  rules[label].push(rule)
}

// custom validation for masked inputs
export function checkMask (errMsg) {
  return (rule, value, cb) => {
    if (typeof value === 'string' && value.indexOf('_') === -1) {
      // mask matched
      cb()
    } else {
      cb(new Error(errMsg))
    }
  }
}

// custom validation for date input
export function checkDate (errMsg) {
  return (rule, value, cb) => {
    if (typeof value === 'string') {
      // check date
      let d = new Date(value)
      if (!isNaN(d)) {
        // valid date string
        cb()
        return
      }
    }
    cb(new Error(errMsg))
  }
}

// parse number to string with money format
export function formatMoney (price, currency = DEFAULT_CURRENCY, lang = DEFAULT_LANG) {
  // format pt-BR, en-US
  lang = lang.replace('_', '-')
  let priceString
  try {
    priceString = price.toLocaleString(lang, { style: 'currency', currency: currency })
  } catch (e) {
    // fallback
    priceString = price
  }
  return priceString
}

// parse date string to ISO format
export function formatDate (date) {
  // yyyy-mm-dd
  return new Date(date).toISOString().substr(0, 10)
}

// compare strings without accents
export function compareStrings (base, compare) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
  return base.localeCompare(compare, 'en', { sensitivity: 'base' }) === 0
}

// update page title header
export function updateTitle (title, subtitle) {
  // global document
  if (typeof document === 'object' && document !== null) {
    if (!title) {
      // get current title
      title = document.title || ''
    }
    if (subtitle) {
      title += ' · ' + subtitle
    }
    document.title = title
  }
}
