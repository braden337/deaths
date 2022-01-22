import type { Dayjs } from 'dayjs'

export interface Death {
  name: string
  age: number
  date: Dayjs
}

export type DeathKey = keyof Death

export type Direction = 'asc' | 'desc'
