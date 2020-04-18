<template>
  <div class='p-table-column-root'>
    <component v-bind:is='getSpecificComponent()'
               :title='title'
               :prop='prop'
               :align='align'
               :headerAlign='headerAlign'
               :store='store'
               :width='width'
               :ellipsis='ellipsis'>
    </component>
  </div>
</template>

<script>
  import PTableNativeColumn from '../../table/src/nativeTable/NativeTableColumn';
  import PTableDivColumn from './DivTableColumn';
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
      PTableDivColumn,
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
        return this.type === this.NATIVE_TABLE_TYPE ? PTableNativeColumn.name : PTableDivColumn.name;
      },
    },
  };
</script>