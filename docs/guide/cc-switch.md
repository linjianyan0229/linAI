# 用 cc-switch 一键导入 linAI

[cc-switch](https://github.com/farion1231/cc-switch) 是一款跨平台桌面工具，用于统一管理 Claude Code、Codex、Gemini CLI、OpenCode、OpenClaw 等多款 AI 编程 CLI 的 API 供应商配置。

linAI 中转站（基于 NewAPI 构建）原生支持 cc-switch 的 `ccswitch://` Deep Link 协议，**在令牌管理页一键即可把配置同步到 cc-switch**，免去手动编辑 `~/.claude/settings.json` 和 `~/.codex/config.toml`。

## 它能解决什么痛点

- Claude Code 用 JSON、Codex 用 TOML，**格式各异** → 统一图形化界面
- 多套 API Key、多条 Base URL **来回切** → 系统托盘三秒切换
- 改错一个字段 CLI 就起不来 → 自动备份 + 原子写入
- 切换通道时还要重启终端 → 大部分 CLI 支持热切换

## 一、安装 cc-switch

::: code-group

```powershell [Windows]
# 方式 1：下载 MSI 安装包（推荐）
# https://github.com/farion1231/cc-switch/releases/latest

# 方式 2：便携版（PowerShell）
Invoke-WebRequest `
  -Uri "https://github.com/farion1231/cc-switch/releases/latest/download/CC-Switch-Windows-Portable.zip" `
  -OutFile "$env:USERPROFILE\Downloads\CC-Switch-Portable.zip"
```

```bash [macOS]
brew tap farion1231/ccswitch
brew install --cask cc-switch

# 升级
brew upgrade --cask cc-switch
```

```bash [Linux]
# 下载对应包后安装
# .AppImage 直接运行 / .deb 用 dpkg -i
# https://github.com/farion1231/cc-switch/releases/latest
```

:::

::: tip 首次启动
cc-switch 会自动扫描 `~/.claude/`、`~/.codex/` 等目录，把已有配置导入进来，无需重新填写。系统托盘会出现 cc-switch 图标。
:::

## 二、一键导入：Deep Link 方式（推荐）

linAI 控制台内置了 cc-switch 的 `ccswitch://` 协议支持，**无需复制粘贴 Key 和 Base URL**。

### 第一步：在 linAI 控制台启用 cc-switch 快捷方式

1. 登录 [https://newapi.linbot.top](https://newapi.linbot.top)
2. 进入 **「系统设置 → 聊天设置」**
3. 在「聊天快捷方式」或「一键部署」区域，**添加 CC Switch** 条目
4. 保存设置

### 第二步：在令牌管理页一键导入

1. 进入 **「令牌管理」** 页面
2. 找到目标令牌，点击行尾的 **「聊天」** 或 **下拉菜单**
3. 从菜单中选择 **「CC Switch」**
4. 浏览器会弹出「是否允许打开 CC Switch」，点击 **允许**
5. cc-switch 自动打开，供应商配置已自动填入

::: warning 首次导入可能被拦截
浏览器首次遇到 `ccswitch://` 协议会询问是否允许打开外部应用。请选择 **「始终允许」**，避免每次都被拦截。
:::

### 第三步：启用供应商

在 cc-switch 主界面顶部：

1. 选择要配置的 CLI（**Claude Code** 或 **Codex**）
2. 在供应商列表找到刚导入的 linAI 条目
3. 点击 **「Enable」** 按钮

cc-switch 会自动把配置写入对应文件：

| CLI | 目标文件 |
| --- | --- |
| Claude Code | `~/.claude/settings.json` |
| Codex | `~/.codex/config.toml` |

## 三、手动添加 linAI 供应商（备用方案）

如果一键导入失败（浏览器拦截 / 控制台未开启快捷方式），可手动添加。

### Claude Code 通道

1. cc-switch 顶部切换到 **Claude Code**
2. 点右上角 **「+」** 新增供应商
3. 填入：

| 字段 | 值 |
| --- | --- |
| 名称 | `linAI` |
| Base URL | `https://newapi.linbot.top` |
| API Key | `sk-你的令牌` |
| 模型 | `claude-sonnet-4-5`（或其他 Claude 模型） |

4. 点击 **Enable** 启用

### Codex 通道

1. 顶部切换到 **Codex**
2. 点击 **「+」** 新增供应商
3. 填入：

| 字段 | 值 |
| --- | --- |
| 名称 | `linAI` |
| Base URL | `https://newapi.linbot.top/v1` |
| API Key | `sk-你的令牌` |
| Wire API | `chat` |
| 模型 | `gpt-5.4` / `MiniMax-M2.7` 等 |

4. 点击 **Enable** 启用

::: danger Base URL 末尾不要带斜杠
加了斜杠后 Claude Code 拼接请求路径会出现 `//`，请求直接 404。统一写成 `https://newapi.linbot.top`（Claude）或 `https://newapi.linbot.top/v1`（Codex），**末尾无 `/`**。
:::

## 四、配置用量查询（NewAPI 模板）

cc-switch 自带「查看用量」功能，可直接读取 linAI 的用量数据，无需打开浏览器。

1. 在供应商列表点击 **「查看用量」**
2. 勾选 **「启用用量查询」**
3. 选择查询模板：**NewAPI 模板**
4. 填入以下参数：

| 字段 | 获取方式 |
| --- | --- |
| Base URL | `https://newapi.linbot.top` |
| 访问令牌 | 令牌管理页的 `sk-xxx` |
| 用户 ID | 控制台右上角个人中心查看 |

5. 点击 **「测试脚本」** → 测试通过后 **「保存配置」**

保存后，供应商列表会实时显示剩余额度与请求次数。

## 五、切换后的注意事项

- **Claude Code 配置读取时机**：启动时读取，切换供应商后需要 **关掉当前 `claude` 会话重新打开** 才会生效
- **Codex**：新版支持热切换，一般无需重启
- **配置备份位置**：所有供应商配置存在 `~/.cc-switch/cc-switch.db`，**重装前先备份这个文件**
- **云同步**：cc-switch 支持 Dropbox / OneDrive / iCloud / WebDAV，多台机器可同步配置

## 下一步

- [→ Claude Code 报错速查](/claude-code/errors)
- [→ Codex 常见问题](/codex/faq)
