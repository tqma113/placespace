import {
  expand,
  shrink,
  optimize,
  createRange,
  createPlugFromRange,
  createRangeFromPlug,
} from './space'
import { place, getCountFromPlug, couldPerfectPlace, getPerfectLevelByCount } from './place'
import { Ok, Err } from './result'
import { MIN, MAX } from './constant'

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
  inputRange: Range
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

const validateRange = (range: Range): Result<true, string> => {
  if (range.pos < MIN || range.pos > MAX) {
    return Err(`The start: ${range.pos} of range is invalid.`)
  }

  if (range.len < MIN || range.len > MAX) {
    return Err(`The length: ${range.len} of range is invalid.`)
  }

  const end = range.pos + range.len
  if (end < MIN || end > MAX) {
    return Err(`The end: ${end} of range is invalid.`)
  }

  return Ok(true)
}

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
  const { inputCount, inputRange } = input

  const validateResult = validateRange(inputRange)
  switch (validateResult.kind) {
    case 'Err':
      return Err(validateResult.value)
  }

  let plug = optimize(createPlugFromRange(inputRange))
  const existCount = await getElementCount(createRangeFromPlug(plug))
  let sumCount = inputCount + existCount

  const cpp = couldPerfectPlace(plug, sumCount)
  if (couldPerfectPlace(plug, sumCount)) {
    const [level, withCache] = getPerfectLevelByCount(sumCount)
    plug = shrink(plug, level, withCache)
  } else {
    while (sumCount > getCountFromPlug(plug)) {
      if (sumCount >= MAX) {
        return Err('There is no enough space.')
      }

      plug = expand(plug)
      const existCount = await getElementCount(createRangeFromPlug(plug))
      sumCount = existCount + inputCount
    }
  }

  const range = createRangeFromPlug(plug)
  const inputStart = await getElementCount(
    createRange(range.start, inputRange.start + 1)
  )

  return Ok({
    ...place(plug, sumCount, inputCount, inputStart, !!cpp),
    range,
  })
}
