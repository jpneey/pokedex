<script setup>

  import Pokedex from '../assets/pokedex.json'
  import { prepareMon } from '@/assets/prepare';
  import Pokegrid from '@/components/Pokegrid.vue';

  const mons = prepareMon( Pokedex, 649, 722 );
  
</script>

<template>
  <Pokegrid :mons="mons"></Pokegrid>  
</template>
