# 学习通作业提醒系统 - 技术文档

## 项目概述

本系统是一个全自动的学习通（超星）作业和考试提醒工具，通过 GitHub Actions 定时执行，发送 Telegram 通知并同步数据到 Cloudflare Worker 网页展示。

**在线演示**: https://xxt-homework-notice.yhn666412.workers.dev

---

## 系统架构

```
┌─────────────────┐
│  学习通平台      │
│  (数据源)        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  GitHub Actions │
│  (定时任务)      │
│  每天4次检查     │
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌───────┐  ┌────────┐
│Telegram│  │Cloudflare│
│ 通知  │  │ Worker  │
└───────┘  └────────┘
                │
                ▼
         ┌─────────────┐
         │  网页展示   │
         └─────────────┘
```

---

## Cloudflare Worker API 文档

### 基础信息

- **Base URL**: `https://xxt-homework-notice.yhn666412.workers.dev`
- **认证方式**: `X-Auth-Token` 请求头
- **认证令牌**: `MySecretToken123!`

### API 端点

#### 1. 获取最新数据

```
GET /api/latest
```

**请求头**:
```
Authorization: X-Auth-Token: MySecretToken123!
```

**成功响应** (200):
```json
{
  "homework": [
    {
      "course_name": "2026Python",
      "task_name": "作业7 集合",
      "time_left": "剩余 39:14:12"
    }
  ],
  "exam": [
    {
      "name": "第九章（大类）平时测验1",
      "time_left": "剩余 11天"
    }
  ],
  "timestamp": 1749038400000,
  "date": "2026-06-04T15:47:42.295Z"
}
```

**无数据响应** (404):
```json
{
  "success": false,
  "message": "No data available"
}
```

---

#### 2. 提交数据

```
POST /api/submit
```

**请求头**:
```
Content-Type: application/json
X-Auth-Token: MySecretToken123!
```

**请求体**:
```json
{
  "homework": [
    {
      "course_name": "课程名称",
      "task_name": "作业名称",
      "time_left": "剩余时间"
    }
  ],
  "exam": [
    {
      "name": "考试名称",
      "time_left": "剩余时间"
    }
  ]
}
```

**成功响应** (200):
```json
{
  "success": true,
  "message": "Data saved successfully"
}
```

**认证失败响应** (401):
```
Unauthorized
```

---

#### 3. 获取历史记录

```
GET /api/history
```

**请求头**:
```
Authorization: X-Auth-Token: MySecretToken123!
```

**成功响应** (200):
```json
[
  {
    "homework": [...],
    "exam": [...],
    "timestamp": 1749038400000,
    "date": "2026-06-04T15:47:42.295Z"
  },
  {
    "homework": [...],
    "exam": [...],
    "timestamp": 1748995200000,
    "date": "2026-06-04T07:00:00.000Z"
  }
]
```

**说明**: 返回最近 30 条历史记录，按时间倒序排列。

---

#### 4. 前端页面

```
GET /
```

返回 HTML 页面，展示以下内容：
- 统计数据卡片（总待办、作业数、考试数）
- 未提交作业列表
- 未完成考试列表
- 历史记录（最近 10 条）
- 每 60 秒自动刷新

---

## GitHub Actions 配置

### Workflow 文件

位置: `.github/workflows/check-homework.yml`

### 定时任务配置

| 北京时间 | UTC 时间 | Cron 表达式 |
|---------|----------|-------------|
| 08:00   | 00:00    | `0 0 * * *` |
| 12:00   | 04:00    | `0 4 * * *` |
| 19:00   | 11:00    | `0 11 * * *` |
| 22:00   | 14:00    | `0 14 * * *` |

### 环境变量 (GitHub Secrets)

| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| `XXT_ACCOUNT` | 学习通账号 | `18945987148` |
| `XXT_PASSWORD` | 学习通密码 | `your_password` |
| `TELEGRAM_BOT_TOKEN` | Telegram Bot Token | `8469205911:AAH...` |
| `TELEGRAM_CHAT_ID` | Telegram Chat ID | `6226064679` |
| `CF_WORKER_URL` | Cloudflare Worker URL | `https://xxt-homework-notice.yhn666412.workers.dev` |
| `CF_AUTH_TOKEN` | Cloudflare 认证令牌 | `MySecretToken123!` |

### 配置步骤

1. 进入 GitHub 仓库 → **Settings** → **Secrets and variables** → **Actions**
2. 点击 **New repository secret**
3. 添加上述 6 个配置

