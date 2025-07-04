// iotDeviceAdapter.ts
import { IotControlParams } from '@/types';
import { logger } from '@/utils/logger';

export async function operateDevice({
  deviceId,
  action,
  value,
}: IotControlParams): Promise<{ status: string; message: string }> {
  // 这里可接入实际的设备 SDK 或 API
  let status = '';
  let message = '';
  switch (action) {
    case 'lock':
      status = 'locked';
      message = `门锁 ${deviceId} 已上锁`;
      break;
    case 'unlock':
      status = 'unlocked';
      message = `门锁 ${deviceId} 已解锁`;
      break;
    case 'open':
      status = 'opened';
      message = `门锁 ${deviceId} 已开门`;
      break;
    case 'close':
      status = 'closed';
      message = `门锁 ${deviceId} 已关门`;
      break;
    case 'getStatus':
      status = Math.random() > 0.5 ? 'locked' : 'unlocked';
      message = `门锁 ${deviceId} 当前状态：${status}`;
      break;
    default:
      status = 'unknown';
      message = `不支持的门锁控制动作: ${action}`;
  }
  logger.info(`门锁 ${deviceId} 控制结果: ${status} ${message}`);
  return { status, message };
}
