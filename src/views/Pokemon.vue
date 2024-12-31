<script setup>

    import { ref, onMounted, defineProps } from 'vue';
    import Pokedata from '../assets/pokedex.json';
    import * as Pokedex from 'pokeapi-js-wrapper';

    const P = new Pokedex.Pokedex()

    const props = defineProps( ['id'] );

    const pokemons = Pokedata.filter(arr => {
        return arr.id == props.id;
    })

    const pokemon = pokemons[0];

    const getImage = ( pokemonId ) => {
        var sprite = String(pokemonId).padStart(3, '0');
        return "../images/" + sprite + ".png";
    }

    const base = [
        ["HP", 255],
        ["Attack", 190],
        ["Defense", 230],
        ["Sp. Attack", 194],
        ["Sp. Defense", 230],
        ["Speed", 180]
    ];

    const getPercent = (max, min) => {
        return (min / max) * 100;
    }

    const fetched       = ref([]);
    const fetched_meta  = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const getEnglishFlavorTexts = ( flavor_texts ) => {
        return flavor_texts.filter( item => {
            return item.language.name === 'en';
        });
    }

    const getEnglishFlavorText = ( flavor_texts ) => {
        var texts = getEnglishFlavorTexts( flavor_texts );
        var text  = texts[0].flavor_text || "";
        return text.replace( '', ' ' );
    }

    onMounted(async () => {
        try {
            const response = await P.getPokemonSpeciesByName( props.id );
            const response_ = await P.getPokemonByName( props.id );
            fetched.value = response;
            fetched_meta.value = response_;
        } catch (err) {
            error.value = `Error fetching data: ${err.message}`;
        } finally {
            loading.value = false;
        }
    });

</script>
<template>
    <div :class="'bg-' + pokemon.type[0].toLowerCase()" class="position-relative mt-3 mt-md-5 rounded overflow-hidden" :key="pokemon.id">
        <p class="mega-text position-absolute start-50 translate-middle-x">{{ pokemon.name.japanese }}</p>
        <section class="pokemon mx-auto position-relative overflow-hidden">
            <img :src="getImage( pokemon.id )" :alt="pokemon.name.english" width="400" height="400" class="pokemon-image mx-auto d-block position-relative" style="z-index: 2;">

            <div class="pokemon-meta bg-light d-block text-body w-100 spacing position-relative">
                <div class="content-tabs px-4 py-5 p-md-5">
                    <h1 class="mb-1">{{ pokemon.name.english }} <code class="h5 fw-bold">{{ pokemon.name.japanese }}</code></h1>
                    <div class="types d-flex flex-wrap mb-2">
                        <template v-for="type_ in pokemon.type">
                            <span class="badge-type me-1 my-1" :class="'bg-' + type_.toLowerCase()">{{ type_ }}</span>
                        </template>
                    </div>
                    <template v-if="loading">
                        <div class="skeleton-line w-100"></div>
                        <div class="skeleton-line w-50"></div>
                        <div class="skeleton-line w-75 mb-4"></div>
                    </template>
                    <template v-else>
                        <p class="mb-4">{{ getEnglishFlavorText( fetched.flavor_text_entries ) }}</p>
                    </template>
                    <div class="row align-items-center align-items-center pb-1" v-for="attr in base">
                        <div class="col col-5 col-md-3 fw-bold opacity-75">{{ attr[0] }}</div>
                        <div class="col col-2 col-md-2 text-md-end d-none d-md-block">
                            {{ pokemon.base[attr[0]] }}
                        </div>
                        <div class="col col-7 col-md-7">
                            <div class="progress w-100 ms-3" role="progressbar">
                                <div class="progress-bar" :class="'bg-' + pokemon.type[0].toLowerCase()" :style="'width:' + getPercent(attr[1], pokemon.base[attr[0]]) +'%'"></div>
                            </div>
                        </div>
                    </div>
                    <template v-if="loading">
                        <div class="skeleton-line mt-4 py-4 w-100 rounded-pill"></div>
                    </template>
                    <template v-else>
                        <figure class="d-block w-100 mt-4">
                            <audio controls :src="fetched_meta.cries.latest" class="w-100"></audio>
                        </figure>
                    </template>
                </div>
            </div>

        </section>
    </div>
</template>