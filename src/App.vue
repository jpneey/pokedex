<script setup>

  import Regions from './components/Regions.vue';
  import { ref } from 'vue';

  const openMenu = ref( false );

  const toggleMenu = () => {
    return openMenu.value = ! openMenu.value;
  }

</script>

<template>

  <main class="h-100">
    <div class="container h-100">
      <div class="row h-100">
        <div class="col col-12 col-md-5 col-xxl-3 h-auto">
          <nav class="h-100  border-end spacing d-none d-md-block">
            <div class="position-fixed top-50 translate-middle-y">
              <Regions></Regions>
            </div>
          </nav>
          <nav class="d-block d-md-none">
            <div class="d-flex align-items-center justify-content-between bg-light rounded mt-3 p-4">
              <RouterLink to="/" class="text-black text-decoration-none">
                <h2 class="mb-0">Poké<s class="opacity-25 fw-normal">dex</s>list.</h2>
                <code class="text-body opacity-25">version 1.0.0</code>
              </RouterLink>
              <img src="@/assets/menu.svg"  @click="toggleMenu" alt="menu" width="40" height="40">
            </div>
            <div :class=" openMenu ? 'open' : '' " class="position-fixed top-50 start-50 translate-middle mobile-menu rounded w-100 h-100 d-flex align-items-center display-flex">
              <Regions @click="toggleMenu"></Regions>
              <img src="@/assets/close.svg"  @click="toggleMenu" alt="menu" width="40" height="40" class="opacity-75 position-absolute top-0 end-0 m-3">
            </div>
          </nav>
        </div>
        <div class="col col-12 col-md-7 col-xxl-8 offset-xxl-1 ">
          <router-view v-slot="{ Component, route }">
            <Transition name="page-opacity" mode="out-in">
              <div :key="route.name">  
                <component :is="Component"></component>
              </div>
            </Transition>
          </router-view>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
  .page-opacity-enter-active,
  .page-opacity-leave-active {
    transition: all 0.3s ease;
    opacity: 1;
    transform: translateY(0px);
  }

  .page-opacity-enter-from {
    opacity: 0;
    transform: translateY(15px);
  }
  .page-opacity-leave-to {
    opacity: 0;
    transform: translateY(-15px);
  }
</style>