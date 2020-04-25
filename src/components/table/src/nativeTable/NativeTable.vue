<template>
  <div class='p-table-native'>
    <div class='hidden-columns' ref='hiddenColumns'>
      <slot></slot>
    </div>
    <div class='ptable-header-content'>
      <native-table-header :store='store'></native-table-header>
    </div>
    <div class='ptable-body-content'>
      <native-table-body :store='store'></native-table-body>
    </div>
  </div>
</template>

<script>
  import NativeTableHeader from './NativeTableHeader';
  import NativeTableBody from './NativeTableBody';
  import {TableParamsMixins} from '../mixins/tableParamsMixins';

  export default {
    name: 'PTableNative',
    mixins: [
      TableParamsMixins,
    ],
    props: {
      store: Object,
    },
    components: {
      NativeTableHeader,
      NativeTableBody,
    },
    data: function () {
      return {
        test: 123,
      };
    },
  };
</script>