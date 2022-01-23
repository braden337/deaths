<script lang="ts">
import type { Death, DeathKey } from './types'

import dayjs from 'dayjs'
import { startCase } from 'lodash'

export let deaths: Death[]
export let columns: DeathKey[]

$: rows = [
  columns.map(startCase).join(','),
  ...deaths.map(
    ({ name, age, date }) =>
      `${name},${age},${dayjs(date).format('YYYY-MM-DD')}`
  ),
]

function csv() {
  const blob = new Blob([rows.join('\n')], { type: 'text/csv' })
  const stamp = Math.trunc(Date.now() / 1e3)
  const a = document.createElement('a')

  a.download = `deaths_${stamp}.csv`
  a.href = window.URL.createObjectURL(blob)

  a.click()
}
</script>

<button on:click={csv} disabled={!deaths.length}>Download CSV</button>

<style lang="postcss">
button {
  padding: 0.5rem;
  border: none;
  background-color: #ff5555;
  opacity: 0.9;
  color: #f8f8f2;
  font-weight: bold;
  font-size: 1rem;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.25;
    cursor: not-allowed;
  }
}
</style>