---

## 数据库

### D1 数据库

- **名称**: `homework_data`
- **区域**: APAC
- **Database ID**: `b4eb3042-4118-4d4a-9d98-76336936568d`

### 数据表结构

```sql
CREATE TABLE homework_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key_name TEXT,
  value TEXT,
  timestamp INTEGER
);
```

**说明**:
- `key_name`: 记录标识（如 `xxt_latest`）
- `value`: JSON 格式的完整数据
- `timestamp`: 时间戳

---

## 项目文件结构

```
xxt_work_notice/
├── .github/
│   └── workflows/
│       ├── check-homework.yml      # 主 workflow（定时检查）
│       └── direct-check.yml        # 备用 workflow
├── cf-worker/
│   ├── worker.js                   # Cloudflare Worker 代码
│   └── wrangler.toml               # Wrangler 配置
├── github_action_runner.py          # GitHub Actions 主脚本
├── debug_env.py                    # 环境变量诊断脚本
├── .env                            # 本地环境配置
├── requirements.txt                # Python 依赖
└── README.md                       # 项目说明
```

---

## 部署指南

### 1. Cloudflare Worker 部署

```bash
# 安装 Wrangler CLI
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 创建 D1 数据库
wrangler d1 create homework_data

# 编辑 wrangler.toml，填入 database_id

# 部署 Worker
wrangler deploy
```

### 2. GitHub Actions 配置

1. 创建 GitHub 仓库
2. 添加 6 个 GitHub Secrets
3. 推送代码
4. 在 Actions 页面启用 workflow
5. 手动运行一次测试

---

## 开发指南

### 本地测试

```bash
# 安装依赖
pip install pyquery requests python-dotenv

# 配置 .env 文件
cp .env.example .env
# 编辑 .env 填入账号密码

# 运行主脚本
python github_action_runner.py
```

### Worker 本地开发

```bash
cd cf-worker

# 本地预览
wrangler dev

# 部署
wrangler deploy
```

### 测试 API

```bash
# 获取最新数据
curl https://xxt-homework-notice.yhn666412.workers.dev/api/latest \
  -H "X-Auth-Token: MySecretToken123!"

# 提交数据
curl -X POST https://xxt-homework-notice.yhn666412.workers.dev/api/submit \
  -H "X-Auth-Token: MySecretToken123!" \
  -H "Content-Type: application/json" \
  -d '{"homework":[],"exam":[]}'
```

---

## 维护指南

### 更新定时任务时间

编辑 `.github/workflows/check-homework.yml` 中的 cron 表达式：

```yaml
schedule:
  - cron: '0 0 * * *'   # 北京时间 08:00
  - cron: '0 4 * * *'   # 北京时间 12:00
  - cron: '0 11 * * *'  # 北京时间 19:00
  - cron: '0 14 * * *'  # 北京时间 22:00
```

### 手动触发检查

1. 打开 GitHub Actions 页面
2. 点击 "学习通作业检查"
3. 点击 "Run workflow"

### 查看运行日志

1. 打开 GitHub Actions 页面
2. 点击具体的运行记录
3. 查看各个步骤的日志输出

### 调试技巧

运行 `debug_env.py` 可以检查环境变量配置：

```bash
python debug_env.py
```

---

## 安全建议

1. **不要提交敏感信息到 Git**
   - `.env` 文件已加入 `.gitignore`
   - 所有敏感配置使用 GitHub Secrets

2. **定期更换认证令牌**
   - 定期更换 `CF_AUTH_TOKEN`
   - 更新 GitHub Secret 和 wrangler.toml

3. **限制 API 访问**
   - 使用 `X-Auth-Token` 认证
   - 不要公开分享认证令牌

---

## 技术栈

- **后端**: Python 3.11, Cloudflare Workers (JavaScript)
- **数据库**: Cloudflare D1 (SQLite)
- **前端**: HTML, Tailwind CSS, JavaScript
- **CI/CD**: GitHub Actions
- **通知**: Telegram Bot API
- **数据源**: 超星学习通 API

---

## 版本信息

- **Worker 版本**: ef629db6-6744-415e-8ea1-e666251f06bb
- **文档更新**: 2026-06-04
- **Python 脚本**: github_action_runner.py

---

## 联系方式

如有问题，请检查：
1. GitHub Actions 运行日志
2. Cloudflare Worker Logs (Dashboard → Workers → Logs)
3. Telegram Bot 消息记录
