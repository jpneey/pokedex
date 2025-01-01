<script setup>

  import Pokedex from '../assets/pokedex.json'
  import { prepareMon } from '@/assets/prepare';
  import Pokelist from '@/components/Pokelist.vue';

  const mons = prepareMon( Pokedex, 0, 9999 );
  
</script>

<template>
  <Pokelist :mons="mons"></Pokelist>  
</template>
