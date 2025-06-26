"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchParams = void 0;
exports.search = search;
const zod_1 = require("zod");
exports.searchParams = {
  query: zod_1.z.string().describe("搜索查询"),
  limit: zod_1.z.number().optional().default(5).describe("返回结果数量限制"),
};
async function search({ query, limit }) {
  const results = Array.from(
    { length: limit },
    (_, i) => `结果 ${i + 1}: ${query} 相关内容 ${i + 1}`,
  );
  return {
    content: [
      {
        type: "text",
        text: `搜索 "${query}" 的结果：\n\n${results.join("\n")}`,
        _meta: {},
      },
    ],
    _meta: {},
  };
}
