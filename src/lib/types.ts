import type { Dayjs } from 'dayjs'

export interface Death {
  name: string
  age: number
  date: string
}

export type DeathKey = keyof Death

export type Direction = 'asc' | 'desc'
