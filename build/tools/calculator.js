"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatorParams = void 0;
exports.calculate = calculate;
const zod_1 = require("zod");
exports.calculatorParams = {
  operation: zod_1.z
    .enum(["add", "subtract", "multiply", "divide"])
    .describe("运算类型"),
  a: zod_1.z.number().describe("第一个数字"),
  b: zod_1.z.number().describe("第二个数字"),
};
async function calculate({ operation, a, b }) {
  let result;
  let operationSymbol;
  switch (operation) {
    case "add":
      result = a + b;
      operationSymbol = "+";
      break;
    case "subtract":
      result = a - b;
      operationSymbol = "-";
      break;
    case "multiply":
      result = a * b;
      operationSymbol = "×";
      break;
    case "divide":
      if (b === 0) {
        return {
          content: [
            {
              type: "text",
              text: "错误：除数不能为零",
              _meta: {},
            },
          ],
          _meta: {},
        };
      }
      result = a / b;
      operationSymbol = "÷";
      break;
    default:
      return {
        content: [
          {
            type: "text",
            text: "错误：不支持的运算类型",
            _meta: {},
          },
        ],
        _meta: {},
      };
  }
  return {
    content: [
      {
        type: "text",
        text: `${a} ${operationSymbol} ${b} = ${result}`,
        _meta: {},
      },
    ],
    _meta: {},
  };
}
