import Vue from 'vue';
import Table from '../src/components/table/Table';

Vue.config.debug = true;

new Vue({
  render: h => h(Table),
}).$mount('#app');
