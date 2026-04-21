# Claude Code 报错速查手册

按错误码与场景分类，给出**最常见的报错 → 根因 → 解决方案**。遇到问题先看本页，大部分情况能在五分钟内解决。

::: tip 先跑 /doctor 自诊断
在 `claude` 会话内输入 `/doctor`，工具会自动检查安装、配置、MCP、快捷键、插件加载等七类问题并给出修复建议。**排查的第一步永远是它**。
:::

---

## 401 Unauthorized / Invalid API key

### 场景一：环境变量没生效

```bash
# 检查是否有值
echo $ANTHROPIC_AUTH_TOKEN              # macOS / Linux
$env:ANTHROPIC_AUTH_TOKEN                # PowerShell
```

输出为空即说明没生效。回到 [配置中转站](/claude-code/config) 按章节重新设置，并 **重开终端**。

### 场景二：变量名用错了（最坑）

中转站令牌必须写入 `ANTHROPIC_AUTH_TOKEN`，**不是** `ANTHROPIC_API_KEY`。

后者会被 Claude SDK 按 `sk-ant-api03-xxx` 格式严格校验，linAI 的 `sk-xxx` 格式会被直接拒绝。

### 场景三：令牌被登录态覆盖

如果终端提示「`Claude Pro`」「`Claude Max`」而不是自定义 Base URL，说明 Claude Code **当前处于官方账号登录模式**，会**忽略** `ANTHROPIC_AUTH_TOKEN` 和 `ANTHROPIC_BASE_URL`。

解决：

```bash
claude logout             # 退出官方登录
claude                    # 重新进入，此时走环境变量
```

### 场景四：IDE 或 MCP 改写了 settings.json

某些 IDE 插件 / MCP 服务器会自动把 Key 回写 `~/.claude/settings.json`，覆盖你的配置。解决方法：

- 打开 `~/.claude/settings.json`，确认 `env` 段内 `ANTHROPIC_AUTH_TOKEN` 正确
- 或用环境变量方式（优先级高于 settings.json）

---

## 403 Forbidden

几乎一定是 **登录态残留** 导致 CLI 没真正使用你设置的 Key。

典型表现：终端标题栏显示 `xxx · Claude Pro`，但实际请求走的是第三方中转站，于是后端拒绝。

```bash
claude logout
unset ANTHROPIC_API_KEY   # 如果误设过，先清掉
claude                    # 重新启动
```

---

## 404 Not Found / model not found

### Base URL 写错了

Claude Code 必须用 **Anthropic 原生端点**，不带 `/v1`：

| 正确 | 错误 |
| --- | --- |
| `https://newapi.linbot.top` | `https://newapi.linbot.top/v1` |

### 模型 ID 拼写错误

linAI 支持的 Claude 模型 ID 需严格匹配：

- `claude-opus-4-5`
- `claude-sonnet-4-5`
- `claude-haiku-4-5`

以 [控制台 → 模型广场](https://newapi.linbot.top) 列表为准。

---

## 429 Rate Limit Exceeded

### 情况一：短时间请求过于密集

批处理 / 并发脚本触发了每分钟速率限制。等 30-60 秒后重试，或给脚本加节流（`sleep 1`）。

### 情况二：账户额度耗尽

登录 [https://newapi.linbot.top](https://newapi.linbot.top) → **「数据看板」** 查看剩余额度，耗尽后充值或切换到额度充足的令牌。

---

## 400 Bad Request

Claude Code 开启实验性 beta 功能时，部分中转站不完全兼容会返回 400。解决方法：

::: code-group

```bash [macOS / Linux]
export CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1
```

```powershell [Windows 永久]
[Environment]::SetEnvironmentVariable("CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS", "1", "User")
```

:::

**设置后重开所有终端** 才能生效。

---

## Claude's response exceeded the 32000 output tokens limit

Claude Code 默认输出上限较保守，超长生成（大段代码、文档）会被截断。

解决：

::: code-group

```bash [macOS / Linux]
export CLAUDE_CODE_MAX_OUTPUT_TOKENS=32000
```

```powershell [Windows 永久]
[Environment]::SetEnvironmentVariable("CLAUDE_CODE_MAX_OUTPUT_TOKENS", "32000", "User")
```

:::

还可配合会话内命令控制上下文：

```
> 帮我把当前重点更新到 claude.md
/clear
```

把长上下文压缩到 `claude.md`，再 `/clear` 重开会话，能显著降低 token 消耗。

---

## ENOTFOUND / 连接超时

### 检查 Base URL 域名

```bash
ping newapi.linbot.top        # 应能解析到 IP
curl -I https://newapi.linbot.top
```

如果 `ping` 都失败，是 DNS 或网络层问题，检查本机 hosts、防火墙、公司代理。

### 清理冲突代理变量

中转站国内直连 **无需代理**。如果系统里设过代理，可能走错路径：

```bash
unset HTTP_PROXY HTTPS_PROXY ALL_PROXY    # macOS / Linux
$env:HTTP_PROXY=""; $env:HTTPS_PROXY=""   # PowerShell
```

清理后重试。

---

## 'claude' 不是内部或外部命令 / command not found: claude

Claude Code 二进制未加入 `PATH`。

### Windows

```powershell
# 查看 npm 全局安装目录
npm config get prefix

# 把返回的目录（如 C:\Users\你\AppData\Roaming\npm）加入 PATH
# 系统属性 → 环境变量 → Path → 新建 → 粘贴路径
```

### macOS / Linux

```bash
# 查看 claude 安装位置
which claude
npm bin -g

# 没有 which claude 输出时，把 npm 全局 bin 加入 PATH
echo 'export PATH="$(npm bin -g):$PATH"' >> ~/.zshrc
source ~/.zshrc
```

---

## settings.json 解析失败 / JSON 格式错误

`~/.claude/settings.json` 必须是 **严格 JSON**，不能有注释、不能尾逗号。

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://newapi.linbot.top",
    "ANTHROPIC_AUTH_TOKEN": "sk-你的令牌"
  }
}
```

常见错误：

- 尾逗号：`"xx": "yy",}` ← 多余的 `,`
- 单引号：JSON 必须 `"` 双引号
- 注释：JSON 不允许 `//` 或 `/* */`

用 VS Code 打开该文件，左下角会标红语法错误行。

---

## macOS 退出时 Bun Segfault

Claude Code 基于 Bun 运行时，macOS Apple Silicon 在某些 Bun 版本退出阶段存在已知 segfault bug，打印：

```
panic: Segmentation fault at address 0x0
oh no: Bun has crashed.
```

**这不影响功能使用，只是退出时崩溃**。升级到最新版 Claude Code 通常可解决：

```bash
npm install -g @anthropic-ai/claude-code@latest
```

仍无效时临时用 `Ctrl+C` 强退代替 `exit`。

---

## 切换供应商后 Claude Code 没换

Claude Code **启动时一次性读配置**，会话中途改 settings.json 或环境变量不会实时生效。

解决：**退出当前会话 → 重新 `claude`**。

---

## 还是搞不定？

1. 先贴 `/doctor` 输出到 [linAI 工单系统](https://newapi.linbot.top)
2. 附上 **报错完整内容** 和 **Base URL / 令牌前 6 位**（`sk-xxxxxx`）
3. 说明操作系统、Claude Code 版本（`claude --version`）

提供越详细，定位越快。
