import express from "express";
import cors from "cors";
import { config } from "./config";
import { requestLogger, errorHandler, corsOptions } from "./middleware";
import { McpRoutes } from "./routes/mcp";
import { logger } from "./utils/logger";

export class App {
  private app: express.Application;
  private mcpRoutes: McpRoutes;

  constructor() {
    this.app = express();
    this.mcpRoutes = new McpRoutes();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    // 基础中间件
    this.app.use(express.json());
    this.app.use(cors(corsOptions));
    this.app.use(requestLogger);
  }

  private setupRoutes(): void {
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
    this.app.use(errorHandler);
  }

  public start(): void {
    this.app.listen(config.port, () => {
      logger.info("MCP Server started", {
        port: config.port,
        name: config.name,
        version: config.version,
        healthCheck: `http://localhost:${config.port}/health`,
      });
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
}
