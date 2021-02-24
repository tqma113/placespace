import { STEP } from './constant'

// range of space
export type Range = {
  pos: number
  len: number
  start: number
  end: number
}

// position of space
export type Position = Array<number>

export const getStepFromLevel = (level: number): number => {
  return STEP**level
}

export const getMinLevelFromRange = (range: Range): number => {

}

/**
 * get the range of next level from current range
 * 
 * @param {Range} range 
 * @param {number} level 
 * @returns {Range}
 */
export const getNextRange = (range: Range, level: number): Range => {
  const levelStep = getStepFromLevel(level)
}

export const getPosition = (index: number): Position => {
  let result: Position = []

  while(index > STEP) {
    result.push(index%STEP)
    index = Math.ceil(index/STEP)
  }

  result.push(index)

  return result
}

export const createRange = (previous: number, next: number): Range => {
  const pos = previous + 1
  const len = next - previous - 1
  return {
    get pos() {
      return pos
    },
    get len() {
      return len
    },
    get start() {
      return pos
    },
    get end() {
      return len - 1
    }
  }
}
