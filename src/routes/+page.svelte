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
  <nav class="navbar navbar-bg px-4">
    <h1 class="fs-1 fw-bold">Where in the world?</h1>
    <button class="btn btn-primary" on:click={toggleMode}>{modeLabel}</button>
  </nav>
  <nav class="px-4">
    <div>
      <input type="search" bind:value={searchCountry} class="form-control" />
    </div>
    <div>
      <select bind:value={searchRegion} class="form-control">
        {#if !searchRegion}<option value="">- Filter by Region -</option>{/if}
        <option value="">All</option>
        {#each regions as rgn}
        <option value={rgn}>{rgn}</option>
        {/each}
      </select>
    </div>
  </nav>
  <div class="countries">
    <div class="countries-grid">
      {#each data.filter(f => filterRow(f)) as row}
        <a href={`/${row.alpha3Code}`}>
          <div class="card">
            <figure>
              <img src={row.flags.png} alt="flag" />
            </figure>
            <div class="card-body">
              <h3 class="card-title">
                <div>{row.name}</div>
              </h3>
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
