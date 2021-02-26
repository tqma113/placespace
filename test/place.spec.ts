import {
  place,
  getIndexs,
  getPerfectIndexs,
  getBaseIndexs,
  getPerfectCountFromPlug,
  getPerfectCountByLevel,
} from '../src/place'
import { createRange, createPlugFromRange } from '../src/space'
import { shouldIndexsEqual } from './util'

describe('place', () => {
  describe('place', () => {
    describe('level is 0', () => {
      it('isLevelMax is true', () => {
        const plug = createPlugFromRange(createRange(0, 7))
        const sumCount = 5
        const inputCount = 3
        const inputStart = 2
        const foo = place(plug, sumCount, inputCount, inputStart)

        shouldIndexsEqual(foo.inputIndexs, [2, 3, 4])
        shouldIndexsEqual(foo.existIndexs, [0, 1])
      })

      it('isLevelMax is false', () => {
        const plug = createPlugFromRange(createRange(0, 15))
        const sumCount = 12
        const inputCount = 8
        const inputStart = 3
        const foo = place(plug, sumCount, inputCount, inputStart)

        shouldIndexsEqual(foo.inputIndexs, [3, 4, 5, 6, 7, 8, 9, 10])
        shouldIndexsEqual(foo.existIndexs, [0, 1, 2, 11])
      })
    })

    describe('level is 1', () => {
      it('isLevelMax is true', () => {
        const plug = createPlugFromRange(createRange(0, 64))
        const sumCount = 30
        const inputCount = 15
        const inputStart = 7
        const foo = place(plug, sumCount, inputCount, inputStart)

        shouldIndexsEqual(foo.inputIndexs, [
          14,
          16,
          18,
          20,
          22,
          24,
          26,
          28,
          30,
          32,
          34,
          36,
          38,
          40,
          42,
        ])
        shouldIndexsEqual(foo.existIndexs, [
          0,
          2,
          4,
          6,
          8,
          10,
          12,
          44,
          46,
          48,
          50,
          52,
          54,
          56,
          58,
        ])
      })

      it('isLevelMax is false', () => {
        const plug = createPlugFromRange(createRange(0, 127))
        const sumCount = 55
        const inputCount = 30
        const inputStart = 20
        const foo = place(plug, sumCount, inputCount, inputStart)

        shouldIndexsEqual(foo.inputIndexs, [
          40,
          42,
          44,
          46,
          48,
          50,
          52,
          54,
          56,
          58,
          60,
          62,
          0 + 64,
          2 + 64,
          4 + 64,
          6 + 64,
          8 + 64,
          10 + 64,
          12 + 64,
          14 + 64,
          16 + 64,
          18 + 64,
          20 + 64,
          22 + 64,
          24 + 64,
          26 + 64,
          28 + 64,
          30 + 64,
          32 + 64,
          34 + 64,
        ])
        shouldIndexsEqual(foo.existIndexs, [
          0,
          2,
          4,
          6,
          8,
          10,
          12,
          14,
          16,
          18,
          20,
          22,
          24,
          26,
          28,
          30,
          32,
          34,
          36,
          38,
          36 + 64,
          38 + 64,
          40 + 64,
          42 + 64,
          44 + 64,
        ])
      })
    })
  })

  describe('getIndexs', () => {
    describe('level is 0', () => {
      it('isLevelMax is true', () => {
        const plug = createPlugFromRange(createRange(0, 7))
        const foo = getIndexs(plug)

        shouldIndexsEqual(foo, [0, 1, 2, 3, 4, 5, 6, 7])
      })

      it('isLevelMax is false', () => {
        const plug = createPlugFromRange(createRange(0, 15))
        const foo = getIndexs(plug)

        shouldIndexsEqual(foo, [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
        ])
      })
    })

    describe('level is 1', () => {
      it('isLevelMax is true', () => {
        const plug = createPlugFromRange(createRange(0, 64))
        const foo = getIndexs(plug)

        shouldIndexsEqual(foo, [
          0,
          2,
          4,
          6,
          8,
          10,
          12,
          14,
          16,
          18,
          20,
          22,
          24,
          26,
          28,
          30,
          32,
          34,
          36,
          38,
          40,
          42,
          44,
          46,
          48,
          50,
          52,
          54,
          56,
          58,
          60,
          62,
        ])
      })

      it('isLevelMax is false', () => {
        const plug = createPlugFromRange(createRange(0, 126))
        const foo = getIndexs(plug)

        shouldIndexsEqual(foo, [
          0,
          2,
          4,
          6,
          8,
          10,
          12,
          14,
          16,
          18,
          20,
          22,
          24,
          26,
          28,
          30,
          32,
          34,
          36,
          38,
          40,
          42,
          44,
          46,
          48,
          50,
          52,
          54,
          56,
          58,
          60,
          62,
          0 + 64,
          2 + 64,
          4 + 64,
          6 + 64,
          8 + 64,
          10 + 64,
          12 + 64,
          14 + 64,
          16 + 64,
          18 + 64,
          20 + 64,
          22 + 64,
          24 + 64,
          26 + 64,
          28 + 64,
          30 + 64,
          32 + 64,
          34 + 64,
          36 + 64,
          38 + 64,
          40 + 64,
          42 + 64,
          44 + 64,
          46 + 64,
          48 + 64,
          50 + 64,
          52 + 64,
          54 + 64,
          56 + 64,
          58 + 64,
          60 + 64,
          62 + 64,
        ])
      })
    })
  })

  describe('getPerfectIndexs', () => {
    it('level = -1', () => {
      expect(getPerfectIndexs(-1)).toStrictEqual([0])
    })

    it('level = 0', () => {
      expect(getPerfectIndexs(0)).toStrictEqual([0, 2, 4, 6])
    })

    it('level = 1', () => {
      expect(getPerfectIndexs(1)).toStrictEqual([
        0,
        2,
        4,
        6,
        0 + 2 * 8,
        2 + 2 * 8,
        4 + 2 * 8,
        6 + 2 * 8,
        0 + 4 * 8,
        2 + 4 * 8,
        4 + 4 * 8,
        6 + 4 * 8,
        0 + 6 * 8,
        2 + 6 * 8,
        4 + 6 * 8,
        6 + 6 * 8,
      ])
    })

    it('level = 2', () => {
      expect(getPerfectIndexs(2)).toStrictEqual([
        // level 0
        0,
        2,
        4,
        6,

        // level 1
        0 + 2 * 8,
        2 + 2 * 8,
        4 + 2 * 8,
        6 + 2 * 8,
        0 + 4 * 8,
        2 + 4 * 8,
        4 + 4 * 8,
        6 + 4 * 8,
        0 + 6 * 8,
        2 + 6 * 8,
        4 + 6 * 8,
        6 + 6 * 8,

        // level 2
        0 + 2 * 8 * 8,
        2 + 2 * 8 * 8,
        4 + 2 * 8 * 8,
        6 + 2 * 8 * 8,

        0 + 2 * 8 + 2 * 8 * 8,
        2 + 2 * 8 + 2 * 8 * 8,
        4 + 2 * 8 + 2 * 8 * 8,
        6 + 2 * 8 + 2 * 8 * 8,
        0 + 4 * 8 + 2 * 8 * 8,
        2 + 4 * 8 + 2 * 8 * 8,
        4 + 4 * 8 + 2 * 8 * 8,
        6 + 4 * 8 + 2 * 8 * 8,
        0 + 6 * 8 + 2 * 8 * 8,
        2 + 6 * 8 + 2 * 8 * 8,
        4 + 6 * 8 + 2 * 8 * 8,
        6 + 6 * 8 + 2 * 8 * 8,

        0 + 4 * 8 * 8,
        2 + 4 * 8 * 8,
        4 + 4 * 8 * 8,
        6 + 4 * 8 * 8,

        0 + 2 * 8 + 4 * 8 * 8,
        2 + 2 * 8 + 4 * 8 * 8,
        4 + 2 * 8 + 4 * 8 * 8,
        6 + 2 * 8 + 4 * 8 * 8,
        0 + 4 * 8 + 4 * 8 * 8,
        2 + 4 * 8 + 4 * 8 * 8,
        4 + 4 * 8 + 4 * 8 * 8,
        6 + 4 * 8 + 4 * 8 * 8,
        0 + 6 * 8 + 4 * 8 * 8,
        2 + 6 * 8 + 4 * 8 * 8,
        4 + 6 * 8 + 4 * 8 * 8,
        6 + 6 * 8 + 4 * 8 * 8,

        0 + 6 * 8 * 8,
        2 + 6 * 8 * 8,
        4 + 6 * 8 * 8,
        6 + 6 * 8 * 8,

        0 + 2 * 8 + 6 * 8 * 8,
        2 + 2 * 8 + 6 * 8 * 8,
        4 + 2 * 8 + 6 * 8 * 8,
        6 + 2 * 8 + 6 * 8 * 8,
        0 + 4 * 8 + 6 * 8 * 8,
        2 + 4 * 8 + 6 * 8 * 8,
        4 + 4 * 8 + 6 * 8 * 8,
        6 + 4 * 8 + 6 * 8 * 8,
        0 + 6 * 8 + 6 * 8 * 8,
        2 + 6 * 8 + 6 * 8 * 8,
        4 + 6 * 8 + 6 * 8 * 8,
        6 + 6 * 8 + 6 * 8 * 8,
      ])
    })
  })

  describe('getBaseIndexs', () => {
    it('simple', () => {
      const foo = getBaseIndexs(8)
      shouldIndexsEqual(foo, [0, 2, 4, 6])
    })
  })

  describe('getPerfectCountFromPlug', () => {
    describe('level is 0', () => {
      it('isLevelMax is false', () => {
        const foo = createPlugFromRange(createRange(0, 1))

        expect(getPerfectCountFromPlug(foo)).toBe(4 ** 0 * 2)
      })

      it('isLevelMax is true', () => {
        const foo = createPlugFromRange(createRange(0, 7))

        expect(getPerfectCountFromPlug(foo)).toBe(4 ** 0 * 8)
      })
    })

    describe('level is 1', () => {
      it('isLevelMax is false', () => {
        const foo = createPlugFromRange(createRange(0, 15))

        expect(getPerfectCountFromPlug(foo)).toBe(4 ** 0 * 8 * 2)
      })

      it('isLevelMax is true', () => {
        const foo = createPlugFromRange(createRange(0, 63))

        expect(getPerfectCountFromPlug(foo)).toBe(4 ** 1 * 8)
      })
    })

    describe('level is 2', () => {
      it('isLevelMax is false', () => {
        const foo = createPlugFromRange(createRange(0, 127))

        expect(getPerfectCountFromPlug(foo)).toBe(4 ** 1 * 8 * 2)
      })

      it('isLevelMax is true', () => {
        const foo = createPlugFromRange(createRange(0, 511))

        expect(getPerfectCountFromPlug(foo)).toBe(4 ** 2 * 8)
      })
    })

    describe('level is 3', () => {
      it('isLevelMax is false', () => {
        const foo = createPlugFromRange(createRange(0, 1023))

        expect(getPerfectCountFromPlug(foo)).toBe(4 ** 2 * 8 * 2)
      })

      it('isLevelMax is true', () => {
        const foo = createPlugFromRange(createRange(0, 4095))

        expect(getPerfectCountFromPlug(foo)).toBe(4 ** 3 * 8)
      })
    })
  })

  it('getPerfectCountByLevel', () => {
    expect(getPerfectCountByLevel(0)).toBe(4 ** 0)
    expect(getPerfectCountByLevel(1)).toBe(4 ** 1)
    expect(getPerfectCountByLevel(2)).toBe(4 ** 2)
    expect(getPerfectCountByLevel(3)).toBe(4 ** 3)
    expect(getPerfectCountByLevel(4)).toBe(4 ** 4)
    expect(getPerfectCountByLevel(5)).toBe(4 ** 5)
    expect(getPerfectCountByLevel(6)).toBe(4 ** 6)
    expect(getPerfectCountByLevel(7)).toBe(4 ** 7)
    expect(getPerfectCountByLevel(8)).toBe(4 ** 8)
    expect(getPerfectCountByLevel(9)).toBe(4 ** 9)
    expect(getPerfectCountByLevel(10)).toBe(4 ** 10)
  })
})
