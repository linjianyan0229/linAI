# 配置 Codex 接入 linAI

Codex CLI 默认只认 OpenAI 官方接口。接入 linAI 需要在 `~/.codex/config.toml` 中声明一个 **自定义 model_provider**，再通过环境变量传入令牌。

## 第一步：编辑 config.toml

Codex 配置文件路径：

| 系统 | 路径 |
| --- | --- |
| macOS / Linux | `~/.codex/config.toml` |
| Windows | `C:\Users\<你>\.codex\config.toml` |

::: tip 文件不存在时
首次运行 `codex` 会自动创建 `~/.codex/` 目录。如果还没运行过，手动执行 `mkdir ~/.codex` 即可。
:::

写入以下内容：

```toml
model = "gpt-5.4"
model_provider = "linai"

[model_providers.linai]
name = "linAI"
base_url = "https://newapi.linbot.top/v1"
env_key = "LINAI_API_KEY"
wire_api = "chat"
```

字段说明：

| 字段 | 说明 |
| --- | --- |
| `model` | 默认模型，可填 `gpt-5.4`、`MiniMax-M2.5`、`MiniMax-M2.7` |
| `model_provider` | 指向下方 `[model_providers.linai]` 定义 |
| `base_url` | linAI 的 OpenAI 兼容端点，**必须带 `/v1`** |
| `env_key` | 令牌的环境变量名，Codex 会从此变量读取 Key |
| `wire_api` | 协议类型，OpenAI 兼容接口填 `chat` |

## 第二步：设置令牌环境变量

::: code-group

```bash [macOS / Linux 持久化]
echo 'export LINAI_API_KEY=sk-你的令牌' >> ~/.zshrc
source ~/.zshrc
```

```powershell [Windows 永久变量]
[Environment]::SetEnvironmentVariable("LINAI_API_KEY", "sk-你的令牌", "User")
# 重新打开终端后生效
```

```cmd [Windows CMD 临时]
set LINAI_API_KEY=sk-你的令牌
```

:::

::: warning 变量名必须一致
`config.toml` 中的 `env_key` 与实际环境变量名 **完全一致**，否则 Codex 会报 `API key not found`。
:::

## 第三步：启动验证

```bash
codex
```

进入交互界面，尝试提问：

```
> 用 Python 写一个快速排序
```

能看到代码输出即表示接入成功。

## 切换模型

::: code-group

```bash [命令行临时指定]
codex --model MiniMax-M2.7
```

```toml [config.toml 修改默认]
model = "MiniMax-M2.7"
model_provider = "linai"
```

:::

linAI 在 OpenAI 兼容端点下支持的典型模型：

- `gpt-5.4`
- `MiniMax-M2.5`
- `MiniMax-M2.7`

::: info 实际可用模型
完整模型列表以 [控制台 → 模型广场](https://newapi.linbot.top) 为准。
:::

## 多 Provider 并存

如果你同时还想保留官方 OpenAI 通道，可以在 `config.toml` 中声明多个 provider：

```toml
# 默认走 linAI
model = "gpt-5.4"
model_provider = "linai"

[model_providers.linai]
name = "linAI"
base_url = "https://newapi.linbot.top/v1"
env_key = "LINAI_API_KEY"
wire_api = "chat"

[model_providers.openai]
name = "OpenAI"
base_url = "https://api.openai.com/v1"
env_key = "OPENAI_API_KEY"
wire_api = "chat"
```

启动时用 `--model-provider` 临时切换：

```bash
codex --model-provider openai --model gpt-4o
```
