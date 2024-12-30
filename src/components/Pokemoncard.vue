<script setup>
    
    import { defineProps } from 'vue';
    
    const props = defineProps(['pokemon']);
    const pokemon = props.pokemon;

    const getSprite = ( pokemonId ) => {
        var sprite = String(pokemonId).padStart(3, '0');
        return "./sprites/" + sprite + "MS.png";
    }

</script>

<template v-if="pokemon">

    <div class="box">
        <p class="pokemon-number m-0 position-absolute top-50 end-0 p-3 text-black">{{ String( pokemon.id ).padStart(3, '0') }}</p>
        <div class="meta position-absolute w-100 p-4 p-xl-3 bottom-0 start-0">
            <img :src="getSprite( pokemon.id )" :alt="pokemon.name.english" width="40" height="40" loading="lazy">
            <p class="name mb-0">{{ pokemon.name.english }} <br> <code class="text-white opacity-75">{{ pokemon.name.japanese }}</code> </p>
        </div>
    </div>

</template>
