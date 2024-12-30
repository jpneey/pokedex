<script setup>
    
    import { defineProps } from 'vue';
    
    const props = defineProps(['pokemon']);
    const pokemon = props.pokemon;

    const getSprite = ( pokemonId ) => {
        var sprite = String(pokemonId).padStart(3, '0');
        return "./sprites/" + sprite + ".png";
    }

</script>

<template v-if="pokemon">

    <div class="box border">
        <p class="h2 m-0 position-absolute top-0 start-0 p-3 text-danger opacity-25">{{ pokemon.id }}</p>
        <div class="meta position-absolute w-100 p-4 p-xl-3 bottom-0 start-0">
            <img :src="getSprite( pokemon.id )" alt="">
            <p class="name mb-0">{{ pokemon.name.english }} <br> <code>{{ pokemon.name.japanese }}</code> </p>
        </div>
    </div>

</template>
