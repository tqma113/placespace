import { STEP } from './constant'

export const getStepFromLevel = (level: number): number => {
  return STEP ** level
}
