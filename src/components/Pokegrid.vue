<script setup>
  import { defineProps, ref, computed } from 'vue';
  import Pokemoncard from '@/components/Pokemoncard.vue';
  import { RouterLink, useRoute  } from 'vue-router';

  const route = useRoute();
  const props = defineProps(['mons']);
  const mons = ref(props.mons);
  const s = ref( route.query.s || '' ); // search query

  // Computed property to filter the list of mons based on the search query
  const filteredMons = computed(() => {
    if (s.value.trim() === '') {
      return mons.value; // If search query is empty, return all mons
    }
    return mons.value.filter(pokemon => 
      pokemon.name.english.toLowerCase().includes(s.value.toLowerCase()) // Assuming you want to filter by name
    );
  });

</script>

<template>
  <div class="row spacing">
    <div class="col col-12 mb-4" v-if="route.name == 'all'">
      <div class="position-relative">
        <input
          type="text"
          class="form-control bg-light border-0 w-100 ps-3"
          v-model="s"
          placeholder="Find what you need"
        />
        <RouterLink :to="'/all?s=' + s" class="btn btn-dark position-absolute top-50 end-0 translate-middle-y">
          Search all
        </RouterLink>
      </div>
    </div>
  </div>

  <!-- Display filtered list of Pokémon -->
  <div class="row row-cols-1 row-cols-lg-2">
    <div class="col mb-4" v-for="pokemon in filteredMons" :key="pokemon.id">
      <Pokemoncard :pokemon="pokemon" />
    </div>
  </div>
  <div class="row" v-if="s && route.name !== 'all'">
    <div class="col col-12">
      <div class="p-3 px-4 rounded mb-4 bg-light d-block d-lg-flex justify-content-between align-items-center">
        <span class="">Can't find what you wanted? Try searching all region</span>
        <RouterLink :to="'/all?s=' + s" class="btn btn-sm bg-ice ms-2 my-0 text-white">
          Search all region
        </RouterLink>
      </div>
    </div>
  </div>
</template>
