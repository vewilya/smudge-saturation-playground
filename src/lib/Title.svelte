<script>
     import { onMount } from "svelte";
     import title from "../assets/Smudge.png";
     import { col } from "../store.js";
     import { createEventDispatcher } from "svelte";
     const dispatch = createEventDispatcher();

     let canvas;

     let r;
     let g;
     let b;

     onMount(() => {
          const ctx = canvas.getContext("2d");
          let frame = requestAnimationFrame(loop);

          function loop(t) {
               frame = requestAnimationFrame(loop);

               const imageData = ctx.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height
               );

               for (let p = 0; p < imageData.data.length; p += 4) {
                    const i = p / 4;
                    const x = i % canvas.width;
                    const y = (i / canvas.width) >>> 0;

                    r = 13 + (41 * x) / canvas.width + 2 * Math.sin(t / 1000);
                    g = 17 + (21 * y) / canvas.height + 4 * Math.cos(t / 1000);
                    b = 14 + (51 * y) / canvas.height + 2 * Math.cos(t / 1000);

                    imageData.data[p + 0] = r;
                    imageData.data[p + 1] = g;
                    imageData.data[p + 2] = b;
                    imageData.data[p + 3] = 255;
               }

               ctx.putImageData(imageData, 0, 0);

               $col.push(parseInt(r));
               $col.push(parseInt(g));
               $col.push(parseInt(b));
          }

          return () => {
               cancelAnimationFrame(frame);
          };
     });
</script>

<canvas bind:this={canvas} width={100} height={100} />

<!-- <img src={title} alt="Svelte Logo" /> -->
<style>
     canvas {
          width: 30%;
          height: 30%;
          margin-left: auto;
          margin-right: auto;
          position: fixed;
          top: 35%;
          left: 35%;

          mask-image: url("../assets/Smudge.png");
          -webkit-mask: url("../assets/Smudge.png") 50% 50% no-repeat;
          mask: url("../assets/Smudge.png") 50% 50% no-repeat;
          -webkit-mask-size: 200%;
          mask-size: 200%;
          z-index: 5;
     }

</style>
