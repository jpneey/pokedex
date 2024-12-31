<script setup>
    import { RouterLink } from 'vue-router';
</script>

<template>
    <ul class="pokedex-nav bg-light p-5 rounded">
        <li>
        <h2 class="mb-0">Poké<s class="opacity-25 fw-normal">dex</s>list.</h2>
        <code class="text-body opacity-25">version 1.0.0</code>
        </li>
        <li>
        <RouterLink class="text-decoration-none text-body" to="/">Kanto</RouterLink>
        </li>
        <li>
        <RouterLink class="text-decoration-none text-body" to="/jhoto">Jhoto</RouterLink>
        </li>
        <li>
        <RouterLink class="text-decoration-none text-body" to="/hoenn">Hoenn</RouterLink>
        </li>
        <li>
        <RouterLink class="text-decoration-none text-body" to="/sinnoh">Sinnoh</RouterLink>
        </li>
        <li>
        <RouterLink class="text-decoration-none text-body" to="/unova">Unova</RouterLink>
        </li>
        <li>
        <RouterLink class="text-decoration-none text-body" to="/kalos">Kalos</RouterLink>
        </li>
        <li>
        <RouterLink class="text-decoration-none text-body" to="/galar">Galar</RouterLink>
        </li>
        <li class="border-top">
        <RouterLink class="text-decoration-none text-body" to="/all">Search</RouterLink>
        </li>
    </ul>
</template>