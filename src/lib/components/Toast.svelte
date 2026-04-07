<script>
  let { message, type = 'ok' } = $props();
</script>

<div class="tst" class:tok={type === 'ok'} class:ter={type === 'er'} class:tinf={type === 'inf'}>
  {message}
</div>
