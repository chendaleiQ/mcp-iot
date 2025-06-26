# 开发指南

## 🚀 开发环境设置

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

#### 推荐方式：ts-node-dev

```bash
npm run dev
```

**特性：**

- ✅ 自动重启：修改代码后自动重启服务器
- ✅ 快速编译：使用 transpileOnly 模式，跳过类型检查
- ✅ 智能忽略：自动忽略 node_modules、build 等目录
- ✅ 实时监控：监控 src 目录下的所有 TypeScript 文件

#### 备选方式：nodemon

```bash
npm run dev:watch
```

**特性：**

- ✅ 更精细的文件监控
- ✅ 可配置的忽略规则
- ✅ 延迟重启避免频繁重启
- ✅ 支持自定义配置文件

#### 调试模式

```bash
npm run dev:debug
```

**特性：**

- ✅ 启用 Node.js 调试器
- ✅ 支持断点调试
- ✅ 自动重启功能
- ✅ 开发工具集成

## 🔧 配置文件说明

### nodemon.json

```json
{
  "watch": ["src"],
  "ext": "ts,js,json",
  "ignore": [
    "src/**/*.spec.ts",
    "src/**/*.test.ts",
    "node_modules",
    "build",
    "dist"
  ],
  "exec": "ts-node src/index.ts",
  "env": {
    "NODE_ENV": "development"
  },
  "delay": "1000"
}
```

### ts-node-dev.json

```json
{
  "respawn": true,
  "transpileOnly": true,
  "ignore": [
    "node_modules/**/*",
    "build/**/*",
    "dist/**/*",
    "*.test.ts",
    "*.spec.ts"
  ],
  "watch": ["src/**/*"],
  "ext": "ts,js,json"
}
```

## 📝 开发工作流

### 1. 启动开发服务器

```bash
npm run dev
```

### 2. 修改代码

- 修改 `src/` 目录下的任何 TypeScript 文件
- 服务器会自动检测变化并重启
- 查看控制台输出确认重启成功

### 3. 测试功能

```bash
# 健康检查
curl http://localhost:9088/health

# 测试MCP工具
# 使用您的MCP客户端或测试脚本
```

### 4. 调试问题

- 查看控制台日志输出
- 使用 `npm run dev:debug` 启用调试模式
- 在代码中添加 `debugger` 语句

## 🐛 常见问题

### 1. 服务器没有自动重启

**可能原因：**

- 文件没有被监控（检查 nodemon.json 或 ts-node-dev.json）
- 文件扩展名不在监控列表中
- 文件在忽略列表中

**解决方案：**

- 确保文件在 `src/` 目录下
- 检查文件扩展名是否为 `.ts`、`.js` 或 `.json`
- 检查文件是否在忽略列表中

### 2. 重启过于频繁

**解决方案：**

- 使用 `npm run dev:watch` 替代 `npm run dev`
- 调整 nodemon.json 中的 `delay` 参数
- 在配置文件中添加更多忽略规则

### 3. 编译错误

**解决方案：**

- 检查 TypeScript 语法错误
- 运行 `npm run build` 查看详细错误信息
- 确保所有导入路径正确

### 4. 端口被占用

**解决方案：**

```bash
# 查找占用端口的进程
lsof -i :9088

# 杀死进程
kill -9 <PID>

# 或者使用不同的端口
PORT=9089 npm run dev
```

## 🔍 调试技巧

### 1. 日志调试

```typescript
import { logger } from "../utils/logger";

// 添加调试日志
logger.debug("调试信息", { data: someData });
logger.info("一般信息");
logger.warn("警告信息");
logger.error("错误信息", { error: err });
```

### 2. 断点调试

```bash
# 启动调试模式
npm run dev:debug
```

然后在浏览器中打开 `chrome://inspect` 或使用 VS Code 调试器。

### 3. 环境变量调试

```bash
# 设置调试环境变量
DEBUG=* npm run dev

# 或者设置日志级别
LOG_LEVEL=debug npm run dev
```

## 📊 性能优化

### 1. 开发环境优化

- 使用 `transpileOnly` 模式跳过类型检查
- 忽略不必要的文件和目录
- 使用延迟重启避免频繁重启

### 2. 生产环境优化

```bash
# 编译优化
npm run build

# 运行优化后的代码
npm run start:prod
```

## 🧪 测试

### 运行测试

```bash
npm test
```

### 手动测试

```bash
# 健康检查
curl http://localhost:9088/health

# 测试MCP功能
node test-modular.js
```

## 📚 相关文档

- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [Express.js 官方文档](https://expressjs.com/)
- [ts-node-dev 文档](https://github.com/wclr/ts-node-dev)
- [nodemon 文档](https://nodemon.io/)

## 🆘 获取帮助

如果遇到问题：

1. 检查控制台错误信息
2. 查看相关配置文件
3. 运行 `npm run build` 检查编译错误
4. 查看项目 README.md 和 REFACTORING_SUMMARY.md
