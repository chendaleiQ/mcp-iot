"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.calculate = exports.getWeather = void 0;
exports.registerTools = registerTools;
const weather_1 = require("./weather");
const calculator_1 = require("./calculator");
const search_1 = require("./search");
function registerTools(server) {
  server.tool(
    "getWeather",
    "获取指定城市的天气信息",
    weather_1.weatherParams,
    async (args) => (0, weather_1.getWeather)(args),
  );
  server.tool(
    "calculate",
    "执行基本数学运算",
    calculator_1.calculatorParams,
    async (args) => (0, calculator_1.calculate)(args),
  );
  server.tool("search", "执行搜索查询", search_1.searchParams, async (args) =>
    (0, search_1.search)(args),
  );
}
// 导出所有工具函数
var weather_2 = require("./weather");
Object.defineProperty(exports, "getWeather", {
  enumerable: true,
  get: function () {
    return weather_2.getWeather;
  },
});
var calculator_2 = require("./calculator");
Object.defineProperty(exports, "calculate", {
  enumerable: true,
  get: function () {
    return calculator_2.calculate;
  },
});
var search_2 = require("./search");
Object.defineProperty(exports, "search", {
  enumerable: true,
  get: function () {
    return search_2.search;
  },
});
