<template>
  <div>
    <slot></slot>
    <table-body :store='store'></table-body>
    <table-header :store='store'></table-header>
  </div>
</template>

<script>
  import {createStore} from '../../../store/columnStore';
  import _ from 'lodash';
  import TableBody from './TableBody';
  import TableHeader from './TableFooter';

  let tableIdSeed = 1;

  export default {
    name: 'PTableDiv',
    components: {
      TableHeader,
      TableBody,
    },
    component: {
      TableBody,
      TableHeader,
    },

    props: {
      data: {
        type: Array,
        default () {
          return [];
        },
      },
    },

    data () {
      return {
        tableId: '',
        store: createStore(),
      };
    },

    watch: {
      data: {
        hander: function (newVal) {
          if (!_.isEmpty(newVal)) {
            this.store.commit('setData', newVal);
          }
        },
        immediate: true,
      },
    },

    create () {
      this.tableId = 'div-table_' + tableIdSeed++;
    },
  };
</script>

<style scoped>

</style>