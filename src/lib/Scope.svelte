<script>
     import { onMount } from "svelte";
     import { scopeData, isOn } from '../store.js'
 
     let canvas;

     function minmax(arr){
          let min = Math.min.apply(null, arr);
          let max = Math.max.apply(null, arr);

          return [ min, max ]
     }
 
     onMount(() => {
         const ctx = canvas.getContext("2d");
         let frame;
         let height = canvas.height;
         let width = canvas.width;
         let cW = canvas.width / 2;
         let cH = canvas.height / 2;
 
        //  canvas.style.background = "rgba(32, 52, 122, 1.0)";

        

         (function loop() {
               ctx.clearRect(0,0, width, height);
               frame = requestAnimationFrame(loop);
            
          for(let i = 0; i < $scopeData.length; i++){
               const grd = ctx.createLinearGradient(0, 0, width, height);
               grd.addColorStop(0, "#654784");
               grd.addColorStop(1, "#179595");

               let mh = height * 0.5;

               ctx.beginPath();
               ctx.moveTo(i, mh + $scopeData[i]*mh);
               ctx.lineTo(i+1, mh + $scopeData[i+1]*mh);
            //    ctx.arc(i, mh + mh * $scopeData[i], 10, Math.PI * 2, false);
               ctx.strokeStyle = "#f21840";
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
        left: 10%;
        top: 35%;
         /* bottom: 10%; */
         
     }

     /* position: absolute;
          left: 28vw;
          bottom: 18vh;
          padding: 1rem;
          display: flex;
          justify-content: center;
          flex-direction: row;
          margin: auto auto;
          min-width: 40vw;
          width: 40vw;

          height: 10%; */
         
 </style>
 