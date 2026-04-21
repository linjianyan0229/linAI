# 介绍

**linAI 中转站**（[https://newapi.linbot.top](https://newapi.linbot.top)）是一个面向 Claude Code、Codex 等主流 AI CLI 工具的第三方 API 中转服务。

## 能做什么

- 在国内环境**免代理直连**调用 Claude、OpenAI、MiniMax 模型
- 用一把 API Key **统一访问多家模型供应商**
- 兼容主流 AI CLI 工具的原生协议，**无需改动客户端代码**

## 支持的模型

| 供应商 | 模型 | 接入端点 |
| --- | --- | --- |
| Anthropic | Claude 全系列（Opus / Sonnet / Haiku） | `https://newapi.linbot.top` |
| OpenAI | GPT-5.4 | `https://newapi.linbot.top/v1` |
| MiniMax | MiniMax-M2.5、MiniMax-M2.7 | `https://newapi.linbot.top/v1` |

::: tip 两种端点的差异
Claude 侧走 **Anthropic 原生端点**（不带 `/v1` 前缀），其余模型走 **OpenAI 兼容端点**（必须带 `/v1`）。配置时注意对号入座。
:::

## 支持的 CLI 工具

| 工具 | 配套模型 | 接入教程 |
| --- | --- | --- |
| Claude Code CLI | Claude 全系列 | [Claude Code 接入 →](/claude-code/config) |
| Codex CLI | GPT-5.4、MiniMax 系列 | [Codex 接入 →](/codex/config) |

## 下一步

前往 [快速开始](/guide/quickstart) 获取你的第一把 API Key。
