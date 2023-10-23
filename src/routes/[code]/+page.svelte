<script>
  import Topnav from "$lib/topnav.svelte";
  import cdata from '../../data/data.json';

  export let data;
  const nameOfItem = (item) => cdata.filter(m => m.alpha3Code === item)[0].name;
</script>
<Topnav />
<div class="w-3/4 mx-auto">
  <div class="my-24">
    <a href="/" class="border bg-white text-black p-2 rounded">
      &leftarrow; Back to List
    </a>
  </div>
  <div class="grid md:grid-cols-2">
    <div>
      <img src={data.row.flags.png} alt="flag" width={480}>
    </div>
    <div>
      <div class="text-2xl my-4">{data.row.name}</div>
      <div class="grid md:grid-cols-2 grid-cols-1 gap-2">
        <div>Native Name: {data.row.nativeName}</div>
        <div>Population: {data.row.population}</div>
        <div>Currencies: {data.row.currencies.map(c => c.name).join(", ")}</div>
        <div>Region: {data.row.region}</div>
        <div>Languages: {data.row.languages.map(l => l.name).join(', ')}</div>
        <div>Capital: {data.row.capital}</div>
        <div>Alpha2Code: {data.row.alpha2Code}</div>
        <div>Alpha3code: {data.row.alpha3Code}</div>
        <div>Sub-Region: {data.row.subregion}</div>
      </div>
      <div class="grid grid-cols-1 gap-2">
        {#if data.row.borders}
          <div>Borders:</div>
          <div class="flex flex-wrap gap-2 mt-2">
            {#each data.row.borders as item}
            <a href={`/${item}`} class="border rounded hover:bg-slate-300 p-1 px-2">
              {nameOfItem(item)}
            </a>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>