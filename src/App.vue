<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

  <main class="h-100">
    <div class="container h-100">
      <div class="row h-100">
        <div class="col col-12 col-md-4 col-xxl-3 h-auto">
          <nav class="h-100  border-end spacing">
            <ul class="pokedex-nav position-fixed top-50 translate-middle-y">
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
              <li>
                <hr>
              </li>
              <li>
                <RouterLink class="text-decoration-none text-body" to="/all">Search</RouterLink>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col col-12 col-md-8 col-xxl-8 offset-xxl-1 ">
          <RouterView />
        </div>
      </div>
    </div>
  </main>
</template>