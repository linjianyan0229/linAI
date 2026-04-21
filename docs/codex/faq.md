# 常见问题

## 提示 `401 Unauthorized` 或 `API key not found`

- 确认 `LINAI_API_KEY` 环境变量已生效：

  ```bash
  echo $LINAI_API_KEY        # macOS / Linux
  $env:LINAI_API_KEY          # PowerShell
  ```

- 确认令牌是从 [令牌管理](https://newapi.linbot.top) 页面复制的完整 `sk-xxx`
- 确认 `config.toml` 中 `env_key` 的值 **与实际环境变量名一致**（大小写敏感）

## 提示 `404 Not Found` 或 `model does not exist`

- 确认 `base_url` 为 `https://newapi.linbot.top/v1`，**必须有 `/v1`**
- 确认模型 ID 拼写正确，目前 linAI 在 OpenAI 兼容端点支持：
  - `gpt-5.4`
  - `MiniMax-M2.5`
  - `MiniMax-M2.7`

以 [控制台 → 模型广场](https://newapi.linbot.top) 的最新列表为准。

## `wire_api` 该填什么

- **标准对话模型**（GPT、MiniMax）填 `chat`
- OpenAI 官方 `/responses` 端点填 `responses`（接入 linAI 无需使用）

## config.toml 放在哪里

| 系统 | 路径 |
| --- | --- |
| macOS / Linux | `~/.codex/config.toml` |
| Windows | `C:\Users\<你>\.codex\config.toml` |

如果目录不存在，手动执行 `mkdir ~/.codex`（Windows PowerShell：`New-Item -ItemType Directory ~/.codex`）后再创建文件。

## 可以和 Claude Code 共用同一把令牌吗

**可以。** linAI 的令牌在 Anthropic 原生端点和 OpenAI 兼容端点 **通用**，只是 Base URL 不同：

- Claude Code → `https://newapi.linbot.top`
- Codex → `https://newapi.linbot.top/v1`

## 如何查看余额与用量

登录 [https://newapi.linbot.top](https://newapi.linbot.top)，在 **「使用记录」** / **「数据看板」** 页查看明细与剩余额度。

## 想同时保留官方 OpenAI Key

在 `config.toml` 中声明多个 provider，按需用 `--model-provider` 切换。完整示例见 [配置文档 → 多 Provider 并存](/codex/config#多-provider-并存)。
