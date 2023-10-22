<script>
  import {mode} from '../../store';
  export let data;
</script>

<main class={`${$mode}`}>
  <div class="w-3/4 mx-auto">
    <div class="mb-8">
      <a href="/">&leftarrow; Back to list</a>
    </div>
    <div class="grid md:grid-cols-2 grid-cols-1">
      <div>
        <div class="text-3xl">{data.row.name}</div>
        <figure>
          <img src={data.row.flags.png} alt="flag" />
        </figure>
      </div>
      <div class="mt-4">
        <div>Population: {data.row.population}</div>
        <div>Region: {data.row.region}</div>
        <div>Capital: <strong>{data.row.capital}</strong></div>
        <div>Alpha2Code: {data.row.alpha2Code}</div>
        <div>Alpha3code: {data.row.alpha3Code}</div>
        <div>Sub-Region: {data.row.subregion}</div>
        {#if data.row.borders}
          <div>Borders:</div>
          <div class="flex flex-wrap gap-2 mt-2">
            {#each data.row.borders as item}
            <a href={`/${item}`} class="border rounded hover:bg-slate-300 p-1 px-2">{item}</a>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
</main>