import Vue from 'vue';
import PTable from '../src/index';
import App from './table/nativeTable/PTable';

Vue.config.debug = true;
Vue.use(PTable);

new Vue({
  render: h => h(App),
}).$mount('#app');
