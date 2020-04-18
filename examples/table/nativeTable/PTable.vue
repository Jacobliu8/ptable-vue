<template>
  <p-table type='NATIVE_TABLE' :data='tableData'>
    <p-table-column type='NATIVE_TABLE' title='Date' prop='date'></p-table-column>
    <p-table-column type='NATIVE_TABLE' title='Name' prop='name'></p-table-column>
    <p-table-column type='NATIVE_TABLE' title='Address' prop='address'></p-table-column>
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
            name: '夫兰茜',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-04',
            name: '刘宏博',
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