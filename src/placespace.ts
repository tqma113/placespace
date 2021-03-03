import {
  expand,
  is_max,
  optimize,
  createRange,
  createPlugFromRange,
  createRangeFromPlug,
} from './space'
import { place, getCountFromPlug } from './place'
import { Ok, Err } from './result'
import { MIN, MAX, MODE } from './constant'

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
export type GetElementCount = (range: Range) => Promise<number>

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

  let start = 0
  let end = 0
  if (mode === MODE.Pre) {
    start = index - inputCount < MIN ? MIN : index - inputCount
    end = start + inputCount - 1
  } else {
    end = index + inputCount > MAX ? MAX : index + inputCount
    start = end - inputCount + 1
  }
  const inputRange = createRange(start, end)

  let plug = optimize(createPlugFromRange(inputRange))
  const existCount = await getElementCount(createRangeFromPlug(plug))
  let sumCount = inputCount + existCount

  while (sumCount > getCountFromPlug(plug)) {
    if (sumCount > MAX) {
      return Err('There is no enough space.')
    }
    if (is_max(plug)) break

    plug = expand(plug)
    const existCount = await getElementCount(createRangeFromPlug(plug))
    sumCount = existCount + inputCount
  }

  const range = createRangeFromPlug(plug)
  const preCount = await getElementCount(
    createRange(range.start, inputRange.start)
  )
  const inputStart = mode === MODE.Pre ? preCount - 1 : preCount

  return Ok({
    ...place(plug, sumCount, inputCount, inputStart, is_max(plug)),
    range,
  })
}
