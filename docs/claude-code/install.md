# 安装 Claude Code CLI

Claude Code 是 Anthropic 官方的终端 AI 编程助手。本页只给出最小化安装步骤，完整内容请参考 [官方文档](https://docs.claude.com/claude-code)。

## 前置要求

- Node.js ≥ 18（推荐 20 LTS）
- 已从 linAI 获取令牌，参见 [快速开始](/guide/quickstart)

## 安装

::: code-group

```bash [npm]
npm install -g @anthropic-ai/claude-code
```

```bash [pnpm]
pnpm add -g @anthropic-ai/claude-code
```

```bash [yarn]
yarn global add @anthropic-ai/claude-code
```

:::

## 验证安装

```bash
claude --version
```

能看到版本号即说明 CLI 已就绪。下一步进入 [配置中转站](/claude-code/config)。
