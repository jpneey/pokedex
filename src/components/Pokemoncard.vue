<script setup>
    
    import { defineProps } from 'vue';
    import { RouterLink } from 'vue-router';
    
    const props = defineProps(['pokemon']);
    const pokemon = props.pokemon;

    const getSprite = ( pokemonId ) => {
        var sprite = String(pokemonId).padStart(3, '0');
        return "./thumbnails/" + sprite + ".png";
    }

</script>

<template v-if="pokemon">

    <RouterLink :to="'/pokemon/' + pokemon.id " class="box text-decoration-none rounded text-body" :class="'bg-' + pokemon.type[0].toLowerCase()">
        <p class="pokemon-number m-0 position-absolute top-50 end-0 p-3">{{ String( pokemon.id ).padStart(3, '0') }}</p>
        <div class="meta position-absolute w-100 p-4 bottom-0 start-0">
            <img :src="getSprite( pokemon.id )" :alt="pokemon.name.english" width="100" height="100" loading="lazy" class="position-absolute bottom-0 end-0 m-4">
            <p class="name mb-0 text-white fw-bold h4">{{ pokemon.name.english }} <code class="opacity-75 h6 text-black d-block mt-2 mt-md-0 d-md-inline"><span class="d-none d-md-inline">&mdash;</span> {{ pokemon.name.japanese }}</code> </p>
            <div class="types d-flex flex-wrap mt-1 mb-2">
                <template v-for="type_ in pokemon.type">
                    <span class="border border-dark badge-type me-1 my-1" :class="'bg-' + type_.toLowerCase()">{{ type_ }}</span>
                </template>
            </div>
        </div>
    </RouterLink>

</template>
