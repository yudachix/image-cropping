<script>
  let title = "画像の余白を削除";
  let description =
    "これは、画像の余白を自動的にトリミングする Web アプリケーションです。";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="og:title" content={title} />
  <meta name="og:site_name" content="Yudachix" />
  <meta name="og:type" content="website" />
  <meta name="og:url" content="https://yudachix.github.io/image-cropping/" />
  <meta name="og:description" content={description} />
</svelte:head>

<div class="container">
  <h1>{title}</h1>
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
