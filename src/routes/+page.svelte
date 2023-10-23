<script>
  import data from '../data/data.json';
  import Topnav from "$lib/topnav.svelte";

  import {mode} from '../store';

  let searchRegion = '';
  let searchCountry = '';
  let regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  let textColor = 'black';
  let currCountry = null;

  $: filterRow = (f) => ((regions.includes(searchRegion) ? f.region.includes(searchRegion) : true) 
      && (searchCountry ? f.name.toLowerCase().includes(searchCountry.toLowerCase()) : true));
  
const toggleMode = () => {
  if ($mode.val === 'dark') {
    $mode.val = 'lite';
    $mode.label = 'Dark';
  } else {
    $mode.val = 'dark';
    $mode.label = 'Lite';
  }
  window.document.body.classList.toggle('dark');
}

</script>

<style>
  :global(body.dark) {
    background-color: #101010;
    color: #ffffff;
  }
  :global(body) {
    background-color: #ffffff;
    color: #101010;
  }
  img {
    background-size: contain;
  }
  @media screen and (max-width:480px) {
    nav {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>

<main>

  <Topnav />
  <div class="w-3/4 mx-auto my-8">
    <div class="h-full">
      <nav class="flex md:items-center md:flex-row flex-col md:justify-between justify-around p-2 mb-4">
        <div class="border p-2 w-[24rem] rounded-lg">
          <i class="fa fa-search px-2"></i>
          <input type="search" bind:value={searchCountry} class="bg-{$mode.val === 'dark' ? '[hsl(209,209,209)]' : 'white'} w-[90%] outline-0 p-1" />
        </div>
        <div class="text-{textColor}">
          <select bind:value={searchRegion} class="border-2 outline-0 w-[10rem] p-2 text-{$mode.val ==="dark" ? "white" : "hsl(209,209,209)"} bg-{$mode.val ==='dark'? 'slate-900': 'white'} relative rounded-md">
            {#if !searchRegion}<option value="">- Filter by Region -</option>{/if}
            <option value="">All</option>
            {#each regions as rgn}
            <option value={rgn}>{rgn}</option>
            {/each}
          </select>
        </div>
      </nav>
      <div>
        <div class="flex md:flex-row md:flex-wrap flex-col md:justify-between justify-around gap-1">
          {#each data.filter(f => filterRow(f)) as row}
            <a href={`/${row.alpha3Code}`} class="rounded-t-lg w-[20rem] mb-4 flex flex-wrap items-between justify-around">
              <div class="rounded-t-lg pb-1 md:w-[18rem] w-full md:shadow-slate-300 shadow-slate-200 shadow-md md:shadow-xl hover:shadow-2xl">
                <img height="100" src={row.flags.png} alt="flag" class="object-top rounded-t-lg mb-4 h-[12rem] w-full" />
                <div class="text-left p-1 px-8 leading-md">
                  <div class="md:text-lg font-bold">{row.name}</div>
                  <div>Population: {row.population}</div>
                  <div>Region: {row.region}</div>
                  <div>Capital: {row.capital}</div>
                </div>
              </div>
            </a>
          {/each}
        </div>
      </div>
    </div>
  </div>
</main>
