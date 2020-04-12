import {DEFAULT_CELL_MIN_WIDTH} from './util/constants';
import _ from 'lodash';

export default {
  name: 'Cell',

  mixins: [],

  props: {
    content: String,
    align: String,
    className: String,
    width: Number,
    minWidth: Number,
    ellipsis: Boolean,
    render: Function,
  },

  render (h) {
    if (this.render) {
      return this.render;
    }
    let cellStyle = {
      minWidth: this.minWidth || DEFAULT_CELL_MIN_WIDTH,
      textAlign: this.align || 'left',
      display: 'table-cell',
    };
    if (this.ellipsis) {
      cellStyle = _.assign(cellStyle, {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      });
    }
    if (!_.isNil(this.width)) {
      cellStyle.width = this.width;
    }
    return (
      < div;
  class
    = {
      this
      .className,
    };
    style = {cellStyle} > content < /div>;
  )
    ;
  },

  computed: {},

  methods: {},

};
