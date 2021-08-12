import Vue from 'vue'
import App from './App.vue'

import './plugin';

new Vue({
  el: '#app',
  render: h => h(App)
})
