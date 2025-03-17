<template>
  <div class="nes-player">
    <canvas
      ref="nesCanvas"
      width="256"
      height="240"
      style="width: 100%; height: 100%"
    ></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import axiosInstance from "../api/ApiInstance";
import { KEY_MAP } from "../configs/button";

export default defineComponent({
  name: "NesPlayer",
  setup() {
    const SCREEN_WIDTH = 256;
    const SCREEN_HEIGHT = 240;
    const FRAME_BUFFER_SIZE = SCREEN_WIDTH * SCREEN_HEIGHT;

    let framebuffer_u8: Uint8ClampedArray;
    let framebuffer_u32: Uint32Array;
    let canvas_ctx: CanvasRenderingContext2D | null;
    let image: ImageData;

    const nesCanvas = ref<HTMLCanvasElement | null>(null);
    const worker = ref<Worker | null>(null);

    const loadRom = async () => {
      try {
        const response = await axiosInstance(
          "/roms/download/69ee9978e21bf86e8fb3b8ddc9a06df4.nes",
          { responseType: "arraybuffer" }
        );
        const romData = new Uint8Array(response.data);

        let rom_bytes = "";
        for (let i = 0; i < romData.length; i++) {
          rom_bytes += String.fromCharCode(romData[i]);
        }

        worker.value?.postMessage({ type: "loadRom", data: rom_bytes });
      } catch (error: any) {
        console.log(`Houve um erro ao tentar resgatar a ROM: ${error.message}`);
      }
    };

    const emulate = () => {
      worker.value?.postMessage({ type: "frame" });
      requestAnimationFrame(emulate);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      console.log(event);
      if (event.code in KEY_MAP) {
        const button = KEY_MAP[event.code as keyof typeof KEY_MAP];
        worker.value?.postMessage({ type: "keyDown", data: `${button}` });
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      if (event.code in KEY_MAP) {
        const button = KEY_MAP[event.code as keyof typeof KEY_MAP];
        worker.value?.postMessage({ type: "keyUp", data: `${button}` });
      }
    };

    onMounted(() => {
      if (nesCanvas.value) {
        canvas_ctx = nesCanvas.value.getContext("2d");
        if (canvas_ctx) {
          image = canvas_ctx.getImageData(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
          canvas_ctx.fillStyle = "black";
          canvas_ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
          const buffer = new ArrayBuffer(image.data.length);
          framebuffer_u8 = new Uint8ClampedArray(buffer);
          framebuffer_u32 = new Uint32Array(buffer);
        }
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);
      }

      onUnmounted(() => {
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("keyup", onKeyUp);
      });

      worker.value = new Worker(
        new URL("../workers/nesWorker.js", import.meta.url),
        {
          type: "module",
        }
      );

      worker.value.onmessage = (event) => {
        const { type, frameBuffer } = event.data;

        if (type === "frame" && canvas_ctx) {
          for (let i = 0; i < FRAME_BUFFER_SIZE; i++) {
            framebuffer_u32[i] = 0xff000000 | frameBuffer[i];
          }

          image.data.set(framebuffer_u8);
          canvas_ctx.putImageData(image, 0, 0);
        }
      };

      loadRom();
      requestAnimationFrame(emulate);
    });

    return {
      nesCanvas,
    };
  },
});
</script>

<style scoped>
.nes-player {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
canvas {
  border: 1px solid black;
}
</style>
