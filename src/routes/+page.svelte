<script>
  import data from '../data/data.json';
  let searchRegion = '';
  let searchCountry = '';
  let regions = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
  let mode = 'lite';
  let modeLabel = 'Lite';

  $: filterRow = (f) => ((regions.includes(searchRegion) ? f.region.includes(searchRegion) : true) 
      && (searchCountry ? f.name.toLowerCase().includes(searchCountry.toLowerCase()) : true));
  $: modeLabel = mode === 'dark' ? 'Lite' : 'Dark';

  const toggleMode = () => {
    mode = mode == 'dark' ? 'lite' : 'dark';
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
  .countries {
    box-shadow: 0 0 4px #999;
    height: 80vh;
    overflow-y: auto;
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
  figure {
    display:flex;
    align-items:center;
    height:12rem;
  }
  .dark {
    background-color: hsl(209, 23%, 22%);
    color: antiquewhite;
  }
  .lite {
    background-color: hsl(0, 0%, 100%);    
  }
  @media screen and (max-width:480px) {
    nav {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>

<main class={mode}>
  <nav class="">
    <h1 class="text-3xl font-bold">Where in the world?</h1>
    <button class="bg-{mode=='dark' ? 'gray' : 'white'}-700 border text-{mode=='dark'?'white':'gray'} px-4 p-1 rounded-md" on:click={toggleMode}>{modeLabel}</button>
  </nav>
  <nav class="px-4">
    <div>
      <input type="search" bind:value={searchCountry} class="border-2 p-1 rounded-md" />
    </div>
    <div>
      <select bind:value={searchRegion} class="border-2 p-1 rounded-md">
        {#if !searchRegion}<option value="">- Filter by Region -</option>{/if}
        <option value="">All</option>
        {#each regions as rgn}
        <option value={rgn}>{rgn}</option>
        {/each}
      </select>
    </div>
  </nav>
  <div>
    <div class="flex flex-wrap justify-around">
      {#each data.filter(f => filterRow(f)) as row}
        <a href={`/${row.alpha3Code}`} class="mb-4 p-4">
          <div class="border-2 rounded-md md:p-1 md:pb-4 pb-1 md:w-[16vw] w-full flex flex-col items-center">
            <figure class="mb-4">
              <img height="100" src={row.flags.png} alt="flag" />
            </figure>
            <div>
              <div class="md:text-2xl">{row.name}</div>
              <div>Population: {row.population}</div>
              <div>Region: {row.region}</div>
              <div>Capital: {row.capital}</div>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</main>
