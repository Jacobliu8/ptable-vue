import Vue from 'vue';
import App from './App';
import Vuex from 'vuex';
import PTable from '../src/index';

Vue.config.debug = true;
Vue.use(Vuex);
Vue.use(App);
Vue.use(PTable);

new Vue({
  render: h => h(App),
}).$mount('#app');
