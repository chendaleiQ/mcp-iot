# MCP Server - 模块化多工具服务

> **English below 中文介绍**

---

## 📝 项目简介

MCP Server 是基于 Model Context Protocol (MCP) 的模块化服务端，支持天气、定位、数学计算、IoT 设备控制、GitHub 搜索等多种工具，适合智能体/AI 助手等场景。

## 📁 目录结构

```
├── src/
│   ├── app.ts              # 应用主类
│   ├── index.ts            # 启动入口
│   ├── config/             # 配置
│   ├── types/              # 类型定义
│   ├── middleware/         # 中间件
│   ├── routes/             # 路由
│   ├── services/           # 业务服务
│   ├── tools/              # 工具函数（天气、定位、计算、IoT、搜索等）
│   └── utils/              # 通用工具
├── test/                   # 测试脚本
├── package.json            # 依赖与脚本
├── tsconfig.json           # TypeScript 配置
└── ...
```

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发环境
```bash
npm run dev
```

### 生产环境
```bash
npm run build
npm run start:prod
```

### 其他命令
```bash
npm run dev:watch   # nodemon 热重载
npm run dev:debug   # 调试模式
npm start           # 直接运行（ts-node）
```

## ⚙️ 配置

- 端口、名称、版本、日志、会话等均可通过环境变量配置，详见 `src/config/index.ts`
- 常用环境变量：
  - `PORT`、`SERVER_NAME`、`SERVER_VERSION`、`NODE_ENV`、`LOG_LEVEL`、`MAX_SESSIONS`、`SESSION_TIMEOUT`

## 🔧 可用工具（API）

### 1. 天气查询 getWeather
- 参数：`city`（可选，城市名，缺省自动定位），`unit`（可选，celsius/fahrenheit）
- 示例：
  ```json
  { "city": "北京", "unit": "celsius" }
  ```

### 2. 定位 getLocation
- 参数：无
- 返回：当前定位的城市名（模拟/可扩展）

### 3. 数学计算 calculate
- 参数：`operation`（add/subtract/multiply/divide），`a`，`b`
- 示例：
  ```json
  { "operation": "add", "a": 1, "b": 2 }
  ```

### 4. IoT 设备控制 iotControl
- 参数：`deviceId`，`action`（lock/unlock/open/close/getStatus），`value`（可选）
- 示例：
  ```json
  { "deviceId": "lock001", "action": "lock" }
  ```

### 5. GitHub 搜索 search
- 参数：`query`（关键词），可选：`language`、`stars`、`forks`、`user`、`topic`、`created`、`sort`、`order`、`limit`
- 示例：
  ```json
  { "query": "nodejs", "language": "TypeScript", "limit": 3 }
  ```

## 📊 健康检查

- `GET /health` 返回服务器状态

## 🧪 测试

所有测试脚本位于 `test/` 目录：
- `test/test-mcp.js`、`test/test-modular.js`、`test/test-tools-rename.js`
- 运行示例：
  ```bash
  node test/test-mcp.js
  node test/test-modular.js
  node test/test-tools-rename.js
  ```

## 🔄 扩展指引
- 新增工具：在 `src/tools/` 新建文件并注册
- 新增服务/中间件/类型：参考现有目录结构

## 📝 许可证
ISC

---

# MCP Server - Modular Multi-Tool Service (English)

## 📝 Introduction
MCP Server is a modular backend based on Model Context Protocol (MCP), supporting weather, location, calculator, IoT device control, GitHub search and more. Ideal for AI agents and assistant scenarios.

## 📁 Structure
See above for directory tree. Main code in `src/`, tests in `test/`.

## 🚀 Quick Start

### Install dependencies
```bash
npm install
```

### Start development server
```bash
npm run dev
```

### Production
```bash
npm run build
npm run start:prod
```

### Other scripts
```bash
npm run dev:watch   # nodemon hot reload
npm run dev:debug   # debug mode
npm start           # direct run (ts-node)
```

## ⚙️ Configuration
- All configs (port, name, version, log, session, etc.) via env vars, see `src/config/index.ts`
- Common env vars: `PORT`, `SERVER_NAME`, `SERVER_VERSION`, `NODE_ENV`, `LOG_LEVEL`, `MAX_SESSIONS`, `SESSION_TIMEOUT`

## 🔧 Tools (APIs)

### 1. Weather getWeather
- Params: `city` (optional, auto-location if omitted), `unit` (optional, celsius/fahrenheit)
- Example:
  ```json
  { "city": "Beijing", "unit": "celsius" }
  ```

### 2. Location getLocation
- Params: none
- Returns: current city (mocked/extendable)

### 3. Calculator calculate
- Params: `operation` (add/subtract/multiply/divide), `a`, `b`
- Example:
  ```json
  { "operation": "add", "a": 1, "b": 2 }
  ```

### 4. IoT Device Control iotControl
- Params: `deviceId`, `action` (lock/unlock/open/close/getStatus), `value` (optional)
- Example:
  ```json
  { "deviceId": "lock001", "action": "lock" }
  ```

### 5. GitHub Search search
- Params: `query` (keyword), optional: `language`, `stars`, `forks`, `user`, `topic`, `created`, `sort`, `order`, `limit`
- Example:
  ```json
  { "query": "nodejs", "language": "TypeScript", "limit": 3 }
  ```

## 📊 Health Check
- `GET /health` returns server status

## 🧪 Testing
All test scripts in `test/`:
- `test/test-mcp.js`, `test/test-modular.js`, `test/test-tools-rename.js`
- Run example:
  ```bash
  node test/test-mcp.js
  node test/test-modular.js
  node test/test-tools-rename.js
  ```

## 🔄 Extension
- Add tool: create file in `src/tools/` and register
- Add service/middleware/type: follow existing structure

## 📝 License
ISC
