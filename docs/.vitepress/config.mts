import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'linAI 中转站',
  description: '接入 Claude Code、Codex 等主流 AI CLI 的第三方 API 中转站文档',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/introduction' },
      { text: 'Claude Code', link: '/claude-code/install' },
      { text: 'Codex', link: '/codex/install' },
      { text: '报错速查', link: '/claude-code/errors' },
      { text: '控制台', link: 'https://newapi.linbot.top' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/guide/introduction' },
            { text: '快速开始', link: '/guide/quickstart' },
            { text: 'cc-switch 一键导入', link: '/guide/cc-switch' }
          ]
        }
      ],
      '/claude-code/': [
        {
          text: 'Claude Code CLI',
          items: [
            { text: '安装', link: '/claude-code/install' },
            { text: '配置中转站', link: '/claude-code/config' },
            { text: '报错速查', link: '/claude-code/errors' },
            { text: '常见问题', link: '/claude-code/faq' }
          ]
        }
      ],
      '/codex/': [
        {
          text: 'Codex CLI',
          items: [
            { text: '安装', link: '/codex/install' },
            { text: '配置中转站', link: '/codex/config' },
            { text: '常见问题', link: '/codex/faq' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://newapi.linbot.top' }
    ],

    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2026 linAI'
    },

    outline: {
      label: '本页目录',
      level: [2, 3]
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    langMenuLabel: '语言',

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    }
  }
})
