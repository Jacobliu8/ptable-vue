import Vue from 'vue';
import App from './App';
import Vuex from 'vuex';
import PTable from '../src/index';
import DemoBlock from './components/demoBlock';

Vue.config.debug = true;
Vue.use(Vuex);
Vue.use(App);
Vue.use(PTable);
Vue.component('DemoBlock', DemoBlock);

new Vue({
  render: h => h(App),
}).$mount('#app');
