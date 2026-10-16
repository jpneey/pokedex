<script setup>

    import { ref, computed, watch, defineProps } from 'vue';
    import Pokemoncard from '@/components/Pokemoncard.vue';
    import Pokedata from '../assets/pokedex.json';
    import * as Pokedex from 'pokeapi-js-wrapper';

    import { useCaptured, MAX_CAPTURED } from '../composables/useCaptured';

    const P = new Pokedex.Pokedex()
    const { captured, isCaptured, isFull, capture, release } = useCaptured();

    const props = defineProps( ['id'] );

    const index = computed(() => Pokedata.findIndex(arr => arr.id == props.id));
    const pokemon = computed(() => Pokedata[index.value]);
    const prev = computed(() => Pokedata[index.value - 1]);
    const next = computed(() => Pokedata[index.value + 1]);

    import { getImage, onImageError } from '@/utils/image';

    const getType = ( type ) => {
        var url = String(type).toLowerCase();
        return "../types/" + url + ".svg";
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

    const gallery = computed(() => {
        const s = fetched_meta.value?.sprites;
        if (!s) return [];
        const o = s.other || {};
        const items = [
            ['Official artwork', o['official-artwork']?.front_default],
            ['Official artwork (shiny)', o['official-artwork']?.front_shiny],
            ['Home', o.home?.front_default],
            ['Home (shiny)', o.home?.front_shiny],
            ['Home (female)', o.home?.front_female],
            ['Home (shiny female)', o.home?.front_shiny_female],
            ['Dream world', o.dream_world?.front_default],
            ['Showdown', o.showdown?.front_default],
            ['Showdown (shiny)', o.showdown?.front_shiny],
            ['Showdown (back)', o.showdown?.back_default],
            ['Showdown (back shiny)', o.showdown?.back_shiny],
            ['Sprite', s.front_default],
            ['Sprite (shiny)', s.front_shiny],
        ];
        return items.filter(([, src]) => src).map(([label, src]) => ({ label, src }));
    });

    watch(() => props.id, async ( id ) => {
        loading.value = true;
        try {
            const response = await P.getPokemonSpeciesByName( id );
            const response_ = await P.getPokemonByName( id );
            if ( id !== props.id ) return;
            fetched.value = response;
            fetched_meta.value = response_;
        } catch (err) {
            error.value = `Error fetching data: ${err.message}`;
        } finally {
            if ( id === props.id ) loading.value = false;
        }
    }, { immediate: true });

</script>
<template>
    <div :class="'bg-' + pokemon.type[0].toLowerCase()" class="position-relative mt-3 mt-md-5 rounded overflow-hidden" :key="pokemon.id">
        <p class="mega-text position-absolute start-50 translate-middle-x">{{ pokemon.name.japanese }}</p>
        <section class="pokemon mx-auto position-relative overflow-hidden">
            <img :src="getImage( pokemon.id )" @error="onImageError( $event, pokemon.id )" :alt="pokemon.name.english" width="400" height="400" class="pokemon-image mx-auto d-block position-relative" style="z-index: 2;">

            <div class="pokemon-meta bg-light d-block text-body w-100 spacing position-relative">
                <div class="content-tabs px-4 py-5 p-md-5">
                    <h1 class="mb-1">
                        <code class="h5 d-block my-0 opacity-50 text-body">{{ String( pokemon.id ).padStart(3, '0') }}</code>
                        {{ pokemon.name.english }}
                        <code class="h5 fw-bold">{{ pokemon.name.japanese }}</code>
                    </h1>
                    <div class="types d-flex flex-wrap mb-2">
                        <template v-for="type_ in pokemon.type">
                            <span class="badge-type has-icon me-1 my-1" :class="'bg-' + type_.toLowerCase()">
                                <img :src="getType( type_ )" :alt="type_" width="20" height="20" loading="lazy">
                                {{ type_ }}
                            </span>
                        </template>
                        
                    </div>
                    <!-- <div class="mb-3">
                        <button v-if="isCaptured( pokemon.id )" class="btn btn-sm btn-outline-dark" @click="release( pokemon.id )">Release</button>
                        <button v-else class="btn btn-sm btn-dark" :disabled="isFull" @click="capture( pokemon.id )">Capture</button>
                        <small class="ms-2 opacity-75">{{ captured.length }}/{{ MAX_CAPTURED }} captured<template v-if="isFull && !isCaptured( pokemon.id )"> (team full)</template></small>
                    </div> -->
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
                        <div v-if="gallery.length" class="mt-4">
                            <h2 class="h5 mb-3">Gallery</h2>
                            <div class="row row-cols-2 row-cols-md-3 g-2">
                                <figure v-for="img in gallery" :key="img.src" class="col m-0 text-center">
                                    <div class="bg-white rounded p-2 h-100 d-flex flex-column justify-content-between">
                                        <img :src="img.src" :alt="pokemon.name.english + ' - ' + img.label" loading="lazy" class="d-block mx-auto mw-100" style="height: 120px; object-fit: contain;">
                                        <figcaption class="small opacity-75 mt-1">{{ img.label }}</figcaption>
                                    </div>
                                </figure>
                            </div>
                        </div>
                    </template>
                </div>
            </div>

        </section>
    </div>
    
    <div class="prev-next row g-3 py-3 flex-wrap">
        <div v-if="prev" class="col col-12 col-xl-6 mt-3">
            <Pokemoncard :pokemon="prev" />
        </div>
        <div v-if="next" class="col col-12 col-xl-6 mt-3 next">
            <Pokemoncard :pokemon="next" />
        </div>
    </div>
</template>