import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import LotView from '@/components/LotView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
    	path: '/:lot_id',
    	name: 'LotView',
    	component: LotView
    }
  ]
})
