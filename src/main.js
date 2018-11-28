// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('swiper/dist/css/swiper.css')
require('font-awesome/css/font-awesome.css')
import Vue from 'vue'
// import red from './red'
// import App from './App'
import router from './router'
import Fastclick from 'fastclick'
import MuseUI from 'muse-ui'
import Toast from 'vue-easy-toast'
import VueScroller from 'vue-scroller'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'muse-ui/dist/muse-ui.css'
import './assets/theme.less'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
