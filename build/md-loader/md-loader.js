const hljs = require('highlight.js');

const anchor = require('markdown-it-anchor');

const containers = require('./md-containers');

const striptags = require('./strip-tags');

const md = require('markdown-it')({
  html: true,
  // 代码高亮
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class='hljs'><code>${hljs.highlight(lang, str, true).value}</code></pre>`;
      }
      catch (__) {
        return '';
      }
    }
    return `<pre v-pre class='hljs'><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
})
  .use(anchor, {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '#',
  })
  // 定义自定义的块容器
  .use(containers);

const genInlineComponent = (template, script) => {
  script = script.trim();
  if (script) {
    script = script.replace(/export\s+default/, 'const democomponentExport =');
  }
  else {
    script = 'const democomponentExport = {}';
  }
  return `(function() {
    ${script}
    return {
      ...${JSON.stringify({template: template})},
      ...democomponentExport
    }
  })()`;
};

module.exports = function (source) {
  const content = md.render(source);
  const startTag = '<!--md-demo:';
  const startTagLen = startTag.length;
  const endTag = ':md-demo-->';
  const endTagLen = endTag.length;

  let componenetsString = '';
  let id = 0;
  let output = [];
  let start = 0;

  let commentStart = content.indexOf(startTag);
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart));
    const commentContent = content.slice(commentStart + startTagLen, commentEnd);
    const html = striptags.fetch(commentContent, 'template');
    const script = striptags.fetch(commentContent, 'script');
    let demoComponentContent = genInlineComponent(html, script);
    const demoComponentName = `element-demo${id}`;
    output.push(`<template slot='source'><${demoComponentName} /></template>`);
    componenetsString += `${JSON.stringify(demoComponentName)}: ${demoComponentContent},`;
    // 重新计算下一次的位置
    id++;
    start = commentEnd + endTagLen;
    commentStart = content.indexOf(startTag, start);
    commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  }
  let pageScript = '';
  if (componenetsString) {
    pageScript = `<script>
      export default {
        name: 'component-doc',
        components: {
          ${componenetsString}
        }
      }
    </script>`;
  }
  else if (content.indexOf('<script>') === 0) {
    start = content.indexOf('</script>') + '</script>'.length;
    pageScript = content.slice(0, start);
  }
  output.push(content.slice(start));
  return `
    <template>
      <section>
        ${output.join('')}
      </section>
    </template>
    ${pageScript}
  `;
};