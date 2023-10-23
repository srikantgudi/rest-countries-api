<script>
  import {mode} from '../store';
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

<div class="shadow-md dark:shadow-slate-200 rounded py-2">
  <div class="w-3/4 mx-auto">
    <div class="flex justify-between p-1">
      <div class="md:text-3xl text-lg font-bold">Where in the world?</div>
      <button class="bg-{$mode=='dark' ? 'gray' : 'white'}-700 border text-{$mode=='dark'?'white':'gray'} px-4 p-1 rounded-md" on:click={() => toggleMode()}>
        {#if $mode.val=='dark'}
        <i class="fa fa-sun"></i> {$mode.label}
        {:else}
        <i class="fa fa-moon"></i> {$mode.label}
        {/if}
      </button>
    </div>
  </div>
</div>