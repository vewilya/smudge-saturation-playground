<script>
     import { onMount } from "svelte";
     import { data, windowWidth } from '../store.js'
 
     let canvas;
    
     windowWidth.set(window.innerWidth);

     function resizeCanvas(){
          canvas.width={$windowWidth}
          canvas.height = 200;
     }
 
    onMount(() => {
         const ctx = canvas.getContext("2d");
         let frame;
         
         let height = canvas.height;
         let width = canvas.width;
 
     (function loop() {
          ctx.clearRect(0,0, width, height);
          frame = requestAnimationFrame(loop);
          
          const grd = ctx.createLinearGradient(0, 0, width, height);
          grd.addColorStop(0, "#f21840")
          grd.addColorStop(.5, "#654784");
          grd.addColorStop(1, "#178595");

          for(let i = 0; i < $data.length; i++){
            const grd = ctx.createLinearGradient(0, 0, width, height);
            grd.addColorStop(0, "#f21840")
            grd.addColorStop(.5, "#654784");
            grd.addColorStop(1, "#178595");
            let mh = height * 0.5;
            ctx.clearRect(i, height, 1, 1);

            ctx.beginPath();
            ctx.moveTo(i, mh + $data[i]* mh);
            ctx.lineTo(i+1, mh);
            
            ctx.lineCap = "round";
            ctx.lineWidth = 3 + 4*Math.abs($data[i])
            ctx.strokeStyle = grd;
            ctx.stroke();

          }    
 
         })();
 
         return () => {
             cancelAnimationFrame(frame);
         };
     });
 </script>
 
 <div class="canvasContainer">
 
     <canvas
         bind:this={canvas}
         width={window.innerWidth}
         on:resize={resizeCanvas}
         height={200}
     />
 </div>
 
 <style>
    
     canvas {

        position: fixed; 
        width: 100vw;
        top: 7%;
        left: 0;

     }
 </style>
 