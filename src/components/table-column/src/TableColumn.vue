<template>
  <div class='p-table-column-root'>
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
  import PTableNativeColumn from '../../table/src/nativeTable/NativeTableColumn';
  import {
    DIV_TABLE_TYPE,
    NATIVE_TABLE_TYPE,
  } from '../../../constant/table/constant';
  import {TableColumnParamsMixins} from '../../table/src/mixins/tableColumnParamsMixins';

  export default {
    name: 'PTableColumn',
    mixins: [
      TableColumnParamsMixins,
    ],
    components: {
      PTableNativeColumn,
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
        return PTableNativeColumn.name;
      },
    },
  };
</script>