import { z } from 'zod';
import { WeatherParams, ToolResponse } from '../types';
import { getLocation } from './location';

export const weatherParams = {
  city: z.string().optional().describe('城市名称'),
  unit: z.enum(['celsius', 'fahrenheit']).optional().default('celsius').describe('温度单位'),
};

export async function getWeather({ city, unit }: WeatherParams): Promise<ToolResponse> {
  // city 为空时自动定位
  if (!city) {
    const location = await getLocation();
    city = location.content[0].text;
  }
  const temperature = Math.floor(Math.random() * 30) + 10;
  const weather = ['晴天', '多云', '小雨', '阴天'][Math.floor(Math.random() * 4)];

  return {
    content: [
      {
        type: 'text',
        text: `${city} 的天气信息：\n温度: ${
          unit === 'fahrenheit' ? (temperature * 9) / 5 + 32 : temperature
        }${unit === 'fahrenheit' ? '°F' : '°C'}\n天气: ${weather}\n湿度: ${
          Math.floor(Math.random() * 40) + 40
        }%\n时间: ${new Date().toLocaleString()}`,
        _meta: {},
      },
    ],
    _meta: {},
  };
}
