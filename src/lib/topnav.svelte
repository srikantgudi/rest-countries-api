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
}
</script>

<main >
  
</main>