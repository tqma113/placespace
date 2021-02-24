import type { Range } from './space'

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

/**
 * generate all index message
 * 
 * @param {Range} range 
 * @param {Range} inputRange 
 * @param {number} count 
 * @returns {IndexResult}
 */
export const generateIndex = (range: Range, sumCount: number, inputCount: number, inputStart: number): IndexResult => {

}
