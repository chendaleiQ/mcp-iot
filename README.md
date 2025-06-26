# MCP Server - 模块化架构

这是一个基于 Model Context Protocol (MCP) 的服务器，采用模块化架构设计，提供天气查询、数学计算和搜索等功能。

## 🏗️ 项目架构

### 目录结构

```
src/
├── app.ts                 # 应用程序主类
├── index.ts              # 入口文件
├── config/               # 配置管理
│   └── index.ts
├── types/                # 类型定义
│   └── index.ts
├── middleware/           # 中间件
│   └── index.ts
├── routes/               # 路由处理
│   └── mcp.ts
├── services/             # 业务服务
│   ├── mcpServer.ts
│   └── sessionManager.ts
├── tools/                # MCP工具函数
│   ├── index.ts
│   ├── weather.ts
│   ├── calculator.ts
│   └── search.ts
└── utils/                # 通用工具函数
    ├── index.ts
    └── logger.ts
```

### 模块说明

#### 1. 配置模块 (`config/`)

- 环境变量配置管理
- 服务器配置
- 日志配置
- 会话配置

#### 2. 类型定义 (`types/`)

- 服务器配置类型
- 传输层管理类型
- 工具函数参数和返回类型
- 健康检查响应类型

#### 3. 中间件 (`middleware/`)

- 请求日志中间件
- 错误处理中间件
- 会话验证中间件
- CORS 配置

#### 4. 路由处理 (`routes/`)

- MCP 协议路由处理
- 会话管理
- 健康检查端点

#### 5. 业务服务 (`services/`)

- **MCP服务器服务**: 处理MCP协议逻辑
- **会话管理器**: 管理客户端会话和超时

#### 6. MCP工具函数 (`tools/`)

- **天气工具**: 天气查询功能
- **计算器工具**: 数学运算功能
- **搜索工具**: 搜索查询功能

#### 7. 通用工具函数 (`utils/`)

- **日志工具**: 统一的日志记录系统

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发环境运行

#### 方式一：使用 ts-node-dev（推荐）

```bash
npm run dev
```

- 自动重启：修改代码后自动重启服务器
- 快速编译：使用 transpileOnly 模式
- 忽略文件：自动忽略 node_modules 等目录

#### 方式二：使用 nodemon

```bash
npm run dev:watch
```

- 更精细的文件监控
- 可配置的忽略规则
- 延迟重启避免频繁重启

#### 方式三：调试模式

```bash
npm run dev:debug
```

- 启用 Node.js 调试器
- 支持断点调试
- 自动重启功能

### 生产环境运行

```bash
npm run build
npm run start:prod
```

### 其他命令

```bash
# 编译 TypeScript
npm run build

# 直接运行（无热重载）
npm start

# 生产环境运行
npm run start:prod
```

## ⚙️ 配置

### 环境变量

| 变量名            | 默认值        | 说明             |
| ----------------- | ------------- | ---------------- |
| `PORT`            | `9088`        | 服务器端口       |
| `SERVER_NAME`     | `mcp-server`  | 服务器名称       |
| `SERVER_VERSION`  | `1.0.0`       | 服务器版本       |
| `NODE_ENV`        | `development` | 运行环境         |
| `LOG_LEVEL`       | `info`        | 日志级别         |
| `MAX_SESSIONS`    | `100`         | 最大会话数       |
| `SESSION_TIMEOUT` | `300000`      | 会话超时时间(ms) |
| `ALLOWED_ORIGINS` | `*`           | 允许的CORS源     |

### 日志级别

- `debug`: 调试信息
- `info`: 一般信息
- `warn`: 警告信息
- `error`: 错误信息

## 🔧 可用工具

### 1. 天气查询 (`getWeather`)

获取指定城市的天气信息

**参数:**

- `city`: 城市名称
- `unit`: 温度单位 (`celsius` 或 `fahrenheit`)

### 2. 数学计算 (`calculate`)

执行基本数学运算

**参数:**

- `operation`: 运算类型 (`add`, `subtract`, `multiply`, `divide`)
- `a`: 第一个数字
- `b`: 第二个数字

### 3. 搜索查询 (`search`)

执行搜索查询

**参数:**

- `query`: 搜索查询
- `limit`: 返回结果数量限制

## 📊 监控端点

### 健康检查

```
GET /health
```

返回服务器状态信息：

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "activeSessions": 5
}
```

## 🏛️ 架构优势

### 1. 模块化设计

- 每个功能模块独立，便于维护和扩展
- 清晰的职责分离
- 易于单元测试

### 2. 类型安全

- 完整的 TypeScript 类型定义
- 编译时错误检查
- 更好的开发体验

### 3. 配置管理

- 集中化的配置管理
- 环境变量支持
- 灵活的配置选项

### 4. 日志系统

- 统一的日志记录
- 可配置的日志级别
- 结构化日志输出

### 5. 会话管理

- 自动会话超时
- 会话数量限制
- 内存泄漏防护

### 6. 错误处理

- 统一的错误处理机制
- 详细的错误日志
- 友好的错误响应

### 7. 开发体验

- 热重载开发环境
- 自动重启功能
- 调试支持

## 🔄 扩展新功能

### 添加新工具

1. 在 `src/tools/` 创建新的工具文件
2. 定义参数类型和实现函数
3. 在 `src/tools/index.ts` 中注册工具
4. 更新类型定义

### 添加新服务

1. 在 `src/services/` 创建新的服务类
2. 实现业务逻辑
3. 在相应的路由或服务中使用

### 添加新中间件

1. 在 `src/middleware/` 创建新的中间件
2. 在 `src/app.ts` 中注册中间件

### 添加新工具函数

1. 在 `src/utils/` 创建新的工具函数
2. 在 `src/utils/index.ts` 中导出

## 🧪 测试

```bash
npm test
```

## 📝 许可证

ISC
