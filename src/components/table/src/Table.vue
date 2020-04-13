<template>
  <div class='p-table-root'>
    <component v-bind:is='getSpecificComponent()'
               :height='height'
               :rowKey='rowKey'
               :border='border'
               :empty-text='emptyText'
               :show-Header='showHeader'
               :data='data'>
    </component>
  </div>
</template>

<script>
  import PTableNative from './nativeTable/NativeTable';
  import PTableDiv from './divTable/PTableDiv';
  import {
    DIV_TABLE_TYPE,
    NATIVE_TABLE_TYPE,
  } from '../../../constant/table/constant';
  import {TableParamsMixins} from './mixins/tableParamsMixins';

  export default {
    name: 'PTable',
    mixins: [
      TableParamsMixins,
    ],
    components: {
      PTableNative,
      PTableDiv,
    },
    data: function () {
      return {
        NATIVE_TABLE_TYPE: NATIVE_TABLE_TYPE,
        DIV_TABLE_TYPE: DIV_TABLE_TYPE,
      };
    },
    props: {
      type: String,
    },
    methods: {
      getSpecificComponent: function () {
        return this.type === this.NATIVE_TABLE_TYPE ? PTableNative.name : PTableDiv.name;
      },
    },
  };
</script>

<style scoped>

</style>