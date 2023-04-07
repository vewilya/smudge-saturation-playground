<script>
     import * as knobby from 'svelte-knobby';
     import { masterLevel, mixLevel, masterDrive, bumpV, masterSine, valA, valB, valC, valD, isOn, hCutV } from '../store.js'
     import { createEventDispatcher } from "svelte";
     import { derived, get } from 'svelte/store';
     import { curvedValue } from '../helpers.js'
     const dispatch = createEventDispatcher();
   
     const controls = knobby.panel({
       // specify options by using a { value } object
       level: {
         $label: 'level',
         value: .5,
         min: 0,
         max: 1.0,
         step: .01
       },

       mix: {
         $label: 'mix',
         value: .7,
         min: 0,
         max: 1.0,
         step: .01
       },
   
       drive: {
         $label: 'tanh',
         value: 1.0,
         min: 1.0,
         max: 10,
         step: 0.1
       },
   
       sine: {
         $label: 'sine',
         value: 1.0,
         min: 1.0,
         max: 4,
         step: 0.01
       },

       highCut: {
         $label: 'highCut',
         value: 1.0,
         min: 0.01,
         max: 1,
         step: 0.01
       },
       
       bump: {
         $label: 'bump',
         value: 0.0,
         min: 0.0,
         max: 1,
         step: 0.01
       },

       C: {
         $label: 'Cheb One',
         value: 1, 
         min: 0.01,
         max: 10,
         step: 0.01,
       },

       D: {
         $label: 'Cheb Two',
         value: 1, 
         min: 0.01,
         max: 10,
         step: 0.01,
       }
     });

     // the returned store is writable
     const lev = derived(controls, value => value.level);
     const mix = derived(controls, value => value.mix);
     const dri = derived(controls, value => value.drive);
     const sine = derived(controls, value => value.sine);
     const hc = derived(controls, value => value.highCut);
     const bump = derived(controls, value => value.bump);

     // const a = derived(controls, value => value.A);
     // const b = derived(controls, value => value.B);
     const c = derived(controls, value => value.C);
     const d = derived(controls, value => value.D);

     lev.subscribe(value => {masterLevel.set(value); dispatch('update', { $masterLevel })});
     mix.subscribe(value => {mixLevel.set(curvedValue(value, 4)); dispatch('update', { $mixLevel })});
     dri.subscribe(value => {masterDrive.set(value); dispatch('update', { $masterDrive })});
     sine.subscribe(value => {masterSine.set(value); dispatch('update', { $masterSine })});
     hc.subscribe(value => {hCutV.set(value); dispatch('update', {$hCutV})});
     bump.subscribe(value => {bumpV.set(value); dispatch('update', {$bumpV})});

     // a.subscribe(value => {valA.set(value); dispatch('update', { $valA })});
     // b.subscribe(value => {valB.set(value); dispatch('update', { $valB })});
     c.subscribe(value => {valC.set(value); dispatch('update', { $valC })});
     d.subscribe(value => {valD.set(value); dispatch('update', { $valD })});
     
   </script>
   

   <style>

      
   </style>
   
   