# 配置 Claude Code 接入 linAI

Claude Code CLI 通过两个环境变量即可切换到 linAI 中转站：

| 变量 | 值 |
| --- | --- |
| `ANTHROPIC_BASE_URL` | `https://newapi.linbot.top` |
| `ANTHROPIC_AUTH_TOKEN` | 你的 linAI 令牌，形如 `sk-xxxxxx` |

::: danger 为什么用 AUTH_TOKEN 而不是 API_KEY
`ANTHROPIC_API_KEY` 会被官方 SDK 按 Anthropic 密钥格式做严格校验，而中转站的令牌是 `sk-` 前缀的自有格式。使用 `ANTHROPIC_AUTH_TOKEN` 可绕过格式校验，兼容性最好。
:::

## 方式一：临时环境变量（推荐先试）

适合当前会话临时验证是否联通。

::: code-group

```bash [macOS / Linux]
export ANTHROPIC_BASE_URL=https://newapi.linbot.top
export ANTHROPIC_AUTH_TOKEN=sk-你的令牌
claude
```

```powershell [Windows PowerShell]
$env:ANTHROPIC_BASE_URL = "https://newapi.linbot.top"
$env:ANTHROPIC_AUTH_TOKEN = "sk-你的令牌"
claude
```

```cmd [Windows CMD]
set ANTHROPIC_BASE_URL=https://newapi.linbot.top
set ANTHROPIC_AUTH_TOKEN=sk-你的令牌
claude
```

:::

## 方式二：写入 shell 配置（持久化）

适合长期固定使用 linAI 的场景。

::: code-group

```bash [macOS / Linux]
# zsh 用户写入 ~/.zshrc，bash 用户写入 ~/.bashrc
cat >> ~/.zshrc <<'EOF'
export ANTHROPIC_BASE_URL=https://newapi.linbot.top
export ANTHROPIC_AUTH_TOKEN=sk-你的令牌
EOF

source ~/.zshrc
```

```powershell [Windows 永久变量]
[Environment]::SetEnvironmentVariable("ANTHROPIC_BASE_URL", "https://newapi.linbot.top", "User")
[Environment]::SetEnvironmentVariable("ANTHROPIC_AUTH_TOKEN", "sk-你的令牌", "User")
# 重新打开终端后生效
```

:::

## 方式三：写入 settings.json

Claude Code 支持在用户级配置文件中声明环境变量。

配置文件路径：

| 系统 | 路径 |
| --- | --- |
| macOS / Linux | `~/.claude/settings.json` |
| Windows | `C:\Users\<你>\.claude\settings.json` |

文件内容：

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://newapi.linbot.top",
    "ANTHROPIC_AUTH_TOKEN": "sk-你的令牌"
  }
}
```

::: tip 优先级
shell 环境变量 **高于** `settings.json`。三种方式 **选一种** 即可，避免互相覆盖。
:::

## 启动验证

```bash
claude
```

进入交互界面后任意提问，例如：

```
> 用一句话介绍你自己
```

能看到流式回复即表示接入成功。

## 指定模型

默认模型由 Claude Code 决定。如需切换：

::: code-group

```bash [命令行参数]
claude --model claude-opus-4-5
```

```json [settings.json]
{
  "model": "claude-opus-4-5",
  "env": {
    "ANTHROPIC_BASE_URL": "https://newapi.linbot.top",
    "ANTHROPIC_AUTH_TOKEN": "sk-你的令牌"
  }
}
```

:::

linAI 侧支持的典型模型 ID：

- `claude-opus-4-5`
- `claude-sonnet-4-5`
- `claude-haiku-4-5`

::: info 实际可用模型
完整模型列表以 [控制台 → 模型广场](https://newapi.linbot.top) 为准。
:::
