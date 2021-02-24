import { STEP } from './constant'

import type { Range } from './space'

export const getPerfectCountByRange = (range: Range): number => {

}

/**
 * perfect count in a single range with determinate level
 * 
 * level=0, part=STEP, count=STEP
 * level>0, part=STEP, perfectPart=part/2, count=perfectPart*getCountOfLevel(level-1)
 * 
 * @param {number} level
 * @returns {number} 
 */
export const getPerfectCountByLevel = (level: number): number => {
  if (level <= 0) return STEP
  return getPerfectCountByLevel(level - 1) * STEP / 2
}