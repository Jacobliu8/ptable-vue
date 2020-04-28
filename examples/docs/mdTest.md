### 基本用法

:::demo This is `base table`
```html
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
​```

:::

### 多级表头

数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。

:::demo 只需要在 p-table-column 里面嵌套 p-table-column，就可以实现多级表头。
```html
<template>
  <p-table
    type='NATIVE_TABLE' 
    :data="tableData">
    <p-table-column
      prop="date"
      title="日期"
      width="150">
    </p-table-column>
    <p-table-column title="配送信息">
      <p-table-column
        prop="name"
        title="姓名"
        width="120">
      </p-table-column>
      <p-table-column title="地址">
        <p-table-column
          prop="province"
          title="省份"
          width="120">
        </p-table-column>
        <p-table-column
          prop="city"
          title="市区"
          width="120">
        </p-table-column>
        <p-table-column
          prop="address"
          title="地址"
          width="300">
        </p-table-column>
        <p-table-column
          prop="zip"
          title="邮编"
          width="120">
        </p-table-column>
      </p-table-column>
    </p-table-column>
  </p-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    }
  }
</script>
```

:::