
import { STEP, MAX, MAX_LEVEL } from './constant'

/**
 * The Range and Plug are equivalent
 */

/**
 * range of space
 * 
 * storage `pos` and `len`
 * calculate to `start` and `end`
 * 
 * readonly: should only been transfer
 */
export type Range = {
  readonly pos: number
  readonly len: number
  readonly start: number
  readonly end: number
}
export const createRange = (start: number, end: number): Range => {
  const pos = start
  const len = end - start + 1
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
export const createRangeFromPlug = (plug: Plug): Range => {
  return createRange(plug.startIndex, plug.endIndex)
}

/**
 * position of floor
 * 
 * level 0 >>> level n
 * max level = length
 * 
 * start: the lowest level
 * end: the highest level
 * index: the index of each level
 * 
 * support to change
 */
export type Floor = {
  index: Array<number>
  start: number
  end: number
  length: number
  push: (index: number) => void
  pop: () => number | undefined
  unshift: (index: number) => void
  shift: () => number | undefined
}
export const createFloor = (index: Array<number> = [], start: number = 0): Floor => {
  let end = start + index.length

  return {
    get index(){
      return index
    },
    get start() {
      return start
    },
    set start(s) {
      if (s < 0) return
      start = s
      end = start + index.length
    },
    get end() {
      return end
    },
    set end(e) {
      const s = e - index.length
      if (s < 0) return
      start = s
      end = e
    },
    get length() {
      return index.length
    },
    push: (i) => {
      // index should less than STEP
      if (i > STEP) return
      index.push(i)
      end +=1
    },
    pop: () => {
      const element = index.pop()
      if (element) end -= 1
      return element
    },
    unshift: (i) => {
      // index should less than STEP
      if (i > STEP) return
      if (start <= 0) return
      index.unshift(i)
      start -= 1
    },
    shift: () => {
      const element = index.shift()
      if (element) start += 1
      return element
    }
  }
}
export const cloneFloor = (floor: Floor): Floor => {
  return createFloor(floor.index.slice(), floor.start)
}

/**
 * record range with floor
 * 
 * readonly: should only been transfer
 * 
 * base: shared floor
 */
export type Plug = {
  readonly base: Floor,
  readonly start: Floor,
  readonly end: Floor,
  readonly startIndex: number,
  readonly endIndex: number,
  readonly length: number,
}
export const createPlug = (
  base: Floor = createFloor(),
  start: Floor = createFloor(),
  end: Floor = createFloor()
): Plug => {
  if ((start.end >= base.start && start.end !== 0) || (end.end >= base.start && end.end !== 0)) {
    start = createFloor()
    end = createFloor()
    base = createFloor()
  }

  const baseIndex = getStartIndexOfFloor(base)
  const startIndex = baseIndex + getStartIndexOfFloor(start)
  const endIndex = baseIndex + getStartIndexOfFloor(end)

  return {
    get base() {
      return base
    },
    get start() {
      return start
    },
    get end() {
      return end
    },
    get startIndex() {
      return startIndex
    },
    get endIndex() {
      return endIndex
    },
    get length() {
      return endIndex - startIndex + 1
    }
  }
}

export const getStartIndexOfFloor = (floor: Floor) => {
  let index = 0

  for(let level = floor.end, i = floor.length - 1; level >= floor.start; level--, i--) {
    index += getStepFromLevel(level) * floor.index[i]
  }

  return index
}

export const createPlugFromFloor = (
  start: Floor,
  end: Floor
): Plug => {
  const floor = createFloor()

  if (isFloorWithSameLevel(start, end)) return createPlug()

  // should not change original data
  start = cloneFloor(start)
  end = cloneFloor(end)

  for (let level = start.length - 1; level >= 0; level--) {
    if (start.index[level] !== end.index[level]) break
    floor.unshift(start.index[level])
    start.pop()
    end.pop()
  }

  return createPlug(floor, start, end)
}

export const createPlugFromRange = (range: Range) => {
  return createPlugFromFloor(getFloor(range.start), getFloor(range.end))
}

export const getStepFromLevel = (level: number): number => {
  return STEP**level
}

export const isFloorWithSameLevel = (start: Floor, end: Floor): boolean => {
  return start.start === end.start && start.end === end.end
}

export const getFloor = (index: number): Floor => {
  let result: Floor = createFloor()

  while(index > STEP) {
    result.push(index%STEP)
    index = Math.ceil(index/STEP)
  }

  result.push(index)

  return result
}

/**
 * expand plug to get more space
 * 
 * @param {Plug} plug 
 */
export const expandPlug = (plug: Plug): Plug => {
  const step = getStepFromLevel(plug.base.index[0])
  if (step > plug.length) {
    // expand to level max
    const base = cloneFloor(plug.base)
    const start = createFloor(Array(plug.start.index.length).fill(0))
    const end = createFloor(Array(plug.end.index.length).fill(STEP - 1))
    return createPlug(base, start, end)
  } else {
    const base = cloneFloor(plug.base)
    if (base.length !== 0) {
      // expand one level upwards
      base.shift()
      const start = createFloor(Array(plug.start.index.length + 1).fill(0))
      const end = createFloor(Array(plug.end.index.length + 1).fill(STEP - 1))
      return createPlug(base, start, end)
    } else if (plug.length < MAX) {
      // expand to max
      const base = createFloor()
      const start = createFloor(Array(MAX_LEVEL).fill(0))
      const end = getFloor(MAX)
      return createPlug(base, start, end)
    } else {
      return plug
    }
  }
}
