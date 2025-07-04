import { z } from 'zod';
import { ToolResponse } from '@/types';
import ipLocation from 'iplocation';

export const locationParams = {
  ip: z.string().optional().describe('IP地址，可选，默认取客户端IP'),
};

export async function getLocation({ ip }: { ip?: string } = {}): Promise<ToolResponse> {
  // 如果没有传入IP，默认返回上海（兼容老逻辑）
  if (!ip) {
    const city = '上海';
    return {
      content: [
        {
          type: 'text',
          text: city,
          _meta: {},
        },
      ],
      _meta: { city },
    };
  }
  try {
    const info = (await ipLocation(ip)) as Record<string, any>;
    const city =
      info.city ||
      (info.region && info.region.name) ||
      (info.country && info.country.name) ||
      '未知';
    return {
      content: [
        {
          type: 'text',
          text: city,
          _meta: info as Record<string, unknown>,
        },
      ],
      _meta: info as Record<string, unknown>,
    };
  } catch (e) {
    return {
      content: [
        {
          type: 'text',
          text: '定位失败',
          _meta: { error: String(e) },
        },
      ],
      _meta: { error: String(e) },
    };
  }
}
