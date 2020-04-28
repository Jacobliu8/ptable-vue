const container = require('markdown-it-container');

module.exports = md => {
  md
    .use(container, 'v-pre', {
      validate: function (params) {
        return params.trim().match(/^demo\s*(.*)$/);
      },

      render: function (tokens, idx) {
        var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
        // nesting === 1表示标签开始
        if (tokens[idx].nesting === 1) {
          const description = m && m.length > 1 ? m[1] : '';
          const content = tokens[idx + 1].content;
          return `<demo-block>
        ${description ? `<div>${md.render(description)}</div>` : ''}
        <!--md-demo: ${content}:md-demo-->
        `;
        }
        return '</demo-block>';
      },
    })
    .use(container, 'tip')
    .use(container, 'warning');
};
