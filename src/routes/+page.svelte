<script>
  import data from '../data/data.json';
  import {mode} from '../store';

  let searchRegion = '';
  let searchCountry = '';
  let regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  let modeLabel = 'Lite';
  let textColor = 'black';

  $: filterRow = (f) => ((regions.includes(searchRegion) ? f.region.includes(searchRegion) : true) 
      && (searchCountry ? f.name.toLowerCase().includes(searchCountry.toLowerCase()) : true));
  $: modeLabel = $mode === 'dark' ? 'Lite' : 'Dark';

  const toggleMode = () => {
    $mode = ($mode === "dark" ? "lite" : "dark");
    textColor = ($mode === "dark" ? "white" : "black");
    var element = document.body;
   element.classList.toggle("dark");
   element.style.height = "100%";
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

<main class={`${$mode}`}>
  <div class="w-3/4 mx-auto h-full">
    <na class="flex gap-1 justify-between">
      <h1 class="md:text-3xl text-lg font-bold">Where in the world?</h1>
      <button class="bg-{$mode=='dark' ? 'gray' : 'white'}-700 border text-{$mode=='dark'?'white':'gray'} px-4 p-1 rounded-md" on:click={toggleMode}>
        {#if $mode=='dark'}
        <i class="fa fa-sun"></i> {modeLabel}
        {:else}
        <i class="fa fa-moon"></i> {modeLabel}
        {/if}
      </button>
    </na>
    <nav>
      <div class="border p-2 w-[24rem] rounded-lg">
        <i class="fa fa-search px-2"></i>
        <input type="search" bind:value={searchCountry} class="bg-{$mode === 'dark' ? '[hsl(209,209,209)]' : 'white'} w-[90%] outline-0 p-1" />
      </div>
      <div class="text-{textColor}">
        <select bind:value={searchRegion} class="border-2 outline-0 w-[10rem] p-2 text-{$mode==="dark" ? "white" : "hsl(209,209,209)"} bg-{$mode==='dark'? 'slate-900': 'white'} relative rounded-md">
          {#if !searchRegion}<option value="">- Filter by Region -</option>{/if}
          <option value="">All</option>
          {#each regions as rgn}
          <option value={rgn}>{rgn}</option>
          {/each}
        </select>
      </div>
    </nav>
    <div>
      <div class="flex md:flex-row md:flex-wrap flex-col justify-between gap-1">
        {#each data.filter(f => filterRow(f)) as row}
          <a href={`/${row.alpha3Code}`} class="rounded-t-lg mb-4 flex border border-white-{$mode=='dark' ? '100' : '400'} flex-wrap items-between justify-around">
            <div class="rounded-t-lg pb-1 md:w-[18rem] w-full shadow-md">
              <img height="100" src={row.flags.png} alt="flag" class="object-top rounded-t-lg mb-4 h-[12rem] w-full" />
              <div class="p-1 px-8 leading-md">
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
</main>
