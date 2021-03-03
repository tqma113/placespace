import { placespace, MODE } from '../src'
import { shouldIndexsEqual } from './util'
import type { GetElementCount } from '../src'

describe('placespace', () => {
  it('case 1', async () => {
    const indexs = [0, 2, 3, 5]
    const input = {
      index: 2,
      mode: MODE.Post,
      inputCount: 3,
    }
    const getElementCount: GetElementCount = (start, end) => {
      return Promise.resolve(
        indexs.reduce((cur, i) => {
          if (i >= start && i <= end) return cur + 1
          else return cur
        }, 0)
      )
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

  it('case 2', async () => {
    const indexs = [0, 2, 3, 5]
    const input = {
      index: 0,
      mode: MODE.Pre,
      inputCount: 3,
    }
    const getElementCount: GetElementCount = (start, end) => {
      return Promise.resolve(
        indexs.reduce((cur, i) => {
          if (i >= start && i <= end) return cur + 1
          else return cur
        }, 0)
      )
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

  it('case 3', async () => {
    const indexs = [0, 1, 2, 3, 4, 5, 6, 7]
    const input = {
      index: 1,
      mode: MODE.Pre,
      inputCount: 2,
    }
    const getElementCount: GetElementCount = (start, end) => {
      return Promise.resolve(
        indexs.reduce((cur, i) => {
          if (i >= start && i <= end) return cur + 1
          else return cur
        }, 0)
      )
    }
    const result = await placespace(input, getElementCount)
    switch (result.kind) {
      case 'Err':
        expect(result.value).toBe('Ok')
        break
      case 'Ok':
        const placeResult = result.value
        expect(placeResult.range.start).toBe(0)
        expect(placeResult.range.end).toBe(15)
        shouldIndexsEqual(placeResult.inputIndexs, [1, 2])
        shouldIndexsEqual(placeResult.existIndexs, [0, 3, 4, 5, 6, 7, 8, 9])
    }
  })

  it('case 4', async () => {
    const indexs = [0, 2, 3, 5, 6, 7, 8, 9]
    const input = {
      index: 6,
      mode: MODE.Post,
      inputCount: 3,
    }
    const getElementCount: GetElementCount = (start, end) => {
      return Promise.resolve(
        indexs.reduce((cur, i) => {
          if (i >= start && i <= end) return cur + 1
          else return cur
        }, 0)
      )
    }
    const result = await placespace(input, getElementCount)
    switch (result.kind) {
      case 'Err':
        expect(result.value).toBe('Ok')
        break
      case 'Ok':
        const placeResult = result.value
        expect(placeResult.range.start).toBe(0)
        expect(placeResult.range.end).toBe(15)
        shouldIndexsEqual(placeResult.inputIndexs, [5, 6, 7])
        shouldIndexsEqual(placeResult.existIndexs, [0, 1, 2, 3, 4, 8, 9, 10])
    }
  })

  it('case 5', async () => {
    const indexs = [0, 2, 3, 5, 6]
    const input = {
      index: 6,
      mode: MODE.Post,
      inputCount: 3,
    }
    const getElementCount: GetElementCount = (start, end) => {
      return Promise.resolve(
        indexs.reduce((cur, i) => {
          if (i >= start && i <= end) return cur + 1
          else return cur
        }, 0)
      )
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
        shouldIndexsEqual(placeResult.inputIndexs, [5, 6, 7])
        shouldIndexsEqual(placeResult.existIndexs, [0, 1, 2, 3, 4])
    }
  })
})
