import type { Indexs } from '../src/space'

export const shouldIndexsEqual = (a: Indexs, b: Indexs) => {
  b.forEach((value, index) => {
    if (value === 0) return
    expect(a[index]).toBe(value)
  })
}
