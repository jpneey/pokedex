<script setup>

  import Pokedex from '../assets/pokedex.json'
  import { prepareMon } from '@/assets/prepare';
  import Pokegrid from '@/components/Pokegrid.vue';

  const mons = prepareMon( Pokedex, 386, 494 );
  
</script>

<template>
  <Pokegrid :mons="mons"></Pokegrid>  
</template>
