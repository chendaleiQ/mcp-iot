import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { weatherParams, getWeather } from './weather';
import { calculatorParams, calculate } from './calculator';
import { searchParams, search } from './search';
import { iotControlParams, iotControl } from './iotControl';
import { locationParams, getLocation } from './location';

export function registerTools(server: McpServer) {
  server.tool('getWeather', '获取指定城市的天气信息', weatherParams, async (args) =>
    getWeather(args),
  );

  server.tool('calculate', '执行基本数学运算', calculatorParams, async (args) => calculate(args));

  server.tool(
    'search',
    '执行 GitHub 仓库高级搜索。支持 query(关键词)、language(语言)、stars(star数)、forks(fork数)、user(用户)、topic(主题)、created(创建时间)、sort(排序字段)、order(排序顺序)等参数的组合。',
    searchParams,
    async (args) => search(args),
  );

  // 注册 IoT 设备控制工具
  server.tool('iotControl', '控制 IoT 物联网设备', iotControlParams, async (args) =>
    iotControl(args),
  );

  server.tool('getLocation', '获取用户当前定位的城市名称', locationParams, async () =>
    getLocation(),
  );
}

// 导出所有工具函数
export { getWeather } from './weather';
export { calculate } from './calculator';
export { search } from './search';
export { iotControl } from './iotControl';
export { getLocation } from './location';
