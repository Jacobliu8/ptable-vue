const path = require('path');
const striptags = require('./md-loader/strip-tags');
const md = require('markdown-it')();

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

const wrap = function (render) {
  return function () {
    return render.apply(this, arguments)
      .replace('<code v-pre class="', '<code class="hljs')
      .replace('<code>', '<code class="hljs">');
  };
};

function convert (str) {
  str = str.replace(/(&#x)(\w{4});/gi, function ($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16));
  });
  return str;
}

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [
          resolve('src'),
          resolve('examples'),
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
            less: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
          },
          postLoaders: {
            html: 'babel-loader?sourceMap',
          },
          sourceMap: true,
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('examples'),
        ],
        exclude: resolve('node_modules'),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
      },
      {
        test: /\.(html|tpl)$/,
        loader: 'html-loader',
      },
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader',
        options: {
          use: [
            [
              require('markdown-it-container'),
              'demo',
              {
                validate: function (params) {
                  return params.trim().match(/^demo\s*(.*)$/);
                },

                render: function (tokens, idx) {
                  var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
                  if (tokens[idx].nesting === 1) {
                    var description = (m && m.length > 1) ? m[1] : '';
                    var content = tokens[idx + 1].content;
                    var html = convert(striptags.strip(content, [
                      'script',
                      'style',
                    ])).replace(/(<[^>]*)=""(?=.*>)/g, '$1');
                    var script = striptags.fetch(content, 'script');
                    var style = striptags.fetch(content, 'style');
                    var jsfiddle = {
                      html: html,
                      script: script,
                      style: style,
                    };
                    var descriptionHTML = description
                      ? md.render(description)
                      : '';

                    jsfiddle = md.utils.escapeHtml(JSON.stringify(jsfiddle));

                    // return `<demo-block class='demo-box' :jsfiddle='${jsfiddle}'>
                    //     <div class='source' slot='source'>${html}</div>
                    //     ${descriptionHTML}
                    //     <div class='highlight' slot='highlight'>`;
                    return `<div>${descriptionHTML}`;
                  }
                  // return '</div></demo-block>\n';
                  return '</div>\n';
                },
              },
            ],
            [
              require('markdown-it-container'),
              'tip',
            ],
            [
              require('markdown-it-container'),
              'warning',
            ],
          ],
          preprocess: function (MarkdownIt, source) {
            MarkdownIt.renderer.rules.table_open = function () {
              return `<table class='table'>`;
            };
            MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence);
            return source;
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [
      '.js',
      '.vue',
      '.json',
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
    symlinks: false,
  },
  node: {
    console: false,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};

