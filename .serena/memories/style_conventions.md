# 风格与约定
- 文档内容以 Markdown 为主，页面使用 YAML frontmatter。
- VitePress 配置写在 `docs/.vitepress/config.mts` 中，使用 `defineConfig(...)` 导出默认配置。
- 当前代码风格偏向 VitePress 默认模板：对象与数组采用 2 空格缩进；字符串同时出现单双引号，但整体较接近官方脚手架默认写法。
- 站点结构遵循 VitePress 约定式目录：`docs/` 放页面，`.vitepress/` 放站点配置。
- 当前未看到自定义 ESLint、Prettier、测试框架或额外工程规范配置，因此修改时宜保持简洁、贴近现有模板风格。