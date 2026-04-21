# 快速开始

跟随本页三步即可拿到可用的 API Key 和 Base URL。

## 第一步：注册账号

前往 [https://newapi.linbot.top](https://newapi.linbot.top) 注册账号并登录。

## 第二步：创建 API Key

1. 登录后进入左侧导航的 **「令牌管理」** 页面
2. 点击 **「添加新的令牌」**
3. 填写名称（例如 `claude-code` 或 `codex`），额度按需设置
4. 保存后复制生成的令牌，形如 `sk-xxxxxxxxxxxx`

::: warning 保管好你的令牌
令牌即账户调用权限，泄漏后请立刻在令牌管理页 **删除并重建**。不要将令牌提交到 Git 仓库或贴到公开场合。
:::

## 第三步：确认 Base URL

根据你要用的 CLI 选择对应 Base URL：

| 场景 | Base URL |
| --- | --- |
| Claude Code CLI（Anthropic 原生） | `https://newapi.linbot.top` |
| Codex CLI（OpenAI 兼容） | `https://newapi.linbot.top/v1` |

::: tip 同一把令牌通吃
linAI 的令牌在两种端点下 **通用**，无需为 Claude 和 Codex 分别创建。
:::

## 下一步

- [→ 配置 Claude Code CLI](/claude-code/config)
- [→ 配置 Codex CLI](/codex/config)
