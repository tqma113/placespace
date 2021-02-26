import { mss, createRange } from '../src'
import { shouldIndexsEqual } from './util'
import type { GetElementCount } from '../src'

describe('mss', () => {
  it('work', async () => {
    const range = createRange(2, 4)
    const input = {
      inputRange: range,
      inputCount: 3
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
    const result = await mss(input, getElementCount)
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
})
