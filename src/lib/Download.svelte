<script lang="ts">
import type { Death, DeathKey } from './types'

import { startCase } from 'lodash'

export let deaths: Death[]
export let columns: DeathKey[]

$: rows = [
  columns.map(startCase).join(','),
  ...deaths.map(
    ({ name, age, date }) => `${name},${age},${date.format('YYYY-MM-DD')}`
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

<button on:click={csv}>Download CSV</button>

<style lane="scss">
button {
  padding: 0.5rem;
  border: none;
  background-color: crimson;
  color: white;
  font-weight: bold;
  font-size: 1rem;
}
</style>
