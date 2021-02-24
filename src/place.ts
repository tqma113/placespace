import { STEP } from './constant'
import { getStepFromLevel } from './util'

import type { Plug } from './space'

export type Indexs = number[]

/**
 * the index message of place
 * 
 * @field {number[]} inputIndex: the index of input element in order
 * @field {number[]} existIndex: the index of exist element of affected range in order
 */
export type PlaceIndex = {
  inputIndexs: Indexs,
  existIndexs: Indexs
}

export const place = (
  plug: Plug,
  sumCount: number,
  inputCount: number,
  inputStart: number
): PlaceIndex => {
  let inputIndexs: Indexs = []
  let existIndexs: Indexs = []

  const indexs = getIndexs(plug.start.end)
  let inputIndex = 0
  for(let i = 0; i < indexs.length, i < sumCount; i++) {
    if (i < inputStart || inputIndex >= inputCount - 1) {
      inputIndexs.push(indexs[i])
      inputIndex++
    } else {
      existIndexs.push(indexs[i])
    }
  }

  return {
    inputIndexs,
    existIndexs
  }
}

export const getIndexs = (level: number): Indexs => {
  const baseIndexs = getBaseIndexs(STEP)

  let l = 0
  let indexs = baseIndexs
  while(l < level) {
    const newIndexs: Indexs = []
    for (let i of indexs) {
      const base = i * STEP
      for (let i of baseIndexs) {
        newIndexs.push(base + i)
      }
    }
    indexs = newIndexs
    l++
  }

  return indexs
}

export const getBaseIndexs = (step: number): Indexs => {
  let indexs: Indexs = []

  for (let i = 0; i < step; i += 2) {
    indexs.push(i)
  }
  
  return indexs
} 

export const getPerfectCountFromPlug = (plug: Plug): number => {
  const level = plug.start.end
  if (level > 0) {
    // the lower level adopt perfect way
    const lowLevelPefectCount = getPerfectCountByLevel(plug.start.end - 1)
    const clearBlockCount = getClearBlockCount(plug)
    // the highest level adopt max way
    return lowLevelPefectCount * clearBlockCount
  } else {
    // the highest level adopt max way
    return Math.floor(plug.length)
  }
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
  if (level < 0) return 0
  if (level == 0) return STEP / 2
  return getPerfectCountByLevel(level - 1) * STEP / 2
}


export const getClearBlockCount = (plug: Plug) => {
  const step = getStepFromLevel(plug.start.end - 1)
  return Math.floor(plug.length / step)
}