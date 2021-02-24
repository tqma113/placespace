/**
 * n**n < 32, the max n is 3
 * 
 * Optimal STEP up to MAX
 * 
 * MAX level should around STEP bigger than STEP
 */
export const STEP = 2**3
export const MIN = 0
export const MAX = 2**32 - 1

export const MAX_LEVEL = 11 // Math.cell(log(STEP, MAX))
export const MAX_STEP = 2**30

export function log(base: number, val: number) {
  return Math.log(val) / Math.log(base);
}
