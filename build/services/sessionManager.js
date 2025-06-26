"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionManager = void 0;
const config_1 = require("../config");
const logger_1 = require("../utils/logger");
class SessionManager {
  transports = {};
  sessionTimeouts = {};
  // 添加会话
  addSession(sessionId, transport) {
    if (
      Object.keys(this.transports).length >= config_1.sessionConfig.maxSessions
    ) {
      logger_1.logger.error("Maximum sessions reached", {
        current: this.transports.length,
        max: config_1.sessionConfig.maxSessions,
      });
      throw new Error("Maximum sessions reached");
    }
    this.transports[sessionId] = transport;
    this.setSessionTimeout(sessionId);
    logger_1.logger.info("Session added", {
      sessionId,
      totalSessions: this.getActiveSessionsCount(),
    });
  }
  // 获取会话
  getSession(sessionId) {
    return this.transports[sessionId];
  }
  // 移除会话
  removeSession(sessionId) {
    if (this.transports[sessionId]) {
      delete this.transports[sessionId];
      // 清除超时定时器
      if (this.sessionTimeouts[sessionId]) {
        clearTimeout(this.sessionTimeouts[sessionId]);
        delete this.sessionTimeouts[sessionId];
      }
      logger_1.logger.info("Session removed", {
        sessionId,
        totalSessions: this.getActiveSessionsCount(),
      });
    }
  }
  // 获取活跃会话数量
  getActiveSessionsCount() {
    return Object.keys(this.transports).length;
  }
  // 获取所有会话ID
  getSessionIds() {
    return Object.keys(this.transports);
  }
  // 设置会话超时
  setSessionTimeout(sessionId) {
    // 清除现有超时
    if (this.sessionTimeouts[sessionId]) {
      clearTimeout(this.sessionTimeouts[sessionId]);
    }
    // 设置新超时
    this.sessionTimeouts[sessionId] = setTimeout(() => {
      logger_1.logger.warn("Session timed out", { sessionId });
      this.removeSession(sessionId);
    }, config_1.sessionConfig.sessionTimeout);
  }
  // 刷新会话超时
  refreshSession(sessionId) {
    if (this.transports[sessionId]) {
      this.setSessionTimeout(sessionId);
      logger_1.logger.debug("Session refreshed", { sessionId });
    }
  }
  // 清理所有会话
  clearAllSessions() {
    const sessionCount = this.getActiveSessionsCount();
    Object.keys(this.sessionTimeouts).forEach((sessionId) => {
      clearTimeout(this.sessionTimeouts[sessionId]);
    });
    this.transports = {};
    this.sessionTimeouts = {};
    logger_1.logger.info("All sessions cleared", {
      clearedCount: sessionCount,
    });
  }
}
exports.SessionManager = SessionManager;
