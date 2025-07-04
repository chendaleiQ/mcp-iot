// iotLogger.ts
import { IotControlParams } from '@/types';

export function logIotAction(params: IotControlParams & { success: boolean; message: string }) {
  // 实际可接入日志系统，这里简单输出
  const { deviceId, action, value, success, message } = params;
  // eslint-disable-next-line no-console
  console.log(
    `[IOT] [${new Date().toISOString()}] deviceId=${deviceId}, action=${action}, value=${value}, success=${success}, message=${message}`,
  );
}
