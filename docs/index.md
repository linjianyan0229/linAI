---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "linAI 中转站"
  text: "一站式 AI API 中转服务"
  tagline: 原生兼容 Claude、OpenAI、MiniMax，无缝接入 Claude Code 与 Codex CLI
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/quickstart
    - theme: alt
      text: Claude Code 接入
      link: /claude-code/config
    - theme: alt
      text: Codex 接入
      link: /codex/config

features:
  - icon: 🚀
    title: 原生 API 兼容
    details: Anthropic 端点保持官方原生路径，OpenAI 端点沿用 /v1 标准，无需改造客户端，CLI 开箱即用。
  - icon: 🎯
    title: 全模型覆盖
    details: 支持 Claude 全系列、GPT-5.4、MiniMax-M2.5 / M2.7，一把 Key 调用所有模型。
  - icon: 🖱️
    title: cc-switch 一键导入
    details: 控制台令牌页直接推送到 cc-switch，Claude Code 与 Codex 两套配置三秒切换。
    link: /guide/cc-switch
    linkText: 查看教程 →
  - icon: ⚡
    title: 国内直连
    details: 无需代理即可稳定访问，流式输出流畅，长会话不中断。
---
