import {
  expand,
  is_max,
  optimize,
  createPlugFromIndex,
  createRangeFromPlug,
} from './space'
import { place, getCountFromPlug } from './place'
import { Ok, Err } from './result'
import { MAX, MODE } from './constant'

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
  const startIndex = mode === MODE.Pre ? index : index >= MAX ? MAX : index + 1

  let plug = optimize(createPlugFromIndex(startIndex))
  const existCount = await getElementCount(plug.startIndex, plug.endIndex)
  let sumCount = inputCount + existCount

  while (sumCount > getCountFromPlug(plug)) {
    if (sumCount > MAX) {
      return Err('There is no enough space.')
    }
    if (is_max(plug)) break

    plug = expand(plug)
    const existCount = await getElementCount(plug.startIndex, plug.endIndex)
    sumCount = existCount + inputCount
  }

  const range = createRangeFromPlug(plug)
  const preCount = await getElementCount(range.start, index - 1)
  const inputStart = mode === MODE.Pre ? preCount : preCount + 1

  return Ok({
    ...place(plug, sumCount, inputCount, inputStart, is_max(plug)),
    range,
  })
}
