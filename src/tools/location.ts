import { z } from 'zod';
import { ToolResponse } from '../types';

export const locationParams = {};

export async function getLocation(): Promise<ToolResponse> {
  // 模拟定位，实际可接入真实定位服务
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
