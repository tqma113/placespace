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

  const indexs: Indexs = getIndexs(plug)

  let inputIndex = 0
  for (let i = 0; i < indexs.length, i < sumCount; i++) {
    if (i < inputStart || inputIndex >= inputCount) {
      existIndexs.push(indexs[i])
    } else {
      inputIndexs.push(indexs[i])
      inputIndex++
    }
  }

  return {
    inputIndexs,
    existIndexs,
  }
}

export const getIndexs = (plug: Plug): Indexs => {
  let indexs: Indexs = []

  if (plug.isLevelMax) {
    const perfectIndexs = getPerfectIndexs(plug.baseStartLevel - 2)
    const step = getStepFromLevel(plug.baseStartLevel - 1)
    for (let i = 0; i < STEP; i++) {
      const prefix = step * i
      indexs = indexs.concat(perfectIndexs.map((i) => i + prefix))
    }
  } else {
    const step = getStepFromLevel(plug.baseStartLevel - 2)

    const perfectIndexs = getPerfectIndexs(plug.baseStartLevel - 3)

    const lowStart = plug.start.get(plug.baseStartLevel - 1)
    const lowEnd = plug.end.get(plug.baseStartLevel - 1)

    const highStep = getStepFromLevel(plug.baseStartLevel - 1)
    const startPrefix = lowStart * highStep
    const endPrefix = lowEnd * highStep

    for (let i = 0; i < STEP; i++) {
      const prefix = step * i + startPrefix
      indexs = indexs.concat(perfectIndexs.map((i) => i + prefix))
    }
    for (let i = 0; i < STEP; i++) {
      const prefix = step * i + endPrefix
      indexs = indexs.concat(perfectIndexs.map((i) => i + prefix))
    }
  }

  return indexs
}

export const getPerfectIndexs = (level: number): Indexs => {
  if (level < 0) return [0]

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
  if (plug.isLevelMax) {
    // when range is not in a block with level 0
    // the lower level adopt perfect way
    // the highest level adopt max way
    return getPerfectCountByLevel(plug.baseStartLevel - 1) * STEP
  } else {
    if (plug.baseStartLevel <= 1) return plug.length
    // when range is in a block with level 0
    // the highest level adopt max way
    return getPerfectCountByLevel(plug.baseStartLevel - 2) * STEP * 2
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
  if (level < 0) return 1
  return (STEP / 2) ** level
}
