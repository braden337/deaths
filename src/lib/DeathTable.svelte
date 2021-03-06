<script lang="ts">
import type { Death, DeathKey, Direction } from './types'

import dayjs from 'dayjs'
import { orderBy, startCase } from 'lodash'

export let deaths: Death[]
export let columns: DeathKey[]

let key: DeathKey = (localStorage.getItem('key') as DeathKey) || 'age'

let direction: Direction =
  (localStorage.getItem('direction') as Direction) || 'asc'

$: localStorage.setItem('key', key)
$: localStorage.setItem('direction', direction)

$: {
  const sortOrder = [key]
  const directionOrder: Direction[] = [direction]

  if (key === 'age') {
    sortOrder.push('date')
    directionOrder.push(direction)
  }

  deaths = orderBy(deaths, sortOrder, directionOrder)
}

const changeDirection = () => (direction = direction === 'asc' ? 'desc' : 'asc')

function sort(col: DeathKey) {
  return () => {
    if (col === key) {
      changeDirection()
    } else {
      key = col
      direction = 'asc'
    }
  }
}
</script>

{#if deaths.length}
  <table>
    <thead>
      <tr>
        {#each columns as col}
          <th
            on:click={sort(col)}
            data-arrow={col === key ? (direction === 'asc' ? '▲' : '▼') : ''}
            >{startCase(col)}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each deaths as death}
        <tr>
          {#each columns as key}
            {#if key === 'date'}
              <td>{dayjs(death[key]).format("MMM DD 'YY")}</td>
            {:else}
              <td>{death[key]}</td>
            {/if}
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <h1>☠️</h1>
{/if}

<style lang="postcss">
h1 {
  text-align: center;
}

table {
  text-align: left;
  border-spacing: 0;
  width: 100%;

  & th,
  & td {
    padding: 0.5rem;
    vertical-align: top;

    &:nth-of-type(n + 2) {
      text-align: center;
    }

    &:nth-of-type(3) {
      text-align: right;
    }
  }

  & th {
    position: relative;
    cursor: pointer;
    user-select: none;
    &::after {
      content: attr(data-arrow);
      position: absolute;
      left: 0.5rem;
      right: 0.5rem;
      top: 0;
      font-size: 0.5rem;
    }
  }

  & thead {
    background-color: #f8f8f2;
    color: #282a36;
    position: sticky;
    top: 0;
  }

  & tbody {
    color: #f8f8f2;
    & tr {
      &:nth-of-type(2n + 1) {
        background-color: #282a36;
      }

      &:nth-of-type(2n) {
        background-color: #44475a;
      }

      & + tr {
        & td {
          border-color: #f8f8f2;
          border-style: solid;
          border-width: 1px 0 0 0;
        }
      }

      & td {
        &:nth-of-type(3) {
          font-family: 'Source Code Pro', 'Lucida Console', Courier, monospace;
        }

        & + td {
          border-left: none;
        }
      }
    }
  }
}
</style>
