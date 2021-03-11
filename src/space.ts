import { MAX } from './constant'

export const space = () => {}

/**
 * range of space
 *
 * storage `pos` and `len`
 * calculate to `start` and `end`
 *
 * readonly: should only been transfer
 */
export type Range = {
  readonly pos: number
  readonly len: number
  readonly start: number
  readonly end: number
}
export const createRange = (start: number, end: number): Range => {
  const len = end - start + 1
  return {
    get pos() {
      return start
    },
    get len() {
      return len
    },
    get start() {
      return start
    },
    get end() {
      return end
    },
  }
}

export const expand = (input: Range): Range => {
  if (input.len > MAX) return input

  const level = Math.ceil(Math.log2(input.len))
  const mask = 2 ** (level + 1)
  const start = input.start & mask
  const end = input.end | (mask - 1)

  return createRange(start, end)
}

export const optimize = (input: Range): Range => {
  if (input.len > MAX) return input

  const level = Math.ceil(Math.log2(input.len))
  const mask = 2 ** level
  const start = input.start & mask
  const end = input.end | (mask - 1)

  return createRange(start, end)
}
