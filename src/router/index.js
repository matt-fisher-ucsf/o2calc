import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeImputation from '@/views/HomeImputation.vue'
import HomeDuration from '@/views/HomeDuration.vue'
import HomeSupply2 from '@/views/HomeSupply2.vue'
import HomeDemand from '@/views/HomeDemand.vue'
import Objective from '@/views/Objective.vue'
import HomeDevice from '@/views/HomeDevice.vue'
import Formulas from '@/views/Formulas.vue'
import HomeImpact from '@/views/HomeImpact.vue'
import HomeCylinder from '@/views/HomeCylinder.vue'
//import Maintenance from '@/views/Maintenance.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: {
      name: "Supply"
    }
  },
  {
    path: '/home',
    redirect: {
      name: "Supply"
    }
  },
  {
    path: '/supply',
    name: 'Supply',
    component: HomeSupply2,
    //component: Maintenance,
  },
  {
    path: '/demand',
    name: 'Demand',
    component: HomeDemand,
    //component: Maintenance,
  },
  {
    path: '/imputation',
    name: 'Imputation',
    component: HomeImputation,
  },
  {
    path: '/duration',
    name: 'Duration',
    component: HomeDuration,
  },
  {
    path: '/impact',
    name: 'Impact',
    component: HomeImpact,
  },
  {
    path: '/objective',
    name: 'Objective',
    component: Objective,
  },
  {
    path: '/device',
    name: 'Device',
    component: HomeDevice,
  },
  {
    path: '/cylinder',
    name: 'Cylinder',
    component: HomeCylinder,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/formulas',
    name: 'Formulas',
    component: Formulas
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/Formulas.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
