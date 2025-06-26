"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions =
  exports.validateSession =
  exports.errorHandler =
  exports.requestLogger =
    void 0;
const config_1 = require("../config");
const logger_1 = require("../utils/logger");
// 请求日志中间件
const requestLogger = (req, res, next) => {
  logger_1.logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get("User-Agent"),
  });
  next();
};
exports.requestLogger = requestLogger;
// 错误处理中间件
const errorHandler = (err, req, res, next) => {
  logger_1.logger.error("Request error", {
    error: err.message,
    stack: err.stack,
    method: req.method,
    path: req.path,
  });
  res.status(500).json({
    jsonrpc: "2.0",
    error: {
      code: -32603,
      message: "Internal server error",
      data: config_1.isDevelopment ? err.message : undefined,
    },
    id: null,
  });
};
exports.errorHandler = errorHandler;
// 会话验证中间件
const validateSession = (req, res, next) => {
  const sessionId = req.headers["mcp-session-id"];
  if (!sessionId) {
    logger_1.logger.warn("Missing session ID", { path: req.path });
    return res.status(400).json({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Missing session ID",
      },
      id: null,
    });
  }
  next();
};
exports.validateSession = validateSession;
// CORS 配置
exports.corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "mcp-session-id"],
};
