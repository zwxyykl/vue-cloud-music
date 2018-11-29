import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: require('../pages/index'),
      children: [
        {
          path: 'rage',
          component: require('../pages/rage')
        },
        {
          path:'songList',
          component:require('../pages/songlist')
        },
        {
          path:'djRadio',
          component:require('../pages/djRadio')
        },
        {
          path:'rank',
          component:require('../pages/rank')
        }
      ]
    },
    {
      name:'playerDetail',
      path:'/playerDetail/:id',
      component:require('../pages/playerDetail')
    },
    {
      name:'playListDetail',
      path:'/playListDetail/:id',
      component:require('../pages/playListDetail')
    },
    {
      path:'*',
      redirect:'/index/rage'
    }
  ]
})
