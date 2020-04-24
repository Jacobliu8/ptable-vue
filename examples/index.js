import Vue from 'vue';
import App from './App';
import Vuex from 'vuex';

Vue.config.debug = true;
Vue.use(Vuex);
Vue.use(App);

new Vue({
  render: h => h(App),
}).$mount('#app');
