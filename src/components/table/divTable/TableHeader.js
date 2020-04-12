import Cell from './Cell.js';
import _ from 'lodash';

export default {
  name: 'TableHeader',

  component: {Cell},

  mixins: [],

  render (h) {
    return (<div style='display:table-header-group'>
        {
          _.map(this.columns, column => {
            const renderHeader = column.renderHeader
              ? column.renderHeader
              : (
                <cell
                  content={column.title}
                  align={column.align}
                  className={column.className}
                  width={column.width}
                  min-width={column.minWidth}
                  ellipsis={column.ellipsis}
                />
              );
            return (
              <div style='display:table-cell'>
                {renderHeader}
              </div>
            );
          })
        }
      </div>
    );
  },

  props: {
    columns: {
      type: Array,
      default () {
        return [];
      },
    },
  },

  computed: {},

  methods: {},
};
