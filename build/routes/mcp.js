"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.McpRoutes = void 0;
const node_crypto_1 = require("node:crypto");
const streamableHttp_js_1 = require("@modelcontextprotocol/sdk/server/streamableHttp.js");
const mcpServer_1 = require("../services/mcpServer");
const logger_1 = require("../utils/logger");
class McpRoutes {
  mcpService;
  constructor() {
    this.mcpService = new mcpServer_1.McpServerService();
  }
  // 处理POST请求（客户端到服务器通信）
  async handlePost(req, res) {
    const sessionId = req.headers["mcp-session-id"];
    const sessionManager = this.mcpService.getSessionManager();
    let transport;
    try {
      if (sessionId && sessionManager.getSession(sessionId)) {
        // 重用现有传输层
        transport = sessionManager.getSession(sessionId);
        sessionManager.refreshSession(sessionId);
        logger_1.logger.debug("Reusing existing session", { sessionId });
      } else if (
        !sessionId &&
        mcpServer_1.McpServerService.isValidInitializationRequest(req.body)
      ) {
        // 新的初始化请求
        const newSessionId = (0, node_crypto_1.randomUUID)();
        transport = new streamableHttp_js_1.StreamableHTTPServerTransport({
          sessionIdGenerator: () => newSessionId,
          onsessioninitialized: (sessionId) => {
            sessionManager.addSession(sessionId, transport);
          },
        });
        await this.mcpService.handleInitialization(transport, newSessionId);
        logger_1.logger.info("New MCP session initialized", {
          sessionId: newSessionId,
        });
      } else {
        // 无效请求
        logger_1.logger.warn("Invalid MCP request", {
          hasSessionId: !!sessionId,
          isInitRequest:
            mcpServer_1.McpServerService.isValidInitializationRequest(req.body),
        });
        res.status(400).json({
          jsonrpc: "2.0",
          error: {
            code: -32000,
            message: "Bad Request: No valid session ID provided",
          },
          id: null,
        });
        return;
      }
      // 处理请求
      await transport.handleRequest(req, res, req.body);
    } catch (error) {
      logger_1.logger.error("Error handling MCP request", {
        error: error instanceof Error ? error.message : String(error),
        sessionId: sessionId || "unknown",
      });
      res.status(500).json({
        jsonrpc: "2.0",
        error: {
          code: -32603,
          message: "Internal server error",
        },
        id: null,
      });
    }
  }
  // 处理GET和DELETE请求的通用处理器
  async handleSessionRequest(req, res) {
    const sessionId = req.headers["mcp-session-id"];
    const sessionManager = this.mcpService.getSessionManager();
    if (!sessionId || !sessionManager.getSession(sessionId)) {
      logger_1.logger.warn("Invalid session request", {
        sessionId: sessionId || "missing",
        method: req.method,
        hasSession: sessionId ? !!sessionManager.getSession(sessionId) : false,
      });
      res.status(400).send("Invalid or missing session ID");
      return;
    }
    const transport = sessionManager.getSession(sessionId);
    sessionManager.refreshSession(sessionId);
    try {
      await transport.handleRequest(req, res);
      logger_1.logger.debug("Session request handled", {
        sessionId,
        method: req.method,
      });
    } catch (error) {
      logger_1.logger.error("Error handling session request", {
        error: error instanceof Error ? error.message : String(error),
        sessionId: sessionId || "unknown",
        method: req.method,
      });
      res.status(500).send("Internal server error");
    }
  }
  // 获取健康检查信息
  getHealthInfo() {
    const sessionManager = this.mcpService.getSessionManager();
    const healthInfo = {
      status: "ok",
      timestamp: new Date().toISOString(),
      activeSessions: sessionManager.getActiveSessionsCount(),
    };
    logger_1.logger.debug("Health check requested", healthInfo);
    return healthInfo;
  }
}
exports.McpRoutes = McpRoutes;
