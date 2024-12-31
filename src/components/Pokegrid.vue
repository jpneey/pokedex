<script setup>
  import Pokemoncard from '@/components/Pokemoncard.vue';
  import PokeTypes from '@/assets/types.json';
  import { defineProps, ref, computed, watch } from 'vue';
  import { RouterLink, useRoute, useRouter } from 'vue-router';

  const route = useRoute();
  const router = useRouter();
  const props = defineProps(['mons']);
  const mons = ref(props.mons);
  const s = ref(route.query.s || ''); // search query
  const t = ref(route.query.t ? route.query.t.split(',') : []); // type query as an array

  // Watch the `s` and `t` values and update the query parameters in the URL
  watch([s, t], () => {
    const query = {};
    if (s.value) query.s = s.value;
    if (t.value.length > 0) query.t = t.value.join(','); // Store types as comma-separated values
    router.push({ name: route.name, query });
  });

  // Method to toggle the type filter
  const toggleType = (type) => {
    if (t.value.includes(type)) {
      t.value = t.value.filter(item => item !== type); // Remove the type if it's already selected
    } else {
      t.value.push(type); // Add the type if it's not selected
    }
  };

  // Computed property to filter the list of mons based on the search query and selected types
  const filteredMons = computed(() => {
    let filtered = mons.value;

    // If there are selected types, filter by those types
    if (t.value.length > 0) {
      filtered = filtered.filter(pokemon => 
        t.value.every(type => pokemon.type.includes(type)) // Match any of the selected types
      );
    }

    // If search query is not empty, filter by name
    if (s.value.trim() !== '') {
      filtered = filtered.filter(pokemon => 
        pokemon.name.english.toLowerCase().includes(s.value.toLowerCase())
      );
    }

    return filtered;
  });

  // Reset function to clear search and type filters
  const resetFilters = () => {
    s.value = '';
    t.value = [];
    router.push({ name: route.name, query: {} }); // Clear query parameters in URL
  };

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

      <div class="position-relative p-3 bg-light mt-4 rounded">
        <template v-for="poketype in PokeTypes" :key="poketype.english">
          <span 
            @click="toggleType(poketype.english)" 
            class="btn btn-sm badge-type m-1 d-inline-block text-decoration-none" 
            :class="'bg-' + poketype.english.toLowerCase()"
            :style="t.includes(poketype.english) ? 'opacity: 0.2;' : ''">
            {{ poketype.english }}
          </span>
        </template>
        
        <span @click="resetFilters" class="btn btn-sm btn-white border border-dark badge-type m-1 d-inline-block text-decoration-none" v-if="t.length">
          Reset Filters
        </span>

        <!-- Reset Button -->
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
        <span>Can't find what you wanted? Try searching all region</span>
        <RouterLink :to="'/all?s=' + s" class="btn btn-sm bg-ice ms-2 my-0 text-white">
          Search all region
        </RouterLink>
      </div>
    </div>
  </div>
</template>
