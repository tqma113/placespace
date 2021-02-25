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
      it('simple', () => {
        const foo = createRange(0, 7)

        expect(foo.pos).toBe(0)
        expect(foo.len).toBe(8)
        expect(foo.start).toBe(0)
        expect(foo.end).toBe(7)
      })
    })

    describe('createRangeFromPlug', () => {
      it('simple', () => {
        const foo = createRange(0, 7)
        const fooPlug = createPlugFromRange(foo)
        const bar = createRangeFromPlug(fooPlug)

        expect(bar).toStrictEqual(foo)
      })
    })
  })

  describe('Indexs', () => {
    describe('createIndexs', () => {
      it('simple', () => {
        const foo = createIndexs(7)

        shouldIndexsEqual(foo, [7])
      })
    })

    describe('createIndexs', () => {
      it('simple', () => {
        const foo = createIndexs(7)
        const fooIndex = getIndexFromIndexs(foo)

        expect(fooIndex).toBe(7)
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
    })

    describe('cloneFloor', () => {
      it('simple', () => {
        const foo = createFloor(0)
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
        const foo = createFloorFromIndexs([7])
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
    })

    describe('createPlugFromFloor', () => {
      it('simple', () => {
        const fooBase = createFloorFromIndexs([])
        const fooStart = createFloorFromIndexs([0, 0])
        const fooEnd = createFloorFromIndexs([0, 1])
        const foo = createPlugFromFloor(fooStart, fooEnd)

        shouldIndexsEqual(foo.base.indexs, fooBase.indexs)
        shouldIndexsEqual(foo.start.indexs, fooStart.indexs)
        shouldIndexsEqual(foo.end.indexs, fooEnd.indexs)
        expect(foo.startIndex).toBe(0)
        expect(foo.endIndex).toBe(8)
        expect(foo.length).toBe(9)
        expect(foo.baseStartLevel).toBe(2)
        expect(foo.isLevelMax).toBe(false)
      })
    })

    describe('createPlugFromRange', () => {
      it('simple', () => {
        const fooBase = createFloorFromIndexs([])
        const fooStart = createFloorFromIndexs([0, 0])
        const fooEnd = createFloorFromIndexs([0, 1])
        const fooRange = createRange(0, 8)
        const foo = createPlugFromRange(fooRange)

        shouldIndexsEqual(foo.base.indexs, fooBase.indexs)
        shouldIndexsEqual(foo.start.indexs, fooStart.indexs)
        shouldIndexsEqual(foo.end.indexs, fooEnd.indexs)
        expect(foo.startIndex).toBe(0)
        expect(foo.endIndex).toBe(8)
        expect(foo.length).toBe(9)
        expect(foo.baseStartLevel).toBe(2)
        expect(foo.isLevelMax).toBe(false)
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

        console.log(bar.baseStartLevel, bar.end.indexs)

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
