<script lang="ts">
import type { Death, DeathKey } from './lib/types'

import DeathTable from './lib/DeathTable.svelte'
import Download from './lib/Download.svelte'

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const ymd = (date: string) => dayjs(date, 'YYYY-MM-DD')

const columns: DeathKey[] = ['name', 'age', 'date']

let deaths: Death[] = []

async function loadDeaths() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/deaths.json`)
    deaths = res.status === 200 ? ((await res.json()) as Death[]) : []
  } catch (e) {
    deaths = []
  }
}
</script>

{#await loadDeaths()}
  <h1>Loading...</h1>
{:then}
  <header>
    <h1>Deaths ⚰️</h1>
  </header>

  <main>
    <DeathTable bind:deaths {columns} />
  </main>

  <footer>
    <Download {deaths} {columns} />
  </footer>
{/await}

<style>
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
