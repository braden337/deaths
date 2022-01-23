<script lang="ts">
import type { Death, DeathKey } from './lib/types'

import DeathTable from './lib/DeathTable.svelte'
import Download from './lib/Download.svelte'

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const columns: DeathKey[] = ['name', 'age', 'date']

let deaths: Death[] = []

async function loadDeaths() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/deaths.json`)
    deaths = res.status == 200 ? ((await res.json()) as Death[]) : []
  } catch (e) {
    deaths = []
  }
}
</script>

{#await loadDeaths()}
  <main>
    <header>
      <h1>Loading...</h1>
    </header>
  </main>
{:then}
  <main>
    <header>
      <h1>Deaths ⚰️</h1>
    </header>
    <DeathTable bind:deaths {columns} />
  </main>

  <footer>
    <Download {deaths} {columns} />
  </footer>
{/await}

<style lang="postcss">
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

:global(body) {
  background-color: #6272a4;
}

:global(#app) {
  height: 100vh;
  height: -webkit-fill-available;
  display: grid;
  grid-template-rows: 1fr auto;
  justify-content: center;
}

header,
footer {
  text-align: center;
}

header {
  padding-bottom: 1rem;
  color: #f8f8f2;
}

main {
  margin-top: env(safe-area-inset-top, 1rem);
  width: 100vw;
  overflow-y: scroll;
}

footer {
  padding: 1rem;
  width: 100%;
  background-color: #6272a4;
}
</style>
