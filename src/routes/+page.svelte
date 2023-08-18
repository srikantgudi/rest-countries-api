<script>
  import data from '../data/data.json';
  let searchRegion = '';
  let searchCountry = '';
  let regions = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

  $: filterRow = (f) => ((regions.includes(searchRegion) ? f.region.includes(searchRegion) : true) 
      && (searchCountry ? f.name.toLowerCase().includes(searchCountry.toLowerCase()) : true));

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
  @media screen and (max-width:480px) {
    nav {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>

<main>
  <h1>Rest countries api</h1>
  <nav>
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
      {/each}
    </div>
  </div>
</main>
