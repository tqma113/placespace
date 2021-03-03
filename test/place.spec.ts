import {
  place,
  getIndexs,
  getOverloadLevel,
  getOverloadIndexs,
  getPerfectIndexs,
  getIndexsFromLevel,
  getBaseIndexs,
  getCountFromPlug,
  getPerfectCountByLevel,
  getPerfectLevelByCount,
  couldPerfectPlace,
} from '../src/place'
import { createRange, createPlugFromRange } from '../src/space'
import { MAX, MIN } from '../src/constant'
import { shouldIndexsEqual } from './util'

describe('place', () => {
  describe('place', () => {
    describe('level is 0', () => {
      it('isLevelMax is true', () => {
        const plug = createPlugFromRange(createRange(0, 7))
        const sumCount = 5
        const inputCount = 3
        const inputStart = 2
        const foo = place(plug, sumCount, inputCount, inputStart, false)

        shouldIndexsEqual(foo.inputIndexs, [2, 3, 4])
        shouldIndexsEqual(foo.existIndexs, [0, 1])
      })

      it('isLevelMax is false', () => {
        const plug = createPlugFromRange(createRange(0, 15))
        const sumCount = 12
        const inputCount = 8
        const inputStart = 3
        const foo = place(plug, sumCount, inputCount, inputStart, false)

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
        const foo = place(plug, sumCount, inputCount, inputStart, false)

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
        const foo = place(plug, sumCount, inputCount, inputStart, false)

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

  describe('getOverloadLevel', () => {
    it('overload level is 0', () => {
      expect(getOverloadLevel(0)).toBe(0)
      expect(getOverloadLevel(2 ** 22)).toBe(0)
    })

    it('overload level is 1', () => {
      expect(getOverloadLevel(2 ** 22 + 1)).toBe(1)
      expect(getOverloadLevel(2 ** 22 * 2 ** 1)).toBe(1)
    })

    it('overload level is 2', () => {
      expect(getOverloadLevel(2 ** 22 * 2 ** 1 + 1)).toBe(2)
      expect(getOverloadLevel(2 ** 22 * 2 ** 2)).toBe(2)
    })

    it('overload level is 3', () => {
      expect(getOverloadLevel(2 ** 22 * 2 ** 2 + 1)).toBe(3)
      expect(getOverloadLevel(2 ** 22 * 2 ** 3)).toBe(3)
    })

    it('overload level is 4', () => {
      expect(getOverloadLevel(2 ** 22 * 2 ** 3 + 1)).toBe(4)
      expect(getOverloadLevel(2 ** 22 * 2 ** 4)).toBe(4)
    })

    it('overload level is 5', () => {
      expect(getOverloadLevel(2 ** 22 * 2 ** 4 + 1)).toBe(5)
      expect(getOverloadLevel(2 ** 22 * 2 ** 5)).toBe(5)
    })

    it('overload level is 6', () => {
      expect(getOverloadLevel(2 ** 22 * 2 ** 5 + 1)).toBe(6)
      expect(getOverloadLevel(2 ** 22 * 2 ** 6)).toBe(6)
    })

    it('overload level is 7', () => {
      expect(getOverloadLevel(2 ** 22 * 2 ** 6 + 1)).toBe(7)
      expect(getOverloadLevel(2 ** 22 * 2 ** 7)).toBe(7)
    })

    it('overload level is 8', () => {
      expect(getOverloadLevel(2 ** 22 * 2 ** 7 + 1)).toBe(8)
      expect(getOverloadLevel(2 ** 22 * 2 ** 8)).toBe(8)
    })

    it('overload level is 9', () => {
      expect(getOverloadLevel(2 ** 22 * 2 ** 8 + 1)).toBe(9)
      expect(getOverloadLevel(2 ** 22 * 2 ** 9)).toBe(9)
    })

    it('overload level is 10', () => {
      expect(getOverloadLevel(2 ** 22 * 2 ** 9 + 1)).toBe(10)
      expect(getOverloadLevel(2 ** 22 * 2 ** 10)).toBe(10)
    })

    it('overload level is 11', () => {
      expect(getOverloadLevel(2 ** 22 * 2 ** 10 + 1)).toBe(11)
      expect(getOverloadLevel(2 ** 22 * 2 ** 11)).toBe(11)
    })
  })

  describe('getOverloadIndexs', () => {
    it('overload level is 0', () => {
      const foo = getOverloadIndexs(2 ** 22 * 2 ** 0)
      const bar = getPerfectIndexs(createPlugFromRange(createRange(MIN, MAX)))
  
      shouldIndexsEqual(foo, bar)
    })

    it('overload level is 1', () => {
      const foo = getOverloadIndexs(2 ** 22 * 2 ** 1)
      const bar = getIndexs(createPlugFromRange(createRange(MIN, MAX)))

      shouldIndexsEqual(foo, bar)
    })
  })

  describe('getPerfectIndexs', () => {
    describe('level is 0', () => {
      it('isLevelMax is true', () => {
        const plug = createPlugFromRange(createRange(0, 7))
        const foo = getPerfectIndexs(plug)

        shouldIndexsEqual(foo, [0, 2, 4, 6])
      })

      it('isLevelMax is false', () => {
        const plug = createPlugFromRange(createRange(0, 15))
        const foo = getPerfectIndexs(plug)

        shouldIndexsEqual(foo, [0, 2, 4, 6, 8, 10, 12, 14])
      })
    })

    describe('level is 1', () => {
      it('isLevelMax is true', () => {
        const plug = createPlugFromRange(createRange(0, 64))
        const foo = getPerfectIndexs(plug)

        shouldIndexsEqual(foo, [
          0,
          2,
          4,
          6,
          16,
          18,
          20,
          22,
          32,
          34,
          36,
          38,
          48,
          50,
          52,
          54,
        ])
      })

      it('isLevelMax is false', () => {
        const plug = createPlugFromRange(createRange(0, 126))
        const foo = getPerfectIndexs(plug)

        shouldIndexsEqual(foo, [
          0,
          2,
          4,
          6,
          16,
          18,
          20,
          22,
          32,
          34,
          36,
          38,
          48,
          50,
          52,
          54,
          0 + 64,
          2 + 64,
          4 + 64,
          6 + 64,
          16 + 64,
          18 + 64,
          20 + 64,
          22 + 64,
          32 + 64,
          34 + 64,
          36 + 64,
          38 + 64,
          48 + 64,
          50 + 64,
          52 + 64,
          54 + 64,
        ])
      })

      it('max', () => {
        const bar = getPerfectIndexs(createPlugFromRange(createRange(MIN, MAX)))

        expect(bar[0]).toBe(0)
        expect(bar[bar.length - 1]).toBe(920350134)
      })
    })
  })

  describe('getIndexsFromLevel', () => {
    it('level = -1', () => {
      expect(getIndexsFromLevel(-1)).toStrictEqual([0])
    })

    it('level = 0', () => {
      expect(getIndexsFromLevel(0)).toStrictEqual([0, 2, 4, 6])
    })

    it('level = 1', () => {
      expect(getIndexsFromLevel(1)).toStrictEqual([
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
      expect(getIndexsFromLevel(2)).toStrictEqual([
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
      const foo = getBaseIndexs(2)
      shouldIndexsEqual(foo, [0, 2, 4])
    })
  })

  describe('getCountFromPlug', () => {
    describe('level is 0', () => {
      it('isLevelMax is false', () => {
        const foo = createPlugFromRange(createRange(0, 1))

        expect(getCountFromPlug(foo)).toBe(4 ** 0 * 2)
      })

      it('isLevelMax is true', () => {
        const foo = createPlugFromRange(createRange(0, 7))

        expect(getCountFromPlug(foo)).toBe(4 ** 0 * 8)
      })
    })

    describe('level is 1', () => {
      it('isLevelMax is false', () => {
        const foo = createPlugFromRange(createRange(0, 15))

        expect(getCountFromPlug(foo)).toBe(4 ** 0 * 8 * 2)
      })

      it('isLevelMax is true', () => {
        const foo = createPlugFromRange(createRange(0, 63))

        expect(getCountFromPlug(foo)).toBe(4 ** 1 * 8)
      })
    })

    describe('level is 2', () => {
      it('isLevelMax is false', () => {
        const foo = createPlugFromRange(createRange(0, 127))

        expect(getCountFromPlug(foo)).toBe(4 ** 1 * 8 * 2)
      })

      it('isLevelMax is true', () => {
        const foo = createPlugFromRange(createRange(0, 511))

        expect(getCountFromPlug(foo)).toBe(4 ** 2 * 8)
      })
    })

    describe('level is 3', () => {
      it('isLevelMax is false', () => {
        const foo = createPlugFromRange(createRange(0, 1023))

        expect(getCountFromPlug(foo)).toBe(4 ** 2 * 8 * 2)
      })

      it('isLevelMax is true', () => {
        const foo = createPlugFromRange(createRange(0, 4095))

        expect(getCountFromPlug(foo)).toBe(4 ** 3 * 8)
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

  describe('getPerfectLevelByCount', () => {
    describe('level is 0', () => {
      it('with cache', () => {
        expect(getPerfectLevelByCount(1)).toStrictEqual([0, true])
      })

      it('without cache', () => {
        expect(getPerfectLevelByCount(3)).toStrictEqual([0, false])
      })
    })

    describe('level is 1', () => {
      it('with cache', () => {
        expect(getPerfectLevelByCount(5)).toStrictEqual([1, true])
      })

      it('without cache', () => {
        expect(getPerfectLevelByCount(9)).toStrictEqual([1, false])
      })
    })

    describe('level is 2', () => {
      it('with cache', () => {
        expect(getPerfectLevelByCount(17)).toStrictEqual([2, true])
      })

      it('without cache', () => {
        expect(getPerfectLevelByCount(33)).toStrictEqual([2, false])
      })
    })

    describe('level is 3', () => {
      it('with cache', () => {
        expect(getPerfectLevelByCount(65)).toStrictEqual([3, true])
      })

      it('without cache', () => {
        expect(getPerfectLevelByCount(129)).toStrictEqual([3, false])
      })
    })
  })

  describe('couldPerfectPlace', () => {
    describe('level is 0', () => {
      it('isLevelMax is false', () => {
        const foo = createPlugFromRange(createRange(0, 1))

        expect(couldPerfectPlace(foo, 1)).toBe(true)
        expect(couldPerfectPlace(foo, 3)).toBe(false)
      })

      it('isLevelMax is true', () => {
        const foo = createPlugFromRange(createRange(0, 7))

        expect(couldPerfectPlace(foo, 3)).toBe(true)
        expect(couldPerfectPlace(foo, 5)).toBe(false)
      })
    })

    describe('level is 1', () => {
      it('isLevelMax is false', () => {
        const foo = createPlugFromRange(createRange(0, 15))

        expect(couldPerfectPlace(foo, 5)).toBe(true)
        expect(couldPerfectPlace(foo, 9)).toBe(false)
      })

      it('isLevelMax is true', () => {
        const foo = createPlugFromRange(createRange(0, 63))

        expect(couldPerfectPlace(foo, 9)).toBe(true)
        expect(couldPerfectPlace(foo, 17)).toBe(false)
      })
    })

    describe('level is 2', () => {
      it('isLevelMax is false', () => {
        const foo = createPlugFromRange(createRange(0, 127))

        expect(couldPerfectPlace(foo, 17)).toBe(true)
        expect(couldPerfectPlace(foo, 33)).toBe(false)
      })

      it('isLevelMax is true', () => {
        const foo = createPlugFromRange(createRange(0, 511))

        expect(couldPerfectPlace(foo, 33)).toBe(true)
        expect(couldPerfectPlace(foo, 65)).toBe(false)
      })
    })

    describe('level is 3', () => {
      it('isLevelMax is false', () => {
        const foo = createPlugFromRange(createRange(0, 1023))

        expect(couldPerfectPlace(foo, 65)).toBe(true)
        expect(couldPerfectPlace(foo, 129)).toBe(false)
      })

      it('isLevelMax is true', () => {
        const foo = createPlugFromRange(createRange(0, 4095))

        expect(couldPerfectPlace(foo, 129)).toBe(true)
        expect(couldPerfectPlace(foo, 257)).toBe(false)
      })
    })
  })
})
