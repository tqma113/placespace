/**
 * n**n < 32, the max n is 3
 *
 * Optimal STEP up to MAX
 *
 * MAX level should around STEP bigger than STEP
 */
export const MAX_LEVEL = 32
export const MIN = 0 >>> 0
export const MAX = (2 ** MAX_LEVEL - 1) >>> 0

export const MODE = {
  Pre: Symbol('PRE_INSERT'),
  Post: Symbol('POST_INSERT'),
} as const
