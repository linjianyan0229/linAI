# 代码结构
- `package.json`：仅包含 3 个 VitePress 相关脚本（dev/build/preview）。
- `docs/index.md`：首页，当前为默认 Home 布局示例。
- `docs/markdown-examples.md`：Markdown 扩展示例页。
- `docs/api-examples.md`：VitePress runtime API 示例页。
- `docs/.vitepress/config.mts`：站点标题、描述、导航、侧边栏、社交链接配置。
- `.serena/`：Serena 项目元数据，不属于业务代码主体。