import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { config } from "../config";
import { SessionManager } from "./sessionManager";
import { registerTools } from "../tools";

export class McpServerService {
  private sessionManager: SessionManager;

  constructor() {
    this.sessionManager = new SessionManager();
  }

  // 创建新的MCP服务器实例
  async createServer(transport: StreamableHTTPServerTransport): Promise<void> {
    const server = new McpServer({
      name: config.name,
      version: config.version,
    });

    // 注册所有工具
    registerTools(server);

    // 连接到传输层
    await server.connect(transport);
  }

  // 处理初始化请求
  async handleInitialization(
    transport: StreamableHTTPServerTransport,
    sessionId: string,
  ): Promise<void> {
    // 设置传输层关闭回调
    transport.onclose = () => {
      this.sessionManager.removeSession(sessionId);
    };

    // 创建并连接服务器
    await this.createServer(transport);
  }

  // 获取会话管理器
  getSessionManager(): SessionManager {
    return this.sessionManager;
  }

  // 验证初始化请求
  static isValidInitializationRequest(body: any): boolean {
    return isInitializeRequest(body);
  }
}
