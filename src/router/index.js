import { createRouter, createWebHistory } from 'vue-router'
import Kanto from '../views/Kanto.vue'
import Jhoto from '../views/Jhoto.vue'
import Hoenn from '../views/Hoenn.vue'
import Sinnoh from '../views/Sinnoh.vue'
import Unova from '../views/Unova.vue'
import Kalos from '../views/Kalos.vue'
import Galar from '../views/Galar.vue'
import Pokemon from '../views/Pokemon.vue'
import All from '../views/All.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'kanto',
      component: Kanto,
    },
    {
      path: '/jhoto',
      name: 'jhoto',
      component: Jhoto,
    },
    {
      path: '/hoenn',
      name: 'hoenn',
      component: Hoenn,
    },
    {
      path: '/sinnoh',
      name: 'sinnoh',
      component: Sinnoh,
    },
    {
      path: '/unova',
      name: 'unova',
      component: Unova,
    },
    {
      path: '/kalos',
      name: 'kalos',
      component: Kalos,
    },
    {
      path: '/galar',
      name: 'galar',
      component: Galar,
    },
    {
      path: '/pokemon/:id',
      name: 'pokemon',
      component: Pokemon,
      props: true
    },
    {
      path: '/all',
      name: 'all',
      component: All,
      props: true
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: 'instant' }
  }
})

export default router
