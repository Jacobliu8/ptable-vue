import Vue from 'vue';
import PTable from '../src/components/table/Table';
import {NATIVE_TABLE_TYPE} from '../src/constant/table/constant';

Vue.config.debug = true;

new Vue({
  render: h => h(PTable, {props: {type: NATIVE_TABLE_TYPE}}),
}).$mount('#app');
