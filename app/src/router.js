import Vue from 'vue'
import Router from 'vue-router'
import rank from './components/rank/rank.vue'
import search from './components/search/search.vue'
import singer from './components/singer/singer.vue'
import recommend from './components/recommend/recommend.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: 'recommend'
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend
    }
  ]
})
