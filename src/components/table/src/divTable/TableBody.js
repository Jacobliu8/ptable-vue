export default {
  name: 'TableBody',

  mixins: [],

  render (h) {
    const bodyCols = [];
    const body = [];
    for (let index = 0; index < this.columns.length; index++) {
      bodyCols.push(h('div', {
        display: 'table-column',
        width: '100px',
      }));
    }
    for (const item of this.data) {
      const row = [];
      for (const column of this.columns) {
        row.push(column.renderCell(h, item));
      }
      body.push(h('div', {
        style: 'table-row-group',
      }, row));
    }
    return h('div', {
      style: {
        display: 'table',
      },
    }, [
      h('div', {
        style: {
          display: 'table-column-group',
        },
      }, bodyCols),
      h('div', {
        style: {
          display: 'table-row-group',
        },
      }, body),
    ]);
  },

  props: {
    store: {
      required: true,
    },
  },

  computed: {
    table () {
      return this.$parent;
    },
    columns: function () {
      return this.store.state.columns;
    },
    data: function () {
      return this.store.state.data;
    },
  },

  methods: {},
};
