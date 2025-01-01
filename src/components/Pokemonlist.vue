<script setup>
    
    import { defineProps } from 'vue';
    import { RouterLink } from 'vue-router';
    
    const props = defineProps(['pokemon']);
    const pokemon = props.pokemon;

    const getSprite = ( pokemonId ) => {
        var sprite = String(pokemonId).padStart(3, '0');
        return "./sprites/" + sprite + "MS.png";
    }

    const getType = ( type ) => {
        var url = String(type).toLowerCase();
        return "./types/" + url + ".svg";
    }

</script>

<template v-if="pokemon">

    <RouterLink :to="'/pokemon/' + pokemon.id " class="poke-list rounded bg-light d-block text-decoration-none rounded text-body">
        <div class="row align-items-center">
            <div class="col col-4 col-md-3 d-flex align-items-center">
                <img :src="getSprite( pokemon.id )" :alt="pokemon.name.english" width="40" height="40" loading="lazy" class="mx-2">
                <p class="list-number fw-bold my-0 opacity-765"><small><span class="d-none d-md-inline">No.</span>{{ String( pokemon.id ).padStart(3, '0') }}</small></p>
            </div>
            <div class="col col-5 col-md-6">
                <p class="my-0">{{ pokemon.name.english }} <code class=""><span class="d-none d-md-inline">&mdash; {{ pokemon.name.japanese }}</span></code> </p>
            </div>
            <div class="col col-3 col-md-3 d-flex flex-wrap">
                <template v-for="type_ in pokemon.type">
                <img :src="getType( type_ )" :alt="type_" width="20" height="20" class="m-1" loading="lazy">
                </template>
            </div>
        </div>
    </RouterLink>

</template>
