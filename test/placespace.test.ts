import { placespace, MODE } from '../src'
import { shouldIndexsEqual } from './util'
import type { GetElementCount } from '../src'

describe('placespace', () => {
  it('work', async () => {
    const input = {
      index: 2,
      mode: MODE.Post,
      inputCount: 3,
    }
    const getElementCount: GetElementCount = (range) => {
      if (range.start === 0 && range.end === 3) {
        return Promise.resolve(2)
      } else if (range.start === 2) {
        return Promise.resolve(0)
      } else {
        return Promise.resolve(4)
      }
    }
    const result = await placespace(input, getElementCount)
    switch (result.kind) {
      case 'Err':
        expect(result.value).toBe('Ok')
        break
      case 'Ok':
        const placeResult = result.value
        expect(placeResult.range.start).toBe(0)
        expect(placeResult.range.end).toBe(7)
        shouldIndexsEqual(placeResult.inputIndexs, [2, 3, 4])
        shouldIndexsEqual(placeResult.existIndexs, [0, 1, 5, 6])
    }
  })

  it('work', async () => {
    const input = {
      index: 0,
      mode: MODE.Pre,
      inputCount: 3,
    }
    const getElementCount: GetElementCount = (range) => {
      if (range.start === 0) {
        if (range.end === 3) {
          return Promise.resolve(2)
        } else if (range.end === 0) {
          return Promise.resolve(0)
        } else {
          return Promise.resolve(4)
        }
      } else if (range.start === 2) {
        return Promise.resolve(0)
      } else {
        return Promise.resolve(4)
      }
    }
    const result = await placespace(input, getElementCount)
    switch (result.kind) {
      case 'Err':
        expect(result.value).toBe('Ok')
        break
      case 'Ok':
        const placeResult = result.value
        expect(placeResult.range.start).toBe(0)
        expect(placeResult.range.end).toBe(7)
        shouldIndexsEqual(placeResult.inputIndexs, [0, 1, 2])
        shouldIndexsEqual(placeResult.existIndexs, [3, 4, 5, 6])
    }
  })
})
