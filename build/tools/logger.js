"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.LogLevel = void 0;
const config_1 = require("../config");
var LogLevel;
(function (LogLevel) {
  LogLevel[(LogLevel["DEBUG"] = 0)] = "DEBUG";
  LogLevel[(LogLevel["INFO"] = 1)] = "INFO";
  LogLevel[(LogLevel["WARN"] = 2)] = "WARN";
  LogLevel[(LogLevel["ERROR"] = 3)] = "ERROR";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
class Logger {
  level;
  constructor() {
    this.level = this.getLogLevel();
  }
  getLogLevel() {
    switch (config_1.logConfig.level.toLowerCase()) {
      case "debug":
        return LogLevel.DEBUG;
      case "info":
        return LogLevel.INFO;
      case "warn":
        return LogLevel.WARN;
      case "error":
        return LogLevel.ERROR;
      default:
        return LogLevel.INFO;
    }
  }
  formatMessage(level, message, ...args) {
    const timestamp = new Date().toISOString();
    const formattedArgs =
      args.length > 0
        ? ` ${args
            .map((arg) =>
              typeof arg === "object" ? JSON.stringify(arg) : String(arg),
            )
            .join(" ")}`
        : "";
    return `[${timestamp}] [${level}] ${message}${formattedArgs}`;
  }
  debug(message, ...args) {
    if (this.level <= LogLevel.DEBUG && config_1.logConfig.enableConsole) {
      console.debug(this.formatMessage("DEBUG", message, ...args));
    }
  }
  info(message, ...args) {
    if (this.level <= LogLevel.INFO && config_1.logConfig.enableConsole) {
      console.info(this.formatMessage("INFO", message, ...args));
    }
  }
  warn(message, ...args) {
    if (this.level <= LogLevel.WARN && config_1.logConfig.enableConsole) {
      console.warn(this.formatMessage("WARN", message, ...args));
    }
  }
  error(message, ...args) {
    if (this.level <= LogLevel.ERROR && config_1.logConfig.enableConsole) {
      console.error(this.formatMessage("ERROR", message, ...args));
    }
  }
}
exports.logger = new Logger();
