"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherParams = void 0;
exports.getWeather = getWeather;
const zod_1 = require("zod");
exports.weatherParams = {
  city: zod_1.z.string().describe("城市名称"),
  unit: zod_1.z
    .enum(["celsius", "fahrenheit"])
    .optional()
    .default("celsius")
    .describe("温度单位"),
};
async function getWeather({ city, unit }) {
  const temperature = Math.floor(Math.random() * 30) + 10;
  const weather = ["晴天", "多云", "小雨", "阴天"][
    Math.floor(Math.random() * 4)
  ];
  return {
    content: [
      {
        type: "text",
        text: `${city} 的天气信息：\n温度: ${unit === "fahrenheit" ? (temperature * 9) / 5 + 32 : temperature}${unit === "fahrenheit" ? "°F" : "°C"}\n天气: ${weather}\n湿度: ${Math.floor(Math.random() * 40) + 40}%\n时间: ${new Date().toLocaleString()}`,
        _meta: {},
      },
    ],
    _meta: {},
  };
}
