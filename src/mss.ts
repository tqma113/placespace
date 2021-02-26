import {
  expand,
  optimize,
  createRange,
  createPlugFromRange,
  createRangeFromPlug,
} from './space'
import { place, getPerfectCountFromPlug } from './place'
import { Ok, Err } from './result'
import { MIN, MAX } from './constant'

import type { Result } from './result'
import type { PlaceIndex } from './place'
import type { Range, Plug } from './space'

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

const validateElementCount = (plug: Plug, count: number) => {
  if (count > plug.length) {
    return Err(`The count: ${count} of exist elements is invalid.`)
  }

  return Ok(true)
}

/**
 * mss
 *
 * @param {Input} input
 * @param {GetElementAmount} getElementAmount
 */
export const mss = async (
  input: Input,
  getElementCount: GetElementCount
): Promise<Result<PlaceResult, string>> => {
  const { inputCount, inputRange } = input

  const validateResult = validateRange(inputRange)
  switch (validateResult.kind) {
    case 'Err':
      return Err(validateResult.value)
  }

  if ((await getElementCount(inputRange)) > 0) {
    return Err(`The input range: ${inputRange} is not empty.`)
  }

  let plug = optimize(createPlugFromRange(inputRange))

  const existCount = await getElementCount(createRangeFromPlug(plug))
  const validateResult0 = validateElementCount(plug, existCount)
  switch (validateResult0.kind) {
    case 'Err':
      return Err(validateResult0.value)
  }
  let sumCount = inputCount + await getElementCount(createRangeFromPlug(plug))

  while (sumCount > getPerfectCountFromPlug(plug)) {
    plug = expand(plug)

    const existCount = await getElementCount(createRangeFromPlug(plug))
    const validateResult = validateElementCount(plug, existCount)
    switch (validateResult.kind) {
      case 'Err':
        return Err(validateResult.value)
    }

    sumCount = existCount + inputCount
  }

  const range = createRangeFromPlug(plug)
  const inputStart = await getElementCount(
    createRange(range.start, inputRange.start + 1)
  )

  return Ok({
    ...place(plug, sumCount, inputCount, inputStart),
    range,
  })
}
