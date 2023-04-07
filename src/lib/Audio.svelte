<script>
     // @ts-nocheck

     import { el } from "@elemaudio/core";
     import WebRenderer from "@elemaudio/web-renderer";

     import {
          masterLevel,
          mixLevel,
          isOn,
          masterDrive,
          masterSine,
          hCutV,
          bumpV,
          data,
          scopeData,
          sineScopeData,
          windowWidth,
          valA,
          valB,
          valC,
          valD,
          
     } from "../store.js";
     import strolling from '../assets/strolling.wav'
     import { saturation } from "../saturation.js";
     import Knobby from "./Knobby.svelte";

     const ctx = new AudioContext();
     const core = new WebRenderer();

     $: label = $isOn ? "STOP ENGINE" : "START ENGINE";

     async function startAudio() {
          
          if (ctx.state === "suspended") {
               await ctx.resume();
               $isOn = true;
          } else {
               stop();
               ctx.suspend();
               $isOn = false;
          }

          
     }

     let playFile = 0;

     function play() {
          playFile === 0 ? playFile = 1 : "";
          process();
     }

     function stop() {
          playFile === 1 ? playFile = 0 : "";
          process();
     }

     function process() {
          let trigger = el.sm(el.const({ key: "trigger", value: playFile }));
          let l = el.const({ key: "level", value: $masterLevel });
          let mix = el.sm( el.const({ key: 'mix', value: $mixLevel }) );
          let d = el.const({ key: "drive", value: $masterDrive });
          let s = el.const({ key: "sine", value: $masterSine });
          let vA = el.const({ key: "valA", value: $valA });
          let vB = el.const({ key: "valA", value: $valB });
          let vC = el.const({ key: "valA", value: $valC });
          let vD = el.const({ key: "valD", value: $valD });
          let hiCut = el.const({ key: "hiCut", value: 2000 + $hCutV * 18000 });
          let bumper = el.const({ key: "bumper", value: $bumpV * 3 })

          let env = el.adsr(0.2, .1, 1.0, .3, trigger);
          let sampleL = el.sample( { path: "strolling:0", mode: "loop" }, env, 1 );
          let sampleR = el.sample( { path: "strolling:1", mode: "loop" }, env, 1 );

          let left = el.mul(l, el.cycle(440));
          let right = el.scope(
               { name: "right", size: 512 },
               el.mul(l, el.select( mix, saturation(d, s, vA, vB, vC, vD, el.cycle(937.5)), el.cycle(937.5)) )); //937.5

          let leftS = saturation(d, s, vA, vB, vC, vD, sampleL);
          let rightS = saturation(d, s, vA, vB, vC, vD, sampleR);

          let leftSig = el.lowpass(hiCut, 0.3, el.mul(l, leftS));
          let rightSig = el.lowpass(hiCut, 0.3, el.mul(l, rightS));

          let leftMix = el.peak(77, 1.2, bumper, el.select( mix, leftSig , el.mul(l,sampleL)));
          let rightMix = el.peak(77, 1.2, bumper, el.select( mix, rightSig, el.mul(l,sampleR)));

          let leftO = el.snapshot({ name: "ss" }, el.train(120), leftMix);
          let rightO = el.scope({ name: "left" }, rightMix);

          core.render(leftO, el.add(el.mul(0, right), rightO));
     }

     core.on("load", function () {
          process();
     });

     core.on("snapshot", function (e) {
          $data.push(e.data);
          $data.length > $windowWidth ? $data.splice(0, 1) : "";
     });

     core.on("scope", function (e) {
          if (e.source === "left") {
               scopeData.set(e.data[0]);
          }

          if (e.source === "right") {
               sineScopeData.set(e.data[0]);
          }
     });

     (async function main() {
          let res = await fetch(strolling);
          let sampleBuffer = await ctx.decodeAudioData(await res.arrayBuffer());

          let node = await core.initialize(ctx, {
               numberOfInputs: 0,
               numberOfOutputs: 1,
               outputChannelCount: [2],
               processorOptions: {
                   
                    virtualFileSystem: {
                         "strolling:0":
                              sampleBuffer.getChannelData(0),
                         "strolling:1":
                              sampleBuffer.getChannelData(1),
                    },
               },
          });

          node.connect(ctx.destination);
     })();
</script>

<Knobby on:update={process} />
<!-- <h1>{$isOn}</h1>
<h1>{playFile}</h1> -->
<div class="main">
     {#if $isOn}
          <button class="play" on:click={play}>
               <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
               >
                    <path
                         fill-rule="evenodd"
                         d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                         clip-rule="evenodd"
                    />
               </svg>
          </button>
     {/if}

     <button on:click={startAudio}>{label}</button>
     
     {#if $isOn}
          <button class="play" on:click={stop}>
               <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
               >
                    <path
                         fill-rule="evenodd"
                         d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                         clip-rule="evenodd"
                    />
               </svg>
          </button>
     {/if}
</div>

<style>
     .main {
          position: relative;
          left: 0vw;
          bottom: 18vh;
          padding: 1rem;
          display: flex;
          justify-content: center;
          flex-direction: row;
          margin: auto auto;
          min-width: 40vw;
          width: 40vw;
          /* min-width: 30vw; */
          height: 10%;
         
     }

     button {
          position: relative;
          margin: auto auto;
          color: white;
          width: 8rem;
          height: 3rem;
          min-width: 4rem;
          min-height: 1.5rem;
          padding: .2rem;
          border: 0px solid #041f1f;
          border-radius: 12px;
          background: rgb(32, 34, 41);
     }

     button:hover{
          background: rgb(42, 44, 53);
     }

     button:active {
          
          background: rgb(62, 65, 78);
     }

     .play {
          position: relative;
          margin: auto auto;
          /* padding: .3%; */
          color: white;
          width: 3rem;
          height: 3rem;
          min-width: 3rem;
          min-height: 3rem;
          /* border: 2px solid #041f1f; */
          border-radius: 50%;
          background: rgb(32, 34, 41);
     }

     

     /* svg { 
          position: relative;
          margin: auto auto;
          padding: .01rem;
          width: 95%;
          height: 95%;
     } */
</style>
