import { createRange } from '../src/space'

describe('space', () => {
  describe('range', () => {
    it('createRange', () => {
      const range = createRange(0, 7)
      
      expect(range.pos).toBe(0)
      expect(range.len).toBe(8)
      expect(range.start).toBe(0)
      expect(range.end).toBe(7)
    })
  })
  describe('Floor', () => {
    it.todo('test')
    
  })
  describe('Plug', () => {
    it.todo('test')
    
  })
})