<script lang="ts">
  import { FileUploaderDropContainer } from "carbon-components-svelte";
  import { loadImage } from "~/utils/loadImage";
  import { readAsDataUrl } from "~/utils/readAsDataUrl";

  export let image: HTMLImageElement | undefined;
</script>

<FileUploaderDropContainer
  labelText="画像を選択"
  accept={["image/*"]}
  on:change={async ({ detail: [file] }) => {
    if (!file) {
      image = undefined;

      return;
    }

    const src = await readAsDataUrl(file);

    image = await loadImage(src);
  }}
/>
