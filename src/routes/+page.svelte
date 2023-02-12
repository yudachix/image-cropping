<script lang="ts">
  import "carbon-components-svelte/css/g90.css";
  import ColorPicker, { type RgbaColor } from "svelte-awesome-color-picker";
  import { Button, Toggle, Theme, Slider } from "carbon-components-svelte";
  import ImageFileDrop from "~/lib/components/ImageFileDrop.svelte";
  import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
  import { getBoundingRect } from "~/utils/getBoundingRect";
  import { loadImage } from "~/utils/loadImage";
  import { type Color } from "~/utils/diffColor";

  let img: HTMLImageElement | undefined;
  let cv: HTMLCanvasElement | undefined;
  let ctx: CanvasRenderingContext2D | undefined;
  let alphaDiff = 255;
  let colorDiff = 0;
  let rgb: RgbaColor = {
    a: 255,
    r: 255,
    g: 255,
    b: 255,
  };
  let color: Color = [rgb.r, rgb.g, rgb.b, rgb.a];
  let preview = true;

  $: ctx = cv?.getContext("2d") ?? undefined;

  let throttle = false;

  $: if (throttle) {
    setTimeout(() => (throttle = false), 500);
  }

  $: if (cv && ctx && img && !throttle && preview) {
    ctx.clearRect(0, 0, cv.width, cv.height);

    const rect = getBoundingRect(
      img,
      [rgb.r, rgb.g, rgb.b, rgb.a],
      colorDiff,
      alphaDiff
    );

    if (rect) {
      ctx.strokeStyle = "#f00";
      ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    }
  }
</script>

<Theme theme="g90" />

<div>
  {#if img}
    <div class="tool column-flex">
      <div>
        <div class="tool-params column-flex">
          <Toggle
            labelA="オフ"
            labelB="オン"
            labelText="プレビュー"
            toggled
            on:change={({ target }) => {
              if (!(target instanceof HTMLInputElement)) {
                return;
              }

              preview = target.checked;
            }}
          />
          <div style="z-index: 9999">
            <ColorPicker
              bind:rgb
              on:input={({ detail: { rgb } }) => {
                if (throttle) {
                  return;
                }

                throttle = true;
                color = [rgb.r, rgb.g, rgb.b, rgb.a];
              }}
              label="背景色を選択"
            />
          </div>
          <Slider
            labelText="色の許容値"
            max={255}
            on:change={(ev) => (colorDiff = ev.detail)}
          />
          <Slider
            labelText="透明度の許容値"
            value={alphaDiff}
            max={255}
            on:change={(ev) => (alphaDiff = ev.detail)}
          />
        </div>
        <div class="tool-actions row-flex">
          <Button
            kind="danger"
            icon={TrashCan}
            on:click={() => (img = undefined)}
          >
            破棄
          </Button>
          <Button
            on:click={async () => {
              if (!img) {
                return;
              }

              const rect = getBoundingRect(
                img,
                [rgb.r, rgb.g, rgb.b, rgb.a],
                colorDiff,
                alphaDiff
              );

              if (!rect) {
                return;
              }

              const cv = document.createElement("canvas");
              const ctx = cv.getContext("2d");

              cv.width = img.naturalWidth;
              cv.height = img.naturalHeight;

              if (!ctx) {
                return;
              }

              ctx.drawImage(img, 0, 0);

              const imgData = ctx.getImageData(
                rect.x,
                rect.y,
                rect.width,
                rect.height
              );

              cv.width = rect.width;
              cv.height = rect.height;

              ctx.putImageData(imgData, 0, 0);

              img = await loadImage(cv.toDataURL("image/png"));
            }}
          >
            切り取る
          </Button>
        </div>
      </div>
      <div class="canvas-container">
        <canvas bind:this={cv} width={img.width} height={img.height} />
        <img src={img.src} alt="" />
      </div>
    </div>
  {:else}
    <ImageFileDrop bind:image={img} />
  {/if}
</div>

<style lang="scss">
  .column-flex {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .row-flex {
    display: flex;
  }

  .tool {
    gap: 1rem;

    &-params {
      gap: 1rem;
    }

    &-actions {
      gap: 0.5rem;
    }
  }

  canvas {
    position: absolute;
    max-width: calc(100vw - 2rem);
  }

  img {
    max-width: calc(100vw - 2rem);
    vertical-align: middle;
  }

  .canvas-container {
    position: relative;
    display: inline-block;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAD5JREFUeNrs0LENADAIA0HIDOy/IN7BTBCJJlKK/9q6wtndsa6q9uMTz4KGhob+lE7b+7UkvoaGhoa+NwIMADyNCPm5Mt6kAAAAAElFTkSuQmCC);
  }
</style>
