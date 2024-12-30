<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

  <main class="h-100">
    <div class="container h-100">
      <div class="row h-100">
        <div class="col col-12 col-md-4 col-xxl-3 h-auto">
          <nav class="h-100 border-end spacing">
            <ul>
              <li>
                <RouterLink to="/">Kanto</RouterLink>
              </li>
              <li>
                <RouterLink to="/jhoto">Jhoto</RouterLink>
              </li>
              <li>
                <RouterLink to="/hoenn">Hoenn</RouterLink>
              </li>
              <li>
                <RouterLink to="/sinnoh">Sinnoh</RouterLink>
              </li>
              <li>
                <RouterLink to="/unova">Unova</RouterLink>
              </li>
              <li>
                <RouterLink to="/kalos">Kalos</RouterLink>
              </li>
              <li>
                <RouterLink to="/galar">Galar</RouterLink>
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