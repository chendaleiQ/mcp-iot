"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionConfig =
  exports.logConfig =
  exports.isDevelopment =
  exports.config =
    void 0;
// 环境变量配置
exports.config = {
  port: parseInt(process.env.PORT || "9088"),
  name: process.env.SERVER_NAME || "mcp-server",
  version: process.env.SERVER_VERSION || "1.0.0",
};
// 开发环境配置
exports.isDevelopment = process.env.NODE_ENV === "development";
// 日志配置
exports.logConfig = {
  level: process.env.LOG_LEVEL || "info",
  enableConsole: exports.isDevelopment,
};
// 会话配置
exports.sessionConfig = {
  maxSessions: parseInt(process.env.MAX_SESSIONS || "100"),
  sessionTimeout: parseInt(process.env.SESSION_TIMEOUT || "300000"), // 5分钟
};
