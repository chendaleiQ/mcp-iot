import { z } from "zod";
import { CalculatorParams, ToolResponse } from "../types";

export const calculatorParams = {
  operation: z
    .enum(["add", "subtract", "multiply", "divide"])
    .describe("运算类型"),
  a: z.number().describe("第一个数字"),
  b: z.number().describe("第二个数字"),
};

export async function calculate({
  operation,
  a,
  b,
}: CalculatorParams): Promise<ToolResponse> {
  let result: number;
  let operationSymbol: string;

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
