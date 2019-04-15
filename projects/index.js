const projects = [
  'saladict',
  'weitweet',
  'postcss-safe-important',
  'blog-2019',
  'hexo-filter-github-emojis',
  'ext-github-release-notifier',
  'javascript30',
  'projects',
  'leetmark',
  'empty-module-loader'
]

export default projects.map(id =>
  Object.assign({ id }, require(`./${id}/meta.json`))
)