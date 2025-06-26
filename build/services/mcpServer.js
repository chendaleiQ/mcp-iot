"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.McpServerService = void 0;
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const config_1 = require("../config");
const sessionManager_1 = require("./sessionManager");
const tools_1 = require("../tools");
class McpServerService {
  sessionManager;
  constructor() {
    this.sessionManager = new sessionManager_1.SessionManager();
  }
  // 创建新的MCP服务器实例
  async createServer(transport) {
    const server = new mcp_js_1.McpServer({
      name: config_1.config.name,
      version: config_1.config.version,
    });
    // 注册所有工具
    (0, tools_1.registerTools)(server);
    // 连接到传输层
    await server.connect(transport);
  }
  // 处理初始化请求
  async handleInitialization(transport, sessionId) {
    // 设置传输层关闭回调
    transport.onclose = () => {
      this.sessionManager.removeSession(sessionId);
    };
    // 创建并连接服务器
    await this.createServer(transport);
  }
  // 获取会话管理器
  getSessionManager() {
    return this.sessionManager;
  }
  // 验证初始化请求
  static isValidInitializationRequest(body) {
    return (0, types_js_1.isInitializeRequest)(body);
  }
}
exports.McpServerService = McpServerService;
