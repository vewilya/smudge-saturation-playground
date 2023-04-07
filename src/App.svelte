<script>
  import * as knobby from 'svelte-knobby';
  import Audio from './lib/Audio.svelte';
  import Title from './lib/Title.svelte';
  import Waveform from './lib/Waveform.svelte';
  import Scope from './lib/Scope.svelte';
  import SineScope from './lib/SineScope.svelte'; 
  import Footer from './lib/Footer.svelte'
  import { isOn } from './store.js'
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  
</script>

<Waveform />
<main>

  <div class="row">
    <Scope />
    <Title />
    <SineScope />
    <Audio />
  </div>
  
  {#if $isOn}
    <Footer />
  {/if}

</main>


<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    }
    
    :global(body) {
      
      width: 100vw;
      height: 100vh;
 
      background: linear-gradient(225deg, #654784, #179595);
      margin: 0;
    }

    main {
      display: flex;
      justify-content: center;
      /* flex-direction: column; */
    }

   
  .row {
    position: absolute;
    bottom: 10vh;
    width: 100vw;
    height: 10vh;
    z-index: 12;
    display: flex;
    justify-content: center;
    flex-direction: row;

  }

</style>

