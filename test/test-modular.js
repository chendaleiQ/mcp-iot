const fetch = require("node-fetch");

async function testModularMCP() {
  const baseUrl = "http://localhost:9088";

  console.log("🧪 测试模块化MCP服务器...\n");

  // 1. 健康检查
  console.log("1. 测试健康检查...");
  try {
    const healthResponse = await fetch(`${baseUrl}/health`);
    const healthData = await healthResponse.json();
    console.log("✅ 健康检查成功:", healthData);
  } catch (error) {
    console.log("❌ 健康检查失败:", error.message);
    return;
  }

  // 2. 初始化会话
  console.log("\n2. 初始化MCP会话...");
  let sessionId;
  try {
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

    sessionId = initResponse.headers.get("mcp-session-id");
    const initData = await initResponse.json();
    console.log("✅ 会话初始化成功, Session ID:", sessionId);
  } catch (error) {
    console.log("❌ 会话初始化失败:", error.message);
    return;
  }

  if (!sessionId) {
    console.log("❌ 未获取到Session ID");
    return;
  }

  // 3. 测试天气工具
  console.log("\n3. 测试天气查询工具...");
  try {
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

    const weatherData = await weatherResponse.json();
    console.log(
      "✅ 天气查询成功:",
      weatherData.result?.content?.[0]?.text || weatherData,
    );
  } catch (error) {
    console.log("❌ 天气查询失败:", error.message);
  }

  // 4. 测试计算器工具
  console.log("\n4. 测试计算器工具...");
  try {
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

    const calcData = await calcResponse.json();
    console.log(
      "✅ 计算器成功:",
      calcData.result?.content?.[0]?.text || calcData,
    );
  } catch (error) {
    console.log("❌ 计算器失败:", error.message);
  }

  // 5. 测试搜索工具
  console.log("\n5. 测试搜索工具...");
  try {
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
            query: "模块化架构",
            limit: 3,
          },
        },
      }),
    });

    const searchData = await searchResponse.json();
    console.log(
      "✅ 搜索成功:",
      searchData.result?.content?.[0]?.text || searchData,
    );
  } catch (error) {
    console.log("❌ 搜索失败:", error.message);
  }

  // 6. 检查会话状态
  console.log("\n6. 检查会话状态...");
  try {
    const healthResponse2 = await fetch(`${baseUrl}/health`);
    const healthData2 = await healthResponse2.json();
    console.log("✅ 当前活跃会话数:", healthData2.activeSessions);
  } catch (error) {
    console.log("❌ 获取会话状态失败:", error.message);
  }

  // 7. 关闭会话
  console.log("\n7. 关闭会话...");
  try {
    await fetch(`${baseUrl}/mcp`, {
      method: "DELETE",
      headers: {
        "mcp-session-id": sessionId,
      },
    });
    console.log("✅ 会话关闭成功");
  } catch (error) {
    console.log("❌ 会话关闭失败:", error.message);
  }

  console.log("\n🎉 模块化MCP服务器测试完成！");
}

// 运行测试
testModularMCP().catch(console.error);
