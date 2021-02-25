import { STEP } from './constant'
import { getStepFromLevel } from './util'

import type { Plug, Indexs } from './space'

/**
 * the index message of place
 *
 * @field {number[]} inputIndex: the index of input element in order
 * @field {number[]} existIndex: the index of exist element of affected range in order
 */
export type PlaceIndex = {
  inputIndexs: Indexs
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

  let indexs: Indexs = []
  if (plug.isLevelMax) {
    indexs = getIndexs(plug.baseStartLevel)
  } else {
    const step = getStepFromLevel(plug.baseStartLevel - 1)
    const levelIndex = getIndexs(plug.baseStartLevel - 1)
    const lowStart = plug.start.get(plug.baseStartLevel - 1)
    const lowEnd = plug.end.get(plug.baseStartLevel - 1)
    const startPrefix = lowStart * step
    const endPrefix = lowEnd * step
    indexs = [
      ...levelIndex.map((i) => i + startPrefix),
      ...levelIndex.map((i) => i + endPrefix),
    ]
  }
  let inputIndex = 0
  for (let i = 0; i < indexs.length, i < sumCount; i++) {
    if (i < inputStart || inputIndex >= inputCount - 1) {
      inputIndexs.push(indexs[i])
      inputIndex++
    } else {
      existIndexs.push(indexs[i])
    }
  }

  return {
    inputIndexs,
    existIndexs,
  }
}

export const getIndexs = (level: number): Indexs => {
  const baseIndexs = getBaseIndexs(STEP)

  let l = 0
  let indexs = baseIndexs
  while (l < level) {
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
  const lowLevelPefectCount = getPerfectCountByLevel(plug.baseStartLevel - 1)
  if (plug.isLevelMax) {
    // when range is not in a block with level 0
    // the lower level adopt perfect way
    // the highest level adopt max way
    return lowLevelPefectCount * STEP
  } else {
    // when range is in a block with level 0
    // the highest level adopt max way
    return lowLevelPefectCount * 2
  }
}

/**
 * perfect count in a single range with determinate level
 *
 * level=0, part=STEP, count=STEP/2
 * level>0, part=STEP, perfectPart=part/2, count=perfectPart*getCountOfLevel(level-1)
 *
 * @param {number} level
 * @returns {number}
 */
export const getPerfectCountByLevel = (level: number): number => {
  if (level < 0) return 0
  if (level == 0) return STEP / 2
  return (getPerfectCountByLevel(level - 1) * STEP) / 2
}
