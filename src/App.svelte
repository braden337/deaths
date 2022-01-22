<script lang="ts">
import type { DeathKey } from './lib/types'

import DeathTable from './lib/DeathTable.svelte'
import Download from './lib/Download.svelte'

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const ymd = (date: string) => dayjs(date, 'YYYY-MM-DD')

const columns: DeathKey[] = ['name', 'age', 'date']

let deaths = [
  { name: 'Jimi Hendrix', age: 27, date: ymd('1970-09-18') },
  { name: 'Chris Farley', age: 33, date: ymd('1997-12-18') },
  { name: 'Mitch Hedberg', age: 37, date: ymd('2005-03-30') },
  { name: 'Norm MacDonald', age: 61, date: ymd('2021-09-14') },
  { name: 'Bob Saget', age: 65, date: ymd('2022-01-09') },
]
</script>

<header>
  <h1>Deaths ⚰️</h1>
</header>

<main>
  <DeathTable bind:deaths {columns} />
</main>

<footer>
  <Download {deaths} {columns} />
</footer>

<style lang="scss">
:global(*) {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:global(:root) {
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
}

:global(html, body) {
  height: -webkit-fill-available;
}

:global(#app) {
  min-height: 100vh;
  min-height: -webkit-fill-available;
  display: grid;
  justify-content: center;
  align-content: center;
  grid-gap: 1rem;
  padding: 1rem;
}

header,
footer {
  text-align: center;
}
</style>
