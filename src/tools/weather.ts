import { z } from 'zod';
import { WeatherParams, ToolResponse } from '@/types';
import { getLocation } from '@/tools/location';
import axios from 'axios';

export const weatherParams = {
  city: z.string().optional().describe('城市名称'),
  unit: z.enum(['celsius', 'fahrenheit']).optional().default('celsius').describe('温度单位'),
  days: z.number().optional().describe('查询天数'),
};

export async function getWeather({
  city,
  unit = 'celsius',
  days = 1,
}: WeatherParams): Promise<ToolResponse> {
  // city 为空时自动定位
  if (!city) {
    const location = await getLocation({});
    city = location.content[0].text;
  }
  days = Math.max(1, Math.min(days || 1, 7));
  try {
    // tianqiapi.com 免费API，version=v1 支持7天预报
    const resp = await axios.get('https://www.tianqiapi.com/api', {
      params: {
        version: 'v1',
        city,
      },
    });
    if (!resp.data || !resp.data.data || !Array.isArray(resp.data.data)) {
      return {
        content: [{ type: 'text', text: `未找到城市：${city}`, _meta: {} }],
        _meta: {},
      };
    }
    const weatherArr = resp.data.data;
    const results: string[] = [];
    for (let i = 0; i < days; i++) {
      const d = weatherArr[i];
      results.push(
        `${city} ${i === 0 ? '今天' : i === 1 ? '明天' : i === 2 ? '后天' : `第${i + 1}天`}（${d.date}）天气信息：\n` +
          `天气状况: ${d.wea}\n` +
          `温度: ${unit === 'fahrenheit' ? ((parseFloat(d.tem) * 9) / 5 + 32).toFixed(1) + '°F' : d.tem + '°C'}\n` +
          `体感温度: 暂无\n` +
          `湿度: ${d.humidity || '暂无'}\n` +
          `风力: ${d.win_speed || '暂无'}\n` +
          `风向: ${d.win.join('/')}\n` +
          `紫外线指数: 暂无\n` +
          `空气质量: ${d.air || '暂无'}\n` +
          `能见度: 暂无\n` +
          `气压: 暂无\n` +
          `降水概率: 暂无\n` +
          `时间: ${d.date} ${d.week}`,
      );
    }
    return {
      content: [
        {
          type: 'text',
          text: results.join('\n\n'),
          _meta: {},
        },
      ],
      _meta: {},
    };
  } catch (e: any) {
    return {
      content: [
        {
          type: 'text',
          text: `天气查询失败: ${e?.response?.data?.message || e.message}`,
          _meta: {},
        },
      ],
      _meta: {},
    };
  }
}
