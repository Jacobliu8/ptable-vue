<template>
  <div>p table div</div>
</template>

<script>
  let tableIdSeed = 1;

  export default {
    name: 'PTableDiv',

    component: {},

    props: {},

    data () {
      return {
        tableId: '',
      };
    },

    create () {
      this.tableId = 'div-table_' + tableIdSeed++;
    },
  };
</script>

<style scoped>

</style>