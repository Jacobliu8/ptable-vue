<template>
  <div>
    <slot name='columns'></slot>
    <table-body :store='store'></table-body>
    <table-header :store='store'></table-header>
  </div>
</template>

<script>
  import {createStore} from '../store/columnStore';
  import _ from 'lodash';
  import TableBody from './TableBody';
  import TableHeader from './TableHeader';

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
        handler: function (newVal) {
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