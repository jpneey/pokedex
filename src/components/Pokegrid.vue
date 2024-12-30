<script setup>

    import { defineProps } from 'vue';
    import Pokemoncard from '@/components/pokemoncard.vue';

    const props = defineProps(['mons']);
    const mons = props.mons;

</script>
<template>
  <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5 spacing">
    <div class="col mb-4" v-for="pokemon in mons">
      <Pokemoncard :pokemon="pokemon"></Pokemoncard>
    </div>
  </div>
</template>
