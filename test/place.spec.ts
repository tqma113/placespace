import {
  getIndexs,
  getPerfectCountFromPlug,
  getPerfectCountByLevel,
} from '../src/place'

import { createRange, createPlugFromRange } from '../src/space'

describe('place', () => {
  describe('getIndexs', () => {
    it('level = 0', () => {
      expect(getIndexs(0)).toStrictEqual([0, 2, 4, 6])
    })
    it('level = 1', () => {
      expect(getIndexs(1)).toStrictEqual([
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
      expect(getIndexs(2)).toStrictEqual([
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
    // it('level = 3', () => {
    //   expect(getIndexs(3)).toStrictEqual([0, 2, 4, 6])
    // })
    // it('level = 4', () => {
    //   expect(getIndexs(4)).toStrictEqual([0, 2, 4, 6])
    // })
    // it('level = 5', () => {
    //   expect(getIndexs(5)).toStrictEqual([0, 2, 4, 6])
    // })
    // it('level = 6', () => {
    //   expect(getIndexs(6)).toStrictEqual([0, 2, 4, 6])
    // })
    // it('level = 7', () => {
    //   expect(getIndexs(7)).toStrictEqual([0, 2, 4, 6])
    // })
  })

  describe('place', () => {
    it.todo('test')
  })

  describe('getBaseIndexs', () => {
    it.todo('test')
  })

  describe('getPerfectCountFromPlug', () => {
    describe('level is 0', () => {
      it('isLevelMax is false', () => {
        const foo = createPlugFromRange(createRange(0, 1))
  
        expect(getPerfectCountFromPlug(foo)).toBe(2)
      })

      it('isLevelMax is true', () => {
        const foo = createPlugFromRange(createRange(0, 7))
  
        expect(getPerfectCountFromPlug(foo)).toBe(4 ** 0 * 8)
      })
    })

    describe('level is 1', () => {
  
      it('isLevelMax is false', () => {
        const foo = createPlugFromRange(createRange(0, 15))
  
        expect(getPerfectCountFromPlug(foo)).toBe(4 ** 1 * 2 * 2)
      })
      it('isLevelMax is true', () => {
        const foo = createPlugFromRange(createRange(0, 63))
  
        expect(getPerfectCountFromPlug(foo)).toBe(4 ** 1 * 8)
      })
    })

    describe('level is 2', () => {
      it('isLevelMax is false', () => {
        const foo = createPlugFromRange(createRange(0, 127))
  
        expect(getPerfectCountFromPlug(foo)).toBe(4 ** 2 * 2 * 2)
      })
      it('isLevelMax is true', () => {
        const foo = createPlugFromRange(createRange(0, 512))
  
        expect(getPerfectCountFromPlug(foo)).toBe(4 ** 2 * 8)
      })
    })
  })

  describe('getPerfectCountByLevel', () => {
    it('work', () => {
      expect(getPerfectCountByLevel(0)).toBe(4 ** 1)
      expect(getPerfectCountByLevel(1)).toBe(4 ** 2)
      expect(getPerfectCountByLevel(2)).toBe(4 ** 3)
      expect(getPerfectCountByLevel(3)).toBe(4 ** 4)
      expect(getPerfectCountByLevel(4)).toBe(4 ** 5)
      expect(getPerfectCountByLevel(5)).toBe(4 ** 6)
      expect(getPerfectCountByLevel(6)).toBe(4 ** 7)
      expect(getPerfectCountByLevel(7)).toBe(4 ** 8)
      expect(getPerfectCountByLevel(8)).toBe(4 ** 9)
      expect(getPerfectCountByLevel(9)).toBe(4 ** 10)
      expect(getPerfectCountByLevel(10)).toBe(4 ** 11)
    })
  })
})
