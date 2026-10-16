<script setup>
    import { computed, ref } from 'vue';
    import { RouterLink } from 'vue-router';
    import Pokedata from '../assets/pokedex.json';
    import { useCaptured, MAX_CAPTURED } from '../composables/useCaptured';

    const { captured, release } = useCaptured();

    const team = computed(() => captured.value.map(id => Pokedata.find(p => p.id == id)).filter(Boolean));

    const getImage = ( id ) => "../images/" + String(id).padStart(3, '0') + ".png";

    const STORE_KEY = 'team-transforms';
    const load = () => {
        try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; }
    };
    const transforms = ref(load());
    const tf = (id) => transforms.value[id] || { s: 1, r: 0 };
    const style = (id) => ({ transform: `scale(${tf(id).s}) rotate(${tf(id).r}deg)` });
    const save = () => localStorage.setItem(STORE_KEY, JSON.stringify(transforms.value));
    const reset = (id) => { delete transforms.value[id]; save(); };

    // Drag a handle: 'scale' changes size by distance to center, 'rotate' by angle around center.
    const startDrag = (e, id, mode) => {
        const box = e.currentTarget.closest('.hof-box');
        const rect = box.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const start = { ...tf(id) };
        const d0 = Math.hypot(e.clientX - cx, e.clientY - cy) || 1;
        const a0 = Math.atan2(e.clientY - cy, e.clientX - cx);
        const target = e.currentTarget;
        target.setPointerCapture(e.pointerId);
        const move = (ev) => {
            const cur = { ...start };
            if (mode === 'scale') {
                cur.s = Math.min(4, Math.max(0.2, start.s * Math.hypot(ev.clientX - cx, ev.clientY - cy) / d0));
            } else {
                let r = start.r + (Math.atan2(ev.clientY - cy, ev.clientX - cx) - a0) * 180 / Math.PI;
                if (ev.shiftKey) r = Math.round(r / 15) * 15;
                cur.r = r;
            }
            transforms.value = { ...transforms.value, [id]: cur };
        };
        const up = () => {
            target.removeEventListener('pointermove', move);
            target.removeEventListener('pointerup', up);
            target.removeEventListener('pointercancel', up);
            save();
        };
        target.addEventListener('pointermove', move);
        target.addEventListener('pointerup', up);
        target.addEventListener('pointercancel', up);
    };
</script>
<template>
    <div class="mt-3 mt-md-5 pb-4">
        <div class="hof bg-light rounded p-3 p-md-4">
            <p v-if="!team.length" class="hof-empty">No champions yet.<br>Capture up to {{ MAX_CAPTURED }} Pokémon!</p>
            <div class="hof-row">
                <figure v-for="p in team" :key="p.id" class="hof-slot">
                    <div class="hof-box" :style="style( p.id )">
                        <RouterLink :to="{ name: 'pokemon', params: { id: p.id } }" :title="p.name.english">
                            <img :src="getImage( p.id )" :alt="p.name.english" draggable="false">
                        </RouterLink>
                        <span class="hof-handle hof-rotate" title="Rotate (Shift = snap)" @pointerdown.prevent.stop="startDrag( $event, p.id, 'rotate' )"></span>
                        <span class="hof-handle hof-nw" title="Scale" @pointerdown.prevent.stop="startDrag( $event, p.id, 'scale' )"></span>
                        <span class="hof-handle hof-ne" title="Scale" @pointerdown.prevent.stop="startDrag( $event, p.id, 'scale' )"></span>
                        <span class="hof-handle hof-sw" title="Scale" @pointerdown.prevent.stop="startDrag( $event, p.id, 'scale' )"></span>
                        <span class="hof-handle hof-se" title="Scale" @pointerdown.prevent.stop="startDrag( $event, p.id, 'scale' )"></span>
                    </div>
                    <figcaption>
                        <span>{{ p.name.english }}</span>
                        <button type="button" @click="reset( p.id )" aria-label="Reset">&#8634;</button>
                        <button type="button" @click="release( p.id )" aria-label="Release">&times;</button>
                    </figcaption>
                </figure>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .hof {
        font-family: 'Courier New', monospace;
    }
    .hof-row {
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: flex-end;
    }
    .hof-slot {
        flex: 1 1 0;
        min-width: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .hof-slot a {
        display: block;
        width: 100%;
    }
    .hof-box {
        position: relative;
        width: 100%;
        outline: 1px dashed transparent;
        transform-origin: center center;
        touch-action: none;
    }
    .hof-slot { position: relative; z-index: 0; }
    .hof-slot:hover,
    .hof-slot:focus-within { z-index: 10; }
    .hof-box:hover { outline-color: #2d3047; }
    .hof-handle { z-index: 1; }
    .hof-slot img {
        display: block;
        width: 100%;
        height: auto;
        margin: 0 auto;
    }
    .hof-handle {
        position: absolute;
        width: 10px;
        height: 10px;
        background: #fff;
        border: 1px solid #2d3047;
        opacity: 0;
        touch-action: none;
    }
    .hof-box:hover .hof-handle { opacity: 1; }
    .hof-nw { top: -5px; left: -5px; cursor: nwse-resize; }
    .hof-ne { top: -5px; right: -5px; cursor: nesw-resize; }
    .hof-sw { bottom: -5px; left: -5px; cursor: nesw-resize; }
    .hof-se { bottom: -5px; right: -5px; cursor: nwse-resize; }
    .hof-rotate {
        top: -26px;
        left: calc(50% - 5px);
        border-radius: 50%;
        cursor: grab;
    }
    .hof-slot figcaption {
        display: flex;
        gap: .3rem;
        align-items: center;
        font-size: .75rem;
        opacity: 0;
        transition: opacity .2s;
    }
    .hof-slot:hover figcaption,
    .hof-slot:focus-within figcaption { opacity: 1; }
    .hof-slot figcaption button {
        border: 0;
        background: #2d3047;
        color: #fff;
        line-height: 1;
        padding: 0 .35rem;
        border-radius: 2px;
    }
    .hof-empty {
        text-align: center;
        margin: 2rem 0;
        font-weight: bold;
    }
</style>
