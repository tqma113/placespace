// range of space
export type Range = {
  pos: number
  len: number
}

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
 * @field {number[]} inputIndex: the index of input element in order
 * @field {Range} range: the affected range of this reconcile
 * @field {number[]} existIndex: the index of exist element of affected range in order
 */
export type Result = {
  inputIndex: number[],
  existIndex: number[],
  range: Range
}

/**
 * mss
 */
export const mss = (input: Input): Result => {
  // TODO
}