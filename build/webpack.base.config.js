const path = require('path');
const striptags = require('./md-loader/strip-tags');
const md = require('markdown-it')();

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

/**
 * 由于v-pre会导致在加载时直接按内容生成页面.但是我们想要的是直接展示组件效果,通过正则进行替换
 * hljs是highlight.js中的高亮样式类名
 * @param  {[type]} render e.g '<code v-pre class="test"></code>' | '<code></code>'
 * @return {[type]}        e.g '<code class="hljs test></code>'   | '<code class="hljs></code>'
 */
const wrap = function (render) {
  return function () {
    return render.apply(this, arguments)
      .replace('<code v-pre class="', '<code class="hljs')
      .replace('<code>', '<code class="hljs">');
  };
};

/**
* 由于cheerio在转换汉字时会出现转为Unicode的情况,所以我们编写convert方法来保证最终转码正确
* @param  {[String]} str e.g  &#x6210;&#x529F;
* @return {[String]}     e.g  成功
*/
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
                  //验证方法：当我们写::: demo :::这样的语法时才会进入自定义渲染方法
                  return params.trim().match(/^demo\s*(.*)$/);
                },

                render: function (tokens, idx) {
                  var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
                  // nesting === 1表示标签开始
                  if (tokens[idx].nesting === 1) {
                    // 获取正则捕获组中的描述内容,即::: demo xxx中的xxx
                    var description = (m && m.length > 1) ? m[1] : '';
                    // 获得内容
                    var content = tokens[idx + 1].content;
                    // 解析过滤解码生成html字符串
                    var html = convert(striptags.strip(content, [
                      'script',
                      'style',
                    ])).replace(/(<[^>]*)=""(?=.*>)/g, '$1');
                    // 获取script中的内容
                    var script = striptags.fetch(content, 'script');
                    // 获取style中的内容
                    var style = striptags.fetch(content, 'style');
                    // 组合成prop参数,准备传入组件
                    var jsfiddle = {
                      html: html,
                      script: script,
                      style: style,
                    };
                    // 是否有描述需要渲染
                    var descriptionHTML = description
                      ? md.render(description)
                      : '';
                    // 将jsfiddle对象转换为字符串,并将特殊字符转为转义序列
                    jsfiddle = md.utils.escapeHtml(JSON.stringify(jsfiddle));
                    // 起始标签,写入demo-block模板开头,并传入参数（demo-block暂时还没写）
                    // return `<demo-block class='demo-box' :jsfiddle='${jsfiddle}'>
                    //     <div class='source' slot='source'>${html}</div>
                    //     ${descriptionHTML}
                    //     <div class='highlight' slot='highlight'>`;
                    return `<div>${descriptionHTML}`; // 暂时直接显示，没有样式。
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
            // 对于代码块去除v-pre,添加高亮样式
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

