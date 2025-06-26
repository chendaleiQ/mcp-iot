import { z } from 'zod';
import { IotControlParams, IotControlResponse } from '../types';

// 参数校验（聚焦智能门锁）
export const iotControlParams = {
  deviceId: z.string().describe('门锁设备唯一标识'),
  action: z
    .enum(['lock', 'unlock', 'open', 'close', 'getStatus'])
    .describe(
      '门锁控制动作，可选 lock（上锁）、unlock（解锁）、open（开门）、close（关门）、getStatus（查询状态）',
    ),
  value: z.string().optional().describe('可选，动作参数，如临时密码等'),
};

// 主逻辑实现（聚焦智能门锁）
export async function iotControl({
  deviceId,
  action,
  value,
}: IotControlParams): Promise<IotControlResponse> {
  let success = true;
  let message = '';
  let status = '';

  switch (action) {
    case 'lock':
      message = `门锁 ${deviceId} 已上锁`;
      status = 'locked';
      break;
    case 'unlock':
      message = `门锁 ${deviceId} 已解锁`;
      status = 'unlocked';
      break;
    case 'open':
      message = `门锁 ${deviceId} 已开门`;
      status = 'opened';
      break;
    case 'close':
      message = `门锁 ${deviceId} 已关门`;
      status = 'closed';
      break;
    case 'getStatus':
      // 模拟状态
      status = Math.random() > 0.5 ? 'locked' : 'unlocked';
      message = `门锁 ${deviceId} 当前状态：${status}`;
      break;
    default:
      success = false;
      message = `不支持的门锁控制动作: ${action}`;
  }

  return {
    success,
    deviceId,
    action,
    value,
    message,
    content: [
      {
        type: 'text',
        text: message,
        _meta: { status },
      },
    ],
    _meta: { status },
  };
}
