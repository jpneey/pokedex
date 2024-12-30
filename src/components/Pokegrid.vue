<script setup>

    import { defineProps } from 'vue';
    import Pokemoncard from '@/components/Pokemoncard.vue';

    const props = defineProps(['mons']);
    const mons = props.mons;

</script>
<template>
  <div class="row row-cols-1 row-cols-lg-2 spacing">
    <div class="col mb-4" v-for="pokemon in mons">
      <Pokemoncard :pokemon="pokemon"></Pokemoncard>
    </div>
  </div>
</template>
