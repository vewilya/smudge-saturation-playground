<script>
     import { onMount } from "svelte";
     import { sineScopeData, isOn } from '../store.js'
 
     let canvas;

     onMount(() => {
         const ctx = canvas.getContext("2d");
         let frame;
         let height = canvas.height;
         let width = canvas.width;
         
        //  canvas.style.background = "rgba(32, 52, 122, 1.0)";

         (function loop() {
               ctx.clearRect(0,0, width, height);
               frame = requestAnimationFrame(loop);
    
          
            for(let i = 0; i < $sineScopeData.length; i++){
               const grd = ctx.createLinearGradient(0, 0, width, height);
               grd.addColorStop(0, "#654784");
               grd.addColorStop(1, "#179595");

               let mh = height * 0.5;

               ctx.beginPath();
            //    ctx.arc(i, mh + mh * $sineScopeData[i], 10, Math.PI * 2, false);
               ctx.moveTo(i, mh + $sineScopeData[i]*mh);
               ctx.lineTo(i+1, mh + $sineScopeData[i+1]*mh);
               ctx.strokeStyle = "#179595";
               ctx.lineCap = "round";
               ctx.lineWidth = 2;
               
               $isOn ? ctx.stroke() : "";

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
         width={200}
         height={200}
         on:change
     />
 </div>
 
 <style>
 
     canvas {
        position: fixed; 
        width: 17%;
        height: 30%;
        right: 10vw;
        top: 35%;
        margin-left: auto;
		margin-right: auto;
     }
 </style>
 