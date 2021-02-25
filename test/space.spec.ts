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
  expandPlug,
  getIndexOfFloor,
} from '../src/space'

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

        expect(foo).toStrictEqual([7])
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
        expect(foo.indexs).toStrictEqual([0])
        expect(foo.start).toBe(0)
        expect(foo.end).toBe(0)
        expect(foo.length).toBe(1)
      })
    })

    describe('cloneFloor', () => {
      it('simple', () => {
        const foo = createFloor(0)
        const bar = cloneFloor(foo)

        expect(bar.index).toBe(bar.index)
        expect(bar.indexs).toStrictEqual(foo.indexs)
        expect(bar.start).toBe(foo.start)
        expect(bar.end).toBe(foo.end)
        expect(bar.length).toBe(foo.length)
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
        expect(bar.indexs).toStrictEqual(foo.indexs)
        expect(bar.start).toBe(foo.start)
        expect(bar.end).toBe(foo.end)
        expect(bar.length).toBe(foo.length)
      })
    })

    describe('operation', () => {
      describe('push', () => {
        it('simple', () => {
          const foo = createFloorFromIndexs([0, 1])
          foo.push(2)

          expect(foo.index).toBe(136)
          expect(foo.indexs).toStrictEqual([0, 1, 2])
          expect(foo.start).toBe(0)
          expect(foo.end).toBe(2)
          expect(foo.length).toBe(3)
        })
      })

      describe('pop', () => {
        it('simple', () => {
          const foo = createFloorFromIndexs([0, 1])
          foo.pop()

          expect(foo.index).toBe(0)
          expect(foo.indexs).toStrictEqual([0])
          expect(foo.start).toBe(0)
          expect(foo.end).toBe(0)
          expect(foo.length).toBe(1)
        })
      })

      describe('unshift', () => {
        it('simple', () => {
          const foo = createFloorFromIndexs([0, 1], 1)
          foo.unshift(2)

          expect(foo.index).toBe(66)
          expect(foo.indexs).toStrictEqual([2, 0, 1])
          expect(foo.start).toBe(0)
          expect(foo.end).toBe(2)
          expect(foo.length).toBe(3)
        })
      })

      describe('shift', () => {
        it('simple', () => {
          const foo = createFloorFromIndexs([0, 1])
          foo.shift()

          expect(foo.index).toBe(8)
          expect(foo.indexs).toStrictEqual([1])
          expect(foo.start).toBe(1)
          expect(foo.end).toBe(1)
          expect(foo.length).toBe(1)
        })
      })

      describe('set', () => {
        describe('higer', () => {
          it('simple', () => {
            const foo = createFloorFromIndexs([0, 1])
            foo.higer()

            expect(foo.index).toBe(64)
            expect(foo.indexs).toStrictEqual([0, 1])
            expect(foo.start).toBe(1)
            expect(foo.end).toBe(2)
            expect(foo.length).toBe(2)
          })
        })

        describe('lower', () => {
          it('simple', () => {
            const foo = createFloorFromIndexs([0, 1], 1)
            foo.lower()

            expect(foo.index).toBe(8)
            expect(foo.indexs).toStrictEqual([0, 1])
            expect(foo.start).toBe(0)
            expect(foo.end).toBe(1)
            expect(foo.length).toBe(2)
          })
        })
      })
    })
  })

  describe('Plug', () => {
    describe('createPlug', () => {
      it('simple', () => {
        const fooBase = createFloorFromIndexs([], 2)
        const fooStart = createFloorFromIndexs([0, 0])
        const fooEnd = createFloorFromIndexs([0, 1])
        const foo = createPlug(fooBase, fooStart, fooEnd)

        expect(foo.base.start).toBe(fooBase.start)
        expect(foo.base.end).toBe(fooBase.end)
        expect(foo.base.indexs).toStrictEqual(fooBase.indexs)
        expect(foo.base.length).toBe(fooBase.length)
        expect(foo.start.start).toBe(fooStart.start)
        expect(foo.start.end).toBe(fooStart.end)
        expect(foo.start.indexs).toStrictEqual(fooStart.indexs)
        expect(foo.start.length).toBe(fooStart.length)
        expect(foo.end.start).toBe(fooEnd.start)
        expect(foo.end.end).toBe(fooEnd.end)
        expect(foo.end.indexs).toStrictEqual(fooEnd.indexs)
        expect(foo.end.length).toBe(fooEnd.length)
        expect(foo.startIndex).toBe(0)
        expect(foo.endIndex).toBe(8)
        expect(foo.length).toBe(9)
      })
    })
    describe('createPlugFromFloor', () => {
      it('simple', () => {
        const fooBase = createFloorFromIndexs([], 2)
        const fooStart = createFloorFromIndexs([0, 0])
        const fooEnd = createFloorFromIndexs([0, 1])
        const foo = createPlugFromFloor(fooStart, fooEnd)

        expect(foo.base.start).toBe(fooBase.start)
        expect(foo.base.end).toBe(fooBase.end)
        expect(foo.base.indexs).toStrictEqual(fooBase.indexs)
        expect(foo.base.length).toBe(fooBase.length)
        expect(foo.start.start).toBe(fooStart.start)
        expect(foo.start.end).toBe(fooStart.end)
        expect(foo.start.indexs).toStrictEqual(fooStart.indexs)
        expect(foo.start.length).toBe(fooStart.length)
        expect(foo.end.start).toBe(fooEnd.start)
        expect(foo.end.end).toBe(fooEnd.end)
        expect(foo.end.indexs).toStrictEqual(fooEnd.indexs)
        expect(foo.end.length).toBe(fooEnd.length)
        expect(foo.startIndex).toBe(0)
        expect(foo.endIndex).toBe(8)
        expect(foo.length).toBe(9)
      })
    })
    describe('createPlugFromRange', () => {
      it('simple', () => {
        const fooBase = createFloorFromIndexs([], 2)
        const fooStart = createFloorFromIndexs([0, 0])
        const fooEnd = createFloorFromIndexs([0, 1])
        const fooRange = createRange(0, 8)
        const foo = createPlugFromRange(fooRange)

        expect(foo.base.start).toBe(fooBase.start)
        expect(foo.base.end).toBe(fooBase.end)
        expect(foo.base.indexs).toStrictEqual(fooBase.indexs)
        expect(foo.base.length).toBe(fooBase.length)
        expect(foo.start.start).toBe(fooStart.start)
        expect(foo.start.end).toBe(fooStart.end)
        expect(foo.start.indexs).toStrictEqual(fooStart.indexs)
        expect(foo.start.length).toBe(fooStart.length)
        expect(foo.end.start).toBe(fooEnd.start)
        expect(foo.end.end).toBe(fooEnd.end)
        expect(foo.end.indexs).toStrictEqual(fooEnd.indexs)
        expect(foo.end.length).toBe(fooEnd.length)
        expect(foo.startIndex).toBe(0)
        expect(foo.endIndex).toBe(8)
        expect(foo.length).toBe(9)
      })
    })
    describe('expandPlug', () => {
      it('base', () => {
        const fooRange = createRange(0, 3)
        const foo = createPlugFromRange(fooRange)
        const bar = expandPlug(foo)
        const barBase = createFloorFromIndexs([0], 1)
        const barStart = createFloorFromIndexs([0])
        const barEnd = createFloorFromIndexs([7])

        expect(foo.base.start).toBe(barBase.start)
        expect(foo.base.end).toBe(barBase.end)
        expect(foo.base.indexs).toStrictEqual(barBase.indexs)
        expect(foo.base.length).toBe(barBase.length)
        expect(foo.start.start).toBe(barStart.start)
        expect(foo.start.end).toBe(barStart.end)
        expect(foo.start.indexs).toStrictEqual(barStart.indexs)
        expect(foo.start.length).toBe(barStart.length)
        expect(foo.end.start).toBe(barEnd.start)
        expect(foo.end.end).toBe(barEnd.end)
        expect(foo.end.indexs).toStrictEqual(barEnd.indexs)
        expect(foo.end.length).toBe(barEnd.length)
        expect(bar.startIndex).toBe(0)
        expect(bar.endIndex).toBe(7)
        expect(bar.length).toBe(8)
      })
    })
  })
})
