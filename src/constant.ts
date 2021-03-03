/**
 * n**n < 32, the max n is 3
 *
 * Optimal STEP up to MAX
 *
 * MAX level should around STEP bigger than STEP
 */
export const STEP = 2 ** 3
export const MIN = 0
export const MAX = 2 ** 30 - 1

export const MAX_LEVEL = 11 // Math.cell(log(STEP, MAX))
export const MAX_STEP = 2 ** 27

export const MODE = {
  Pre: Symbol('pre'),
  Post: Symbol('post'),
} as const
