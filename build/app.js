"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const mcp_1 = require("./routes/mcp");
const logger_1 = require("./utils/logger");
class App {
  app;
  mcpRoutes;
  constructor() {
    this.app = (0, express_1.default)();
    this.mcpRoutes = new mcp_1.McpRoutes();
    this.setupMiddleware();
    this.setupRoutes();
  }
  setupMiddleware() {
    // 基础中间件
    this.app.use(express_1.default.json());
    this.app.use((0, cors_1.default)(middleware_1.corsOptions));
    this.app.use(middleware_1.requestLogger);
  }
  setupRoutes() {
    // MCP 路由
    this.app.post("/mcp", (req, res) => this.mcpRoutes.handlePost(req, res));
    this.app.get("/mcp", (req, res) =>
      this.mcpRoutes.handleSessionRequest(req, res),
    );
    this.app.delete("/mcp", (req, res) =>
      this.mcpRoutes.handleSessionRequest(req, res),
    );
    // 健康检查
    this.app.get("/health", (req, res) => {
      res.json(this.mcpRoutes.getHealthInfo());
    });
    // 错误处理中间件
    this.app.use(middleware_1.errorHandler);
  }
  start() {
    this.app.listen(config_1.config.port, () => {
      logger_1.logger.info("MCP Server started", {
        port: config_1.config.port,
        name: config_1.config.name,
        version: config_1.config.version,
        healthCheck: `http://localhost:${config_1.config.port}/health`,
      });
    });
  }
  getApp() {
    return this.app;
  }
}
exports.App = App;
