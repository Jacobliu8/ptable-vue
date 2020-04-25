<template>
  <component v-bind:is='getSpecificComponent()'
             :tableId='tableId'
             :height='height'
             :rowKey='rowKey'
             :border='border'
             :empty-text='emptyText'
             :show-Header='showHeader'
             :store='store'
             :data='data'>
    <slot></slot>
  </component>
</template>

<script>
  import PTableNative from './nativeTable/NativeTable';
  import PTableDiv from './divTable/PTableDiv';
  import {
    DIV_TABLE_TYPE,
    NATIVE_TABLE_TYPE,
  } from '../../../constant/table/constant';
  import {TableParamsMixins} from './mixins/tableParamsMixins';
  import {
    createStore,
    SET_DATA,
  } from './store/columnStore';
  import {getComponentId} from '../../../utils/IdentifyUtils';

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
        store: null,
        tableId: null,
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
    created () {
      this.tableId = getComponentId(this.getSpecificComponent());
      this.store = createStore();
      this.store.commit(SET_DATA, this.data);
    },
  };
</script>

<style scoped>

</style>