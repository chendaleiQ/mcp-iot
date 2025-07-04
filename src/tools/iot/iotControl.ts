import { z } from 'zod';
import { IotControlParams, IotControlResponse } from '@/types';
import { checkAuth, checkRateLimit } from '@/tools/iot/iotSecurity';
import { logIotAction } from '@/tools/iot/iotLogger';
import { operateDevice } from '@/tools/iot/iotDeviceAdapter';

// 参数校验（聚焦智能门锁）
export const iotControlParams = {
  deviceId: z.string().describe('门锁设备唯一标识'),
  action: z
    .enum(['lock', 'unlock', 'open', 'close', 'getStatus'])
    .describe(
      '门锁控制动作，可选 lock（上锁）、unlock（解锁）、open（开门）、close（关门）、getStatus（查询状态）',
    ),
  value: z.string().optional().describe('可选，动作参数，如临时密码等'),
  token: z.string().optional().describe('操作鉴权 token'),
};

// 主逻辑实现（聚焦智能门锁）
export async function iotControl({
  deviceId,
  action,
  value,
  token,
}: IotControlParams & { token?: string }): Promise<IotControlResponse> {
  let success = true;
  let message = '';
  let status = '';

  // 1. 鉴权
  if (!checkAuth(token)) {
    success = false;
    message = '鉴权失败，禁止操作';
    status = 'unauthorized';
    logIotAction({ deviceId, action, value, success, message });
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

  // 2. 频控
  if (!checkRateLimit(deviceId, action)) {
    success = false;
    message = '操作过于频繁，请稍后再试';
    status = 'rate_limited';
    logIotAction({ deviceId, action, value, success, message });
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

  // 3. 设备操作
  const result = await operateDevice({ deviceId, action, value });
  status = result.status;
  message = result.message;
  success = status !== 'unknown';

  // 4. 日志
  logIotAction({ deviceId, action, value, success, message });

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
