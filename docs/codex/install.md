# 安装 Codex CLI

[Codex CLI](https://github.com/openai/codex) 是 OpenAI 官方的终端 AI 编程助手。

## 前置要求

- Node.js ≥ 20
- 已从 linAI 获取令牌，参见 [快速开始](/guide/quickstart)

## 安装

::: code-group

```bash [npm]
npm install -g @openai/codex
```

```bash [pnpm]
pnpm add -g @openai/codex
```

```bash [yarn]
yarn global add @openai/codex
```

:::

## 验证安装

```bash
codex --version
```

能看到版本号即表示安装完成。下一步进入 [配置中转站](/codex/config)。
