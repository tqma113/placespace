import { getIndexs } from '../src/place'

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
})
