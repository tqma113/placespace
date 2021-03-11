import { expand, optimize, createRange } from './space'
import { place, getCountFromPlug } from './place'
import { Ok, Err } from './result'
import { MAX, MIN, MODE } from './constant'

import type { Result } from './result'
import type { PlaceIndex } from './place'
import type { Range } from './space'

/**
 * the input info
 *
 * @field {number} inputCount: the amount of input elements
 * @field {Range} inputRange: the range of input position
 */
export type Input = {
  inputCount: number
  index: number
  mode: symbol
}

/**
 * the result message
 *
 * @field {Range} range: the affected range of this reconcile
 */
export type PlaceResult = PlaceIndex & {
  range: Range
}

/**
 * get amount of exist elements in determinate range
 *
 * @param {Range} range
 * @returns {Promise<number>}
 */
export type GetElementCount = (start: number, end: number) => Promise<number>

/**
 * placespace
 *
 * @param {Input} input
 * @param {GetElementAmount} getElementAmount
 */
export const placespace = async (
  input: Input,
  getElementCount: GetElementCount
): Promise<Result<PlaceResult, string>> => {
  let { inputCount, index, mode } = input
  mode = mode === MODE.Pre ? MODE.Pre : MODE.Post

  let startIndex = 0
  let endIndex = 0
  if (mode === MODE.Pre) {
    endIndex = index > MIN ? index - 1 : MIN
    startIndex =
      endIndex - inputCount + 1 >= MIN ? endIndex - inputCount + 1 : MIN
  } else {
    startIndex = index < MAX ? index + 1 : MAX
    endIndex =
      startIndex + inputCount - 1 <= MAX ? startIndex + inputCount - 1 : MAX
  }

  let range = optimize(createRange(startIndex, endIndex))
  const existCount = await getElementCount(range.start, range.end)
  let sumCount = inputCount + existCount

  while (sumCount > range.len) {
    if (sumCount > MAX) {
      return Err('There is no enough space.')
    }
    if (range.len > MAX) break

    range = expand(range)
    const existCount = await getElementCount(range.start, range.end)
    sumCount = existCount + inputCount
  }

  const preCount = await getElementCount(range.start, index - 1)
  const inputStart = mode === MODE.Pre ? preCount : preCount + 1

  return Ok({
    ...place(plug, sumCount, inputCount, inputStart, is_max(plug)),
    range,
  })
}
