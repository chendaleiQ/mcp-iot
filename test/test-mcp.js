// 测试 MCP 服务器工具函数的简单示例
const fetch = require("node-fetch");

async function testMCPServer() {
  const baseUrl = "http://localhost:9088";

  try {
    // 1. 初始化会话
    console.log("1. 初始化 MCP 会话...");
    const initResponse = await fetch(`${baseUrl}/mcp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: {
          protocolVersion: "2024-11-05",
          capabilities: {
            tools: {},
            resources: {},
            prompts: {},
          },
          clientInfo: {
            name: "test-client",
            version: "1.0.0",
          },
        },
      }),
    });

    if (!initResponse.ok) {
      throw new Error(`初始化失败: ${initResponse.status}`);
    }

    const sessionId = initResponse.headers.get("mcp-session-id");
    console.log(`会话 ID: ${sessionId}`);

    // 2. 测试天气工具
    console.log("\n2. 测试天气查询工具...");
    const weatherResponse = await fetch(`${baseUrl}/mcp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "mcp-session-id": sessionId,
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 2,
        method: "tools/call",
        params: {
          name: "getWeather",
          arguments: {
            city: "北京",
            unit: "celsius",
          },
        },
      }),
    });

    const weatherResult = await weatherResponse.json();
    console.log("天气查询结果:", JSON.stringify(weatherResult, null, 2));

    // 3. 测试计算器工具
    console.log("\n3. 测试计算器工具...");
    const calcResponse = await fetch(`${baseUrl}/mcp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "mcp-session-id": sessionId,
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 3,
        method: "tools/call",
        params: {
          name: "calculate",
          arguments: {
            operation: "add",
            a: 10,
            b: 5,
          },
        },
      }),
    });

    const calcResult = await calcResponse.json();
    console.log("计算器结果:", JSON.stringify(calcResult, null, 2));

    // 4. 测试搜索工具
    console.log("\n4. 测试搜索工具...");
    const searchResponse = await fetch(`${baseUrl}/mcp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "mcp-session-id": sessionId,
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 4,
        method: "tools/call",
        params: {
          name: "search",
          arguments: {
            query: "人工智能",
            limit: 3,
          },
        },
      }),
    });

    const searchResult = await searchResponse.json();
    console.log("搜索结果:", JSON.stringify(searchResult, null, 2));

    // 5. 关闭会话
    console.log("\n5. 关闭会话...");
    await fetch(`${baseUrl}/mcp`, {
      method: "DELETE",
      headers: {
        "mcp-session-id": sessionId,
      },
    });

    console.log("测试完成！");
  } catch (error) {
    console.error("测试失败:", error.message);
  }
}

// 运行测试
testMCPServer();
