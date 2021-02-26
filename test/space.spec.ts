import {
  createRange,
  createRangeFromPlug,
  createIndexs,
  getIndexFromIndexs,
  createFloor,
  cloneFloor,
  createFloorFromIndexs,
  createPlug,
  createPlugFromFloor,
  createPlugFromRange,
  expand,
  optimize,
  getIndexOfFloor,
} from '../src/space'

import type { Indexs } from '../src/space'

const shouldIndexsEqual = (a: Indexs, b: Indexs) => {
  b.forEach((value, index) => {
    if (value === 0) return
    expect(a[index]).toBe(value)
  })
}

describe('space', () => {
  describe('Range', () => {
    describe('createRange', () => {
      it('level is 0', () => {
        const foo = createRange(0, 7)

        expect(foo.pos).toBe(0)
        expect(foo.len).toBe(8)
        expect(foo.start).toBe(0)
        expect(foo.end).toBe(7)
      })

      it('level is 1', () => {
        const foo = createRange(0, 63)

        expect(foo.pos).toBe(0)
        expect(foo.len).toBe(64)
        expect(foo.start).toBe(0)
        expect(foo.end).toBe(63)
      })

      it('level is 2', () => {
        const foo = createRange(0, 511)

        expect(foo.pos).toBe(0)
        expect(foo.len).toBe(512)
        expect(foo.start).toBe(0)
        expect(foo.end).toBe(511)
      })

      it('level is 2 not max', () => {
        const foo = createRange(448, 511)

        expect(foo.pos).toBe(448)
        expect(foo.len).toBe(64)
        expect(foo.start).toBe(448)
        expect(foo.end).toBe(511)
      })

      it('level is 3', () => {
        const foo = createRange(0, 4095)

        expect(foo.pos).toBe(0)
        expect(foo.len).toBe(4096)
        expect(foo.start).toBe(0)
        expect(foo.end).toBe(4095)
      })
    })

    describe('createRangeFromPlug', () => {
      it('level is 0', () => {
        const foo = createRange(0, 7)
        const fooPlug = createPlugFromRange(foo)
        const bar = createRangeFromPlug(fooPlug)

        expect(bar).toStrictEqual(foo)
      })

      it('level is 1', () => {
        const foo = createRange(0, 63)
        const fooPlug = createPlugFromRange(foo)
        const bar = createRangeFromPlug(fooPlug)

        expect(bar).toStrictEqual(foo)
      })

      it('level is 2', () => {
        const foo = createRange(0, 511)
        const fooPlug = createPlugFromRange(foo)
        const bar = createRangeFromPlug(fooPlug)

        expect(bar).toStrictEqual(foo)
      })

      it('level is 2 not max', () => {
        const foo = createRange(0, 447)
        const fooPlug = createPlugFromRange(foo)
        const bar = createRangeFromPlug(fooPlug)

        expect(bar).toStrictEqual(foo)
      })

      it('level is 2', () => {
        const foo = createRange(0, 4095)
        const fooPlug = createPlugFromRange(foo)
        const bar = createRangeFromPlug(fooPlug)

        expect(bar).toStrictEqual(foo)
      })
    })
  })

  describe('Indexs', () => {
    describe('createIndexs', () => {
      it('level is 0', () => {
        const foo = createIndexs(7)

        shouldIndexsEqual(foo, [7])
      })

      it('level is 1', () => {
        const foo = createIndexs(63)

        shouldIndexsEqual(foo, [7, 7])
      })

      it('level is 2', () => {
        const foo = createIndexs(511)

        shouldIndexsEqual(foo, [7, 7, 7])
      })

      it('level is 2 not max', () => {
        const foo = createIndexs(447)

        shouldIndexsEqual(foo, [7, 7, 6])
      })

      it('level is 3', () => {
        const foo = createIndexs(4095)

        shouldIndexsEqual(foo, [7, 7, 7, 7])
      })
    })

    describe('getIndexFromIndexs', () => {
      it('level is 0', () => {
        const foo = createIndexs(7)
        const fooIndex = getIndexFromIndexs(foo)

        expect(fooIndex).toBe(7)
      })

      it('level is 1', () => {
        const foo = createIndexs(63)
        const fooIndex = getIndexFromIndexs(foo)

        expect(fooIndex).toBe(63)
      })

      it('level is 2', () => {
        const foo = createIndexs(511)
        const fooIndex = getIndexFromIndexs(foo)

        expect(fooIndex).toBe(511)
      })

      it('level is 2 not max', () => {
        const foo = createIndexs(447)
        const fooIndex = getIndexFromIndexs(foo)

        expect(fooIndex).toBe(447)
      })

      it('level is 3', () => {
        const foo = createIndexs(4095)
        const fooIndex = getIndexFromIndexs(foo)

        expect(fooIndex).toBe(4095)
      })
    })
  })

  describe('Floor', () => {
    describe('createFloor', () => {
      it('simple', () => {
        const foo = createFloor(0)

        expect(foo.index).toBe(0)
        shouldIndexsEqual(foo.indexs, [0])
      })

      it('level is 0', () => {
        const foo = createFloor(7)

        expect(foo.index).toBe(7)
        shouldIndexsEqual(foo.indexs, [7])
      })

      it('level is 1', () => {
        const foo = createFloor(63)

        expect(foo.index).toBe(63)
        shouldIndexsEqual(foo.indexs, [7, 7])
      })

      it('level is 2', () => {
        const foo = createFloor(511)

        expect(foo.index).toBe(511)
        shouldIndexsEqual(foo.indexs, [7, 7, 7])
      })

      it('level is 2 not max', () => {
        const foo = createFloor(447)

        expect(foo.index).toBe(447)
        shouldIndexsEqual(foo.indexs, [7, 7, 6])
      })

      it('level is 3', () => {
        const foo = createFloor(4095)

        expect(foo.index).toBe(4095)
        shouldIndexsEqual(foo.indexs, [7, 7, 7, 7])
      })
    })

    describe('cloneFloor', () => {
      it('simple', () => {
        const foo = createFloor(0)
        const bar = cloneFloor(foo)

        expect(bar.index).toBe(bar.index)
        shouldIndexsEqual(bar.indexs, foo.indexs)
      })

      it('level is 0', () => {
        const foo = createFloor(7)
        const bar = cloneFloor(foo)

        expect(bar.index).toBe(bar.index)
        shouldIndexsEqual(bar.indexs, foo.indexs)
      })

      it('level is 1', () => {
        const foo = createFloor(63)
        const bar = cloneFloor(foo)

        expect(bar.index).toBe(bar.index)
        shouldIndexsEqual(bar.indexs, foo.indexs)
      })

      it('level is 2', () => {
        const foo = createFloor(511)
        const bar = cloneFloor(foo)

        expect(bar.index).toBe(bar.index)
        shouldIndexsEqual(bar.indexs, foo.indexs)
      })

      it('level is 2 not max', () => {
        const foo = createFloor(447)
        const bar = cloneFloor(foo)

        expect(bar.index).toBe(bar.index)
        shouldIndexsEqual(bar.indexs, foo.indexs)
      })

      it('level is 3', () => {
        const foo = createFloor(4095)
        const bar = cloneFloor(foo)

        expect(bar.index).toBe(bar.index)
        shouldIndexsEqual(bar.indexs, foo.indexs)
      })
    })

    describe('getIndexOfFloor', () => {
      it('simple', () => {
        const foo = createFloor(0)
        const fooIndex = getIndexOfFloor(foo)

        expect(fooIndex).toBe(0)
      })
    })

    describe('createFloorFromIndex', () => {
      it('simple', () => {
        const foo = createFloorFromIndexs()
        const fooIndex = getIndexOfFloor(foo)
        const bar = createFloor(fooIndex)

        expect(bar.index).toBe(foo.index)
        shouldIndexsEqual(bar.indexs, foo.indexs)
      })

      it('level is 0', () => {
        const foo = createFloorFromIndexs([7])
        const fooIndex = getIndexOfFloor(foo)
        const bar = createFloor(fooIndex)

        expect(bar.index).toBe(foo.index)
        shouldIndexsEqual(bar.indexs, foo.indexs)
      })

      it('level is 1', () => {
        const foo = createFloorFromIndexs([7, 7])
        const fooIndex = getIndexOfFloor(foo)
        const bar = createFloor(fooIndex)

        expect(bar.index).toBe(foo.index)
        shouldIndexsEqual(bar.indexs, foo.indexs)
      })

      it('level is 2', () => {
        const foo = createFloorFromIndexs([7, 7, 7])
        const fooIndex = getIndexOfFloor(foo)
        const bar = createFloor(fooIndex)

        expect(bar.index).toBe(foo.index)
        shouldIndexsEqual(bar.indexs, foo.indexs)
      })

      it('level is 2 not max', () => {
        const foo = createFloorFromIndexs([7, 7, 6])
        const fooIndex = getIndexOfFloor(foo)
        const bar = createFloor(fooIndex)

        expect(bar.index).toBe(foo.index)
        shouldIndexsEqual(bar.indexs, foo.indexs)
      })

      it('level is 3', () => {
        const foo = createFloorFromIndexs([7, 7, 7, 7])
        const fooIndex = getIndexOfFloor(foo)
        const bar = createFloor(fooIndex)

        expect(bar.index).toBe(foo.index)
        shouldIndexsEqual(bar.indexs, foo.indexs)
      })
    })

    describe('operation', () => {
      describe('get', () => {
        it('simple', () => {
          const foo = createFloorFromIndexs([0, 1])
          foo.set(2, 2)

          expect(foo.index).toBe(136)
          shouldIndexsEqual(foo.indexs, [0, 1, 2])
          expect(foo.get(0)).toBe(0)
          expect(foo.get(1)).toBe(1)
          expect(foo.get(2)).toBe(2)
          expect(foo.get(3)).toBe(0)
        })
      })

      describe('set', () => {
        it('simple', () => {
          const foo = createFloorFromIndexs([0, 0, 1])
          foo.set(0, 2)

          expect(foo.index).toBe(66)
          shouldIndexsEqual(foo.indexs, [2, 0, 1])
        })
      })

      describe('remove', () => {
        it('simple', () => {
          const foo = createFloorFromIndexs([0, 1])
          foo.remove(1)

          expect(foo.index).toBe(0)
          shouldIndexsEqual(foo.indexs, [0])
        })
      })

      describe('higer', () => {
        it('simple', () => {
          const foo = createFloorFromIndexs([0, 1])
          foo.higer()

          expect(foo.index).toBe(64)
          shouldIndexsEqual(foo.indexs, [0, 0, 1])
        })
      })

      describe('lower', () => {
        it('simple', () => {
          const foo = createFloorFromIndexs([0, 0, 1])
          foo.lower()

          expect(foo.index).toBe(8)
          shouldIndexsEqual(foo.indexs, [0, 1])
        })
      })
    })
  })

  describe('Plug', () => {
    describe('createPlug', () => {
      it('simple', () => {
        const fooBase = createFloorFromIndexs([])
        const fooStart = createFloorFromIndexs([0, 0])
        const fooEnd = createFloorFromIndexs([0, 1])
        const foo = createPlug(fooBase, fooStart, fooEnd, 2)

        shouldIndexsEqual(foo.base.indexs, fooBase.indexs)
        shouldIndexsEqual(foo.start.indexs, fooStart.indexs)
        shouldIndexsEqual(foo.end.indexs, fooEnd.indexs)
        expect(foo.startIndex).toBe(0)
        expect(foo.endIndex).toBe(8)
        expect(foo.length).toBe(9)
        expect(foo.baseStartLevel).toBe(2)
        expect(foo.isLevelMax).toBe(false)
      })

      it('level is 0', () => {
        const fooBase = createFloorFromIndexs([])
        const fooStart = createFloorFromIndexs([0])
        const fooEnd = createFloorFromIndexs([7])
        const foo = createPlug(fooBase, fooStart, fooEnd, 1)

        shouldIndexsEqual(foo.base.indexs, fooBase.indexs)
        shouldIndexsEqual(foo.start.indexs, fooStart.indexs)
        shouldIndexsEqual(foo.end.indexs, fooEnd.indexs)
        expect(foo.startIndex).toBe(0)
        expect(foo.endIndex).toBe(7)
        expect(foo.length).toBe(8)
        expect(foo.baseStartLevel).toBe(1)
        expect(foo.isLevelMax).toBe(true)
      })

      it('level is 1', () => {
        const fooBase = createFloorFromIndexs([])
        const fooStart = createFloorFromIndexs([0])
        const fooEnd = createFloorFromIndexs([7, 7])
        const foo = createPlug(fooBase, fooStart, fooEnd, 2)

        shouldIndexsEqual(foo.base.indexs, fooBase.indexs)
        shouldIndexsEqual(foo.start.indexs, fooStart.indexs)
        shouldIndexsEqual(foo.end.indexs, fooEnd.indexs)
        expect(foo.startIndex).toBe(0)
        expect(foo.endIndex).toBe(63)
        expect(foo.length).toBe(64)
        expect(foo.baseStartLevel).toBe(2)
        expect(foo.isLevelMax).toBe(true)
      })

      it('level is 2', () => {
        const fooBase = createFloorFromIndexs([])
        const fooStart = createFloorFromIndexs([0])
        const fooEnd = createFloorFromIndexs([7, 7, 7])
        const foo = createPlug(fooBase, fooStart, fooEnd, 3)

        shouldIndexsEqual(foo.base.indexs, fooBase.indexs)
        shouldIndexsEqual(foo.start.indexs, fooStart.indexs)
        shouldIndexsEqual(foo.end.indexs, fooEnd.indexs)
        expect(foo.startIndex).toBe(0)
        expect(foo.endIndex).toBe(511)
        expect(foo.length).toBe(512)
        expect(foo.baseStartLevel).toBe(3)
        expect(foo.isLevelMax).toBe(true)
      })

      it('level is 2 not max', () => {
        const fooBase = createFloorFromIndexs([])
        const fooStart = createFloorFromIndexs([0])
        const fooEnd = createFloorFromIndexs([7, 7, 6])
        const foo = createPlug(fooBase, fooStart, fooEnd, 3)

        shouldIndexsEqual(foo.base.indexs, fooBase.indexs)
        shouldIndexsEqual(foo.start.indexs, fooStart.indexs)
        shouldIndexsEqual(foo.end.indexs, fooEnd.indexs)
        expect(foo.startIndex).toBe(0)
        expect(foo.endIndex).toBe(447)
        expect(foo.length).toBe(448)
        expect(foo.baseStartLevel).toBe(3)
        expect(foo.isLevelMax).toBe(false)
      })

      it('level is 3', () => {
        const fooBase = createFloorFromIndexs([])
        const fooStart = createFloorFromIndexs([0])
        const fooEnd = createFloorFromIndexs([7, 7, 7, 7])
        const foo = createPlug(fooBase, fooStart, fooEnd, 4)

        shouldIndexsEqual(foo.base.indexs, fooBase.indexs)
        shouldIndexsEqual(foo.start.indexs, fooStart.indexs)
        shouldIndexsEqual(foo.end.indexs, fooEnd.indexs)
        expect(foo.startIndex).toBe(0)
        expect(foo.endIndex).toBe(4095)
        expect(foo.length).toBe(4096)
        expect(foo.baseStartLevel).toBe(4)
        expect(foo.isLevelMax).toBe(true)
      })
    })

    describe('createPlugFromFloor', () => {
      it('simple', () => {
        const fooStart = createFloorFromIndexs([0, 0])
        const fooEnd = createFloorFromIndexs([0, 1])
        const foo = createPlugFromFloor(fooStart, fooEnd)

        shouldIndexsEqual(foo.base.indexs, [])
        shouldIndexsEqual(foo.start.indexs, fooStart.indexs)
        shouldIndexsEqual(foo.end.indexs, fooEnd.indexs)
        expect(foo.startIndex).toBe(0)
        expect(foo.endIndex).toBe(8)
        expect(foo.length).toBe(9)
        expect(foo.baseStartLevel).toBe(2)
        expect(foo.isLevelMax).toBe(false)
      })

      describe('without base', () => {
        it('level is 0', () => {
          const fooStart = createFloorFromIndexs([0])
          const fooEnd = createFloorFromIndexs([7])
          const foo = createPlugFromFloor(fooStart, fooEnd)

          shouldIndexsEqual(foo.base.indexs, [])
          shouldIndexsEqual(foo.start.indexs, fooStart.indexs)
          shouldIndexsEqual(foo.end.indexs, fooEnd.indexs)
          expect(foo.startIndex).toBe(0)
          expect(foo.endIndex).toBe(7)
          expect(foo.length).toBe(8)
          expect(foo.baseStartLevel).toBe(1)
          expect(foo.isLevelMax).toBe(true)
        })

        it('level is 1', () => {
          const fooStart = createFloorFromIndexs([0])
          const fooEnd = createFloorFromIndexs([7, 7])
          const foo = createPlugFromFloor(fooStart, fooEnd)

          shouldIndexsEqual(foo.base.indexs, [])
          shouldIndexsEqual(foo.start.indexs, fooStart.indexs)
          shouldIndexsEqual(foo.end.indexs, fooEnd.indexs)
          expect(foo.startIndex).toBe(0)
          expect(foo.endIndex).toBe(63)
          expect(foo.length).toBe(64)
          expect(foo.baseStartLevel).toBe(2)
          expect(foo.isLevelMax).toBe(true)
        })

        it('level is 2', () => {
          const fooStart = createFloorFromIndexs([0])
          const fooEnd = createFloorFromIndexs([7, 7, 7])
          const foo = createPlugFromFloor(fooStart, fooEnd)

          shouldIndexsEqual(foo.base.indexs, [])
          shouldIndexsEqual(foo.start.indexs, fooStart.indexs)
          shouldIndexsEqual(foo.end.indexs, fooEnd.indexs)
          expect(foo.startIndex).toBe(0)
          expect(foo.endIndex).toBe(511)
          expect(foo.length).toBe(512)
          expect(foo.baseStartLevel).toBe(3)
          expect(foo.isLevelMax).toBe(true)
        })

        it('level is 2 not max', () => {
          const fooStart = createFloorFromIndexs([0])
          const fooEnd = createFloorFromIndexs([7, 7, 6])
          const foo = createPlugFromFloor(fooStart, fooEnd)

          shouldIndexsEqual(foo.base.indexs, [])
          shouldIndexsEqual(foo.start.indexs, fooStart.indexs)
          shouldIndexsEqual(foo.end.indexs, fooEnd.indexs)
          expect(foo.startIndex).toBe(0)
          expect(foo.endIndex).toBe(447)
          expect(foo.length).toBe(448)
          expect(foo.baseStartLevel).toBe(3)
          expect(foo.isLevelMax).toBe(false)
        })

        it('level is 3', () => {
          const fooStart = createFloorFromIndexs([0])
          const fooEnd = createFloorFromIndexs([7, 7, 7, 7])
          const foo = createPlugFromFloor(fooStart, fooEnd)

          shouldIndexsEqual(foo.base.indexs, [])
          shouldIndexsEqual(foo.start.indexs, fooStart.indexs)
          shouldIndexsEqual(foo.end.indexs, fooEnd.indexs)
          expect(foo.startIndex).toBe(0)
          expect(foo.endIndex).toBe(4095)
          expect(foo.length).toBe(4096)
          expect(foo.baseStartLevel).toBe(4)
          expect(foo.isLevelMax).toBe(true)
        })
      })

      describe('with base', () => {
        it('level is 1', () => {
          const fooStart = createFloorFromIndexs([0, 7])
          const fooEnd = createFloorFromIndexs([7, 7])
          const foo = createPlugFromFloor(fooStart, fooEnd)

          shouldIndexsEqual(foo.base.indexs, [0, 7])
          shouldIndexsEqual(foo.start.indexs, [])
          shouldIndexsEqual(foo.end.indexs, [7])
          expect(foo.startIndex).toBe(56)
          expect(foo.endIndex).toBe(63)
          expect(foo.length).toBe(8)
          expect(foo.baseStartLevel).toBe(1)
          expect(foo.isLevelMax).toBe(true)
        })

        it('level is 2', () => {
          const fooStart = createFloorFromIndexs([0, 0, 7])
          const fooEnd = createFloorFromIndexs([7, 7, 7])
          const foo = createPlugFromFloor(fooStart, fooEnd)

          shouldIndexsEqual(foo.base.indexs, [0, 0, 7])
          shouldIndexsEqual(foo.start.indexs, [])
          shouldIndexsEqual(foo.end.indexs, [7, 7])
          expect(foo.startIndex).toBe(448)
          expect(foo.endIndex).toBe(511)
          expect(foo.length).toBe(64)
          expect(foo.baseStartLevel).toBe(2)
          expect(foo.isLevelMax).toBe(true)
        })

        it('level is 3', () => {
          const fooStart = createFloorFromIndexs([0, 0, 0, 7])
          const fooEnd = createFloorFromIndexs([7, 7, 7, 7])
          const foo = createPlugFromFloor(fooStart, fooEnd)

          shouldIndexsEqual(foo.base.indexs, [0, 0, 0, 7])
          shouldIndexsEqual(foo.start.indexs, [])
          shouldIndexsEqual(foo.end.indexs, [7, 7, 7])
          expect(foo.startIndex).toBe(3584)
          expect(foo.endIndex).toBe(4095)
          expect(foo.length).toBe(512)
          expect(foo.baseStartLevel).toBe(3)
          expect(foo.isLevelMax).toBe(true)
        })
      })
    })

    describe('createPlugFromRange', () => {
      describe('without base', () => {
        it('simple', () => {
          const fooRange = createRange(0, 8)
          const foo = createPlugFromRange(fooRange)
  
          shouldIndexsEqual(foo.base.indexs, [])
          shouldIndexsEqual(foo.start.indexs, [])
          shouldIndexsEqual(foo.end.indexs, [0, 1])
          expect(foo.startIndex).toBe(0)
          expect(foo.endIndex).toBe(8)
          expect(foo.length).toBe(9)
          expect(foo.baseStartLevel).toBe(2)
          expect(foo.isLevelMax).toBe(false)
        })

        it('level is 0', () => {
          const fooRange = createRange(0, 7)
          const foo = createPlugFromRange(fooRange)
  
          shouldIndexsEqual(foo.base.indexs, [])
          shouldIndexsEqual(foo.start.indexs, [])
          shouldIndexsEqual(foo.end.indexs, [7])
          expect(foo.startIndex).toBe(0)
          expect(foo.endIndex).toBe(7)
          expect(foo.length).toBe(8)
          expect(foo.baseStartLevel).toBe(1)
          expect(foo.isLevelMax).toBe(true)
        })

        it('level is 1', () => {
          const fooRange = createRange(0, 63)
          const foo = createPlugFromRange(fooRange)
  
          shouldIndexsEqual(foo.base.indexs, [])
          shouldIndexsEqual(foo.start.indexs, [])
          shouldIndexsEqual(foo.end.indexs, [7, 7])
          expect(foo.startIndex).toBe(0)
          expect(foo.endIndex).toBe(63)
          expect(foo.length).toBe(64)
          expect(foo.baseStartLevel).toBe(2)
          expect(foo.isLevelMax).toBe(true)
        })

        it('level is 2', () => {
          const fooRange = createRange(0, 511)
          const foo = createPlugFromRange(fooRange)
  
          shouldIndexsEqual(foo.base.indexs, [])
          shouldIndexsEqual(foo.start.indexs, [])
          shouldIndexsEqual(foo.end.indexs, [7, 7, 7])
          expect(foo.startIndex).toBe(0)
          expect(foo.endIndex).toBe(511)
          expect(foo.length).toBe(512)
          expect(foo.baseStartLevel).toBe(3)
          expect(foo.isLevelMax).toBe(true)
        })

        it('level is 3', () => {
          const fooRange = createRange(0, 4095)
          const foo = createPlugFromRange(fooRange)
  
          shouldIndexsEqual(foo.base.indexs, [])
          shouldIndexsEqual(foo.start.indexs, [])
          shouldIndexsEqual(foo.end.indexs, [7, 7, 7, 7])
          expect(foo.startIndex).toBe(0)
          expect(foo.endIndex).toBe(4095)
          expect(foo.length).toBe(4096)
          expect(foo.baseStartLevel).toBe(4)
          expect(foo.isLevelMax).toBe(true)
        })
      })

      describe('with base', () => {
        it('level is 1', () => {
          const fooRange = createRange(56, 63)
          const foo = createPlugFromRange(fooRange)

          shouldIndexsEqual(foo.base.indexs, [0, 7])
          shouldIndexsEqual(foo.start.indexs, [])
          shouldIndexsEqual(foo.end.indexs, [7])
          expect(foo.startIndex).toBe(56)
          expect(foo.endIndex).toBe(63)
          expect(foo.length).toBe(8)
          expect(foo.baseStartLevel).toBe(1)
          expect(foo.isLevelMax).toBe(true)
        })

        it('level is 2', () => {
          const fooRange = createRange(448, 511)
          const foo = createPlugFromRange(fooRange)
  
          shouldIndexsEqual(foo.base.indexs, [0, 0, 7])
          shouldIndexsEqual(foo.start.indexs, [])
          shouldIndexsEqual(foo.end.indexs, [7, 7])
          expect(foo.startIndex).toBe(448)
          expect(foo.endIndex).toBe(511)
          expect(foo.length).toBe(64)
          expect(foo.baseStartLevel).toBe(2)
          expect(foo.isLevelMax).toBe(true)
        })

        it('level is 3', () => {
          const fooRange = createRange(3584, 4095)
          const foo = createPlugFromRange(fooRange)
  
          shouldIndexsEqual(foo.base.indexs, [0, 0, 0, 7])
          shouldIndexsEqual(foo.start.indexs, [])
          shouldIndexsEqual(foo.end.indexs, [7, 7, 7])
          expect(foo.startIndex).toBe(3584)
          expect(foo.endIndex).toBe(4095)
          expect(foo.length).toBe(512)
          expect(foo.baseStartLevel).toBe(3)
          expect(foo.isLevelMax).toBe(true)
        })
      })
    })

    describe('expand', () => {
      it('in level block', () => {
        const fooRange = createRange(0, 3)
        const foo = createPlugFromRange(fooRange)
        const bar = expand(foo)
        const barBase = createFloorFromIndexs([0])
        const barStart = createFloorFromIndexs([0])
        const barEnd = createFloorFromIndexs([7])

        shouldIndexsEqual(bar.base.indexs, barBase.indexs)
        shouldIndexsEqual(bar.start.indexs, barStart.indexs)
        shouldIndexsEqual(bar.end.indexs, barEnd.indexs)
        expect(bar.startIndex).toBe(0)
        expect(bar.endIndex).toBe(7)
        expect(bar.length).toBe(8)
      })
    })

    describe('optimize', () => {
      it('in level block', () => {
        const fooRange = createRange(0, 3)
        const foo = createPlugFromRange(fooRange)
        const bar = optimize(foo)
        const barBase = createFloorFromIndexs([0])
        const barStart = createFloorFromIndexs([0])
        const barEnd = createFloorFromIndexs([7])

        shouldIndexsEqual(bar.base.indexs, barBase.indexs)
        shouldIndexsEqual(bar.start.indexs, barStart.indexs)
        shouldIndexsEqual(bar.end.indexs, barEnd.indexs)
        expect(bar.startIndex).toBe(0)
        expect(bar.endIndex).toBe(7)
        expect(bar.length).toBe(8)
      })
    })
  })
})
