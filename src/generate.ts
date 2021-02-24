import { STEP } from './constant'

import type { Range } from './range'

/**
 * the result message of index
 * 
 * @field {number[]} inputIndex: the index of input element in order
 * @field {number[]} existIndex: the index of exist element of affected range in order
 */
export type OutputIndex = {
  inputIndex: number[],
  existIndex: number[]
}

export const getPerfectCountByRange = (range: Range): number => {

}

export const getPerfectCountByLevel = (level: number): number => {
  if (level <= 0) return STEP
  return getPerfectCountByLevel(level - 1) * STEP / 2
}

/**
 * generate all index message
 * 
 * @param {Range} range 
 * @param {Range} inputRange 
 * @param {number} count 
 * @returns {IndexResult}
 */
export const generateIndex = (range: Range, inputRange: Range, count: number): IndexResult => {

}