<template>
  <div class='p-table-native'>
    <div class='hidden-columns' ref='hiddenColumns'>
      <slot></slot>
    </div>
    <div class='p-table-native-header'>
      <native-table-header></native-table-header>
    </div>
  </div>
</template>

<script>
  import NativeTableHeader from './NativeTableHeader';
  import {TableParamsMixins} from '../mixins/tableParamsMixins';

  export default {
    name: 'PTableNative',
    mixins: [
      TableParamsMixins,
    ],
    components: {
      NativeTableHeader,
    },
    created () {
    },
  };
</script>