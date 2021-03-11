import { MAX_LEVEL } from './constant'
import type { Range } from './space'

export type Indexs = number[]

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

/**
 * place element corrently
 *
 * @param {Range} range
 * @param {number} sumCount
 * @param {number} inputCount
 * @param {number} inputStart
 * @param {boolean} perfect
 */
export const place = (
  range: Range,
  sumCount: number,
  inputCount: number,
  inputStart: number,
  overload: boolean
): PlaceIndex => {
  let inputIndexs: Indexs = []
  let existIndexs: Indexs = []

  const indexs: Indexs = overload
    ? getOverloadIndexs(sumCount)
    : getIndexs(plug)

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
    const perfectIndexs = getIndexsFromLevel(plug.baseStartLevel - 2)
    const step = getStepFromLevel(plug.baseStartLevel - 1)
    const basePrefix = plug.base.index
    for (let i = 0; i < STEP; i++) {
      const prefix = step * i + basePrefix
      indexs = indexs.concat(perfectIndexs.map((i) => i + prefix))
    }
  } else {
    const step = getStepFromLevel(plug.baseStartLevel - 2)
    const highStep = getStepFromLevel(plug.baseStartLevel - 1)

    const perfectIndexs = getIndexsFromLevel(plug.baseStartLevel - 3)

    const startPrefix = plug.base.index * plug.start.index
    const endPrefix = startPrefix + highStep

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

export const getOverloadLevel = (sumCount: number) => {
  let overloadCount = getPerfectCountByLevel(MAX_LEVEL)
  let level = 0
  while (overloadCount < sumCount) {
    level++
    overloadCount = overloadCount * 2
  }
  return level
}

export const getOverloadIndexs = (sumCount: number): Indexs => {
  let indexs: Indexs = []

  const overloadLevel = getOverloadLevel(sumCount)
  const baseLevel = MAX_LEVEL - overloadLevel
  const baseIndexs = getIndexsFromLevel(baseLevel - 2)
  const overloadIndexs = getIndexsFromLevel(overloadLevel - 1, 1)
  const step = getStepFromLevel(baseLevel - 1)

  for (const index of overloadIndexs) {
    const prefix = index * step
    indexs = indexs.concat(baseIndexs.map((i) => i + prefix))
  }

  return indexs
}

export const getPerfectIndexs = (plug: Plug): Indexs => {
  let indexs: Indexs = []

  if (plug.isLevelMax) {
    const perfectIndexs = getIndexsFromLevel(plug.baseStartLevel - 1)
    const prefix = plug.base.index
    indexs = perfectIndexs.map((i) => i + prefix)
  } else {
    const lowIndexs = getIndexsFromLevel(plug.baseStartLevel - 2)
    const step = getStepFromLevel(plug.baseStartLevel - 1)
    const startPrefix = plug.base.index * plug.start.index
    const endPrefix = startPrefix + step
    indexs = lowIndexs.map((i) => i + startPrefix)
    indexs = indexs.concat(lowIndexs.map((i) => i + endPrefix))
  }

  return indexs
}

export const getIndexsFromLevel = (level: number, step = 2): Indexs => {
  if (level < 0) return [0]

  const baseIndexs = getBaseIndexs(step)

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

  for (let i = 0; i < STEP; i += step) {
    indexs.push(i)
  }

  return indexs
}

export const getCountFromPlug = (plug: Plug): number => {
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

/**
 * perfect count in a single range with determinate level
 *
 * level=0, part=STEP, count=STEP/2
 * level>0, part=STEP, perfectPart=part/2, count=perfectPart*getCountOfLevel(level-1)
 *
 * @param {number} count
 * @returns {[number, boolean]}
 */
export const getPerfectLevelByCount = (count: number): [number, boolean] => {
  if (count < 0) return [0, false]
  let level = 0
  let perfectCount = getPerfectCountByLevel(level + 1)
  while (perfectCount < count) {
    level++
    perfectCount = getPerfectCountByLevel(level + 1)
  }
  if (perfectCount / 2 >= count) return [level, true]
  return [level, false]
}

/**
 * whether the plug could perfect place elements with determinate count
 *
 * @param {Plug} plug
 * @param {number} count
 * @returns {boolean}
 */
export const couldPerfectPlace = (plug: Plug, count: number): boolean => {
  const perfectCount = getPerfectCountByLevel(plug.baseStartLevel)
  return plug.isLevelMax ? perfectCount >= count : perfectCount / 2 >= count
}
