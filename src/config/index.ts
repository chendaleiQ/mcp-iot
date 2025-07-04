import { ServerConfig } from '@/types';

// 环境变量配置 - 热重载测试
export const config: ServerConfig = {
  port: parseInt(process.env.PORT || '9088'),
  name: process.env.SERVER_NAME || 'mcp-server',
  version: process.env.SERVER_VERSION || '1.0.0',
};

// 开发环境配置
export const isDevelopment = process.env.NODE_ENV === 'development';

// 日志配置
export const logConfig = {
  level: process.env.LOG_LEVEL || 'info',
  enableConsole: isDevelopment,
};

// 会话配置
export const sessionConfig = {
  maxSessions: parseInt(process.env.MAX_SESSIONS || '100'),
  sessionTimeout: parseInt(process.env.SESSION_TIMEOUT || '300000'), // 5分钟
};
