<svelte:head>
  <title>画像の余白を削除</title>
</svelte:head>

<div class="container">
  <h1>画像の余白を削除</h1>
  <div>
    <slot />
  </div>
</div>

<style>
  h1 {
    font-size: 2rem;
  }

  .container {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
