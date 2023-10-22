<script>
  import data from '../data/data.json';
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
  document.body.style.backgroundColor = $mode.val === 'dark' ? "#101010" : '#ffffff';
  document.body.style.color = $mode.val === 'dark' ? "#ffffff" : '#101010';
}

</script>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  .countries-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: space-evenly;
    align-items: center;
    padding: 1rem;
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
  <div class="w-3/4 mx-auto">
    <div class="flex items-center justify-between">
      <div class="md:text-3xl text-lg font-bold">Where in the world?</div>
      <button class="bg-{$mode=='dark' ? 'gray' : 'white'}-700 border text-{$mode=='dark'?'white':'gray'} px-4 p-1 rounded-md" on:click={() => toggleMode()}>
        {#if $mode.val=='dark'}
        <i class="fa fa-sun"></i> {$mode.label}
        {:else}
        <i class="fa fa-moon"></i> {$mode.label}
        {/if}
      </button>
    </div>
    {#if currCountry}
    <div>
      <div class="my-12">
        <button class="border-2 py-2 px-4 rounded-md" on:click={() => currCountry = null}>
          &leftarrow; Back to list
        </button>
      </div>
      <div class="grid md:grid-cols-2 grid-cols-1">
        <div>
          <figure>
            <img width="480" src={currCountry.flags.png} alt="flag" />
          </figure>
        </div>
        <div class="mt-4">
          <div class="text-3xl">{currCountry.name}</div>
          <div>Population: {currCountry.population}</div>
          <div>Region: {currCountry.region}</div>
          <div>Capital: {currCountry.capital}</div>
          <div>Alpha2Code: {currCountry.alpha2Code}</div>
          <div>Alpha3code: {currCountry.alpha3Code}</div>
          <div>Sub-Region: {currCountry.subregion}</div>
          {#if currCountry.borders}
            <div>Borders:</div>
            <div class="flex flex-wrap gap-2 mt-2">
              {#each currCountry.borders as item}
              <a href={`/${item}`} class="border rounded hover:bg-slate-300 p-1 px-2">{item}</a>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </div>
    {:else}
      <div class="h-full">
        <nav>
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
              <button on:click={() => currCountry = row} class="rounded-t-lg w-[20rem] mb-4 flex flex-wrap items-between justify-around">
                <div class="rounded-t-lg pb-1 md:w-[18rem] w-full shadow-lg hover:shadow-xl">
                  <img height="100" src={row.flags.png} alt="flag" class="object-top rounded-t-lg mb-4 h-[12rem] w-full" />
                  <div class="p-1 px-8 leading-md">
                    <div class="md:text-lg font-bold">{row.name}</div>
                    <div>Population: {row.population}</div>
                    <div>Region: {row.region}</div>
                    <div>Capital: {row.capital}</div>
                  </div>
                </div>
              </button>
            {/each}
          </div>
        </div>
      </div>
      {/if}
  </div>
</main>
