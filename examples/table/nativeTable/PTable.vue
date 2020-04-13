<template>
  <p-table type='NATIVE_TABLE' :data='tableData'>
    <p-table-column title='Date' key='date'></p-table-column>
    <p-table-column title='Name' key='name'></p-table-column>
    <p-table-column title='Address' key='address'></p-table-column>
  </p-table>
</template>

<script>
  export default {
    name: 'App',
    data: function () {
      return {
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
          },
        ],
      };
    },
  };
</script>

<style scoped>

</style>