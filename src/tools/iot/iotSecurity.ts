// iotSecurity.ts
import { IotControlParams } from '@/types';

// 简单 token 鉴权（实际可接入更复杂的鉴权体系）
export function checkAuth(token?: string): boolean {
  // 这里可接入实际的 token 校验逻辑
  return token === process.env.IOT_CONTROL_TOKEN;
}

// 操作频率限制（简单实现，实际可用 redis 等持久化方案）
const actionTimestamps: Record<string, number> = {};
const MIN_INTERVAL = 3000; // 3 秒

export function checkRateLimit(deviceId: string, action: string): boolean {
  const key = `${deviceId}:${action}`;
  const now = Date.now();
  if (actionTimestamps[key] && now - actionTimestamps[key] < MIN_INTERVAL) {
    return false;
  }
  actionTimestamps[key] = now;
  return true;
}
