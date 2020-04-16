import Vue from 'vue';
import PTable from '../src/index';
import App from './table/nativeTable/PTable';
import Vuex from 'vuex';

Vue.config.debug = true;
Vue.use(Vuex);
Vue.use(PTable);

new Vue({
  render: h => h(App),
}).$mount('#app');
