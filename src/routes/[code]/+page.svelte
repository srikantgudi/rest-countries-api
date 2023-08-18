<script>
  export let data;
</script>

<style>
  .border-link {
    margin: auto 1rem;
  }
  .grid {
    display: grid;
    grid-template-columns: 24rem 1fr;
    gap: 1rem;
  }
</style>

<main>
  <div>
    <a href="/">Back to list</a>
  </div>
  <hr>
  <div class="grid">
    <div>
      <h2>{data.row.name}</h2>
      <figure>
        <img src={data.row.flags.png} alt="flag" />
      </figure>
    </div>
    <div>
      <div>Population: {data.row.population}</div>
      <div>Region: {data.row.region}</div>
      <div>Capital: <strong>{data.row.capital}</strong></div>
      <div>Alpha2Code: {data.row.alpha2Code}</div>
      <div>Alpha3code: {data.row.alpha3Code}</div>
      <div>Sub-Region: {data.row.subregion}</div>
      <div>Borders:</div>
      <div class="d-flex gap-4">
        {#each data.row.borders as item}
        <a href={`/${item}`} class="card px-2">{item}</a>
        {/each}
      </div>
    </div>
</main>