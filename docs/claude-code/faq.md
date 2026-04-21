# 常见问题

::: tip 先看报错速查
如果你遇到的是 **具体报错信息**（401 / 403 / 404 / 429 / 超时 / 闪退 等），请先到 [报错速查手册](/claude-code/errors)。本页只整理 **非错误类** 的使用问题。
:::

## 如何查看用量

登录 [https://newapi.linbot.top](https://newapi.linbot.top)，前往 **「使用记录」** 或 **「数据看板」** 查看调用明细与余额。

如果使用 cc-switch，也可以在工具内直接查看用量，配置方法见 [cc-switch 一键导入 → 配置用量查询](/guide/cc-switch#四-配置用量查询-newapi-模板)。

## settings.json 和环境变量哪个优先

shell 环境变量 **高于** `~/.claude/settings.json`。若 shell 里残留旧的 `ANTHROPIC_BASE_URL`，会覆盖配置文件。排查命令：

::: code-group

```bash [macOS / Linux]
env | grep ANTHROPIC
```

```powershell [Windows PowerShell]
Get-ChildItem Env: | Where-Object Name -like "ANTHROPIC*"
```

:::

清理残留变量后重开终端。三种配置方式（临时 env / shell 持久化 / settings.json）**选一种即可**，避免互相覆盖。

## 可以和官方 Anthropic Key 共存吗

可以。常见做法：

- **官方 Key** 写入 `ANTHROPIC_API_KEY`
- **linAI 令牌** 写入 `ANTHROPIC_AUTH_TOKEN` + `ANTHROPIC_BASE_URL`

当 `ANTHROPIC_BASE_URL` 指向 linAI 时，Claude Code 会优先使用 `ANTHROPIC_AUTH_TOKEN`；清除该变量即回到官方通道。

如果频繁切换，建议直接用 [cc-switch](/guide/cc-switch) 管理两套配置。

## 可以和 Codex 共用同一把令牌吗

可以。linAI 的令牌在 Anthropic 原生端点和 OpenAI 兼容端点 **通用**，只是 Base URL 不同：

- Claude Code → `https://newapi.linbot.top`
- Codex → `https://newapi.linbot.top/v1`

## 如何切换到其他 Claude 模型

命令行临时指定：

```bash
claude --model claude-opus-4-5
```

或写入 `~/.claude/settings.json` 作为默认：

```json
{
  "model": "claude-opus-4-5",
  "env": {
    "ANTHROPIC_BASE_URL": "https://newapi.linbot.top",
    "ANTHROPIC_AUTH_TOKEN": "sk-你的令牌"
  }
}
```

可用模型以 [控制台 → 模型广场](https://newapi.linbot.top) 为准。

## 切换配置后为什么没生效

Claude Code **启动时读取一次配置**，会话中途修改不会实时生效。退出当前 `claude` 会话重新打开即可。
