const fetch = require("node-fetch");

async function testToolsRename() {
  console.log("🧪 测试tools重命名后的MCP服务器...\n");

  try {
    // 测试健康检查
    const healthResponse = await fetch("http://localhost:9088/health");
    const healthData = await healthResponse.json();
    console.log("✅ 健康检查成功:", healthData);

    // 初始化会话
    const initResponse = await fetch("http://localhost:9088/mcp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: {
          protocolVersion: "2024-11-05",
          capabilities: { tools: {}, resources: {}, prompts: {} },
          clientInfo: { name: "test-client", version: "1.0.0" },
        },
      }),
    });

    const sessionId = initResponse.headers.get("mcp-session-id");
    console.log("✅ 会话初始化成功, Session ID:", sessionId);

    if (sessionId) {
      // 测试天气工具
      const weatherResponse = await fetch("http://localhost:9088/mcp", {
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
            arguments: { city: "上海", unit: "celsius" },
          },
        }),
      });

      const weatherData = await weatherResponse.json();
      console.log(
        "✅ 天气工具测试成功:",
        weatherData.result?.content?.[0]?.text || weatherData,
      );
    }

    console.log("\n🎉 tools重命名测试完成！");
  } catch (error) {
    console.error("❌ 测试失败:", error.message);
  }
}

testToolsRename();
